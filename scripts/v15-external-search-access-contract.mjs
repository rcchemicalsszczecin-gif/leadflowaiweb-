import { readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`V15_EXTERNAL_SEARCH_ACCESS_FAIL: ${message}`);
  process.exit(1);
};

const path = "docs/quality/V15-02-03-EXTERNAL-SEARCH-ACCESS.md";
const doc = readFileSync(path, "utf8");

const required = [
  "STATUS: BLOCKED_EXTERNAL_ACCESS",
  "PRODUCTION_BASELINE: `67663b08c950de120a94ef8495b5cdc8c9bdecfe`",
  "`V15_2_GSC=BLOCKED_EXTERNAL_ACCESS`",
  "`V15_3_BING=BLOCKED_EXTERNAL_ACCESS`",
  "`FABRICATED_PLATFORM_DATA=FORBIDDEN`",
  "`REPOSITORY_WORK_CONTINUATION=AUTHORIZED_WITH_EVIDENCE_LABELS`",
];

for (const marker of required) {
  if (!doc.includes(marker)) fail(`missing required marker: ${marker}`);
}

const forbiddenClaims = [
  /V15_2_GSC=(?:PASS|COMPLETE|MEASURED)/,
  /V15_3_BING=(?:PASS|COMPLETE|MEASURED)/,
  /GOOGLE_INDEXED_URLS=\d+/,
  /BING_INDEXED_URLS=\d+/,
  /CTR=\d+(?:\.\d+)?%/,
  /AVERAGE_POSITION=\d/,
];

for (const pattern of forbiddenClaims) {
  if (pattern.test(doc)) fail(`forbidden measured-platform claim: ${pattern}`);
}

if (/\b(?:INDEXNOW_KEY|VERIFICATION_TOKEN|CLIENT_SECRET|API_KEY)\s*=/i.test(doc)) {
  fail("secret/token value assignment must not be recorded in the external-access evidence document");
}

console.log(
  "V15_EXTERNAL_SEARCH_ACCESS_PASS gsc=BLOCKED_EXTERNAL_ACCESS bing=BLOCKED_EXTERNAL_ACCESS fabricated-data=FORBIDDEN continuation=REPOSITORY_EVIDENCE_ONLY",
);
