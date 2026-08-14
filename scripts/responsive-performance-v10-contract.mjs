import { existsSync, readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`RESPONSIVE_PERFORMANCE_V14_FAIL: ${message}`);
  process.exit(1);
};

const read = (path) => {
  if (!existsSync(path)) fail(`missing ${path}`);
  return readFileSync(path, "utf8");
};

const layout = read("app/layout.tsx");
const labLayout = read("app/lab/layout.tsx");
const contactLayout = read("app/kontakt/layout.tsx");
const knowledgeLayout = read("app/wiedza/layout.tsx");
const portfolioLayout = read("app/realizacje/layout.tsx");
const aboutLayout = read("app/o-nas/layout.tsx");
const searchEducationLayout = read("app/seo-aeo-geo/layout.tsx");
const v14Hero = read("components/v14-hero.tsx");
const v14SiteHeader = read("components/v14-site-header.tsx");
const v14Shell = read("public/v14-shell.css");
const liquidSurface = read("components/v14-liquid-surface.tsx");
const legacyGenerator = read("scripts/generate-v14-legacy-routes-css.mjs");
const packageJson = read("package.json");
const gitignore = read(".gitignore");
const agents = read("AGENTS.md");
const v14Plan = read("docs/plans/V14-VISUAL-REBUILD.md");

for (const retiredImport of [
  './services.css',
  './premium-art-direction-v9.css',
  './premium-calibration-v9-2.css',
  './responsive-performance-v10.css',
  './interactive-v7.css',
  './contact.css',
  './knowledge.css',
  './v13-search-education.css',
  './v13-visual-authority.css',
  './precision-water.css',
  './circuit-water-v3.css',
  './hardware-board-v4.css',
  './realistic-board-v5.css',
  './content-frames-v6.css',
]) {
  if (layout.includes(retiredImport)) fail(`retired/root-inappropriate stylesheet remounted: ${retiredImport}`);
}

if (!layout.includes('./globals.css')) fail("globals.css missing from root");
const rootCssImports = [...layout.matchAll(/import\s+["'](\.\/[^"']+\.css)["']/g)].map((match) => match[1]);
if (rootCssImports.length !== 1 || rootCssImports[0] !== "./globals.css") {
  fail(`root CSS ownership must be globals-only, found: ${rootCssImports.join(",")}`);
}

const routeStyles = [
  [labLayout, 'import "../interactive-v7.css"', "Lab interactive"],
  [contactLayout, 'import "../contact.css"', "contact"],
  [knowledgeLayout, 'import "../knowledge.css"', "knowledge"],
  [portfolioLayout, 'import "../knowledge.css"', "portfolio"],
  [aboutLayout, 'import "../knowledge.css"', "about"],
  [searchEducationLayout, 'import "../v13-search-education.css"', "search education"],
];
for (const [source, token, label] of routeStyles) {
  if (!source.includes(token)) fail(`${label} route stylesheet ownership missing`);
}

if (!v14SiteHeader.includes('href="/v14-legacy-routes.css"')) {
  fail("migrated-route legacy bridge link missing from shared V14 header");
}
if (v14Hero.includes("v14-legacy-routes.css")) {
  fail("homepage must not load the legacy route bridge");
}
if (!gitignore.includes("/public/v14-legacy-routes.css")) {
  fail("generated legacy route bridge must stay out of Git history");
}
for (const sourcePath of [
  "app/services.css",
  "app/precision-water.css",
  "app/circuit-water-v3.css",
  "app/hardware-board-v4.css",
  "app/realistic-board-v5.css",
  "app/content-frames-v6.css",
]) {
  if (!legacyGenerator.includes(`"${sourcePath}"`)) fail(`legacy bridge source missing: ${sourcePath}`);
}
if (!packageJson.includes('"legacy-routes:css"') || !packageJson.includes("npm run legacy-routes:css && next build")) {
  fail("legacy bridge generation is not wired into the build");
}

if (layout.includes("WaterSurface") || layout.includes("water-surface")) fail("global Water runtime remounted");

for (const required of [
  'href="/v14-shell.css"',
  'className="v14-mobile-nav"',
  'className="v14-mobile-nav-panel"',
  'aria-label="Otwórz nawigację mobilną"',
  'aria-label="Nawigacja mobilna"',
]) {
  if (!v14Hero.includes(required)) fail(`V14 responsive shell invariant missing: ${required}`);
}

for (const required of [
  "overflow-x: clip",
  "text-size-adjust: 100%",
  "max-inline-size: 100%",
  "safe-area-inset-left",
  "safe-area-inset-right",
  "safe-area-inset-top",
  "@media (max-width: 980px)",
  ".v14-mobile-nav",
  "display: block",
  "min-height: 44px",
  "orientation: landscape",
  "100svh",
  "pointer: coarse",
  "prefers-reduced-motion: reduce",
]) {
  if (!v14Shell.includes(required)) fail(`V14 responsive CSS invariant missing: ${required}`);
}

for (const invariant of [
  "const FRAME_INTERVAL_MS = 1000 / 45",
  "const COMPACT_FRAME_INTERVAL_MS = 1000 / 30",
  "const MAX_DPR = 1.25",
  "const COMPACT_DPR = 1",
  "IntersectionObserver",
  "ResizeObserver",
  'document.addEventListener("visibilitychange"',
  "document.hidden",
  'window.matchMedia("(pointer: fine)")',
  'window.matchMedia("(max-width: 899px), (pointer: coarse)")',
  'powerPreference: compactRender.matches ? "low-power" : "default"',
]) {
  if (!liquidSurface.includes(invariant)) fail(`Liquid runtime invariant missing: ${invariant}`);
}

const reducedGuard = liquidSurface.indexOf("if (reducedMotion.matches)");
const contextAllocation = liquidSurface.indexOf('canvas.getContext("webgl2"');
if (reducedGuard < 0 || contextAllocation < 0 || reducedGuard > contextAllocation) {
  fail("reduced-motion must bypass WebGL allocation");
}
if (!liquidSurface.includes('if (finePointer.matches) window.addEventListener("pointermove"')) {
  fail("Liquid pointer tracking must be fine-pointer only");
}
if (liquidSurface.includes('addEventListener("scroll"')) {
  fail("global scroll event loop introduced");
}
if (!liquidSurface.includes("sceneVisible") || !liquidSurface.includes("stopRendering")) {
  fail("offscreen Liquid render suspension missing");
}

if (
  !agents.includes("Current design authority — V14 Global Liquid World") ||
  !agents.includes("V14 Full Visual Rebuild and the later Owner-authorized Global Liquid World supersede V9/V9.2 visual freeze")
) {
  fail("current V14 Global Liquid World design authority missing");
}
if (
  !v14Plan.includes("R2 — CSS + RUNTIME DE-STACK") ||
  !v14Plan.includes("aggregate and route-level performance budgets")
) {
  fail("completed V14 responsive/performance delivery evidence incomplete");
}

if (packageJson.includes('"three"') || packageJson.includes("@react-three") || packageJson.includes("babylon")) {
  fail("heavy decorative 3D dependency introduced");
}

console.log(
  "RESPONSIVE_PERFORMANCE_V14_PASS root=GLOBALS_ONLY legacy-service-v2-v6=ROUTE_BRIDGE route-css=SCOPED lab-css=ROUTE_SCOPED v14-mobile=PASS touch=44px safe-area=PASS overflow=SAFE landscape=PASS coarse-pointer=PASS reduced-motion=PASS liquid=SCENE_BOUNDED offscreen-stop=PASS design=V14_GLOBAL_LIQUID_WORLD",
);
