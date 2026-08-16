import { existsSync, readFileSync } from "node:fs";

const fail = (message) => { console.error(`DESIGN_V14_CONTRACT_FAIL: ${message}`); process.exit(1); };
const read = (path) => { if (!existsSync(path)) fail(`missing ${path}`); return readFileSync(path, "utf8"); };

const owner = read("docs/governance/WEBSITE-OWNER-DECISION-V14.md");
const plan = read("docs/plans/V14-VISUAL-REBUILD.md");
const layout = read("app/layout.tsx");
const home = read("app/page.tsx");
const hero = read("components/v14-hero.tsx");
const signature = read("components/v14-signature-stage.tsx");
const browser = read("components/v14-browser-mockup.tsx");
const phone = read("components/v14-phone-mockup.tsx");
const liquidConstructorSource = read("components/v14-liquid-constructor.tsx");
const liquidSurface = read("components/v14-liquid-surface.tsx");
const visualCss = read("public/v14.css");
const shellCss = read("public/v14-shell.css");
const contentCss = read("public/v14-content.css");
const liquidCss = read("public/v14-liquid-surface.css");
const packageJson = read("package.json");

if (!owner.includes("STATUS: COMPLETED OWNER AUTHORITY / PRODUCTION RELEASED") || !owner.includes("OWNER_MERGE_AUTHORIZATION=GRANTED_AND_EXERCISED")) fail("V14 completed owner authority/release evidence missing");
if (!plan.includes("V14 UNIFIED VISUAL + REPAIR EXECUTION MASTER PLAN")) fail("current unified V14 execution plan missing");
if (!home.includes('className="v14-page"') || !home.includes("<V14Hero")) fail("V14 homepage root missing");
for (const retired of ["premium-page-v9", "premium-page-v92", "PremiumExperienceControllerV92", "PremiumStageJourneyV9", "ManifestSceneV92", "ScrollStoryV9", "WaterSurface"]) {
  if (home.includes(retired)) fail(`legacy homepage visual/runtime dependency remains: ${retired}`);
}
if (home.includes("data-v92-reveal")) fail("legacy reveal/fade language remains on V14 homepage");
for (const required of ["V14OverlaySiteHeader", "v14-hero", "pracują jak produkt", "Wyceń projekt", "Zobacz realizacje", "V14LiquidSurface", 'variant="hero"', "V14SignatureStage", "/v14-liquid-surface.css"]) {
  if (!hero.includes(required)) fail(`hero/signature signal missing: ${required}`);
}
for (const required of ["V14BrowserMockup", "V14PhoneMockup", "v14-signature-stage", "v14-signature-browser-layer", "v14-signature-phone-layer", "v14-signature-node-search", "v14-signature-node-ai", "--sig-rx", "--sig-ry", "requestAnimationFrame"]) {
  if (!signature.includes(required)) fail(`signature spatial stage missing: ${required}`);
}
if (!browser.includes("v14-browser") || !phone.includes("v14-phone")) fail("device product mockups incomplete");
for (const required of ["--v14-accent", "v14-foundation", "background:var(--v14-paper)", "perspective:1600px", "@media(max-width:620px)"]) {
  if (!visualCss.includes(required)) fail(`consolidated V14 visual CSS missing: ${required}`);
}
for (const required of ["v14-mobile-nav", "prefers-reduced-motion: reduce", "min-height: 44px"]) {
  if (!shellCss.includes(required)) fail(`V14 shell CSS missing: ${required}`);
}
for (const required of [
  "v14-service-visual-01",
  "v14-service-visual-02",
  "v14-service-visual-03",
  "v14-service-visual-04",
  "v14-service-visual-05",
  "v14-service-visual-06",
  "v14-knowledge-grid",
  "v14-faq-layout",
  "v14-brief-grid",
]) {
  if (!contentCss.includes(required)) fail(`V14 content/variant CSS missing: ${required}`);
}

if (layout.includes("WaterSurface") || layout.includes("water-surface")) fail("legacy Liquid runtime must not be mounted globally");
for (const required of ['import { V14LiquidSurface }', 'variant="constructor"', 'className="v14-liquid-stage"']) {
  if (!liquidConstructorSource.includes(required)) fail(`Liquid Constructor runtime ownership missing: ${required}`);
}
for (const required of [
  "const FRAME_INTERVAL_MS = 1000 / 45",
  "const COMPACT_FRAME_INTERVAL_MS = 1000 / 30",
  "const MAX_DPR = 1.25",
  "const COMPACT_DPR = 1",
  "waveHeight",
  "waterNormal",
  "fresnel",
  "reflectedDirection",
  "caustic",
  "pointerRipple",
  'variant === "hero" ? 1 : 0',
  "IntersectionObserver",
  "ResizeObserver",
  'document.addEventListener("visibilitychange"',
  "document.hidden",
  'window.matchMedia("(prefers-reduced-motion: reduce)")',
  'window.matchMedia("(pointer: fine)")',
  'window.matchMedia("(max-width: 899px), (pointer: coarse)")',
  'powerPreference: compactRender.matches ? "low-power" : "default"',
]) {
  if (!liquidSurface.includes(required)) fail(`perspective Liquid runtime invariant missing: ${required}`);
}
const reducedGuard = liquidSurface.indexOf("if (reducedMotion.matches)");
const contextAllocation = liquidSurface.indexOf('canvas.getContext("webgl2"');
if (reducedGuard < 0 || contextAllocation < 0 || reducedGuard > contextAllocation) fail("reduced-motion must bypass scene WebGL allocation");
for (const required of [".v14-liquid-surface", '[data-variant="hero"]', ".v14-signature-stage", "perspective: 1900px", "translateZ(250px)", "transform-style: preserve-3d", "pointer-events: none"]) {
  if (!liquidCss.includes(required)) fail(`Liquid/spatial CSS invariant missing: ${required}`);
}
if (liquidSurface.includes("realistic-board-photo") || liquidCss.includes("images.unsplash.com")) fail("V14 Liquid scene depends on legacy stock motherboard");
if (visualCss.includes("images.unsplash.com") || shellCss.includes("images.unsplash.com") || contentCss.includes("images.unsplash.com")) fail("V14 visual system depends on stock background");
if (packageJson.includes('"three"') || packageJson.includes("@react-three") || packageJson.includes("babylon")) fail("heavy third-party 3D dependency introduced");

console.log("DESIGN_V14_CONTRACT_PASS authority=PRODUCTION_RELEASED root=CLEAN shell=V14 hero=LIQUID_WEBGL_SPATIAL_PRODUCT water=PERSPECTIVE_HEIGHTFIELD_FRESNEL_CAUSTICS product-depth=POINTER_DRIVEN_3D services=6_VARIANTS knowledge=PASS mobile=NAVIGABLE css=V14_OWNED reduced-motion=PASS stock=ABSENT heavy-3d-lib=ABSENT");
