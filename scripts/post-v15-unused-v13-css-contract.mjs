import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { basename, join } from "node:path";

const target = "app/v13-visual-authority.css";
const targetName = basename(target);
const retiredRenderClasses = [
  "premium-stage-v9",
  "hero-product-scene-v13",
  "hero-plane-v9",
  "hero-orb-v9",
  "hero-browser-v13",
  "hero-browser-toolbar-v13",
  "hero-browser-body-v13",
  "hero-browser-copy-v13",
  "hero-browser-art-v13",
  "hero-browser-orbit-v13",
  "hero-browser-core-v13",
  "hero-browser-line-v13",
  "hero-browser-signals-v13",
  "hero-mobile-v13",
  "hero-mobile-speaker-v13",
  "hero-core-v13",
];
const collisionDiagnosticClasses = ["realistic-board-photo", "line-a", "line-b"];

const fail = (message) => {
  console.error(`POST_V15_RETIRED_V13_CSS_FAIL: ${message}`);
  process.exit(1);
};

if (existsSync(target)) fail(`retired stylesheet unexpectedly exists: ${target}`);
if (!existsSync("out")) fail("static out/ artifact missing; run build first");

const walkFiles = (root, accept) => {
  const files = [];
  if (!existsSync(root)) return files;
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

const runtimeRoots = ["app", "components", "lib", "hooks"];
const runtimeExtensions = new Set([".css", ".js", ".jsx", ".ts", ".tsx"]);
const extensionOf = (path) => path.match(/(\.[^./]+)$/)?.[1] ?? "";
const runtimeFiles = runtimeRoots.flatMap((root) =>
  walkFiles(root, (path) => runtimeExtensions.has(extensionOf(path))),
);

const fileReferenceHits = [];
for (const path of runtimeFiles) {
  const text = readFileSync(path, "utf8");
  if (text.includes(targetName) || text.includes(target)) fileReferenceHits.push(path);
}
if (fileReferenceHits.length > 0) fail(`retired stylesheet reference found: ${fileReferenceHits.join(";")}`);

const htmlFiles = walkFiles("out", (path) => path.endsWith(".html"));
const renderedRetiredHits = [];
for (const path of htmlFiles) {
  const html = readFileSync(path, "utf8");
  const classTokens = new Set();
  for (const match of html.matchAll(/\bclass=["']([^"']+)["']/g)) {
    for (const token of match[1].split(/\s+/)) if (token) classTokens.add(token);
  }
  const hits = retiredRenderClasses.filter((name) => classTokens.has(name));
  if (hits.length > 0) renderedRetiredHits.push(`${path}:${hits.join(",")}`);
}
if (renderedRetiredHits.length > 0) fail(`retired V13 render classes found: ${renderedRetiredHits.join(";")}`);

const bridgePath = "out/v14-legacy-routes.css";
if (!existsSync(bridgePath)) fail("legacy bridge artifact missing");
const bridge = readFileSync(bridgePath, "utf8");
if (bridge.includes(targetName) || bridge.includes(target)) fail("retired stylesheet unexpectedly included by legacy bridge");

const emittedCssFiles = walkFiles("out", (path) => path.endsWith(".css"));
const collisionHits = [];
for (const path of emittedCssFiles) {
  const css = readFileSync(path, "utf8");
  const hits = collisionDiagnosticClasses.filter((name) => css.includes(`.${name}`));
  if (hits.length > 0) collisionHits.push(`${path}:${hits.join(",")}`);
}

console.log(
  [
    "POST_V15_RETIRED_V13_CSS_PASS",
    `target=${target}`,
    "target-file=ABSENT",
    `runtime-files=${runtimeFiles.length}`,
    "file-references=0",
    `rendered-html=${htmlFiles.length}`,
    `retired-render-classes=${retiredRenderClasses.length}`,
    "rendered-retired-references=0",
    "bridge-reference=0",
    `collision-diagnostic-files=${collisionHits.length}`,
    "verdict=RETIRED_CSS_ABSENT_NO_LOAD_REFERENCE",
  ].join(" "),
);

if (collisionHits.length > 0) {
  console.log(`POST_V15_RETIRED_V13_CSS_COLLISION_DIAGNOSTIC ${collisionHits.join(";")}`);
}
