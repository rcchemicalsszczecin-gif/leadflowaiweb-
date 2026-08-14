import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const fail = (message) => {
  console.error(`V15_ONPAGE_SERP_FAIL: ${message}`);
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
const normalize = (value) => decodeEntities(value).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
const visibleText = (html) =>
  normalize(html.replace(/<script\b[\s\S]*?<\/script>/gi, " ").replace(/<style\b[\s\S]*?<\/style>/gi, " "));
const hasNoindex = (html) => /<meta\b[^>]*\bname=["']robots["'][^>]*\bcontent=["'][^"']*noindex/i.test(html);

const parseNodes = (html, display) => {
  const nodes = [];
  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    let parsed;
    try {
      parsed = JSON.parse(decodeEntities(match[1]));
    } catch (error) {
      fail(`${display}: invalid JSON-LD: ${error instanceof Error ? error.message : String(error)}`);
    }
    const entries = Array.isArray(parsed) ? parsed : parsed?.["@graph"] ? parsed["@graph"] : [parsed];
    for (const entry of entries) if (entry && typeof entry === "object") nodes.push(entry);
  }
  return nodes;
};
const hasType = (node, type) => {
  const value = node?.["@type"];
  return (Array.isArray(value) ? value : [value]).includes(type);
};

const violations = [];
const titleOwners = new Map();
const descriptionOwners = new Map();
let indexableCount = 0;
let serviceCount = 0;
let serviceDirectAnswerCount = 0;
let serviceDecisionCount = 0;
let serviceFaqCount = 0;
let serviceMailtoCount = 0;
let articleCount = 0;
let reviewedArticleCount = 0;
let articleContactCount = 0;

for (const path of htmlFiles) {
  const html = readFileSync(path, "utf8");
  if (hasNoindex(html)) continue;
  indexableCount += 1;
  const display = relative("out", path);
  const text = visibleText(html);

  const title = normalize(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "");
  const descriptionTag = (html.match(/<meta\b[^>]*name=["']description["'][^>]*>/i) ?? [""])[0];
  const description = normalize(descriptionTag.match(/\bcontent=["']([^"']*)["']/i)?.[1] ?? "");
  const h1Count = (html.match(/<h1\b/gi) ?? []).length;

  if (!title) violations.push(`${display}: title missing`);
  else {
    const key = title.toLocaleLowerCase("pl");
    if (titleOwners.has(key)) violations.push(`${display}: duplicate title also used by ${titleOwners.get(key)}`);
    else titleOwners.set(key, display);
  }
  if (!description) violations.push(`${display}: meta description missing`);
  else {
    const key = description.toLocaleLowerCase("pl");
    if (descriptionOwners.has(key)) violations.push(`${display}: duplicate description also used by ${descriptionOwners.get(key)}`);
    else descriptionOwners.set(key, display);
  }
  if (h1Count !== 1) violations.push(`${display}: expected exactly one H1, found ${h1Count}`);

  const nodes = parseNodes(html, display);
  const service = nodes.find((node) => hasType(node, "Service"));
  const article = nodes.find((node) => hasType(node, "Article"));

  if (service) {
    serviceCount += 1;
    const directAnswer = normalize(String(service.description ?? ""));
    if (!text.includes("00 / ODPOWIEDŹ WPROST")) violations.push(`${display}: direct-answer section marker missing`);
    if (!directAnswer || !text.includes(directAnswer)) violations.push(`${display}: Service description/direct answer is not visibly rendered`);
    else serviceDirectAnswerCount += 1;

    if (!/\bid=["']decision["']/i.test(html) || !text.includes("05 / DECYZJA")) {
      violations.push(`${display}: service decision layer missing`);
    } else serviceDecisionCount += 1;

    const detailsCount = (html.match(/<details\b/gi) ?? []).length;
    if (detailsCount < 1 || !text.includes("04 / PYTANIA")) violations.push(`${display}: visible service FAQ missing`);
    else serviceFaqCount += 1;

    if (!/href=["']mailto:kontakt@leadflowai\.pl/i.test(html)) violations.push(`${display}: direct contact path missing`);
    else serviceMailtoCount += 1;
  }

  if (article) {
    articleCount += 1;
    if (!text.includes("Zweryfikowano:")) violations.push(`${display}: editorial review marker missing`);
    else reviewedArticleCount += 1;
    if (!/href=["']\/kontakt\/?["']/i.test(html)) violations.push(`${display}: article contact next-step missing`);
    else articleContactCount += 1;
  }
}

if (indexableCount !== 63) violations.push(`GLOBAL: expected 63 indexable pages, found ${indexableCount}`);
if (titleOwners.size !== 63) violations.push(`GLOBAL: expected 63 unique titles, found ${titleOwners.size}`);
if (descriptionOwners.size !== 63) violations.push(`GLOBAL: expected 63 unique descriptions, found ${descriptionOwners.size}`);
if (serviceCount !== 35) violations.push(`GLOBAL: expected 35 Service pages, found ${serviceCount}`);
if (articleCount !== 21) violations.push(`GLOBAL: expected 21 Article pages, found ${articleCount}`);

if (violations.length) {
  console.error(`V15_ONPAGE_SERP_DEFECTS count=${violations.length}`);
  for (const violation of violations) console.error(`- ${violation}`);
  process.exit(1);
}

console.log(
  `V15_ONPAGE_SERP_PASS indexable=63 titles=63_UNIQUE descriptions=63_UNIQUE h1=EXACT_ONE services=35 direct-answer=${serviceDirectAnswerCount}_OF_35 decision=${serviceDecisionCount}_OF_35 faq=${serviceFaqCount}_OF_35 contact-path=${serviceMailtoCount}_OF_35 articles=21 reviewed=${reviewedArticleCount}_OF_21 article-contact=${articleContactCount}_OF_21 ctr=UNMEASURED position=UNMEASURED bulk-rewrite=NO`,
);
