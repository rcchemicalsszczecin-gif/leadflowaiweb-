# V15.4 — Query / Page Ownership Foundation

STATUS: FOUNDATION_PASS_FIRST_PARTY_METRICS_BLOCKED
DATE: 2026-08-14
PRODUCTION_BASELINE: `67663b08c950de120a94ef8495b5cdc8c9bdecfe`
ACTIVE_BRANCH: `v15/search-master-plan`
EVIDENCE_CLASS: REPOSITORY_PROOF + OBSERVED_PUBLIC_SERP

## Objective

Create a deterministic machine-readable ownership model for all 63 existing indexable canonical intents without inventing Search Console/Bing performance data.

Canonical artifact:

`docs/quality/V15-04-QUERY-PAGE-OWNERSHIP.json`

Baseline semantic authority:

`docs/quality/V13-10-SEARCH-INTENT-MAP.md`

Public SERP observation source:

`docs/quality/V15-16-SERP-DEMAND-RESEARCH-2026-08-14.md`

## Exact foundation result

The V15.4 artifact contains exactly:

- 63 baseline URLs;
- the exact 63 dominant intents inherited from the V13 search-intent source;
- explicit first-party metric status;
- observed public SERP query candidates only where dated public research exists;
- a conservative ownership decision for the complete baseline set.

No canonical ownership is changed by this foundation.

## First-party metric boundary

For the complete map:

`firstPartyMetricsStatus = UNMEASURED`

The following are not populated with synthetic zeros:

- impressions;
- clicks;
- CTR;
- average position.

The complete baseline retains:

`queryOwnershipDecision = PRESERVE_PENDING_FIRST_PARTY_DATA`

This is deliberate. A page may later be kept, expanded, consolidated, split or migrated only after evidence supports the decision.

## Observed public SERP candidates

The dated V15.16 research currently gives query-family candidates for selected existing pages, including:

- `/strony-internetowe` — Szczecin website-production query family;
- `/local-seo` — Szczecin local SEO query family;
- `/aeo` — AEO Poland query family;
- `/geo-ai-search` — GEO / AI Search Poland query family;
- `/seo-aeo-geo` — unified AI Search / SEO query family.

These are `OBSERVED_PUBLIC_SERP` candidates, not Search Console ownership proof and not ranking claims.

## Why this stage matters

Before V15.4, the repository had a strong semantic intent map but no explicit machine-readable place to attach future first-party query measurements.

This stage creates that stable join point:

`canonical URL -> dominant intent -> observed candidate queries -> future first-party metrics -> evidence-backed ownership decision`

It allows later GSC/Bing evidence to update measured fields without silently redefining the 63-page baseline.

## Acceptance

- exact URL parity with V13 intent map;
- exactly 63 baseline URLs;
- no duplicate URL;
- no missing URL;
- no invented first-party metrics;
- no premature split/merge/delete decision;
- observed query candidates trace to dated V15.16 research;
- canonical set remains unchanged.

## Verdict

`V15_4_QUERY_PAGE_FOUNDATION=PASS`

`ROWS=63_EXACT`

`FIRST_PARTY_METRICS=BLOCKED_EXTERNAL_ACCESS`

`CURRENT_OWNERSHIP=PRESERVE_PENDING_DATA`

`CANONICAL_MIGRATION=NONE`
