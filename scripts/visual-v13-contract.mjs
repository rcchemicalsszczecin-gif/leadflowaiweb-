import { existsSync, readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`VISUAL_V13_FAIL: ${message}`);
  process.exit(1);
};

const read = (path) => {
  if (!existsSync(path)) fail(`missing ${path}`);
  return readFileSync(path, "utf8");
};

const owner = read("docs/governance/WEBSITE-OWNER-DECISION-V13.md");
const home = read("app/page.tsx");
const visibilityHub = read("app/seo-aeo-geo/page.tsx");
const hero = read("components/premium-v9-interactions.tsx");
const css = read("app/v13-visual-authority.css");
const searchEducationCss = read("app/v13-search-education.css");
const searchEducation = read("components/search-visibility-explainer-v13.tsx");
const layout = read("app/layout.tsx");
const sitemap = read("app/sitemap.ts");
const portfolio = read("app/realizacje/page.tsx");
const packageJson = read("package.json");

if (!owner.includes("STATUS: ACTIVE OWNER AUTHORITY")) fail("V13 owner authority missing");
for (const required of ["Wyceń projekt", "Zobacz realizacje", "STRONY WWW · WIDOCZNOŚĆ · SYSTEMY"]) {
  if (!home.includes(required)) fail(`buyer-first homepage signal missing: ${required}`);
}
for (const required of ["hero-browser-v13", "hero-mobile-v13", "Strona, która pracuje.", "SEO</span><span>AEO</span><span>GEO"]) {
  if (!hero.includes(required)) fail(`first-party hero showcase missing: ${required}`);
}
for (const required of ["@media (max-width: 900px)", "@media (max-width: 620px)", "@media (prefers-reduced-motion: reduce)"]) {
  if (!css.includes(required)) fail(`V13 responsive/reduced-motion rule missing: ${required}`);
}
for (const required of [
  "01 / CZŁOWIEK",
  "02 / GOOGLE",
  "03 / SYSTEM AI",
  "VISUAL ENTITY GRAPH",
  "EDUKACYJNY AI SEARCH PREVIEW",
  "nie gwarancja",
]) {
  if (!searchEducation.includes(required)) fail(`V13 search education visual missing: ${required}`);
}
if (!visibilityHub.includes("<SearchVisibilityExplainerV13 />")) fail("V13 search education module is not mounted on visibility hub");
if (!layout.includes('import "./v13-search-education.css"')) fail("V13 search education stylesheet is not mounted");
if (!searchEducationCss.includes(".search-view-grid-v13") || !searchEducationCss.includes(".entity-graph-stage-v13") || !searchEducationCss.includes("@media (max-width: 620px)")) {
  fail("V13 search education visual/mobile contract incomplete");
}
if (!layout.includes('import "./v13-visual-authority.css"')) fail("V13 visual authority is not mounted");
if (!layout.includes('/og-leadflowai.svg')) fail("first-party OG asset is not wired into metadata");
if (!existsSync("public/og-leadflowai.svg")) fail("first-party OG asset missing");
if (!existsSync("app/o-nas/page.tsx") || !sitemap.includes('"o-nas"')) fail("trust/about route is not fully public");
if (!portfolio.includes("PortfolioProjectVisual") || !existsSync("components/portfolio-project-visual.tsx")) fail("visual portfolio proof missing");
if (css.includes("images.unsplash.com") || layout.includes("images.unsplash.com")) fail("V13 public visual layer still depends on Unsplash");
if (packageJson.includes('"three"') || packageJson.includes("@react-three") || packageJson.includes("babylon")) fail("heavy 3D dependency introduced");

console.log("VISUAL_V13_PASS authority=PASS hero=PRODUCT_SHOWCASE human-google-ai=SPLIT entity-graph=PASS ai-search-preview=EDUCATIONAL_NO_GUARANTEE route=SEO_AEO_GEO mobile=DEDICATED reduced-motion=PASS og=FIRST_PARTY trust=PASS portfolio=VISUAL stock=ABSENT heavy-3d=ABSENT");
