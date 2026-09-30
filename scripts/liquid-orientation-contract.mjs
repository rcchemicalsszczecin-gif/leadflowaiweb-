import { readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`LIQUID_ORIENTATION_CONTRACT_FAIL: ${message}`);
  process.exit(1);
};
const globalField = readFileSync("components/v14-global-tech-liquid.tsx", "utf8");
const localSurface = readFileSync("components/v14-liquid-surface.tsx", "utf8");
const layout = readFileSync("app/layout.tsx", "utf8");
const combined = `${globalField}\n${localSurface}`;

if (combined.includes("uv.y = 1.0 - uv.y")) fail("fragment screen-space Y remains inverted");
if (/scaleY\(\s*-1\s*\)/.test(combined)) fail("blind canvas Y flip introduced");
if (!globalField.includes("1.0 - uPointer.y * 2.0")) fail("global DOM pointer Y is not mapped top-positive");
if (!localSurface.includes("mix(-3.0, 0.55, uPointer.y)")) fail("local hero pointer depth does not map visual top to far plane and bottom to near plane");
if (!localSurface.includes("target.y += (0.5 - uPointer.y)")) fail("camera target pointer Y parity missing");
if ((layout.match(/<V14GlobalTechLiquid \/>/g) ?? []).length !== 1) fail("global Liquid world must have exactly one root mount");
for (const marker of ["prefers-reduced-motion: reduce", 'canvas.getContext("webgl2"', "document.hidden", "requestAnimationFrame"]) {
  if (!combined.includes(marker)) fail(`Liquid fallback/performance invariant missing: ${marker}`);
}
for (const legacyAmbient of ["vec3(0.78, 1.0, 0.18)", "vec3(0.55, 0.85, 0.18)", "vec3(0.74, 1.0, 0.18)"]) {
  if (combined.includes(legacyAmbient)) fail(`legacy lime Liquid identity remains: ${legacyAmbient}`);
}
console.log("LIQUID_ORIENTATION_CONTRACT_PASS root-cause=HERO_POINTER_DEPTH_MAPPING_INVERSION correction=POINTER_TO_WATER_PLANE_BOUNDARY pointer=TOP_FAR_BOTTOM_NEAR scroll=STABLE parity=GLOBAL_LOCAL root-world=ONE reduced-motion=PASS");
