# WORKFLOW CONTRACT

STATUS: NORMATIVE
OWNER: Paweł Niewiadomski

## 1. Canonical lifecycle

READ / STATUS / INVENTORY
-> PREWRITE
-> OWNER / CONTROLLER WORK-PACKAGE AUTHORIZATION
-> IMPLEMENTATION
-> VALIDATION
-> CODEX EXACT-PATH STAGING WHEN AUTHORIZED
-> CODEX BOUNDED COMMIT WHEN AUTHORIZED
-> CODEX NORMAL PUSH TO AUTHORIZED NON-PRODUCTION BRANCH WHEN AUTHORIZED
-> POST-PUSH VALIDATION
-> CODEX FINAL REPORT
-> CHATGPT STRICT POST-EXECUTION REVIEW
-> OWNER / CONTROLLER NEXT-WORK-PACKAGE DECISION

No transition is implicit.

## 2. Active stage model

Each stage defines:
- exact objective;
- MODE;
- repository identity/base;
- included gates/outcomes;
- forbidden work;
- exact path set or bounded write domain;
- non-scope;
- dependencies/blast radius;
- before-state;
- recovery strategy;
- validation matrix;
- evidence requirements;
- exit criteria;
- STOP semantics;
- required report structure.

A stage may touch any number of files necessary for the approved outcome.

FILE COUNT != SCOPE.

1000% means maximum completeness inside the current authorized stage, never uncontrolled expansion.

## 3. Write models

### EXACT_PATH_SET
Default for known changes.

### BOUNDED_WRITE_DOMAIN
Exception when generated/unknown outputs make exact pre-enumeration impossible.

### HYBRID
Exact source/config paths plus explicitly constrained generated outputs.

Unexpected changed path => FAIL / STOP unless the Owner explicitly expands scope in a new instruction.

## 4. Before-state

Record relevant:
- repository root;
- branch;
- HEAD;
- upstream/ahead-behind;
- worktree status;
- target existence/content;
- dependencies;
- known generated-state hazards.

## 5. Recovery

Recovery must be defined before risky writes and proportional to blast radius.

Feature-branch isolation is preferred.

Do not improvise destructive recovery after failure.

## 6. Validation

Use targeted, subsystem, cross-cutting or full validation based on semantic risk/blast radius, not file count alone.

A validation command known to mutate tracked state must be explicitly accounted for.

## 7. Review

Codex self-report is not final acceptance.

ChatGPT performs strict post-execution review after the bounded execution and any Git finalization explicitly delegated by the active work package.

The Owner remains final authority; the Owner/Controller defines any next work package.

## 8. Git finalization

Codex does not stage, commit or push by default. An active work package may delegate exact-path staging, bounded commit and normal push to an exact non-production branch after its prerequisite validations pass.

Delegated finalization uses exact-path staging, staged-diff verification, truthful bounded commits, pre-push remote-drift checks and post-push proof.

Staging, commit, push, merge and deployment remain separate authority transitions. Package authority for one does not imply another; merge to `main` and deployment remain retained Owner decisions unless separately and exactly authorized.

## 9. Statuses

Use:
- PASS
- PASS_WITH_WARNINGS
- FAIL
- BLOCKER
- NOT_PROVEN
- BLOCKED_EXTERNAL_EVIDENCE
- OUT_OF_SCOPE

## 10. STOP semantics

On BLOCKER, unexpected path mutation, material authority conflict, secret risk or unsafe recovery requirement:

STOP.

Report evidence and safe options.
Do not continue automatically.
