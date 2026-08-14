import { existsSync, readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`V15_AI_SEARCH_TRUTH_FAIL: ${message}`);
  process.exit(1);
};

const read = (path) => {
  if (!existsSync(path)) fail(`missing ${path}`);
  return readFileSync(path, "utf8");
};

const stripHtml = (html) =>
  html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#x27;|&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();

const extract = (html, tag) => {
  const match = html.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? stripHtml(match[1]) : "";
};

const pages = {
  aeo: read("out/aeo/index.html"),
  geo: read("out/geo-ai-search/index.html"),
  unified: read("out/seo-aeo-geo/index.html"),
  article: read("out/wiedza/ai-search-google-co-robic-2026/index.html"),
};
const sitemap = read("out/sitemap.xml");

const visible = Object.fromEntries(Object.entries(pages).map(([key, html]) => [key, stripHtml(html)]));
const titles = Object.fromEntries(Object.entries(pages).map(([key, html]) => [key, extract(html, "title")]));
const h1s = Object.fromEntries(Object.entries(pages).map(([key, html]) => [key, extract(html, "h1")]));

for (const [label, value] of [
  ["AEO title", titles.aeo],
  ["AEO H1", h1s.aeo],
  ["GEO title", titles.geo],
  ["GEO H1", h1s.geo],
  ["unified title", titles.unified],
  ["unified H1", h1s.unified],
]) {
  if (!value) fail(`${label} missing`);
}

if (!h1s.aeo.includes("AEO:") || !visible.aeo.includes("architektury informacji i treści")) {
  fail("AEO page no longer owns answer-architecture role");
}
if (!visible.aeo.includes("nie tworzy osobnego wymogu rankingowego") || !visible.aeo.includes("AI Overviews")) {
  fail("AEO Google-specific non-separate-ranking boundary missing");
}

if (!h1s.geo.includes("GEO i AI Search") || !visible.geo.includes("gotowość źródłową")) {
  fail("GEO page no longer owns source/entity/evidence readiness role");
}
for (const required of [
  "nie wymagają specjalnego schema ani pliku llms.txt",
  "indeksowanie i wyświetlanie nie są gwarantowane",
  "Raport skuteczności generatywnej AI",
  "AI Overviews",
  "AI Mode",
]) {
  if (!visible.geo.includes(required)) fail(`GEO public truth marker missing: ${required}`);
}

if (!h1s.unified.includes("trzy jasno rozdzielone role")) {
  fail("unified SEO/AEO/GEO ownership H1 missing");
}
for (const required of [
  "SEO odpowiada za techniczną dostępność",
  "AEO porządkuje bezpośrednie odpowiedzi",
  "GEO / AI Search porządkuje encje",
  "AEO i GEO nie zastępują SEO",
]) {
  if (!visible.unified.includes(required)) fail(`unified role marker missing: ${required}`);
}

for (const required of [
  "Google nie traktuje AEO i GEO jako osobnych systemów rankingowych",
  "llms.txt",
  "specjalny schema",
  "Raport skuteczności generatywnej AI",
  "AI Overviews",
  "AI Mode",
  "14.08.2026",
]) {
  if (!visible.article.includes(required)) fail(`2026 AI Search article marker missing: ${required}`);
}
if (!pages.article.includes("https://support.google.com/webmasters/answer/16984139?hl=pl")) {
  fail("Search Console Generative AI report source link missing from article");
}
if (!pages.article.includes('"dateModified":"2026-08-14"')) {
  fail("updated AI Search article JSON-LD dateModified is not 2026-08-14");
}

const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
if (sitemapUrls.length !== 63) fail(`expected preserved 63-URL sitemap, found ${sitemapUrls.length}`);
for (const path of ["/aeo/", "/geo-ai-search/", "/seo-aeo-geo/", "/wiedza/ai-search-google-co-robic-2026/"]) {
  if (!sitemapUrls.some((url) => new URL(url).pathname === path)) fail(`required canonical absent from sitemap: ${path}`);
}
if (sitemapUrls.some((url) => new URL(url).pathname.toLowerCase().includes("llms"))) {
  fail("llms canonical unexpectedly introduced");
}
if (existsSync("out/llms.txt") || existsSync("out/llms/index.html")) {
  fail("llms.txt/public llms route introduced for Google ranking theatre");
}

const combinedVisible = Object.values(visible).join("\n").toLowerCase();
for (const forbidden of [
  "gwarantujemy, że chatgpt",
  "gwarantujemy cytowanie",
  "gwarantowane cytowanie",
  "pewne cytowanie przez ai",
  "100% widoczności w ai",
]) {
  if (combinedVisible.includes(forbidden)) fail(`forbidden AI visibility guarantee: ${forbidden}`);
}

if (new Set([h1s.aeo, h1s.geo, h1s.unified]).size !== 3) {
  fail("AEO/GEO/unified H1 roles collapsed into duplicate ownership");
}

console.log(
  "V15_AI_SEARCH_TRUTH_PASS pages=aeo,geo-ai-search,seo-aeo-geo article=ai-search-google-2026 roles=DISTINCT google-seo-foundation=PASS llms=NO special-ai-schema=NO citation-guarantee=NO gsc-generative-report=VISIBLE article-review=2026-08-14 sitemap=63_PRESERVED",
);
