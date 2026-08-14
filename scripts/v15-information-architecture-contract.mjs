import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const fail = (message) => {
  console.error(`V15_INFORMATION_ARCHITECTURE_FAIL: ${message}`);
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

const hasNoindex = (html) => /<meta\b[^>]*\bname=["']robots["'][^>]*\bcontent=["'][^"']*noindex/i.test(html);
const decodeEntities = (value) =>
  value
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

const getCanonical = (html) => {
  for (const tag of html.match(/<link\b[^>]*>/gi) ?? []) {
    if (!/\brel=["']canonical["']/i.test(tag)) continue;
    return tag.match(/\bhref=["']([^"']+)["']/i)?.[1] ?? null;
  }
  return null;
};

const getSchemaTypes = (html) => {
  const types = new Set();
  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    let parsed;
    try {
      parsed = JSON.parse(decodeEntities(match[1]));
    } catch {
      continue;
    }
    const nodes = Array.isArray(parsed) ? parsed : parsed?.["@graph"] ? parsed["@graph"] : [parsed];
    for (const node of nodes) {
      const type = node?.["@type"];
      for (const item of Array.isArray(type) ? type : [type]) {
        if (typeof item === "string") types.add(item);
      }
    }
  }
  return types;
};

const normalizePath = (href, base) => {
  if (!href || /^(?:mailto:|tel:|javascript:|data:)/i.test(href)) return null;
  let url;
  try {
    url = new URL(href, base);
  } catch {
    return null;
  }
  if (url.hostname !== "leadflowai.pl") return null;
  let path = url.pathname || "/";
  if (path !== "/" && !path.endsWith("/")) path += "/";
  return path;
};

const pages = [];
for (const path of htmlFiles) {
  const html = readFileSync(path, "utf8");
  if (hasNoindex(html)) continue;
  const canonical = getCanonical(html);
  if (!canonical) continue;
  const anchorPaths = new Set();
  for (const tag of html.match(/<a\b[^>]*>/gi) ?? []) {
    const href = tag.match(/\bhref=["']([^"']+)["']/i)?.[1];
    const normalized = normalizePath(href, canonical);
    if (normalized) anchorPaths.add(normalized);
  }
  pages.push({
    display: relative("out", path),
    canonical,
    path: new URL(canonical).pathname,
    anchorPaths,
    schemaTypes: getSchemaTypes(html),
  });
}

const servicePages = pages.filter((page) => page.schemaTypes.has("Service"));
const articlePages = pages.filter((page) => page.schemaTypes.has("Article"));
if (servicePages.length !== 35) fail(`expected 35 rendered Service pages, found ${servicePages.length}`);
if (articlePages.length !== 21) fail(`expected 21 rendered Article pages, found ${articlePages.length}`);

const servicePaths = new Set(servicePages.map((page) => page.path));
const articlePaths = new Set(articlePages.map((page) => page.path));
const serviceReferencedArticles = new Set();
const violations = [];
let serviceKnowledgeEdges = 0;
let articleServiceEdges = 0;

for (const page of servicePages) {
  const links = [...page.anchorPaths].filter((path) => articlePaths.has(path));
  if (links.length === 0) violations.push(`${page.display}: Service page has no rendered link to a knowledge Article`);
  for (const path of links) {
    serviceReferencedArticles.add(path);
    serviceKnowledgeEdges += 1;
  }
}

for (const page of articlePages) {
  if (!page.anchorPaths.has("/wiedza/")) {
    violations.push(`${page.display}: Article does not link back to /wiedza/ hub`);
  }
  const commercialLinks = [...page.anchorPaths].filter((path) => servicePaths.has(path));
  if (commercialLinks.length === 0) {
    violations.push(`${page.display}: Article has no rendered link to a Service page`);
  }
  articleServiceEdges += commercialLinks.length;
}

const unreferencedArticles = [...articlePaths].filter((path) => !serviceReferencedArticles.has(path));
if (unreferencedArticles.length) {
  violations.push(`GLOBAL: knowledge Articles not referenced by any Service page: ${unreferencedArticles.join(", ")}`);
}

if (violations.length) {
  console.error(`V15_INFORMATION_ARCHITECTURE_DEFECTS count=${violations.length}`);
  for (const violation of violations) console.error(`- ${violation}`);
  process.exit(1);
}

console.log(
  `V15_INFORMATION_ARCHITECTURE_PASS services=35_WITH_KNOWLEDGE articles=21_WITH_SERVICE hub-return=21_OF_21 knowledge-coverage=21_OF_21 service-knowledge-edges=${serviceKnowledgeEdges} article-service-edges=${articleServiceEdges} canonical-set=UNCHANGED`,
);
