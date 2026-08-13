import { existsSync, readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`ACCESSIBILITY_V13_FAIL: ${message}`);
  process.exit(1);
};

const read = (path) => {
  if (!existsSync(path)) fail(`missing ${path}`);
  return readFileSync(path, "utf8");
};

const layout = read("app/layout.tsx");
const css = read("app/v13-accessibility.css");
const header = read("components/site-header.tsx");
const knowledgeLinks = read("components/service-knowledge-links.tsx");

if (!layout.includes('import "./v13-accessibility.css"')) fail("V13 accessibility stylesheet is not mounted");
if (!css.includes(":focus-visible") || !css.includes("outline-offset: 4px")) fail("visible keyboard focus contract missing");
if (!css.includes("min-height: 44px") || !css.includes("pointer: coarse")) fail("touch target contract missing");
if (!css.includes("prefers-reduced-motion: reduce") || !css.includes("transform: none")) fail("V13 reduced-motion override missing");
if (!header.includes('aria-label="Główna nawigacja"') || !header.includes('aria-label="Nawigacja mobilna"')) fail("navigation labels missing");
if (!header.includes('aria-label="Otwórz nawigację"')) fail("mobile navigation control label missing");
if (!knowledgeLinks.includes('aria-label="Wiedza powiązana z usługą"')) fail("knowledge-link navigation label missing");

console.log("ACCESSIBILITY_V13_PASS focus=VISIBLE touch=44px reduced-motion=PASS navigation-labels=PASS");
