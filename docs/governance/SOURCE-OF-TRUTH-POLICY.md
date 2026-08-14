# SOURCE OF TRUTH POLICY

STATUS: NORMATIVE
OWNER: Paweł Niewiadomski

Authority is determined by role, current evidence and explicit supersession — not by filename, age, verbosity or remembered context.

## 1. Authority map

Use this order when interpreting the repository:

1. Current explicit Owner instruction.
2. Root `AGENTS.md`.
3. `docs/governance/CONTROL-PLANE-INDEX.md` and applicable current normative governance files.
4. `docs/governance/CURRENT-STATE.md` for current production/candidate/release checkpoint.
5. Current Owner decisions.
6. Current Owner-approved Master Plan and active stage plan.
7. Current architecture/quality contracts and exact committed implementation evidence.
8. Historical/reference documentation.
9. Conversation history and model memory.

Lower authority never silently overrides higher authority.

## 2. Execution authority

Execution behavior is governed by the current control plane, including:
- `AGENTS.md`;
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
- `PROJECT-BOUNDARIES.md`.

A task prompt is subordinate to this control plane.

## 3. Current production authority

Production branch is `main`.

Current `main` HEAD at this checkpoint is:

`67663b08c950de120a94ef8495b5cdc8c9bdecfe`

The production visual/runtime authority remains V14 Global Liquid World.

The V14 Global Liquid runtime milestone was merged at:

`36ad3fd6130ce21e68a2c5e701a516fcb3703b65`

Later commits on `main` through `67663b08...` are part of the current production repository state and do not revert that V14 visual authority.

Current production state is determined by `CURRENT-STATE.md` plus exact Git/Pages evidence, not by an older release narrative.

## 4. Candidate lineage

Current candidate lineage at this checkpoint is:

`main`
`67663b08c950de120a94ef8495b5cdc8c9bdecfe`

->

`v15/search-master-plan`
`5925c553bae0d59ebb7cb10043f46453fb8da8b6`

->

`post-v15/css-destack`
`5c65435f2de5b2318c1c2585a478c9595f576f76`

The V15 and post-V15 branches are candidate/development authority, not production merely because they have technical PASS evidence.

The `governance/codex-control-plane-v1` branch is an isolated governance candidate created from the post-V15 candidate. Its existence does not promote V15/post-V15 work to production.

## 5. Product/search authority

Product plan:
- `docs/plans/LEADFLOWAI_AUTHORITATIVE_MASTER_PLAN_V1.md`, interpreted through higher current governance and exact Git evidence.

V15 search/evidence program:
- `docs/plans/V15-SEARCH-MASTER-PLAN.md` and its accepted V15 quality evidence on the V15 candidate lineage.

V15 may supersede earlier search/content decisions only where evidence and the accepted stage explicitly establish that supersession.

V15 technical readiness does not fabricate external Google/Bing/AI-search evidence and does not authorize production promotion by itself.

## 6. Current visual supersession

V14 Global Liquid World supersedes V9/V9.2 visual freeze and earlier V14 assumptions where later Owner-approved V14/Global Liquid decisions explicitly changed them.

Historical design files V1–V9.2 and V10 records remain evidence/recovery references, not current visual authority when they conflict with V14 Global Liquid World.

V7 remains useful functional evidence for `/lab`; its old visual dependencies are historical rather than present visual authority.

## 7. Preserved V13 public foundation

V14 visual evolution did not automatically supersede validated V13 public-language/search/public-truth foundations.

The preserved foundation includes, unless a later evidence-backed accepted migration changes it:
- Polish public language;
- current service and knowledge registries;
- 35 service/money pages;
- 21 knowledge articles;
- 63 dominant search intents/canonical baseline;
- evidence boundaries;
- direct-answer/decision/FAQ model;
- metadata/canonical/sitemap/robots architecture;
- structured-data/public-truth consistency;
- real-only portfolio principles.

Historical V13 files do not become current release-state authority merely because parts of their public foundation remain preserved.

## 8. Implementation truth

Current implementation truth is the exact committed source at the exact revision being evaluated plus applicable validation evidence for that revision.

Do not infer implementation state from plans alone.

Do not infer production state from a feature branch.

Do not infer candidate state from production pages alone.

## 9. Public business truth

Public business truth requires current Owner-approved facts and evidence-backed claims.

No historical copy or schema may override a later validated public/legal identity.

No fabricated local address, client, metric, certification, ranking, AI citation or case study may be promoted to truth.

## 10. Historical evidence rule

Older plans, stage reports, validation records, architecture documents and superseded decisions remain provenance.

A historical file may accurately describe its original checkpoint while being wrong as a statement about today.

Terms such as CURRENT, FINAL, MASTER, ACTIVE or ACCEPTANCE in a filename do not override newer higher-authority evidence.

Historical files should be explicitly classified/superseded when their wording materially misleads current execution.

## 11. Conflict rule

On material conflict:

1. STOP the conflicting interpretation.
2. Identify exact conflicting sources/claims.
3. Classify both by the authority chain.
4. Check exact Git/release evidence and chronology.
5. Prefer higher authority/current evidence only when the hierarchy resolves the conflict unambiguously.
6. Otherwise return BLOCKER for Owner resolution.
7. Reconcile misleading normative/current documentation in a separately bounded governance stage.
8. Never allow conversation memory to silently override current repository truth.
9. Never allow a historical executable contract to force a superseded product/design assumption into current Quality.

## 12. Candidate / production separation rule

A candidate branch can be technically superior to production and still remain non-production.

PASS != MERGED.
MERGED != DEPLOYED unless the deployment path is proven.
DEPLOYED != externally indexed/measured.
READY != ACTIVE.

Every report must distinguish these states explicitly.
