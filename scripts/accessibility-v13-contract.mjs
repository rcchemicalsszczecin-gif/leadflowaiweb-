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
const legacyCss = read("app/v13-accessibility.css");
const legacyHeader = read("components/site-header.tsx");
const v14Hero = read("components/v14-hero.tsx");
const v14Page = read("app/page.tsx");
const v14Process = read("components/v14-process-canvas.tsx");
const v14Shell = read("public/v14-shell.css");
const knowledgeLinks = read("components/service-knowledge-links.tsx");

if (!layout.includes('import "./v13-accessibility.css"')) fail("shared accessibility stylesheet is not mounted");
if (!legacyCss.includes(":focus-visible") || !legacyCss.includes("outline-offset: 4px")) fail("shared visible keyboard focus contract missing");
if (!legacyCss.includes("min-height: 44px") || !legacyCss.includes("pointer: coarse")) fail("legacy-route touch target contract missing");
if (!legacyHeader.includes('aria-label="Główna nawigacja"') || !legacyHeader.includes('aria-label="Nawigacja mobilna"')) fail("legacy-route navigation labels missing");
if (!legacyHeader.includes('aria-label="Otwórz nawigację"')) fail("legacy-route mobile navigation control label missing");
if (!knowledgeLinks.includes('aria-label="Wiedza powiązana z usługą"')) fail("knowledge-link navigation label missing");

for (const required of [
  'href="/v14-shell.css"',
  'className="v14-skip-link"',
  'href="#main-content"',
  'className="v14-mobile-nav"',
  'aria-label="Otwórz nawigację mobilną"',
  'aria-label="Nawigacja mobilna"',
  'href="/#process"',
]) {
  if (!v14Hero.includes(required)) fail(`V14 hero accessibility invariant missing: ${required}`);
}

for (const required of ['id="main-content"', 'tabIndex={-1}']) {
  if (!v14Page.includes(required)) fail(`V14 main-content invariant missing: ${required}`);
}

if (!v14Process.includes('id="process"')) fail("V14 process anchor missing");

for (const required of [
  ".v14-mobile-nav",
  "min-height: 44px",
  ":focus-visible",
  "pointer: coarse",
  "prefers-reduced-motion: reduce",
  "transform: none !important",
  "#main-content",
  "#process",
]) {
  if (!v14Shell.includes(required)) fail(`V14 shell accessibility rule missing: ${required}`);
}

console.log("ACCESSIBILITY_V14_PASS legacy-routes=PASS v14-mobile-nav=PASS skip-link=PASS process-anchor=PASS focus=VISIBLE touch=44px reduced-motion=PASS navigation-labels=PASS");
