# LEADFLOWAI — CURRENT STATE

STATUS: AUTHORITATIVE CURRENT-STATE CHECKPOINT
DATE: 2026-08-14
OWNER: Paweł Niewiadomski
LEGAL ENTITY: Tervyxa Systems sp. z o.o.
PUBLIC BRAND: LeadFlowAI
PRIMARY DOMAIN: leadflowai.pl

## Production authority

- Production branch: `main`.
- Production revision: `10627e2f18ccfc7ef86c76a695dab9cf7933cce9` — `Merge V13 Polish Production Rebuild`.
- GitHub Pages deployment for that production revision: SUCCESS.
- V14 remains isolated on `v14/full-visual-rebuild` and is not merge-authorized.

## Preserved V13 public foundation

V14 preserves:
- 35 service/money pages;
- 21 knowledge articles;
- 63 dominant public search intents;
- canonical/sitemap/robots and structured-data architecture;
- direct answers, FAQ and service decision guidance;
- reviewed/source-backed knowledge layer;
- real-only portfolio;
- direct contact through `kontakt@leadflowai.pl`.

Public chatbot UI remains OFF by Owner. Online lead delivery remains OFF by Owner. Analytics activation is not authorized by V14.

## Completed / PASS

- R0 governance/source-of-truth synchronization.
- R1 mobile/accessibility P0 repair.
- V14.1–V14.7 homepage/product/search/process/portfolio/knowledge/contact visual foundation.
- V14.8 route migration COMPLETE for homepage, all 35 service pages, `/uslugi`, `/realizacje`, `/o-nas`, `/kontakt`, `/wiedza`, all 21 knowledge articles and `/lab`.
- V9/V9.2/V10 and retired V13 accessibility root layers removed from the active global bundle; required safeguards were absorbed into V14 shell.
- Legacy global/page-wide `WaterSurface` removed from active V14.
- `V14LiquidSurface` is scene-bounded inside `V14LiquidConstructor` and has no stock/motherboard dependency.
- Liquid runtime bounds: local ResizeObserver sizing, reduced-motion before context allocation, 45/30 FPS, bounded DPR, hidden-tab suspension, IntersectionObserver offscreen suspension and fine-pointer-only tracking.
- R2 runtime exact Quality PASS on `0279836761ec0ecc82a19ae45859fb0dd2e52cfb`.
- Preview run #130 on the same SHA: PASS.
- Active Liquid WebDriver evidence on the same SHA:
  - desktop WebGL2=true, fallback empty, overflow=0, visibleRatio≈0.905;
  - mobile WebGL2=true, fallback empty, overflow=0, visibleRatio=1.0.
- Static build remains 67/67; 44-route smoke remains PASS.
- V14.9 route-level performance budgets are active and PASS for six representative route classes, including total raw/gzip and asset-count ceilings.

## Active / not complete

- R2 runtime: PASS.
- R2 remaining historical CSS ownership cleanup: ADVANCED, not fully complete.
- V14.9 final QA: IN PROGRESS.
- Security/dependency review: NOT COMPLETE.
- Chromium + Firefox final viewport/browser matrix: NOT COMPLETE.
- Final search/public-truth QA: NOT COMPLETE.
- Final exact-candidate preview after all V14.9 mutations: NOT COMPLETE.
- V14.10 Owner visual acceptance: NOT COMPLETE.
- R9 merge/release: BLOCKED pending V14.9 and explicit Owner PASS.

## Remaining technical debt / blockers

1. Reference-proof remaining V2–V7/V13 global CSS ownership and remove/route-scope only what is demonstrably obsolete.
2. Reduce active Biome specificity warnings without weakening lint.
3. Add/complete security gate and dependency posture review; Dependabot alerts remain disabled at repository-settings level.
4. Complete browser/viewport matrix at 360/390/768/1366/1440/1920 with Chromium and Firefox evidence.
5. Complete final search/public-truth verification.
6. Run final Quality + Preview on the exact final V14.9 candidate.
7. Obtain explicit Owner visual PASS.
8. `main` branch protection remains OFF at repository-settings level.

## Execution order

1. V14.9 security gate and dependency review.
2. Chromium/Firefox viewport matrix.
3. Remaining bounded CSS/lint cleanup where safe.
4. Final search/public-truth QA.
5. Final exact-candidate Quality + Preview evidence pack.
6. V14.10 Owner visual review.
7. Only after explicit Owner PASS: R9 merge/release.
8. After stable V14 production: V15 Search Master Plan using real production/search evidence.

## Production protection

No feature-branch Quality PASS, Preview PASS, Draft PR state or automation result authorizes production merge by itself. `main` must not be mutated without explicit Owner merge authorization.
