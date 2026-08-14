import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { basename, join, relative } from "node:path";

const fail = (message) => {
  console.error(`RENDERED_SEARCH_TRUTH_V14_FAIL: ${message}`);
  process.exit(1);
};

if (!existsSync("out")) fail("static export out/ missing");
if (!existsSync("out/sitemap.xml")) fail("sitemap.xml missing");
if (!existsSync("out/robots.txt")) fail("robots.txt missing");

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

const hasNoindex = (html) => /<meta\b[^>]*\bname=["']robots["'][^>]*\bcontent=["'][^"']*noindex/i.test(html);
const indexableHtml = [];
const noindexHtml = [];
for (const path of htmlFiles) {
  const html = readFileSync(path, "utf8");
  if (hasNoindex(html)) noindexHtml.push(path);
  else indexableHtml.push(path);
}
if (indexableHtml.length < 60) fail(`unexpectedly small indexable HTML set: ${indexableHtml.length}`);
if (noindexHtml.length < 1) fail("expected at least one noindex error artifact");

const sitemap = readFileSync("out/sitemap.xml", "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
if (sitemapUrls.length < 60) fail(`unexpectedly small sitemap URL set: ${sitemapUrls.length}`);
if (new Set(sitemapUrls).size !== sitemapUrls.length) fail("duplicate URLs in sitemap");

const violations = [];
const canonicals = new Map();
let schemas = 0;
let serviceSchemas = 0;
let articleSchemas = 0;
let faqSchemas = 0;

const addViolation = (display, message) => violations.push(`${display}: ${message}`);

const getCanonical = (html) => {
  const tags = html.match(/<link\b[^>]*>/gi) ?? [];
  for (const tag of tags) {
    if (!/\brel=["']canonical["']/i.test(tag)) continue;
    return tag.match(/\bhref=["']([^"']+)["']/i)?.[1] ?? null;
  }
  return null;
};

const getMetaDescription = (html) => {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  for (const tag of tags) {
    if (!/\bname=["']description["']/i.test(tag)) continue;
    return tag.match(/\bcontent=["']([^"']*)["']/i)?.[1] ?? null;
  }
  return null;
};

const decodeEntities = (value) => value
  .replace(/&quot;/g, '"')
  .replace(/&amp;/g, "&")
  .replace(/&lt;/g, "<")
  .replace(/&gt;/g, ">");

for (const path of indexableHtml) {
  const html = readFileSync(path, "utf8");
  const display = relative("out", path);

  if (!/<html\b[^>]*\blang=["']pl["']/i.test(html)) addViolation(display, "html lang is not pl");
  if (hasNoindex(html)) addViolation(display, "indexable page contains noindex");

  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "";
  if (title.length < 8 || title.length > 120) addViolation(display, `invalid title length ${title.length}`);

  const description = getMetaDescription(html)?.trim() ?? "";
  if (description.length < 50 || description.length > 220) addViolation(display, `invalid meta description length ${description.length}`);

  const h1Count = (html.match(/<h1\b/gi) ?? []).length;
  if (h1Count !== 1) addViolation(display, `expected exactly one H1, found ${h1Count}`);

  const canonical = getCanonical(html);
  if (!canonical) {
    addViolation(display, "canonical missing");
  } else if (!canonical.startsWith("https://leadflowai.pl")) {
    addViolation(display, `canonical outside leadflowai.pl: ${canonical}`);
  } else if (canonicals.has(canonical)) {
    addViolation(display, `duplicate canonical also used by ${canonicals.get(canonical)}: ${canonical}`);
  } else {
    canonicals.set(canonical, display);
  }

  if (/localhost|127\.0\.0\.1|api\.leadflowai\.pl\/leads/i.test(html)) addViolation(display, "local/disabled runtime URL leaked into public HTML");
  if (/\bLorem ipsum\b|\bComing soon\b|\bPLACEHOLDER\b/i.test(html)) addViolation(display, "placeholder residue found");

  const jsonLdMatches = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  if (!jsonLdMatches.length) addViolation(display, "JSON-LD missing");
  for (const match of jsonLdMatches) {
    let parsed;
    try {
      parsed = JSON.parse(decodeEntities(match[1]));
    } catch (error) {
      addViolation(display, `invalid JSON-LD: ${error instanceof Error ? error.message : String(error)}`);
      continue;
    }
    schemas += 1;
    const nodes = Array.isArray(parsed) ? parsed : parsed?.["@graph"] ? parsed["@graph"] : [parsed];
    for (const node of nodes) {
      const type = node?.["@type"];
      const types = Array.isArray(type) ? type : [type];
      if (types.includes("Service")) serviceSchemas += 1;
      if (types.includes("Article")) articleSchemas += 1;
      if (types.includes("FAQPage")) faqSchemas += 1;
    }
  }
}

if (canonicals.size !== indexableHtml.length) violations.push(`GLOBAL: canonical cardinality mismatch ${canonicals.size} != ${indexableHtml.length}`);
const sitemapSet = new Set(sitemapUrls);
const canonicalSet = new Set(canonicals.keys());
const orphanCanonicals = [...canonicalSet].filter((url) => !sitemapSet.has(url));
const orphanSitemapUrls = [...sitemapSet].filter((url) => !canonicalSet.has(url));
if (orphanCanonicals.length) {
  violations.push(`GLOBAL: canonicals missing from sitemap: ${orphanCanonicals.map((url) => `${url}<=${canonicals.get(url)}`).join(",")}`);
}
if (orphanSitemapUrls.length) {
  violations.push(`GLOBAL: sitemap URLs missing matching canonical HTML: ${orphanSitemapUrls.join(",")}`);
}

const robots = readFileSync("out/robots.txt", "utf8");
if (!robots.includes("Sitemap: https://leadflowai.pl/sitemap.xml")) violations.push("GLOBAL: robots sitemap directive mismatch");
if (/Disallow:\s*\//i.test(robots)) violations.push("GLOBAL: robots globally disallows public crawl");

if (serviceSchemas < 35) violations.push(`GLOBAL: expected at least 35 Service schema nodes, found ${serviceSchemas}`);
if (articleSchemas !== 21) violations.push(`GLOBAL: expected 21 Article schema nodes, found ${articleSchemas}`);
if (faqSchemas < 1) violations.push("GLOBAL: FAQPage schema missing from rendered public layer");

const about = readFileSync("out/o-nas/index.html", "utf8");
const contact = readFileSync("out/kontakt/index.html", "utf8");
if (!about.includes("Tervyxa Systems sp. z o.o.")) violations.push("GLOBAL: legal entity truth missing from /o-nas");
if (!contact.includes("kontakt@leadflowai.pl")) violations.push("GLOBAL: public contact truth missing from /kontakt");
if (!contact.includes("Formularz online jest obecnie wyłączony")) violations.push("GLOBAL: lead-delivery OFF truth missing from /kontakt");

const notFoundPath = htmlFiles.find((path) => basename(path) === "404.html");
if (!notFoundPath) {
  violations.push("GLOBAL: branded 404 artifact missing");
} else {
  const notFound = readFileSync(notFoundPath, "utf8");
  if (!notFound.includes("Ta ścieżka nie prowadzi do aktywnej strony")) violations.push("GLOBAL: branded 404 truth missing");
  if (!hasNoindex(notFound)) violations.push("GLOBAL: 404 artifact must remain noindex");
}

if (violations.length) {
  console.error(`RENDERED_SEARCH_TRUTH_V14_DEFECTS count=${violations.length}`);
  for (const violation of violations) console.error(`- ${violation}`);
  process.exit(1);
}

console.log(
  `RENDERED_SEARCH_TRUTH_V14_PASS indexable-html=${indexableHtml.length} noindex-artifacts=${noindexHtml.length} canonicals=${canonicals.size}_UNIQUE sitemap=${sitemapUrls.length}_EXACT_SET titles=PASS descriptions=PASS h1=EXACT_ONE lang=PL robots=PASS schemas=${schemas} service>=${serviceSchemas} article=${articleSchemas} faq>=${faqSchemas} 404=BRANDED_NOINDEX public-truth=PASS runtime-leaks=ABSENT placeholders=ABSENT`,
);
