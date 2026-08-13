# LEADFLOWAI — STAGE 12 POST-LAUNCH MEASUREMENT BASELINE

STATUS: ACTIVE BOUNDED STAGE
DATE: 2026-08-13
BASE PRODUCTION COMMIT: `30c0c3b35b611e44e974154ac1476eebbf81537f`
PUBLIC DOMAIN: `leadflowai.pl`

## Purpose

Establish a truthful post-launch baseline for LeadFlowAI after V11 Full Offer, V11 Knowledge, V12 Portfolio and release-hardening reached production. This stage measures and verifies the release; it does not authorize unrelated feature work, visual redesign, chatbot activation, online lead-form activation, new secrets, pricing publication or Cloudflare mutation.

## Production evidence

- PR #12 V11/V12 + release hardening: MERGED.
- Product production merge commit: `f004d6624b037a138fc4d952d07ed0d0ca794753`.
- GitHub Pages workflow run #12: BUILD PASS, DEPLOY PASS.
- PR #13 post-release Current State synchronization: MERGED.
- Current production `main`: `30c0c3b35b611e44e974154ac1476eebbf81537f`.
- GitHub Pages workflow run #13 for the docs-only synchronization: BUILD PASS, DEPLOY PASS.
- Production build uses committed `package-lock.json` plus `npm ci`.
- The validated static export generates 66 pages and keeps dynamic API routes absent from the public artifact.

## External verification baseline

Independent live HTTP verification from the assistant execution environments is currently NOT AVAILABLE because DNS resolution for `leadflowai.pl` returns a temporary name-resolution failure in those environments. This is an environment limitation and must not be reported as a production outage.

Independent public search discovery checks performed immediately after the release returned no indexed `site:leadflowai.pl` results for the checked service/portfolio/knowledge queries. Because the release is fresh, this is recorded only as the initial indexation baseline, not as an SEO failure.

No external-live PASS is claimed until an independent HTTP-capable environment can resolve the production domain.

## Measurement surfaces

### Search visibility

Track without inventing results:

- Google Search Console ownership/property status;
- submitted/discovered sitemap state;
- indexed pages vs submitted pages;
- crawl/indexing exclusions and canonical anomalies;
- query impressions, clicks, CTR and average position;
- branded vs non-branded queries;
- service-intent queries for WWW, SEO/AEO/GEO, web development, modernization and local intent;
- knowledge-article discovery and internal-link contribution.

### Bing / alternative search

Track:

- Bing Webmaster Tools property state;
- sitemap processing;
- indexed URL count;
- query/impression/click baseline where available.

### Conversion

Current conversion authority remains direct e-mail only through `kontakt@leadflowai.pl`.

Until Owner explicitly authorizes an analytics or online-form stage, do not fabricate conversion event data. When measurement is enabled, preferred bounded events are:

- primary CTA click (`Wycena strony`);
- secondary CTA click (`Konsultacja`);
- entry CTA click (`Audyt strony`);
- direct e-mail initiation;
- service-to-contact path;
- portfolio-to-contact path;
- knowledge-to-service path.

### Performance

The current CI performance budget remains the release gate. Production field data, when available, should be compared with lab budgets rather than replacing them.

Track:

- LCP;
- INP;
- CLS;
- mobile vs desktop split;
- largest JS payload and overall JS headroom;
- regressions after future releases.

## Current known debt carried into Stage 12

1. `main` is not protected by GitHub branch protection / required checks.
2. 21 non-blocking Biome CSS `noDescendingSpecificity` warnings remain, mostly inside frozen/historical visual layers.
3. Performance is inside budget but JavaScript headroom is limited.
4. GitHub Actions pins Node major `22`, not exact runtime minor.
5. Independent external HTTP smoke is not yet available from the assistant environment.

## Stage 12 acceptance criteria

Stage 12 measurement foundation is PASS when:

- production GitHub Pages deployment evidence remains PASS;
- Master Plan and Current State agree that V11/V12 are production authority;
- initial public-search/indexation baseline is recorded without fabricated metrics;
- measurement surfaces and event taxonomy are documented;
- no disabled runtime feature is accidentally activated;
- repository Quality remains PASS on this docs-only stage.

## STOP boundary

This stage does not authorize:

- public chatbot activation;
- online lead form activation;
- analytics scripts/cookies without a separately reviewed privacy/consent decision;
- Search Console/Bing ownership mutations unless separately authorized;
- Cloudflare changes;
- pricing publication;
- visual redesign;
- unrelated dependency upgrades;
- production code changes unrelated to measurement evidence.
