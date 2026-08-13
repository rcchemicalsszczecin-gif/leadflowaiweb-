import { existsSync, readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`RESPONSIVE_PERFORMANCE_V10_FAIL: ${message}`);
  process.exit(1);
};

const read = (path) => {
  if (!existsSync(path)) fail(`missing ${path}`);
  return readFileSync(path, "utf8");
};

const layout = read("app/layout.tsx");
const responsiveCss = read("app/responsive-performance-v10.css");
const runtimeCss = read("app/runtime-performance-v10.css");
const header = read("components/site-header.tsx");
const water = read("components/water-surface.tsx");
const packageJson = read("package.json");
const v5 = read("app/realistic-board-v5.css");
const v92 = read("app/premium-calibration-v9-2.css");
const agents = read("AGENTS.md");
const qualityRecord = read("docs/quality/RESPONSIVE-PERFORMANCE-V10.md");

const responsiveImport = layout.indexOf('import "./responsive-performance-v10.css"');
const runtimeImport = layout.indexOf('import "./runtime-performance-v10.css"');
if (responsiveImport < 0 || runtimeImport < 0 || runtimeImport < responsiveImport) {
  fail("V10 responsive/runtime styles are not mounted last in order");
}

if (!header.includes('className="mobile-nav-v10"') || !header.includes('className="mobile-nav-panel-v10"')) {
  fail("accessible mobile navigation shell missing");
}
if (!header.includes('aria-label="Nawigacja mobilna"') || !header.includes('aria-label="Otwórz nawigację"')) {
  fail("mobile navigation accessible labels missing");
}
if (!responsiveCss.includes("min-height: 44px") || !responsiveCss.includes("safe-area-inset-left") || !responsiveCss.includes("safe-area-inset-bottom")) {
  fail("touch target or safe-area contract missing");
}
if (!responsiveCss.includes("overflow-x: clip") || !responsiveCss.includes("orientation: landscape") || !responsiveCss.includes("pointer: coarse")) {
  fail("overflow/landscape/coarse-pointer responsive safeguards missing");
}
if (!responsiveCss.includes(".site-header-v92 .header-cta-v92") || !responsiveCss.includes(".mobile-nav-v10")) {
  fail("mobile header replacement behavior missing");
}

if (!runtimeCss.includes("w=1600&q=72") || !runtimeCss.includes("w=1000&q=68")) {
  fail("compact responsive hardware image variants missing");
}
if (!runtimeCss.includes("backdrop-filter: none")) {
  fail("compact header blur optimization missing");
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
  fail("reduced-motion must bypass WebGL allocation");
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

if (!v5.includes("images.unsplash.com/photo-1741392078190-d263a71291cd")) {
  fail("approved V5 hardware source changed");
}
if (!v92.includes("premium-page-v92") || !agents.includes("visual design after V9.2")) {
  fail("V9.2 design freeze authority missing");
}
if (!qualityRecord.includes("Stage 1 — Responsive / Mobile QA") || !qualityRecord.includes("Stage 2 — Performance / CWV foundation")) {
  fail("V10 quality record incomplete");
}
if (packageJson.includes('"three"') || packageJson.includes("@react-three") || packageJson.includes("babylon")) {
  fail("heavy 3D dependency introduced during QA");
}

console.log(
  "RESPONSIVE_PERFORMANCE_V10_PASS mobile-nav=PASS touch=44px safe-area=PASS overflow=SAFE landscape=PASS coarse-pointer=PASS water-desktop=45FPS water-compact=30FPS compact-ripples=5 hidden-tab=PAUSED reduced-motion=NO_WEBGL image-delivery=RESPONSIVE design=FROZEN",
);
