import { existsSync, readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`PORTFOLIO_V12_FAIL: ${message}`);
  process.exit(1);
};

const read = (path) => {
  if (!existsSync(path)) fail(`missing ${path}`);
  return readFileSync(path, "utf8");
};

const registry = read("lib/portfolio.ts");
const page = read("app/realizacje/page.tsx");
const combined = `${registry}\n${page}`;

for (const project of ["LeadFlowAI.pl", "TranskrypcjaAI.pl", "Tervyxa.pl"]) {
  if (!registry.includes(project)) fail(`missing portfolio project ${project}`);
}

for (const phrase of [
  "PROJEKT WŁASNY",
  "portal zamówień wyłączony",
  "Ograniczona publiczna próba działa",
  "Tervyxa Systems sp. z o.o.",
  "tervyxa.pl",
  "transkrypcjaai.pl",
  "leadflowai.pl",
  "Publiczna prawda",
]) {
  if (!combined.includes(phrase)) fail(`missing evidence boundary: ${phrase}`);
}

if (!page.includes("portfolioCases.map")) fail("portfolio page is not registry-driven");
if (!page.includes("projektami własnymi ekosystemu Tervyxa Systems")) fail("own-project disclosure missing");
if (!page.includes("nie przedstawiamy ich jako zewnętrznych realizacji klientów")) fail("external-client disclaimer missing");

for (const forbidden of [
  "setki klientów",
  "gwarantowany wzrost",
  "100% skuteczności",
  "najlepsza firma",
  "klient TranskrypcjaAI",
  "klient Tervyxa",
]) {
  if (combined.toLowerCase().includes(forbidden.toLowerCase())) fail(`unsupported portfolio claim: ${forbidden}`);
}

console.log("PORTFOLIO_V12_PASS projects=3 owner-related=3 external-client-case-studies=0 transkrypcja-order-portal=OFF evidence-boundary=PASS language=PL");
