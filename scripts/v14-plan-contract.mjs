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
const ownerDecisions = read("docs/governance/WEBSITE-OWNER-DECISIONS.md");
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

for (const required of [
  "Current design authority — V14",
  "V14 supersedes V9/V9.2 visual freeze",
  "35 service/money pages",
  "21 knowledge articles",
  "63 dominant search intents",
]) {
  if (!agents.includes(required)) fail(`AGENTS authority invariant missing: ${required}`);
}

for (const required of [
  "10627e2f18ccfc7ef86c76a695dab9cf7933cce9",
  "V13 Polish Production Rebuild",
  "v14/full-visual-rebuild",
  "V14.8 route migration COMPLETE",
  "R2 ROOT CSS DE-STACK: COMPLETE",
  "e190d2466bdc5166917614aecf361814db9abe8b",
  "Browser Matrix: PASS 28/28",
  "Next.js upgraded to 16.3.1",
  "0 vulnerabilities",
  "V14.9 final QA: IN PROGRESS",
  "V14.10 Owner visual acceptance: NOT COMPLETE",
]) {
  if (!currentState.includes(required)) fail(`CURRENT-STATE invariant missing: ${required}`);
}

for (const required of [
  "Current visual authority — V14 Full Visual Rebuild",
  "V13 foundation preserved by V14",
  "No fabricated metrics",
]) {
  if (!ownerDecisions.includes(required)) fail(`Owner decisions invariant missing: ${required}`);
}

if (!ownerV14.includes("STATUS: ACTIVE OWNER AUTHORITY")) fail("V14 Owner authority record is not active");
if (!sourceOfTruth.includes("Current visual authority") || !sourceOfTruth.includes("V14 supersedes V9/V9.2")) fail("source-of-truth map is not V14-aware");
if (!masterPlan.includes("Active V14 execution sequence") || !masterPlan.includes("R2 — CSS/runtime de-stack")) fail("Master Plan does not point to current V14 sequence");

for (const phase of [
  "R0 — SOURCE OF TRUTH + GOVERNANCE REPAIR",
  "R1 — P0 V14 UX / ACCESSIBILITY REPAIR",
  "R2 — CSS + RUNTIME DE-STACK",
  "V14.1 — HERO / PRODUCT PROOF",
  "V14.2 — SERVICES AS PRODUCTS",
  "V14.3 — PORTFOLIO / DEVICE THEATER",
  "V14.4 — LIQUID WEB CONSTRUCTOR",
  "V14.5 — SEARCH / AI VISUAL ARCHITECTURE",
  "V14.6 — PROCESS / QUALITY / TRUST",
  "V14.7 — KNOWLEDGE / FAQ / CONTACT / CLOSING",
  "V14.8 — FULL ROUTE MIGRATION",
  "V14.9 — MOBILE / PERFORMANCE / ACCESSIBILITY / SECURITY QA",
  "V14.9A — PREVIEW PIPELINE",
  "V14.10 — OWNER VISUAL ACCEPTANCE",
  "R9 — RELEASE HARDENING + MERGE",
  "R10 — POST-V14 V15 SEARCH MASTER PLAN",
]) {
  if (!v14Plan.includes(phase)) fail(`unified V14 plan phase missing: ${phase}`);
}

for (const required of [
  'className="v14-mobile-nav"',
  'href: "/#process"',
  'href="#main-content"',
]) {
  if (!hero.includes(required)) fail(`current V14 P0 shell invariant missing: ${required}`);
}
if (!processComponent.includes('id="process"')) fail("V14 process anchor missing");
if (!homepage.includes('id="main-content"')) fail("V14 main-content target missing");
if (homepage.includes("WaterSurface") || layout.includes("WaterSurface") || layout.includes("water-surface")) fail("legacy Water runtime still mounted globally/page-wide");
if (!liquidConstructor.includes("<V14LiquidSurface />")) fail("scene-bounded Liquid runtime not mounted by constructor");
if (!liquidSurface.includes("IntersectionObserver") || !liquidSurface.includes("ResizeObserver")) fail("Liquid scene ownership/visibility guards incomplete");

const rootCssImports = [...layout.matchAll(/import\s+["'](\.\/[^"']+\.css)["']/g)].map((match) => match[1]);
if (rootCssImports.length !== 1 || rootCssImports[0] !== "./globals.css") {
  fail(`root CSS is not globals-only: ${rootCssImports.join(",")}`);
}
if (!siteHeader.includes('href="/v14-legacy-routes.css"')) fail("legacy route bridge not mounted on migrated routes");
if (hero.includes("v14-legacy-routes.css")) fail("homepage references legacy route bridge");
for (const sourcePath of [
  "app/services.css",
  "app/precision-water.css",
  "app/circuit-water-v3.css",
  "app/hardware-board-v4.css",
  "app/realistic-board-v5.css",
  "app/content-frames-v6.css",
]) {
  if (!legacyGenerator.includes(`"${sourcePath}"`)) fail(`legacy bridge source missing: ${sourcePath}`);
}
if (!packageJson.includes('"next": "16.3.1"') || !packageJson.includes('"dependency:audit"')) {
  fail("Next/security dependency baseline not current");
}
if (!browserMatrix.includes("firefox-bidi-viewport-v14.mjs") || !browserMatrix.includes("VIEWPORTS")) {
  fail("cross-browser true viewport matrix not wired");
}

for (const required of [
  "V14_ROUTE_MIGRATION=COMPLETE",
  "V14_R2_RUNTIME=PASS",
  "V14_R2_ROOT_CSS_DESTACK=COMPLETE",
  "V14_ROOT_CSS=GLOBALS_ONLY",
  "V14_LEGACY_ROUTE_BRIDGE=SERVICE_PLUS_V2_V6_SCOPED",
  "V14_ROUTE_PERFORMANCE_BUDGETS=PASS",
  "V14_SECURITY_CONTRACT=PASS",
  "V14_DEPENDENCY_AUDIT=0_VULNERABILITIES",
  "NEXT_VERSION=16.3.1",
  "V14_BROWSER_MATRIX=PASS_28_OF_28",
  "V14_PREVIEW_PIPELINE=PASS",
  "V14_FINAL_QA=IN_PROGRESS",
  "V14_OWNER_VISUAL_ACCEPTANCE=BLOCKED_PENDING_OWNER_REVIEW",
]) {
  if (!repoStatus.includes(required)) fail(`repository status invariant missing: ${required}`);
}

console.log("V14_PLAN_CONTRACT_PASS authority=SYNC production-v13=LOCKED r0=PASS r1=PASS r2-runtime=PASS r2-root-css=COMPLETE root=GLOBALS_ONLY legacy-routes=BRIDGE_SCOPED liquid=SCENE_BOUNDED route-migration=COMPLETE route-budgets=PASS security=PASS dependency-audit=0 browser-matrix=28/28 preview=PASS final-qa=IN_PROGRESS owner-acceptance=BLOCKED");
