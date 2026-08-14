# V15.1 — Crawl and Indexability Evidence

STATUS: TECHNICAL_PASS_EXTERNAL_INDEXATION_UNMEASURED
DATE: 2026-08-14
EVIDENCE_CLASS: MEASURED_FIRST_PARTY + REPOSITORY_PROOF
PRODUCTION_BASELINE: `67663b08c950de120a94ef8495b5cdc8c9bdecfe`
V15_BRANCH_CANDIDATE: `3c482b0c278b0d00a435b026860a645b597bb48a`
PR: `#22`
QUALITY_RUN: `31815264153`
QUALITY_JOB: `94815290809`
PR_MERGE_REF_TESTED_BY_ACTIONS: `20d8fef7eaab125b4bcf4ff0863c4bf95ab76490`

## 1. Purpose

V15.1 proves the technical crawlability and internal-link integrity of the current 63-URL indexable set before any evidence-driven search-content migration.

It does not claim that Google or Bing have indexed the URLs. Search-engine index state requires platform evidence in V15.2 and V15.3.

## 2. Deterministic crawler

The V15 branch adds:

`scripts/v15-crawl-indexability-contract.mjs`

The contract runs after the static production build and after the rendered Search/Public Truth contract.

It inspects the generated `out/` artifact rather than trusting source intent alone.

For every rendered HTML artifact it:

- identifies `noindex` artifacts;
- requires a canonical on every indexable HTML page;
- requires canonical host `https://leadflowai.pl`;
- rejects query/hash-bearing canonicals;
- normalizes canonical path ownership;
- compares the complete indexable canonical set to `sitemap.xml`;
- scans every rendered `<a href>`;
- resolves relative internal links against the source canonical;
- rejects invalid, `javascript:` and `data:` links;
- rejects non-HTTPS internal links;
- rejects internal links to paths outside the canonical indexable set;
- builds an inbound/outbound page graph;
- fails any non-home indexable orphan;
- fails any indexable page except `/kontakt/` with zero internal navigation targets;
- verifies public wildcard robots rules and canonical sitemap directive.

## 3. Exact measured result

Quality run `31815264153`, job `94815290809` produced:

`V15_CRAWL_INDEXABILITY_PASS indexable=63 noindex=3 sitemap=63_EXACT canonical-host=HTTPS internal-anchors=2020 external-anchors=23 broken=0 orphans=0 min-inbound=1 max-inbound=62 mailto-anchors=139 pages-with-mailto=63 robots=PUBLIC_CRAWL`

Measured facts:

- indexable HTML pages: **63**;
- noindex artifacts: **3**;
- sitemap entries after normalization: **63 exact**;
- canonical host/protocol: **HTTPS / leadflowai.pl**;
- rendered internal anchor occurrences: **2020**;
- rendered external anchor occurrences: **23**;
- broken/invalid internal targets: **0**;
- orphan indexable pages: **0**;
- minimum distinct inbound-page count among non-home indexable URLs: **1**;
- maximum distinct inbound-page count: **62**;
- rendered `mailto:` anchor occurrences: **139**;
- indexable pages containing at least one `mailto:` anchor: **63 / 63**;
- robots public crawl rule: **PASS**.

## 4. Canonical / sitemap / rendered-page parity

The preceding rendered-search contract in the same Quality run also passed:

- `indexable-html=63`;
- `noindex-artifacts=3`;
- `canonicals=63_UNIQUE`;
- `sitemap=63_EXACT_SET`;
- titles: PASS;
- descriptions: PASS;
- H1: EXACT_ONE;
- language: PL;
- robots: PASS;
- schemas: 119;
- Service nodes: at least 35;
- Article nodes: 21;
- FAQPage nodes: at least 35;
- public truth: PASS;
- runtime leaks: ABSENT;
- placeholders: ABSENT.

## 5. Static-route serving proof

The same Quality job served the generated static `out/` artifact through a local HTTP server and completed the repository's static route smoke suite.

Result:

`STATIC_ROUTE_SMOKE_PASS routes=44 sitemap=PASS ... robots=PASS`

This verifies representative static route serving from the built artifact. It is not a substitute for Google/Bing crawler/index evidence.

## 6. Deployment/provider state

The production baseline remains GitHub Pages on `main` with:

- status: `built`;
- CNAME: `leadflowai.pl`;
- public: true;
- HTTPS certificate: approved;
- HTTPS enforcement: true;
- source branch: `main`.

This confirms the production publishing provider state. It does not reveal search-engine index status.

## 7. External indexation boundary

The following remain deliberately unclaimed in V15.1:

- Google indexed URL count;
- Bing indexed URL count;
- Google URL Inspection state;
- Bing URL Inspection state;
- crawl timestamps from either engine;
- impressions;
- clicks;
- CTR;
- average position;
- branded/non-branded query distribution;
- local-pack visibility;
- Google generative-AI visibility;
- Bing/Copilot source or citation visibility.

No Search Console or Bing Webmaster verification token is present in the repository at this checkpoint.

External indexation is therefore:

`PENDING_FIRST_PARTY_PLATFORM_EVIDENCE`

## 8. Interpretation

The current public information architecture is technically well connected: all 63 indexable pages are represented in the sitemap/canonical set, no rendered internal links target nonexistent canonical pages, and no indexable page is orphaned.

The `min-inbound=1` result is a floor, not a quality optimum. V15.4/V15.6 should still evaluate whether low-inbound pages receive enough contextually relevant authority and whether the existing 2020 internal anchor occurrences are semantically useful rather than merely numerous.

Similarly, `pages-with-mailto=63` proves contact-path availability, not conversion performance.

## 9. Verdict

`V15_1_TECHNICAL_CRAWLABILITY=PASS`

`V15_1_CANONICAL_SITEMAP_PARITY=PASS`

`V15_1_INTERNAL_LINK_TARGET_INTEGRITY=PASS`

`V15_1_ORPHAN_PAGES=0`

`V15_1_GOOGLE_INDEXATION=UNMEASURED`

`V15_1_BING_INDEXATION=UNMEASURED`

`V15_1_OVERALL=TECHNICAL_PASS_EXTERNAL_INDEXATION_PENDING`

Next evidence gates:

1. V15.2 Google Search Console property/indexing/performance evidence.
2. V15.3 Bing Webmaster Tools / URL Inspection / IndexNow evidence.
3. V15.4 evidence-ranked query-to-page ownership across the 63-intent baseline.
