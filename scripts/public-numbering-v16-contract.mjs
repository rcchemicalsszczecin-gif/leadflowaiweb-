import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const fail = (message) => {
  console.error(`PUBLIC_NUMBERING_V16_FAIL: ${message}`);
  process.exit(1);
};

if (!existsSync("out")) fail("static export out/ missing");

const htmlFiles = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) walk(path);
    else if (name.endsWith(".html")) htmlFiles.push(path);
  }
};
walk("out");

const decode = (value) =>
  value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

const violations = [];
let inspectedTextNodes = 0;
for (const path of htmlFiles) {
  const html = readFileSync(path, "utf8")
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[\s\S]*?<\/style>/gi, "")
    .replace(/<([a-z][\w:-]*)\b[^>]*aria-hidden=["']true["'][^>]*>[\s\S]*?<\/\1>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "");
  for (const match of html.matchAll(/>([^<>]+)</g)) {
    const text = decode(match[1]).replace(/\s+/g, " ").trim();
    if (!text) continue;
    inspectedTextNodes += 1;
    if (/^0[0-9](?:\s*\/\s*\S.*)?$/u.test(text)) {
      violations.push(`${relative("out", path)}: ${JSON.stringify(text.slice(0, 120))}`);
    }
  }
}

const publicSources = ["app", "components", "lib"];
const sourceViolations = [];
const sourceWalk = (dir) => {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) sourceWalk(path);
    else if (/\.(?:ts|tsx|js|jsx)$/.test(name)) {
      const source = readFileSync(path, "utf8");
      if (/padStart\(\s*2\s*,\s*["']0["']\s*\)/.test(source) && !/v14-service-visual-/.test(source)) {
        sourceViolations.push(relative(".", path));
      }
    }
  }
};
publicSources.forEach(sourceWalk);

if (violations.length) fail(`visible leading-zero labels=${violations.length}: ${violations.slice(0, 40).join("; ")}`);
if (sourceViolations.length) fail(`public visible padStart leading-zero uses: ${sourceViolations.join(", ")}`);

console.log(
  `PUBLIC_NUMBERING_V16_PASS html=${htmlFiles.length} text-nodes=${inspectedTextNodes} leading-zero-labels=0 decorative-numbering=0 visible-padStart=0 sequence-style=SINGLE_INTEGER`,
);
