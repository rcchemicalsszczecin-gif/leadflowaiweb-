import { existsSync, readFileSync } from "node:fs";

const read = (path) => {
  if (!existsSync(path)) throw new Error(`missing ${path}`);
  return readFileSync(path, "utf8");
};

const agents = read("AGENTS.md");
const sourceOfTruth = read("docs/governance/SOURCE-OF-TRUTH-POLICY.md");
const currentState = read("docs/governance/CURRENT-STATE.md");
const masterPlan = read("docs/plans/LEADFLOWAI_AUTHORITATIVE_MASTER_PLAN_V1.md");

const checks = [
  [sourceOfTruth.includes("docs/governance/CURRENT-STATE.md"), "CURRENT-STATE authority"],
  [sourceOfTruth.includes("LEADFLOWAI-PREMIUM-CALIBRATION-V9-2.md"), "V9.2 SoT authority"],
  [agents.includes("V9.2"), "AGENTS V9.2 authority"],
  [currentState.includes("Initial GitHub Pages production launch: COMPLETE"), "production checkpoint"],
  [currentState.includes("content/full-offer-v11"), "active work branch checkpoint"],
  [masterPlan.includes("docs/governance/CURRENT-STATE.md"), "master plan current-state pointer"],
  [masterPlan.includes("Premium Calibration V9.2"), "master plan V9.2 authority"],
];

for (const [ok, label] of checks) {
  if (!ok) {
    console.error(`GOVERNANCE_CONTRACT_FAIL: ${label}`);
    process.exit(1);
  }
}

console.log("GOVERNANCE_CONTRACT_PASS current-state=PASS authority=V9.2+V9 master-plan=SYNCED");
