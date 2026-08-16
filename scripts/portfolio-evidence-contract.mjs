import { existsSync, readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`PORTFOLIO_EVIDENCE_CONTRACT_FAIL: ${message}`);
  process.exit(1);
};
const path = "docs/architecture/PORTFOLIO-EVIDENCE-REGISTER.md";
if (!existsSync(path)) fail(`missing ${path}`);
const register = readFileSync(path, "utf8");
const publicRegistry = readFileSync("lib/portfolio.ts", "utf8");

for (const required of [
  "CLAIM -> EXACT EVIDENCE -> LIMITATION -> OWNER REVIEW -> PUBLIC STATUS",
  "854d8220df090d73587053757b5fc4f05640d212",
  "67663b08c950de120a94ef8495b5cdc8c9bdecfe",
  "e4c5e4aaa4d90387dc1e2291a7d2b860608b779b",
  "00b0bd41edae2d927ecbaa891c6f2591ce019444",
  "TRANSKRYPCJAAI_REPOSITORY_VISIBILITY=PRIVATE",
  "TRANSKRYPCJAAI_PRIVATE_SOURCE_EXPOSED=NO",
  "PUBLIC_CLAIM_WITHOUT_RECEIPT_COUNT=0",
  "C05_PUBLIC_CLAIM_APPROVAL=OWNER_APPROVED_WITH_EVIDENCE_LIMITS",
  "not external-client case studies",
]) if (!register.includes(required)) fail(`required evidence boundary missing: ${required}`);

const claimRows = register.split("\n").filter((line) => /^\| `(?:LFA|TAI|TVX)-\d+` \|/.test(line));
if (claimRows.length !== 20) fail(`expected 20 evidence-backed claim rows, found ${claimRows.length}`);
for (const row of claimRows) {
  if (!/`PROVEN(?:_WITH_LIMITATION)?`/.test(row)) fail(`claim row lacks approved evidence state: ${row.slice(0, 60)}`);
  if (!row.includes(";")) fail(`claim row lacks limitation boundary: ${row.slice(0, 60)}`);
}
for (const project of ["LeadFlowAI.pl", "TranskrypcjaAI.pl", "Tervyxa.pl"]) {
  if (!publicRegistry.includes(project)) fail(`public registry missing admitted project: ${project}`);
}
for (const forbidden of ["accuracy KPI", "gwarantowany wzrost", "klient TranskrypcjaAI", "klient Tervyxa"]) {
  if (publicRegistry.toLowerCase().includes(forbidden.toLowerCase())) fail(`unsupported public claim admitted: ${forbidden}`);
}
console.log("PORTFOLIO_EVIDENCE_CONTRACT_PASS projects=3 proven-claims=20 public-approval=OWNER_APPROVED_WITH_EVIDENCE_LIMITS receipts=COMPLETE");
