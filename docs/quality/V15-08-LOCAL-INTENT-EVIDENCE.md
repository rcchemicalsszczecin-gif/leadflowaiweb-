# V15.8 — Local Intent Evidence — Szczecin + Poland

STATUS: PASS
DATE: 2026-08-14
EVIDENCE_CLASS: REPOSITORY_PROOF + OBSERVED_PUBLIC_SERP
TESTED_HEAD: `a8c6182d377bfdf222ed87dbf050a18f40ec7e76`
PRODUCTION_BASELINE: `67663b08c950de120a94ef8495b5cdc8c9bdecfe`
QUALITY_RUN: `31817322452`
QUALITY_JOB: `94822062818`
BROWSER_MATRIX_RUN: `31817318249`
BROWSER_MATRIX_JOB: `94822039762`
ROUTE_PREVIEW_RUN: `31817318232`
ROUTE_PREVIEW_JOB: `94822074687`
ROUTE_PREVIEW_ARTIFACT: `9225560109`
ROUTE_PREVIEW_DIGEST: `sha256:e6ece11c5ac96e1b0680a5d3c11f94795df222276a44d788cbc35d2135286e62`

## 1. Implemented search decision

The first evidence-backed local slice strengthens existing canonical ownership instead of adding a city doorway route.

Changed public pages:

- `/strony-internetowe/` — now explicitly serves companies from Szczecin while retaining nationwide/remote delivery context;
- `/local-seo/` — now explicitly covers companies operating in Szczecin and other real local markets;
- bidirectional contextual related-page linking between the two canonical pages.

No new `/szczecin` canonical was created.
No public physical address was claimed.
No `LocalBusiness` schema was added.

## 2. Quality evidence

Exact tested head `a8c6182d377bfdf222ed87dbf050a18f40ec7e76` passed full Quality.

Relevant search/crawl evidence:

- indexable HTML: 63;
- noindex artifacts: 3;
- canonicals: 63 unique;
- sitemap: exact 63;
- internal anchors: 2021;
- external anchors: 23;
- broken internal targets: 0;
- orphan indexable pages: 0;
- minimum distinct inbound-page count: 1;
- maximum distinct inbound-page count: 62;
- pages with direct `mailto:` path: 63/63;
- local-intent contract: PASS;
- new Szczecin canonical: NO;
- `LocalBusiness`: NO;
- address claim: NO.

## 3. Browser matrix evidence

Exact tested head passed:

`BROWSER_MATRIX_V15_PASS browsers=2 cases=32 homepage-viewports=6 representative-routes=5x2 overflow=PASS navigation=PASS landmarks=PASS truth=PASS firefox-mobile=BIDI_TRUE_CSS_VIEWPORT session-retry=BOUNDED`

Coverage included Chromium and Firefox with both `/strony-internetowe/` and `/local-seo/` at compact/mobile and desktop viewport sizes.

## 4. Route visual evidence

Exact tested head passed 10 active-WebGL screenshots:

- `/strony-internetowe/` desktop/mobile;
- `/local-seo/` desktop/mobile;
- `/wiedza/` desktop/mobile;
- `/kontakt/` desktop/mobile;
- `/lab/` desktop/mobile.

Marker:

`V15_ROUTE_PREVIEW_PASS routes=5 viewports=2 captures=10 global-liquid=WEBGL2`

Human visual review:

- `/strony-internetowe/` desktop: PASS — longer local/nationwide H1 remains readable and balanced;
- `/strony-internetowe/` mobile: PASS — no collision or density regression;
- `/local-seo/` desktop: PASS — local intent reads clearly without city-page spam treatment;
- `/local-seo/` mobile: PASS — hierarchy, CTA and cards remain usable;
- Global Liquid World remains visible and non-competing with primary copy.

## 5. Performance/public-truth evidence

Quality remained inside all existing aggregate and route budgets.

No chatbot, online lead delivery, analytics runtime, address, rating, review, ranking or local-office claim was activated.

## 6. Measurement boundary

This slice does not prove:

- ranking for `strony internetowe Szczecin`;
- ranking for `SEO Szczecin`;
- Google/Bing index state;
- impressions/clicks/CTR;
- local-pack visibility;
- conversion impact.

Those remain pending Search Console/Bing/measurement evidence.

## 7. Verdict

`V15_8_LOCAL_INTENT=PASS`

`EXISTING_CANONICALS=STRENGTHENED`

`SITEMAP_CARDINALITY=63_PRESERVED`

`NEW_CITY_DOORWAY_URL=NO`

`PUBLIC_ADDRESS_CLAIM=NO`

`BROWSER_MATRIX=32_OF_32_PASS`

`ROUTE_PREVIEW=10_OF_10_PASS`

`VISUAL_REVIEW=PASS`
