import { existsSync, readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`DESIGN_V9_2_CONTRACT_FAIL: ${message}`);
  process.exit(1);
};

const read = (path) => {
  if (!existsSync(path)) fail(`missing ${path}`);
  return readFileSync(path, "utf8");
};

const layout = read("app/layout.tsx");
const home = read("app/page.tsx");
const css = read("app/premium-calibration-v9-2.css");
const enhancements = read("components/premium-v9-2-enhancements.tsx");
const journey = read("components/premium-v9-journey.tsx");
const story = read("components/premium-v9-story.tsx");
const header = read("components/site-header.tsx");
const water = read("components/water-surface.tsx");
const v5 = read("app/realistic-board-v5.css");
const packageJson = read("package.json");
const direction = read("docs/design/LEADFLOWAI-PREMIUM-CALIBRATION-V9-2.md");
const decision = read("docs/governance/WEBSITE-OWNER-DECISION-V9-2.md");
const agents = read("AGENTS.md");

if (!layout.includes('import "./premium-calibration-v9-2.css"')) fail("V9.2 stylesheet not mounted last");
if (!home.includes('className="premium-page-v9 premium-page-v92"')) fail("V9.2 homepage root missing");

for (const name of [
  "PremiumExperienceControllerV92",
  "ManifestSceneV92",
  "CinematicCoreV92",
  "ClosingVisualV92",
]) {
  if (!enhancements.includes(`function ${name}`)) fail(`missing ${name}`);
  if (!home.includes(`<${name}`)) fail(`homepage does not mount ${name}`);
}

if (!enhancements.includes("IntersectionObserver") || enhancements.includes('addEventListener("scroll"')) {
  fail("V9.2 controller must use IntersectionObserver without global scroll loop");
}
if (!journey.includes("IntersectionObserver") || journey.includes('addEventListener("scroll"')) {
  fail("V9.2 journey regressed to scroll event loop");
}

if (!css.includes("--max: 106rem") || !css.includes("overflow-x: clip")) fail("wide safe canvas/clipping calibration missing");
if (!css.includes("0.94fr") || !css.includes("1.06fr")) fail("hero editorial/visual rebalance missing");
if (!css.includes("min(43rem, 78svh)") || !css.includes("min(39rem, 72svh)")) fail("stage vertical density calibration missing");
if (!css.includes("--v92-copy: rgba(226, 238, 243, 0.76)")) fail("secondary copy contrast calibration missing");
for (const viewport of ["@media (min-width: 1800px)", "@media (max-width: 1599px)", "@media (max-width: 1280px)", "@media (max-width: 900px)", "@media (max-width: 720px)"]) {
  if (!css.includes(viewport)) fail(`missing viewport calibration ${viewport}`);
}

for (let index = 1; index <= 6; index += 1) {
  if (!css.includes(`data-v92-layout="scene-${index}"`)) fail(`missing unique scene-${index} layout`);
}
for (const visual of ["stage-ambient-plane-v92", "search-depth-ring-v92", "conversion-depth-v92", "ai-depth-mesh-v92", "connect-depth-grid-v92", "care-scan-v92"]) {
  if (!journey.includes(visual) || !css.includes(`.${visual}`)) fail(`missing strengthened stage depth visual ${visual}`);
}
if (!css.includes("premium-stage-v92::before") || !css.includes("background-size: 121% auto")) fail("dynamic stage crop/active zoom missing");
if (!home.includes("ManifestSceneV92") || !css.includes(".manifest-scene-v92") || !enhancements.includes("INTELLIGENCE.")) fail("dark-void typography manifest missing");
if (!story.includes("capability-live-stage-v92") || !css.includes(".what-build-v92") || !css.includes('data-mode="3D"') || !story.includes("CO BUDUJEMY")) fail("full capability scene missing");

if (!journey.includes("stage-transition-v92") || !css.includes("v92-transition-flow")) fail("connected stage transition grammar missing");
for (const reveal of ["rise", "depth", "wipe", "mask"]) {
  if (!css.includes(`data-v92-reveal="${reveal}"`)) fail(`reveal language missing ${reveal}`);
}
if (!enhancements.includes("experience-rail-v92") || !css.includes(".experience-rail-v92")) fail("sticky progress rail missing");
if (!header.includes("nav-preview-v92") || !css.includes(".nav-preview-v92")) fail("cinematic navigation previews missing");
if (!home.includes("MagneticLinkV9") || !enhancements.includes('data-cursor="DRAG"') || !story.includes('data-cursor="ODKRYJ"')) fail("selective micro-interaction contract missing");
if (!css.includes("--v92-reveal: 820ms") || !css.includes("--v92-hover: 190ms") || !css.includes("17s ease-in-out")) fail("premium motion timing calibration missing");

if (!enhancements.includes("core-object-v92") || !css.includes("transform-style: preserve-3d") || !css.includes("core-face-front-v92")) fail("browser-native CSS 3D centerpiece missing");
if (!css.includes("core-depth-plane-v92") || !story.includes("story-depth-plane-v92") || !css.includes("capability-plane-v92")) fail("foreground/background depth plane system missing");
if (!home.includes("premium-closing-v92") || !enhancements.includes("closing-orbit-v92") || !css.includes(".closing-visual-v92")) fail("cinematic closing scene missing");
if (!css.includes("@media (prefers-reduced-motion: reduce)") || !css.includes("animation: none")) fail("V9.2 reduced-motion fallback missing");

if (css.includes("backdrop-filter: blur")) fail("V9.2 introduced bulk backdrop blur");
if (packageJson.includes('"three"') || packageJson.includes("@react-three") || packageJson.includes("babylon")) {
  fail("heavy third-party 3D dependency introduced");
}
if (!water.includes("const MAX_RIPPLES = 8") || !water.includes("FRAME_INTERVAL_MS = 1000 / 45")) {
  fail("V5 water performance bounds changed");
}
if (!v5.includes("images.unsplash.com/photo-1741392078190-d263a71291cd")) fail("V5 hardware background source changed");
if (!story.includes("WŁASNY DOWÓD") || !story.includes("demonstracje LeadFlowAI")) fail("first-party proof framing regressed");
if (!story.includes("LiquidCircuitV9") || !home.includes("<LiquidCircuitV9")) fail("V9 Liquid Circuit regressed");
if (!existsSync("app/lab/page.tsx") || !existsSync("app/strony-3d-webgl/page.tsx")) fail("V7 Live Lab/3D service regressed");
if (!direction.includes("Stage A — Layout Calibration") || !direction.includes("20. Reduced-motion")) fail("V9.2 design authority does not cover all 20 improvements");
if (!decision.includes("implement all 20 approved visual improvements") || !agents.includes("PREMIUM-CALIBRATION-V9-2")) fail("V9.2 governance authority incomplete");

console.log(
  "DESIGN_V9_2_CONTRACT_PASS improvements=20 canvas=WIDE clipping=SAFE hero=REBALANCED density=CALIBRATED contrast=PASS viewports=5 stages=6 depth=PASS crop=DYNAMIC manifest=VOID what-we-build=LIVE transitions=CONNECTED reveals=4 progress-rail=PASS nav-preview=PASS micro-interactions=SELECTIVE timing=PREMIUM 3d-core=BROWSER_NATIVE closing=CINEMATIC reduced-motion=PASS v5-water=FROZEN v7-lab=FROZEN v9-liquid=FROZEN",
);
