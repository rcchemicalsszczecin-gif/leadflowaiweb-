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
V14_ROUTE_MIGRATION=NOT_COMPLETE
V14_FINAL_QA=NOT_COMPLETE
V14_OWNER_VISUAL_ACCEPTANCE=BLOCKED_PENDING_RELIABLE_PREVIEW
MAIN_BRANCH_PROTECTION=OFF
DEPENDABOT_ALERTS=OFF

## Production architecture

LeadFlowAI production is a Next.js static export deployed through GitHub Actions to GitHub Pages.

Production `main` already contains the Owner-authorized V13 Polish Production Rebuild. It is incorrect to describe the public application as not yet deployed.

## Current V14 branch

V14 is a feature-branch full visual rebuild.

The active branch is intentionally separate from `main` while design, CSS/runtime consolidation, route migration and visual acceptance remain unfinished.

The authoritative V14 plan is `docs/plans/V14-VISUAL-REBUILD.md`.

## Current frontend boundaries

- No dynamic `app/api/**` server runtime is required by GitHub Pages.
- Direct public contact is e-mail only.
- Public lead submission remains OFF.
- Public chatbot remains OFF.
- Future local API origin remains an architectural target only for a separately authorized runtime stage.

## Search/content boundary

V14 preserves the V13 content/search foundation:
- 35 service/money pages;
- 21 knowledge articles;
- 63 dominant intents;
- canonical/sitemap/robots;
- structured-data/public-truth rules;
- real-only portfolio.

## Current V14 blockers

- mobile shell/accessibility fixes are being applied;
- historical CSS/runtime override stack still requires consolidation;
- global WaterSurface ownership still requires de-stack/migration work;
- all service/primary routes still require V14 shell migration;
- preview workflow requires hardening;
- Owner visual review has not occurred;
- final dependency/security and browser QA has not occurred.

## Release rule

V14 feature-branch Quality PASS is necessary but insufficient.

Production promotion requires exact final candidate validation, reliable visual preview evidence, explicit Owner visual PASS and explicit Owner merge authorization.
