import { readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`HOMEPAGE_LANGUAGE_CONTRACT_FAIL: ${message}`);
  process.exit(1);
};

const paths = [
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
const combined = paths.map((path) => `${path}\n${readFileSync(path, "utf8")}`).join("\n");
const forbidden = [
  "WEB PRODUCT", "SEARCH LAYER", "ENTITY / INTENT / ANSWER", "AI LAYER",
  "LIVE PRODUCT", "PRODUCT UI", "LIQUID ENGINE", "REAL-TIME SURFACE",
  "SPATIAL PRODUCT", "MOBILE PRODUCT", "BUSINESS SYSTEM", "PRE-PUBLISH",
  "FIRST-PARTY", "SIGNATURE INTERACTION", "CARE · SECURITY · SPEED",
];
for (const phrase of forbidden) if (combined.toUpperCase().includes(phrase)) fail(`decorative English remains: ${phrase}`);
for (const required of [
  "STRONY I SYSTEMY WWW", "pomagają firmie rosnąć", "SPRAWDŹ, CZY TO PASUJE",
  "Zacznij od potrzeby", "INTERAKCJA Z UZASADNIENIEM", "WIDOCZNOŚĆ: SEO · AEO · GEO",
  "JAK PRACUJEMY", "REALIZACJE WŁASNE I MARKI POWIĄZANE", "MARKA I ODPOWIEDZIALNOŚĆ",
  "WIEDZA PRZED DECYZJĄ", "PRZYGOTUJ PIERWSZĄ WIADOMOŚĆ", "NASTĘPNY KROK",
]) if (!combined.includes(required)) fail(`required Polish homepage marker missing: ${required}`);

console.log(`HOMEPAGE_LANGUAGE_CONTRACT_PASS sources=${paths.length} decorative-technical-english=0 public-language=POLISH approved-acronyms=SEO,AEO,GEO,AI,API,RAG,UX,UI,WWW,WebGL`);
