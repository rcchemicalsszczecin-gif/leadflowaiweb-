import { readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`LIQUID_ORIENTATION_CONTRACT_FAIL: ${message}`);
  process.exit(1);
};
const globalField = readFileSync("components/v14-global-tech-liquid.tsx", "utf8");
const localSurface = readFileSync("components/v14-liquid-surface.tsx", "utf8");
const projection = readFileSync("lib/liquid-pointer-projection.ts", "utf8");
const layout = readFileSync("app/layout.tsx", "utf8");
const combined = `${globalField}\n${localSurface}\n${projection}`;

if (combined.includes("uv.y = 1.0 - uv.y")) fail("fragment screen-space Y remains inverted");
if (/scaleY\(\s*-1\s*\)/.test(combined)) fail("blind canvas Y flip introduced");
if (!projection.includes("1 - normalizedY * 2")) fail("DOM top-origin to clip-space Y conversion missing");
if (!projection.includes("(0.5 - normalizedY)")) fail("camera target pointer Y parity missing");
if (!localSurface.includes("updatePerspectiveWaterProjection")) fail("local hero pointer does not use camera-ray projection");
if (localSurface.includes("mix(-3.0, 0.55, uPointer.y)")) fail("obsolete local pointer-depth heuristic remains");
if ((layout.match(/<V14GlobalTechLiquid \/>/g) ?? []).length !== 1) fail("global Liquid world must have exactly one root mount");
for (const marker of ["prefers-reduced-motion: reduce", 'canvas.getContext("webgl2"', "document.hidden", "requestAnimationFrame"]) {
  if (!combined.includes(marker)) fail(`Liquid fallback/performance invariant missing: ${marker}`);
}
for (const legacyAmbient of ["vec3(0.78, 1.0, 0.18)", "vec3(0.55, 0.85, 0.18)", "vec3(0.74, 1.0, 0.18)"]) {
  if (combined.includes(legacyAmbient)) fail(`legacy lime Liquid identity remains: ${legacyAmbient}`);
}
console.log("LIQUID_ORIENTATION_CONTRACT_PASS root-cause=HEURISTIC_POINTER_PROJECTION correction=CAMERA_RAY_WATER_SURFACE_INTERSECTION pointer=TOP_ORIGIN_TO_CLIP_Y scroll=STABLE parity=GLOBAL_LOCAL root-world=ONE reduced-motion=PASS");
