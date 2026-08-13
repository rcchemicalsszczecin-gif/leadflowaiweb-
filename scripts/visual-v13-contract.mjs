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

if (!home.includes("Wyceń projekt") || !home.includes("Zobacz realizacje")) fail("buyer-first homepage CTA missing");
if (!hero.includes("hero-browser-v13") || !hero.includes("hero-mobile-v13")) fail("V13 product showcase missing");

console.log("VISUAL_V13_PASS seed=PASS");
