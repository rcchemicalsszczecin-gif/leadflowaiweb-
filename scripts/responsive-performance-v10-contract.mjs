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
const legacyResponsiveCss = read("app/responsive-performance-v10.css");
const legacyHeader = read("components/site-header.tsx");
const v14Hero = read("components/v14-hero.tsx");
const v14Shell = read("public/v14-shell.css");
const water = read("components/water-surface.tsx");
const packageJson = read("package.json");
const agents = read("AGENTS.md");
const v14Plan = read("docs/plans/V14-VISUAL-REBUILD.md");

if (!layout.includes('import "./responsive-performance-v10.css"')) {
  fail("legacy-route responsive layer missing before V14 full route migration");
}

for (const required of [
  'className="mobile-nav-v10"',
  'className="mobile-nav-panel-v10"',
  'aria-label="Nawigacja mobilna"',
  'aria-label="Otwórz nawigację"',
]) {
  if (!legacyHeader.includes(required)) fail(`legacy-route mobile navigation invariant missing: ${required}`);
}

if (!legacyResponsiveCss.includes("min-height: 44px") || !legacyResponsiveCss.includes("safe-area-inset-left") || !legacyResponsiveCss.includes("safe-area-inset-bottom")) {
  fail("legacy-route touch/safe-area safeguards missing");
}
if (!legacyResponsiveCss.includes("overflow-x: clip") || !legacyResponsiveCss.includes("orientation: landscape") || !legacyResponsiveCss.includes("pointer: coarse")) {
  fail("legacy-route overflow/landscape/coarse-pointer safeguards missing");
}

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
  "@media (max-width: 980px)",
  ".v14-mobile-nav",
  "display: block",
  "min-height: 44px",
  "pointer: coarse",
  "prefers-reduced-motion: reduce",
]) {
  if (!v14Shell.includes(required)) fail(`V14 responsive CSS invariant missing: ${required}`);
}

for (const invariant of [
  "const MAX_RIPPLES = 8",
  "const COMPACT_MAX_RIPPLES = 5",
  "const FRAME_INTERVAL_MS = 1000 / 45",
  "const COMPACT_FRAME_INTERVAL_MS = 1000 / 30",
  'document.addEventListener("visibilitychange"',
  "document.hidden",
  'window.matchMedia("(pointer: fine)")',
  'window.matchMedia("(max-width: 899px), (pointer: coarse)")',
  'powerPreference: compactRender.matches ? "low-power" : "default"',
]) {
  if (!water.includes(invariant)) fail(`water runtime invariant missing: ${invariant}`);
}

const reducedGuard = water.indexOf("if (reducedMotion.matches)");
const contextAllocation = water.indexOf('canvas.getContext("webgl2"');
if (reducedGuard < 0 || contextAllocation < 0 || reducedGuard > contextAllocation) {
  fail("reduced-motion must bypass WebGL allocation while WaterSurface remains in use");
}
if (!water.includes('if (finePointer.matches) window.addEventListener("pointermove"')) {
  fail("pointermove must be fine-pointer only");
}
if (water.includes('addEventListener("scroll"')) {
  fail("global scroll event loop introduced");
}
if (!water.includes("compactRender.matches ? 1 : 1.15")) {
  fail("compact/desktop DPR bounds missing");
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
  "RESPONSIVE_PERFORMANCE_V14_PASS legacy-mobile=PASS v14-mobile=PASS touch=44px safe-area=PASS overflow=SAFE coarse-pointer=PASS reduced-motion=PASS water-runtime-bounds=PASS design=V14_ACTIVE",
);
