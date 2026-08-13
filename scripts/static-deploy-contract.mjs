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
const cname = read("public/CNAME").trim();

if (!nextConfig.includes('output: "export"') || !nextConfig.includes("trailingSlash: true")) fail("Next static export is not enabled");
if (!nextConfig.includes("unoptimized: true")) fail("static image optimization contract missing");
if (nextConfig.includes("headers()") || nextConfig.includes("async headers")) fail("server headers unsupported in static frontend config");

for (const path of ["app/api/leads/route.ts", "app/api/chat/route.ts", "app/api/health/route.ts"]) {
  if (existsSync(path)) fail(`server Route Handler remains in static frontend: ${path}`);
}

if (!runtime.includes('https://api.leadflowai.pl') || !env.includes("NEXT_PUBLIC_API_BASE_URL=https://api.leadflowai.pl")) fail("external API source of truth incomplete");
if (cname !== "leadflowai.pl") fail("CNAME artifact identity mismatch");
if (!existsSync("public/.nojekyll")) fail(".nojekyll marker missing");

for (const token of ["actions/configure-pages@v5", "actions/upload-pages-artifact@v4", "actions/deploy-pages@v4", "path: ./out", "branches:", "- main"]) {
  if (!pages.includes(token)) fail(`Pages workflow missing ${token}`);
}
if (pages.includes("build/leadflowai")) fail("work branch must not auto-deploy to Pages");
if (!frontend.includes("GitHub Pages") || !frontend.includes("out/") || !frontend.includes("Cloudflare")) fail("frontend deployment architecture record incomplete");

console.log("STATIC_DEPLOY_CONTRACT_PASS export=PASS pages-workflow=PASS cname=PASS api-split=PASS production=AUTO_DEPLOY_MAIN_ONLY");
