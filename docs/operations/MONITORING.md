# LEADFLOWAI — MONITORING BASELINE V2

STATUS: PRE-PRODUCTION DESIGN
DATE: 2026-08-12

## Principles

Monitoring must detect user-impacting failures without collecting unnecessary personal data. Static frontend and local API are separate failure domains.

## Required production checks

### Static frontend availability
- `https://leadflowai.pl/`;
- `/strony-internetowe/`;
- `/kontakt/`;
- `/realizacje/`;
- `/wiedza/`;
- `/sitemap.xml`;
- `/robots.txt`.

### Local API availability
- `https://api.leadflowai.pl/health` after the local API stage is deployed.

### Functional synthetic checks
- lead endpoint accepts only allowed production origins and rejects arbitrary origins;
- contact fallback remains `kontakt@leadflowai.pl`;
- assistant controlled knowledge/fallback responds;
- frontend remains usable when API/AI is deliberately unavailable.

Synthetic tests must use dedicated test data and must never inject fake enquiries into a live client pipeline unless explicitly routed to a test destination.

### Search health
- robots remains crawlable as intended;
- sitemap responds successfully;
- canonical domain remains `https://leadflowai.pl`;
- structured-data/public-truth regressions remain in CI.

### Runtime / deployment errors
Track GitHub Pages build/deploy failures, Cloudflare/Tunnel failures and local API service errors separately. Logs must avoid intentional storage of lead/chat PII beyond what is operationally required and legally approved.

## Alert classes

P1 — public static site unavailable.
P1 — local API health unavailable while form/chat are expected to be live.
P2 — lead/contact delivery failing.
P2 — widespread deployment/runtime regression.
P3 — local AI degraded while core site works.
P3 — sitemap/robots/search-contract regression.

## Metrics after launch

Only after analytics/consent decisions are finalized:
- availability by frontend/API domain;
- API error rate;
- Core Web Vitals;
- form start/completion/success/fallback rates;
- assistant usage/error mode counts without recording chat content by default;
- search impressions/indexing/conversions through approved tools.

No metric in this document is evidence of current production traffic. Production is not yet published.
