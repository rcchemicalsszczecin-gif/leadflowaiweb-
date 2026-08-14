# LEADFLOWAI — CURRENT STATE

STATUS: AUTHORITATIVE CURRENT-STATE CHECKPOINT
DATE: 2026-08-14
OWNER: Paweł Niewiadomski
LEGAL ENTITY: Tervyxa Systems sp. z o.o.
PUBLIC BRAND: LeadFlowAI
PRIMARY DOMAIN: leadflowai.pl

## Purpose

This file is the authoritative checkpoint for current production state, active work, validation boundaries and blockers. Historical plans, design records, validation reports and stage files remain evidence of the state that existed when they were written, but they do not override this checkpoint or later explicit Owner decisions.

## Production authority

- Production/release branch: `main`.
- Current production `main`: `10627e2f18ccfc7ef86c76a695dab9cf7933cce9`.
- Commit identity: `Merge V13 Polish Production Rebuild`.
- GitHub Pages deployment for that exact production revision: SUCCESS.
- Production public content/search authority: V13 Polish Production Rebuild.
- V14 is not merged to `main` and is not production authority.

## Active implementation

- Active branch: `v14/full-visual-rebuild`.
- Active plan: `docs/plans/V14-VISUAL-REBUILD.md`.
- Active visual Owner authority: `docs/governance/WEBSITE-OWNER-DECISION-V14.md`.
- Draft PR: #19 `V14 — Full Visual Rebuild`.
- PR remains unmerged until explicit Owner visual acceptance and merge authorization.
- Exact active branch identity must be read from the Git ref; this checkpoint intentionally does not freeze a moving feature-branch SHA.

## V13 foundation preserved by V14

Validated/public foundation carried into V14:
- Polish public UI/content foundation;
- 35 public service/money pages;
- 21 knowledge articles;
- 63 dominant public search intents;
- service decision guidance and direct answers;
- visible FAQ where semantically useful;
- real-only portfolio: LeadFlowAI, TranskrypcjaAI and Tervyxa own projects;
- canonical URL architecture, sitemap and robots;
- Organization/WebSite/WebPage/Service/Breadcrumb/FAQ/Article structured data where semantically valid;
- SEO + AEO + GEO / AI Search architecture;
- evidence/public-truth boundaries;
- direct contact through `kontakt@leadflowai.pl`.

## Runtime/public feature boundaries

- Public chatbot UI: OFF by Owner.
- Dormant chatbot code may remain for a separately authorized future runtime stage.
- Online lead/contact form delivery: OFF by Owner.
- Direct e-mail contact: ACTIVE.
- Frontend must not imply an active server-side lead submission path.
- Analytics/consent runtime: not activated by V14.
- Dynamic API is not part of the GitHub Pages static artifact.

## V14 execution state

The recovery audit covered 231/231 tracked files. Its original findings are historical audit evidence; the current implementation has advanced materially beyond them.

### Completed / PASS

- R0 authority/governance synchronization foundation.
- R1 P0 V14 mobile/accessibility repair: mobile navigation, `/#process`, skip-to-content, focus, touch targets, coarse-pointer handling, reduced motion and brief selected-state semantics.
- V14 homepage content architecture including services, device theater, Liquid Constructor, Search/AI scene, process/quality, portfolio, knowledge, FAQ, frontend-only brief and closing/footer.
- Six service groups have differentiated V14 visual languages.
- V14.8 route migration is COMPLETE at shell/renderer level:
  - homepage;
  - all 35 service/money pages;
  - `/uslugi`;
  - `/realizacje`;
  - `/o-nas`;
  - `/kontakt`;
  - `/wiedza`;
  - all 21 `/wiedza/[slug]` articles;
  - `/lab`.
- Service URLs, metadata, canonical, structured data, direct answers, FAQ, decision guidance, related links and knowledge links remain preserved through the shared renderer migration.
- Knowledge adapter/editorial/source/dateModified/Article JSON-LD layer remains preserved.
- Preview workflow has been hardened and can generate the bounded desktop/tablet/mobile screenshot set.
- R2 de-stack has removed V9, V9.2 and V10 styles from the root bundle.
- Root responsive safeguards now live in the active V14 shell.
- WaterSurface is no longer mounted globally; its runtime is currently homepage-only.
- Exact Quality #586 on the destacked V14 shell passed end-to-end, including 67/67 static build and 44-route smoke.
- After root V9/V9.2/V10 removal, aggregate CSS measured 124292 raw / 26269 gzip against historical safety ceilings 195000 / 40000.
- Exact Quality #592 passed after changing Liquid/Water runtime ownership to homepage-only.

### Active / not complete

- R2 CSS/runtime de-stack: ADVANCED, not complete. The remaining V2–V7/V13 historical global style layers still require reference-proof consolidation or route scoping where they remain active.
- Water/Liquid runtime is homepage-only but still uses the legacy fullscreen circuit-water environment; true scene-bounded V14 Liquid ownership remains to be completed.
- V14.9 full QA: NOT COMPLETE. Required work includes the full viewport/browser matrix, route-level performance budgets, dependency/security review, final accessibility/browser checks and complete search/public-truth verification.
- V14.10 Owner visual acceptance: NOT COMPLETE. Preview reliability is no longer the blocker; explicit Owner review/PASS of the final candidate is still required.
- R9 release hardening/merge: BLOCKED pending V14.9 and Owner visual PASS.

## Current blockers / technical debt

1. Remaining historical V2–V7/V13 CSS layers are still globally imported and need dependency-proof consolidation/route scoping.
2. WaterSurface is no longer global but remains fullscreen on the homepage instead of being owned by a bounded V14 Liquid scene.
3. Biome still reports non-fatal specificity warnings, including historical CSS and some active CSS; active warnings should be reduced without weakening lint.
4. Route-level performance budgets required by V14.9 are not yet implemented.
5. Firefox and the complete 360/390/768/1366/1440/1920 visual/interaction matrix have not yet received final acceptance evidence.
6. Dependency vulnerability/security posture still needs an authorized final review; Dependabot alerts remain disabled at repository settings level.
7. `main` remains unprotected at repository settings level; required status checks are not enforced by branch protection.
8. Final Owner visual review has not occurred.

## Current execution order

1. Finish R2 — scene-bound Liquid/Water ownership and remaining CSS/runtime de-stack.
2. Clean active lint/specificity debt and stale current contract naming where safe.
3. Execute V14.9 — mobile/browser/performance/accessibility/security/search QA.
4. Produce the final V14.9A preview evidence pack on the exact candidate SHA.
5. Run V14.10 Owner visual review.
6. Only after explicit Owner PASS: R9 release hardening, exact final Quality, Owner merge authorization, merge and production deploy.
7. After stable V14 production: R10/V15 Search Master Plan using real production/search evidence.

## Production protection

`main` is not to be mutated as part of V14 implementation without explicit Owner merge authorization. V14 work remains on `v14/full-visual-rebuild`.

No feature-branch Quality PASS, Draft PR state or preview artifact by itself authorizes production merge.
