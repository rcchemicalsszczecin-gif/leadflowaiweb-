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
- Legacy global/page-wide `WaterSurface` removed from active V14.
- `V14LiquidSurface` is scene-bounded inside `V14LiquidConstructor` with reduced-motion no-context behavior, 45/30 FPS, bounded DPR, hidden-tab suspension, IntersectionObserver offscreen suspension and fine-pointer-only tracking.
- Active Liquid visual proof: desktop/mobile WebGL2=true, fallback empty, overflow=0.
- R2 ROOT CSS DE-STACK: COMPLETE.
  - root `app/layout.tsx` imports exactly one stylesheet: `globals.css`;
  - V8/V9/V9.2/V10/V13 visual/accessibility layers are not mounted from root;
  - legacy `services.css` plus V2→V6 cascade is generated deterministically as `/v14-legacy-routes.css` only for migrated non-home routes;
  - homepage does not load the legacy route bridge;
  - route-specific contact/knowledge/search/Lab CSS is scoped by nested layouts;
  - active legacy bridge contains no stock or external network asset URLs.
- Exact R2 root-clean candidate `e190d2466bdc5166917614aecf361814db9abe8b`:
  - Quality: PASS;
  - build: 67/67;
  - artifact contract: PASS;
  - static route smoke: 44 routes PASS;
  - Browser Matrix: PASS 28/28.
- Browser Matrix uses Chrome 151 and Firefox 153 with true Firefox 360/390 CSS viewport via WebDriver BiDi, plus 768/1366/1440/1920 homepage checks and representative service/knowledge/contact/Lab mobile+desktop cases.
- Browser matrix validates navigation mode, landmarks, truth markers and horizontal overflow.
- V14.9 route-level performance budgets are active for homepage, service, knowledge hub, knowledge article, contact and Lab.
- Homepage route CSS on exact R2 candidate: 48772 raw / 12742 gzip.
- Next.js upgraded to 16.3.1 after dependency audit identified high-severity transitive issues on 16.2.11.
- `npm audit --omit=dev --audit-level=high`: 0 vulnerabilities.
- Security contract: PASS — no raw HTML injection, eval/dynamic Function, browser storage/cookies, unapproved fetch/XHR, dynamic `app/api`, external scripts, external CSS assets or detected secrets in active public sources.
- Dormant chatbot code is NETWORK_OFF and public chatbot UI remains OFF.

## Active / not complete

- V14.9 final QA: IN PROGRESS.
- Active lint/specificity cleanup: IN PROGRESS.
- Legacy route bridge reduction/migration away from V2→V6 internals: DEFERRED CLEANUP, not a root blocker; bridge is isolated and validated.
- Final search/public-truth exact-candidate QA: NOT COMPLETE.
- Final exact-candidate Preview after the remaining V14.9 mutations: NOT COMPLETE.
- V14.10 Owner visual acceptance: NOT COMPLETE.
- R9 merge/release: BLOCKED pending V14.9 and explicit Owner PASS.

## Remaining technical debt / blockers

1. Reduce active Biome specificity warnings without weakening lint. Historical/unmounted V8/V9/V9.2 warnings must not be confused with active public CSS debt.
2. Continue bounded cleanup of the isolated legacy route bridge only where reference proof permits; do not reintroduce it to root/homepage.
3. Complete final search/public-truth verification on the final candidate.
4. Run final Quality + Browser Matrix + Preview on the exact final V14.9 candidate.
5. Complete V14.10 Owner visual review and obtain explicit Owner PASS.
6. `main` branch protection remains OFF at repository-settings level.
7. Dependabot alerts remain OFF at repository-settings level; npm audit is now enforced in CI.

## Execution order

1. Active lint/specificity cleanup and final bounded route-bridge cleanup where safe.
2. Final search/public-truth exact-candidate QA.
3. Final exact-candidate Quality + 28-case Browser Matrix + Preview evidence pack.
4. V14.10 Owner visual review.
5. Only after explicit Owner PASS: R9 merge/release.
6. After stable V14 production: V15 Search Master Plan using real production/search evidence.

## Production protection

No feature-branch Quality PASS, Preview PASS, Browser Matrix PASS, Draft PR state or automation result authorizes production merge by itself. `main` must not be mutated without explicit Owner merge authorization.
