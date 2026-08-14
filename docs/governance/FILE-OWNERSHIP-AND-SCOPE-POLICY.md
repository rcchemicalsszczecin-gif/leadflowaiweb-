# LEADFLOWAI — FILE OWNERSHIP AND SCOPE POLICY

STATUS: NORMATIVE
OWNER: Paweł Niewiadomski

## 1. Purpose

This policy prevents broad writes, accidental authority changes and unrelated cleanup.

## 2. Scope models

### EXACT_PATH_SET
Default mode.

The prompt enumerates every writable tracked path.

Use when target paths are knowable before implementation.

### BOUNDED_WRITE_DOMAIN
Exception mode.

Use only when exact outputs cannot be known safely in advance, for example tightly constrained generated outputs.

The prompt must define:
- allowed root/path pattern;
- maximum semantic purpose;
- expected output class;
- exclusions;
- validation proving no escape from the domain.

### HYBRID
Exact source/config path set plus a separately defined generated-output domain.

## 3. Unexpected path rule

If a tracked path outside the authorized write set/domain changes:

FAIL / STOP.

Codex must not normalize, format or revert that path automatically unless the prompt explicitly defines recovery authority.

## 4. Protected authority classes

The following require explicit Owner-authorized scope before Codex may modify them:

### Root execution authority
- `AGENTS.md`

### Governance
- `docs/governance/**`

### Product/master plans
- `docs/plans/**`

### CI / deployment
- `.github/workflows/**`

### Package/dependency authority
- `package.json`
- `package-lock.json`

### Framework/build authority
- `next.config.*`
- `tsconfig.*`
- lint/formatter configuration
- generated/tracked framework files such as `next-env.d.ts`

### Search/public-truth authority
- route/canonical registries;
- service registries;
- knowledge registries;
- sitemap/robots;
- structured data;
- evidence/acceptance files.

Protection does not mean immutable. It means separately scoped.

## 5. Public content ownership

Public copy, service claims, portfolio claims, company facts, case studies, testimonials, metrics, legal details and external-performance claims are Owner/public-truth controlled.

Codex may edit such content only when:
- the current stage explicitly includes it;
- evidence/public-truth constraints are defined;
- fabricated facts are prohibited;
- resulting claims are validated.

## 6. Runtime ownership

Runtime code under `app/**`, `components/**`, `lib/**` and related styles/assets may be modified only within the current stage write set/domain.

A component relationship discovered during a stage does not authorize refactoring all related components.

## 7. CSS ownership

CSS is treated as a dependency/cascade system.

A selector may be removed only with evidence appropriate to the maintenance stage, including relevant source references, rendered/runtime evidence and regression validation.

Historical naming alone is not removal evidence.

## 8. Generated files

Generated outputs must be classified as one of:
- TRACKED_GENERATED
- GENERATED_IGNORED
- PUBLIC_GENERATED
- CI_ARTIFACT
- LOCAL_ONLY

If a tool mutates a tracked generated file unexpectedly, STOP and report the boundary problem.

Generated files must not be silently committed merely because a build changed them.

## 9. Workflows and deployment files

CI/deployment workflow mutation is a separate high-risk scope.

A runtime/content stage may not modify workflows unless the prompt explicitly includes them.

## 10. Secrets boundary

Secrets are never legitimate tracked-file outputs.

No prompt may authorize writing real credentials into the repository.

## 11. Cross-project boundary

LeadFlowAI authority does not extend to other Tervyxa/Owner repositories or machines.

Cross-project mutation requires its own explicit Owner authority.

## 12. Exact-path staging

After review, the Owner stages exact reviewed paths.

Default prohibited broad commands:
- `git add .`
- `git add -A`

If a stage intentionally changes many paths, generate/verify the exact reviewed path list before staging.

## 13. File-count rule

FILE COUNT != SCOPE.

A coherent stage may legitimately touch many files.
A one-file change may still be out of scope.

Scope is defined by authorized outcome and write boundary, not by count.
