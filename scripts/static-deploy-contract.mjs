import { existsSync, readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`STATIC_DEPLOY_CONTRACT_FAIL: ${message}`);
  process.exit(1);
};

const read = (path) => {
  if (!existsSync(path)) fail(`missing ${path}`);
  return readFileSync(path, "utf8");
};

const nextConfig = read("next.config.ts");
const runtime = read("lib/runtime.ts");
const env = read(".env.example");
const pages = read(".github/workflows/pages.yml");
const frontend = read("docs/architecture/FRONTEND-DEPLOYMENT.md");
const currentState = read("docs/governance/CURRENT-STATE.md");
const cname = read("public/CNAME").trim();

if (!nextConfig.includes('output: "export"') || !nextConfig.includes("trailingSlash: true")) fail("Next static export is not enabled");
if (!nextConfig.includes("unoptimized: true")) fail("static image optimization contract missing");
if (nextConfig.includes("headers()") || nextConfig.includes("async headers")) fail("server headers unsupported in static frontend config");

for (const path of ["app/api/leads/route.ts", "app/api/chat/route.ts", "app/api/health/route.ts"]) {
  if (existsSync(path)) fail(`server Route Handler remains in static frontend: ${path}`);
}

if (!runtime.includes("https://api.leadflowai.pl") || !env.includes("NEXT_PUBLIC_API_BASE_URL=https://api.leadflowai.pl")) {
  fail("future external API source of truth incomplete");
}
if (cname !== "leadflowai.pl") fail("CNAME artifact identity mismatch");
if (!existsSync("public/.nojekyll")) fail(".nojekyll marker missing");

for (const token of ["actions/configure-pages@v5", "actions/upload-pages-artifact@v4", "actions/deploy-pages@v4", "path: ./out", "branches:", "- main"]) {
  if (!pages.includes(token)) fail(`Pages workflow missing ${token}`);
}

for (const required of [
  "STATUS: PRODUCTION V14 ARCHITECTURE",
  "GitHub Pages",
  'output: "export"',
  "out/",
  "api.leadflowai.pl",
  "36ad3fd6130ce21e68a2c5e701a516fcb3703b65",
  "V14GlobalTechLiquid",
  "V14GlobalTechHeroGuard",
]) {
  if (!frontend.includes(required)) fail(`frontend deployment architecture record missing: ${required}`);
}

for (const required of [
  "Production authority: V14 Global Liquid World",
  "36ad3fd6130ce21e68a2c5e701a516fcb3703b65",
  "50b71632c687e032311556371108ce3f8d989650",
  "Owner Global Liquid production authorization: GRANTED and exercised",
  "GitHub Pages deployment: PASS",
]) {
  if (!currentState.includes(required)) fail(`current production boundary missing: ${required}`);
}

console.log("STATIC_DEPLOY_CONTRACT_PASS export=PASS pages-workflow=PASS cname=PASS api-split=PASS production=V14_GLOBAL_LIQUID_WORLD deployment=PASS");
