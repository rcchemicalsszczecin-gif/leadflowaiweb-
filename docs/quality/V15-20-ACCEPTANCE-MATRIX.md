# V15 — Final Acceptance Matrix

STATUS: RELEASE_CANDIDATE_EVIDENCE_COMPLETE_EXTERNAL_MEASUREMENT_PENDING
DATE: 2026-08-14
PUBLIC_BRAND: LeadFlowAI
PRODUCTION_BRANCH: `main`
PRODUCTION_BASELINE: `67663b08c950de120a94ef8495b5cdc8c9bdecfe`
WORK_BRANCH: `v15/search-master-plan`
VALIDATED_IMPLEMENTATION_CHECKPOINT: `9e578bac8e789d5912cacfa0f30c2f71696046a3`
PR: `#22` — Draft
VISUAL_AUTHORITY: `V14_GLOBAL_LIQUID_WORLD`

## 1. Purpose

This matrix records the truthful V15 Search program acceptance state after repository, rendered-artifact, browser and visual validation.

It does not convert missing external evidence into PASS. A stage may be technically complete while its real search-engine/business measurement remains blocked by an external source or separate Owner authority.

No entry in this document authorizes merge or production deployment.

## 2. Acceptance matrix

| Stage | Scope | Status | Evidence boundary |
|---|---|---|---|
| V15.0 | Production search baseline | **PASS** | exact production artifact frozen |
| V15.1 | Crawl / indexability / internal graph | **TECHNICAL PASS** | Google/Bing indexation unmeasured |
| V15.2 | Google Search Console | **BLOCKED_EXTERNAL_ACCESS** | property data not available through current connected tools |
| V15.3 | Bing Webmaster / IndexNow | **BLOCKED_EXTERNAL_ACCESS** | property data not available through current connected tools |
| V15.4 | 63-URL query/page ownership model | **FOUNDATION PASS** | real query metrics unmeasured |
| V15.5 | Technical SEO hardening | **PASS** | rendered artifact evidence |
| V15.6 | Information architecture / internal links | **PASS** | rendered graph evidence |
| V15.7 | On-page / SERP foundation | **PASS** | CTR/position optimization pending first-party data |
| V15.8 | Local SEO / Szczecin + Poland | **PASS** | ranking/local-pack impact unmeasured |
| V15.9 | AEO answer architecture | **PASS** | no separate ranking guarantee |
| V15.10 | GEO / generative-AI source readiness | **PASS** | AI visibility/citation unmeasured |
| V15.11 | Content-gap editorial program | **FOUNDATION PASS** | new URL creation pending evidence |
| V15.12 | Structured data / entity parity | **PASS** | rich-result/AI eligibility not claimed |
| V15.13 | Image / media SEO | **PASS** | first-party rendered/media evidence |
| V15.14 | Performance / Core Web Vitals | **LAB PASS** | field CWV blocked external |
| V15.15 | Conversion measurement | **PLAN READY** | analytics runtime NOT AUTHORIZED |
| V15.16 | SERP / competitor / demand research | **PASS_OBSERVATIONAL** | public observation is not first-party performance data |
| V15.17 | Original evidence / research | **BLOCKED_NO_AUDITABLE_DATASET** | no public study claims admitted |
| V15.18 | Off-page / local entity | **FOUNDATION READY** | business location/profile facts require verification |
| V15.19 | Monitoring / search change log | **READY** | current external metrics remain null/unmeasured |
| V15.20 | 30/60/90 operating program | **ACTIVE** | future actions remain evidence-gated |

## 3. Exact technical acceptance evidence

Validated implementation checkpoint `9e578bac8e789d5912cacfa0f30c2f71696046a3` passed:

### Quality

- run: `31826018112` / Quality #959;
- job: `94850230139`;
- conclusion: **SUCCESS**;
- TypeScript: PASS;
- Biome: PASS;
- Next static build: 68/68;
- npm audit: 0 vulnerabilities;
- public artifact and route smoke: PASS;
- all active V15 contracts: PASS.

Key rendered state:

- indexable HTML: **63**;
- noindex artifacts: **3**;
- canonical URLs: **63 unique**;
- sitemap: **63 exact set**;
- broken internal targets: **0**;
- orphan indexable pages: **0**;
- internal anchor occurrences: **2080**;
- titles: **63 unique**;
- meta descriptions: **63 unique**;
- H1: **exactly one per indexable page**.

### Browser Matrix

- run: `31826014964` / Browser Matrix #171;
- job: `94850220331`;
- conclusion: **SUCCESS**;
- marker: `BROWSER_MATRIX_V15_PASS browsers=2 cases=48 homepage-viewports=6 representative-routes=9x2 overflow=PASS navigation=PASS landmarks=PASS truth=PASS firefox-mobile=BIDI_TRUE_CSS_VIEWPORT session-retry=BOUNDED`.

### Route Visual Preview

- run: `31826014918` / Route Preview #65;
- job: `94850220301`;
- conclusion: **SUCCESS**;
- marker: `V15_ROUTE_PREVIEW_PASS routes=9 viewports=2 captures=18 global-liquid=WEBGL2`;
- artifact ID: `9228859774`;
- digest: `sha256:1f95052794fe11bd4f5de29b3e557ec94193639c82a89e6d0f5e787eddb36ca7`.

## 4. Defects actually discovered and corrected during V15 hardening

V15 did not merely document the inherited site. New strict gates exposed and corrected real defects:

### V15.5 — Open Graph / canonical ownership

Four inherited route-level defects were found and corrected:

- `/lab/`;
- `/realizacje/`;
- `/uslugi/`;
- `/wiedza/`.

Final result: `og:url` / canonical parity **63/63**.

### V15.6 — incomplete Service → knowledge graph

The existing registry supported only a subset of public Service pages.

It was expanded to all **35/35** Service pages using only the existing **21** reviewed Article canonicals.

Final rendered graph:

- Service pages with knowledge: 35/35;
- Articles with Service path: 21/21;
- Article hub return: 21/21;
- knowledge corpus referenced from Service pages: 21/21;
- Service → Article edges: 72;
- Article → Service edges: 56.

### V15.12 — structured-data canonical normalization

The first strict structured-data parity run found **378 violations** produced by one central URL-normalization defect: JSON-LD entity URLs lacked the trailing slash used by rendered canonical URLs.

The central generator was corrected once. Final result:

- Organization: 63;
- WebSite: 63;
- Service: 35;
- Article: 21;
- FAQPage: 35;
- visible FAQ questions validated: 112;
- JSON-LD payloads: 119;
- canonical parity: EXACT;
- breadcrumb parity: EXACT;
- truthful dates: PASS;
- unsupported LocalBusiness/Offer/Review/rating/price/address schema: ABSENT.

### V15.13 — social image metadata inheritance

The first strict media run found exactly **16** indexable routes losing `og:image` through nested Next metadata replacement.

All affected routes were corrected using the existing first-party social metadata helper and `/og-leadflowai.svg`.

Final result:

- `og:image`: 63/63;
- `twitter:image`: 63/63;
- missing image assets: 0;
- rendered image alt coverage: PASS;
- external media dependencies: ABSENT.

## 5. Search/public-truth boundaries preserved

V15 preserves:

- 63 indexable canonical URLs;
- 35 Service pages;
- 21 knowledge Articles;
- V14 Global Liquid World visual authority;
- first-party LeadFlowAI brand mark;
- direct e-mail contact through `kontakt@leadflowai.pl`;
- public chatbot OFF;
- online lead delivery OFF;
- analytics runtime NOT AUTHORIZED;
- no pricing publication;
- no fabricated clients, rankings, KPI, AI citations, research or local-office facts.

V15 does not introduce:

- a city doorway-page factory;
- fake location/address claims;
- `LocalBusiness` without verified facts;
- special AI-only schema;
- `llms.txt` as Google ranking theatre;
- tracking pixels/cookies/analytics runtime;
- invented Search Console/Bing/CrUX metrics.

## 6. External blockers after repository acceptance

The following require evidence or authority outside the current repository automation surface:

1. **Google Search Console** property/index/query/performance evidence — Issue #25.
2. **Bing Webmaster Tools** property/index/query evidence — Issue #25.
3. **Field Core Web Vitals** from a real field source — pending platform/CrUX evidence.
4. **Conversion telemetry** — requires separate analytics/privacy Owner authority.
5. **Original public research** — requires a real auditable dataset.
6. **Location-bearing local profiles / LocalBusiness facts** — require verified public business facts.

Unknown data remains unknown; it is not represented as zero.

## 7. Maintenance explicitly outside V15 release scope

Post-V15 repository maintenance is separated so it cannot contaminate the Search release candidate:

- Issue #23 — repository settings and IP hardening;
- Issue #24 — reference-proven legacy route CSS de-stack;
- Issue #25 — GSC/Bing external evidence gate.

The legacy route bridge remains intentionally retained because it is actively loaded by inner-route `V14SiteHeader` and still contains generic selectors participating in the compatibility cascade. Homepage remains bridge-free.

## 8. Release verdict

`V15_REPOSITORY_SEARCH_FOUNDATION=PASS`

`V15_EXTERNAL_SEARCH_MEASUREMENT=PENDING_EXTERNAL_ACCESS`

`V15_FIELD_CWV=PENDING_EXTERNAL_EVIDENCE`

`V15_CONVERSION_RUNTIME=NOT_AUTHORIZED`

`V15_ORIGINAL_RESEARCH=BLOCKED_NO_AUDITABLE_DATASET`

`V15_CANONICAL_SET=63_PRESERVED`

`V15_PUBLIC_TRUTH=PASS`

`V15_MERGE_AUTHORIZATION=NOT_GRANTED_BY_THIS_MATRIX`

`V15_DEPLOY_AUTHORIZATION=NOT_GRANTED_BY_THIS_MATRIX`

Draft PR #22 remains the review/release boundary. Production `main` remains unchanged until separate explicit Owner authorization.
