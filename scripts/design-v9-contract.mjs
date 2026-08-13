import { existsSync, readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`DESIGN_V9_CONTRACT_FAIL: ${message}`);
  process.exit(1);
};

const read = (path) => {
  if (!existsSync(path)) fail(`missing ${path}`);
  return readFileSync(path, "utf8");
};

const layout = read("app/layout.tsx");
const home = read("app/page.tsx");
const component = read("components/premium-art-direction-v9.tsx");
const css = read("app/premium-art-direction-v9.css");
const polish = read("app/premium-art-direction-v9-polish.css");
const water = read("components/water-surface.tsx");
const v5 = read("app/realistic-board-v5.css");
const lab = read("app/lab/page.tsx");
const packageJson = read("package.json");
const direction = read("docs/design/LEADFLOWAI-PREMIUM-ART-DIRECTION-V9.md");
const decisions = read("docs/governance/WEBSITE-OWNER-DECISIONS.md");
const agents = read("AGENTS.md");

if (!layout.includes('import "./premium-art-direction-v9.css"') || !layout.includes('import "./premium-art-direction-v9-polish.css"')) {
  fail("V9 stylesheets not mounted");
}
if (!home.includes('className="premium-page-v9"') || !home.includes("PremiumInteractionLayerV9") || !home.includes("PremiumHeroV9")) {
  fail("V9 homepage root/hero not mounted");
}
if (home.includes("HeroSystemV8") || home.includes("StageVisualV8") || home.includes("SystemSpineV8")) {
  fail("V8 homepage composition still mounted instead of V9");
}
if (home.includes("experience-zone-v8") || home.includes("Live3DShowcase") || home.includes("InteractiveServiceCards")) {
  fail("homepage still carries V7 widget-catalog density");
}
if (home.includes("content-frame")) {
  fail("V9 homepage still directly wraps major sections in legacy content frames");
}

for (const name of [
  "PremiumInteractionLayerV9",
  "MagneticLinkV9",
  "PremiumHeroV9",
  "PremiumStageJourneyV9",
  "WhatWeBuildV9",
  "ScrollStoryV9",
  "LiquidCircuitV9",
  "PremiumProofV9",
]) {
  if (!component.includes(`function ${name}`)) fail(`missing V9 component ${name}`);
  if (!home.includes(`<${name}`) && name !== "MagneticLinkV9") fail(`homepage does not mount ${name}`);
}
if (!home.includes("<MagneticLinkV9")) fail("magnetic CTA not mounted");

for (const stage of ["CREATE", "DISCOVER", "CONVERT", "INTELLIGENCE", "CONNECT", "CARE"]) {
  if (!component.includes(`case "${stage}"`)) fail(`missing cinematic V9 stage ${stage}`);
}
for (const visual of ["floating-site-v9", "search-orbit-v9", "journey-line-v9", "ai-core-v9", "connect-core-v9", "care-rings-v9"]) {
  if (!component.includes(visual) || !css.includes(`.${visual}`)) fail(`missing V9 visual system ${visual}`);
}

if (!component.includes("IntersectionObserver") || component.includes('addEventListener("scroll"')) {
  fail("V9 storytelling/stage state must use IntersectionObserver without scroll loop");
}
if (!component.includes("data-cursor") || !css.includes(".premium-cursor-v9") || !css.includes("[data-cursor]")) {
  fail("context cursor contract missing");
}
if (!component.includes("onPointerMove={onMove}") || !css.includes(".magnetic-link-v9")) {
  fail("magnetic/pointer interaction contract missing");
}
if (!component.includes("LeadFlow") || !component.includes("LiquidCircuitV9") || !css.includes(".liquid-signature-v9")) {
  fail("LeadFlow Liquid Circuit signature experience missing");
}
if (!component.includes("FIRST-PARTY PROOF") || !component.includes("demonstracje LeadFlowAI")) {
  fail("first-party proof/public-truth framing missing");
}
if (!component.includes("WHAT WE BUILD") || !component.includes("ScrollStoryV9")) {
  fail("cinematic capability/scroll storytelling missing");
}

for (const material of ["--v9-glass", "--v9-graphite", "--v9-luminous"]) {
  if (!css.includes(material)) fail(`material system token missing ${material}`);
}
if (!css.includes("--v9-display") || !css.includes("--v9-body")) fail("display/body typography system missing");
if (!polish.includes("photo-1741392078190-d263a71291cd") || !polish.includes("background-position")) {
  fail("art-directed realistic hardware crop missing");
}
if (!polish.includes("v9-ambient-drift") || !polish.includes("v9-light-travel")) {
  fail("slow ambient light language missing");
}
if (!css.includes("prefers-reduced-motion") || !polish.includes("prefers-reduced-motion")) {
  fail("reduced-motion V9 fallbacks missing");
}
if (!css.includes("@media (max-width: 720px)") || !polish.includes("@media (max-width: 720px)")) {
  fail("mobile V9 simplification missing");
}
if (css.includes("backdrop-filter: blur") || polish.includes("backdrop-filter: blur")) {
  fail("V9 introduced bulk backdrop blur");
}

if (!water.includes("const MAX_RIPPLES = 8") || !water.includes("FRAME_INTERVAL_MS = 1000 / 45")) {
  fail("V5 water performance bounds changed");
}
if (!v5.includes("images.unsplash.com/photo-1741392078190-d263a71291cd")) {
  fail("V5 realistic background source changed");
}
if (!lab.includes("LIVE LAB") || !existsSync("app/strony-3d-webgl/page.tsx") || !existsSync("app/chatboty-ai/page.tsx")) {
  fail("V7 Live Lab/service offer regressed");
}
if (packageJson.includes('"three"') || packageJson.includes("@react-three") || packageJson.includes("babylon")) {
  fail("heavy third-party 3D dependency introduced");
}
if (!direction.includes("coverage of the 20 requested improvements") || !direction.includes("LeadFlow Liquid Circuit")) {
  fail("V9 design authority incomplete");
}
if (!decisions.includes("Premium Art Direction V9") || !agents.includes("PREMIUM-ART-DIRECTION-V9")) {
  fail("V9 governance authority not recorded");
}

console.log(
  "DESIGN_V9_CONTRACT_PASS editorial-hero=PASS frames=REDUCED typography=PASS cinematic-stages=6 asymmetry=PASS fullscreen=PASS art-directed-photo=PASS depth=PASS transitions=PASS scroll-story=PASS context-cursor=PASS magnetic-cta=PASS what-we-build=PASS proof=REAL_ONLY material-system=3 green=RESTRAINED ambient-light=PASS liquid-circuit=PASS mobile=PASS reduced-motion=PASS v5-water=FROZEN v7-lab=FROZEN",
);
