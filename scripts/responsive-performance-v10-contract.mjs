import { existsSync, readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`RESPONSIVE_PERFORMANCE_V14_FAIL: ${message}`);
  process.exit(1);
};

const read = (path) => {
  if (!existsSync(path)) fail(`missing ${path}`);
  return readFileSync(path, "utf8");
};

const layout = read("app/layout.tsx");
const labLayout = read("app/lab/layout.tsx");
const contactLayout = read("app/kontakt/layout.tsx");
const knowledgeLayout = read("app/wiedza/layout.tsx");
const portfolioLayout = read("app/realizacje/layout.tsx");
const aboutLayout = read("app/o-nas/layout.tsx");
const searchEducationLayout = read("app/seo-aeo-geo/layout.tsx");
const v14Hero = read("components/v14-hero.tsx");
const v14Shell = read("public/v14-shell.css");
const liquidSurface = read("components/v14-liquid-surface.tsx");
const packageJson = read("package.json");
const agents = read("AGENTS.md");
const v14Plan = read("docs/plans/V14-VISUAL-REBUILD.md");

for (const retiredImport of [
  './premium-art-direction-v9.css',
  './premium-calibration-v9-2.css',
  './responsive-performance-v10.css',
  './interactive-v7.css',
  './contact.css',
  './knowledge.css',
  './v13-search-education.css',
]) {
  if (layout.includes(retiredImport)) fail(`retired/root-inappropriate stylesheet remounted: ${retiredImport}`);
}

const routeStyles = [
  [labLayout, 'import "../interactive-v7.css"', "Lab interactive"],
  [contactLayout, 'import "../contact.css"', "contact"],
  [knowledgeLayout, 'import "../knowledge.css"', "knowledge"],
  [portfolioLayout, 'import "../knowledge.css"', "portfolio"],
  [aboutLayout, 'import "../knowledge.css"', "about"],
  [searchEducationLayout, 'import "../v13-search-education.css"', "search education"],
];
for (const [source, token, label] of routeStyles) {
  if (!source.includes(token)) fail(`${label} route stylesheet ownership missing`);
}

if (layout.includes("WaterSurface") || layout.includes("water-surface")) fail("global Water runtime remounted");

for (const required of [
  'href="/v14-shell.css"',
  'className="v14-mobile-nav"',
  'className="v14-mobile-nav-panel"',
  'aria-label="Otwórz nawigację mobilną"',
  'aria-label="Nawigacja mobilna"',
]) {
  if (!v14Hero.includes(required)) fail(`V14 responsive shell invariant missing: ${required}`);
}

for (const required of [
  "overflow-x: clip",
  "text-size-adjust: 100%",
  "max-inline-size: 100%",
  "safe-area-inset-left",
  "safe-area-inset-right",
  "safe-area-inset-top",
  "@media (max-width: 980px)",
  ".v14-mobile-nav",
  "display: block",
  "min-height: 44px",
  "orientation: landscape",
  "100svh",
  "pointer: coarse",
  "prefers-reduced-motion: reduce",
]) {
  if (!v14Shell.includes(required)) fail(`V14 responsive CSS invariant missing: ${required}`);
}

for (const invariant of [
  "const FRAME_INTERVAL_MS = 1000 / 45",
  "const COMPACT_FRAME_INTERVAL_MS = 1000 / 30",
  "const MAX_DPR = 1.25",
  "const COMPACT_DPR = 1",
  "IntersectionObserver",
  "ResizeObserver",
  'document.addEventListener("visibilitychange"',
  "document.hidden",
  'window.matchMedia("(pointer: fine)")',
  'window.matchMedia("(max-width: 899px), (pointer: coarse)")',
  'powerPreference: compactRender.matches ? "low-power" : "default"',
]) {
  if (!liquidSurface.includes(invariant)) fail(`Liquid runtime invariant missing: ${invariant}`);
}

const reducedGuard = liquidSurface.indexOf("if (reducedMotion.matches)");
const contextAllocation = liquidSurface.indexOf('canvas.getContext("webgl2"');
if (reducedGuard < 0 || contextAllocation < 0 || reducedGuard > contextAllocation) {
  fail("reduced-motion must bypass WebGL allocation");
}
if (!liquidSurface.includes('if (finePointer.matches) window.addEventListener("pointermove"')) {
  fail("Liquid pointer tracking must be fine-pointer only");
}
if (liquidSurface.includes('addEventListener("scroll"')) {
  fail("global scroll event loop introduced");
}
if (!liquidSurface.includes("sceneVisible") || !liquidSurface.includes("stopRendering")) {
  fail("offscreen Liquid render suspension missing");
}

if (!agents.includes("Current design authority — V14") || !agents.includes("V14 supersedes V9/V9.2 visual freeze")) {
  fail("current V14 design authority missing");
}
if (!v14Plan.includes("R2 — CSS + RUNTIME DE-STACK") || !v14Plan.includes("route-level budgets")) {
  fail("current V14 responsive/performance execution plan incomplete");
}

if (packageJson.includes('"three"') || packageJson.includes("@react-three") || packageJson.includes("babylon")) {
  fail("heavy decorative 3D dependency introduced");
}

console.log(
  "RESPONSIVE_PERFORMANCE_V14_PASS root=DESTACKED route-css=SCOPED lab-css=ROUTE_SCOPED v14-mobile=PASS touch=44px safe-area=PASS overflow=SAFE landscape=PASS coarse-pointer=PASS reduced-motion=PASS liquid=SCENE_BOUNDED offscreen-stop=PASS design=V14_ACTIVE",
);
