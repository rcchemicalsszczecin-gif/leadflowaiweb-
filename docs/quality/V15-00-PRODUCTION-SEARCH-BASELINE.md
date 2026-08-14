# V15.0 — Production Search Baseline

STATUS: LOCKED_BASELINE
DATE: 2026-08-14
EVIDENCE_CLASS: MEASURED_FIRST_PARTY + REPOSITORY_PROOF
PRODUCTION_HEAD: `67663b08c950de120a94ef8495b5cdc8c9bdecfe`
PRODUCTION_PAGES_RUN: `31810716199`
PRODUCTION_BUILD_JOB: `94800401647`
PRODUCTION_DEPLOYMENT: PASS
V15_WORK_BRANCH_BASE: `67663b08c950de120a94ef8495b5cdc8c9bdecfe`
VISUAL_AUTHORITY: V14_GLOBAL_LIQUID_WORLD

## 1. Purpose

This document freezes the search/technical starting point for V15 before any search-driven public change.

It is a baseline, not a ranking claim. Later V15 work must compare against this record rather than silently redefining the starting state.

## 2. Production identity evidence

GitHub Pages production run #38 executed against exact `main` SHA:

`67663b08c950de120a94ef8495b5cdc8c9bdecfe`

Run ID:

`31810716199`

Build job:

`94800401647`

Build conclusion: PASS.
Deploy conclusion: PASS.
Pages artifact identity: PASS.
CNAME: `leadflowai.pl`.
Static API artifact: absent as required.

## 3. Static route baseline

Next.js 16.3.1 generated 68 static route entries including technical/error endpoints.

Public rendered artifact contract:

- HTML artifacts: 66;
- public indexable HTML: 63;
- noindex artifacts: 3;
- canonical URLs: 63 unique;
- sitemap URLs: 63 exact set;
- duplicate sitemap URLs: 0;
- canonical/sitemap set mismatch: 0;
- HTML language: `pl` PASS;
- exactly one H1 on every indexable page: PASS;
- titles: PASS;
- meta descriptions: PASS;
- robots: PASS;
- branded noindex 404: PASS;
- placeholders: ABSENT;
- disabled/local runtime URL leaks: ABSENT.

## 4. Search intent baseline

The baseline dominant-intent map contains exactly:

- 42 main/public/service URLs;
- 21 knowledge/article URLs;
- 63 total indexable URL intents;
- 63 unique URL assignments;
- 63 unique dominant intent descriptions.

Canonical source:

`docs/quality/V13-10-SEARCH-INTENT-MAP.md`

V15 does not automatically preserve every wording decision forever, but URL ownership may change only after evidence-backed review and explicit migration validation.

## 5. Structured-data baseline

Rendered production baseline:

- total JSON-LD script payloads counted by current contract: 119;
- Service nodes: at least 35;
- Article nodes: exactly 21;
- FAQPage nodes: at least 35;
- Organization: present;
- WebSite: present;
- WebPage: present on service/article architecture where defined;
- BreadcrumbList: present where defined;
- visible public-truth parity checks: PASS.

Current schema source:

`lib/structured-data.ts`

V15.12 must validate semantics and visible-content parity before changing schema. Schema presence is not treated as evidence of rich-result or AI-citation eligibility.

## 6. Sitemap and robots baseline

Sitemap is generated from public registries plus primary public routes in `app/sitemap.ts`.

Baseline properties:

- exact sitemap cardinality: 63;
- canonical domain: `https://leadflowai.pl`;
- robots user-agent rule: `*`;
- public crawl allow: `/`;
- sitemap directive points to `https://leadflowai.pl/sitemap.xml`;
- no global disallow rule.

## 7. Public truth / conversion baseline

- public brand: LeadFlowAI;
- legal operator relation: Tervyxa Systems sp. z o.o.;
- public contact: `kontakt@leadflowai.pl`;
- direct e-mail: ACTIVE;
- online lead delivery: OFF_BY_OWNER;
- public chatbot: OFF;
- dormant chatbot network: OFF;
- analytics runtime: NOT AUTHORIZED;
- pricing: UNPUBLISHED;
- portfolio: 3 real first-party projects, 0 external-client case studies;
- fake rankings/KPI/citations/research: prohibited.

## 8. Performance laboratory baseline

Production run #38 aggregate budget evidence:

- JS raw: 642394 / 725000 B;
- JS gzip: 198476 / 220000 B;
- CSS raw: 157035 / 195000 B;
- CSS gzip: 35806 / 40000 B;
- homepage HTML raw: 66318 / 70000 B;
- homepage HTML gzip: 15073 / 16000 B;
- largest JS raw: 228922 / 240000 B;
- largest HTML raw: 74187 / 120000 B;
- largest HTML gzip: 14912 / 26000 B.

Representative route baseline:

| Route class | HTML raw/gzip | JS raw/gzip | CSS raw/gzip | Total raw/gzip | Assets |
|---|---:|---:|---:|---:|---:|
| homepage | 66318 / 15171 | 610722 / 188834 | 72480 / 18337 | 749520 / 222342 | 15 |
| service | 63264 / 11825 | 578727 / 177517 | 101535 / 21812 | 743526 / 211154 | 13 |
| knowledge hub | 53925 / 10574 | 578727 / 177517 | 106840 / 23167 | 739492 / 211258 | 14 |
| knowledge article | 36555 / 6916 | 578727 / 177517 | 106840 / 23167 | 722122 / 207600 | 14 |
| contact | 32548 / 6873 | 581284 / 178872 | 106186 / 23232 | 720018 / 208977 | 15 |
| lab | 35772 / 8166 | 593044 / 182310 | 119760 / 26231 | 748576 / 216707 | 15 |

These are laboratory artifact budgets, not field Core Web Vitals.

## 9. Security/dependency baseline

Production verification:

- runtime dependencies: 3 approved;
- npm audit high threshold: 0 vulnerabilities;
- dynamic public API routes: ABSENT;
- external scripts: ABSENT;
- external CSS assets: ABSENT;
- local storage: ABSENT;
- cookies: ABSENT;
- network fetch in active public source: ABSENT under the current security contract;
- secrets in public source scan: ABSENT.

## 10. Visual/runtime baseline relevant to search

V14 Global Liquid World is active but decorative/search-independent:

- essential content remains server/static HTML;
- H1/copy/navigation do not depend on WebGL;
- global WebGL field is guarded from competing with accepted hero Liquid;
- reduced-motion/no-WebGL fallback exists;
- PCB/CPU/GPU Liquid visuals do not carry canonical business truth;
- no white/paper public section art direction;
- Owner-provided LeadFlowAI mark is active.

## 11. What this baseline DOES prove

`MEASURED_FIRST_PARTY` / `REPOSITORY_PROOF`:

- exact static production artifact identity at the recorded SHA;
- build/deploy PASS;
- exact rendered canonical/sitemap cardinality;
- metadata/H1/lang/robots contract health;
- structured-data inventory under the current parser;
- static route generation;
- laboratory size budgets;
- current public-truth/runtime-off boundaries.

## 12. What this baseline DOES NOT prove

This baseline does **not** prove:

- that all 63 URLs are indexed by Google;
- that all 63 URLs are indexed by Bing;
- Google rankings or average positions;
- Bing rankings;
- impressions;
- clicks;
- CTR;
- branded/non-branded query demand;
- local-pack visibility;
- Google generative-AI visibility;
- Bing/Copilot citation or grounding visibility;
- third-party AI citation frequency;
- backlinks;
- field LCP/INP/CLS;
- conversion rate;
- qualified lead volume.

Those require V15.1–V15.20 evidence. Missing first-party platform data must be reported as missing, never estimated as fact.

## 13. Evidence model for subsequent V15 work

Every search observation must use one of:

- `MEASURED_FIRST_PARTY` — property/runtime/CI evidence owned by LeadFlowAI;
- `OBSERVED_PUBLIC_SERP` — dated public search result observation;
- `REPOSITORY_PROOF` — deterministic source/build evidence;
- `OFFICIAL_PLATFORM_GUIDANCE` — current primary platform documentation;
- `HYPOTHESIS_PENDING_DATA` — proposed interpretation awaiting evidence.

## 14. Query/page measurement row schema

Each future measured query/page row should record at minimum:

- capture date/time;
- source platform;
- measurement window;
- query;
- page/canonical URL;
- country/device/search appearance where available;
- impressions;
- clicks;
- CTR;
- average position;
- branded/non-branded/local classification;
- dominant intent;
- evidence class;
- notes/limitations;
- release SHA relevant to the observation.

Unknown values remain unknown; zero is used only when the source explicitly reports zero.

## 15. Baseline verdict

`V15_0_PRODUCTION_SEARCH_BASELINE=PASS`

`PRODUCTION_HEAD=67663b08c950de120a94ef8495b5cdc8c9bdecfe`

`INDEXABLE_HTML=63`

`NOINDEX_ARTIFACTS=3`

`CANONICALS=63_UNIQUE`

`SITEMAP=63_EXACT_SET`

`SCHEMAS=119`

`SERVICE_SCHEMA>=35`

`ARTICLE_SCHEMA=21`

`FAQ_SCHEMA>=35`

`SEARCH_PLATFORM_INDEXATION=NOT_YET_MEASURED_IN_THIS_BASELINE`

`RANKINGS_CTR_AI_VISIBILITY=NOT_CLAIMED`

Next execution gate: V15.1 live crawl/indexability baseline, followed by V15.2/V15.3 first-party Google/Bing evidence where access is available.
