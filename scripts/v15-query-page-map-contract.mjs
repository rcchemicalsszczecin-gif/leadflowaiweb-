import { readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`V15_QUERY_PAGE_MAP_FAIL: ${message}`);
  process.exit(1);
};

const mapPath = "docs/quality/V15-04-QUERY-PAGE-OWNERSHIP.json";
const sourcePath = "docs/quality/V13-10-SEARCH-INTENT-MAP.md";
const researchPath = "docs/quality/V15-16-SERP-DEMAND-RESEARCH-2026-08-14.md";
const summaryPath = "docs/quality/V15-04-QUERY-PAGE-OWNERSHIP.md";

const map = JSON.parse(readFileSync(mapPath, "utf8"));
const source = readFileSync(sourcePath, "utf8");
const research = readFileSync(researchPath, "utf8");
const summary = readFileSync(summaryPath, "utf8");

if (map.version !== "V15.4-foundation") fail(`unexpected version: ${map.version}`);
if (map.status !== "FIRST_PARTY_METRICS_BLOCKED") fail(`unexpected status: ${map.status}`);
if (map.productionBaseline !== "67663b08c950de120a94ef8495b5cdc8c9bdecfe") {
  fail(`production baseline drift: ${map.productionBaseline}`);
}
if (map.firstPartyMetricsStatus !== "UNMEASURED") fail("first-party metrics must remain UNMEASURED");
if (map.queryOwnershipDecision !== "PRESERVE_PENDING_FIRST_PARTY_DATA") {
  fail(`unexpected ownership decision: ${map.queryOwnershipDecision}`);
}

const sourceUrls = [];
for (const line of source.split("\n")) {
  const match = line.match(/^\|\s*(\/[^|]*)\s*\|\s*([^|]+?)\s*\|$/);
  if (match) sourceUrls.push(match[1].trim());
}
if (sourceUrls.length !== 63) fail(`expected 63 source intent rows, found ${sourceUrls.length}`);

if (!Array.isArray(map.baselineUrls) || map.baselineUrls.length !== 63) {
  fail(`expected 63 baseline URLs, found ${map.baselineUrls?.length ?? "none"}`);
}
const baselineSet = new Set(map.baselineUrls);
if (baselineSet.size !== 63) fail("duplicate baseline URL in V15.4 map");

const sourceSet = new Set(sourceUrls);
const missing = sourceUrls.filter((url) => !baselineSet.has(url));
const extra = map.baselineUrls.filter((url) => !sourceSet.has(url));
if (missing.length) fail(`missing baseline URLs: ${missing.join(", ")}`);
if (extra.length) fail(`unexpected baseline URLs: ${extra.join(", ")}`);

const candidates = map.observedPublicSerpQueryCandidates;
if (!candidates || typeof candidates !== "object" || Array.isArray(candidates)) {
  fail("observedPublicSerpQueryCandidates must be an object");
}

let candidateCount = 0;
for (const [url, queries] of Object.entries(candidates)) {
  if (!baselineSet.has(url)) fail(`candidate query assigned to unknown URL: ${url}`);
  if (!Array.isArray(queries) || !queries.length) fail(`candidate query list empty for ${url}`);
  for (const query of queries) {
    if (typeof query !== "string" || query.trim().length < 3) fail(`invalid query candidate for ${url}`);
    if (!research.includes(query)) fail(`query candidate not traceable to V15.16 research: ${query}`);
    candidateCount += 1;
  }
}

const forbiddenMetricKeys = ["impressions", "clicks", "ctr", "averagePosition", "indexedUrls"];
for (const key of forbiddenMetricKeys) {
  if (Object.prototype.hasOwnProperty.call(map, key)) fail(`first-party metric must not be populated yet: ${key}`);
}

if (!summary.includes("`V15_4_QUERY_PAGE_FOUNDATION=PASS`")) fail("summary PASS marker missing");
if (!summary.includes("`ROWS=63_EXACT`")) fail("summary row-count marker missing");
if (!summary.includes("`FIRST_PARTY_METRICS=BLOCKED_EXTERNAL_ACCESS`")) fail("summary external-access marker missing");

console.log(
  `V15_QUERY_PAGE_MAP_PASS rows=63_EXACT observed-query-candidates=${candidateCount} baseline-intents=INHERITED_EXACT first-party-metrics=UNMEASURED ownership=PRESERVE_PENDING_DATA`,
);
