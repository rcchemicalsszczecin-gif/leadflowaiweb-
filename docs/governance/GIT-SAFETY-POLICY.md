# GIT SAFETY POLICY

STATUS: NORMATIVE
OWNER: Paweł Niewiadomski

## 1. Preflight

Before any mutation, verify:
- repository root;
- current branch;
- exact HEAD;
- upstream;
- ahead/behind where relevant;
- worktree status;
- expected stage base.

Wrong identity or unexpected dirty state => BLOCKER / STOP.

Do not automatically stash/reset/restore unknown work.

## 2. Main protection by policy

Direct mutation of `main` is prohibited without explicit Owner instruction.

No force-push or history rewrite unless the Owner explicitly authorizes one exact recovery operation.

Repository-settings branch protection is preferred but policy remains binding even when GitHub settings do not technically enforce it.

## 3. Codex Git boundary

By default Codex MUST NOT:
- `git add`;
- `git commit`;
- `git push`;
- `git merge`;
- `git rebase`;
- create/switch/delete branches;
- create/delete tags;
- force push;
- run destructive reset;
- run destructive `git clean`;
- run `git gc`/prune as cleanup;
- deploy.

An active Owner/Controller-authorized work package may explicitly grant exact-path staging, bounded commit and a normal fast-forward push to one named non-production branch. When granted, Codex must verify every prerequisite, use only the enumerated paths, audit the staged/committed path set, recheck the remote immediately before push and prove post-push synchronization.

No work package grants force push, direct push/merge to `main`, history rewrite or deployment by implication.

## 4. Delegated work-package finalization sequence

When the active work package grants Git finalization:

1. Codex verifies the changed paths equal the authorized set.
2. Codex stages only exact authorized paths.
3. Codex inspects and verifies the staged diff.
4. Codex creates the bounded truthful commit authorized by the package.
5. Codex verifies the resulting HEAD and committed path set.
6. Codex proves the named remote branch has not moved unexpectedly.
7. Codex performs a normal fast-forward push to that named non-production branch.
8. Codex verifies remote/CI/provider state required by the package and reports exact evidence.
9. ChatGPT performs strict post-execution review.
10. Merge to `main`, deployment and the next work package remain separate Owner/Controller decisions.

## 5. Exact-path staging

Default:
- `git add <exact-path> ...`

Prohibited by default:
- `git add .`
- `git add -A`

For large authorized path sets, use a reviewed explicit list rather than broad repository staging.

## 6. Unexpected paths

Actual changed paths must match stage scope.

Unexpected changed tracked path => FAIL / STOP.

Do not hide unexpected paths in the same commit.

## 7. Recovery

Prefer non-destructive recovery based on:
- known base SHA;
- exact path inventory;
- feature-branch isolation;
- preserved evidence;
- Owner-approved restore/revert.

Dangling/unreachable objects are not an instruction to prune them.

## 8. Secrets

No secrets in Git.

Potential secret discovery must be redacted in reports and escalated.

## 9. Commit discipline

One commit should represent one coherent reviewed stage outcome when practical.

No unrelated changes.
No opportunistic cleanup.
No misleading commit message.

## 10. Push / merge / deploy separation

IMPLEMENTATION != STAGING AUTHORITY.
STAGING != COMMIT AUTHORITY.
COMMIT != PUSH AUTHORITY.
PUSH != MERGE AUTHORITY.
MERGE != DEPLOY AUTHORITY unless the Owner explicitly approves a known auto-deploy path.

Every transition requires current evidence and explicit authority in the active work package.
