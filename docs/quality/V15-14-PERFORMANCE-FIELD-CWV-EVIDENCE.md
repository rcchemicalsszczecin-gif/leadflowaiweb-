# V15.14 — Performance / Field Core Web Vitals Evidence

STATUS: LAB_PASS_FIELD_BLOCKED_EXTERNAL_ACCESS
DATE: 2026-08-14
EVIDENCE_CLASS: MEASURED_FIRST_PARTY + REPOSITORY_PROOF
TESTED_HEAD: `adc68770817ca1e3158d5f2781adac959ef80909`
PRODUCTION_BASELINE: `67663b08c950de120a94ef8495b5cdc8c9bdecfe`
QUALITY_RUN: `31825236764`
QUALITY_JOB: `94847711743`

## 1. Laboratory result

The exact tested head passed the existing aggregate and representative-route performance budgets.

Aggregate evidence:

- JS raw: `642394 / 725000 B`;
- JS gzip: `198476 / 220000 B`;
- CSS raw: `157035 / 195000 B`;
- CSS gzip: `35806 / 40000 B`;
- homepage HTML raw: `66318 / 70000 B`;
- homepage HTML gzip: `15072 / 16000 B`;
- largest JS raw: `228922 / 240000 B`;
- largest HTML raw: `79031 / 120000 B`;
- largest HTML gzip: `15664 / 26000 B`.

Marker:

`PERFORMANCE_BUDGET_V10_PASS jsRaw=642394/725000 jsGzip=198476/220000 cssRaw=157035/195000 cssGzip=35806/40000 homepageRaw=66318/70000 homepageGzip=15072/16000 largestJsRaw=228922/240000 largestHtmlRaw=79031/120000 largestHtmlGzip=15664/26000`

## 2. Representative route evidence

Exact-head representative static artifact totals:

- homepage: HTML `66318 / 15170`, total raw/gzip `749520 / 222341`, assets `15`;
- service: HTML `66887 / 12224`, total `747149 / 211553`, assets `13`;
- knowledge hub: HTML `54033 / 10436`, total `739600 / 211120`, assets `14`;
- knowledge article: HTML `36571 / 6912`, total `722138 / 207596`, assets `14`;
- contact: HTML `32996 / 6842`, total `720466 / 208946`, assets `15`;
- lab: HTML `35389 / 7965`, total `748193 / 216506`, assets `15`.

Marker:

`ROUTE_PERFORMANCE_V14_PASS routes=6 baseline=MEASURED_2026-08-14 margins=TIGHT asset-count=ENFORCED`

## 3. Interpretation

The laboratory artifact remains within enforced budgets, but several margins are intentionally tight. This is a preservation signal: V15 search/content work must not casually add large client libraries, duplicate global WebGL runtimes or unnecessary media payloads.

Lab artifact size does not prove real-user Core Web Vitals.

## 4. Field evidence boundary

`V15_14_FIELD_CWV=BLOCKED_EXTERNAL_ACCESS`

Real-user LCP, INP and CLS require field evidence such as Search Console Core Web Vitals / CrUX data with enough volume for the property or URL group.

The following remain unclaimed:

- field LCP;
- field INP;
- field CLS;
- affected field URL groups;
- device-specific field pass/fail;
- field trend over time.

No laboratory proxy is relabeled as field evidence.

## 5. Resume condition

When first-party/CrUX evidence exists, record:

- source and property/origin;
- capture date/window;
- metric and percentile/context exposed by the source;
- affected URL group/device;
- release SHA relevant to the observation;
- before/after comparison only when the sample supports it.

## 6. Verdict

`V15_14_LAB_PERFORMANCE=PASS`

`V15_14_FIELD_CWV=BLOCKED_EXTERNAL_ACCESS`

`LAB_PASS_IS_NOT_FIELD_PASS`

`PERFORMANCE_BUDGETS=ENFORCED`

`MARGINS=TIGHT`
