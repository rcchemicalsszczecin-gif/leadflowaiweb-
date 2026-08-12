import { existsSync, readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`LEAD_CONTRACT_FAIL: ${message}`);
  process.exit(1);
};

const read = (path) => {
  if (!existsSync(path)) fail(`missing ${path}`);
  return readFileSync(path, "utf8");
};

const contactPage = read("app/kontakt/page.tsx");
const form = read("components/lead-form.tsx");
const validation = read("lib/lead.ts");
const runtime = read("lib/runtime.ts");
const env = read(".env.example");
const sitemap = read("app/sitemap.ts");
const header = read("components/site-header.tsx");
const site = read("lib/site.ts");
const boundary = read("docs/architecture/LOCAL-API-BOUNDARY.md");

if (!contactPage.includes("LeadForm") || !contactPage.includes("metadata")) fail("contact route contract incomplete");
if (!form.includes('apiUrl("/leads")') || !form.includes('name="website"')) fail("client lead API/honeypot contract missing");
if (!form.includes("fallbackEmail") || !form.includes("site.email")) fail("client fallback missing");
if (!validation.includes("parseLeadPayload") || !validation.includes("contactPermission")) fail("lead validation model missing");
if (!runtime.includes('https://api.leadflowai.pl') || !env.includes("NEXT_PUBLIC_API_BASE_URL=https://api.leadflowai.pl")) fail("public API origin mismatch");
if (env.includes("LEAD_WEBHOOK_TOKEN") || env.includes("LEAD_WEBHOOK_URL")) fail("server lead secrets must not live in frontend env template");
if (!boundary.includes("POST /leads") || !boundary.includes("server-side validation") || !boundary.includes("CORS")) fail("local lead backend boundary incomplete");
if (!sitemap.includes('"kontakt"')) fail("contact route missing from sitemap");
if (!header.includes('href="/kontakt"')) fail("primary header CTA does not point to contact route");
if (!site.includes('email: "kontakt@leadflowai.pl"')) fail("public LeadFlowAI contact e-mail mismatch");
if (existsSync("app/api/leads/route.ts")) fail("dynamic lead Route Handler must not remain in GitHub Pages frontend");

console.log("LEAD_CONTRACT_PASS contact=PASS external-api=PASS fallback=PASS identity=PASS local-backend=PENDING");
