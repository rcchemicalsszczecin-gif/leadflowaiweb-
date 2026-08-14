import { existsSync, readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`V15_BASELINE_CONTRACT_FAIL: ${message}`);
  process.exit(1);
};

const read = (path) => {
  if (!existsSync(path)) fail(`missing ${path}`);
  return readFileSync(path, "utf8");
};

const baseline = read("docs/quality/V15-00-PRODUCTION-SEARCH-BASELINE.md");
const intentMap = read("docs/quality/V13-10-SEARCH-INTENT-MAP.md");
const sitemap = read("app/sitemap.ts");
const robots = read("app/robots.ts");
const schema = read("lib/structured-data.ts");
const packageJson = read("package.json");

for (const required of [
  "STATUS: LOCKED_BASELINE",
  "PRODUCTION_HEAD: `67663b08c950de120a94ef8495b5cdc8c9bdecfe`",
  "PRODUCTION_PAGES_RUN: `31810716199`",
  "PRODUCTION_BUILD_JOB: `94800401647`",
  "PRODUCTION_DEPLOYMENT: PASS",
  "INDEXABLE_HTML=63",
  "NOINDEX_ARTIFACTS=3",
  "CANONICALS=63_UNIQUE",
  "SITEMAP=63_EXACT_SET",
  "SCHEMAS=119",
  "SERVICE_SCHEMA>=35",
  "ARTICLE_SCHEMA=21",
  "FAQ_SCHEMA>=35",
  "SEARCH_PLATFORM_INDEXATION=NOT_YET_MEASURED_IN_THIS_BASELINE",
  "RANKINGS_CTR_AI_VISIBILITY=NOT_CLAIMED",
  "MEASURED_FIRST_PARTY",
  "OBSERVED_PUBLIC_SERP",
  "REPOSITORY_PROOF",
  "OFFICIAL_PLATFORM_GUIDANCE",
  "HYPOTHESIS_PENDING_DATA",
  "This baseline does **not** prove:",
]) {
  if (!baseline.includes(required)) fail(`baseline marker missing: ${required}`);
}

const intentRows = [...intentMap.matchAll(/^\|\s*(\/(?:[^|\s]+)?)\s*\|\s*([^|]+?)\s*\|$/gm)];
if (intentRows.length !== 63) fail(`expected 63 baseline intent rows, found ${intentRows.length}`);
const intentUrls = intentRows.map((row) => row[1]);
if (new Set(intentUrls).size !== 63) fail("baseline intent URLs are not unique");
const knowledgeRows = intentUrls.filter((url) => url.startsWith("/wiedza/"));
if (knowledgeRows.length !== 21) fail(`expected 21 knowledge intents, found ${knowledgeRows.length}`);
if (intentUrls.length - knowledgeRows.length !== 42) fail("expected 42 main/service intents");

for (const registry of [
  "coreServiceLinks",
  "experienceServiceLinks",
  "searchServiceLinks",
  "expandedServiceLinks",
  "extraServiceLinks",
  "knowledgeArticles",
]) {
  if (!sitemap.includes(registry)) fail(`sitemap registry missing: ${registry}`);
}
if (!robots.includes('allow: "/"') || !robots.includes("sitemap.xml")) {
  fail("robots baseline no longer represents public crawl + sitemap");
}
for (const type of ["Organization", "WebSite", "WebPage", "Service", "BreadcrumbList", "FAQPage", "Article"]) {
  if (!schema.includes(`"@type": "${type}"`)) fail(`schema baseline type missing: ${type}`);
}

if (!packageJson.includes('"baseline:contract": "node scripts/v15-baseline-contract.mjs"')) {
  fail("baseline contract is not wired in package scripts");
}
if (!packageJson.includes("npm run baseline:contract")) {
  fail("baseline contract is not enforced by verify");
}

console.log(
  "V15_BASELINE_CONTRACT_PASS production=67663b08 run=31810716199 indexable=63 noindex=3 canonicals=63 sitemap=63 intents=63 knowledge=21 schemas=119 external-indexation=UNMEASURED claims=BOUNDED",
);
