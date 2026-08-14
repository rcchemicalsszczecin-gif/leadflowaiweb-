# LEADFLOWAI — CONTROL PLANE INDEX

STATUS: NORMATIVE
OWNER: Paweł Niewiadomski

This document is the index for the repository execution control plane. It does not replace `AGENTS.md`; it makes the governing documents explicit and non-overlapping.

## 1. Top-level authority

1. Current explicit Owner instruction.
2. Root `AGENTS.md`.
3. Current normative files under `docs/governance/` listed here.
4. `docs/governance/CURRENT-STATE.md` for current production/candidate state.
5. Current Owner-approved Master Plan / active stage plan.
6. Current implementation, architecture, quality contracts and exact evidence.
7. Historical/reference material.
8. Conversation/model memory.

## 2. Normative execution files

### `AGENTS.md`
Root constitution. Defines roles, authority order, global invariants, Git authority and default STOP behavior.

### `docs/governance/OWNER-AUTHORITY.md`
Defines decisions reserved to the Owner and the default non-delegation model.

### `docs/governance/HUMAN-AI-OPERATING-MODEL.md`
Defines the Paweł -> ChatGPT -> Codex -> ChatGPT -> Paweł operating loop.

### `docs/governance/CODEX-EXECUTION-CONTRACT.md`
Defines what Codex may and may not do.

### `docs/governance/WORKFLOW-CONTRACT.md`
Defines the mandatory lifecycle of work.

### `docs/governance/STAGE-GATE-PROTOCOL.md`
Defines stage boundaries, gate transitions and the rule that no gate authorizes the next one automatically.

### `docs/governance/PROMPT-CONTRACT.md`
Defines the mandatory structure of every implementation/audit prompt sent to Codex.

### `docs/governance/CODEX-REPORT-CONTRACT.md`
Defines the required final Codex report and final Git proof.

### `docs/governance/FILE-OWNERSHIP-AND-SCOPE-POLICY.md`
Defines file classes, write authority, exact-path scope and generated-output exceptions.

### `docs/governance/GIT-SAFETY-POLICY.md`
Defines Git safety and Owner-controlled staging/commit/push/merge/deploy.

### `docs/governance/EVIDENCE-PASS-POLICY.md`
Defines what counts as proof and when PASS is legal.

### `docs/governance/DEFINITION-OF-DONE.md`
Defines completion criteria for read, write, validation, commit and post-push phases.

### `docs/governance/SOURCE-OF-TRUTH-POLICY.md`
Defines how current truth is recovered and how conflicts/supersession are handled.

### `docs/governance/PROJECT-BOUNDARIES.md`
Defines project containment and cross-project restrictions.

### `docs/governance/CURRENT-STATE.md`
Authoritative current repository/release checkpoint. It must distinguish production from candidate work.

## 3. Product authority files

Product plans, visual decisions, search plans, architecture and quality evidence are subordinate to the execution constitution but authoritative inside their domain when they do not conflict with higher authority.

Important current families include:
- `docs/plans/LEADFLOWAI_AUTHORITATIVE_MASTER_PLAN_V1.md`
- `docs/plans/V14-VISUAL-REBUILD.md`
- `docs/plans/V15-SEARCH-MASTER-PLAN.md`
- `docs/quality/V15-*`
- `docs/architecture/*`
- current scripts/contracts and implementation.

## 4. Historical material

Historical documents retain evidence value but do not regain current authority because their filename contains terms such as MASTER, CURRENT, ACTIVE, FINAL or ACCEPTANCE.

On conflict, classify chronology and authority explicitly.

## 5. Required fresh-session reading order

Before a Codex write stage in a fresh session:

1. `AGENTS.md`
2. this index
3. Owner authority
4. Human/AI operating model
5. Codex execution contract
6. workflow contract
7. stage/gate protocol
8. prompt contract
9. file ownership/scope policy
10. Git safety
11. evidence/PASS policy
12. Definition of Done
13. Source of Truth policy
14. Current State
15. exact current Master Plan / stage-specific authorities named by the prompt.

For a full-repository absorption pass, Codex must then read and account for the complete tracked repository before concluding.

## 6. No duplicate authority rule

New governance files must not create a second contradictory workflow.

If a new rule supersedes an older normative rule, update or explicitly supersede the older rule in the same bounded governance stage.

## 7. STOP rule

If the control plane is materially contradictory, incomplete for the requested action, or inconsistent with current Git identity:

VERDICT: BLOCKER
STOP.

Do not improvise authority.
