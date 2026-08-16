import { readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`PUBLIC_SERVICE_MODEL_V14_FAIL: ${message}`);
  process.exit(1);
};

const renderer = readFileSync("components/service-page.tsx", "utf8");
const adapter = readFileSync("lib/public-service-page.ts", "utf8");
const text = readFileSync("lib/public-text.ts", "utf8");
const guidance = readFileSync("lib/service-decision-guidance.ts", "utf8");

for (const required of [
  "toPublicServicePage(page)",
  "getPageStructuredData(publicPage)",
  "V14RouteSiteHeader",
  "V14SiteFooter",
  'id="main-content"',
  "v14-service-page",
  "tabIndex={-1}",
]) {
  if (!renderer.includes(required)) fail(`renderer missing ${required}`);
}

if (renderer.includes("<SiteHeader") || renderer.includes("<SiteFooter")) {
  fail("legacy service shell still mounted by shared renderer");
}

for (const required of ["capabilities: page.capabilities.map(publicTaxonomy)", "tags: item.tags.map(publicTaxonomy)", "description: publicText(item.description)"]) {
  if (!adapter.includes(required)) fail(`adapter missing ${required}`);
}

for (const required of ["search architecture", "development", "landing pages?", "checkout", "structured data", "internal linking", "question architecture", "local intent"]) {
  if (!text.toLowerCase().includes(required)) fail(`public text map missing ${required}`);
}

const decisionSlugs = [
  "strony-internetowe", "landing-pages", "sklepy-internetowe", "web-development", "modernizacja-stron", "audyt-strony",
  "strony-3d-webgl", "interaktywne-strony", "motion-design", "ux-ui-design", "copywriting-content",
  "seo", "aeo", "geo-ai-search", "seo-aeo-geo", "local-seo", "cro-optymalizacja-konwersji", "analityka-webowa", "formularze-lead-generation",
  "chatboty-ai", "rag-bazy-wiedzy", "agenci-ai-www", "integracje-ai", "integracje-api", "automatyzacje-www",
  "aplikacje-webowe", "cms-headless", "pwa", "strony-wielojezyczne",
  "core-web-vitals", "dostepnosc-wcag", "bezpieczenstwo-stron", "hosting-deploy", "opieka-utrzymanie-stron", "monitoring-www",
];
for (const slug of decisionSlugs) if (!guidance.includes(`"${slug}"`)) fail(`decision guidance missing ${slug}`);
for (const required of ["getServiceDecisionGuidance(publicPage.slug)", "Ma sens, gdy", "Nie musi mieć sensu, gdy", "Co wpływa na koszt", "Co wpływa na czas"]) {
  if (!renderer.includes(required)) fail(`decision renderer missing ${required}`);
}
if (!guidance.includes("gwarancja pozycji")) fail("search guidance must reject ranking guarantees");
if (/\b\d+\s*(zł|PLN|dni|tygodni)\b/i.test(guidance)) fail("unapproved price or duration promise detected");

console.log(`PUBLIC_SERVICE_MODEL_V14_PASS renderer=NORMALIZED shell=V14 schema=NORMALIZED taxonomy=PL descriptions=PL decisions=${decisionSlugs.length} groups=6 pricing=UNPUBLISHED`);
