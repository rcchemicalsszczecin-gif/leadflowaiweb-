# LEADFLOWAI — REPOSITORY STATUS

STATUS: CURRENT ARCHITECTURE CHECKPOINT
DATE: 2026-08-14

BRAND=LEADFLOWAI
DOMAIN=leadflowai.pl
PUBLIC_EMAIL=kontakt@leadflowai.pl
PRODUCTION_BRANCH=main
PRODUCTION_REVISION=39c9b304eff42a71ea36aee871dce569d8f374f0
PRODUCTION_AUTHORITY=V14_FULL_VISUAL_REBUILD
PRODUCTION_DEPLOY=PASS
V14_RELEASE_CANDIDATE=242263ffe1593d1a80890b7f6bc1514316ed2656
V14_OWNER_VISUAL_ACCEPTANCE=PASS
V14_OWNER_MERGE_AUTHORIZATION=GRANTED_AND_EXERCISED
V14_R9_PREMERGE_HARDENING=PASS
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
V14_RENDERED_SEARCH_TRUTH=PASS_63_EXACT_SET
V14_ACTIVE_LINT_WARNINGS=0
PUBLIC_SERVICE_PAGES=35
KNOWLEDGE_ARTICLES=21
DOMINANT_SEARCH_INTENTS=63
LEAD_FORM_DELIVERY=OFF_BY_OWNER
DIRECT_EMAIL_CONTACT=PASS
CHATBOT_PUBLIC_UI=OFF
CHATBOT_CODE=DORMANT_NETWORK_OFF
STATIC_FRONTEND=PASS
GITHUB_PAGES=PRODUCTION
GITHUB_PAGES_RUN=31800348526_SUCCESS
CUSTOM_DOMAIN=leadflowai.pl
HTTPS=APPROVED_AND_ENFORCED
ANALYTICS_RUNTIME=NOT_AUTHORIZED_IN_V14
MAIN_BRANCH_PROTECTION=OFF
DEPENDABOT_ALERTS=OFF

## Production architecture

V14 Full Visual Rebuild is production on `main`. The Owner-authorized merge commit is `39c9b304eff42a71ea36aee871dce569d8f374f0`; V13 `10627e2f18ccfc7ef86c76a695dab9cf7933cce9` is the immediate rollback baseline.

The public frontend remains a Next.js 16.3.1 static export deployed by GitHub Pages. GitHub Pages run `31800348526` passed build, full repository verification, artifact identity and deploy for the V14 merge SHA.

## Current frontend invariants

- 35 service pages, 21 knowledge articles and 63 dominant search intents remain preserved.
- Root CSS is `globals.css` only.
- Legacy service + V2→V6 compatibility CSS is isolated in `/v14-legacy-routes.css` for non-home routes.
- Contact, knowledge/portfolio/about, search education and Lab CSS are route-scoped.
- Legacy global `WaterSurface` is not mounted.
- `V14LiquidSurface` is scene-bounded.
- Public chatbot and online lead delivery remain OFF.
- Direct e-mail contact remains active.
- Branded noindex 404 and first-party icon are active.

## Release evidence

Release candidate `242263ffe1593d1a80890b7f6bc1514316ed2656` passed Quality, 28/28 browser matrix, visual preview, rendered Search/Public Truth, security, dependency audit and performance budgets before merge.

Production merge `39c9b304eff42a71ea36aee871dce569d8f374f0` is a verified GitHub merge commit with parents V13 production and the exact validated V14 release candidate.

GitHub Pages reports status `built`, CNAME `leadflowai.pl`, approved certificate and HTTPS enforcement.

## Remaining non-blocking debt

- `main` branch protection is OFF.
- Dependabot alerts are OFF; npm audit remains enforced in CI.
- The isolated legacy route bridge is post-release cleanup debt, not a production blocker.

## Next phase

Production stabilization/monitoring comes first. V15 Search Master Plan starts from stable V14 production evidence and real search data.