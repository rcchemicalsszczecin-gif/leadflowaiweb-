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
CHATBOT_OFFER=YES
CHATBOT_PUBLIC_UI=OFF
CHATBOT_CODE=DORMANT
STATIC_FRONTEND=PASS
GITHUB_PAGES=PRODUCTION
CUSTOM_DOMAIN=leadflowai.pl
FUTURE_API_ORIGIN=https://api.leadflowai.pl
LOCAL_API=NOT_PUBLICLY_ACTIVE
ANALYTICS_RUNTIME=NOT_AUTHORIZED_IN_V14
V14_ROUTE_MIGRATION=COMPLETE
V14_R2_DESTACK=ADVANCED
V14_WATER_RUNTIME=HOMEPAGE_ONLY_PENDING_SCENE_BOUNDING
V14_PREVIEW_PIPELINE=RELIABLE
V14_FINAL_QA=NOT_COMPLETE
V14_OWNER_VISUAL_ACCEPTANCE=BLOCKED_PENDING_OWNER_REVIEW
MAIN_BRANCH_PROTECTION=OFF
DEPENDABOT_ALERTS=OFF

## Production architecture

LeadFlowAI production is a Next.js static export deployed through GitHub Actions to GitHub Pages.

Production `main` contains the Owner-authorized V13 Polish Production Rebuild. V14 is not production authority until a separately authorized merge occurs.

## Current V14 branch

V14 is a feature-branch full visual/implementation-system rebuild. The active branch remains intentionally separate from `main` while R2 cleanup, V14.9 final QA and Owner visual acceptance remain unfinished.

The authoritative V14 plan is `docs/plans/V14-VISUAL-REBUILD.md`.

## Current frontend boundaries

- No dynamic `app/api/**` server runtime is required by GitHub Pages.
- Direct public contact is e-mail only.
- Public lead submission remains OFF.
- Public chatbot remains OFF.
- Future local API origin remains an architectural target only for a separately authorized runtime stage.
- WaterSurface is not mounted from the root layout; it is currently homepage-only.

## Search/content boundary

V14 preserves the V13 content/search foundation:
- 35 service/money pages;
- 21 knowledge articles;
- 63 dominant intents;
- canonical/sitemap/robots;
- structured-data/public-truth rules;
- real-only portfolio.

V14.8 shared-shell migration is complete for all 35 service pages plus `/uslugi`, `/realizacje`, `/o-nas`, `/kontakt`, `/wiedza`, all knowledge articles and `/lab`.

## Current validation evidence

- V14.8 renderer/source contracts: PASS.
- Rendered artifact checks for representative service groups, primary routes, knowledge pages/articles and Lab: PASS.
- Static build: 67/67 routes generated.
- Static HTTP smoke: 44 representative routes PASS.
- R2 root V9/V9.2/V10 de-stack Quality #586: PASS.
- Post de-stack CSS aggregate: 124292 raw / 26269 gzip against historical ceilings 195000 / 40000.
- Homepage-only Water runtime Quality #592: PASS.
- Preview pipeline can generate bounded desktop/tablet/mobile visual evidence.

## Current V14 blockers

- complete remaining R2 historical CSS ownership cleanup;
- move homepage WaterSurface from legacy fullscreen environment to a deliberately bounded V14 Liquid scene;
- reduce active lint/specificity debt;
- add route-level performance budgets;
- complete Chromium + Firefox and full viewport QA matrix;
- complete dependency/security review;
- complete final search/public-truth QA;
- obtain explicit Owner visual PASS.

## Release rule

V14 feature-branch Quality PASS is necessary but insufficient.

Production promotion requires exact final candidate validation, final visual preview evidence, explicit Owner visual PASS and explicit Owner merge authorization.
