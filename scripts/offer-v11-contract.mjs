import { existsSync, readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`OFFER_V11_CONTRACT_FAIL: ${message}`);
  process.exit(1);
};
const read = (path) => {
  if (!existsSync(path)) fail(`missing ${path}`);
  return readFileSync(path, "utf8");
};

const expanded = read("lib/expanded-services.ts");
const hub = read("app/uslugi/page.tsx");
const registry = read("lib/page-registry.ts");
const sitemap = read("app/sitemap.ts");
const footer = read("components/site-footer.tsx");

const publicExpandedSlugs = [
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

for (const slug of publicExpandedSlugs) {
  if (!expanded.includes(`slug: "${slug}"`)) fail(`expanded registry missing ${slug}`);
  const route = `app/${slug}/page.tsx`;
  const source = read(route);
  if (!source.includes("ServicePage") || !source.includes("metadata")) fail(`route contract incomplete ${slug}`);
}

for (const pillar of ["CREATE", "DISCOVER", "CONVERT", "INTELLIGENCE", "CONNECT", "CARE"]) {
  if (!hub.includes(`key: "${pillar}"`) || !hub.includes(pillar)) fail(`offer hub missing pillar ${pillar}`);
}

if (!hub.includes("expandedServiceLinks") || !hub.includes("Pełna oferta")) fail("offer hub does not use expanded registry");
if (!registry.includes("expandedServicePages") || !registry.includes("expandedServiceLinks")) fail("page registry missing expanded services");
if (!sitemap.includes("expandedServiceLinks") || !sitemap.includes('"uslugi"')) fail("sitemap missing offer hub/expanded services");
if (!footer.includes('href="/uslugi"')) fail("footer missing full offer discovery link");

const codes = [...expanded.matchAll(/code: "([^"]+)"/g)].map((match) => match[1]);
const slugs = [...expanded.matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);
if (new Set(slugs).size !== slugs.length) fail("duplicate expanded service slug");
if (new Set(codes).size !== codes.length) fail("duplicate expanded service code");
if (publicExpandedSlugs.length !== 17) fail("unexpected public expansion count");

for (const banned of ["gwarantujemy pierwsze miejsce", "gwarantowana pozycja", "setki klientów"]) {
  if (expanded.toLowerCase().includes(banned)) fail(`unsupported claim in expanded offer: ${banned}`);
}

console.log(`OFFER_V11_CONTRACT_PASS expanded=${publicExpandedSlugs.length} pillars=6 hub=PASS registry=PASS sitemap=PASS public-truth=PASS`);
