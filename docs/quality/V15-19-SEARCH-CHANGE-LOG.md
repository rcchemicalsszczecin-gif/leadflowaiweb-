# V15.19 — Search Monitoring / Change Log

STATUS: MONITORING_MODEL_READY_EXTERNAL_METRICS_UNMEASURED
DATE: 2026-08-14
CANONICAL_SCHEMA: `docs/quality/V15-19-SEARCH-MONITORING-SCHEMA.json`

## 1. Purpose

Create one stable place for future Search Console, Bing, indexation, field CWV, generative-AI and authorized conversion evidence so V15 changes can be compared against exact release revisions.

This document is a model and change log, not a current performance dashboard.

## 2. Snapshot cadence after data access

When the required sources exist, prefer:

- initial property baseline after verified access;
- monthly Search Console snapshot;
- monthly Bing snapshot;
- additional snapshots after a material search release when the observation window is meaningful;
- field CWV snapshots when sufficient source data exists;
- generative-AI reporting only from a real exposed source/property report;
- conversion snapshots only after separate analytics/privacy authority and real measurement exist.

## 3. Required snapshot identity

Every measured snapshot must record:

- capture date;
- source platform;
- measurement window;
- canonical URL/query where relevant;
- release SHA;
- evidence class;
- source dimensions such as country/device/search appearance where useful;
- limitations/notes.

Unknown values remain null. Zero is recorded only when the named source explicitly reports zero.

## 4. Required change-log fields

For every material search change record:

- date;
- hypothesis;
- evidence supporting the change;
- affected canonical URLs;
- exact revision/commit;
- expected observable signal;
- minimum/target observation window;
- actual result when measured;
- limitations/confounders;
- decision: keep / revert / further-test.

## 5. Change-log template

### YYYY-MM-DD — <short change name>

- Evidence class: `<...>`
- Hypothesis: `<...>`
- Affected URLs: `<...>`
- Revision: `<sha>`
- Expected signal: `<...>`
- Observation window: `<...>`
- Actual result: `UNMEASURED` until real source data exists
- Limitations: `<...>`
- Decision: `PENDING_EVIDENCE`

## 6. V15 current change records

### 2026-08-14 — Local intent strengthening

- Evidence class: `OBSERVED_PUBLIC_SERP + REPOSITORY_PROOF`
- Affected URLs: `/strony-internetowe/`, `/local-seo/`
- Change: strengthen genuine Szczecin/local context and bidirectional relationship without adding a city doorway canonical.
- Expected signal: improved relevance for genuine local query families without creating cannibalization through a new city URL.
- Actual result: `UNMEASURED`
- Decision: `PENDING_FIRST_PARTY_QUERY_DATA`

### 2026-08-14 — AEO / GEO / AI Search truth alignment

- Evidence class: `OFFICIAL_PLATFORM_GUIDANCE + REPOSITORY_PROOF`
- Affected URLs: `/aeo/`, `/geo-ai-search/`, `/seo-aeo-geo/`, `/wiedza/ai-search-google-co-robic-2026/`
- Change: clarify distinct public roles while keeping SEO as the technical/content foundation and removing unsupported AI-ranking implications.
- Expected signal: clearer user/source understanding without false citation guarantees.
- Actual result: `UNMEASURED`
- Decision: `PENDING_FIRST_PARTY/OBSERVED_VISIBILITY_DATA`

### 2026-08-14 — Technical Search parity hardening

- Evidence class: `REPOSITORY_PROOF + MEASURED_FIRST_PARTY`
- Affected URLs: complete 63-page indexable set.
- Change: canonical/OG parity, complete Service↔knowledge graph, JSON-LD canonical parity and complete first-party social media metadata.
- Expected signal: remove technical ambiguity and preserve coherent page/entity relationships.
- Actual result: technical contracts PASS; external search impact `UNMEASURED`.
- Decision: `KEEP_TECHNICAL_INTEGRITY`

## 7. Current external measurement state

- Google Search Console: `BLOCKED_EXTERNAL_ACCESS`;
- Bing Webmaster Tools: `BLOCKED_EXTERNAL_ACCESS`;
- field Core Web Vitals: `BLOCKED_EXTERNAL_ACCESS`;
- authorized conversion telemetry: `NOT_AUTHORIZED`;
- rankings/CTR/clicks/impressions: `UNMEASURED`.

## 8. Verdict

`V15_19_MONITORING_MODEL=READY`

`CURRENT_EXTERNAL_METRICS=UNMEASURED`

`UNKNOWN_IS_NOT_ZERO=ENFORCED_BY_SCHEMA`

`SEARCH_CHANGE_LOG=ACTIVE`
