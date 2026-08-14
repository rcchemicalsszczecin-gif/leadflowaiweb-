import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const fail = (message) => {
  console.error(`CSS_OWNERSHIP_V14_FAIL: ${message}`);
  process.exit(1);
};

if (!existsSync("out")) fail("static out/ artifact missing; run build first");

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

const renderedClasses = new Set();
for (const path of htmlFiles) {
  const html = readFileSync(path, "utf8");
  for (const match of html.matchAll(/\bclass=["']([^"']+)["']/g)) {
    for (const token of match[1].split(/\s+/)) {
      if (token) renderedClasses.add(token);
    }
  }
}

const candidates = [
  "app/precision-water.css",
  "app/circuit-water-v3.css",
  "app/hardware-board-v4.css",
  "app/realistic-board-v5.css",
  "app/content-frames-v6.css",
  "app/v13-visual-authority.css",
];

const extractClasses = (css) => {
  const classes = new Set();
  for (const match of css.matchAll(/\.([_a-zA-Z]+[_a-zA-Z0-9-]*)/g)) classes.add(match[1]);
  return classes;
};

const extractGlobalSignals = (css) => {
  const signals = [];
  const checks = [
    [/(^|[,{]\s*)html\b/m, "html"],
    [/(^|[,{]\s*)body\b/m, "body"],
    [/:root\b/, ":root"],
    [/(^|[,{]\s*)\*\s*(?:[,>{:#.\[]|\{)/m, "universal"],
  ];
  for (const [pattern, label] of checks) if (pattern.test(css)) signals.push(label);
  return signals;
};

let totalOverlap = 0;
for (const path of candidates) {
  if (!existsSync(path)) fail(`missing candidate ${path}`);
  const css = readFileSync(path, "utf8");
  const declared = extractClasses(css);
  const overlap = [...declared].filter((name) => renderedClasses.has(name)).sort();
  const globals = extractGlobalSignals(css);
  totalOverlap += overlap.length;
  const preview = overlap.slice(0, 24).join(",") || "NONE";
  console.log(
    `CSS_OWNERSHIP_V14_FILE path=${path} declaredClasses=${declared.size} renderedOverlap=${overlap.length} globalSignals=${globals.join("+") || "NONE"} overlapPreview=${preview}`,
  );
}

console.log(
  `CSS_OWNERSHIP_V14_PASS html=${htmlFiles.length} renderedClasses=${renderedClasses.size} candidates=${candidates.length} totalOverlap=${totalOverlap} mode=REPORT_ONLY_NO_AUTODELETE`,
);
