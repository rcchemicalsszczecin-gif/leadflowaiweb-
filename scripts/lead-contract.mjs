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
const briefBuilder = read("components/v14-contact-brief.tsx");
const sitemap = read("app/sitemap.ts");
const header = read("components/v14-site-header.tsx");
const site = read("lib/site.ts");

for (const required of ["LeadForm", "V14ContactBrief", "V14SiteHeader", "V14SiteFooter", "metadata", 'id="main-content"']) {
  if (!contactPage.includes(required)) fail(`contact route contract incomplete: ${required}`);
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
for (const forbidden of ["fetch(", "XMLHttpRequest", "localStorage", "sessionStorage", "document.cookie", "<form", 'type="submit"']) {
  if (briefBuilder.includes(forbidden)) fail(`frontend-only brief builder crossed lead boundary: ${forbidden}`);
}
for (const required of ['mailto:${site.email}', "Strona niczego nie zapisuje", "nie wysyła", "aria-pressed"]) {
  if (!briefBuilder.includes(required)) fail(`frontend-only V14 brief boundary missing: ${required}`);
}
if (!sitemap.includes('"kontakt"')) fail("contact route missing from sitemap");
if (!header.includes('href="/kontakt"')) fail("V14 primary header CTA does not point to contact route");
if (!site.includes('email: "kontakt@leadflowai.pl"')) fail("public LeadFlowAI contact e-mail mismatch");
if (existsSync("app/api/leads/route.ts")) fail("dynamic lead Route Handler must not remain in GitHub Pages frontend");

console.log("LEAD_CONTRACT_PASS contact=V14_SHELL delivery=OFF_BY_OWNER direct-email=PASS brief=V14_FRONTEND_ONLY_NO_STORAGE identity=PASS");
