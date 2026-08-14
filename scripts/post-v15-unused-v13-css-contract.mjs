import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { basename, join } from "node:path";

const target = "app/v13-visual-authority.css";
const fail = (message) => {
  console.error(`POST_V15_UNUSED_V13_CSS_FAIL: ${message}`);
  process.exit(1);
};

if (!existsSync(target)) fail(`target missing before proof: ${target}`);
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

const targetCss = readFileSync(target, "utf8");
const targetClasses = [...new Set(
  [...targetCss.matchAll(/\.([_a-zA-Z]+[_a-zA-Z0-9-]*)/g)].map((match) => match[1]),
)].sort();
if (targetClasses.length === 0) fail("target has no classes; proof assumptions changed");

const runtimeRoots = ["app", "components", "lib", "hooks"];
const runtimeExtensions = new Set([".css", ".js", ".jsx", ".ts", ".tsx"]);
const extensionOf = (path) => path.match(/(\.[^./]+)$/)?.[1] ?? "";
const runtimeFiles = runtimeRoots.flatMap((root) =>
  walkFiles(root, (path) => path !== target && runtimeExtensions.has(extensionOf(path))),
);

const targetName = basename(target);
const fileReferenceHits = [];
const runtimeClassHits = [];
const classBoundary = (name) => new RegExp(`(^|[^A-Za-z0-9_-])${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?=$|[^A-Za-z0-9_-])`);

for (const path of runtimeFiles) {
  const text = readFileSync(path, "utf8");
  if (text.includes(targetName) || text.includes(target)) fileReferenceHits.push(path);
  if (!/[.][jt]sx?$/.test(path)) continue;
  const hits = targetClasses.filter((name) => classBoundary(name).test(text));
  if (hits.length > 0) runtimeClassHits.push(`${path}:${hits.join(",")}`);
}

if (fileReferenceHits.length > 0) fail(`runtime stylesheet reference found: ${fileReferenceHits.join(";")}`);
if (runtimeClassHits.length > 0) fail(`runtime class reference found: ${runtimeClassHits.join(";")}`);

const htmlFiles = walkFiles("out", (path) => path.endsWith(".html"));
const renderedClassHits = [];
for (const path of htmlFiles) {
  const html = readFileSync(path, "utf8");
  const classTokens = new Set();
  for (const match of html.matchAll(/\bclass=["']([^"']+)["']/g)) {
    for (const token of match[1].split(/\s+/)) if (token) classTokens.add(token);
  }
  const hits = targetClasses.filter((name) => classTokens.has(name));
  if (hits.length > 0) renderedClassHits.push(`${path}:${hits.join(",")}`);
}
if (renderedClassHits.length > 0) fail(`rendered target classes found: ${renderedClassHits.join(";")}`);

const emittedCssFiles = walkFiles("out", (path) => path.endsWith(".css"));
const emittedSelectorHits = [];
for (const path of emittedCssFiles) {
  const css = readFileSync(path, "utf8");
  const hits = targetClasses.filter((name) => css.includes(`.${name}`));
  if (hits.length > 0) emittedSelectorHits.push(`${path}:${hits.join(",")}`);
}
if (emittedSelectorHits.length > 0) fail(`target selectors emitted in static CSS: ${emittedSelectorHits.join(";")}`);

const bridgePath = "out/v14-legacy-routes.css";
if (!existsSync(bridgePath)) fail("legacy bridge artifact missing");
const bridge = readFileSync(bridgePath, "utf8");
if (bridge.includes(targetName) || bridge.includes(target)) fail("target unexpectedly included by legacy bridge");

console.log(
  [
    "POST_V15_UNUSED_V13_CSS_PASS",
    `target=${target}`,
    `classes=${targetClasses.length}`,
    `runtime-files=${runtimeFiles.length}`,
    "file-references=0",
    "runtime-class-references=0",
    `rendered-html=${htmlFiles.length}`,
    "rendered-class-references=0",
    `emitted-css=${emittedCssFiles.length}`,
    "emitted-selector-references=0",
    "bridge-reference=0",
    "verdict=SAFE_DELETE_CANDIDATE_NOT_YET_DELETED",
  ].join(" "),
);
