# LEADFLOWAI — OPERATIONS RUNBOOK V2

STATUS: STATIC FRONTEND TARGET LOCKED / PRODUCTION NOT AUTHORIZED
DATE: 2026-08-12

## Current architecture

- Public frontend: GitHub Pages static export at `https://leadflowai.pl`.
- DNS/TLS/edge: Cloudflare — configuration pending.
- Dynamic API: `https://api.leadflowai.pl` on local Owner-controlled hardware through Cloudflare Tunnel — deployment pending.
- Public contact: `kontakt@leadflowai.pl`.
- Production deployment: NOT AUTHORIZED until final acceptance.
- `main`: remains Owner-controlled release authority.

## Frontend health

Static frontend availability is validated by HTTP checks for:
- `/`;
- `/kontakt/`;
- core commercial routes;
- `/realizacje/`;
- `/wiedza/`;
- `/sitemap.xml`;
- `/robots.txt`.

GitHub Pages has no application server health endpoint in this architecture.

## API health

The local API stage must provide `GET https://api.leadflowai.pl/health` with a minimal non-sensitive health response. That endpoint belongs to the local backend, not the GitHub Pages artifact.

## Pre-deploy minimum checks

1. Owner-approved release identity on `main`.
2. Quality workflow green on the exact release commit.
3. Static export artifact contains `CNAME`, `.nojekyll`, sitemap and robots.
4. GitHub Pages repository setting enabled for GitHub Actions.
5. Cloudflare DNS/TLS change plan recorded before traffic cutover.
6. Local API and Cloudflare Tunnel validated before relying on form/chat.
7. Lead delivery tested end-to-end to a controlled destination.
8. Local AI/RAG success and fallback tested if enabled.
9. Analytics/consent and legal/public company data reviewed.
10. Rollback target recorded before release.

## Incident triage

### Static site unavailable
- check GitHub Pages status/deployment;
- check Cloudflare DNS/TLS/proxy state;
- compare deployed Pages artifact/release with last known-good release;
- use rollback/redeploy without rewriting Git history.

### Lead form unavailable
- verify `/kontakt/` still renders;
- verify `https://api.leadflowai.pl/health`;
- verify Tunnel/API service and narrow CORS allow-list;
- use `kontakt@leadflowai.pl` as the public fallback;
- never claim successful delivery without end-to-end proof.

### Assistant unavailable
- core site and contact remain usable independently;
- verify `api.leadflowai.pl` and local AI service;
- preserve deterministic fallback behavior;
- API/AI outage must not take down GitHub Pages.

## Security boundary

Final HSTS/CSP and production response headers are owned by the Cloudflare edge stage after live HTTPS and script/provider inventory are verified. They are not simulated in static Next.js configuration.

## Rollback principle

Restore the last known-good frontend artifact/release and, independently, the last known-good local API configuration. DNS/Tunnel rollback procedures must be recorded before launch.
