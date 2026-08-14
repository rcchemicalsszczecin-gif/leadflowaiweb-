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
V14_VALIDATED_GOVERNANCE_CHECKPOINT=31225c140483d50863b8262b4675d8d55caf124e
V14_RENDERED_SEARCH_TRUTH=PASS_63_EXACT_SET
V14_ACTIVE_LINT_WARNINGS=0
V14_OWNER_VISUAL_ACCEPTANCE=PASS
V14_OWNER_VISUAL_ACCEPTED_AT=2026-08-14T14:09:00+02:00
R9_PREMERGE_HARDENING=PASS
R9_PREMERGE_EVIDENCE_CHECKPOINT=686ca9dbb42b21cdec26b4301ca6040eac80f767
RELEASE_STATE=READY_FOR_SEPARATE_MERGE_AUTHORIZATION
MERGE_AUTHORIZATION=NOT_GRANTED
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

Validated governance checkpoint before Owner review:
`31225c140483d50863b8262b4675d8d55caf124e`

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
- 3 noindex/error artifacts;
- 63 unique canonical URLs;
- 63 sitemap URLs with exact canonical-set match;
- title/description/exact-one-H1/lang/robots: PASS;
- JSON-LD payloads evaluated: 119;
- Service schema >=35;
- Article schema =21;
- FAQPage schema >=35;
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
- PASS on the same governance checkpoint;
- desktop/tablet/mobile bounded captures: PASS;
- long reduced-motion desktop/mobile captures: PASS;
- active Liquid desktop/mobile captures: PASS.

## V14.10 Owner acceptance

OWNER_VISUAL_PASS=ACCEPTED
ACCEPTED_CANDIDATE=31225c140483d50863b8262b4675d8d55caf124e

The Owner accepted the final V14 visual direction and authorized continuation into R9 release hardening.

MERGE_AUTHORIZATION=NOT_GRANTED

## R9 pre-merge hardening

Validated pre-merge evidence checkpoint:
`686ca9dbb42b21cdec26b4301ca6040eac80f767`

Evidence:
- Quality: PASS;
- Browser Matrix: PASS 28/28;
- Visual Preview: PASS;
- branch lineage: 303 ahead / 0 behind relative to `main`;
- merge base: exact production V13 `10627e2f18ccfc7ef86c76a695dab9cf7933cce9`;
- PR #19: OPEN, Draft, mergeable=true, merged=false;
- release diff: 101 changed files, 6486 additions, 1804 deletions;
- unexpected paths: ABSENT;
- temporary patch/write-helper workflows/scripts: ABSENT;
- current workflows: pages, quality, browser matrix, preview only;
- `contents: write` residue: ABSENT;
- unresolved review threads: 0;
- production `main`: unchanged.

R9_PREMERGE_HARDENING=PASS
RELEASE_STATE=READY_FOR_SEPARATE_MERGE_AUTHORIZATION

## Current blocker

The only remaining blocker is separate explicit Owner `MERGE AUTHORIZED`.

Repository-setting debt remains separate from the V14 candidate: `main` protection and Dependabot alerts are still OFF.

## Release rule

Owner visual PASS and R9 PRE-MERGE PASS are complete but do not authorize production promotion. V14 must remain Draft/unmerged until separate explicit Owner `MERGE AUTHORIZED` is given.
