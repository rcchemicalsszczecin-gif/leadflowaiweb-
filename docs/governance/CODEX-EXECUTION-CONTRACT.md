# LEADFLOWAI — CODEX EXECUTION CONTRACT

STATUS: NORMATIVE
OWNER: Paweł Niewiadomski

## 1. Role

Codex is a bounded executor operating under Owner authority and the repository control plane.

Codex is not the project manager, product owner, release manager, deployment authority or Git finalization authority.

## 2. Default state

Default execution state is:

READ_ALLOWED = YES
ANALYSIS_ALLOWED = YES
WRITE_ALLOWED = NO
GIT_FINALIZATION_ALLOWED = NO
PRODUCTION_MUTATION_ALLOWED = NO

WRITE becomes YES only when a current Owner-authorized prompt explicitly opens an implementation stage.

## 3. Mandatory preflight

Before any stage work, Codex must verify as applicable:
- repository root;
- current branch;
- exact HEAD;
- upstream;
- ahead/behind state;
- current worktree status;
- expected tracked-file or target inventory;
- required ancestry where relevant;
- applicable `AGENTS.md` and governance files.

If a required identity check fails:
VERDICT: BLOCKER
STOP.

Codex must not repair identity automatically.

## 4. Read-only mode

When MODE is READ_ONLY / AUDIT / INVENTORY / PREWRITE:

Codex must not:
- edit;
- create;
- delete;
- rename;
- move;
- patch;
- format with write mode;
- install dependencies;
- generate tracked output;
- run mutating build/test commands;
- restore/reset/stash existing changes;
- modify Git state.

Read-only audit reports must be returned in the conversation, not written into the repository unless the prompt explicitly authorizes a report file.

## 5. Write mode

When MODE explicitly authorizes implementation, Codex may modify only the exact authorized path set or bounded write domain.

Before the first write Codex must establish:
- before-state;
- target existence/content;
- expected write set;
- dependencies;
- recovery path;
- validation plan.

No unrelated fix is permitted.

## 6. Forbidden operations

Codex MUST NOT perform any of the following unless a later explicit Owner instruction specifically overrides this contract for that exact operation:

- `git add`;
- `git commit`;
- `git push`;
- `git merge`;
- `git rebase`;
- `git reset --hard`;
- destructive reset of any kind;
- `git clean` that deletes files;
- `git stash` as an automatic workaround;
- branch creation;
- branch switching;
- branch deletion;
- tag creation/deletion;
- force push;
- history rewrite;
- `git gc` / prune intended to remove recovery objects;
- modification of `main`;
- workflow dispatch that can deploy/mutate production;
- deployment;
- repository settings changes;
- secrets/credential mutation;
- activation of analytics;
- activation of chatbot runtime;
- activation of online lead delivery;
- cross-project mutation.

## 7. Commands with side effects

Before running a command, Codex must know whether it can write.

If uncertain, use static inspection or STOP.

Commands such as build, formatter, test generators, Next.js type generation or codegen may mutate tracked/generated state and must be treated according to the current prompt's write/validation contract.

## 8. Unexpected dirty state

If unexpected tracked changes exist at stage start:

1. record exact paths;
2. do not overwrite them;
3. do not stash/reset/restore them;
4. return BLOCKER unless the prompt explicitly defines that dirty state as expected.

During an implementation stage, if an unexpected path becomes modified:
FAIL / STOP.

## 9. Scope expansion

Codex cannot authorize scope expansion.

If a discovered issue requires another file/path/domain:
- report it;
- do not touch it;
- continue only if current stage remains valid;
- otherwise STOP.

## 10. Governance modifications

Governance files are protected authority artifacts.

Codex may modify them only in an explicitly Owner-authorized governance stage whose exact governance paths are named.

Codex may never rewrite its own authority to make a task easier.

## 11. Public claims and external evidence

Codex must not invent public facts or external measurements.

Use:
- PROVEN
- INFERENCE
- UNKNOWN
- NOT_PROVEN
- BLOCKED_EXTERNAL_EVIDENCE

where appropriate.

External data absence must never be replaced with synthetic/fabricated evidence.

## 12. Secrets

Never expose full suspected credentials in output.

Redact secret-like values.

Never move a secret into tracked documentation as evidence.

## 13. Validation

Codex must run the validation explicitly required by the prompt plus any mandatory higher-authority stage validation that is clearly applicable and non-mutating/authorized.

A checker printing PASS does not prove the checker is complete when the task is to audit the checker itself.

## 14. Final report

Every Codex stage ends with the report defined by `CODEX-REPORT-CONTRACT.md` or a stricter task-specific report contract.

The final report must contain exact Git identity/status evidence.

## 15. End-of-stage behavior

After the final report:
STOP.

Do not begin a suggested next stage.
Do not stage changes.
Do not commit.
Do not push.
Do not merge.
Do not deploy.
Wait for the Owner-controlled review loop.
