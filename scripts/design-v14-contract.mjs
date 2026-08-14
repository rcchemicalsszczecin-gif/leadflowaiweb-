import { existsSync, readFileSync } from "node:fs";

const fail = (message) => { console.error(`DESIGN_V14_CONTRACT_FAIL: ${message}`); process.exit(1); };
const read = (path) => { if (!existsSync(path)) fail(`missing ${path}`); return readFileSync(path, "utf8"); };

const owner = read("docs/governance/WEBSITE-OWNER-DECISION-V14.md");
const home = read("app/page.tsx");
const hero = read("components/v14-hero.tsx");
const stage = read("components/v14-product-stage.tsx");
const browser = read("components/v14-browser-mockup.tsx");
const phone = read("components/v14-phone-mockup.tsx");
const base = read("public/v14-base.css");
const browserCss = read("public/v14-browser-core.css") + read("public/v14-browser-content.css");
const phoneCss = read("public/v14-phone.css");
const water = read("components/water-surface.tsx");
const packageJson = read("package.json");

if (!owner.includes("STATUS: ACTIVE OWNER AUTHORITY")) fail("V14 owner authority missing");
if (!home.includes('className="v14-page"') || !home.includes("<V14Hero")) fail("V14 homepage root missing");
for (const retired of ["premium-page-v9", "premium-page-v92", "PremiumExperienceControllerV92", "PremiumStageJourneyV9", "ManifestSceneV92", "ScrollStoryV9"]) {
  if (home.includes(retired)) fail(`legacy homepage visual dependency remains: ${retired}`);
}
if (home.includes("data-v92-reveal")) fail("legacy reveal/fade language remains on V14 homepage");
for (const required of ["v14-header", "v14-hero", "pracują jak produkt", "Wyceń projekt", "Zobacz realizacje"]) if (!hero.includes(required)) fail(`hero signal missing: ${required}`);
for (const required of ["V14BrowserMockup", "V14PhoneMockup", "LIQUID ENGINE"]) if (!stage.includes(required)) fail(`product stage missing: ${required}`);
if (!browser.includes("v14-browser") || !phone.includes("v14-phone")) fail("device product mockups incomplete");
if (!base.includes("--v14-accent") || !base.includes("v14-foundation") || !base.includes("background:var(--v14-paper)")) fail("light/dark V14 visual rhythm missing");
if (!browserCss.includes("perspective:1600px") || !browserCss.includes("rotateY(-7deg)")) fail("spatial browser treatment missing");
if (!phoneCss.includes("@media(max-width:620px)")) fail("dedicated mobile art direction missing");
for (const css of [base,browserCss,phoneCss]) if (css.includes("images.unsplash.com")) fail("V14 visual system depends on stock background");
if (!stage.includes('/v14-base.css') || !stage.includes('/v14-browser-core.css') || !stage.includes('/v14-phone.css')) fail("V14 scoped stylesheet assets are not mounted");
if (!water.includes("const MAX_RIPPLES = 8") || !water.includes("FRAME_INTERVAL_MS = 1000 / 45")) fail("signature water performance bounds changed");
if (packageJson.includes('"three"') || packageJson.includes("@react-three") || packageJson.includes("babylon")) fail("heavy third-party 3D dependency introduced");

console.log("DESIGN_V14_CONTRACT_PASS root=CLEAN hero=PRODUCT_STAGE browser=SPATIAL mobile=DEDICATED rhythm=LIGHT_DARK reveal=ABSENT stock=ABSENT water=FROZEN heavy-3d=ABSENT");
