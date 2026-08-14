import { readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`V15_MONITORING_FAIL: ${message}`);
  process.exit(1);
};

const schemaPath = "docs/quality/V15-19-SEARCH-MONITORING-SCHEMA.json";
const logPath = "docs/quality/V15-19-SEARCH-CHANGE-LOG.md";
const schema = JSON.parse(readFileSync(schemaPath, "utf8"));
const log = readFileSync(logPath, "utf8");

if (schema.schemaVersion !== "V15.19-1") fail(`unexpected schema version: ${schema.schemaVersion}`);
if (schema.status !== "SCHEMA_READY_EXTERNAL_METRICS_UNMEASURED") fail(`unexpected status: ${schema.status}`);
if (schema.property !== "https://leadflowai.pl") fail(`property drift: ${schema.property}`);
if (schema.currentMetrics !== null) fail("currentMetrics must remain null until real measurement data is admitted");

const template = schema.snapshotTemplate;
if (!template || typeof template !== "object") fail("snapshotTemplate missing");

const requiredNullPaths = [
  ["captureDate"],
  ["sourcePlatform"],
  ["releaseSha"],
  ["canonicalUrl"],
  ["query"],
  ["metrics", "impressions"],
  ["metrics", "clicks"],
  ["metrics", "ctr"],
  ["metrics", "averagePosition"],
  ["indexation", "status"],
  ["fieldCoreWebVitals", "lcp"],
  ["fieldCoreWebVitals", "inp"],
  ["fieldCoreWebVitals", "cls"],
  ["generativeAI", "visibilityMetric"],
  ["conversion", "qualifiedContactCount"],
  ["conversion", "conversionRate"],
  ["evidenceClass"],
];

for (const path of requiredNullPaths) {
  let value = template;
  for (const key of path) value = value?.[key];
  if (value !== null) fail(`template field must remain null: ${path.join(".")}`);
}

if (!String(schema.zeroValueRule ?? "").includes("Unknown values remain null")) fail("unknown-vs-zero rule missing");

const requiredLogMarkers = [
  "STATUS: MONITORING_MODEL_READY_EXTERNAL_METRICS_UNMEASURED",
  "`V15_19_MONITORING_MODEL=READY`",
  "`CURRENT_EXTERNAL_METRICS=UNMEASURED`",
  "`UNKNOWN_IS_NOT_ZERO=ENFORCED_BY_SCHEMA`",
  "`SEARCH_CHANGE_LOG=ACTIVE`",
];
for (const marker of requiredLogMarkers) if (!log.includes(marker)) fail(`change-log marker missing: ${marker}`);

console.log(
  "V15_MONITORING_PASS schema=READY current-metrics=NULL unknown-is-not-zero=PASS external-search=UNMEASURED field-cwv=UNMEASURED conversion=NOT_AUTHORIZED change-log=ACTIVE",
);
