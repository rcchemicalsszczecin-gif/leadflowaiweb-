# V15.7 — On-Page / SERP Foundation Evidence

STATUS: FOUNDATION_PASS_FIRST_PARTY_CTR_POSITION_BLOCKED
DATE: 2026-08-14
EVIDENCE_CLASS: REPOSITORY_PROOF + MEASURED_FIRST_PARTY
TESTED_HEAD: `841f0598baafc426faf9f93b13c67d19cd8dcef7`
PRODUCTION_BASELINE: `67663b08c950de120a94ef8495b5cdc8c9bdecfe`
QUALITY_RUN: `31825608594`
QUALITY_JOB: `94848921936`

## 1. Objective

Prove the current on-page decision architecture before using real query/CTR/position evidence for page-specific snippet/copy optimization.

V15.7 intentionally separates structural completeness from performance claims.

## 2. Deterministic rendered gate

V15.7 adds `scripts/v15-onpage-serp-contract.mjs` and evaluates the built 63-page indexable artifact.

For the complete set it checks:

- unique titles;
- unique meta descriptions;
- exactly one H1.

For all rendered Service pages it requires:

- visible `ODPOWIEDŹ WPROST` section;
- JSON-LD Service description/direct answer visibly rendered in page copy;
- `05 / DECYZJA` layer;
- visible FAQ;
- direct `mailto:kontakt@leadflowai.pl` contact path.

For all rendered Article pages it requires:

- visible editorial `Zweryfikowano:` checkpoint;
- a visible `/kontakt/` next-step path.

## 3. Exact result

Quality run `31825608594`, job `94848921936`, exact head `841f0598baafc426faf9f93b13c67d19cd8dcef7` produced:

`V15_ONPAGE_SERP_PASS indexable=63 titles=63_UNIQUE descriptions=63_UNIQUE h1=EXACT_ONE services=35 direct-answer=35_OF_35 decision=35_OF_35 faq=35_OF_35 contact-path=35_OF_35 articles=21 reviewed=21_OF_21 article-contact=21_OF_21 ctr=UNMEASURED position=UNMEASURED bulk-rewrite=NO`

Measured foundation:

- indexable pages: **63**;
- titles: **63 unique**;
- descriptions: **63 unique**;
- H1: **exactly one per indexable page**;
- Service direct-answer coverage: **35 / 35**;
- Service decision coverage: **35 / 35**;
- Service FAQ coverage: **35 / 35**;
- Service direct contact path: **35 / 35**;
- Article editorial review marker: **21 / 21**;
- Article contact next step: **21 / 21**.

## 4. CTR / position boundary

Google Search Console and Bing first-party performance data remain unavailable to this branch.

Therefore V15.7 does not claim or infer:

- CTR winners/losers;
- average position;
- impressions/clicks;
- snippet rewrite impact;
- real query ownership;
- page cannibalization based on performance.

`CTR_POSITION_OPTIMIZATION=BLOCKED_FIRST_PARTY_DATA`

## 5. Rewrite rule

No bulk title/description rewrite is authorized merely because alternative copy can be imagined.

Future page-specific changes should use real query/page evidence, observed SERP context and a recorded hypothesis, then enter the V15.19 change log.

## 6. Verdict

`V15_7_ONPAGE_FOUNDATION=PASS`

`SERVICES_DIRECT_ANSWER=35_OF_35`

`SERVICES_DECISION=35_OF_35`

`SERVICES_FAQ=35_OF_35`

`ARTICLES_REVIEWED=21_OF_21`

`CTR_POSITION_OPTIMIZATION=BLOCKED_FIRST_PARTY_DATA`

`BULK_METADATA_REWRITE=NO`
