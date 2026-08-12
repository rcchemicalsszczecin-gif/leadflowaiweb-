import { existsSync, readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`OPERATIONS_CONTRACT_FAIL: ${message}`);
  process.exit(1);
};

const read = (path) => {
  if (!existsSync(path)) fail(`missing ${path}`);
  return readFileSync(path, "utf8");
};

const health = read("app/api/health/route.ts");
const nextConfig = read("next.config.ts");
const runbook = read("docs/operations/RUNBOOK.md");
const monitoring = read("docs/operations/MONITORING.md");
const recovery = read("docs/operations/BACKUP-RECOVERY.md");
const readiness = read("docs/operations/DEPLOYMENT-READINESS.md");

if (!health.includes('status: "ok"') || !health.includes('service: "leadflowai-web"') || !health.includes('"Cache-Control": "no-store"')) {
  fail("health endpoint contract incomplete");
}

for (const header of [
  "X-Content-Type-Options",
  "X-Frame-Options",
  "Referrer-Policy",
  "Permissions-Policy",
  "Cross-Origin-Opener-Policy",
]) {
  if (!nextConfig.includes(header)) fail(`security header missing ${header}`);
}

if (nextConfig.includes("Strict-Transport-Security")) fail("HSTS enabled before verified production HTTPS decision");
if (nextConfig.includes("Content-Security-Policy")) fail("CSP enabled before final runtime/provider inventory validation");

for (const phrase of ["NOT AUTHORIZED", "UNSELECTED", "/api/health", "kontakt@leadflowai.pl"]) {
  if (!runbook.includes(phrase) && !readiness.includes(phrase)) fail(`operations boundary missing ${phrase}`);
}

if (!monitoring.includes("Core Web Vitals") || !monitoring.includes("synthetic") && !monitoring.includes("Synthetic")) fail("monitoring baseline incomplete");
if (!recovery.includes("last known-good") || !recovery.includes("Secrets") || !recovery.includes("Lead data")) fail("recovery domains incomplete");
if (!readiness.includes("NOT READY FOR PRODUCTION LAUNCH") || !readiness.includes("GO / NO-GO")) fail("deployment readiness boundary incomplete");

console.log("OPERATIONS_CONTRACT_PASS health=PASS headers=5 monitoring=PASS recovery=PASS production=NOT_AUTHORIZED");
