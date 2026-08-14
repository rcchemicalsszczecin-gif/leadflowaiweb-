import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, normalize, relative, resolve, sep } from "node:path";

const fail = (message) => {
  console.error(`POST_V15_COMPONENT_REACHABILITY_FAIL: ${message}`);
  process.exit(1);
};

const root = process.cwd();
const sourceRoots = ["app", "components", "lib", "hooks"].filter((path) => existsSync(path));
const sourceExtensions = [".ts", ".tsx", ".js", ".jsx"];
const ignoredLocalAssetPattern = /\.(?:css|scss|sass|less|json|svg|png|jpe?g|webp|avif|gif|ico|woff2?|ttf|otf)$/i;
const frameworkEntryNames = new Set([
  "page.ts",
  "page.tsx",
  "layout.ts",
  "layout.tsx",
  "template.ts",
  "template.tsx",
  "loading.ts",
  "loading.tsx",
  "error.ts",
  "error.tsx",
  "global-error.ts",
  "global-error.tsx",
  "not-found.ts",
  "not-found.tsx",
  "default.ts",
  "default.tsx",
  "route.ts",
  "route.tsx",
  "sitemap.ts",
  "sitemap.tsx",
  "robots.ts",
  "robots.tsx",
  "manifest.ts",
  "manifest.tsx",
  "icon.ts",
  "icon.tsx",
  "opengraph-image.ts",
  "opengraph-image.tsx",
  "twitter-image.ts",
  "twitter-image.tsx",
]);

const retiredCandidates = [
  "components/premium-art-direction-v9.tsx",
  "components/premium-composition-v8.tsx",
  "components/premium-v9-2-enhancements.tsx",
  "components/premium-v9-interactions.tsx",
  "components/premium-v9-journey.tsx",
  "components/premium-v9-story.tsx",
  "components/water-surface.tsx",
];
const retiredKnownBytes = 52147;

const protectedDormant = [
  "components/contact-brief-builder-v13.tsx",
  "components/site-assistant.tsx",
];

const cleanupCandidates = [
  "components/section-label.tsx",
  "components/site-footer.tsx",
  "components/site-header.tsx",
  "components/system-flow.tsx",
  "components/v14-product-stage.tsx",
];

for (const path of retiredCandidates) {
  if (existsSync(path)) fail(`retired unreachable component unexpectedly exists: ${path}`);
}
for (const path of [...protectedDormant, ...cleanupCandidates]) {
  if (!existsSync(path)) fail(`classified remaining component unexpectedly missing: ${path}`);
}

const toRepoPath = (absolutePath) => relative(root, absolutePath).split(sep).join("/");
const walkFiles = (start) => {
  const files = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name);
      const stat = statSync(path);
      if (stat.isDirectory()) walk(path);
      else if (sourceExtensions.some((extension) => path.endsWith(extension)) && !path.endsWith(".d.ts")) {
        files.push(resolve(path));
      }
    }
  };
  walk(start);
  return files;
};

const sourceFiles = [...new Set(sourceRoots.flatMap((path) => walkFiles(path)))].sort();
const sourceSet = new Set(sourceFiles);
if (sourceFiles.length === 0) fail("no source files found");

const importPatterns = [
  /\bimport\s+(?:type\s+)?(?:[^"']*?\sfrom\s*)?["']([^"']+)["']/g,
  /\bexport\s+(?:type\s+)?(?:\*|\{[^}]*\})\s+from\s+["']([^"']+)["']/g,
  /\bimport\s*\(\s*["']([^"']+)["']\s*\)/g,
  /\brequire\s*\(\s*["']([^"']+)["']\s*\)/g,
];

const extractSpecifiers = (text) => {
  const specifiers = new Set();
  for (const pattern of importPatterns) {
    pattern.lastIndex = 0;
    for (const match of text.matchAll(pattern)) specifiers.add(match[1]);
  }
  return [...specifiers];
};

const resolveLocalSpecifier = (fromFile, specifier) => {
  let base;
  if (specifier.startsWith("@/")) base = resolve(root, specifier.slice(2));
  else if (specifier.startsWith(".")) base = resolve(dirname(fromFile), specifier);
  else return null;

  const attempts = [base];
  for (const extension of sourceExtensions) attempts.push(`${base}${extension}`);
  for (const extension of sourceExtensions) attempts.push(join(base, `index${extension}`));

  for (const attempt of attempts) {
    const normalized = normalize(attempt);
    if (sourceSet.has(normalized)) return normalized;
  }
  return null;
};

const edges = new Map(sourceFiles.map((file) => [file, new Set()]));
const unresolvedLocal = [];
let ignoredLocalAssets = 0;
for (const file of sourceFiles) {
  const text = readFileSync(file, "utf8");
  for (const specifier of extractSpecifiers(text)) {
    if (!specifier.startsWith("@/") && !specifier.startsWith(".")) continue;
    if (ignoredLocalAssetPattern.test(specifier)) {
      ignoredLocalAssets += 1;
      continue;
    }
    const resolved = resolveLocalSpecifier(file, specifier);
    if (resolved) edges.get(file).add(resolved);
    else unresolvedLocal.push(`${toRepoPath(file)}:${specifier}`);
  }
}

if (unresolvedLocal.length > 0) {
  fail(`unresolved local code import/export specifiers: ${unresolvedLocal.slice(0, 30).join(";")}`);
}

const incoming = new Map(sourceFiles.map((file) => [file, new Set()]));
for (const [from, targets] of edges) {
  for (const target of targets) incoming.get(target).add(from);
}

const appFiles = sourceFiles.filter((file) => toRepoPath(file).startsWith("app/"));
const entries = appFiles.filter((file) => frameworkEntryNames.has(toRepoPath(file).split("/").at(-1)));
if (entries.length === 0) fail("no Next app entrypoints found");

const reachable = new Set();
const queue = [...entries];
while (queue.length > 0) {
  const file = queue.shift();
  if (reachable.has(file)) continue;
  reachable.add(file);
  for (const target of edges.get(file) ?? []) {
    if (!reachable.has(target)) queue.push(target);
  }
}

const reportClassified = (path, classification) => {
  const file = resolve(path);
  const refs = [...(incoming.get(file) ?? [])].sort();
  const reachableRefs = refs.filter((ref) => reachable.has(ref));
  const dependencies = [...(edges.get(file) ?? [])].sort();
  const bytes = statSync(file).size;
  const isReachable = reachable.has(file);

  if (classification === "CLEANUP_CANDIDATE" && (isReachable || reachableRefs.length > 0)) {
    fail(`${path} is not a safe cleanup candidate: reachable=${isReachable} incoming-reachable=${reachableRefs.length}`);
  }

  console.log(
    [
      "POST_V15_COMPONENT_CLASSIFICATION",
      `path=${path}`,
      `classification=${classification}`,
      `bytes=${bytes}`,
      `reachable=${isReachable ? "YES" : "NO"}`,
      `incoming=${refs.length}`,
      `incoming-reachable=${reachableRefs.length}`,
      `dependencies=${dependencies.map(toRepoPath).join(",") || "NONE"}`,
      `incoming-preview=${refs.slice(0, 12).map(toRepoPath).join(",") || "NONE"}`,
    ].join(" "),
  );

  return { bytes, isReachable, incoming: refs.length, incomingReachable: reachableRefs.length };
};

const dormantReports = protectedDormant.map((path) => reportClassified(path, "PROTECTED_DORMANT"));
const cleanupReports = cleanupCandidates.map((path) => reportClassified(path, "CLEANUP_CANDIDATE"));

const unreachableSource = sourceFiles.filter((file) => !reachable.has(file));
const unreachableComponents = unreachableSource.filter((file) => toRepoPath(file).startsWith("components/"));
const unreachableComponentBytes = unreachableComponents.reduce((sum, file) => sum + statSync(file).size, 0);
const edgeCount = [...edges.values()].reduce((sum, targets) => sum + targets.size, 0);
const cleanupBytes = cleanupReports.reduce((sum, report) => sum + report.bytes, 0);
const dormantBytes = dormantReports.reduce((sum, report) => sum + report.bytes, 0);

console.log(
  [
    "POST_V15_COMPONENT_REACHABILITY_PASS",
    `sources=${sourceFiles.length}`,
    `entries=${entries.length}`,
    `edges=${edgeCount}`,
    `ignored-local-assets=${ignoredLocalAssets}`,
    "unresolved-local-code=0",
    `reachable=${reachable.size}`,
    `unreachable=${unreachableSource.length}`,
    `unreachable-components=${unreachableComponents.length}`,
    `unreachable-component-bytes=${unreachableComponentBytes}`,
    `retired-candidates=${retiredCandidates.length}`,
    `retired-known-bytes=${retiredKnownBytes}`,
    "retired-files=ABSENT",
    "retired-imports=ABSENT",
    `protected-dormant=${protectedDormant.length}`,
    `protected-dormant-bytes=${dormantBytes}`,
    `cleanup-candidates=${cleanupCandidates.length}`,
    `cleanup-candidate-bytes=${cleanupBytes}`,
    "cleanup-candidates-reachable=0",
    "cleanup-candidates-incoming-reachable=0",
    "mode=CLASSIFIED_REPORT_ONLY_NO_DELETE",
  ].join(" "),
);

console.log(
  `POST_V15_COMPONENT_REACHABILITY_UNREACHABLE_COMPONENT_PREVIEW ${unreachableComponents
    .slice(0, 40)
    .map(toRepoPath)
    .join(",") || "NONE"}`,
);
