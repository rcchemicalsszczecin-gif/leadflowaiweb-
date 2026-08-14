import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const fail = (message) => {
  console.error(`POST_V15_CSS_DESTACK_INVENTORY_FAIL: ${message}`);
  process.exit(1);
};

if (!existsSync("out")) fail("static out/ artifact missing; run build first");

const bridgeSources = [
  "app/services.css",
  "app/precision-water.css",
  "app/circuit-water-v3.css",
  "app/hardware-board-v4.css",
  "app/realistic-board-v5.css",
  "app/content-frames-v6.css",
];

const zeroDeadRequired = new Set([
  "app/services.css",
  "app/hardware-board-v4.css",
  "app/realistic-board-v5.css",
  "app/content-frames-v6.css",
]);
const runtimeRoots = ["app", "components", "lib", "hooks"].filter((path) => existsSync(path));
const runtimeExtensions = new Set([".js", ".jsx", ".ts", ".tsx"]);

const extensionOf = (path) => {
  const match = path.match(/(\.[^./]+)$/);
  return match ? match[1] : "";
};

const walkFiles = (root, accept) => {
  const files = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name);
      const stat = statSync(path);
      if (stat.isDirectory()) walk(path);
      else if (accept(path)) files.push(path);
    }
  };
  walk(root);
  return files;
};

const htmlFiles = walkFiles("out", (path) => path.endsWith(".html"));
const renderedClasses = new Set();
for (const path of htmlFiles) {
  const html = readFileSync(path, "utf8");
  for (const match of html.matchAll(/\bclass=["']([^"']+)["']/g)) {
    for (const token of match[1].split(/\s+/)) {
      if (token) renderedClasses.add(token);
    }
  }
}

const runtimeFiles = runtimeRoots.flatMap((root) =>
  walkFiles(root, (path) => runtimeExtensions.has(extensionOf(path)) && !path.endsWith(".d.ts")),
);
const runtimeText = runtimeFiles.map((path) => readFileSync(path, "utf8")).join("\n");

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const runtimeMentionsClass = (name) => {
  const pattern = new RegExp(`(^|[^A-Za-z0-9_-])${escapeRegExp(name)}(?=$|[^A-Za-z0-9_-])`);
  return pattern.test(runtimeText);
};

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
    [/(^|[,{]\s*)\*\s*(?:[,>{:#.[]|\{)/m, "universal"],
    [/(^|[,{]\s*)main\b/m, "main"],
    [/(^|[,{]\s*)section\b/m, "section"],
  ];
  for (const [pattern, label] of checks) if (pattern.test(css)) signals.push(label);
  return signals;
};

for (const path of bridgeSources) if (!existsSync(path)) fail(`missing bridge source ${path}`);
if (!existsSync("out/v14-legacy-routes.css")) fail("generated legacy bridge missing from static artifact");

const generatedBridge = readFileSync("out/v14-legacy-routes.css", "utf8");
for (const path of bridgeSources) {
  if (!generatedBridge.includes(`/* SOURCE: ${path} */`)) fail(`generated bridge missing source marker ${path}`);
}

const homepage = readFileSync("out/index.html", "utf8");
if (homepage.includes("/v14-legacy-routes.css")) fail("homepage must remain legacy-bridge free");

const representativeInner = "out/strony-internetowe/index.html";
if (!existsSync(representativeInner)) fail(`representative inner route missing: ${representativeInner}`);
if (!readFileSync(representativeInner, "utf8").includes("/v14-legacy-routes.css")) {
  fail("representative inner route no longer loads legacy bridge; inventory assumptions changed");
}

let declaredTotal = 0;
let renderedOverlapTotal = 0;
let runtimeReferenceTotal = 0;
let conservativeDeadTotal = 0;
let globalSourceCount = 0;
let sourceBytesTotal = 0;

for (const path of bridgeSources) {
  const css = readFileSync(path, "utf8");
  const bytes = Buffer.byteLength(css);
  const declared = [...extractClasses(css)].sort();
  const rendered = declared.filter((name) => renderedClasses.has(name));
  const runtimeReferenced = declared.filter((name) => runtimeMentionsClass(name));
  const conservativeDead = declared.filter(
    (name) => !renderedClasses.has(name) && !runtimeMentionsClass(name),
  );
  const globals = extractGlobalSignals(css);

  if (zeroDeadRequired.has(path) && conservativeDead.length > 0) {
    fail(`${path} must remain zero-dead after its cleanup gate; found ${conservativeDead.join(",")}`);
  }

  declaredTotal += declared.length;
  renderedOverlapTotal += rendered.length;
  runtimeReferenceTotal += runtimeReferenced.length;
  conservativeDeadTotal += conservativeDead.length;
  sourceBytesTotal += bytes;
  if (globals.length > 0) globalSourceCount += 1;

  console.log(
    [
      "POST_V15_CSS_DESTACK_SOURCE",
      `path=${path}`,
      `bytes=${bytes}`,
      `declared=${declared.length}`,
      `rendered=${rendered.length}`,
      `runtime-referenced=${runtimeReferenced.length}`,
      `conservative-dead=${conservativeDead.length}`,
      `globals=${globals.join("+") || "NONE"}`,
      `dead-preview=${conservativeDead.slice(0, 32).join(",") || "NONE"}`,
    ].join(" "),
  );
}

console.log(
  [
    "POST_V15_CSS_DESTACK_INVENTORY_PASS",
    `sources=${bridgeSources.length}`,
    `html=${htmlFiles.length}`,
    `runtime-files=${runtimeFiles.length}`,
    `rendered-classes=${renderedClasses.size}`,
    `source-bytes=${sourceBytesTotal}`,
    `bridge-bytes=${Buffer.byteLength(generatedBridge)}`,
    `declared=${declaredTotal}`,
    `rendered-overlap=${renderedOverlapTotal}`,
    `runtime-references=${runtimeReferenceTotal}`,
    `conservative-dead=${conservativeDeadTotal}`,
    `global-sources=${globalSourceCount}`,
    "homepage-bridge=ABSENT",
    "inner-route-bridge=ACTIVE",
    "mode=REPORT_ONLY_NO_AUTODELETE",
  ].join(" "),
);
