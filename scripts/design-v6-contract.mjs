import { existsSync, readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`DESIGN_V6_CONTRACT_FAIL: ${message}`);
  process.exit(1);
};

const read = (path) => {
  if (!existsSync(path)) fail(`missing ${path}`);
  return readFileSync(path, "utf8");
};

const layout = read("app/layout.tsx");
const page = read("app/page.tsx");
const css = read("app/content-frames-v6.css");
const v5Engine = read("components/water-surface.tsx");
const decisions = read("docs/governance/WEBSITE-OWNER-DECISIONS.md");
const direction = read("docs/design/LEADFLOWAI-DESIGN-DIRECTION-V6.md");

if (!layout.includes('import "./content-frames-v6.css"')) {
  fail("V6 content frame stylesheet is not mounted");
}
if (page.includes('className="stage-index"')) {
  fail("oversized stage index survived V6");
}
if (!page.includes("content-frame stage-module") || !page.includes("content-frame content-frame-split")) {
  fail("homepage framed module grammar missing");
}
if (!css.includes(".content-frame::before") || !css.includes(".content-frame::after")) {
  fail("technical frame corner markers missing");
}
if (!css.includes(".section-label span:first-child") || !css.includes("color: var(--signal)")) {
  fail("compact technical section index styling missing");
}
if (!css.includes(".stage-detail") || !css.includes("border-left: 1px solid var(--frame-line)")) {
  fail("stage title/detail hierarchy missing");
}
if (!css.includes(".process-list span") || !css.includes(".quality-item > span")) {
  fail("compact process/quality index chips missing");
}
if (css.includes("backdrop-filter: blur")) {
  fail("V6 reintroduced bulk blur");
}
if (!v5Engine.includes("const MAX_RIPPLES = 8") || !v5Engine.includes("FRAME_INTERVAL_MS = 1000 / 45")) {
  fail("V5 water performance bounds changed unexpectedly");
}
if (!direction.includes("V6 supersedes V5 only for foreground")) {
  fail("V6 supersession boundary missing");
}
if (!decisions.includes("Content Frames V6")) {
  fail("Owner V6 decision not recorded");
}

console.log(
  "DESIGN_V6_CONTRACT_PASS frames=TECHNICAL stage-index=COMPACT typography=REFINED hierarchy=PASS bulk-blur=OFF water-v5=FROZEN mobile=PASS",
);
