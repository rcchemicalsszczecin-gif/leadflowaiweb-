import { existsSync, readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`PORTFOLIO_EVIDENCE_CONTRACT_FAIL: ${message}`);
  process.exit(1);
};

const path = "docs/architecture/PORTFOLIO-EVIDENCE-REGISTER.md";
if (!existsSync(path)) fail(`missing ${path}`);
const register = readFileSync(path, "utf8");

for (const required of [
  "CLAIM -> EXACT EVIDENCE -> LIMITATION -> OWNER REVIEW -> PUBLIC STATUS",
  "LeadFlowAI receipt",
  "TranskrypcjaAI receipt",
  "Tervyxa receipt",
  "67663b08c950de120a94ef8495b5cdc8c9bdecfe",
  "00b0bd41edae2d927ecbaa891c6f2591ce019444",
  "TRANSKRYPCJAAI_REPOSITORY_EVIDENCE=BLOCKED_EXTERNAL_EVIDENCE",
  "C05_PUBLIC_CLAIM_APPROVAL=PENDING_OWNER",
  "none is represented here as an external client case",
]) {
  if (!register.includes(required)) fail(`required evidence boundary missing: ${required}`);
}

const claimRows = register.split("\n").filter((line) => /^\| `(?:LFA|TVX)-\d+` \|/.test(line));
if (claimRows.length !== 13) fail(`expected 13 evidence-backed claim rows, found ${claimRows.length}`);
for (const row of claimRows) {
  if (!/`PROVEN(?:_WITH_LIMITATION)?`/.test(row)) fail(`claim row lacks proven status: ${row.slice(0, 40)}`);
  if (!row.includes(" | `") || !row.includes(";")) fail(`claim row lacks evidence limitation: ${row.slice(0, 40)}`);
}

for (const forbidden of ["guaranteed ranking", "guaranteed conversion", "external client case study"]) {
  if (register.toLowerCase().includes(forbidden)) fail(`unsupported public claim admitted: ${forbidden}`);
}

console.log("PORTFOLIO_EVIDENCE_CONTRACT_PASS projects=3 proven-claims=13 blocked-project-receipts=1 public-approval=PENDING_OWNER");
