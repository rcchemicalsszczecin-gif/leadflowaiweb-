import { existsSync, readFileSync } from "node:fs";
const fail=(m)=>{console.error(`VISUAL_V14_FAIL: ${m}`);process.exit(1)};
const read=(p)=>{if(!existsSync(p))fail(`missing ${p}`);return readFileSync(p,"utf8")};

const owner=read("docs/governance/WEBSITE-OWNER-DECISION-V14.md");
const home=read("app/page.tsx");
const hero=read("components/v14-hero.tsx");
const signature=read("components/v14-signature-stage.tsx");
const liquidSurface=read("components/v14-liquid-surface.tsx");
const liquidCss=read("public/v14-liquid-surface.css");
const visualCss=read("public/v14.css");
const visibilityHub=read("app/seo-aeo-geo/page.tsx");
const searchEducation=read("components/search-visibility-explainer-v13.tsx");
const layout=read("app/layout.tsx");
const sitemap=read("app/sitemap.ts");
const portfolio=read("app/realizacje/page.tsx");
const packageJson=read("package.json");

if(!owner.includes("STATUS: COMPLETED OWNER AUTHORITY / PRODUCTION RELEASED")||!owner.includes("OWNER_MERGE_AUTHORIZATION=GRANTED_AND_EXERCISED"))fail("V14 production owner authority missing");
if(!home.includes("<V14Hero")||!home.includes('className="v14-page"'))fail("V14 homepage shell missing");
for(const required of ["Wyceń projekt","Zobacz realizacje","pracują jak produkt","WEB PRODUCTS · SEARCH · AI",'variant="hero"',"V14SignatureStage","LIQUID WEBGL","SPATIAL 3D"])if(!hero.includes(required))fail(`buyer-first signature hero signal missing: ${required}`);
for(const required of ["V14BrowserMockup","V14PhoneMockup","SEARCH LAYER","AI LAYER","DEPTH 240","REAL-TIME SURFACE · SPATIAL PRODUCT","--sig-rx","--sig-ry"])if(!signature.includes(required))fail(`spatial product proof missing: ${required}`);
for(const required of ["waveHeight","waterNormal","fresnel","reflectedDirection","caustic","pointerRipple","canvas.getContext(\"webgl2\""])if(!liquidSurface.includes(required))fail(`real-time Liquid shader proof missing: ${required}`);
for(const required of ['[data-variant="hero"]',".v14-signature-stage","perspective: 1900px","translateZ(310px)","transform-style: preserve-3d"])if(!liquidCss.includes(required))fail(`hero Liquid/spatial visual CSS missing: ${required}`);
if(!visualCss.includes("background:var(--v14-paper)")||!visualCss.includes("v14-foundation"))fail("light/dark V14 rhythm missing");
for(const required of ["01 / CZŁOWIEK","02 / GOOGLE","03 / SYSTEM AI","VISUAL ENTITY GRAPH","EDUKACYJNY AI SEARCH PREVIEW","nie gwarancja"])if(!searchEducation.includes(required))fail(`search education visual missing: ${required}`);
if(!visibilityHub.includes("<SearchVisibilityExplainerV13 />"))fail("search education module not active on visibility hub");
if(!layout.includes('/brand/og-leadflowai-brand.png'))fail("approved brand-led OG asset not wired");
if(!existsSync("public/brand/og-leadflowai-brand.png"))fail("approved brand-led OG asset missing");
if(!existsSync("app/o-nas/page.tsx")||!sitemap.includes('"o-nas"'))fail("trust/about route incomplete");
if(!portfolio.includes("PortfolioProjectVisual")||!existsSync("components/portfolio-project-visual.tsx"))fail("visual portfolio proof missing");
if(visualCss.includes("images.unsplash.com")||liquidCss.includes("images.unsplash.com"))fail("V14 public visual layer depends on stock background");
if(packageJson.includes('"three"')||packageJson.includes("@react-three")||packageJson.includes("babylon"))fail("heavy 3D dependency introduced");

console.log("VISUAL_V14_PASS authority=PRODUCTION_RELEASED hero=REALTIME_LIQUID_WEBGL spatial=POINTER_DRIVEN_DEPTH water=HEIGHTFIELD_NORMALS_FRESNEL_CAUSTICS mobile=DEDICATED rhythm=LIGHT_DARK search-education=PASS og=FIRST_PARTY trust=PASS portfolio=VISUAL stock=ABSENT heavy-3d-lib=ABSENT");
