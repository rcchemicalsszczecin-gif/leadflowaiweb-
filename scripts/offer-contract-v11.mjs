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

const expanded = read("lib/expanded-services.ts");
const hub = read("app/uslugi/page.tsx");
const registry = read("lib/page-registry.ts");
const sitemap = read("app/sitemap.ts");
const footer = read("components/site-footer.tsx");

for (const slug of expandedSlugs) {
  if (!expanded.includes(`slug: "${slug}"`)) fail(`brak usługi ${slug} w registry`);
  const route = read(`app/${slug}/page.tsx`);
  if (!route.includes("metadata") || !route.includes("ServicePage")) fail(`route ${slug} nie ma metadata/ServicePage`);
}

for (const phrase of [
  "Pełna oferta",
  "Tworzenie i rozwój produktów webowych",
  "Widoczność i architektura informacji",
  "Konwersja i pomiar",
  "Integracje i automatyzacje",
  "Jakość, bezpieczeństwo i utrzymanie",
]) {
  if (!hub.includes(phrase)) fail(`hub usług nie zawiera: ${phrase}`);
}

if (!registry.includes("expandedServicePages") || !registry.includes("experienceServices") || !registry.includes("allPublicServiceLinks")) {
  fail("publiczny graf usług nie obejmuje wszystkich registries");
}
if (!sitemap.includes("expandedServiceLinks") || !sitemap.includes('"uslugi"')) fail("sitemap nie obejmuje pełnej oferty");
if (!footer.includes('href="/uslugi"')) fail("footer nie prowadzi do pełnej oferty");

const forbiddenClaims = [
  "gwarantujemy pozycję",
  "gwarantowane pierwsze miejsce",
  "setki klientów",
  "100% skuteczności",
];
for (const claim of forbiddenClaims) {
  if (expanded.toLowerCase().includes(claim)) fail(`niedozwolony claim: ${claim}`);
}

console.log(`OFFER_V11_PASS expanded=${expandedSlugs.length} hub=PASS registry=CONNECTED sitemap=PASS language=PL public-truth=PASS`);
