import { existsSync, readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`DESIGN_V5_CONTRACT_FAIL: ${message}`);
  process.exit(1);
};

const read = (path) => {
  if (!existsSync(path)) fail(`missing ${path}`);
  return readFileSync(path, "utf8");
};

const layout = read("app/layout.tsx");
const engine = read("components/water-surface.tsx");
const css = read("app/realistic-board-v5.css");
const decisions = read("docs/governance/WEBSITE-OWNER-DECISIONS.md");
const direction = read("docs/design/LEADFLOWAI-DESIGN-DIRECTION-V5.md");

if (!layout.includes("<WaterSurface />") || !layout.includes('import "./realistic-board-v5.css"')) {
  fail("realistic V5 environment is not mounted and styled");
}
if (!css.includes("images.unsplash.com/photo-1741392078190-d263a71291cd") || !direction.includes("Brecht Corbeel")) {
  fail("photoreal hardware source or attribution missing");
}
if (!engine.includes('canvas.getContext("webgl2"') || !engine.includes("FRAGMENT_SHADER")) {
  fail("WebGL2 water overlay missing");
}
if (engine.includes("hardwareBoard(") || engine.includes("uScroll")) {
  fail("procedural motherboard or scroll-driven shader survived V5");
}
if (!engine.includes("waterField(") || !engine.includes("segmentPulse(")) {
  fail("water field or restrained energy overlay missing");
}
if (!engine.includes("const MAX_RIPPLES = 8") || !engine.includes("FRAME_INTERVAL_MS = 1000 / 45")) {
  fail("bounded ripple/FPS performance controls missing");
}
if (!engine.includes("width < 900 ? 1 : 1.15")) {
  fail("DPR performance cap missing");
}
if (!engine.includes('window.addEventListener("pointermove"') || !engine.includes('window.addEventListener("pointerdown"')) {
  fail("water pointer interactions missing");
}
if (engine.includes('window.addEventListener("scroll"')) {
  fail("scroll listener must not drive V5 water/background rendering");
}
if (!css.includes("backdrop-filter: none") || !css.includes(".hero-copy") || !css.includes(".stage-detail")) {
  fail("scroll-comfort reading/performance overrides missing");
}
if (!css.includes("prefers-reduced-motion") || !engine.includes("prefers-reduced-motion")) {
  fail("reduced-motion fallback missing");
}
if (!decisions.includes("Realistic Hardware Water V5")) {
  fail("owner V5 decision not recorded");
}

console.log(
  "DESIGN_V5_CONTRACT_PASS photo=REAL water=WEBGL energy=LIGHTWEIGHT ripples=8 fps=45 dpr=BOUNDED scroll-shader=OFF bulk-blur=OFF reading-lanes=PASS",
);
