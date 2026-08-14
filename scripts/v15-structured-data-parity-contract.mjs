import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const fail = (message) => {
  console.error(`V15_STRUCTURED_DATA_FAIL: ${message}`);
  process.exit(1);
};

if (!existsSync("out")) fail("static export out/ missing");

const htmlFiles = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) walk(path);
    else if (name.endsWith(".html")) htmlFiles.push(path);
  }
};
walk("out");

const decodeEntities = (value) =>
  value
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

const normalizeText = (value) => decodeEntities(value).replace(/\s+/g, " ").trim();
const visibleText = (html) =>
  normalizeText(
    html
      .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  );

const hasNoindex = (html) => /<meta\b[^>]*\bname=["']robots["'][^>]*\bcontent=["'][^"']*noindex/i.test(html);
const getCanonical = (html) => {
  for (const tag of html.match(/<link\b[^>]*>/gi) ?? []) {
    if (!/\brel=["']canonical["']/i.test(tag)) continue;
    return tag.match(/\bhref=["']([^"']+)["']/i)?.[1] ?? null;
  }
  return null;
};

const parseJsonLd = (html, display) => {
  const payloads = [];
  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      payloads.push(JSON.parse(decodeEntities(match[1])));
    } catch (error) {
      fail(`${display}: invalid JSON-LD: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  return payloads;
};

const flattenNodes = (payloads) => {
  const nodes = [];
  for (const payload of payloads) {
    const entries = Array.isArray(payload) ? payload : payload?.["@graph"] ? payload["@graph"] : [payload];
    for (const entry of entries) {
      if (entry && typeof entry === "object") nodes.push(entry);
    }
  }
  return nodes;
};

const typesOf = (node) => {
  const type = node?.["@type"];
  return new Set((Array.isArray(type) ? type : [type]).filter((item) => typeof item === "string"));
};
const nodesOfType = (nodes, type) => nodes.filter((node) => typesOf(node).has(type));

const deepVisit = (value, visit) => {
  if (Array.isArray(value)) {
    for (const item of value) deepVisit(item, visit);
    return;
  }
  if (!value || typeof value !== "object") return;
  visit(value);
  for (const item of Object.values(value)) deepVisit(item, visit);
};

const forbiddenTypes = new Set(["LocalBusiness", "AggregateRating", "Review", "Offer"]);
const forbiddenKeys = new Set([
  "price",
  "priceCurrency",
  "ratingValue",
  "reviewCount",
  "ratingCount",
  "streetAddress",
  "postalCode",
]);

const violations = [];
const add = (display, message) => violations.push(`${display}: ${message}`);
let indexableCount = 0;
let serviceCount = 0;
let articleCount = 0;
let faqCount = 0;
let faqQuestions = 0;
let organizationCount = 0;
let websiteCount = 0;
let parsedPayloadCount = 0;

for (const path of htmlFiles) {
  const html = readFileSync(path, "utf8");
  if (hasNoindex(html)) continue;
  indexableCount += 1;
  const display = relative("out", path);
  const canonical = getCanonical(html);
  if (!canonical) {
    add(display, "canonical missing");
    continue;
  }

  const payloads = parseJsonLd(html, display);
  parsedPayloadCount += payloads.length;
  const nodes = flattenNodes(payloads);
  const text = visibleText(html);

  const organizations = nodesOfType(nodes, "Organization");
  const websites = nodesOfType(nodes, "WebSite");
  organizationCount += organizations.length;
  websiteCount += websites.length;
  if (organizations.length !== 1) add(display, `expected exactly one Organization node, found ${organizations.length}`);
  if (websites.length !== 1) add(display, `expected exactly one WebSite node, found ${websites.length}`);

  for (const organization of organizations) {
    if (organization["@id"] !== "https://leadflowai.pl/#organization") add(display, "Organization @id drift");
    if (organization.name !== "Tervyxa Systems sp. z o.o.") add(display, "Organization legal name drift");
    if (organization.email !== "kontakt@leadflowai.pl") add(display, "Organization email drift");
    if (organization.brand?.name !== "LeadFlowAI") add(display, "Organization brand name drift");
  }
  for (const website of websites) {
    if (website["@id"] !== "https://leadflowai.pl/#website") add(display, "WebSite @id drift");
    if (website.name !== "LeadFlowAI") add(display, "WebSite name drift");
    if (website.inLanguage !== "pl-PL") add(display, "WebSite language drift");
  }

  deepVisit(payloads, (node) => {
    const nodeTypes = typesOf(node);
    for (const type of nodeTypes) {
      if (forbiddenTypes.has(type)) add(display, `forbidden unverified schema type: ${type}`);
    }
    for (const key of Object.keys(node)) {
      if (forbiddenKeys.has(key)) add(display, `forbidden unverified schema property: ${key}`);
      if (key === "datePublished") add(display, "datePublished is forbidden without separately evidenced publication date");
    }
  });

  const services = nodesOfType(nodes, "Service");
  const articles = nodesOfType(nodes, "Article");
  const faqs = nodesOfType(nodes, "FAQPage");
  const webPages = nodesOfType(nodes, "WebPage");
  const breadcrumbs = nodesOfType(nodes, "BreadcrumbList");
  serviceCount += services.length;
  articleCount += articles.length;
  faqCount += faqs.length;

  if (services.length > 0) {
    if (services.length !== 1) add(display, `expected one Service node, found ${services.length}`);
    if (articles.length !== 0) add(display, "Service page unexpectedly contains Article node");
    if (webPages.length !== 1) add(display, `Service page expected one WebPage, found ${webPages.length}`);
    if (breadcrumbs.length !== 1) add(display, `Service page expected one BreadcrumbList, found ${breadcrumbs.length}`);
    if (faqs.length !== 1) add(display, `Service page expected one FAQPage, found ${faqs.length}`);

    const service = services[0];
    const webPage = webPages[0];
    const breadcrumb = breadcrumbs[0];
    if (service) {
      if (service.url !== canonical) add(display, `Service.url ${service.url} does not equal canonical ${canonical}`);
      if (service["@id"] !== `${canonical}#service`) add(display, `Service @id ${service["@id"]} does not derive from canonical`);
      if (service.provider?.["@id"] !== "https://leadflowai.pl/#organization") add(display, "Service provider drift");
      if (service.areaServed?.["@type"] !== "Country" || service.areaServed?.name !== "Polska") {
        add(display, "Service areaServed must remain Country/Polska");
      }
    }
    if (webPage) {
      if (webPage.url !== canonical) add(display, `WebPage.url ${webPage.url} does not equal canonical ${canonical}`);
      if (webPage["@id"] !== `${canonical}#webpage`) add(display, `WebPage @id ${webPage["@id"]} does not derive from canonical`);
      if (webPage.mainEntity?.["@id"] !== `${canonical}#service`) add(display, "WebPage mainEntity does not match Service @id");
    }
    const items = breadcrumb?.itemListElement;
    const last = Array.isArray(items) ? items.at(-1) : null;
    if (last?.item !== canonical) add(display, `Service breadcrumb terminal item ${last?.item} does not equal canonical ${canonical}`);

    for (const faq of faqs) {
      if (!Array.isArray(faq.mainEntity) || faq.mainEntity.length === 0) add(display, "FAQPage has no questions");
      for (const question of faq.mainEntity ?? []) {
        const questionText = normalizeText(String(question?.name ?? ""));
        const answerText = normalizeText(String(question?.acceptedAnswer?.text ?? ""));
        faqQuestions += 1;
        if (!questionText || !text.includes(questionText)) add(display, `FAQ question not visible in page text: ${questionText || "<empty>"}`);
        if (!answerText || !text.includes(answerText)) add(display, `FAQ answer not visible in page text for: ${questionText || "<empty>"}`);
      }
    }
  }

  if (articles.length > 0) {
    if (articles.length !== 1) add(display, `expected one Article node, found ${articles.length}`);
    if (services.length !== 0) add(display, "Article page unexpectedly contains Service node");
    if (webPages.length !== 1) add(display, `Article page expected one WebPage, found ${webPages.length}`);
    if (breadcrumbs.length !== 1) add(display, `Article page expected one BreadcrumbList, found ${breadcrumbs.length}`);
    if (faqs.length !== 0) add(display, "Article page unexpectedly contains FAQPage node");

    const article = articles[0];
    const webPage = webPages[0];
    const breadcrumb = breadcrumbs[0];
    if (article) {
      if (article.url !== canonical) add(display, `Article.url ${article.url} does not equal canonical ${canonical}`);
      if (article["@id"] !== `${canonical}#article`) add(display, `Article @id ${article["@id"]} does not derive from canonical`);
      if (article.mainEntityOfPage?.["@id"] !== `${canonical}#webpage`) add(display, "Article mainEntityOfPage does not match WebPage @id");
      if (article.author?.["@id"] !== "https://leadflowai.pl/#organization") add(display, "Article author drift");
      if (article.publisher?.["@id"] !== "https://leadflowai.pl/#organization") add(display, "Article publisher drift");
      if (!/^\d{4}-\d{2}-\d{2}$/.test(String(article.dateModified ?? ""))) add(display, `Article dateModified invalid: ${article.dateModified}`);
      const h1 = normalizeText(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, " ") ?? "");
      if (normalizeText(String(article.headline ?? "")) !== h1) add(display, "Article headline does not equal visible H1");
    }
    if (webPage) {
      if (webPage.url !== canonical) add(display, `WebPage.url ${webPage.url} does not equal canonical ${canonical}`);
      if (webPage["@id"] !== `${canonical}#webpage`) add(display, `WebPage @id ${webPage["@id"]} does not derive from canonical`);
      if (webPage.mainEntity?.["@id"] !== `${canonical}#article`) add(display, "WebPage mainEntity does not match Article @id");
      if (!/^\d{4}-\d{2}-\d{2}$/.test(String(webPage.dateModified ?? ""))) add(display, `WebPage dateModified invalid: ${webPage.dateModified}`);
      if (article && webPage.dateModified !== article.dateModified) add(display, "Article/WebPage dateModified mismatch");
    }
    const items = breadcrumb?.itemListElement;
    const middle = Array.isArray(items) ? items.find((item) => item?.position === 2) : null;
    const last = Array.isArray(items) ? items.at(-1) : null;
    if (middle?.item !== "https://leadflowai.pl/wiedza/") add(display, `Article breadcrumb knowledge item ${middle?.item} is not canonical hub URL`);
    if (last?.item !== canonical) add(display, `Article breadcrumb terminal item ${last?.item} does not equal canonical ${canonical}`);
  }
}

if (indexableCount !== 63) violations.push(`GLOBAL: expected 63 indexable pages, found ${indexableCount}`);
if (serviceCount !== 35) violations.push(`GLOBAL: expected 35 Service nodes, found ${serviceCount}`);
if (articleCount !== 21) violations.push(`GLOBAL: expected 21 Article nodes, found ${articleCount}`);
if (faqCount !== 35) violations.push(`GLOBAL: expected 35 FAQPage nodes, found ${faqCount}`);
if (organizationCount !== 63) violations.push(`GLOBAL: expected 63 Organization nodes, found ${organizationCount}`);
if (websiteCount !== 63) violations.push(`GLOBAL: expected 63 WebSite nodes, found ${websiteCount}`);

if (violations.length) {
  console.error(`V15_STRUCTURED_DATA_DEFECTS count=${violations.length}`);
  for (const violation of violations) console.error(`- ${violation}`);
  process.exit(1);
}

console.log(
  `V15_STRUCTURED_DATA_PASS indexable=63 organization=63 website=63 service=35 article=21 faq=35 faq-questions=${faqQuestions} payloads=${parsedPayloadCount} canonical-parity=EXACT breadcrumbs=EXACT visible-faq=PASS dates=TRUTHFUL forbidden-schema=ABSENT`,
);
