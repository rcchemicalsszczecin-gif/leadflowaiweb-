# LEADFLOWAI — CURRENT STATE

STATUS: AUTHORITATIVE CURRENT-STATE CHECKPOINT
DATE: 2026-08-14
OWNER: Paweł Niewiadomski
LEGAL ENTITY: Tervyxa Systems sp. z o.o.
PUBLIC BRAND: LeadFlowAI
PRIMARY DOMAIN: leadflowai.pl

## Purpose

This file is the authoritative checkpoint for current production state, active work, current validation boundaries and known blockers. Historical plans, design records, validation reports and stage files remain evidence of the state that existed when they were written, but they do not override this checkpoint or later explicit Owner decisions.

## Production authority

- Production/release branch: `main`.
- Current production `main`: `10627e2f18ccfc7ef86c76a695dab9cf7933cce9`.
- Commit identity: `Merge V13 Polish Production Rebuild`.
- Merge was explicitly Owner-authorized after the V13 Quality chain passed.
- GitHub Pages production workflow for that exact V13 merge commit: SUCCESS.
- Production public content authority: V13 Polish Production Rebuild.
- V14 is not merged to `main` and is not production authority.

## Active implementation

- Active branch: `v14/full-visual-rebuild`.
- Active plan: `docs/plans/V14-VISUAL-REBUILD.md`.
- Active visual Owner authority: `docs/governance/WEBSITE-OWNER-DECISION-V14.md`.
- V14 PR exists as a Draft and must remain unmerged until explicit Owner visual acceptance.
- Recovered pre-audit V14 checkpoint: `ca7e4164bd1638b8f0228c8855fbdb7896acdb0b` (`V14 preview: generate desktop and mobile screenshots`).
- Current branch is advancing beyond that checkpoint under the unified repair/execution plan; exact current branch identity must be read from the Git ref when a stage is validated.

## V13 foundation that V14 must preserve

Validated/public foundation carried into V14:
- Polish public UI/content foundation;
- 35 public service/money pages;
- 21 knowledge articles;
- 63 dominant public search intents;
- service decision guidance;
- direct-answer architecture;
- useful visible FAQ content where applicable;
- real-only portfolio: LeadFlowAI, TranskrypcjaAI and Tervyxa own projects;
- canonical URL architecture;
- sitemap and robots;
- Organization/WebSite/WebPage/Service/Breadcrumb/FAQ/Article structured-data system where semantically valid;
- SEO + AEO + GEO / AI Search architecture;
- evidence/public-truth boundaries;
- direct contact through `kontakt@leadflowai.pl`.

## Runtime/public feature boundaries

- Public LeadFlowAI chatbot widget: OFF by Owner.
- Dormant chatbot code may remain for a future separately authorized local-AI/API stage.
- Online lead/contact form delivery: OFF by Owner.
- Direct e-mail contact: ACTIVE.
- The frontend must not pretend that a server-side lead submission path is active.
- Analytics/consent runtime: not activated by the current V14 stage.
- Dynamic API is not part of the GitHub Pages static artifact.

## V14 implementation state after full repository audit

The recovery audit covered the complete tracked repository inventory: 231/231 tracked files.

### Completed/advanced
- V14 homepage has a real component cutover from the former V9/V9.2 homepage composition.
- New V14 homepage component families exist for hero/product proof, services, device theater, Liquid Constructor, Search/AI, process/quality, portfolio and closing.
- First-party V14 public SVG assets exist for social/portfolio/quality/search visuals.
- V14 language/artifact/design gates exist and the pre-audit branch passed the Quality workflow.

### Not complete
- V14.8 full route migration: NOT STARTED / not complete.
- V14.9 mobile/performance/accessibility/security acceptance: NOT COMPLETE.
- V14.10 Owner visual acceptance: BLOCKED until reliable preview evidence exists.
- The V14 homepage is not a final content-complete implementation: knowledge/FAQ/contact/footer integration still requires completion according to the unified plan.

## Critical audit findings / active blockers

1. V14 homepage mobile navigation disappears when the desktop V14 navigation is hidden; no equivalent V14 mobile menu currently replaces it.
2. Central navigation points `Jak pracujemy` to `/#process`, but the current V14 process component does not expose the matching anchor.
3. The active accessibility contract validates legacy V13/V10 header behavior rather than the V14 header and can therefore return PASS while V14 has a mobile-navigation defect.
4. V14 reduced-motion/touch rules do not yet cover all new V14 components.
5. Root layout still imports the historical V2→V13 CSS override stack globally.
6. Root layout still mounts the complete WaterSurface environment globally even though V14 defines Liquid/Water as a selective signature layer.
7. Historical aggregate CSS is effectively at the V10 safety ceiling; further V14 expansion requires CSS/runtime de-stacking first.
8. `responsive-performance-v10-contract.mjs` still encodes superseded V9.2/Unsplash assumptions.
9. `operations-contract.mjs` still encodes pre-production `NOT AUTHORIZED` language that no longer describes production V13 reality.
10. Several architecture/operations/status documents still describe old pre-production or V9.2-current states and require synchronization/historical marking.
11. The V14 preview workflow can hang during sequential headless Chrome screenshot capture and failed to produce the full Owner-review artifact set.
12. Dependabot alerts are disabled; the normal CI install path uses `npm ci --no-audit --no-fund`, so current green Quality is not a dependency-vulnerability audit.
13. `main` remains unprotected at repository settings level; required status checks are not enforced by branch protection.

## Current execution order

The active order is defined by `docs/plans/V14-VISUAL-REBUILD.md`:

1. R0 — source-of-truth/governance repair.
2. R1 — P0 V14 UX/accessibility repair.
3. R2 — CSS/runtime de-stack.
4. Complete V14.1–V14.7 literally, not merely by string-presence gates.
5. V14.8 — migrate the 35 service/money pages and remaining primary routes to the V14 shell/templates while preserving V13 truth.
6. V14.9 — full mobile/performance/accessibility/security/search QA.
7. V14.9A — reliable preview artifacts.
8. V14.10 — explicit Owner visual acceptance.
9. R9 — final hardening, Owner-authorized merge and deployment.
10. R10/V15 — separate post-V14 Search Master Plan using real production/search data.

## Production protection

`main` is not to be mutated as part of V14 implementation without explicit Owner merge authorization. V14 work remains on `v14/full-visual-rebuild`.

No current branch Quality PASS, Draft PR state or preview artifact by itself authorizes production merge.
