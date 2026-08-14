import { existsSync, readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`OFFER_V11_FAIL: ${message}`);
  process.exit(1);
};

const read = (path) => {
  if (!existsSync(path)) fail(`brak pliku ${path}`);
  return readFileSync(path, "utf8");
};

const expandedSlugs = [
  "ux-ui-design",
  "aplikacje-webowe",
  "cms-headless",
  "pwa",
  "strony-wielojezyczne",
  "copywriting-content",
  "cro-optymalizacja-konwersji",
  "analityka-webowa",
  "formularze-lead-generation",
  "integracje-ai",
  "integracje-api",
  "automatyzacje-www",
  "core-web-vitals",
  "dostepnosc-wcag",
  "bezpieczenstwo-stron",
  "hosting-deploy",
  "opieka-utrzymanie-stron",
];

const extraSlugs = ["rag-bazy-wiedzy", "agenci-ai-www", "monitoring-www"];
const allNewSlugs = [...expandedSlugs, ...extraSlugs];

const expanded = read("lib/expanded-services.ts");
const extra = read("lib/extra-services.ts");
const combined = `${expanded}\n${extra}`;
const hub = read("app/uslugi/page.tsx");
const hubLower = hub.toLowerCase();
const registry = read("lib/page-registry.ts");
const sitemap = read("app/sitemap.ts");
const footer = read("components/v14-closing.tsx");

for (const slug of expandedSlugs) {
  if (!expanded.includes(`slug: "${slug}"`)) fail(`brak usługi ${slug} w expanded registry`);
  const route = read(`app/${slug}/page.tsx`);
  if (!route.includes("metadata") || !route.includes("ServicePage")) fail(`route ${slug} nie ma metadata/ServicePage`);
}

for (const slug of extraSlugs) {
  if (!extra.includes(`slug: "${slug}"`)) fail(`brak usługi ${slug} w extra registry`);
  const route = read(`app/${slug}/page.tsx`);
  if (!route.includes("metadata") || !route.includes("ServicePage")) fail(`route ${slug} nie ma metadata/ServicePage`);
}

if (existsSync("app/uslugi/[slug]/page.tsx") || existsSync("lib/extended-services.ts")) {
  fail("wykryto zduplikowaną nested warstwę usług");
}

for (const phrase of [
  "pełna oferta",
  "tworzenie i rozwój produktów webowych",
  "widoczność i architektura informacji",
  "konwersja i pomiar",
  "inteligencja",
  "integracje i automatyzacje",
  "jakość, bezpieczeństwo i utrzymanie",
]) {
  if (!hubLower.includes(phrase)) fail(`hub usług nie zawiera: ${phrase}`);
}

if (!registry.includes("expandedServicePages") || !registry.includes("extraServicePages") || !registry.includes("experienceServices") || !registry.includes("allPublicServiceLinks")) {
  fail("publiczny graf usług nie obejmuje wszystkich registries");
}
if (!sitemap.includes("expandedServiceLinks") || !sitemap.includes("extraServiceLinks") || !sitemap.includes('"uslugi"')) {
  fail("sitemap nie obejmuje pełnej oferty");
}
if (!footer.includes('href="/uslugi"')) fail("aktywny V14 footer nie prowadzi do pełnej oferty");

for (const slug of allNewSlugs) {
  const source = slug in Object.create(null) ? "" : combined;
  if (!source.includes(`slug: "${slug}"`)) fail(`brak ${slug} w source of truth`);
}

const forbiddenClaims = [
  "gwarantujemy pozycję",
  "gwarantowane pierwsze miejsce",
  "setki klientów",
  "100% skuteczności",
];
for (const claim of forbiddenClaims) {
  if (combined.toLowerCase().includes(claim)) fail(`niedozwolony claim: ${claim}`);
}

console.log(`OFFER_V11_PASS expanded=${allNewSlugs.length} pillars=6 hub=PASS registry=CONNECTED sitemap=PASS footer=V14_ACTIVE duplicate-intent=ABSENT language=PL public-truth=PASS`);
