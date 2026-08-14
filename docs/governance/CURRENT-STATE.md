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
- R2 root de-stack removed V9, V9.2 and V10 styles from the active root bundle.
- Root responsive safeguards now live in the active V14 shell.
- Exact Quality #586 passed after V9/V9.2/V10 root removal, with 67/67 static build and 44-route smoke.
- That de-stack reduced aggregate CSS to 124292 raw / 26269 gzip against historical ceilings 195000 / 40000.
- Exact Quality #592 passed after removing global Water ownership and limiting the intermediate runtime to homepage ownership.

### Current R2 candidate

- Legacy `WaterSurface` is no longer mounted from root or homepage.
- Active WebGL has moved to a dedicated `V14LiquidSurface` owned directly by `V14LiquidConstructor`.
- The new runtime is locally sized with `ResizeObserver` rather than the browser window.
- Rendering is suspended when the scene leaves the viewport through `IntersectionObserver` and when the document is hidden.
- Reduced-motion exits before WebGL context allocation.
- Fine-pointer tracking is locally mapped into the Liquid scene.
- Compact devices use bounded FPS and DPR.
- The new Liquid scene contains no `realistic-board-photo` class and no stock/motherboard dependency.
- This exact scene-bounded candidate still requires its own final Quality and preview evidence before R2 is marked complete.

### Active / not complete

- R2 CSS/runtime de-stack: ADVANCED, not complete. Remaining V2–V7/V13 historical global style layers require reference-proof consolidation or route scoping where they remain active.
- V14.9 full QA: NOT COMPLETE. Required work includes the full viewport/browser matrix, route-level performance budgets, dependency/security review, final accessibility/browser checks and complete search/public-truth verification.
- V14.10 Owner visual acceptance: NOT COMPLETE. Preview reliability is no longer the blocker; explicit Owner review/PASS of the final candidate is still required.
- R9 release hardening/merge: BLOCKED pending V14.9 and Owner visual PASS.

## Current blockers / technical debt

1. Scene-bounded Liquid candidate needs exact-head Quality and visual preview proof.
2. Remaining historical V2–V7/V13 CSS layers are still globally imported and need dependency-proof consolidation/route scoping.
3. Biome still reports non-fatal specificity warnings, including historical CSS and some active CSS; active warnings should be reduced without weakening lint.
4. Route-level performance budgets required by V14.9 are not yet implemented.
5. Firefox and the complete 360/390/768/1366/1440/1920 visual/interaction matrix have not yet received final acceptance evidence.
6. Dependency vulnerability/security posture still needs an authorized final review; Dependabot alerts remain disabled at repository settings level.
7. `main` remains unprotected at repository settings level; required status checks are not enforced by branch protection.
8. Final Owner visual review has not occurred.

## Current execution order

1. Validate the scene-bounded Liquid runtime and finish remaining R2 CSS ownership cleanup.
2. Clean active lint/specificity debt and stale current contract naming where safe.
3. Execute V14.9 — mobile/browser/performance/accessibility/security/search QA.
4. Produce the final V14.9A preview evidence pack on the exact candidate SHA.
5. Run V14.10 Owner visual review.
6. Only after explicit Owner PASS: R9 release hardening, exact final Quality, Owner merge authorization, merge and production deploy.
7. After stable V14 production: R10/V15 Search Master Plan using real production/search evidence.

## Production protection

`main` is not to be mutated as part of V14 implementation without explicit Owner merge authorization. V14 work remains on `v14/full-visual-rebuild`.

No feature-branch Quality PASS, Draft PR state or preview artifact by itself authorizes production merge.
