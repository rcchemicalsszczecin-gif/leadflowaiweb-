# LEADFLOWAI — CODEX PROMPT CONTRACT

STATUS: NORMATIVE
OWNER: Paweł Niewiadomski

## 1. Purpose

Every Codex prompt must function as a bounded execution contract, not as an open-ended request.

Prompts are written in English by default.

## 2. Mandatory prompt sections

A normal Codex prompt must define, as applicable:

1. PROMPT ID / STAGE ID
2. MODE
3. REPOSITORY IDENTITY
4. EXPECTED BRANCH
5. EXPECTED HEAD / BASE
6. EXPECTED UPSTREAM / ANCESTRY
7. AUTHORITY SOURCES / REQUIRED READS
8. OBJECTIVE
9. PREREQUISITES
10. EXACT TARGET
11. ALLOWED SCOPE
12. EXACT WRITE SET or BOUNDED WRITE DOMAIN
13. NON-SCOPE
14. FORBIDDEN OPERATIONS
15. BEFORE-STATE EVIDENCE
16. RECOVERY PLAN
17. IMPLEMENTATION RULES
18. VALIDATION MATRIX
19. EVIDENCE REQUIREMENTS
20. STOP CONDITIONS
21. FINAL REPORT CONTRACT
22. FINAL GIT PROOF
23. STOP

A prompt may be longer when the stage is complex, but missing control information must not be hidden by verbosity.

## 3. Mode definitions

### READ_ONLY
May inspect and analyze. No repository writes.

### INVENTORY
May enumerate/classify evidence. No repository writes unless an explicit external report artifact is separately authorized.

### PREWRITE
Produces a proposed implementation/specification. No repository writes by default.

### WRITE
May modify only the exact authorized write set/domain.

### DELEGATED_WORK_PACKAGE
May combine bounded write, validation, exact-path staging, bounded commit, normal push to one named non-production branch, external evidence and an exact provider mutation only when each capability, prerequisite and recovery boundary is explicitly stated.

### VALIDATION
May run explicitly authorized validation. Mutating validators must be declared before execution.

### REVIEW
Inspects an existing implementation/diff. Does not modify unless explicitly changed to WRITE mode.

No prompt may rely on an implied mode.

## 4. Repository identity gate

Every material prompt must tell Codex how to prove it is operating on the intended repository state.

For write stages, exact branch and exact expected HEAD/base are strongly preferred.

Wrong repository, wrong branch, wrong HEAD or unexpected dirty state => BLOCKER / STOP unless the prompt explicitly defines a recovery operation.

## 5. Required reads

A prompt must name stage-specific authority beyond the base governance set when needed.

For a fresh session, the root control-plane reading order in `AGENTS.md` applies.

For a full-repository absorption pass, the prompt must require complete tracked-file accounting before conclusions.

## 6. Exact target rule

The target must describe one coherent outcome.

Bad target:
"Improve the repo and fix anything you find."

Good target:
"Audit the complete current tracked repository read-only and return a coverage-proven report."

Good implementation target:
"Correct the exact governance drift in the named files without modifying runtime source."

## 7. Write-set rule

Use `EXACT_PATH_SET` whenever paths are knowable.

Use `BOUNDED_WRITE_DOMAIN` only when exact generated outputs cannot safely be known in advance.

Use `HYBRID` only when the prompt explicitly separates exact source paths from constrained generated outputs.

Unexpected changed path => FAIL / STOP.

## 8. Non-scope

Every write prompt must state important non-scope explicitly.

Common non-scope includes:
- unrelated refactors;
- dependency changes;
- visual redesign;
- copy changes;
- canonical/route migrations;
- analytics/chat/lead activation;
- CI changes;
- deployment;
- Git finalization unless the active work package explicitly delegates exact-path staging, bounded commit and a named non-production push target.

## 9. Forbidden operations

The prompt must preserve at least the restrictions of `CODEX-EXECUTION-CONTRACT.md` and explicitly identify any exact Owner-authorized work-package exception.

A prompt cannot silently weaken higher authority.

## 10. Recovery

Write prompts must define how to recover from failure without destructive improvisation.

Recovery should normally be based on:
- known clean base/HEAD;
- exact changed paths;
- feature-branch isolation;
- Owner review;
- non-destructive restore only when specifically authorized.

## 11. Validation

Prompts must specify validation proportional to risk.

Do not use "run all tests" as a substitute for understanding the applicable validation surface.

Validation may include:
- targeted syntax/type/lint;
- contract scripts;
- full `npm run verify`;
- static export;
- browser matrix;
- screenshots/visual preview;
- route/performance checks;
- security checks;
- exact-path diff checks;
- public-truth/search assertions.

## 12. Evidence

Prompts must require exact evidence, not narrative confidence.

Examples:
- exact SHA;
- exact branch;
- exact paths;
- test commands and outcomes;
- counts;
- route inventories;
- diff summary;
- final Git status.

## 13. Stop conditions

A prompt must tell Codex when to stop.

Typical stop conditions:
- identity mismatch;
- dirty start outside expected state;
- unexpected path mutation;
- authority conflict;
- secret exposure;
- required validation unavailable;
- destructive action would be required;
- external evidence unavailable for a claim.

## 14. Bounded self-approval; no new authority

Codex may self-approve routine work-package substeps only by proving their declared prerequisites. It must not ask mid-run for permission to broaden scope and then continue automatically, and it may never create new authority, select a successor gate or cross a retained Owner boundary.

If a new stage is required, finish/stop the current stage and return evidence to the Owner-controlled loop.

## 15. Final report

The prompt must invoke `CODEX-REPORT-CONTRACT.md` or provide a stricter report structure.

The report must end with final Git proof and STOP.

## 16. First-session rule for LeadFlowAIWeb

Before the first implementation performed by a new Codex context/session, the preferred bootstrap is a full read-only repository absorption:

CONTROL PLANE ABSORPTION
-> COMPLETE TRACKED FILE INVENTORY
-> COMPLETE CURRENT-HEAD UNDERSTANDING
-> HISTORY / AUTHORITY RECOVERY
-> ARCHITECTURE / BUSINESS / SEO / AEO / GEO / VISUAL / SECURITY / CI AUDIT
-> COVERAGE PROOF
-> FINAL REPORT
-> STOP

No write stage is inferred from completing that audit.
