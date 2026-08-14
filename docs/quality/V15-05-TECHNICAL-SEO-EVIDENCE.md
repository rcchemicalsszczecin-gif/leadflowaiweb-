# V15.5 — Technical SEO Hardening Evidence

STATUS: PASS
DATE: 2026-08-14
EVIDENCE_CLASS: REPOSITORY_PROOF + MEASURED_FIRST_PARTY
TESTED_HEAD: `3a21d553870f96bc850433eed45e8343c4166c64`
PRODUCTION_BASELINE: `67663b08c950de120a94ef8495b5cdc8c9bdecfe`
QUALITY_RUN: `31823830893`
QUALITY_JOB: `94843218590`

## 1. Objective

Harden the rendered static search artifact beyond source-level intent checks and prove that canonical ownership, metadata ownership and local image references remain coherent across the complete 63-page indexable set.

## 2. New deterministic gate

V15.5 adds `scripts/v15-technical-seo-contract.mjs` and runs it after the rendered crawl/indexability contract.

The gate evaluates the built `out/` artifact and requires for every indexable page:

- exact canonical-to-rendered-route parity;
- canonical host `leadflowai.pl`;
- HTTPS;
- trailing-slash canonical form;
- no canonical query/hash;
- unique canonical;
- unique `<title>`;
- unique meta description;
- no meta-refresh redirect;
- `og:url` parity with canonical where Open Graph URL is present;
- existence of local `<img>` assets referenced by rendered HTML.

## 3. Real defects discovered and corrected

The new gate discovered four inherited Open Graph ownership defects that previous contracts did not reject:

1. `/lab/` — inherited homepage `og:url` instead of its own canonical;
2. `/realizacje/` — inherited homepage `og:url` instead of its own canonical;
3. `/uslugi/` — hub inherited homepage Open Graph identity;
4. `/wiedza/` — hub inherited homepage Open Graph identity.

Corrections were made at page metadata source. `/uslugi/` and `/wiedza/` now also carry explicit page-specific Open Graph and Twitter metadata rather than merely overriding a URL field.

No canonical route was added, removed or migrated.

## 4. Exact rendered result

Quality run `31823830893`, job `94843218590`, exact head `3a21d553870f96bc850433eed45e8343c4166c64` produced:

`V15_TECHNICAL_SEO_PASS indexable=63 canonicals=63_EXACT route-canonical=EXACT trailing-slash=PASS titles=63_UNIQUE descriptions=63_UNIQUE meta-refresh=ABSENT local-image-refs=3 missing-local-images=0 og-url-checked=63`

Measured result:

- indexable pages: **63**;
- unique canonical URLs: **63 / 63**;
- rendered route ↔ canonical path: **63 / 63 exact**;
- trailing-slash canonical form: **PASS**;
- titles: **63 unique**;
- meta descriptions: **63 unique**;
- meta refresh on indexable pages: **0**;
- pages with checked `og:url`: **63**;
- `og:url` / canonical mismatch: **0**;
- rendered local `<img>` references checked: **3**;
- missing local image assets: **0**.

## 5. Preserved boundaries

The same exact-head Quality run also preserved:

- 63 exact sitemap/canonical set;
- 0 broken internal targets;
- 0 orphan indexable pages;
- public language and H1 contracts;
- public truth;
- public chatbot OFF;
- online lead delivery OFF;
- analytics runtime not activated;
- dependency audit PASS;
- aggregate and route performance budgets PASS.

## 6. What V15.5 does not claim

This gate does not prove Google/Bing indexation, ranking, CTR, rich results, AI visibility or field Core Web Vitals. Those remain separate evidence classes.

## 7. Verdict

`V15_5_TECHNICAL_SEO=PASS`

`INDEXABLE=63`

`CANONICAL_ROUTE_PARITY=63_OF_63`

`TITLES=63_UNIQUE`

`DESCRIPTIONS=63_UNIQUE`

`OG_URL_CANONICAL_PARITY=63_OF_63`

`MISSING_LOCAL_IMAGES=0`

`CANONICAL_MIGRATION=NONE`
