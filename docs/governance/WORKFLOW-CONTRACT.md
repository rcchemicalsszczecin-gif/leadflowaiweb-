# WORKFLOW CONTRACT

STATUS: NORMATIVE

OWNER DECISION -> ACTIVE_STAGE -> BEFORE-STATE -> RECOVERY -> IMPLEMENTATION -> VALIDATION -> VERDICT -> STOP.

## Active stage model
Each stage defines:
- exact stage objective;
- included gates/outcomes;
- forbidden work;
- exact path set or bounded write domain;
- dependencies and blast radius;
- recovery strategy;
- validation matrix;
- exit criteria.

A stage may touch any number of files necessary to achieve the approved stage outcome. FILE COUNT != SCOPE.

## Write models
- EXACT_PATH_SET — default for known changes.
- BOUNDED_WRITE_DOMAIN — only where generated/unknown outputs require it.
- HYBRID — exact source/config plus constrained generated outputs.

Unexpected changed path => FAIL/STOP unless the Owner explicitly expands scope.

## Before-state
Record relevant branch, HEAD, upstream identity, repository status, target existence/content and dependencies.

## Recovery
Recovery must be proportional to blast radius. Feature-branch work is preferred so `main` remains a clean rollback point.

## Validation
Use minimum, subsystem, cross-cutting or full validation based on risk. Full validation is not triggered by file count alone.

1000% means maximum completeness inside the current authorized stage, never uncontrolled scope expansion.

Statuses: PASS / FAIL / BLOCKER / NOT_SAFELY_TESTABLE / OUT_OF_SCOPE.
