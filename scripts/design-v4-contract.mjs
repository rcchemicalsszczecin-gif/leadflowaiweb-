import { existsSync, readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`DESIGN_V4_CONTRACT_FAIL: ${message}`);
  process.exit(1);
};

const read = (path) => {
  if (!existsSync(path)) fail(`missing ${path}`);
  return readFileSync(path, "utf8");
};

const layout = read("app/layout.tsx");
const engine = read("components/water-surface.tsx");
const css = read("app/hardware-board-v4.css");
const decisions = read("docs/governance/WEBSITE-OWNER-DECISIONS.md");

if (!layout.includes("<WaterSurface />") || !layout.includes('import "./hardware-board-v4.css"')) {
  fail("Hardware Board V4 is not globally mounted/styled");
}
if (!engine.includes('canvas.getContext("webgl2"') || !engine.includes("FRAGMENT_SHADER")) {
  fail("WebGL2 renderer missing");
}
for (const token of ["cpuPackage", "vrmMask", "slotX", "pcieTrace", "m2Pos", "chipsetPos"]) {
  if (!engine.includes(token)) fail(`recognizable motherboard structure missing: ${token}`);
}
for (const token of ["powerEnergy", "ramEnergy", "pcieEnergy", "segmentPulse"]) {
  if (!engine.includes(token)) fail(`animated hardware energy path missing: ${token}`);
}
if (!engine.includes("waterHeight(") || !engine.includes("distortedUv") || !engine.includes("waterNormal")) {
  fail("refractive water model missing");
}
if (!engine.includes("stone(") || !engine.includes("brush(") || !engine.includes("const MAX_RIPPLES = 12")) {
  fail("bounded brush/stone water interaction missing");
}
if (!engine.includes('window.addEventListener("scroll"') || !engine.includes("uScroll")) {
  fail("whole-page shader continuity missing");
}
if (!css.includes("--hardware-section: rgba(3, 8, 13, 0.28)") || !css.includes("background: var(--hardware-section)")) {
  fail("desktop sections do not expose the motherboard strongly enough");
}
if (!css.includes(".site-footer") || !css.includes(".contact-form-section") || !css.includes(".knowledge-article-body")) {
  fail("whole-site visibility coverage incomplete");
}
if (!engine.includes("prefers-reduced-motion") || !css.includes("prefers-reduced-motion")) {
  fail("reduced-motion handling missing");
}
if (!decisions.includes("Hardware Board V4")) {
  fail("Owner V4 visual decision not recorded");
}

console.log(
  "DESIGN_V4_CONTRACT_PASS motherboard=RECOGNIZABLE cpu=PASS vrm=PASS ram=PASS pcie=PASS m2=PASS chipset=PASS energy=ROUTED water=REFRACTIVE visibility=WHOLE_SITE reduced-motion=PASS",
);
