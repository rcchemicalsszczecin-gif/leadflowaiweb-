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
V14_FINAL_QA=IN_PROGRESS
V14_OWNER_VISUAL_ACCEPTANCE=BLOCKED_PENDING_OWNER_REVIEW
MAIN_BRANCH_PROTECTION=OFF
DEPENDABOT_ALERTS=OFF

## Production architecture

Production `main` remains the Owner-authorized V13 Polish Production Rebuild. V14 is isolated on `v14/full-visual-rebuild` and is not production authority.

## Current V14 frontend

- V14.8 shared-shell migration is complete for homepage, all 35 service pages, `/uslugi`, `/realizacje`, `/o-nas`, `/kontakt`, `/wiedza`, all 21 knowledge articles and `/lab`.
- V13 URLs, metadata, canonical, schema, decision guidance, FAQ, knowledge/editorial/source layer and real-only portfolio remain preserved.
- Root stylesheet ownership is now `globals.css` only.
- Legacy service styles plus V2→V6 cascade are generated as `/v14-legacy-routes.css` only for migrated non-home routes.
- Homepage never loads the legacy route bridge.
- Contact, knowledge/portfolio/about, search education and Lab styles are route-scoped through nested layouts.
- Legacy `WaterSurface` is not mounted; active `V14LiquidSurface` belongs only to `V14LiquidConstructor`.
- No stock/motherboard or external network asset dependency remains in active CSS/Liquid runtime.

## Validation evidence

- Exact R2 root-clean candidate: `e190d2466bdc5166917614aecf361814db9abe8b`.
- Quality: PASS.
- Static build: 67/67 routes.
- Static artifact contract: PASS.
- Static HTTP smoke: 44 representative routes PASS.
- Browser Matrix: 28/28 PASS across Chrome 151 and Firefox 153.
- Firefox 360/390 tests use WebDriver BiDi true CSS viewport override; homepage is additionally tested at 768/1366/1440/1920.
- Representative service, knowledge, contact and Lab routes pass mobile and desktop browser checks.
- Route performance budgets: PASS.
- Homepage route CSS at exact R2 root-clean candidate: 48772 raw / 12742 gzip.
- Security contract: PASS across active public sources and active CSS.
- Next.js: 16.3.1.
- Runtime dependencies: Next/React/ReactDOM only.
- `npm audit --omit=dev --audit-level=high`: 0 vulnerabilities.
- Preview pipeline and scene-bounded Liquid evidence: PASS.

## Current blockers

- reduce active lint/specificity debt without weakening lint;
- continue only reference-proven cleanup inside the isolated legacy route bridge;
- complete final search/public-truth exact-candidate QA;
- produce final exact-candidate Quality + Browser Matrix + Preview evidence;
- obtain explicit Owner visual PASS.

Repository-setting debt remains separate from feature-branch correctness: `main` protection and Dependabot alerts are still OFF.

## Release rule

V14 feature-branch Quality/Preview/Browser Matrix PASS is necessary but insufficient. Production promotion requires final exact-candidate validation, explicit Owner visual PASS and explicit Owner merge authorization.
