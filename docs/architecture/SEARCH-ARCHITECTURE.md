# LEADFLOWAI — SEARCH ARCHITECTURE V1

STATUS: IMPLEMENTED FOUNDATION
DATE: 2026-08-12

## Purpose

LeadFlowAI treats SEO, AEO and GEO / AI Search as connected layers over one public source of truth. They must not become three contradictory copies of the same business information.

## Public identity

- Public brand: LeadFlowAI.
- Primary domain: https://leadflowai.pl.
- Legal/operator/provider entity: Tervyxa Systems sp. z o.o.
- Public contact currently used by the project: kontakt@leadflowai.pl.
- Unconfirmed registration identifiers must not be invented or published.

## SEO layer

Required foundation:
- crawlable semantic HTML;
- canonical URLs;
- metadata per public route;
- sitemap derived from the public route registry;
- robots policy;
- correct internal links;
- responsive/performance/accessibility quality;
- structured data that matches visible facts.

SEO does not equal keyword insertion. Search intent must map to pages that genuinely solve the corresponding user task.

## AEO layer

Required foundation:
- direct-answer sections;
- explicit definitions;
- descriptive headings;
- visible FAQs only where useful;
- concise answer followed by context/depth;
- clear entity naming;
- no hidden answer-only content.

AEO does not replace SEO.

## GEO / AI Search layer

Required foundation:
- entity clarity;
- public-truth consistency;
- source-friendly original information;
- relationship between LeadFlowAI brand and Tervyxa Systems legal operator;
- claims supported by current evidence;
- machine-readable data reflecting visible content;
- no guaranteed placement/citation claims.

GEO is not treated as a magical independent ranking algorithm.

## Current public route clusters

### WWW
- /strony-internetowe
- /landing-pages
- /sklepy-internetowe
- /web-development
- /modernizacja-stron
- /audyt-strony

### SEARCH
- /seo-aeo-geo
- /seo
- /aeo
- /geo-ai-search
- /local-seo

## Machine-readable layer

Global graph:
- Organization;
- WebSite.

Public service/search pages:
- WebPage;
- Service;
- BreadcrumbList;
- FAQPage where visible FAQ content exists.

The provider is Tervyxa Systems sp. z o.o. The site/brand remains LeadFlowAI.

## Sitemap / robots

`app/sitemap.ts` derives published URLs from core and search registries.
`app/robots.ts` allows public crawling and declares the sitemap.
Future routes must not be added to the sitemap before they are real public-quality pages.

## Validation contract

`scripts/search-contract.mjs` verifies:
- required routes exist;
- route files export metadata;
- sitemap uses both registries;
- robots declares sitemap and crawl allowance;
- required structured-data types exist;
- brand/legal/domain/contact identity remains correct;
- search content includes SEO/AEO/GEO/public-truth/structured-data concepts.

This contract supplements, not replaces, typecheck/lint/build and later browser/crawl validation.

## Explicit non-goals

- no doorway-page factory;
- no fabricated reviews, awards, rankings or case studies;
- no fake local offices;
- no guaranteed Google position;
- no guaranteed recommendation/citation by ChatGPT or another AI system;
- no schema markup for facts not visible or not true.
