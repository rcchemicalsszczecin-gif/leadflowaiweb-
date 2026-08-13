import { existsSync, readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`VISUAL_V13_FAIL: ${message}`);
  process.exit(1);
};

const read = (path) => {
  if (!existsSync(path)) fail(`missing ${path}`);
  return readFileSync(path, "utf8");
};

const home = read("app/page.tsx");
const hero = read("components/premium-v9-interactions.tsx");
const css = read("app/v13-visual-authority.css");
const layout = read("app/layout.tsx");
const sitemap = read("app/sitemap.ts");
const portfolio = read("app/realizacje/page.tsx");
const packageJson = read("package.json");

for (const required of ["Wyceń projekt", "Zobacz realizacje", "STRONY WWW · WIDOCZNOŚĆ · SYSTEMY"]) {
  if (!home.includes(required)) fail(`buyer-first homepage signal missing: ${required}`);
}
for (const required of ["hero-browser-v13", "hero-mobile-v13", "Strona, która pracuje.", "SEO</span><span>AEO</span><span>GEO"]) {
  if (!hero.includes(required)) fail(`first-party hero showcase missing: ${required}`);
}
for (const required of ["@media (max-width: 900px)", "@media (max-width: 620px)", "@media (prefers-reduced-motion: reduce)"]) {
  if (!css.includes(required)) fail(`V13 responsive/reduced-motion rule missing: ${required}`);
}
if (!layout.includes('import "./v13-visual-authority.css"')) fail("V13 visual authority is not mounted");
if (!layout.includes('/og-leadflowai.svg')) fail("first-party OG asset is not wired into metadata");
if (!existsSync("public/og-leadflowai.svg")) fail("first-party OG asset missing");
if (!existsSync("app/o-nas/page.tsx") || !sitemap.includes('"o-nas"')) fail("trust/about route is not fully public");
if (!portfolio.includes("PortfolioProjectVisual") || !existsSync("components/portfolio-project-visual.tsx")) fail("visual portfolio proof missing");
if (css.includes("images.unsplash.com") || layout.includes("images.unsplash.com")) fail("V13 public visual layer still depends on Unsplash");
if (packageJson.includes('"three"') || packageJson.includes("@react-three") || packageJson.includes("babylon")) fail("heavy 3D dependency introduced");

console.log("VISUAL_V13_PASS hero=PRODUCT_SHOWCASE mobile=DEDICATED reduced-motion=PASS og=FIRST_PARTY trust=PASS portfolio=VISUAL stock=ABSENT heavy-3d=ABSENT");
