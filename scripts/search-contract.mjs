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

console.log(`SEARCH_CONTRACT_PASS routes=${routes.length} schema=6 identity=PASS experience=4 lab=PASS contact=PASS`);
