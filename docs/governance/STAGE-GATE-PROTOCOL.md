# LEADFLOWAI — STAGE / GATE PROTOCOL

STATUS: NORMATIVE
OWNER: Paweł Niewiadomski

## 1. Purpose

This protocol prevents implicit continuation, scope theft and autonomous Git/release behavior.

A stage is one bounded outcome. A gate is one authorization/evidence transition inside that stage.

## 2. Standard stage sequence

G0 — READ / STATUS / INVENTORY
G1 — PREWRITE / PROPOSED TARGET
G2 — OWNER AUTHORIZATION TO IMPLEMENT
G3 — IMPLEMENTATION
G4 — VALIDATION
G5 — CODEX FINAL REPORT
G6 — CHATGPT STRICT REVIEW
G7 — OWNER REVIEW
G8 — OWNER EXACT-PATH STAGING
G9 — OWNER COMMIT AUTHORIZATION + COMMIT
G10 — OWNER PUSH AUTHORIZATION + PUSH
G11 — POST-PUSH VALIDATION
G12 — NEXT-STAGE DECISION

Not every stage requires every gate, but any skipped gate must be explicitly irrelevant or explicitly waived by the Owner.

## 3. Gate isolation

Passing one gate never authorizes the next.

Examples:
- READ PASS does not authorize WRITE.
- WRITE PASS does not authorize `git add`.
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

## 6. G2 — Owner authorization

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
- do not stage/commit/push;
- do not opportunistically fix other findings;
- stop on unexpected changed paths;
- preserve public-truth/security boundaries.

## 8. G4 — Validation

Validation must be proportional to blast radius and defined before conclusion.

A stage is not PASS because code looks correct.

Validation may be targeted plus cross-cutting/full checks when required.

If a validator itself mutates tracked state, that mutation must be anticipated and handled under the stage contract; otherwise STOP.

## 9. G5 — Codex final report

Codex returns exact evidence using `CODEX-REPORT-CONTRACT.md`.

Codex then stops.

## 10. G6 — ChatGPT strict review

ChatGPT independently checks:
- scope compliance;
- report consistency;
- evidence quality;
- suspicious omissions;
- overclaims;
- validation sufficiency;
- whether the next gate is legal.

ChatGPT may return PASS, PASS_WITH_WARNINGS, FAIL or BLOCKER to the Owner.

## 11. G7 — Owner review

The Owner decides whether the implementation is accepted for Git finalization.

Owner may:
- accept;
- reject;
- request corrections;
- hold;
- abandon;
- authorize exact staging.

## 12. G8 — Owner exact-path staging

Default:
- stage only exact reviewed paths;
- inspect staged diff;
- verify no unrelated paths.

Broad staging is prohibited by default.

## 13. G9 — Commit

Commit occurs only after explicit Owner commit authority.

Commit message should identify the bounded stage outcome.

Post-commit verify:
- HEAD changed as expected;
- worktree status;
- committed path set.

## 14. G10 — Push

Push occurs only after explicit Owner push authority.

No force push unless explicitly authorized for a specific recovery operation.

## 15. G11 — Post-push validation

Verify as applicable:
- remote branch identity;
- exact pushed SHA;
- CI result;
- PR state;
- no accidental deployment;
- production unchanged unless deployment was separately authorized.

## 16. G12 — Next-stage decision

Only after current-stage review/finalization does ChatGPT propose the next bounded stage and the Owner decide whether to authorize it.

## 17. Failure behavior

FAIL or BLOCKER does not authorize cleanup by improvisation.

Return:
- exact failed gate;
- evidence;
- changed paths if any;
- safe recovery options;
- STOP.

## 18. 1000% rule

Maximum completeness is required inside the authorized gate/stage.

It is never a license to expand into adjacent stages.
