# LEADFLOWAI — CONTROL PLANE INDEX

STATUS: NORMATIVE
OWNER: Paweł Niewiadomski

This document is the index for the repository execution control plane. It does not replace `AGENTS.md`; it makes governing documents explicit and non-overlapping.

## 1. Top-level authority

1. Current explicit Owner instruction.
2. Root `AGENTS.md`.
3. Applicable nested `AGENTS.md` plus current normative governance files indexed here.
4. `docs/governance/CURRENT-STATE.md` for current production/candidate state.
5. `docs/governance/WEBSITE-OWNER-DECISIONS.md` for current product/business/runtime Owner decisions.
6. Current Owner-approved top-level Master Plan (`docs/plans/LEADFLOWAI_AUTHORITATIVE_MASTER_PLAN_V2.md`) / active bounded stage plan.
7. Current implementation, architecture, quality contracts and exact evidence.
8. Historical/reference material.
9. Conversation/model memory.

## 2. Normative execution files

### `AGENTS.md`
Root constitution. Defines roles, authority order, global invariants, Git authority and default STOP behavior.

### `docs/governance/AGENTS.md`
Nested governance-subtree guard. Governance is read-only by default and may not be rewritten by an agent to expand its own authority.

### `docs/governance/OWNER-AUTHORITY.md`
Defines decisions reserved to the Owner and the default non-delegation model.

### `docs/governance/HUMAN-AI-OPERATING-MODEL.md`
Defines the Owner -> ChatGPT -> Codex -> ChatGPT -> Owner operating loop.

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

### `docs/governance/WEBSITE-OWNER-DECISIONS.md`
Current Owner-approved product/business/runtime decisions. It is subordinate to a later explicit Owner instruction and interpreted with `CURRENT-STATE.md` for exact release identity.

### `docs/governance/RELEASE-TAG-POLICY.md`
Defines immutable tag/release identity, retained Owner publication authority, C25/C26 sequencing and rollback without tag rewriting.

## 3. Completed / historical Owner decision records

These files preserve real historical Owner decisions and recovery/provenance context. Their historical decision scope remains evidence, but they do not override later current authority outside that scope:

- `docs/governance/WEBSITE-OWNER-DECISION-V14.md` — completed V14 / Global Liquid production decision record.
- `docs/governance/WEBSITE-OWNER-DECISION-V13.md` — historical V13 production decision record.
- `docs/governance/WEBSITE-OWNER-DECISION-V9-2.md` — superseded V9.2 visual decision record.

Do not rewrite historical decision evidence merely to make history look like the current state.

## 4. Product authority files

Product plans, visual decisions, search plans, architecture and quality evidence are subordinate to the execution constitution but authoritative inside their domain when they do not conflict with higher authority.

Important current families include:
- `docs/plans/LEADFLOWAI_AUTHORITATIVE_MASTER_PLAN_V2.md` — current Owner-approved single top-level product-completion roadmap.
- `docs/plans/LEADFLOWAI_AUTHORITATIVE_MASTER_PLAN_V1.md` — superseded top-level authority retained as historical product/delivery provenance.
- `docs/plans/V14-VISUAL-REBUILD.md` as historical/completed V14 execution evidence where so classified by current authority
- `docs/plans/V15-SEARCH-MASTER-PLAN.md` — active subordinate Search / SEO / AEO / GEO / AI Search domain plan and candidate evidence program.
- `docs/quality/V15-*`
- `docs/architecture/*`
- current scripts/contracts and implementation.

A plan marked ACTIVE/CURRENT in historical text does not override a later completed production/candidate checkpoint.

## 5. Historical material

Historical documents retain evidence value but do not regain current authority because their filename contains terms such as MASTER, CURRENT, ACTIVE, FINAL or ACCEPTANCE.

On conflict, classify chronology and authority explicitly.

## 6. Required fresh-session reading order

Before a Codex write stage in a fresh session:

1. root `AGENTS.md`
2. every applicable nested `AGENTS.md`, including `docs/governance/AGENTS.md` when governance files are read/modified
3. this index
4. Owner authority
5. Human/AI operating model
6. Codex execution contract
7. workflow contract
8. stage/gate protocol
9. prompt contract
10. Codex report contract
11. file ownership/scope policy
12. Git safety
13. evidence/PASS policy
14. Definition of Done
15. Source of Truth policy
16. Project Boundaries
17. Current State
18. current Owner Decisions
19. `docs/plans/LEADFLOWAI_AUTHORITATIVE_MASTER_PLAN_V2.md` plus exact stage-specific/subordinate authorities named by the prompt.

For a full-repository absorption pass, Codex must then read and account for the complete tracked repository before concluding.

## 7. No duplicate authority rule

New governance files must not create a second contradictory workflow.

If a new rule supersedes an older normative/current rule, update or explicitly supersede the older rule in the same bounded governance stage.

Historical evidence should be preserved rather than silently rewritten unless the file incorrectly presents itself as current operational authority.

## 8. STOP rule

If the control plane is materially contradictory, incomplete for the requested action, or inconsistent with current Git identity:

VERDICT: BLOCKER
STOP.

Do not improvise authority.
