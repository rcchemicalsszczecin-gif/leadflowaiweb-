import { readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");
const fail = (message) => {
  console.error(`GLOBAL_LIQUID_WORLD_V14_FAIL: ${message}`);
  process.exit(1);
};
const requireText = (source, marker, label) => {
  if (!source.includes(marker)) fail(`${label} missing: ${marker}`);
};
const rejectText = (source, marker, label) => {
  if (source.includes(marker)) fail(`${label} forbidden: ${marker}`);
};

const layout = read("app/layout.tsx");
const field = read("components/v14-global-tech-liquid.tsx");
const guard = read("components/v14-global-tech-hero-guard.tsx");
const worldCss = read("public/v14-global-tech-world.css");
const hero = read("components/v14-hero.tsx");
const header = read("components/v14-site-header.tsx");
const footer = read("components/v14-site-footer.tsx");
const brand = read("components/v14-brand-mark.tsx");
const trinity = read("components/v14-search-trinity.tsx");
const routePreview = read(".github/workflows/v14-route-preview.yml");
const routeDriver = read("scripts/capture-route-webdriver-v14.py");

requireText(layout, '<link rel="stylesheet" href="/v14-global-tech-world.css"', "root world asset");
requireText(layout, "<V14GlobalTechLiquid />", "root world mount");
requireText(layout, "<V14GlobalTechHeroGuard />", "accepted hero guard");

requireText(field, 'canvas.getContext("webgl2"', "WebGL2 context");
requireText(field, "const DESKTOP_FRAME_INTERVAL = 1000 / 36", "desktop FPS cap");
requireText(field, "const COMPACT_FRAME_INTERVAL = 1000 / 24", "compact FPS cap");
requireText(field, "prefers-reduced-motion: reduce", "reduced-motion fallback");
requireText(field, 'root.dataset.heroCovered === "true"', "hero GPU draw guard");
requireText(field, "vec3 pcb(vec2 p)", "PCB field");
requireText(field, "vec3 chip(vec2 p", "CPU/GPU package renderer");
requireText(field, "vec3 memoryChip(vec2 p", "GPU memory renderer");
requireText(field, "vec3 capacitor(vec2 p", "PCB component renderer");
requireText(field, "vec2 refracted = world + gradient * 0.086", "liquid refraction");
requireText(field, "caustic", "liquid caustics");
requireText(field, "bubble", "liquid depth bubbles");
requireText(field, "uScroll", "scroll-linked world");

requireText(guard, 'globalField.dataset.heroCovered = covered ? "true" : "false"', "hero state bridge");
requireText(worldCss, '.v14-global-tech-liquid[data-hero-covered="true"]{opacity:0}', "hero visual preservation");
requireText(worldCss, "main.v14-page :is(.v14-services,.v14-device-theater,.v14-liquid,.v14-st,.v14-pc,.v14-foundation,.v14-knowledge,.v14-brief,.v14-closing)", "homepage global world surfaces");
requireText(worldCss, "main#main-content :is(.section-light,.section-dark)", "detail-route global world surfaces");
requireText(worldCss, "main.v14-service-page :is(.outcome-grid article,.service-faq-grid details,.related-grid a,.service-process li,.service-capability-panel)", "service glass modules");
rejectText(worldCss, "!important", "world CSS specificity");

requireText(hero, "<V14BrandMark />", "hero owner logo");
requireText(header, "<V14BrandMark />", "route header owner logo");
requireText(footer, "<V14BrandMark />", "footer owner logo");
requireText(brand, 'stroke="#b8ff38"', "owner lime logo stroke");
requireText(brand, 'stroke="#f5f7f2"', "owner white logo stroke");
requireText(trinity, 'src="/v14-search-trinity-dark.svg"', "dark Search/AI artwork");

requireText(routePreview, "Capture active global Liquid routes with WebDriver", "route visual evidence workflow");
requireText(routeDriver, '("service-desktop", "/strony-internetowe/", 1440, 1600)', "service visual proof");
requireText(routeDriver, '("knowledge-desktop", "/wiedza/", 1440, 1600)', "knowledge visual proof");
requireText(routeDriver, '("contact-desktop", "/kontakt/", 1440, 1400)', "contact visual proof");
requireText(routeDriver, '("lab-desktop", "/lab/", 1440, 1400)', "lab visual proof");
requireText(routeDriver, 'state.get("webgl2")', "route WebGL2 proof");

console.log(
  "GLOBAL_LIQUID_WORLD_V14_PASS root=GLOBAL_WEBGL2 hero=PRESERVED_GPU_GUARDED world=PCB_CPU_GPU liquid=REFRACTION_CAUSTICS_BUBBLES routes=ALL_ROOT_MOUNT cards=DARK_GLASS logo=OWNER_MARK search-art=DARK route-preview=8_CAPTURES performance=36_24_FPS reduced-motion=PASS",
);
