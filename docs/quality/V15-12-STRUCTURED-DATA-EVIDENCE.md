# V15.12 — Structured Data / Entity Validation Evidence

STATUS: PASS
DATE: 2026-08-14
EVIDENCE_CLASS: REPOSITORY_PROOF + MEASURED_FIRST_PARTY
TESTED_HEAD: `adc68770817ca1e3158d5f2781adac959ef80909`
PRODUCTION_BASELINE: `67663b08c950de120a94ef8495b5cdc8c9bdecfe`
QUALITY_RUN: `31825236764`
QUALITY_JOB: `94847711743`

## 1. Objective

Prove that rendered JSON-LD represents the same canonical public truth as the visible page and the HTML canonical layer across the complete indexable site.

## 2. Deterministic gate

V15.12 adds `scripts/v15-structured-data-parity-contract.mjs` and runs it against the built `out/` artifact.

The contract validates:

- exactly one global Organization and WebSite identity per indexable page;
- LeadFlowAI / Tervyxa Systems public identity consistency;
- Service/WebPage/Breadcrumb canonical URL parity;
- Article/WebPage/Breadcrumb canonical URL parity;
- Service provider and nationwide `Country / Polska` scope;
- visible FAQ parity for every FAQPage question and answer;
- truthful Article/WebPage `dateModified` values;
- Article headline parity with visible H1;
- absence of unsupported `datePublished`;
- absence of unverified LocalBusiness, Offer, Review, AggregateRating, price/rating/address schema.

## 3. Defect discovered

The first V15.12 run exposed a systematic canonical normalization defect rather than hundreds of independent content defects.

Rendered HTML canonicals use trailing-slash URLs, while the central JSON-LD generator previously produced non-trailing-slash URLs for Service and Article entities and their derived WebPage/Breadcrumb identities.

Because one central generator serves 35 Service pages and 21 Article pages, the same source defect propagated through multiple JSON-LD fields and produced 378 parity violations in the first strict run.

## 4. Central correction

`lib/structured-data.ts` was corrected once at the source:

- Service canonical URL -> `${site.url}/${page.slug}/`;
- Article canonical URL -> `${site.url}/wiedza/${article.slug}/`;
- knowledge breadcrumb hub -> `${site.url}/wiedza/`;
- all derived `@id`, `mainEntity`, `mainEntityOfPage` and terminal breadcrumb relationships now derive from those exact canonical URLs.

No public route, canonical ownership, content intent or schema type was added for this fix.

## 5. Exact verified result

Quality run `31825236764`, job `94847711743`, exact tested head `adc68770817ca1e3158d5f2781adac959ef80909` produced:

`V15_STRUCTURED_DATA_PASS indexable=63 organization=63 website=63 service=35 article=21 faq=35 faq-questions=112 payloads=119 canonical-parity=EXACT breadcrumbs=EXACT visible-faq=PASS dates=TRUTHFUL forbidden-schema=ABSENT`

Measured result:

- indexable pages checked: **63**;
- Organization nodes: **63**;
- WebSite nodes: **63**;
- Service nodes: **35**;
- Article nodes: **21**;
- FAQPage nodes: **35**;
- visible FAQ questions validated: **112**;
- JSON-LD payloads parsed: **119**;
- canonical parity: **EXACT**;
- breadcrumb parity: **EXACT**;
- visible FAQ parity: **PASS**;
- dates: **TRUTHFUL**;
- forbidden/unverified schema: **ABSENT**.

## 6. Public-truth boundary

This stage intentionally does not introduce:

- `LocalBusiness` or an unverified address;
- ratings or reviews;
- `Offer`, prices or priceCurrency;
- fake business identifiers;
- fabricated publication dates;
- special AI-only schema.

Schema validity does not prove rich results, rankings or generative-AI citation eligibility.

## 7. Verdict

`V15_12_STRUCTURED_DATA=PASS`

`CANONICAL_PARITY=EXACT`

`BREADCRUMBS=EXACT`

`SERVICE=35`

`ARTICLE=21`

`FAQ=35`

`FAQ_QUESTIONS_VISIBLE=112`

`DATE_PUBLISHED=ABSENT`

`UNVERIFIED_LOCALBUSINESS_OFFER_REVIEW_RATING_PRICE=ABSENT`
