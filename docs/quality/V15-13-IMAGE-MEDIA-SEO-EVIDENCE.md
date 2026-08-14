# V15.13 — Image / Media SEO Evidence

STATUS: PASS
DATE: 2026-08-14
EVIDENCE_CLASS: REPOSITORY_PROOF + MEASURED_FIRST_PARTY
TESTED_HEAD: `adc68770817ca1e3158d5f2781adac959ef80909`
PRODUCTION_BASELINE: `67663b08c950de120a94ef8495b5cdc8c9bdecfe`
QUALITY_RUN: `31825236764`
QUALITY_JOB: `94847711743`

## 1. Objective

Validate the small but important public image/media surface without creating decorative assets merely to satisfy an SEO checklist.

## 2. Deterministic gate

V15.13 adds `scripts/v15-image-media-seo-contract.mjs` and runs it against all 63 rendered indexable pages.

The gate requires:

- every rendered `<img>` has an `alt` attribute;
- every first-party rendered image asset exists;
- every indexable page exposes `og:image`;
- every indexable page exposes `twitter:image`;
- social image URLs remain first-party HTTPS assets;
- `out/og-leadflowai.svg` exists and is actually used;
- external media dependencies are absent;
- the retired light `/v14-search-trinity.svg` asset is not rendered by the active public layer.

## 3. Defect discovered

The first strict media run found exactly 16 indexable pages without rendered `og:image`.

The root cause was Next metadata merging: route-level `openGraph` objects replaced inherited root Open Graph fields and therefore dropped the root `images` field.

Affected routes covered core/experience/AI service pages plus Kontakt, Lab and Realizacje.

## 4. Correction

The existing first-party `og-leadflowai.svg` asset was preserved and reused.

Affected pages now use the existing `withV13SocialMetadata` helper so route-specific title/description/URL metadata retains complete Open Graph and Twitter image coverage.

Custom-copy routes such as `/strony-internetowe/`, `/landing-pages/`, `/web-development/`, `/modernizacja-stron/` and `/audyt-strony/` now also keep social title/description aligned with their current visible public copy.

No stock image, external CDN dependency or synthetic visual was added merely to satisfy the gate.

## 5. Exact verified result

Quality run `31825236764`, job `94847711743`, exact tested head `adc68770817ca1e3158d5f2781adac959ef80909` produced:

`V15_IMAGE_MEDIA_SEO_PASS indexable=63 img=3 informative=3 decorative=0 unique-img-assets=3 og-image-refs=63 twitter-image-refs=63 social-assets=1 first-party=PASS external-media=ABSENT missing-assets=0 alt=PASS retired-light-search-art=ABSENT`

Measured result:

- indexable pages: **63**;
- rendered `<img>` elements: **3**;
- informative images: **3**;
- decorative `<img>` elements: **0**;
- unique rendered image assets: **3**;
- `og:image` references: **63 / 63**;
- `twitter:image` references: **63 / 63**;
- social image assets: **1 first-party asset**;
- missing assets: **0**;
- alt coverage: **PASS**;
- external media: **ABSENT**;
- retired light Search art: **ABSENT**.

## 6. Interpretation

The public site intentionally relies heavily on CSS/WebGL/product UI rather than a large editorial raster-image corpus. V15.13 does not treat a low `<img>` count as a defect by itself.

Future first-party screenshots, diagrams or explanatory media should be added only when they provide real evidence or improve comprehension, then enter this same crawl/alt/social validation path.

## 7. Verdict

`V15_13_IMAGE_MEDIA_SEO=PASS`

`OG_IMAGE=63_OF_63`

`TWITTER_IMAGE=63_OF_63`

`FIRST_PARTY_MEDIA=PASS`

`ALT=PASS`

`MISSING_ASSETS=0`

`EXTERNAL_MEDIA=ABSENT`

`NEW_DECORATIVE_MEDIA_FOR_SEO_THEATRE=NO`
