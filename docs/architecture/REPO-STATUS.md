# LEADFLOWAI — REPOSITORY STATUS

STATUS: CURRENT ARCHITECTURE CHECKPOINT
DATE: 2026-08-14

BRAND=LEADFLOWAI
DOMAIN=leadflowai.pl
PUBLIC_EMAIL=kontakt@leadflowai.pl
PRODUCTION_BRANCH=main
PRODUCTION_REVISION=10627e2f18ccfc7ef86c76a695dab9cf7933cce9
PRODUCTION_AUTHORITY=V13_POLISH_PRODUCTION_REBUILD
PRODUCTION_DEPLOY=PASS
ACTIVE_WORK_BRANCH=v14/full-visual-rebuild
ACTIVE_VISUAL_AUTHORITY=V14
FULL_REPO_RECOVERY_AUDIT=231/231
PUBLIC_SERVICE_PAGES=35
KNOWLEDGE_ARTICLES=21
DOMINANT_SEARCH_INTENTS=63
LEAD_FORM_DELIVERY=OFF_BY_OWNER
DIRECT_EMAIL_CONTACT=PASS
CHATBOT_PUBLIC_UI=OFF
CHATBOT_CODE=DORMANT_NETWORK_OFF
STATIC_FRONTEND=PASS
GITHUB_PAGES=PRODUCTION
CUSTOM_DOMAIN=leadflowai.pl
ANALYTICS_RUNTIME=NOT_AUTHORIZED_IN_V14
V14_ROUTE_MIGRATION=COMPLETE
V14_R2_RUNTIME=PASS
V14_R2_ROOT_CSS_DESTACK=COMPLETE
V14_ROOT_CSS=GLOBALS_ONLY
V14_LEGACY_ROUTE_BRIDGE=SERVICE_PLUS_V2_V6_SCOPED
V14_LIQUID_RUNTIME=SCENE_BOUNDED
V14_LEGACY_WATER_RUNTIME=NOT_MOUNTED
V14_ROUTE_PERFORMANCE_BUDGETS=PASS
V14_SECURITY_CONTRACT=PASS
V14_DEPENDENCY_AUDIT=0_VULNERABILITIES
NEXT_VERSION=16.3.1
V14_BROWSER_MATRIX=PASS_28_OF_28
V14_FIREFOX_MOBILE_VIEWPORT=BIDI_TRUE_CSS_360_390
V14_PREVIEW_PIPELINE=PASS
V14_FINAL_QA=COMPLETE
V14_VALIDATED_IMPLEMENTATION_CANDIDATE=a5b63128f027179358fd50f04a6b4d374f58fce3
V14_RENDERED_SEARCH_TRUTH=PASS_63_EXACT_SET
V14_ACTIVE_LINT_WARNINGS=0
V14_OWNER_VISUAL_ACCEPTANCE=BLOCKED_PENDING_OWNER_REVIEW
MAIN_BRANCH_PROTECTION=OFF
DEPENDABOT_ALERTS=OFF

## Production architecture

Production `main` remains the Owner-authorized V13 Polish Production Rebuild. V14 remains isolated on `v14/full-visual-rebuild` and is not production authority.

## Current V14 frontend

- V14.8 shared-shell migration is complete for homepage, all 35 service pages, `/uslugi`, `/realizacje`, `/o-nas`, `/kontakt`, `/wiedza`, all 21 knowledge articles and `/lab`.
- V13 URLs, metadata, canonical, schema, decision guidance, FAQ, knowledge/editorial/source layer and real-only portfolio remain preserved.
- Root stylesheet ownership is `globals.css` only.
- Legacy service styles plus V2→V6 cascade are generated as `/v14-legacy-routes.css` only for migrated non-home routes.
- Homepage never loads the legacy route bridge.
- Contact, knowledge/portfolio/about, search education and Lab styles are route-scoped through nested layouts.
- Legacy `WaterSurface` is not mounted; active `V14LiquidSurface` belongs only to `V14LiquidConstructor`.
- No stock/motherboard or external network asset dependency remains in active CSS/Liquid runtime.
- Branded root-clean 404 and first-party app icon are present.

## V14.9 final evidence

Validated implementation candidate:
`a5b63128f027179358fd50f04a6b4d374f58fce3`

Quality:
- PASS;
- active lint warnings: 0;
- static build: 68/68;
- artifact contract: PASS;
- 44-route HTTP smoke: PASS;
- npm audit: 0 vulnerabilities;
- security: PASS;
- aggregate performance: PASS;
- six route-level performance budgets: PASS;
- rendered Search/Public Truth: PASS.

Rendered search/public truth:
- 63 indexable HTML documents;
- 2 noindex/error artifacts;
- 63 unique canonical URLs;
- 63 sitemap URLs with exact canonical-set match;
- title/description/exact-one-H1/lang/robots: PASS;
- Service schema >=35;
- Article schema =21;
- FAQPage schema >=36;
- public legal/contact truth: PASS;
- runtime leaks/placeholders: ABSENT.

Browser Matrix:
- PASS 28/28;
- Chrome 151 + Firefox 153;
- true Firefox 360/390 CSS viewports through WebDriver BiDi;
- homepage 360/390/768/1366/1440/1920;
- service/knowledge/contact/Lab mobile+desktop samples;
- navigation/landmarks/truth/overflow: PASS.

Visual Preview:
- PASS on the same implementation candidate;
- desktop/tablet/mobile bounded captures: PASS;
- long reduced-motion desktop/mobile captures: PASS;
- active Liquid desktop/mobile captures: PASS;
- desktop Liquid WebGL2=true, fallback empty, overflow=0, visible ratio 0.8298;
- mobile Liquid WebGL2=true, fallback empty, overflow=0, visible ratio 0.9064;
- artifact digest: `sha256:bc1e7928edb0d10744fc0d2b6f7b292922515bb75898b3aa4bfcc871cf4f877b`.

## Current blocker

V14.10 Owner visual acceptance is the only V14 release blocker inside the implementation workflow.

If Owner requests calibration, a bounded V14.10 pass must be followed by a new exact-candidate Quality + Browser Matrix + Preview cycle.

Repository-setting debt remains separate from the visual candidate: `main` protection and Dependabot alerts are still OFF.

## Release rule

Production promotion requires explicit Owner visual PASS and explicit Owner merge authorization. V14 must not be merged to `main` merely because CI/preview are green.
