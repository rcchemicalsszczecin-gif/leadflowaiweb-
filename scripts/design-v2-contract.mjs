import { existsSync, readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`DESIGN_V2_CONTRACT_FAIL: ${message}`);
  process.exit(1);
};

const read = (path) => {
  if (!existsSync(path)) fail(`missing ${path}`);
  return readFileSync(path, "utf8");
};

const layout = read("app/layout.tsx");
const water = read("components/water-surface.tsx");
const css = read("app/precision-water.css");

if (!layout.includes('import { WaterSurface }') || !layout.includes("<WaterSurface />")) {
  fail("global water surface is not mounted");
}
if (!layout.includes('import "./precision-water.css"')) {
  fail("precision water stylesheet is not loaded");
}
if (!css.includes("--paper: #080b0f") || !css.includes(".section-light") || !css.includes("background:")) {
  fail("global dark-surface override missing");
}
if (!css.includes(".water-surface") || !css.includes("mix-blend-mode: screen")) {
  fail("water overlay styling missing");
}
if (!css.includes(".precision-ambient") || !css.includes(".ambient-grid") || !css.includes(".ambient-orbit")) {
  fail("ambient motion layer incomplete");
}
if (!css.includes("prefers-reduced-motion")) {
  fail("reduced-motion fallback missing");
}
if (!water.includes('window.addEventListener("pointermove"') || !water.includes('window.addEventListener("pointerdown"')) {
  fail("pointer water interaction missing");
}
if (!water.includes("const MAX_RIPPLES = 48") || !water.includes("stone(") || !water.includes("brush(")) {
  fail("bounded brush/stone ripple model missing");
}
if (!css.includes("--display: clamp(3.4rem, 6.35vw, 6.8rem)")) {
  fail("reduced desktop display typography target missing");
}

console.log("DESIGN_V2_CONTRACT_PASS dark=GLOBAL water=POINTER brush=PASS stone=PASS ambient=PASS typography=REDUCED reduced-motion=PASS");
