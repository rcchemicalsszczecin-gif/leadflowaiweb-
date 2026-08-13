import { existsSync, readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`DESIGN_V7_CONTRACT_FAIL: ${message}`);
  process.exit(1);
};

const read = (path) => {
  if (!existsSync(path)) fail(`missing ${path}`);
  return readFileSync(path, "utf8");
};

const layout = read("app/layout.tsx");
const home = read("app/page.tsx");
const lab = read("app/lab/page.tsx");
const interactive = read("components/interactive-experience.tsx");
const css = read("app/interactive-v7.css");
const experienceServices = read("lib/experience-services.ts");
const sitemap = read("app/sitemap.ts");
const site = read("lib/site.ts");
const water = read("components/water-surface.tsx");
const v6 = read("app/content-frames-v6.css");
const direction = read("docs/design/LEADFLOWAI-INTERACTIVE-V7.md");
const decisions = read("docs/governance/WEBSITE-OWNER-DECISIONS.md");

if (!layout.includes('import "./interactive-v7.css"')) fail("V7 stylesheet not mounted");

for (const component of [
  "Live3DShowcase",
  "InteractiveServiceCards",
  "SystemAssembly",
  "BrowserDemo",
  "BeforeAfterDemo",
  "CapabilityConstellation",
  "SignalDivider",
  "ProjectCommandCenter",
]) {
  if (!interactive.includes(`function ${component}`)) fail(`missing interactive component ${component}`);
  if (!home.includes(`<${component}`)) fail(`homepage does not mount ${component}`);
}

if (!lab.includes("LIVE LAB") || !lab.includes("działające") || !lab.includes("demonstrac")) {
  fail("Live Lab public-truth framing missing");
}

for (const route of ["strony-3d-webgl", "interaktywne-strony", "motion-design", "chatboty-ai"]) {
  if (!existsSync(`app/${route}/page.tsx`)) fail(`missing experience route ${route}`);
  if (!experienceServices.includes(`slug: "${route}"`)) fail(`missing experience service data ${route}`);
  if (!sitemap.includes("experienceServiceLinks")) fail("experience services not wired to sitemap");
}

if (!site.includes('href: "/lab"') || !site.includes('href: "/strony-3d-webgl"')) {
  fail("interactive public navigation missing");
}

if (!interactive.includes("IntersectionObserver") || !interactive.includes('type="range"')) {
  fail("scroll assembly or before/after live interaction missing");
}
if (!interactive.includes("processor-chip") || !css.includes("transform-style: preserve-3d")) {
  fail("live 3D browser scene missing");
}
if (!interactive.includes("browser-shell") || !interactive.includes("constellation-node")) {
  fail("browser demo or capability constellation missing");
}
if (!interactive.includes("mailto:kontakt@leadflowai.pl") || interactive.includes("fetch(")) {
  fail("Command Center must remain local/direct-mail and backend-free");
}
if (!interactive.includes("demo koncepcyjne") || !direction.includes("not fabricated client projects")) {
  fail("before/after public-truth disclaimer missing");
}

if (!css.includes("prefers-reduced-motion") || !css.includes("@keyframes bus-flow")) {
  fail("motion/reduced-motion contract incomplete");
}
if (css.includes("backdrop-filter: blur")) fail("V7 introduced bulk backdrop blur");

if (!water.includes("const MAX_RIPPLES = 8") || !water.includes("FRAME_INTERVAL_MS = 1000 / 45")) {
  fail("V5 water performance bounds changed");
}
if (!v6.includes(".content-frame::before") || !v6.includes(".stage-detail")) {
  fail("V6 foreground hierarchy not preserved");
}
if (!decisions.includes("Interactive Experience V7")) fail("Owner V7 decision not recorded");

console.log(
  "DESIGN_V7_CONTRACT_PASS live3d=PASS cards=PASS assembly=PASS browser=PASS before-after=PASS constellation=PASS dividers=PASS command-center=PASS lab=PASS offer=4 water-v5=FROZEN frames-v6=FROZEN",
);
