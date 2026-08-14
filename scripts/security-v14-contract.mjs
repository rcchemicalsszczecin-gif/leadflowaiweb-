import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const fail = (message) => {
  console.error(`SECURITY_V14_FAIL: ${message}`);
  process.exit(1);
};

const roots = ["app", "components", "lib"];
const sourceFiles = [];

function walk(root) {
  if (!existsSync(root)) return;
  for (const name of readdirSync(root)) {
    const path = join(root, name);
    const stat = statSync(path);
    if (stat.isDirectory()) walk(path);
    else if (/\.(?:ts|tsx|js|jsx|mjs)$/.test(name)) sourceFiles.push(path);
  }
}

for (const root of roots) walk(root);
if (!sourceFiles.length) fail("no active public source files found");

const forbiddenPrimitives = [
  ["dangerouslySetInnerHTML", "unsafe raw HTML injection"],
  ["eval(", "eval runtime"],
  ["new Function", "dynamic Function constructor"],
  ["document.write", "document.write"],
  ["document.cookie", "browser cookie mutation/read"],
  ["localStorage", "browser localStorage"],
  ["sessionStorage", "browser sessionStorage"],
  ["XMLHttpRequest", "XMLHttpRequest network client"],
  ["fetch(", "unapproved browser/server fetch"],
  ["javascript:", "javascript URL"],
];

const secretPatterns = [
  [/-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/, "private key material"],
  [/\bgh[pousr]_[A-Za-z0-9_]{20,}\b/, "GitHub token-like value"],
  [/\bsk-[A-Za-z0-9_-]{20,}\b/, "secret-key-like value"],
  [/\bAIza[0-9A-Za-z_-]{20,}\b/, "Google API-key-like value"],
];

let externalBlankLinks = 0;
let jsonLdScripts = 0;

for (const path of sourceFiles) {
  const source = readFileSync(path, "utf8");
  const display = relative(process.cwd(), path);

  for (const [literal, label] of forbiddenPrimitives) {
    if (source.includes(literal)) fail(`${display} contains ${label}: ${literal}`);
  }

  for (const [pattern, label] of secretPatterns) {
    if (pattern.test(source)) fail(`${display} contains ${label}`);
  }

  const httpMatches = source.match(/http:\/\/[^\s"'`)>]+/g) ?? [];
  for (const url of httpMatches) {
    if (!/^http:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?(?:\/|$)/.test(url)) {
      fail(`${display} contains insecure external http URL: ${url}`);
    }
  }

  const scriptTags = source.match(/<script\b[\s\S]*?>/gi) ?? [];
  if (scriptTags.length) {
    if (display !== "components/json-ld.tsx") fail(`${display} contains an unapproved script element`);
    for (const tag of scriptTags) {
      if (/\bsrc\s*=/.test(tag)) fail("JSON-LD script must not load external source");
      if (!/type=["']application\/ld\+json["']/.test(tag)) fail("approved script element must be JSON-LD only");
      jsonLdScripts += 1;
    }
  }

  const blankLinks = source.match(/<a\b[\s\S]*?target=["']_blank["'][\s\S]*?>/gi) ?? [];
  for (const tag of blankLinks) {
    externalBlankLinks += 1;
    const rel = tag.match(/\brel=["']([^"']+)["']/i)?.[1] ?? "";
    if (!/(?:^|\s)(?:noreferrer|noopener)(?:\s|$)/.test(rel)) {
      fail(`${display} has target=_blank without noreferrer/noopener`);
    }
  }
}

if (existsSync("app/api")) {
  const apiFiles = [];
  const collectApi = (dir) => {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name);
      const stat = statSync(path);
      if (stat.isDirectory()) collectApi(path);
      else apiFiles.push(path);
    }
  };
  collectApi("app/api");
  if (apiFiles.length) fail(`dynamic app/api runtime exists in static frontend: ${apiFiles.join(", ")}`);
}

const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
const runtimeDependencies = Object.keys(packageJson.dependencies ?? {}).sort();
const approvedRuntimeDependencies = ["next", "react", "react-dom"];
if (JSON.stringify(runtimeDependencies) !== JSON.stringify(approvedRuntimeDependencies)) {
  fail(`runtime dependency boundary changed: ${runtimeDependencies.join(", ")}`);
}

const jsonLd = readFileSync("components/json-ld.tsx", "utf8");
const safeJsonLdSerialization = /JSON\.stringify\(data\)\.replace\(\/<\/g,\s*["']\\\\u003c["']\)/;
if (!safeJsonLdSerialization.test(jsonLd)) {
  fail("JSON-LD serialization lost less-than escaping");
}

const leadContract = readFileSync("scripts/lead-contract.mjs", "utf8");
const chatContract = readFileSync("scripts/chat-contract.mjs", "utf8");
if (!leadContract.includes("delivery=OFF_BY_OWNER") || !chatContract.includes("public-ui=OFF")) {
  fail("Owner-disabled public runtime boundaries are not represented by active contracts");
}

console.log(
  `SECURITY_V14_PASS sources=${sourceFiles.length} raw-html=ABSENT eval=ABSENT storage=ABSENT cookies=ABSENT network-fetch=ABSENT dynamic-api=ABSENT external-scripts=ABSENT jsonld-scripts=${jsonLdScripts} blank-links=${externalBlankLinks}_SAFE secrets=ABSENT runtime-deps=3_APPROVED lead=OFF chat=OFF`,
);
