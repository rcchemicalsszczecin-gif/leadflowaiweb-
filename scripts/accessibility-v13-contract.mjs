import { existsSync, readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`ACCESSIBILITY_V14_FAIL: ${message}`);
  process.exit(1);
};

const read = (path) => {
  if (!existsSync(path)) fail(`missing ${path}`);
  return readFileSync(path, "utf8");
};

const layout = read("app/layout.tsx");
const hero = read("components/v14-hero.tsx");
const sharedHeader = read("components/v14-site-header.tsx");
const homepage = read("app/page.tsx");
const processComponent = read("components/v14-process-canvas.tsx");
const shell = read("public/v14-shell.css");
const brief = read("components/v14-contact-brief.tsx");
const knowledgeLinks = read("components/service-knowledge-links.tsx");
const liquidSurface = read("components/v14-liquid-surface.tsx");

if (layout.includes('import "./v13-accessibility.css"')) fail("retired V13 accessibility layer remounted globally");

for (const source of [hero, sharedHeader]) {
  for (const required of [
    'className="v14-skip-link"',
    'href="#main-content"',
    'className="v14-mobile-nav"',
    'aria-label="Otwórz nawigację mobilną"',
    'aria-label="Nawigacja mobilna"',
  ]) {
    if (!source.includes(required)) fail(`V14 navigation accessibility invariant missing: ${required}`);
  }
}
if (!hero.includes('href: "/#process"') || !sharedHeader.includes('href: "/#process"')) fail("V14 process navigation target missing");
if (!homepage.includes('id="main-content"') || !homepage.includes('tabIndex={-1}')) fail("V14 main-content keyboard target missing");
if (!processComponent.includes('id="process"')) fail("V14 process anchor missing");

for (const required of [
  ":focus-visible",
  "outline-offset: 4px",
  "min-height: 44px",
  "pointer: coarse",
  "prefers-reduced-motion: reduce",
  "safe-area-inset-left",
  "safe-area-inset-right",
  "safe-area-inset-top",
  "orientation: landscape",
  ".related-grid a",
  ".service-directory a",
  ".hero-actions a",
  ".contact-actions a",
  "#main-content",
  "#process",
]) {
  if (!shell.includes(required)) fail(`V14 shell accessibility rule missing: ${required}`);
}
if (shell.includes("!important")) fail("V14 shell should not rely on important overrides");

if ((brief.match(/aria-pressed=/g) ?? []).length < 1) fail("V14 brief selected state is not exposed with aria-pressed");
for (const required of ["<fieldset", "<legend", 'aria-live="polite"', 'type="button"']) {
  if (!brief.includes(required)) fail(`V14 brief semantic control missing: ${required}`);
}
if (!knowledgeLinks.includes('aria-label="Wiedza powiązana z usługą"')) fail("knowledge-link navigation label missing");

const reducedGuard = liquidSurface.indexOf("if (reducedMotion.matches)");
const contextAllocation = liquidSurface.indexOf('canvas.getContext("webgl2"');
if (reducedGuard < 0 || contextAllocation < 0 || reducedGuard > contextAllocation) fail("reduced-motion must bypass Liquid WebGL context allocation");

console.log("ACCESSIBILITY_V14_PASS shell=V14_ONLY mobile-nav=PASS skip-link=PASS process-anchor=PASS brief-state=PASS fieldset=PASS focus=VISIBLE touch=44px safe-area=PASS reduced-motion=PASS webgl-fallback=PASS important=ABSENT navigation-labels=PASS");
