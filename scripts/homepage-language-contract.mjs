import { readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`HOMEPAGE_LANGUAGE_CONTRACT_FAIL: ${message}`);
  process.exit(1);
};

const componentPaths = [
  "components/v14-hero.tsx",
  "components/v14-signature-stage.tsx",
  "components/v14-browser-mockup.tsx",
  "components/v14-phone-mockup.tsx",
  "components/v14-services.tsx",
  "components/v14-device-theater.tsx",
  "components/v14-liquid-constructor.tsx",
  "components/v14-search-trinity.tsx",
  "components/v14-process-canvas.tsx",
  "components/v14-portfolio.tsx",
  "components/v14-knowledge-faq.tsx",
  "components/v14-contact-brief.tsx",
  "components/v14-closing.tsx",
];

const svgPaths = [
  "public/v14-search-trinity-dark.svg",
  "public/v14-quality-canvas.svg",
];

const components = new Map(componentPaths.map((path) => [path, readFileSync(path, "utf8")]));
const svgs = new Map(svgPaths.map((path) => [path, readFileSync(path, "utf8")]));
const componentText = [...components].map(([path, source]) => `${path}\n${source}`).join("\n");

const extractSvgPublicText = (source) => [...source.matchAll(/<(?:text|title|desc)\b[^>]*>([\s\S]*?)<\/(?:text|title|desc)>/gi)]
  .map((match) => match[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim())
  .filter(Boolean);

const svgPublicText = [...svgs].flatMap(([, source]) => extractSvgPublicText(source)).join("\n");

const forbiddenDomEnglish = [
  "WEB PRODUCT", "SEARCH LAYER", "ENTITY / INTENT / ANSWER", "AI LAYER",
  "LIVE PRODUCT", "PRODUCT UI", "LIQUID ENGINE", "REAL-TIME SURFACE",
  "SPATIAL PRODUCT", "MOBILE PRODUCT", "BUSINESS SYSTEM", "PRE-PUBLISH",
  "FIRST-PARTY", "SIGNATURE INTERACTION", "CARE · SECURITY · SPEED",
];
const forbiddenSvgEnglish = [
  "SEARCH", "ENTITY", "SERVICE", "ACCESSIBILITY", "PERFORMANCE", "SECURITY",
  "RELEASE RULE", "EVIDENCE FIRST", "QUALITY CANVAS",
];

for (const phrase of forbiddenDomEnglish) {
  if (componentText.toUpperCase().includes(phrase)) fail(`DOM decorative English remains: ${phrase}`);
}
for (const phrase of [...forbiddenDomEnglish, ...forbiddenSvgEnglish]) {
  if (svgPublicText.toUpperCase().includes(phrase)) fail(`SVG decorative English remains: ${phrase}`);
}

for (const required of [
  "STRONY I SYSTEMY WWW", "pomagają firmie rosnąć", "SPRAWDŹ, CZY TO PASUJE",
  "Zacznij od potrzeby", "INTERAKCJA Z UZASADNIENIEM", "WIDOCZNOŚĆ: SEO · AEO · GEO",
  "JAK PRACUJEMY", "REALIZACJE WŁASNE I MARKI POWIĄZANE", "MARKA I ODPOWIEDZIALNOŚĆ",
  "WIEDZA PRZED DECYZJĄ", "PRZYGOTUJ PIERWSZĄ WIADOMOŚĆ", "NASTĘPNY KROK",
]) if (!componentText.includes(required)) fail(`required Polish homepage marker missing: ${required}`);

for (const required of [
  "JEDNO ŹRÓDŁO TREŚCI", "CZŁOWIEK", "WYSZUKIWARKA", "SYSTEM AI",
  "WERYFIKACJA PRZED PUBLIKACJĄ", "DOSTĘPNOŚĆ", "WYDAJNOŚĆ", "WIDOCZNOŚĆ", "BEZPIECZEŃSTWO",
]) if (!svgPublicText.includes(required)) fail(`required Polish SVG marker missing: ${required}`);

const leadingZeroLiteral = /["'`]0[1-9]["'`]|>\s*0[1-9]\s*</;
for (const [path, source] of components) {
  if (leadingZeroLiteral.test(source) || source.includes("0{index")) fail(`leading-zero visual identifier remains in ${path}`);
}
for (const [path, source] of svgs) {
  if (/<text\b[^>]*>\s*0[1-9](?:\s*\/|\s*<)/i.test(source)) fail(`leading-zero SVG identifier remains in ${path}`);
}

for (const path of ["components/v14-liquid-constructor.tsx", "components/v14-process-canvas.tsx"]) {
  const source = components.get(path);
  for (const number of ["1", "2", "3", "4", "5"]) {
    if (!source.includes(`["${number}"`) && !source.includes(`>${number} /`)) fail(`${path} missing meaningful single-integer step ${number}`);
  }
}

if (/\["0[1-6]"/.test(components.get("components/v14-services.tsx"))) fail("services retain decorative numbering");
if (components.get("components/v14-portfolio.tsx").includes("index + 1")) fail("portfolio retains decorative numbering");

console.log(`HOMEPAGE_LANGUAGE_CONTRACT_PASS dom-sources=${componentPaths.length} svg-sources=${svgPaths.length} dom-decorative-english=0 svg-decorative-english=0 visible-leading-zero-numbering=0 public-language=POLISH approved-acronyms=SEO,AEO,GEO,AI,API,RAG,UX,UI,WWW,WebGL`);
