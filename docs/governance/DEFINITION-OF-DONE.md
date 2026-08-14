# LEADFLOWAI — DEFINITION OF DONE

STATUS: NORMATIVE
OWNER: Paweł Niewiadomski

## 1. Purpose

"Done" is phase-specific. A stage is not done because implementation exists, and a commit is not done because tests passed before it.

## 2. Read / audit stage Done

A read-only stage is Done only when:
- repository identity was verified;
- required authority was read;
- requested inventory/coverage is complete;
- evidence and uncertainty are separated;
- no repository mutation occurred;
- final Git proof matches start state;
- final report was delivered;
- Codex stopped.

For a full-repository absorption stage, every tracked file must be accounted for or explicitly listed as skipped/unreadable with reason.

## 3. Prewrite stage Done

A prewrite is Done only when it specifies:
- exact problem/objective;
- target scope;
- non-scope;
- path set/domain;
- dependencies;
- recovery;
- validation;
- risks;
- expected evidence;
- STOP conditions.

Prewrite completion does not authorize implementation.

## 4. Implementation stage Done

Implementation is Done only when:
- only authorized paths changed;
- intended behavior/content exists;
- no known stage requirement is omitted;
- no placeholders/TODOs/TBDs were introduced unless explicitly required;
- relevant invariants are preserved;
- no fabricated public truth is introduced;
- implementation is ready for defined validation.

Implementation Done does not authorize staging/commit/push.

## 5. Validation stage Done

Validation is Done only when:
- all required checks ran or are explicitly classified as blocked/not applicable;
- failures are not hidden;
- warnings are recorded;
- unexpected mutations from validators are resolved only through authorized procedure;
- evidence is tied to current HEAD/worktree state;
- material cross-cutting risks are checked proportionally.

If a material required check cannot run, PASS is not legal unless higher authority explicitly defines an alternative proof.

## 6. Codex stage Done

A Codex stage is Done only when:
- implementation/analysis scope is complete;
- validation requirements are satisfied or accurately blocked;
- exact changed paths are reported;
- Git finalization actions remain unperformed;
- final Git proof is included;
- report follows the current report contract;
- Codex stops.

## 7. Strict review Done

ChatGPT strict review is Done only when it has evaluated:
- scope compliance;
- authority compliance;
- evidence quality;
- validation sufficiency;
- public-truth/security risk;
- unexpected paths;
- whether Codex overclaimed PASS;
- legal next action.

## 8. Owner review Done

Owner review is Done when the Owner explicitly decides one of:
- ACCEPT FOR STAGING
- REVISE
- REJECT
- HOLD
- ABANDON

No decision may be inferred from silence.

## 9. Commit Done

Commit phase is Done only when:
- exact reviewed paths were staged;
- staged diff was inspected;
- commit authority was explicit;
- commit was created with bounded message;
- committed path set matches authorization;
- resulting HEAD is recorded;
- worktree state is checked.

## 10. Push Done

Push phase is Done only when:
- push authority was explicit;
- intended branch/ref was pushed;
- remote SHA matches expected local SHA;
- no force push occurred unless explicitly authorized;
- post-push CI/repository state is checked as required.

## 11. Merge Done

Merge to `main` is Done only when:
- Owner merge authority is explicit;
- exact candidate is identified;
- required acceptance evidence exists;
- merge result SHA is recorded;
- production deployment behavior is understood;
- post-merge validation is completed.

## 12. Deployment Done

Deployment is Done only when:
- Owner deployment authority is explicit or an explicitly Owner-approved merge is documented to auto-deploy;
- exact deployed SHA is proven;
- deployment workflow concludes successfully;
- production checks pass;
- rollback point is known;
- no unapproved feature activation occurred.

## 13. Status vocabulary

PASS — all material required evidence passed.

PASS_WITH_WARNINGS — outcome is acceptable, but non-blocking verified warnings remain.

FAIL — stage requirement was violated or validation failed.

BLOCKER — safe/legal continuation is not possible without new authority/evidence/recovery.

NOT_PROVEN — evidence is insufficient for a claim.

BLOCKED_EXTERNAL_EVIDENCE — repository cannot prove the required external state.

OUT_OF_SCOPE — real finding intentionally not addressed in current stage.

## 14. 1000% completion rule

A 1000% stage means every requirement inside the authorized scope is completed and evidenced.

It does not mean expanding the scope until no conceivable improvement remains.
