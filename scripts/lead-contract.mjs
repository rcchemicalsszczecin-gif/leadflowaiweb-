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
const route = read("app/api/leads/route.ts");
const env = read(".env.example");
const sitemap = read("app/sitemap.ts");
const header = read("components/site-header.tsx");

if (!contactPage.includes("LeadForm") || !contactPage.includes("metadata")) fail("contact route contract incomplete");
if (!form.includes('fetch("/api/leads"') || !form.includes('name="website"')) fail("client form endpoint/honeypot missing");
if (!form.includes("fallbackEmail") || !form.includes("kontakt@tervyxa.pl") && !form.includes("site.email")) fail("client fallback missing");
if (!validation.includes("parseLeadPayload") || !validation.includes("contactPermission")) fail("server validation contract missing");

for (const token of ["sameOrigin", "rateLimited", "DELIVERY_UNCONFIGURED", "LEAD_WEBHOOK_URL", "LEAD_WEBHOOK_TOKEN", "MAX_BODY_CHARS", "FORM_TIMING_REJECTED"]) {
  if (!route.includes(token)) fail(`lead route missing ${token}`);
}

if (route.includes("console.log") || route.includes("console.error")) fail("lead route must not log submitted PII");
if (!env.includes("LEAD_WEBHOOK_URL=") || !env.includes("LEAD_WEBHOOK_TOKEN=")) fail("server lead env template missing");
if (env.includes("NEXT_PUBLIC_LEAD_WEBHOOK")) fail("lead delivery secret exposed as public env");
if (!sitemap.includes('"kontakt"')) fail("contact route missing from sitemap");
if (!header.includes('href="/kontakt"')) fail("primary header CTA does not point to contact route");

console.log("LEAD_CONTRACT_PASS contact=PASS validation=PASS security=PASS fallback=PASS");
