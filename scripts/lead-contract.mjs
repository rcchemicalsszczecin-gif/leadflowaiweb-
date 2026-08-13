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
const contactPanel = read("components/lead-form.tsx");
const sitemap = read("app/sitemap.ts");
const header = read("components/site-header.tsx");
const site = read("lib/site.ts");

if (!contactPage.includes("LeadForm") || !contactPage.includes("metadata")) {
  fail("contact route contract incomplete");
}
if (!contactPanel.includes("Formularz online jest obecnie wyłączony")) {
  fail("owner-disabled form state missing");
}
if (!contactPanel.includes("mailto:") || !contactPanel.includes("site.email")) {
  fail("direct e-mail CTA missing");
}
if (contactPanel.includes("fetch(") || contactPanel.includes("apiUrl(")) {
  fail("disabled contact UI must not call an HTTP lead backend");
}
if (contactPanel.includes("<form") || contactPanel.includes('type="submit"')) {
  fail("disabled contact UI must not expose a non-functional submit form");
}
if (!sitemap.includes('"kontakt"')) fail("contact route missing from sitemap");
if (!header.includes('href="/kontakt"')) fail("primary header CTA does not point to contact route");
if (!site.includes('email: "kontakt@leadflowai.pl"')) fail("public LeadFlowAI contact e-mail mismatch");
if (existsSync("app/api/leads/route.ts")) fail("dynamic lead Route Handler must not remain in GitHub Pages frontend");

console.log("LEAD_CONTRACT_PASS contact=PASS delivery=OFF_BY_OWNER direct-email=PASS identity=PASS");
