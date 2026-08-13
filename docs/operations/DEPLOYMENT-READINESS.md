# LEADFLOWAI — DEPLOYMENT READINESS V2

STATUS: FRONTEND TARGET LOCKED / PRODUCTION NOT YET AUTHORIZED
DATE: 2026-08-12

## Locked deployment architecture

Frontend:
- GitHub repository source;
- Next.js static export;
- GitHub Pages;
- public domain `leadflowai.pl`;
- GitHub Actions deployment artifact `out/`.

Network / edge:
- Cloudflare DNS/TLS for `leadflowai.pl`;
- Cloudflare stage is pending and must follow static frontend acceptance.

Dynamic API:
- `api.leadflowai.pl`;
- Owner-controlled local hardware;
- Cloudflare Tunnel;
- exact local machine not yet selected.

Mail:
- `kontakt@leadflowai.pl`;
- Cloudflare Email Routing to the existing Gmail destination, configured in the Cloudflare stage.

Analytics:
- production analytics are authorized in principle;
- GA4/Search Console/Bing identifiers and consent implementation remain pending production setup.

## Already proven on work branch

- governance and design system;
- homepage and commercial routes;
- SEO/AEO/GEO architecture;
- sitemap / robots / structured data;
- contact UI and public e-mail identity;
- assistant UI and controlled fallback behavior;
- real-only portfolio and knowledge architecture;
- TypeScript / Biome / production builds;
- provider-neutral operations/runbook/recovery documentation.

## Architecture changes in Stage 11A/B

The frontend no longer owns dynamic Route Handlers. `app/api/**` is removed from the static frontend because GitHub Pages cannot execute POST/server logic.

Frontend network calls target `https://api.leadflowai.pl` through `NEXT_PUBLIC_API_BASE_URL`.

Previous lead/chat server behavior remains a behavioral requirement for the local API stage, not a claim that GitHub Pages runs a backend.

## Remaining production blockers

- final GitHub Pages repository setting / custom-domain activation;
- Cloudflare DNS cutover and TLS validation;
- Cloudflare response security layer, including final HSTS/CSP after live validation;
- local API machine selection and service deployment;
- Cloudflare Tunnel for `api.leadflowai.pl`;
- real lead-delivery path and end-to-end success proof;
- local chatbot/RAG service proof;
- durable rate limiting at the chosen API topology;
- GA4/Search Console/Bing setup and consent layer;
- final legal/privacy data after company registration is completed;
- live browser/CWV/accessibility/security acceptance.

## Launch decision

Current status remains **NOT READY FOR PRODUCTION LAUNCH**.

Stage 11A/B may produce a deployable static artifact and deployment workflow without authorizing a live production deployment.
Final GO / NO-GO remains an Owner-controlled Stage 12 decision.
