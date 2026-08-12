# LEADFLOWAI — MONITORING BASELINE V1

STATUS: PRE-PRODUCTION DESIGN
DATE: 2026-08-12

## Principles

Monitoring must detect user-impacting failures without collecting unnecessary personal data.

## Required production checks

### Availability
- homepage `/`;
- core money page `/strony-internetowe`;
- contact page `/kontakt`;
- health endpoint `/api/health`;
- sitemap `/sitemap.xml`.

### Functional synthetic checks
- lead endpoint rejects foreign Origin;
- contact fallback remains `kontakt@leadflowai.pl`;
- assistant local-knowledge path responds;
- assistant fallback path responds without a remote provider.

Synthetic tests must use dedicated test data and must never send fake enquiries into a live client pipeline unless explicitly routed to a test destination.

### Search health
- robots remains crawlable as intended;
- sitemap responds successfully;
- public canonical domain remains `https://leadflowai.pl`;
- structured-data/public-truth regressions remain in CI.

### Runtime errors
Track server/runtime exceptions and failed deployments. Logs must avoid intentional storage of lead/chat PII beyond what is operationally required and legally approved.

## Alert classes

P1 — public site or health endpoint unavailable.
P2 — lead/contact path broken or delivery failing.
P2 — widespread server errors or build/release regression.
P3 — chatbot/provider degraded while core site works.
P3 — sitemap/robots/search-contract regression.

## Metrics after launch

Only after analytics/consent decisions are finalized:
- availability;
- server error rate;
- Core Web Vitals;
- form start/completion/success/fallback rates;
- assistant usage and error mode counts without recording chat content by default;
- search impressions/indexing/conversions through approved tools.

No metric in this document is evidence of current production traffic. Production is not yet published.
