# LEADFLOWAI — CURRENT STATE

STATUS: AUTHORITATIVE CURRENT-STATE CHECKPOINT
DATE: 2026-08-14
OWNER: Paweł Niewiadomski
LEGAL ENTITY: Tervyxa Systems sp. z o.o.
PUBLIC BRAND: LeadFlowAI
PRIMARY DOMAIN: leadflowai.pl

## Production authority

- Production branch: `main`.
- Production authority: V14 Full Visual Rebuild.
- Production merge revision: `39c9b304eff42a71ea36aee871dce569d8f374f0` — `Merge V14 Full Visual Rebuild`.
- Merged release candidate: `242263ffe1593d1a80890b7f6bc1514316ed2656`.
- Previous production / rollback baseline: V13 `10627e2f18ccfc7ef86c76a695dab9cf7933cce9`.
- Owner merge authorization: GRANTED and exercised on 2026-08-14.
- PR #19: merged.

## Production deployment proof

GitHub Pages deployment run #16 / run id `31800348526`:
- head SHA: `39c9b304eff42a71ea36aee871dce569d8f374f0`;
- build job: PASS;
- full verify/static artifact identity: PASS;
- deploy job: PASS;
- workflow conclusion: SUCCESS.

GitHub Pages repository state after deployment:
- status: `built`;
- source: `main`;
- CNAME: `leadflowai.pl`;
- public Pages URL: `https://leadflowai.pl/`;
- HTTPS certificate: approved;
- HTTPS enforcement: enabled.

## Preserved public foundation

Production V14 preserves:
- 35 service/money pages;
- 21 knowledge articles;
- 63 dominant public search intents;
- canonical/sitemap/robots and structured-data architecture;
- direct answers, FAQ and service decision guidance;
- reviewed/source-backed knowledge layer;
- first-party/real-only portfolio;
- direct contact through `kontakt@leadflowai.pl`.

Public chatbot UI remains OFF by Owner. Online lead delivery remains OFF by Owner. Analytics activation is not authorized by V14.

## V14 delivery status

- Recovery audit: 231/231 tracked files.
- R0 governance/source-of-truth synchronization: COMPLETE.
- R1 mobile/accessibility repair: COMPLETE.
- R2 runtime and root CSS de-stack: COMPLETE.
- V14.1–V14.7 visual/product/search/process/portfolio/knowledge/contact delivery: COMPLETE.
- V14.8 route migration: COMPLETE.
- V14.9 final QA: COMPLETE.
- V14.10 Owner Visual PASS: ACCEPTED.
- R9 pre-merge hardening: PASS.
- Production merge: COMPLETE.
- GitHub Pages deployment: PASS.

## Final release evidence

Exact release candidate `242263ffe1593d1a80890b7f6bc1514316ed2656` passed:
- Quality: PASS;
- active Biome lint warnings: 0;
- TypeScript: PASS;
- static build: PASS;
- security contract: PASS;
- `npm audit --omit=dev --audit-level=high`: 0 vulnerabilities;
- aggregate performance: PASS;
- six route-level performance budgets: PASS;
- rendered Search/Public Truth: PASS with 63 canonical URLs exactly matching 63 sitemap URLs;
- Browser Matrix: PASS 28/28 across Chrome and Firefox, including true Firefox 360/390 CSS viewports through WebDriver BiDi;
- Visual Preview: PASS, including active Liquid WebGL2 desktop/mobile evidence.

## Production architecture

- Next.js 16.3.1 static export.
- GitHub Pages hosts the public frontend.
- Root stylesheet ownership is `globals.css` only.
- Legacy service + V2→V6 compatibility CSS is isolated in `/v14-legacy-routes.css` for migrated non-home routes.
- Homepage does not load that bridge.
- Legacy global `WaterSurface` is not mounted.
- Active `V14LiquidSurface` is scene-bounded inside `V14LiquidConstructor`.
- No stock/motherboard or external network asset dependency remains in active CSS/Liquid runtime.
- Branded noindex 404 and first-party app icon are present.

## Remaining non-blocking debt

- `main` branch protection remains OFF at repository-settings level.
- Dependabot alerts remain OFF at repository-settings level; npm audit is enforced in CI.
- `/v14-legacy-routes.css` remains a bounded compatibility bridge; further removal is post-release cleanup and must remain reference-proven.
- Independent live-domain HTTP smoke from the assistant runtime was not available because that runtime could not resolve `leadflowai.pl`; GitHub Pages itself reports the custom domain built with HTTPS approved/enforced and the exact deployment workflow passed.

## Next execution order

1. Keep V14 production stable and monitor Pages/static-route/search health.
2. Perform post-release bridge cleanup only as separately bounded maintenance.
3. Consider enabling `main` branch protection and Dependabot alerts.
4. Start V15 Search Master Plan from stable V14 production evidence and real search data.

## Production protection

Further production mutations require normal Owner/governance authority. V14 is now the production baseline; V13 remains the immediate known-good rollback reference.