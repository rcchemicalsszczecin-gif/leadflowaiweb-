# WORKFLOW CONTRACT

STATUS: NORMATIVE
OWNER: Paweł Niewiadomski

## 1. Canonical lifecycle

READ / STATUS / INVENTORY
-> PREWRITE
-> OWNER AUTHORIZATION
-> IMPLEMENTATION
-> VALIDATION
-> CODEX FINAL REPORT
-> CHATGPT STRICT REVIEW
-> OWNER REVIEW
-> OWNER EXACT-PATH STAGING
-> OWNER COMMIT AUTHORIZATION + COMMIT
-> OWNER PUSH AUTHORIZATION + PUSH
-> POST-PUSH VALIDATION
-> NEXT-STAGE DECISION

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

ChatGPT performs strict review before Owner Git finalization.

The Owner makes the final stage decision.

## 8. Git finalization

Codex does not stage, commit or push in the normal workflow.

Owner-controlled finalization occurs only after review and uses exact-path staging by default.

Commit, push, merge and deployment are separate authority transitions.

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
