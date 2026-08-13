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
const runbook = read("docs/operations/RUNBOOK.md");
const monitoring = read("docs/operations/MONITORING.md");
const recovery = read("docs/operations/BACKUP-RECOVERY.md");
const readiness = read("docs/operations/DEPLOYMENT-READINESS.md");
const frontend = read("docs/architecture/FRONTEND-DEPLOYMENT.md");
const apiBoundary = read("docs/architecture/LOCAL-API-BOUNDARY.md");

if (!nextConfig.includes('output: "export"') || !nextConfig.includes("trailingSlash: true")) fail("static frontend output contract incomplete");
if (nextConfig.includes("async headers") || nextConfig.includes("Strict-Transport-Security") || nextConfig.includes("Content-Security-Policy")) fail("server/edge headers incorrectly owned by static Next frontend");

for (const phrase of ["GitHub Pages", "Cloudflare", "api.leadflowai.pl", "NOT READY FOR PRODUCTION LAUNCH"]) {
  if (!readiness.includes(phrase) && !frontend.includes(phrase)) fail(`deployment architecture missing ${phrase}`);
}

if (!apiBoundary.includes("POST /leads") || !apiBoundary.includes("POST /chat") || !apiBoundary.includes("GET /health") || !apiBoundary.includes("Cloudflare Tunnel")) fail("local API boundary incomplete");
if (!apiBoundary.includes("https://leadflowai.pl") || !apiBoundary.includes("CORS")) fail("local API origin contract incomplete");
if (!monitoring.includes("Core Web Vitals") || (!monitoring.includes("synthetic") && !monitoring.includes("Synthetic"))) fail("monitoring baseline incomplete");
if (!recovery.includes("last known-good") || !recovery.includes("Secrets") || !recovery.includes("Lead data")) fail("recovery domains incomplete");
if (!runbook.includes("NOT AUTHORIZED") && !readiness.includes("PRODUCTION NOT YET AUTHORIZED")) fail("production authorization boundary missing");

console.log("OPERATIONS_CONTRACT_PASS static-frontend=PASS api-boundary=PASS monitoring=PASS recovery=PASS production=NOT_AUTHORIZED");
