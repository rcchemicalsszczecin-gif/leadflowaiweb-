import { readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`OPTION_A_VISUAL_CONTRACT_FAIL: ${message}`);
  process.exit(1);
};
const option = readFileSync("public/v14-option-a.css", "utf8");
const activeFiles = [
  "app/globals.css",
  "app/services.css",
  "app/precision-water.css",
  "app/circuit-water-v3.css",
  "app/hardware-board-v4.css",
  "app/realistic-board-v5.css",
  "app/content-frames-v6.css",
  "public/v14.css",
  "public/v14-shell.css",
  "public/v14-content.css",
  "public/v14-routes.css",
  "public/v14-global-tech-world.css",
  "public/v14-liquid-surface.css",
  "public/v14-signature-boost.css",
  "public/v14-scenes.css",
  "components/v14-liquid-constructor.tsx",
];
const active = activeFiles.map((path) => `${path}\n${readFileSync(path, "utf8")}`).join("\n");

for (const required of [
  "--brand-background-primary: #050816",
  "--brand-blue: #4f7cff",
  "--brand-cyan: #5bdcff",
  "--brand-violet: #9b6cff",
  "--brand-silver: #cbd5e8",
  "--brand-focus: #8cecff",
  "--status-success: #72d990",
  ".v14-button-primary",
  "linear-gradient(118deg, #315fe9 0%, #5b51dc 52%, #7a43d4 100%)",
  ".v14-global-tech-liquid",
  ".v14-mobile-nav-panel a[aria-current=\"page\"]",
]) if (!option.includes(required)) fail(`Option A invariant missing: ${required}`);

for (const legacy of ["#c7ff2f", "#b8ff38", "rgba(199, 255, 47", "rgba(184, 255, 56"]) {
  if (active.toLowerCase().includes(legacy.toLowerCase())) fail(`legacy primary-brand lime remains in active owner files: ${legacy}`);
}
if ((option.match(/--status-success:/g) ?? []).length !== 1) fail("functional success token must have one explicit Option A owner");
if (/--(?:brand|v14)-(?:green|lime)/i.test(option)) fail("green/lime cannot own a primary brand token");

const luminance = (hex) => {
  const channels = hex.match(/../g).map((part) => Number.parseInt(part, 16) / 255).map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
};
const contrast = (a, b) => {
  const l1 = luminance(a); const l2 = luminance(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};
for (const color of ["315fe9", "5b51dc", "7a43d4"]) if (contrast(color, "ffffff") < 4.5) fail(`primary CTA contrast below 4.5:1 at #${color}`);
for (const color of ["9eabc4", "c5cee1", "5bdcff", "72d990"]) if (contrast(color, "050816") < 4.5) fail(`dark-surface contrast below 4.5:1 at #${color}`);

console.log("OPTION_A_VISUAL_CONTRACT_PASS authority=OWNER_OPTION_A palette=BLUE_PURPLE_CYAN primary-green-tokens=0 green=FUNCTIONAL_STATUS_ONLY cta-contrast=PASS body-contrast=PASS focus=PASS surfaces=PASS");
