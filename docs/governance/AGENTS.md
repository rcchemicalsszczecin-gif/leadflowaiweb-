# LEADFLOWAI — GOVERNANCE SUBTREE AGENT RULES

STATUS: NORMATIVE WITHIN `docs/governance/**`
PARENT AUTHORITY: root `AGENTS.md`
OWNER: Paweł Niewiadomski

These rules apply to every agent operating on files under `docs/governance/**`.

They refine but never override the root `AGENTS.md`.

## 1. Default mode

Governance is READ-ONLY by default.

Codex may modify governance only when the current Owner-authorized stage explicitly names a governance objective and exact governance path set/domain.

## 2. No self-authorization

An agent may never invent or enlarge its own authority, weaken STOP rules, bypass review or retroactively legalize an out-of-scope action. It may record an explicit current Owner decision that delegates bounded execution or Git finalization through an exact active work package; that is Owner delegation, not agent self-authorization.

## 3. Mandatory consistency check

Any governance write stage must inspect all directly affected normative relationships, especially:
- root `AGENTS.md`;
- `CONTROL-PLANE-INDEX.md`;
- `OWNER-AUTHORITY.md`;
- `HUMAN-AI-OPERATING-MODEL.md`;
- `CODEX-EXECUTION-CONTRACT.md`;
- `WORKFLOW-CONTRACT.md`;
- `STAGE-GATE-PROTOCOL.md`;
- `PROMPT-CONTRACT.md`;
- `CODEX-REPORT-CONTRACT.md`;
- `FILE-OWNERSHIP-AND-SCOPE-POLICY.md`;
- `GIT-SAFETY-POLICY.md`;
- `EVIDENCE-PASS-POLICY.md`;
- `DEFINITION-OF-DONE.md`;
- `SOURCE-OF-TRUTH-POLICY.md`;
- `PROJECT-BOUNDARIES.md`;
- `CURRENT-STATE.md`.

Do not leave two normative files giving materially incompatible instructions.

## 4. Historical vs normative

Do not rewrite historical evidence merely to make history look consistent with current policy.

When an old file is historically accurate but operationally misleading, prefer explicit classification/supersession over falsifying its historical checkpoint.

## 5. Current-state evidence

`CURRENT-STATE.md` must be tied to exact current Git/release evidence.

Do not write a candidate state as production.
Do not write a successful feature-branch test as deployment proof.
Do not fabricate external evidence.

## 6. Governance write validation

At minimum a governance write stage must prove:
- exact changed governance paths;
- no unexpected runtime/source/workflow/package changes unless separately authorized;
- no material contradiction introduced across normative files;
- no accidental weakening of Owner authority;
- no accidental or package-exceeding Codex staging/commit/push/merge/deploy authority;
- final Git identity/status.

## 7. STOP

If a requested governance change conflicts with root authority or would require the agent to create authority not explicitly delegated by the Owner:

VERDICT: BLOCKER
STOP.
