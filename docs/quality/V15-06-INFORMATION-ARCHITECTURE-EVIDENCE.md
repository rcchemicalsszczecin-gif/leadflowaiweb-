# V15.6 — Information Architecture / Internal Linking Evidence

STATUS: PASS
DATE: 2026-08-14
EVIDENCE_CLASS: REPOSITORY_PROOF + MEASURED_FIRST_PARTY
TESTED_HEAD: `3a21d553870f96bc850433eed45e8343c4166c64`
PRODUCTION_BASELINE: `67663b08c950de120a94ef8495b5cdc8c9bdecfe`
QUALITY_RUN: `31823830893`
QUALITY_JOB: `94843218590`

## 1. Objective

Make the existing service ↔ knowledge architecture complete and machine-verifiable without creating thin URLs or synthetic content.

## 2. Source gap found

The public service renderer already supported a `Wiedza powiązana` section, but the underlying `lib/service-knowledge-links.ts` registry supplied knowledge relationships for only a subset of the 35 public Service pages.

V15.6 completed the registry using only the existing 21 reviewed knowledge articles.

No article, service URL or canonical was created for the purpose of satisfying the graph.

## 3. New rendered gate

V15.6 adds `scripts/v15-information-architecture-contract.mjs` and runs it against the built static artifact.

The gate identifies rendered Service and Article pages from their JSON-LD types and requires:

- exactly 35 rendered Service pages;
- exactly 21 rendered Article pages;
- every Service page links to at least one existing Article;
- every Article links to at least one existing Service page;
- every Article links back to `/wiedza/`;
- every one of the 21 Articles is referenced by at least one Service page.

## 4. Exact measured result

Exact head `3a21d553870f96bc850433eed45e8343c4166c64` passed Quality run `31823830893`, job `94843218590` with:

`V15_INFORMATION_ARCHITECTURE_PASS services=35_WITH_KNOWLEDGE articles=21_WITH_SERVICE hub-return=21_OF_21 knowledge-coverage=21_OF_21 service-knowledge-edges=72 article-service-edges=56 canonical-set=UNCHANGED`

Measured graph:

- Service pages with knowledge support: **35 / 35**;
- Article pages with commercial Service path: **21 / 21**;
- Articles linking to the knowledge hub: **21 / 21**;
- knowledge corpus referenced from Service pages: **21 / 21**;
- distinct rendered Service → Article edges counted by the gate: **72**;
- rendered Article → Service edges counted by the gate: **56**.

## 5. Crawl result after graph completion

The same Quality run produced:

`V15_CRAWL_INDEXABILITY_PASS indexable=63 noindex=3 sitemap=63_EXACT canonical-host=HTTPS internal-anchors=2080 external-anchors=24 broken=0 orphans=0 min-inbound=1 max-inbound=62 ...`

Relevant result:

- rendered internal anchor occurrences: **2080**;
- broken internal targets: **0**;
- orphan indexable pages: **0**;
- canonical/sitemap set: **63 exact, unchanged**.

Anchor count is not treated as a ranking metric. The purpose of the new edges is user/context continuity and explicit topic relationships.

## 6. Public-truth / content boundary

V15.6 did not generate new articles, city pages, AI pages or near-duplicate content. Every new relationship points to an already existing reviewed canonical article.

No ranking, CTR or authority-transfer outcome is claimed from the graph itself.

## 7. Verdict

`V15_6_INFORMATION_ARCHITECTURE=PASS`

`SERVICE_KNOWLEDGE_COVERAGE=35_OF_35`

`ARTICLE_SERVICE_COVERAGE=21_OF_21`

`KNOWLEDGE_HUB_RETURN=21_OF_21`

`KNOWLEDGE_CORPUS_USED=21_OF_21`

`BROKEN_INTERNAL_TARGETS=0`

`ORPHAN_INDEXABLE_PAGES=0`

`CANONICAL_SET=63_PRESERVED`
