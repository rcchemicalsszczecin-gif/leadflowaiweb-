# EVIDENCE / PASS POLICY

STATUS: NORMATIVE
OWNER: Paweł Niewiadomski

## 1. Core rule

A declaration is not evidence.

NO EVIDENCE = NO PASS.

PASS is legal only when current evidence proves the material requirements of the current stage against the exact repository state being evaluated.

## 2. Evidence identity

Stage evidence must be tied, as applicable, to:
- repository root;
- branch;
- exact HEAD/base;
- upstream/ahead-behind state;
- initial worktree state;
- exact target/path set/domain;
- final worktree state.

Evidence from another branch, commit, generated artifact or historical checkpoint must not be presented as proof of current state without explicit equivalence proof.

## 3. Historical evidence

Historical PASS is useful provenance, not current proof.

A previous successful build, browser test, audit or workflow does not prove a later revision unless the relevant state is proven identical or the check is rerun against the current revision.

## 4. Read-only audit evidence

A read-only audit must prove:
- repository identity;
- required authority was read;
- requested inventory/coverage was completed;
- skipped/partial/unreadable items are enumerated;
- facts are separated from inference;
- final Git state equals the initial state.

A full-repository audit may not claim full coverage unless every tracked path is accounted for.

## 5. Implementation evidence

For a write stage, evidence must include as applicable:
- before-state;
- exact changed-file inventory;
- exact diff or equivalent semantic compare;
- proof that unexpected paths did not change;
- validation results;
- preserved invariants;
- after-state Git proof.

## 6. Validation evidence

For each material validation requirement report:
- exact command/check;
- what it proves;
- result;
- warnings/failures;
- whether it mutated generated/tracked state;
- any material blind spot.

A checker printing `PASS` is evidence that the checker passed, not automatically evidence that the checker is complete.

## 7. Cross-cutting evidence

Apply proportionally when relevant:
- type/lint/static build;
- semantic/public-truth checks;
- SEO/canonical/sitemap/robots checks;
- AEO/GEO/public-truth checks;
- structured-data checks;
- accessibility checks;
- performance checks;
- security checks;
- browser/rendered checks;
- route/inventory checks;
- changed-path checks;
- deployment/remote identity checks.

## 8. External evidence boundary

Repository evidence cannot prove every external state.

Use `BLOCKED_EXTERNAL_EVIDENCE` for facts requiring systems such as:
- Google Search Console;
- Bing Webmaster Tools;
- live index/ranking/CTR data;
- field Core Web Vitals/CrUX;
- analytics/conversion data;
- real AI-search citations;
- backlink/business-profile state.

Never replace missing external evidence with synthetic/fabricated measurements.

## 9. Status vocabulary

### PASS
All material current-stage requirements are proven.

### PASS_WITH_WARNINGS
Material stage requirements are proven, but non-blocking evidence-backed warnings remain.

### FAIL
A material requirement failed or scope/validation rules were violated.

### BLOCKER
Safe/legal continuation requires new authority, recovery or missing prerequisite evidence.

### NOT_PROVEN
A claim cannot be established from available evidence.

### BLOCKED_EXTERNAL_EVIDENCE
The claim depends on unavailable external-system evidence.

### OUT_OF_SCOPE
A real finding is intentionally outside the current authorized stage.

## 10. Evidence confidence

When useful classify conclusions as:
- PROVEN;
- HIGH_CONFIDENCE_INFERENCE;
- INFERENCE;
- UNKNOWN.

Do not convert inference into fact through repetition.

## 11. Final Git proof

Every Codex stage report must end with exact repository identity and status evidence.

For read-only stages, start and end repository state must match.

For write stages before Owner Git finalization, the final diff must contain only authorized paths.

## 12. No evidence laundering

Do not use:
- old screenshots;
- stale documentation;
- unrelated CI runs;
- synthetic metrics;
- a different branch's PASS;
- an unchecked generated artifact

to create the appearance of current proof.
