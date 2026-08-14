# LEADFLOWAI — CODEX REPORT CONTRACT

STATUS: NORMATIVE
OWNER: Paweł Niewiadomski

## 1. Purpose

Every Codex run must end in a report that is reviewable by ChatGPT and the Owner without reconstructing hidden assumptions.

The task-specific prompt may add sections but should not remove material evidence required here.

## 2. Mandatory verdict

Use one primary verdict:
- PASS
- PASS_WITH_WARNINGS
- FAIL
- BLOCKER

Use supporting evidence classifications when needed:
- PROVEN
- INFERENCE
- UNKNOWN
- NOT_PROVEN
- BLOCKED_EXTERNAL_EVIDENCE
- OUT_OF_SCOPE

## 3. Mandatory identity block

Report:
- repository root;
- branch;
- START_HEAD;
- END_HEAD;
- upstream;
- ahead/behind if relevant;
- start worktree state;
- end worktree state.

If the task was read-only, START_HEAD must equal END_HEAD and no repository mutation may exist.

## 4. Authority / reads

List:
- applicable AGENTS/governance read;
- stage-specific authority read;
- any authority conflict found;
- any authority intentionally not resolved because Owner action is required.

## 5. Scope result

Report:
- exact objective;
- expected path set/domain;
- actual changed paths;
- files created;
- files modified;
- files deleted;
- unexpected paths;
- out-of-scope findings reported but not touched.

## 6. Implementation result

For write stages explain:
- what changed;
- why;
- important behavior/invariants preserved;
- any deviation from prewrite and why it was legal.

For read-only stages explain:
- what was inspected;
- coverage proof;
- what could not be proven.

## 7. Validation result

For each material validation item report:
- command/check;
- purpose;
- outcome;
- PASS/FAIL/BLOCKED;
- material warnings;
- whether the check mutated state.

Do not summarize a failed command as PASS because later commands succeeded.

## 8. Evidence

Include exact evidence needed for review:
- SHAs;
- counts;
- paths;
- test names/results;
- route/file inventories;
- diff summary;
- browser/static-export/security evidence where applicable.

## 9. Risks and unknowns

List:
- known risks;
- unresolved unknowns;
- external evidence gaps;
- deferred issues;
- discovered out-of-scope issues with severity.

## 10. Git boundary

Codex must explicitly state that it did or did not perform:
- staging;
- commit;
- push;
- merge;
- deployment.

Expected normal result:
STAGED_BY_CODEX = NO
COMMIT_BY_CODEX = NO
PUSH_BY_CODEX = NO
MERGE_BY_CODEX = NO
DEPLOY_BY_CODEX = NO

## 11. Recommended next action

Codex may recommend exactly one next bounded stage when the prompt requests it.

Recommendation is not authorization.

Do not begin it.

## 12. Final Git proof

At the very end, report results equivalent to:

- `git branch --show-current`
- `git rev-parse HEAD`
- `git status --short --branch`
- `git diff --name-only`
- `git diff --stat`

For a write stage before Owner Git finalization, the diff must contain only authorized paths.

For a read-only stage, the repository must match the initial state.

## 13. Final STOP

End with an explicit STOP statement.

Do not continue to implementation, staging, commit, push, merge or deployment after the report.
