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

- Full recovery audit: 231/231 tracked files.
- R0 governance/source-of-truth synchronization: COMPLETE.
- R1 mobile/accessibility P0 repair: COMPLETE.
- V14.1–V14.7 homepage/product/search/process/portfolio/knowledge/contact visual foundation: COMPLETE for V14 delivery scope.
- V14.8 route migration: COMPLETE for homepage, all 35 service pages, `/uslugi`, `/realizacje`, `/o-nas`, `/kontakt`, `/wiedza`, all 21 knowledge articles and `/lab`.
- R2 runtime de-stack: COMPLETE.
  - legacy global/page-wide `WaterSurface` is not mounted;
  - active `V14LiquidSurface` is scene-bounded inside `V14LiquidConstructor`;
  - reduced-motion exits before WebGL allocation;
  - rendering is bounded by 45/30 FPS, DPR limits, hidden-tab suspension and IntersectionObserver offscreen suspension;
  - fine-pointer tracking is local to the Liquid scene.
- R2 root CSS de-stack: COMPLETE.
  - root `app/layout.tsx` imports exactly one stylesheet: `globals.css`;
  - V8/V9/V9.2/V10/V13 visual/accessibility layers are not mounted from root;
  - legacy `services.css` plus V2→V6 cascade is generated deterministically as `/v14-legacy-routes.css` only for migrated non-home routes;
  - homepage does not load the legacy route bridge;
  - contact/knowledge/portfolio/about/search/Lab CSS is route-scoped;
  - active legacy bridge contains no stock or external network asset URLs.
- Next.js baseline: 16.3.1.
- Runtime dependencies: Next/React/ReactDOM only.
- `npm audit --omit=dev --audit-level=high`: 0 vulnerabilities.
- Security contract: PASS — no raw HTML injection, eval/dynamic Function, browser storage/cookies, unapproved fetch/XHR, dynamic `app/api`, external scripts, external CSS assets or detected secrets in active public sources.
- Dormant chatbot: NETWORK_OFF; public chatbot UI remains OFF.
- Branded root-clean 404: PASS / noindex.
- First-party `app/icon.svg`: PASS.

## V14.9 final QA — COMPLETE

Validated implementation candidate:
`a5b63128f027179358fd50f04a6b4d374f58fce3`

The following three independent gates passed on that exact candidate:

1. **Quality — PASS**
   - full contracts: PASS;
   - TypeScript: PASS;
   - Biome active lint surface: PASS with 0 warnings;
   - static build: 68/68 generated routes/artifacts;
   - static artifact contract: PASS;
   - 44-route HTTP smoke: PASS;
   - npm dependency audit: 0 vulnerabilities;
   - security contract: PASS;
   - aggregate performance budgets: PASS;
   - six route-level performance budgets: PASS;
   - rendered Search/Public Truth: PASS.

2. **Browser Matrix — PASS 28/28**
   - Chrome 151 + Firefox 153;
   - Firefox 360/390 uses WebDriver BiDi true CSS viewport override;
   - homepage: 360 / 390 / 768 / 1366 / 1440 / 1920;
   - representative service, knowledge, contact and Lab routes: mobile + desktop;
   - navigation mode, landmarks, truth markers and horizontal overflow: PASS.

3. **V14 Visual Preview — PASS**
   - desktop 1440: PASS;
   - tablet 768: PASS;
   - mobile 390: PASS;
   - desktop long reduced-motion: PASS;
   - mobile long reduced-motion: PASS;
   - active Liquid desktop WebDriver capture: PASS;
   - active Liquid mobile WebDriver capture: PASS;
   - Liquid desktop: WebGL2=true, fallback empty, overflow=0, visible ratio 0.8298;
   - Liquid mobile: WebGL2=true, fallback empty, overflow=0, visible ratio 0.9064;
   - preview artifact digest: `sha256:bc1e7928edb0d10744fc0d2b6f7b292922515bb75898b3aa4bfcc871cf4f877b`.

Rendered Search/Public Truth on the validated candidate:
- indexable HTML: 63;
- noindex/error artifacts: 2;
- canonical URLs: 63 unique;
- sitemap URLs: 63 exact-set match;
- title/description/H1/lang/robots: PASS;
- rendered schemas: 270 total nodes/scripts evaluated by gate;
- Service schema: >=35;
- Article schema: 21;
- FAQPage schema: >=36;
- legal/contact truth: PASS;
- runtime leaks/placeholders: ABSENT.

Final validated performance snapshot:
- aggregate JS raw/gzip: 671988 / 202044 bytes;
- aggregate CSS raw/gzip: 126657 / 28650 bytes;
- homepage HTML raw/gzip: 65183 / 14658 bytes;
- homepage route CSS raw/gzip: 55098 / 13651 bytes;
- all configured aggregate and route-level ceilings: PASS.

## Active / not complete

- V14.10 Owner visual acceptance: **NOT COMPLETE**.
- R9 merge/release: **BLOCKED** pending explicit Owner visual PASS and explicit Owner merge authorization.
- V15 Search Master Plan: starts only after stable V14 production.

## Non-blocking repository-setting debt

- `main` branch protection remains OFF at repository-settings level.
- Dependabot alerts remain OFF at repository-settings level; npm audit is enforced in CI.
- Isolated `/v14-legacy-routes.css` remains a bounded compatibility bridge for migrated non-home routes; further removal is optional post-V14 cleanup and must remain reference-proven.

## Execution order from this checkpoint

1. V14.10 Owner visual review of the validated V14.9 candidate.
2. If Owner finds visual issues: bounded V14.10 calibration pass, then repeat exact-candidate Quality + Browser Matrix + Preview.
3. Only after explicit Owner visual PASS: R9 release hardening and explicit merge authorization.
4. Merge V14 to `main` only after that authorization.
5. Verify production Pages deploy and post-deploy smoke.
6. Start V15 Search Master Plan only from stable production evidence.

## Production protection

No feature-branch Quality PASS, Preview PASS, Browser Matrix PASS, Draft PR state or automation result authorizes production merge by itself. `main` must not be mutated without explicit Owner merge authorization.
