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

for (const required of [
  "V14 Global Liquid World",
  "36ad3fd6130ce21e68a2c5e701a516fcb3703b65",
  "50b71632c687e032311556371108ce3f8d989650",
  "31809931666",
  "GitHub Pages",
]) {
  if (![currentState, readiness, runbook, recovery, frontend].some((doc) => doc.includes(required))) {
    fail(`current production operations state missing ${required}`);
  }
}

if (!readiness.includes("PRODUCTION V14 LIVE / DEPLOYMENT PASS")) fail("deployment readiness is not V14 production");
if (!runbook.includes("PRODUCTION V14 OPERATING BASELINE")) fail("runbook is not V14 production baseline");
if (!monitoring.includes("PRODUCTION V14 BASELINE")) fail("monitoring is not V14 production baseline");
if (!recovery.includes("PRODUCTION V14 BASELINE")) fail("recovery is not V14 production baseline");

if (!apiBoundary.includes("POST /leads") || !apiBoundary.includes("POST /chat") || !apiBoundary.includes("GET /health") || !apiBoundary.includes("Cloudflare Tunnel")) {
  fail("future local API boundary incomplete");
}
if (!apiBoundary.includes("https://leadflowai.pl") || !apiBoundary.includes("CORS")) fail("future local API origin contract incomplete");

if (!monitoring.includes("Core Web Vitals") || !monitoring.includes("mobile navigation") || !monitoring.includes("21 knowledge articles")) {
  fail("monitoring baseline incomplete for V14 production");
}
if (!recovery.includes("last known-good") && !recovery.includes("known-good")) fail("recovery known-good principle missing");
if (!recovery.includes("Secrets")) fail("recovery secrets domain missing");
if (!frontend.includes("GitHub Pages") || !frontend.includes('output: "export"') || !frontend.includes("api.leadflowai.pl")) {
  fail("static frontend architecture incomplete");
}
if (!frontend.includes("V14GlobalTechLiquid") || !frontend.includes("V14GlobalTechHeroGuard")) fail("current global Liquid runtime architecture missing");

console.log("OPERATIONS_CONTRACT_PASS production-v14=GLOBAL_LIQUID_WORLD deploy=PASS static-frontend=PASS global-liquid=ACTIVE_WITH_HERO_GUARD future-api-boundary=PASS monitoring=PASS recovery=PASS");
