import { existsSync, readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`OPERATIONS_CONTRACT_FAIL: ${message}`);
  process.exit(1);
};

const read = (path) => {
  if (!existsSync(path)) fail(`missing ${path}`);
  return readFileSync(path, "utf8");
};

const nextConfig = read("next.config.ts");
const currentState = read("docs/governance/CURRENT-STATE.md");
const runbook = read("docs/operations/RUNBOOK.md");
const monitoring = read("docs/operations/MONITORING.md");
const recovery = read("docs/operations/BACKUP-RECOVERY.md");
const readiness = read("docs/operations/DEPLOYMENT-READINESS.md");
const frontend = read("docs/architecture/FRONTEND-DEPLOYMENT.md");
const apiBoundary = read("docs/architecture/LOCAL-API-BOUNDARY.md");

if (!nextConfig.includes('output: "export"') || !nextConfig.includes("trailingSlash: true")) fail("static frontend output contract incomplete");
if (nextConfig.includes("async headers") || nextConfig.includes("Strict-Transport-Security") || nextConfig.includes("Content-Security-Policy")) fail("server/edge headers incorrectly owned by static Next frontend");

for (const phrase of [
  "10627e2f18ccfc7ef86c76a695dab9cf7933cce9",
  "Production V13",
  "V14",
  "GitHub Pages",
]) {
  if (!currentState.includes(phrase) && !readiness.includes(phrase) && !runbook.includes(phrase)) {
    fail(`current production/V14 state missing ${phrase}`);
  }
}

if (!readiness.includes("PRODUCTION V13 LIVE") || !readiness.includes("NOT AUTHORIZED FOR PRODUCTION MERGE")) {
  fail("deployment readiness must distinguish live V13 from unmerged V14");
}

if (!runbook.includes("PRODUCTION V13 OPERATING BASELINE") || !runbook.includes("V14 merge/deployment: NOT AUTHORIZED")) {
  fail("runbook does not describe current V13/V14 release boundary");
}

if (!apiBoundary.includes("POST /leads") || !apiBoundary.includes("POST /chat") || !apiBoundary.includes("GET /health") || !apiBoundary.includes("Cloudflare Tunnel")) {
  fail("future local API boundary incomplete");
}
if (!apiBoundary.includes("https://leadflowai.pl") || !apiBoundary.includes("CORS")) fail("future local API origin contract incomplete");

if (!monitoring.includes("Core Web Vitals") || !monitoring.includes("V14 mobile navigation") || !monitoring.includes("21 knowledge articles")) {
  fail("monitoring baseline incomplete for current V14 release requirements");
}

if (!recovery.includes("last known-good") || !recovery.includes("Secrets") || !recovery.includes("10627e2f18ccfc7ef86c76a695dab9cf7933cce9")) {
  fail("recovery domains/current production recovery point incomplete");
}

if (!frontend.includes("GitHub Pages") || !frontend.includes('output: "export"') || !frontend.includes("api.leadflowai.pl")) {
  fail("static frontend architecture incomplete");
}

console.log("OPERATIONS_CONTRACT_PASS production-v13=LIVE v14=NOT_MERGE_AUTHORIZED static-frontend=PASS future-api-boundary=PASS monitoring=PASS recovery=PASS");
