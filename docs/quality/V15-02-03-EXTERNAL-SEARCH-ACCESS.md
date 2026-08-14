# V15.2 / V15.3 — External Search Platform Access Gate

STATUS: BLOCKED_EXTERNAL_ACCESS
DATE: 2026-08-14
PRODUCTION_BASELINE: `67663b08c950de120a94ef8495b5cdc8c9bdecfe`
ACTIVE_BRANCH: `v15/search-master-plan`
EVIDENCE_CLASS: REPOSITORY_PROOF

## Purpose

Record the exact boundary between repository/live-public evidence and first-party search-platform evidence before V15 query/ranking decisions continue.

This is an explicit STOP on fabricated platform data, not a STOP on repository work that can be completed truthfully without those platforms.

## V15.2 — Google Search Console

`V15_2_GSC=BLOCKED_EXTERNAL_ACCESS`

At this checkpoint the repository/connected toolset does not provide verified Google Search Console property evidence for `leadflowai.pl`.

Therefore the following remain unmeasured:

- verified Search Console property identity;
- Page Indexing state;
- URL Inspection results;
- Google indexed URL count;
- impressions;
- clicks;
- CTR;
- average position;
- query-to-page performance;
- device/country/search-appearance breakdowns;
- field Core Web Vitals from Search Console/CrUX property evidence;
- Google generative-AI Search performance reporting for the property.

No zero values are substituted for unknown values.

## V15.3 — Bing Webmaster Tools / IndexNow

`V15_3_BING=BLOCKED_EXTERNAL_ACCESS`

At this checkpoint the repository/connected toolset does not provide verified Bing Webmaster Tools property evidence for `leadflowai.pl`.

Therefore the following remain unmeasured:

- verified Bing property identity;
- Bing URL Inspection state;
- Bing indexed/discovered URL count;
- Bing query/click/impression evidence;
- Bing crawl diagnostics;
- Bing backlink evidence;
- IndexNow submission/processing evidence;
- Copilot/Bing AI source or citation visibility.

No IndexNow key or verification secret is introduced by this gate.

## Allowed continuation while blocked

V15 may continue only with clearly labeled evidence classes:

- `REPOSITORY_PROOF`;
- `OBSERVED_PUBLIC_SERP`;
- `OFFICIAL_PLATFORM_GUIDANCE`;
- `HYPOTHESIS_PENDING_DATA`.

Allowed work includes:

- deterministic query/page ownership foundation;
- crawl/indexability hardening;
- canonical/sitemap/robots validation;
- internal-link graph analysis;
- structured-data parity validation;
- evidence-backed local/AEO/GEO copy work;
- SERP observation and demand research;
- performance laboratory evidence;
- measurement schema and monitoring preparation.

## Forbidden while blocked

Do not claim or populate:

- rankings;
- indexed counts;
- impressions;
- clicks;
- CTR;
- average position;
- Search Console query ownership;
- Bing query ownership;
- field CWV;
- AI Overview/AI Mode impressions;
- ChatGPT/Gemini/Copilot citation frequency;
- conversion performance.

## Resume condition

V15.2 or V15.3 may move from `BLOCKED_EXTERNAL_ACCESS` only when real first-party property evidence is available and its property identity, capture date/window and source are recorded.

## Verdict

`V15_2_GSC=BLOCKED_EXTERNAL_ACCESS`

`V15_3_BING=BLOCKED_EXTERNAL_ACCESS`

`FABRICATED_PLATFORM_DATA=FORBIDDEN`

`REPOSITORY_WORK_CONTINUATION=AUTHORIZED_WITH_EVIDENCE_LABELS`
