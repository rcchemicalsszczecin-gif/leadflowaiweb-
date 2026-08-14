import { existsSync, readFileSync } from "node:fs";
const fail=(m)=>{console.error(`VISUAL_V14_FAIL: ${m}`);process.exit(1)};
const read=(p)=>{if(!existsSync(p))fail(`missing ${p}`);return readFileSync(p,"utf8")};

const owner=read("docs/governance/WEBSITE-OWNER-DECISION-V14.md");
const home=read("app/page.tsx");
const hero=read("components/v14-hero.tsx");
const browser=read("components/v14-browser-mockup.tsx");
const phone=read("components/v14-phone-mockup.tsx");
const visualCss=read("public/v14.css");
const visibilityHub=read("app/seo-aeo-geo/page.tsx");
const searchEducation=read("components/search-visibility-explainer-v13.tsx");
const layout=read("app/layout.tsx");
const sitemap=read("app/sitemap.ts");
const portfolio=read("app/realizacje/page.tsx");
const packageJson=read("package.json");

if(!owner.includes("STATUS: COMPLETED OWNER AUTHORITY / PRODUCTION RELEASED")||!owner.includes("OWNER_MERGE_AUTHORIZATION=GRANTED_AND_EXERCISED"))fail("V14 production owner authority missing");
if(!home.includes("<V14Hero")||!home.includes('className="v14-page"'))fail("V14 homepage shell missing");
for(const required of ["Wyceń projekt","Zobacz realizacje","pracują jak produkt","WEB PRODUCTS · SEARCH · AI"])if(!hero.includes(required))fail(`buyer-first V14 hero signal missing: ${required}`);
if(!browser.includes("v14-browser")||!browser.includes("WEB PRODUCT / ACTIVE"))fail("spatial browser product proof missing");
if(!phone.includes("v14-phone")||!phone.includes("MOBILE PRODUCT"))fail("mobile product proof missing");
if(!visualCss.includes("background:var(--v14-paper)")||!visualCss.includes("v14-foundation"))fail("light/dark V14 rhythm missing");
for(const required of ["01 / CZŁOWIEK","02 / GOOGLE","03 / SYSTEM AI","VISUAL ENTITY GRAPH","EDUKACYJNY AI SEARCH PREVIEW","nie gwarancja"])if(!searchEducation.includes(required))fail(`search education visual missing: ${required}`);
if(!visibilityHub.includes("<SearchVisibilityExplainerV13 />"))fail("search education module not active on visibility hub");
if(!layout.includes('/og-leadflowai.svg'))fail("first-party OG asset not wired");
if(!existsSync("public/og-leadflowai.svg"))fail("first-party OG asset missing");
if(!existsSync("app/o-nas/page.tsx")||!sitemap.includes('"o-nas"'))fail("trust/about route incomplete");
if(!portfolio.includes("PortfolioProjectVisual")||!existsSync("components/portfolio-project-visual.tsx"))fail("visual portfolio proof missing");
if(visualCss.includes("images.unsplash.com"))fail("V14 public visual layer depends on stock background");
if(packageJson.includes('"three"')||packageJson.includes("@react-three")||packageJson.includes("babylon"))fail("heavy 3D dependency introduced");

console.log("VISUAL_V14_PASS authority=PRODUCTION_RELEASED hero=PRODUCT_STAGE mobile=DEDICATED rhythm=LIGHT_DARK css=CONSOLIDATED search-education=PASS og=FIRST_PARTY trust=PASS portfolio=VISUAL stock=ABSENT heavy-3d=ABSENT");