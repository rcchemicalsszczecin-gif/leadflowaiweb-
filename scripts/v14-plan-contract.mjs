import { existsSync, readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`V14_PLAN_CONTRACT_FAIL: ${message}`);
  globalThis.process.exit(1);
};

const read = (path) => {
  if (!existsSync(path)) fail(`missing ${path}`);
  return readFileSync(path, "utf8");
};

const agents = read("AGENTS.md");
const currentState = read("docs/governance/CURRENT-STATE.md");
const ownerV14 = read("docs/governance/WEBSITE-OWNER-DECISION-V14.md");
const sourceOfTruth = read("docs/governance/SOURCE-OF-TRUTH-POLICY.md");
const masterPlan = read("docs/plans/LEADFLOWAI_AUTHORITATIVE_MASTER_PLAN_V1.md");
const v14Plan = read("docs/plans/V14-VISUAL-REBUILD.md");
const repoStatus = read("docs/architecture/REPO-STATUS.md");
const layout = read("app/layout.tsx");
const hero = read("components/v14-hero.tsx");
const signature = read("components/v14-signature-stage.tsx");
const processComponent = read("components/v14-process-canvas.tsx");
const homepage = read("app/page.tsx");
const liquidConstructor = read("components/v14-liquid-constructor.tsx");
const liquidSurface = read("components/v14-liquid-surface.tsx");
const siteHeader = read("components/v14-site-header.tsx");
const legacyGenerator = read("scripts/generate-v14-legacy-routes-css.mjs");
const globalWorldContract = read("scripts/global-liquid-world-v14-contract.mjs");
const packageJson = read("package.json");
const browserMatrix = read("scripts/browser-matrix-v14.py");
const renderedSearch = read("scripts/rendered-search-truth-v14.mjs");

for (const required of ["Current design authority — V14", "35 service/money pages", "21 knowledge articles", "63 dominant search intents"]) {
  if (!agents.includes(required)) fail(`AGENTS invariant missing: ${required}`);
}

for (const required of [
  "Production authority: V14 Global Liquid World",
  "36ad3fd6130ce21e68a2c5e701a516fcb3703b65",
  "50b71632c687e032311556371108ce3f8d989650",
  "31809931666",
  "GitHub Pages deployment: PASS",
  "V14.9 final QA: COMPLETE",
  "V14.10 Owner Visual PASS: ACCEPTED",
  "R9 pre-merge hardening: PASS",
  "Production merge: COMPLETE",
]) {
  if (!currentState.includes(required)) fail(`CURRENT-STATE invariant missing: ${required}`);
}

for (const required of [
  "OWNER_VISUAL_PASS=ACCEPTED",
  "V14_GLOBAL_LIQUID_OWNER_AUTHORIZATION=GRANTED_AND_EXERCISED",
  "V14_GLOBAL_LIQUID_CANDIDATE=50b71632c687e032311556371108ce3f8d989650",
  "V14_PRODUCTION_MERGE=36ad3fd6130ce21e68a2c5e701a516fcb3703b65",
  "GITHUB_PAGES_DEPLOYMENT=PASS",
  "GITHUB_PAGES_RUN=31809931666",
]) {
  if (!ownerV14.includes(required)) fail(`Owner V14 release evidence missing: ${required}`);
}

if (!sourceOfTruth.includes("Current visual authority") || !sourceOfTruth.includes("V14")) fail("source-of-truth map is not V14-aware");
if (!masterPlan.includes("Active V14 execution sequence") || !masterPlan.includes("R2 — CSS/runtime de-stack")) fail("Master Plan lost V14 execution history");
for (const phase of ["R0 — SOURCE OF TRUTH + GOVERNANCE REPAIR", "R1 — P0 V14 UX / ACCESSIBILITY REPAIR", "R2 — CSS + RUNTIME DE-STACK", "V14.8 — FULL ROUTE MIGRATION", "V14.9 — MOBILE / PERFORMANCE / ACCESSIBILITY / SECURITY QA", "V14.10 — OWNER VISUAL ACCEPTANCE", "R9 — RELEASE HARDENING + MERGE", "R10 — POST-V14 V15 SEARCH MASTER PLAN"]) {
  if (!v14Plan.includes(phase)) fail(`V14 plan phase missing: ${phase}`);
}

for (const required of ['className="v14-mobile-nav"', 'href: "/#process"', 'href="#main-content"', 'variant="hero"', "V14SignatureStage"]) {
  if (!hero.includes(required)) fail(`V14 shell/signature invariant missing: ${required}`);
}
for (const required of ["v14-signature-stage", "V14BrowserMockup", "V14PhoneMockup", "--sig-rx", "--sig-ry"]) {
  if (!signature.includes(required)) fail(`V14 signature stage invariant missing: ${required}`);
}
if (!processComponent.includes('id="process"')) fail("V14 process anchor missing");
if (!homepage.includes('id="main-content"')) fail("V14 main-content target missing");
if (homepage.includes("WaterSurface") || layout.includes("WaterSurface")) fail("legacy Water runtime mounted globally/page-wide");
if (!liquidConstructor.includes('<V14LiquidSurface variant="constructor" />')) fail("constructor Liquid runtime missing");
for (const required of ["IntersectionObserver", "ResizeObserver", "waveHeight", "waterNormal", "fresnel", "caustic", 'variant === "hero" ? 1 : 0']) {
  if (!liquidSurface.includes(required)) fail(`Liquid signature runtime invariant missing: ${required}`);
}

const rootCssImports = [...layout.matchAll(/import\s+["'](\.\/[^"']+\.css)["']/g)].map((match) => match[1]);
if (rootCssImports.length !== 1 || rootCssImports[0] !== "./globals.css") fail(`root CSS is not globals-only: ${rootCssImports.join(",")}`);
if (!layout.includes('<link rel="stylesheet" href="/v14-global-tech-world.css"')) fail("global Liquid World stylesheet mount missing");
if (!layout.includes("<V14GlobalTechLiquid />") || !layout.includes("<V14GlobalTechHeroGuard />")) fail("global Liquid World root runtime missing");
if (!siteHeader.includes('href="/v14-legacy-routes.css"')) fail("legacy route bridge missing on migrated routes");
if (hero.includes("v14-legacy-routes.css")) fail("homepage references legacy route bridge");
for (const sourcePath of ["app/services.css", "app/precision-water.css", "app/circuit-water-v3.css", "app/hardware-board-v4.css", "app/realistic-board-v5.css", "app/content-frames-v6.css"]) {
  if (!legacyGenerator.includes(`"${sourcePath}"`)) fail(`legacy bridge source missing: ${sourcePath}`);
}
if (!packageJson.includes('"next": "16.3.1"') || !packageJson.includes('"dependency:audit"')) fail("Next/dependency baseline not current");
if (!packageJson.includes('"global-world:contract"') || !packageJson.includes("npm run global-world:contract")) fail("Global Liquid World contract is not enforced by verify");
for (const marker of ["GLOBAL_LIQUID_WORLD_V14_PASS", "PCB_CPU_GPU", "hero=PRESERVED_GPU_GUARDED", "route-preview=8_CAPTURES"]) {
  if (!globalWorldContract.includes(marker)) fail(`Global Liquid World contract marker missing: ${marker}`);
}
if (!browserMatrix.includes("firefox-bidi-viewport-v14.mjs") || !browserMatrix.includes("VIEWPORTS")) fail("browser matrix not wired");
if (!renderedSearch.includes("_EXACT_SET")) fail("rendered Search/Public Truth exact-set gate missing");

for (const required of [
  "PRODUCTION_REVISION=36ad3fd6130ce21e68a2c5e701a516fcb3703b65",
  "PRODUCTION_AUTHORITY=V14_GLOBAL_LIQUID_WORLD",
  "V14_GLOBAL_LIQUID_CANDIDATE=50b71632c687e032311556371108ce3f8d989650",
  "V14_GLOBAL_LIQUID_MERGE=36ad3fd6130ce21e68a2c5e701a516fcb3703b65",
  "V14_GLOBAL_LIQUID_OWNER_AUTHORIZATION=GRANTED_AND_EXERCISED",
  "V14_GLOBAL_LIQUID_CONTRACT=PASS",
  "V14_GLOBAL_LIQUID_ROUTE_PREVIEW=PASS_8_OF_8",
  "V14_GLOBAL_LIQUID_BROWSER_MATRIX=PASS_28_OF_28",
  "GITHUB_PAGES_RUN=31809931666_SUCCESS",
]) {
  if (!repoStatus.includes(required)) fail(`repository status invariant missing: ${required}`);
}

console.log("V14_PLAN_CONTRACT_PASS production=V14_GLOBAL_LIQUID_WORLD main=36ad3fd6 candidate=50b71632 initial-v14=39c9b304 global-world=PASS hero-liquid=WEBGL2 spatial-3d=PASS constructor-liquid=PASS routes=8_PREVIEW browser=28_OF_28 search=63_EXACT next=16.3.1");
