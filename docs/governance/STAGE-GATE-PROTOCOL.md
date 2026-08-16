# LEADFLOWAI — STAGE / GATE PROTOCOL

STATUS: NORMATIVE
OWNER: Paweł Niewiadomski

## 1. Purpose

This protocol prevents implicit continuation, scope theft and autonomous Git/release behavior.

A stage is one bounded outcome. A gate is one authorization/evidence transition inside that stage.

## 2. Standard stage sequence

G0 — READ / STATUS / INVENTORY
G1 — PREWRITE / PROPOSED TARGET
G2 — OWNER / CONTROLLER WORK-PACKAGE AUTHORIZATION
G3 — IMPLEMENTATION
G4 — VALIDATION
G5 — CODEX EXACT-PATH STAGING WHEN AUTHORIZED
G6 — CODEX BOUNDED COMMIT WHEN AUTHORIZED
G7 — CODEX NORMAL PUSH TO AUTHORIZED NON-PRODUCTION BRANCH WHEN AUTHORIZED
G8 — POST-PUSH VALIDATION
G9 — CODEX FINAL REPORT
G10 — CHATGPT STRICT POST-EXECUTION REVIEW
G11 — OWNER / CONTROLLER REVIEW
G12 — NEXT-STAGE DECISION

Not every stage requires every gate, but any skipped gate must be explicitly irrelevant or explicitly waived by the Owner.

## 3. Gate isolation

Passing one gate never authorizes the next.

Examples:
- READ PASS does not authorize WRITE.
- WRITE PASS does not authorize `git add` unless the active work package separately grants staging after validation.
- validation PASS does not authorize commit.
- commit does not authorize push.
- push does not authorize merge.
- merge does not authorize deployment.
- implementation does not authorize feature activation.

## 4. G0 — Read / status / inventory

Purpose:
- verify repository identity;
- read applicable authority;
- recover current state;
- inventory target and dependencies;
- detect blockers before mutation.

Expected output:
- current branch/HEAD/status;
- source-of-truth interpretation;
- target inventory;
- discovered conflicts/risks;
- legal next gate.

No writes unless explicitly included in a different mode.

## 5. G1 — Prewrite

Purpose:
- specify exact intended change before implementation.

A prewrite should define:
- problem;
- objective;
- exact paths/domain;
- proposed behavior/content;
- dependencies;
- non-scope;
- validation;
- risks;
- recovery;
- expected final diff shape.

Prewrite is not implementation authority.

## 6. G2 — Owner / Controller work-package authorization

The Owner authorizes one bounded implementation target.

Authority must be specific enough that the Executor can know:
- what outcome is approved;
- where it may write;
- what is forbidden;
- what proof is required.

Ambiguous approval must not be stretched into broad authority.

## 7. G3 — Implementation

Codex may write only inside the approved target.

During implementation:
- preserve unrelated state;
- do not stage/commit/push unless and until the active work package's separate finalization prerequisites pass;
- do not opportunistically fix other findings;
- stop on unexpected changed paths;
- preserve public-truth/security boundaries.

## 8. G4 — Validation

Validation must be proportional to blast radius and defined before conclusion.

A stage is not PASS because code looks correct.

Validation may be targeted plus cross-cutting/full checks when required.

If a validator itself mutates tracked state, that mutation must be anticipated and handled under the stage contract; otherwise STOP.

## 9. G5–G8 — Delegated Git finalization and post-push proof

When expressly authorized by the active work package, Codex:
- stages exact reviewed paths only and verifies the staged set;
- creates the bounded truthful commit;
- proves remote fast-forward safety;
- normally pushes only the named non-production branch;
- validates the remote and any package-required provider state.

No skipped transition is inferred. Broad staging and force push remain prohibited.

## 10. G9 — Codex final report

Codex returns exact evidence using `CODEX-REPORT-CONTRACT.md` or the stricter active-package report and then stops.

## 11. G10 — ChatGPT strict post-execution review

ChatGPT independently checks scope compliance, report consistency, evidence quality, suspicious omissions, overclaims, validation sufficiency and whether a next gate is legal. ChatGPT may return PASS, PASS_WITH_WARNINGS, FAIL or BLOCKER to the Owner.

## 12. G11 — Owner / Controller review

The Owner remains final authority. The Owner/Controller may accept, reject, request corrections, hold, abandon or authorize a new bounded work package. Main merge and deployment remain separate retained Owner decisions.

## 13. Exact-path staging requirements

When delegated, stage only exact reviewed paths, inspect the staged diff and verify no unrelated paths. Broad staging is prohibited by default.

## 14. Commit requirements

Commit occurs only when explicitly delegated by the active work package. The message identifies the bounded outcome, and post-commit proof covers HEAD, worktree and committed paths.

## 15. Push requirements

Push occurs only when explicitly delegated to one named non-production branch by the active work package. No force push unless explicitly authorized for one exact recovery operation.

## 16. G8 — Post-push validation

Verify as applicable:
- remote branch identity;
- exact pushed SHA;
- CI result;
- PR state;
- no accidental deployment;
- production unchanged unless deployment was separately authorized.

## 17. G12 — Next-stage decision

Codex never self-authorizes a successor. Only after current-package execution and strict review may the Owner/Controller authorize the next bounded work package.

## 18. Failure behavior

FAIL or BLOCKER does not authorize cleanup by improvisation.

Return:
- exact failed gate;
- evidence;
- changed paths if any;
- safe recovery options;
- STOP.

## 19. 1000% rule

Maximum completeness is required inside the authorized gate/stage.

It is never a license to expand into adjacent stages.
