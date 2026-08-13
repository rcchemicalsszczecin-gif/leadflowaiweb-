import { existsSync, readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`SEARCH_CONTRACT_FAIL: ${message}`);
  process.exit(1);
};

const requireFile = (path) => {
  if (!existsSync(path)) fail(`missing ${path}`);
  return readFileSync(path, "utf8");
};

const routes = [
  "kontakt",
  "strony-internetowe",
  "landing-pages",
  "sklepy-internetowe",
  "web-development",
  "modernizacja-stron",
  "audyt-strony",
  "strony-3d-webgl",
  "interaktywne-strony",
  "motion-design",
  "chatboty-ai",
  "lab",
  "seo",
  "aeo",
  "geo-ai-search",
  "seo-aeo-geo",
  "local-seo",
];

for (const route of routes) {
  const source = requireFile(`app/${route}/page.tsx`);
  if (!source.includes("metadata")) fail(`${route} has no route metadata export`);
}

const sitemap = requireFile("app/sitemap.ts");
if (
  !sitemap.includes("coreServiceLinks") ||
  !sitemap.includes("experienceServiceLinks") ||
  !sitemap.includes("searchServiceLinks") ||
  !sitemap.includes('"kontakt"') ||
  !sitemap.includes('"lab"')
) {
  fail("sitemap is not derived from public registries/contact/lab routes");
}

const robots = requireFile("app/robots.ts");
if (!robots.includes("sitemap.xml") || !robots.includes('allow: "/"')) {
  fail("robots contract is incomplete");
}

const schema = requireFile("lib/structured-data.ts");
for (const type of ["Organization", "WebSite", "WebPage", "Service", "BreadcrumbList", "FAQPage"]) {
  if (!schema.includes(`"@type": "${type}"`)) fail(`missing structured-data type ${type}`);
}

const site = requireFile("lib/site.ts");
if (!site.includes('name: "LeadFlowAI"')) fail("LeadFlowAI brand identity missing");
if (!site.includes('legalName: "Tervyxa Systems sp. z o.o."')) fail("legal operator identity missing");
if (!site.includes('url: "https://leadflowai.pl"')) fail("canonical public domain missing");
if (!site.includes('email: "kontakt@leadflowai.pl"')) fail("public contact e-mail mismatch");
if (!site.includes('href: "/lab"')) fail("Live Lab navigation missing");

const search = requireFile("lib/search-pages.ts");
for (const phrase of ["SEO", "AEO", "GEO / AI Search", "public", "structured data"]) {
  if (!search.toLowerCase().includes(phrase.toLowerCase())) fail(`search architecture content missing ${phrase}`);
}

const experience = requireFile("lib/experience-services.ts");
for (const phrase of ["strony-3d-webgl", "interaktywne-strony", "motion-design", "chatboty-ai"]) {
  if (!experience.includes(phrase)) fail(`experience service missing ${phrase}`);
}

const intentMap = requireFile("docs/quality/V13-10-SEARCH-INTENT-MAP.md");
const intentRows = [...intentMap.matchAll(/^\|\s*(\/[^|\s]+)\s*\|\s*([^|]+?)\s*\|$/gm)]
  .map((match) => ({ url: match[1], intent: match[2].trim() }));
if (intentRows.length !== 63) fail(`intent map must contain 63 public URLs, found ${intentRows.length}`);

const mainUrls = [
  "/", "/uslugi", "/kontakt", "/realizacje", "/o-nas", "/wiedza", "/lab",
  "/strony-internetowe", "/landing-pages", "/sklepy-internetowe", "/web-development", "/modernizacja-stron", "/audyt-strony",
  "/strony-3d-webgl", "/interaktywne-strony", "/motion-design", "/ux-ui-design", "/copywriting-content",
  "/seo", "/aeo", "/geo-ai-search", "/seo-aeo-geo", "/local-seo", "/cro-optymalizacja-konwersji", "/analityka-webowa", "/formularze-lead-generation",
  "/chatboty-ai", "/rag-bazy-wiedzy", "/agenci-ai-www", "/integracje-ai", "/integracje-api", "/automatyzacje-www",
  "/aplikacje-webowe", "/cms-headless", "/pwa", "/strony-wielojezyczne",
  "/core-web-vitals", "/dostepnosc-wcag", "/bezpieczenstwo-stron", "/hosting-deploy", "/opieka-utrzymanie-stron", "/monitoring-www",
];

const knowledgeCore = requireFile("lib/knowledge.ts");
const knowledgeExpanded = requireFile("lib/knowledge-expanded.ts");
const knowledgeSlugs = [...knowledgeCore.matchAll(/slug:\s*"([^"]+)"/g), ...knowledgeExpanded.matchAll(/slug:\s*"([^"]+)"/g)]
  .map((match) => `/wiedza/${match[1]}`);
if (knowledgeSlugs.length !== 21) fail(`expected 21 knowledge URLs, found ${knowledgeSlugs.length}`);

const mappedUrls = new Set(intentRows.map((row) => row.url));
for (const url of [...mainUrls, ...knowledgeSlugs]) {
  if (!mappedUrls.has(url)) fail(`search intent map missing ${url}`);
}
if (mappedUrls.size !== intentRows.length) fail("duplicate URL in search intent map");
const normalizedIntents = intentRows.map((row) => row.intent.toLocaleLowerCase("pl-PL"));
if (new Set(normalizedIntents).size !== normalizedIntents.length) fail("duplicate dominant intent in search intent map");

console.log(`SEARCH_CONTRACT_PASS routes=${routes.length} schema=6 identity=PASS experience=4 lab=PASS contact=PASS intent-map=${intentRows.length}_UNIQUE`);
