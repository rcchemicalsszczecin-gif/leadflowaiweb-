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

Under the normal Owner-controlled workflow Codex MUST NOT:
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

Codex implementation ends with an unstaged reviewed diff and final Git proof.

## 4. Owner finalization sequence

After ChatGPT strict review and Owner acceptance:

1. Owner verifies changed paths.
2. Owner stages exact approved paths.
3. Owner inspects staged diff.
4. Owner explicitly authorizes/creates commit.
5. Owner records resulting HEAD.
6. Owner explicitly authorizes push.
7. Owner pushes intended branch.
8. Post-push remote/CI evidence is checked.
9. Merge/deployment remain separate Owner decisions.

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

COMMIT != PUSH AUTHORITY.
PUSH != MERGE AUTHORITY.
MERGE != DEPLOY AUTHORITY unless the Owner explicitly approves a known auto-deploy path.

Every transition requires current evidence and Owner authority.
