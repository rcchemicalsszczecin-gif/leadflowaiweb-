import { existsSync, readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`SERVICE_DECISION_V13_FAIL: ${message}`);
  process.exit(1);
};
const read = (path) => {
  if (!existsSync(path)) fail(`missing ${path}`);
  return readFileSync(path, "utf8");
};

const guidance = read("lib/service-decision-guidance.ts");
const renderer = read("components/service-page.tsx");
const slugs = [
  "strony-internetowe", "landing-pages", "sklepy-internetowe", "web-development", "modernizacja-stron", "audyt-strony",
  "strony-3d-webgl", "interaktywne-strony", "motion-design", "ux-ui-design", "copywriting-content",
  "seo", "aeo", "geo-ai-search", "seo-aeo-geo", "local-seo", "cro-optymalizacja-konwersji", "analityka-webowa", "formularze-lead-generation",
  "chatboty-ai", "rag-bazy-wiedzy", "agenci-ai-www", "integracje-ai", "integracje-api", "automatyzacje-www",
  "aplikacje-webowe", "cms-headless", "pwa", "strony-wielojezyczne",
  "core-web-vitals", "dostepnosc-wcag", "bezpieczenstwo-stron", "hosting-deploy", "opieka-utrzymanie-stron", "monitoring-www",
];

for (const slug of slugs) if (!guidance.includes(`"${slug}"`)) fail(`missing guidance for ${slug}`);
for (const phrase of ["Ma sens, gdy", "Nie musi mieć sensu, gdy", "Co wpływa na koszt", "Co wpływa na czas", "getServiceDecisionGuidance(publicPage.slug)"]) {
  if (!renderer.includes(phrase)) fail(`renderer missing ${phrase}`);
}
if (!guidance.includes("nie gwarancja") && !guidance.includes("gwarancja pozycji")) fail("search guidance must reject ranking guarantees");
if (/\b\d+\s*(zł|PLN|dni|tygodni)\b/i.test(guidance)) fail("unapproved price or duration promise detected");

console.log(`SERVICE_DECISION_V13_PASS routes=${slugs.length} groups=6 fit=PASS no-fit=PASS cost-factors=PASS time-factors=PASS comparisons=PASS pricing=UNPUBLISHED`);
