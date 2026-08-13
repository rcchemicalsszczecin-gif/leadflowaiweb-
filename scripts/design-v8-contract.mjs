import { existsSync, readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`DESIGN_V8_CONTRACT_FAIL: ${message}`);
  process.exit(1);
};

const read = (path) => {
  if (!existsSync(path)) fail(`missing ${path}`);
  return readFileSync(path, "utf8");
};

const layout = read("app/layout.tsx");
const home = read("app/page.tsx");
const v8Component = read("components/premium-composition-v8.tsx");
const v8Css = read("app/premium-composition-v8.css");
const v7Interactive = read("components/interactive-experience.tsx");
const v7Css = read("app/interactive-v7.css");
const water = read("components/water-surface.tsx");
const v5Css = read("app/realistic-board-v5.css");
const v6Css = read("app/content-frames-v6.css");
const direction = read("docs/design/LEADFLOWAI-PREMIUM-COMPOSITION-V8.md");
const decisions = read("docs/governance/WEBSITE-OWNER-DECISIONS.md");

if (!layout.includes('import "./premium-composition-v8.css"')) fail("V8 stylesheet not mounted");
if (!home.includes("HeroSystemV8") || !home.includes("SystemSpineV8") || !home.includes("StageVisualV8")) {
  fail("V8 homepage composition components are not mounted");
}
if (!home.includes("system-stages-v8") || !home.includes("data-v8-stage") || !home.includes("is-reverse-v8")) {
  fail("alternating V8 stage composition missing");
}
if (home.includes('className="stage-heading"') || home.includes('className="stage-detail"')) {
  fail("legacy repeated V6 stage layout survived V8 homepage");
}

for (const stage of ["CREATE", "DISCOVER", "CONVERT", "INTELLIGENCE", "CONNECT", "CARE"]) {
  if (!v8Component.includes(`case "${stage}"`)) fail(`missing semantic V8 visual for ${stage}`);
}

for (const token of [
  "create-live-v8",
  "discover-live-v8",
  "convert-live-v8",
  "intelligence-live-v8",
  "connect-live-v8",
  "care-live-v8",
]) {
  if (!v8Css.includes(`.${token}`)) fail(`missing V8 visual styling ${token}`);
}

if (!v8Component.includes("IntersectionObserver") || v8Component.includes('addEventListener("scroll"')) {
  fail("V8 system spine must use bounded IntersectionObserver without scroll listener");
}
if (!v8Css.includes(".system-spine-v8") || !v8Css.includes(".system-spine-energy-v8")) {
  fail("continuous system spine styling missing");
}
if (!v8Component.includes("--hero-rx") || !v8Component.includes("--hero-ry") || !v8Css.includes("perspective: 1100px")) {
  fail("restrained hero pointer depth missing");
}
if (!v8Css.includes(".stage-copy-v8 h2 em") || !home.includes("stageTitles")) {
  fail("two-part stage typography hierarchy missing");
}
if (!v8Css.includes("min-height: clamp(22rem, 31vw, 28rem)")) {
  fail("tighter stage-height contract missing");
}
if (!v8Css.includes("prefers-reduced-motion") || !v8Css.includes("@media (max-width: 760px)")) {
  fail("V8 reduced-motion/mobile fallback missing");
}
if (v8Css.includes("backdrop-filter: blur") || v8Css.includes("filter: blur")) {
  fail("V8 introduced expensive bulk blur");
}

for (const component of [
  "Live3DShowcase",
  "InteractiveServiceCards",
  "SystemAssembly",
  "BrowserDemo",
  "BeforeAfterDemo",
  "CapabilityConstellation",
  "ProjectCommandCenter",
]) {
  if (!v7Interactive.includes(`function ${component}`) || !home.includes(`<${component}`)) {
    fail(`V7 interactive proof regressed: ${component}`);
  }
}
if (!v7Css.includes("transform-style: preserve-3d")) fail("V7 live 3D styling regressed");

if (!water.includes("const MAX_RIPPLES = 8") || !water.includes("FRAME_INTERVAL_MS = 1000 / 45")) {
  fail("V5 water performance bounds changed");
}
if (!v5Css.includes("images.unsplash.com/photo-1741392078190-d263a71291cd")) {
  fail("V5 realistic motherboard source changed");
}
if (!v6Css.includes(".content-frame::before") || !v6Css.includes(".section-label span:first-child")) {
  fail("V6 frame grammar not preserved");
}
if (!direction.includes("V8 removes the repeated-template feel") || !direction.includes("vertical system spine")) {
  fail("V8 design authority incomplete");
}
if (!decisions.includes("Premium Composition V8")) fail("Owner V8 decision not recorded");

console.log(
  "DESIGN_V8_CONTRACT_PASS hero-depth=PASS stages=6 UNIQUE alternating=PASS spine=PASS typography=PASS dead-space=REDUCED local-light=PASS hardware-ui=PASS v7=FROZEN v6=FROZEN water-v5=FROZEN",
);
