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

const isNotFoundArtifact = (path) => path.includes("_not-found") || basename(path) === "404.html";
const publicHtml = htmlFiles.filter((path) => !isNotFoundArtifact(path));
if (publicHtml.length < 60) fail(`unexpectedly small public HTML set: ${publicHtml.length}`);

const sitemap = readFileSync("out/sitemap.xml", "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
if (sitemapUrls.length < 60) fail(`unexpectedly small sitemap URL set: ${sitemapUrls.length}`);
if (new Set(sitemapUrls).size !== sitemapUrls.length) fail("duplicate URLs in sitemap");

const canonicals = new Map();
let schemas = 0;
let serviceSchemas = 0;
let articleSchemas = 0;
let faqSchemas = 0;

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

for (const path of publicHtml) {
  const html = readFileSync(path, "utf8");
  const display = relative("out", path);

  if (!/<html\b[^>]*\blang=["']pl["']/i.test(html)) fail(`${display}: html lang is not pl`);
  if (/<meta\b[^>]*\bname=["']robots["'][^>]*\bcontent=["'][^"']*noindex/i.test(html)) fail(`${display}: public page contains noindex`);

  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "";
  if (title.length < 8 || title.length > 120) fail(`${display}: invalid title length ${title.length}`);

  const description = getMetaDescription(html)?.trim() ?? "";
  if (description.length < 50 || description.length > 220) fail(`${display}: invalid meta description length ${description.length}`);

  const h1Count = (html.match(/<h1\b/gi) ?? []).length;
  if (h1Count !== 1) fail(`${display}: expected exactly one H1, found ${h1Count}`);

  const canonical = getCanonical(html);
  if (!canonical) fail(`${display}: canonical missing`);
  if (!canonical.startsWith("https://leadflowai.pl")) fail(`${display}: canonical outside leadflowai.pl: ${canonical}`);
  if (canonicals.has(canonical)) fail(`${display}: duplicate canonical also used by ${canonicals.get(canonical)}: ${canonical}`);
  canonicals.set(canonical, display);

  if (/localhost|127\.0\.0\.1|api\.leadflowai\.pl\/leads/i.test(html)) fail(`${display}: local/disabled runtime URL leaked into public HTML`);
  if (/\bLorem ipsum\b|\bComing soon\b|\bPLACEHOLDER\b/i.test(html)) fail(`${display}: placeholder residue found`);

  const jsonLdMatches = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  if (!jsonLdMatches.length) fail(`${display}: JSON-LD missing`);
  for (const match of jsonLdMatches) {
    let parsed;
    try {
      parsed = JSON.parse(decodeEntities(match[1]));
    } catch (error) {
      fail(`${display}: invalid JSON-LD: ${error instanceof Error ? error.message : String(error)}`);
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

if (canonicals.size !== publicHtml.length) fail(`canonical cardinality mismatch: ${canonicals.size} != ${publicHtml.length}`);
const sitemapSet = new Set(sitemapUrls);
const canonicalSet = new Set(canonicals.keys());
const orphanCanonicals = [...canonicalSet].filter((url) => !sitemapSet.has(url));
const orphanSitemapUrls = [...sitemapSet].filter((url) => !canonicalSet.has(url));
if (orphanCanonicals.length || orphanSitemapUrls.length) {
  const canonicalDetails = orphanCanonicals.map((url) => `${url}<=${canonicals.get(url)}`).join(",") || "NONE";
  const sitemapDetails = orphanSitemapUrls.join(",") || "NONE";
  fail(`canonical/sitemap set drift canonicals-only=[${canonicalDetails}] sitemap-only=[${sitemapDetails}]`);
}

const robots = readFileSync("out/robots.txt", "utf8");
if (!robots.includes("Sitemap: https://leadflowai.pl/sitemap.xml")) fail("robots sitemap directive mismatch");
if (/Disallow:\s*\//i.test(robots)) fail("robots globally disallows public crawl");

if (serviceSchemas < 35) fail(`expected at least 35 Service schema nodes, found ${serviceSchemas}`);
if (articleSchemas !== 21) fail(`expected 21 Article schema nodes, found ${articleSchemas}`);
if (faqSchemas < 1) fail("FAQPage schema missing from rendered public layer");

const about = readFileSync("out/o-nas/index.html", "utf8");
const contact = readFileSync("out/kontakt/index.html", "utf8");
if (!about.includes("Tervyxa Systems sp. z o.o.")) fail("legal entity truth missing from /o-nas");
if (!contact.includes("kontakt@leadflowai.pl")) fail("public contact truth missing from /kontakt");
if (!contact.includes("Formularz online jest obecnie wyłączony")) fail("lead-delivery OFF truth missing from /kontakt");

const notFoundPath = htmlFiles.find((path) => basename(path) === "404.html");
if (!notFoundPath) fail("branded 404 artifact missing");
const notFound = readFileSync(notFoundPath, "utf8");
if (!notFound.includes("Ta ścieżka nie prowadzi do aktywnej strony")) fail("branded 404 truth missing");
if (!/noindex/i.test(notFound)) fail("404 artifact must remain noindex");

console.log(
  `RENDERED_SEARCH_TRUTH_V14_PASS html=${publicHtml.length} canonicals=${canonicals.size}_UNIQUE sitemap=${sitemapUrls.length}_EXACT_SET titles=PASS descriptions=PASS h1=EXACT_ONE lang=PL robots=PASS schemas=${schemas} service>=${serviceSchemas} article=${articleSchemas} faq>=${faqSchemas} 404=BRANDED_NOINDEX public-truth=PASS runtime-leaks=ABSENT placeholders=ABSENT`,
);
