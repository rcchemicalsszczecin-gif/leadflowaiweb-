import { existsSync, readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`OPERATIONS_CONTRACT_FAIL: ${message}`);
  process.exit(1);
};

const read = (path) => {
  if (!existsSync(path)) fail(`missing ${path}`);
  return readFileSync(path, "utf8");
};

const CURRENT_HEAD = "67663b08c950de120a94ef8495b5cdc8c9bdecfe";
const RUNTIME_MILESTONE = "36ad3fd6130ce21e68a2c5e701a516fcb3703b65";
const RUNTIME_CANDIDATE = "50b71632c687e032311556371108ce3f8d989650";
const INITIAL_V14_MERGE = "39c9b304eff42a71ea36aee871dce569d8f374f0";
const PRE_GLOBAL_LIQUID = "5bba6a6c963fa61ea3920bb4fcefff65ff9376cc";
const OLDER_V13 = "10627e2f18ccfc7ef86c76a695dab9cf7933cce9";
const LATEST_PAGES_RUN = "31810716199";
const MILESTONE_PAGES_RUN = "31809931666";
const INITIAL_V14_PAGES_RUN = "31800348526";

const nextConfig = read("next.config.ts");
const currentState = read("docs/governance/CURRENT-STATE.md");
const runbook = read("docs/operations/RUNBOOK.md");
const monitoring = read("docs/operations/MONITORING.md");
const recovery = read("docs/operations/BACKUP-RECOVERY.md");
const readiness = read("docs/operations/DEPLOYMENT-READINESS.md");
const frontend = read("docs/architecture/FRONTEND-DEPLOYMENT.md");
const repoStatus = read("docs/architecture/REPO-STATUS.md");
const historicalValidation = read("docs/architecture/VALIDATION.md");
const apiBoundary = read("docs/architecture/LOCAL-API-BOUNDARY.md");

const assertIncludes = (content, path, token) => {
  if (!content.includes(token)) throw new Error(`${path} missing ${token}`);
};

const assertExcludes = (content, path, token) => {
  if (content.includes(token)) throw new Error(`${path} contains forbidden current-role assignment ${token}`);
};

const validateCurrentOperationalDoc = (path, content) => {
  for (const token of [
    "CURRENT_PRODUCTION_BRANCH=main",
    `CURRENT_PRODUCTION_REPOSITORY_HEAD=${CURRENT_HEAD}`,
    "CURRENT_VISUAL_RUNTIME_AUTHORITY=V14_GLOBAL_LIQUID_WORLD",
    `LATEST_SUCCESSFUL_PAGES_RUN_ID=${LATEST_PAGES_RUN}`,
    `LATEST_DEPLOYED_HEAD_SHA=${CURRENT_HEAD}`,
    "CURRENT_IMMEDIATE_ROLLBACK_TARGET=NOT_PROVEN",
  ]) {
    assertIncludes(content, path, token);
  }

  for (const token of [
    `CURRENT_PRODUCTION_REPOSITORY_HEAD=${RUNTIME_MILESTONE}`,
    `CURRENT_PRODUCTION_REPOSITORY_HEAD=${INITIAL_V14_MERGE}`,
    `CURRENT_PRODUCTION_REPOSITORY_HEAD=${RUNTIME_CANDIDATE}`,
    `LATEST_SUCCESSFUL_PAGES_RUN_ID=${MILESTONE_PAGES_RUN}`,
    `LATEST_SUCCESSFUL_PAGES_RUN_ID=${INITIAL_V14_PAGES_RUN}`,
    `LATEST_DEPLOYED_HEAD_SHA=${RUNTIME_MILESTONE}`,
    `CURRENT_IMMEDIATE_ROLLBACK_TARGET=${PRE_GLOBAL_LIQUID}`,
    `CURRENT_IMMEDIATE_ROLLBACK_TARGET=${INITIAL_V14_MERGE}`,
    `CURRENT_IMMEDIATE_ROLLBACK_TARGET=${OLDER_V13}`,
  ]) {
    assertExcludes(content, path, token);
  }
};

const validateCurrentState = (content) => {
  const path = "docs/governance/CURRENT-STATE.md";
  for (const token of [
    "Production branch: `main`",
    `Current production repository HEAD: \`${CURRENT_HEAD}\``,
    "Current production visual/runtime authority: V14 Global Liquid World",
    `run id: \`${LATEST_PAGES_RUN}\``,
    `head SHA: \`${CURRENT_HEAD}\``,
    "status: `completed`",
    "conclusion: `success`",
    `V14 Global Liquid runtime merge milestone: \`${RUNTIME_MILESTONE}\``,
    `Merged Global Liquid candidate: \`${RUNTIME_CANDIDATE}\``,
    `Historical Global Liquid deployment run #36 / run id \`${MILESTONE_PAGES_RUN}\``,
  ]) {
    assertIncludes(content, path, token);
  }
};

const validateRepoStatus = (content) => {
  const path = "docs/architecture/REPO-STATUS.md";
  for (const token of [
    "PRODUCTION_BRANCH=main",
    `PRODUCTION_REPOSITORY_HEAD=${CURRENT_HEAD}`,
    "PRODUCTION_AUTHORITY=V14_GLOBAL_LIQUID_WORLD",
    `LATEST_SUCCESSFUL_PAGES_RUN=${LATEST_PAGES_RUN}`,
    `LATEST_DEPLOYED_HEAD_SHA=${CURRENT_HEAD}`,
    "CURRENT_IMMEDIATE_ROLLBACK_TARGET=NOT_PROVEN",
    `V14_GLOBAL_LIQUID_CANDIDATE=${RUNTIME_CANDIDATE}`,
    `V14_GLOBAL_LIQUID_MERGE=${RUNTIME_MILESTONE}`,
    `V14_GLOBAL_LIQUID_MILESTONE_PAGES_RUN=${MILESTONE_PAGES_RUN}_SUCCESS`,
    `PRE_GLOBAL_LIQUID_REVISION=${PRE_GLOBAL_LIQUID}`,
    "INITIAL_V14_RELEASE_CANDIDATE=242263ffe1593d1a80890b7f6bc1514316ed2656",
    `INITIAL_V14_PRODUCTION_MERGE=${INITIAL_V14_MERGE}`,
    `INITIAL_V14_DEPLOYMENT_RUN=${INITIAL_V14_PAGES_RUN}`,
    `OLDER_V13_REFERENCE=${OLDER_V13}`,
  ]) {
    assertIncludes(content, path, token);
  }
  assertExcludes(content, path, `PRODUCTION_REVISION=${RUNTIME_MILESTONE}`);
  assertExcludes(content, path, `GITHUB_PAGES_RUN=${MILESTONE_PAGES_RUN}_SUCCESS`);
};

const validateHistoricalValidation = (content) => {
  const path = "docs/architecture/VALIDATION.md";
  for (const token of [
    "STATUS: HISTORICAL VALIDATION EVIDENCE",
    CURRENT_HEAD,
    "V14 Global Liquid World",
    "docs/governance/CURRENT-STATE.md",
    "docs/plans/LEADFLOWAI_AUTHORITATIVE_MASTER_PLAN_V2.md",
  ]) {
    assertIncludes(content, path, token);
  }
  for (const pattern of [/V13(?: Polish Production Rebuild)? is current production authority/i, /V14 is the current feature-branch visual rebuild/i]) {
    if (pattern.test(content)) throw new Error(`${path} contains stale current commentary matching ${pattern}`);
  }
};

const validateOperationalTruth = ({ currentState: state, currentDocuments, repoStatus: status, historicalValidation: validation }) => {
  validateCurrentState(state);
  for (const document of currentDocuments) validateCurrentOperationalDoc(document.path, document.content);
  validateRepoStatus(status);
  validateHistoricalValidation(validation);
};

const operationalTruth = {
  currentState,
  currentDocuments: [
    { path: "docs/operations/BACKUP-RECOVERY.md", content: recovery },
    { path: "docs/operations/DEPLOYMENT-READINESS.md", content: readiness },
    { path: "docs/operations/MONITORING.md", content: monitoring },
    { path: "docs/operations/RUNBOOK.md", content: runbook },
    { path: "docs/architecture/FRONTEND-DEPLOYMENT.md", content: frontend },
    { path: "docs/architecture/REPO-STATUS.md", content: repoStatus },
  ],
  repoStatus,
  historicalValidation,
};

try {
  validateOperationalTruth(operationalTruth);
} catch (error) {
  fail(error.message);
}

const replaceInCurrentDocument = (truth, index, from, to) => ({
  ...truth,
  currentDocuments: truth.currentDocuments.map((document, documentIndex) =>
    documentIndex === index ? { ...document, content: document.content.replace(from, to) } : { ...document },
  ),
  repoStatus: index === 5 ? truth.repoStatus.replace(from, to) : truth.repoStatus,
});

const expectNegativeFailure = (label, mutatedTruth, expectedPath) => {
  try {
    validateOperationalTruth(mutatedTruth);
  } catch (error) {
    if (expectedPath && !error.message.includes(expectedPath)) {
      throw new Error(`${label} failed for the wrong file: ${error.message}`);
    }
    return;
  }
  throw new Error(`${label} did not detect the deliberate stale condition`);
};

try {
  expectNegativeFailure(
    "NEGATIVE_TEST_A",
    replaceInCurrentDocument(operationalTruth, 0, `CURRENT_PRODUCTION_REPOSITORY_HEAD=${CURRENT_HEAD}`, `CURRENT_PRODUCTION_REPOSITORY_HEAD=${RUNTIME_MILESTONE}`),
    "docs/operations/BACKUP-RECOVERY.md",
  );
  expectNegativeFailure(
    "NEGATIVE_TEST_B",
    replaceInCurrentDocument(operationalTruth, 1, `LATEST_SUCCESSFUL_PAGES_RUN_ID=${LATEST_PAGES_RUN}`, `LATEST_SUCCESSFUL_PAGES_RUN_ID=${MILESTONE_PAGES_RUN}`),
    "docs/operations/DEPLOYMENT-READINESS.md",
  );
  expectNegativeFailure(
    "NEGATIVE_TEST_C",
    replaceInCurrentDocument(operationalTruth, 2, `CURRENT_PRODUCTION_REPOSITORY_HEAD=${CURRENT_HEAD}`, `CURRENT_PRODUCTION_REPOSITORY_HEAD=${RUNTIME_MILESTONE}`),
    "docs/operations/MONITORING.md",
  );
  expectNegativeFailure(
    "NEGATIVE_TEST_D",
    replaceInCurrentDocument(operationalTruth, 3, `CURRENT_PRODUCTION_REPOSITORY_HEAD=${CURRENT_HEAD}`, `CURRENT_PRODUCTION_REPOSITORY_HEAD=${INITIAL_V14_MERGE}`),
    "docs/operations/RUNBOOK.md",
  );
  expectNegativeFailure(
    "NEGATIVE_TEST_E",
    replaceInCurrentDocument(operationalTruth, 4, "CURRENT_IMMEDIATE_ROLLBACK_TARGET=NOT_PROVEN", `CURRENT_IMMEDIATE_ROLLBACK_TARGET=${PRE_GLOBAL_LIQUID}`),
    "docs/architecture/FRONTEND-DEPLOYMENT.md",
  );
  expectNegativeFailure(
    "NEGATIVE_TEST_F",
    { ...operationalTruth, historicalValidation: `${historicalValidation}\nV13 is current production authority\n` },
    "docs/architecture/VALIDATION.md",
  );
  expectNegativeFailure(
    "NEGATIVE_TEST_G",
    replaceInCurrentDocument(operationalTruth, 5, `CURRENT_PRODUCTION_REPOSITORY_HEAD=${CURRENT_HEAD}`, `CURRENT_PRODUCTION_REPOSITORY_HEAD=${RUNTIME_CANDIDATE}`),
    "docs/architecture/REPO-STATUS.md",
  );
  expectNegativeFailure(
    "NEGATIVE_TEST_H",
    replaceInCurrentDocument(operationalTruth, 1, `CURRENT_PRODUCTION_REPOSITORY_HEAD=${CURRENT_HEAD}`, `CURRENT_PRODUCTION_REPOSITORY_HEAD=${INITIAL_V14_MERGE}`),
    "docs/operations/DEPLOYMENT-READINESS.md",
  );
} catch (error) {
  fail(error.message);
}

if (!nextConfig.includes('output: "export"') || !nextConfig.includes("trailingSlash: true")) fail("static frontend output contract incomplete");
if (nextConfig.includes("async headers") || nextConfig.includes("Strict-Transport-Security") || nextConfig.includes("Content-Security-Policy")) fail("server/edge headers incorrectly owned by static Next frontend");

if (!readiness.includes("PRODUCTION V14 LIVE / DEPLOYMENT PASS")) fail("deployment readiness is not V14 production");
if (!runbook.includes("PRODUCTION V14 OPERATING BASELINE")) fail("runbook is not V14 production baseline");
if (!monitoring.includes("PRODUCTION V14 BASELINE")) fail("monitoring is not V14 production baseline");
if (!recovery.includes("PRODUCTION V14 BASELINE")) fail("recovery is not V14 production baseline");

if (!apiBoundary.includes("POST /leads") || !apiBoundary.includes("POST /chat") || !apiBoundary.includes("GET /health") || !apiBoundary.includes("Cloudflare Tunnel")) {
  fail("future local API boundary incomplete");
}
if (!apiBoundary.includes("https://leadflowai.pl") || !apiBoundary.includes("CORS")) fail("future local API origin contract incomplete");

if (!monitoring.includes("Core Web Vitals") || !monitoring.includes("mobile navigation") || !monitoring.includes("21 knowledge articles")) {
  fail("monitoring baseline incomplete for V14 production");
}
if (!recovery.includes("last known-good") && !recovery.includes("known-good")) fail("recovery known-good principle missing");
if (!recovery.includes("Secrets")) fail("recovery secrets domain missing");
if (!frontend.includes("GitHub Pages") || !frontend.includes('output: "export"') || !frontend.includes("api.leadflowai.pl")) {
  fail("static frontend architecture incomplete");
}
if (!frontend.includes("V14GlobalTechLiquid") || !frontend.includes("V14GlobalTechHeroGuard")) fail("current global Liquid runtime architecture missing");

console.log("OPERATIONS_CONTRACT_PASS current-head=PASS per-file-truth=6_OF_6 historical-roles=PASS negative-tests=8_OF_8 static-frontend=PASS future-api-boundary=PASS monitoring=PASS recovery=PASS");
