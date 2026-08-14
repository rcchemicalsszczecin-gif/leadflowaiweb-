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
const processComponent = read("components/v14-process-canvas.tsx");
const homepage = read("app/page.tsx");
const liquidConstructor = read("components/v14-liquid-constructor.tsx");
const liquidSurface = read("components/v14-liquid-surface.tsx");
const siteHeader = read("components/v14-site-header.tsx");
const legacyGenerator = read("scripts/generate-v14-legacy-routes-css.mjs");
const packageJson = read("package.json");
const browserMatrix = read("scripts/browser-matrix-v14.py");
const renderedSearch = read("scripts/rendered-search-truth-v14.mjs");

for (const required of ["Current design authority — V14", "35 service/money pages", "21 knowledge articles", "63 dominant search intents"]) {
  if (!agents.includes(required)) fail(`AGENTS invariant missing: ${required}`);
}

for (const required of [
  "Production authority: V14 Full Visual Rebuild",
  "39c9b304eff42a71ea36aee871dce569d8f374f0",
  "242263ffe1593d1a80890b7f6bc1514316ed2656",
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
  "OWNER_MERGE_AUTHORIZATION=GRANTED_AND_EXERCISED",
  "V14_PRODUCTION_MERGE=39c9b304eff42a71ea36aee871dce569d8f374f0",
  "GITHUB_PAGES_DEPLOYMENT=PASS",
]) {
  if (!ownerV14.includes(required)) fail(`Owner V14 release evidence missing: ${required}`);
}

if (!sourceOfTruth.includes("Current visual authority") || !sourceOfTruth.includes("V14")) fail("source-of-truth map is not V14-aware");
if (!masterPlan.includes("Active V14 execution sequence") || !masterPlan.includes("R2 — CSS/runtime de-stack")) fail("Master Plan lost V14 execution history");
for (const phase of ["R0 — SOURCE OF TRUTH + GOVERNANCE REPAIR", "R1 — P0 V14 UX / ACCESSIBILITY REPAIR", "R2 — CSS + RUNTIME DE-STACK", "V14.8 — FULL ROUTE MIGRATION", "V14.9 — MOBILE / PERFORMANCE / ACCESSIBILITY / SECURITY QA", "V14.10 — OWNER VISUAL ACCEPTANCE", "R9 — RELEASE HARDENING + MERGE", "R10 — POST-V14 V15 SEARCH MASTER PLAN"]) {
  if (!v14Plan.includes(phase)) fail(`V14 plan phase missing: ${phase}`);
}

for (const required of ['className="v14-mobile-nav"', 'href: "/#process"', 'href="#main-content"']) {
  if (!hero.includes(required)) fail(`V14 shell invariant missing: ${required}`);
}
if (!processComponent.includes('id="process"')) fail("V14 process anchor missing");
if (!homepage.includes('id="main-content"')) fail("V14 main-content target missing");
if (homepage.includes("WaterSurface") || layout.includes("WaterSurface")) fail("legacy Water runtime mounted globally/page-wide");
if (!liquidConstructor.includes("<V14LiquidSurface />")) fail("scene-bounded Liquid runtime missing");
if (!liquidSurface.includes("IntersectionObserver") || !liquidSurface.includes("ResizeObserver")) fail("Liquid visibility/size guards incomplete");

const rootCssImports = [...layout.matchAll(/import\s+["'](\.\/[^"']+\.css)["']/g)].map((match) => match[1]);
if (rootCssImports.length !== 1 || rootCssImports[0] !== "./globals.css") fail(`root CSS is not globals-only: ${rootCssImports.join(",")}`);
if (!siteHeader.includes('href="/v14-legacy-routes.css"')) fail("legacy route bridge missing on migrated routes");
if (hero.includes("v14-legacy-routes.css")) fail("homepage references legacy route bridge");
for (const sourcePath of ["app/services.css", "app/precision-water.css", "app/circuit-water-v3.css", "app/hardware-board-v4.css", "app/realistic-board-v5.css", "app/content-frames-v6.css"]) {
  if (!legacyGenerator.includes(`"${sourcePath}"`)) fail(`legacy bridge source missing: ${sourcePath}`);
}
if (!packageJson.includes('"next": "16.3.1"') || !packageJson.includes('"dependency:audit"')) fail("Next/dependency baseline not current");
if (!browserMatrix.includes("firefox-bidi-viewport-v14.mjs") || !browserMatrix.includes("VIEWPORTS")) fail("browser matrix not wired");
if (!renderedSearch.includes("_EXACT_SET")) fail("rendered Search/Public Truth exact-set gate missing");

for (const required of [
  "PRODUCTION_REVISION=39c9b304eff42a71ea36aee871dce569d8f374f0",
  "PRODUCTION_AUTHORITY=V14_FULL_VISUAL_REBUILD",
  "V14_OWNER_MERGE_AUTHORIZATION=GRANTED_AND_EXERCISED",
  "V14_FINAL_QA=COMPLETE",
  "V14_OWNER_VISUAL_ACCEPTANCE=PASS",
  "V14_R9_PREMERGE_HARDENING=PASS",
  "GITHUB_PAGES_RUN=31800348526_SUCCESS",
]) {
  if (!repoStatus.includes(required)) fail(`repository status invariant missing: ${required}`);
}

console.log("V14_PLAN_CONTRACT_PASS production=V14 main=39c9b304 release-candidate=242263ff r0=PASS r1=PASS r2=COMPLETE route-migration=COMPLETE v14.9=COMPLETE owner-visual=PASS r9=PASS merge=COMPLETE pages=PASS next=16.3.1");
