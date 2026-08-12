# LEADFLOWAI — LOCAL API BOUNDARY V1

STATUS: ARCHITECTURE LOCKED / DEPLOYMENT PENDING
DATE: 2026-08-12

## Public API identity

Target origin: `https://api.leadflowai.pl`.

The API will run on Owner-controlled local Tervyxa hardware and be published through Cloudflare Tunnel. The exact machine is intentionally not selected in this frontend stage.

## Required endpoints

Future local service must provide at minimum:
- `POST /leads` — lead/contact intake;
- `POST /chat` — controlled LeadFlowAI assistant / local AI gateway;
- `GET /health` — availability/identity health check.

## Existing behavior to preserve from validated V1

Lead API behavior from previous repository stages:
- server-side validation;
- honeypot;
- bounded body;
- rate limiting;
- no intentional PII logging;
- controlled delivery failure/fallback;
- public fallback e-mail `kontakt@leadflowai.pl`.

Chat behavior from previous repository stages:
- controlled LeadFlowAI knowledge;
- no fabricated prices, clients, rankings or company identifiers;
- optional AI provider/local model mode;
- deterministic fallback if AI is unavailable;
- no intentional user-message logging.

## Cross-origin contract

Because frontend and API use different origins, the local API must explicitly allow the production origin `https://leadflowai.pl` and reject arbitrary origins. CORS must be narrow, not wildcarded for state-changing endpoints.

Expected production allow-list begins with:
- `https://leadflowai.pl`;
- optional `https://www.leadflowai.pl` only if the final canonical/redirect architecture requires browser requests from it.

## Secrets

All backend secrets stay server-side on the local API host or its secret store. They must never use `NEXT_PUBLIC_*` variables or be committed to the static frontend repository.

Potential server-only configuration includes lead delivery credentials, local AI/model configuration and Cloudflare Tunnel credentials.

## Availability principle

The public website must continue to render and expose `kontakt@leadflowai.pl` when the local API is unavailable. Local backend outage must degrade interactive functions, not take down the static website.

## Next implementation stage

After GitHub Pages frontend acceptance:
1. choose the local machine;
2. build/package the API service;
3. configure service supervision/restart;
4. configure Cloudflare Tunnel;
5. validate CORS and `/health`;
6. validate lead delivery end-to-end;
7. connect local AI/RAG;
8. add monitoring and recovery evidence.
