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
CHATBOT_CODE=DORMANT
STATIC_FRONTEND=PASS
GITHUB_PAGES=PRODUCTION
CUSTOM_DOMAIN=leadflowai.pl
ANALYTICS_RUNTIME=NOT_AUTHORIZED_IN_V14
V14_ROUTE_MIGRATION=COMPLETE
V14_R2_RUNTIME=PASS
V14_R2_CSS_CLEANUP=ADVANCED
V14_LIQUID_RUNTIME=SCENE_BOUNDED
V14_LEGACY_WATER_RUNTIME=NOT_MOUNTED
V14_ROUTE_PERFORMANCE_BUDGETS=PASS
V14_PREVIEW_PIPELINE=PASS
V14_FINAL_QA=IN_PROGRESS
V14_OWNER_VISUAL_ACCEPTANCE=BLOCKED_PENDING_OWNER_REVIEW
MAIN_BRANCH_PROTECTION=OFF
DEPENDABOT_ALERTS=OFF

## Production architecture

Production `main` remains the Owner-authorized V13 Polish Production Rebuild. V14 is still isolated on `v14/full-visual-rebuild` and is not production authority.

## Current V14 frontend

- V14.8 shared-shell migration is complete for homepage, all 35 service pages, `/uslugi`, `/realizacje`, `/o-nas`, `/kontakt`, `/wiedza`, all 21 knowledge articles and `/lab`.
- V13 URLs, metadata, canonical, schema, decision guidance, FAQ, knowledge/editorial/source layer and real-only portfolio remain preserved.
- Legacy `WaterSurface` is not mounted in root or homepage runtime.
- Active `V14LiquidSurface` belongs only to `V14LiquidConstructor`.
- Liquid runtime uses local element sizing, reduced-motion no-context behavior, compact FPS/DPR bounds, hidden-tab suspension and IntersectionObserver offscreen suspension.
- No stock/motherboard dependency remains in the active V14 Liquid scene.

## Validation evidence

- V14.8 source/rendered artifact gates: PASS.
- Static build: 67/67 routes.
- Static HTTP smoke: 44 representative routes PASS.
- R2 root V9/V9.2/V10 de-stack Quality #586: PASS.
- Post de-stack CSS aggregate: 124292 raw / 26269 gzip against historical ceilings 195000 / 40000.
- Scene-bounded Liquid Quality on `0279836761ec0ecc82a19ae45859fb0dd2e52cfb`: PASS.
- Preview run #130 on the same SHA: PASS.
- Active Liquid WebDriver evidence on the same SHA:
  - desktop: WebGL2=true, fallback empty, overflow=0, visibleRatio≈0.905;
  - mobile: WebGL2=true, fallback empty, overflow=0, visibleRatio=1.0.
- V14.9 route-level performance budgets: PASS for homepage, service, knowledge hub, knowledge article, contact and Lab representatives; total raw/gzip and asset-count regressions are enforced.

## Current blockers

- complete remaining historical V2–V7/V13 CSS ownership cleanup where reference proof permits;
- reduce active lint/specificity debt without weakening lint;
- complete V14.9 security/dependency review;
- complete Chromium + Firefox and 360/390/768/1366/1440/1920 browser/viewport matrix;
- complete final search/public-truth QA;
- produce final exact-candidate preview after all V14.9 changes;
- obtain explicit Owner visual PASS.

## Release rule

V14 feature-branch Quality/Preview PASS is necessary but insufficient. Production promotion requires final exact-candidate validation, explicit Owner visual PASS and explicit Owner merge authorization.
