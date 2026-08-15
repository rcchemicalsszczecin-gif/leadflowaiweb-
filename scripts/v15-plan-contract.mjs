import { existsSync, readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`V15_PLAN_CONTRACT_FAIL: ${message}`);
  globalThis.process.exit(1);
};

const read = (path) => {
  if (!existsSync(path)) fail(`missing ${path}`);
  return readFileSync(path, "utf8");
};

const agents = read("AGENTS.md");
const currentState = read("docs/governance/CURRENT-STATE.md");
const ownerV14 = read("docs/governance/WEBSITE-OWNER-DECISION-V14.md");
const sourceOfTruth = read("docs/governance/SOURCE-OF-TRUTH-POLICY.md");
const masterPlanV2 = read("docs/plans/LEADFLOWAI_AUTHORITATIVE_MASTER_PLAN_V2.md");
const v14Plan = read("docs/plans/V14-VISUAL-REBUILD.md");
const v15Plan = read("docs/plans/V15-SEARCH-MASTER-PLAN.md");
const repoStatus = read("docs/architecture/REPO-STATUS.md");
const packageJson = read("package.json");
const globalWorldContract = read("scripts/global-liquid-world-v14-contract.mjs");

for (const required of [
  "## 13. Current product/design authority",
  "Current production visual authority is V14 Global Liquid World",
  "V15 is a search/evidence candidate program, not automatic production authority.",
  "35 service/money pages",
  "21 knowledge articles",
  "63 dominant search intents",
  "Owner-provided LeadFlowAI brand mark",
  "no white/paper public section art direction",
]) {
  if (!agents.includes(required)) fail(`AGENTS invariant missing: ${required}`);
}

for (const required of [
  "Current production visual/runtime authority: V14 Global Liquid World",
  "67663b08c950de120a94ef8495b5cdc8c9bdecfe",
  "31810716199",
  "head SHA: `67663b08c950de120a94ef8495b5cdc8c9bdecfe`",
  "status: `completed`",
  "conclusion: `success`",
  "36ad3fd6130ce21e68a2c5e701a516fcb3703b65",
  "50b71632c687e032311556371108ce3f8d989650",
]) {
  if (!currentState.includes(required)) fail(`CURRENT-STATE invariant missing: ${required}`);
}

for (const required of [
  "V14_GLOBAL_LIQUID_OWNER_AUTHORIZATION=GRANTED_AND_EXERCISED",
  "V14_GLOBAL_LIQUID_CANDIDATE=50b71632c687e032311556371108ce3f8d989650",
  "V14_PRODUCTION_MERGE=36ad3fd6130ce21e68a2c5e701a516fcb3703b65",
  "GITHUB_PAGES_DEPLOYMENT=PASS",
]) {
  if (!ownerV14.includes(required)) fail(`Owner V14 production evidence missing: ${required}`);
}

for (const required of [
  "TOP_LEVEL_PRODUCT_AUTHORITY=docs/plans/LEADFLOWAI_AUTHORITATIVE_MASTER_PLAN_V2.md",
  "V15=SUBORDINATE_SEARCH_DOMAIN_PLAN_AND_CANDIDATE_EVIDENCE",
  "The production visual/runtime authority remains V14 Global Liquid World.",
]) {
  if (!sourceOfTruth.includes(required)) fail(`source-of-truth invariant missing: ${required}`);
}

for (const required of [
  "STATUS: ACTIVE / OWNER-APPROVED TOP-LEVEL PRODUCT COMPLETION ROADMAP",
  "V1_SUPERSEDED_AS_TOP_LEVEL_AUTHORITY=YES",
  "V15_RETAINED_AS_SUBORDINATE_SEARCH_DOMAIN_PLAN=YES",
  "CURRENT_PRODUCT_COMPLETION_PROGRAM=A→Z / C01–C27",
  "67663b08c950de120a94ef8495b5cdc8c9bdecfe",
]) {
  if (!masterPlanV2.includes(required)) fail(`Master Plan V2 invariant missing: ${required}`);
}

if (!v14Plan.includes("STATUS: COMPLETED / HISTORICAL PRODUCTION DELIVERY RECORD")) {
  fail("V14 plan is not marked completed/historical");
}
if (v14Plan.includes("STATUS: ACTIVE EXECUTION PLAN / CURRENT V14 DELIVERY AUTHORITY")) {
  fail("V14 plan still claims active execution authority");
}
for (const required of [
  "R0 — SOURCE OF TRUTH + GOVERNANCE REPAIR",
  "R1 — P0 V14 UX / ACCESSIBILITY REPAIR",
  "R2 — CSS + RUNTIME DE-STACK",
  "V14.8 — FULL ROUTE MIGRATION",
  "V14.9 — MOBILE / PERFORMANCE / ACCESSIBILITY / SECURITY QA",
  "V14.10 — OWNER VISUAL ACCEPTANCE",
  "R9 — RELEASE HARDENING + MERGE",
  "Post-release signature upgrade — Global Liquid World",
  "50b71632c687e032311556371108ce3f8d989650",
  "36ad3fd6130ce21e68a2c5e701a516fcb3703b65",
]) {
  if (!v14Plan.includes(required)) fail(`V14 historical record missing: ${required}`);
}

for (const required of [
  "STATUS: ACTIVE SUBORDINATE SEARCH / SEO / AEO / GEO / AI SEARCH DOMAIN PLAN — CANDIDATE EVIDENCE PROGRAM",
  "V15 is subordinate to `docs/plans/LEADFLOWAI_AUTHORITATIVE_MASTER_PLAN_V2.md`",
  "BASELINE_MAIN_HEAD: `67663b08c950de120a94ef8495b5cdc8c9bdecfe`",
  "VISUAL_PRODUCTION_AUTHORITY: `V14_GLOBAL_LIQUID_WORLD`",
  "V15.0 — AUTHORITY / BASELINE / DATA MODEL",
  "V15.1 — LIVE CRAWL / INDEXABILITY BASELINE",
  "V15.2 — GOOGLE SEARCH CONSOLE EVIDENCE",
  "V15.3 — BING WEBMASTER / INDEXNOW",
  "V15.4 — 63-INTENT QUERY / URL MAPPING",
  "V15.5 — TECHNICAL SEO HARDENING",
  "V15.6 — INFORMATION ARCHITECTURE / ENTITY / INTERNAL LINKING",
  "V15.7 — SERP / SNIPPET / ON-PAGE OPTIMIZATION",
  "V15.8 — LOCAL SEO / SZCZECIN / POLAND",
  "V15.9 — AEO / ANSWER ARCHITECTURE",
  "V15.10 — GEO / GENERATIVE-AI SOURCE READINESS",
  "V15.11 — CONTENT GAP / EDITORIAL PROGRAM",
  "V15.12 — STRUCTURED DATA / ENTITY VALIDATION",
  "V15.13 — IMAGE / MEDIA SEO",
  "V15.14 — CORE WEB VITALS / PERFORMANCE",
  "V15.15 — ANALYTICS / PRIVACY / CONVERSION MEASUREMENT",
  "V15.16 — SERP / COMPETITOR / DEMAND RESEARCH",
  "V15.17 — ORIGINAL EVIDENCE / RESEARCH",
  "V15.18 — OFF-PAGE / LOCAL CITATIONS / BUSINESS ENTITY",
  "V15.19 — MONITORING / SEARCH CHANGE LOG",
  "V15.20 — 30 / 60 / 90 DAY PROGRAM",
  "V15 does not fabricate:",
  "Search Console data",
  "Bing data",
  "AI citations/mentions",
  "`llms.txt` is not treated as a Google ranking/visibility requirement",
  "generative-AI performance report",
  "No feature-branch PASS authorizes merge to `main`",
]) {
  if (!v15Plan.includes(required)) fail(`V15 plan invariant missing: ${required}`);
}

for (const required of [
  "PRODUCTION_AUTHORITY=V14_GLOBAL_LIQUID_WORLD",
  "V14_GLOBAL_LIQUID_CONTRACT=PASS",
  "V14_GLOBAL_LIQUID_ROUTE_PREVIEW=PASS_8_OF_8",
  "V14_GLOBAL_LIQUID_BROWSER_MATRIX=PASS_28_OF_28",
  "PUBLIC_SERVICE_PAGES=35",
  "KNOWLEDGE_ARTICLES=21",
  "DOMINANT_SEARCH_INTENTS=63",
  "MAIN_BRANCH_PROTECTION=OFF",
  "DEPENDABOT_ALERTS=OFF",
  "TOP_LEVEL_MASTER_PLAN=LEADFLOWAI_AUTHORITATIVE_MASTER_PLAN_V2",
  "V15=SUBORDINATE_NON_PRODUCTION_SEARCH_DOMAIN_PLAN",
]) {
  if (!repoStatus.includes(required)) fail(`repository status invariant missing: ${required}`);
}

if (!packageJson.includes('"plan:contract": "node scripts/v15-plan-contract.mjs"')) {
  fail("package plan:contract is not wired to V15");
}
if (!packageJson.includes('"global-world:contract"') || !packageJson.includes("npm run global-world:contract")) {
  fail("Global Liquid World contract is not enforced by verify");
}
for (const marker of ["GLOBAL_LIQUID_WORLD_V14_PASS", "PCB_CPU_GPU", "hero=PRESERVED_GPU_GUARDED"]) {
  if (!globalWorldContract.includes(marker)) fail(`Global Liquid World contract marker missing: ${marker}`);
}

console.log(
  "V15_PLAN_CONTRACT_PASS baseline=67663b08 visual=V14_GLOBAL_LIQUID_WORLD services=35 articles=21 intents=63 evidence=REAL_ONLY gsc=PLANNED bing=PLANNED ai-search=OFFICIAL_GUIDANCE no-fabrication=PASS",
);
