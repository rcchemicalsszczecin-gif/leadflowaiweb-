import { existsSync, readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`DESIGN_V3_CONTRACT_FAIL: ${message}`);
  process.exit(1);
};

const read = (path) => {
  if (!existsSync(path)) fail(`missing ${path}`);
  return readFileSync(path, "utf8");
};

const layout = read("app/layout.tsx");
const engine = read("components/water-surface.tsx");
const css = read("app/circuit-water-v3.css");
const decisions = read("docs/governance/WEBSITE-OWNER-DECISIONS.md");

if (!layout.includes("<WaterSurface />") || !layout.includes('import "./circuit-water-v3.css"')) {
  fail("global circuit-water environment is not mounted and styled");
}
if (!engine.includes('canvas.getContext("webgl2"') || !engine.includes("FRAGMENT_SHADER")) {
  fail("WebGL2 shader engine missing");
}
if (!engine.includes("circuitBoard(") || !engine.includes("signalPulse") || !engine.includes("energyColor")) {
  fail("procedural PCB energy network missing");
}
if (!engine.includes("waterHeight(") || !engine.includes("gradient") || !engine.includes("distortedUv")) {
  fail("water refraction model missing");
}
if (!engine.includes('window.addEventListener("pointermove"') || !engine.includes('window.addEventListener("pointerdown"')) {
  fail("pointer water interaction missing");
}
if (!engine.includes("const MAX_RIPPLES = 12") || !engine.includes("stone(") || !engine.includes("brush(")) {
  fail("bounded brush and stone ripple model missing");
}
if (!engine.includes('window.addEventListener("scroll"') || !engine.includes("uScroll")) {
  fail("page-wide scroll continuity missing");
}
if (!engine.includes("prefers-reduced-motion") || !css.includes("prefers-reduced-motion")) {
  fail("reduced-motion handling missing");
}
if (!css.includes(".circuit-water-environment") || !css.includes(".circuit-water-canvas")) {
  fail("full-viewport circuit environment CSS missing");
}
if (!css.includes("rgba(3, 8, 13, 0.64)") || !css.includes("backdrop-filter")) {
  fail("transparent dark content surfaces do not expose animated board");
}
if (!decisions.includes("Circuit Water V3")) {
  fail("Owner visual decision not recorded");
}

console.log(
  "DESIGN_V3_CONTRACT_PASS webgl2=PASS pcb=PROCEDURAL energy=ANIMATED water=REFRACTIVE brush=PASS stone=PASS scroll=CONTINUOUS dark=GLOBAL reduced-motion=PASS",
);
