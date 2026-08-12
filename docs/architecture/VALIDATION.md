# LEADFLOWAI VALIDATION RECORD

STATUS: PASS_THROUGH_STAGE_11B
DATE: 2026-08-12
BRANCH: build/leadflowai

## Stage 5 — core money pages
Quality workflow run `31621936913` — PASS.

## Stage 6 — SEO / AEO / GEO foundation
Quality workflow run `31622673269` — PASS.

## Stage 7 — lead/contact behavior baseline
Quality workflow run `31623584861` — PASS under the earlier integrated Next.js server architecture.
The validated server behavior is now a requirement for the separate local API stage; GitHub Pages is not claimed to execute it.

## Stage 8 — assistant/chat behavior baseline
Quality workflow run `31624891642` — PASS under the earlier integrated Next.js server architecture.
Controlled knowledge/public-truth/fallback behavior remains a requirement for the separate local API/local AI stage.

## Stage 9 — real portfolio / knowledge
Quality workflow run `31625528515` — PASS.

## Stage 10 — provider-neutral operations baseline
Quality workflow run `31626085882` — PASS before the final hosting split was selected. Runbook/monitoring/recovery documents were subsequently updated to the static-frontend + local-API architecture.

## Stage 11A/B — GitHub Pages static frontend
Quality workflow run `31628230187` — PASS.
Validated:
- all active repository contracts;
- TypeScript;
- Biome lint gate;
- Next.js `output: "export"` production build;
- static sitemap and robots generation;
- dynamic `app/api/**` handlers absent from the frontend;
- frontend lead/chat targets use `https://api.leadflowai.pl`;
- `out/index.html`;
- `out/CNAME` = `leadflowai.pl`;
- `out/.nojekyll`;
- sitemap and robots artifacts;
- no static `out/api/leads`, `out/api/chat` or `out/api/health` artifacts;
- generated browser assets contain the production API origin;
- static HTTP smoke tests for homepage, contact, representative commercial/search/portfolio/knowledge routes, sitemap and robots;
- GitHub Pages workflow contract using the `out/` artifact and deployment actions;
- work branch is not configured for automatic Pages deployment.

## Current production boundary

Frontend hosting target is now resolved: GitHub Pages.
Cloudflare is the selected DNS/TLS/edge layer but is not configured by repository evidence yet.
Dynamic API target is `https://api.leadflowai.pl` on Owner-controlled local hardware through Cloudflare Tunnel; machine/service deployment is pending.
Public e-mail is `kontakt@leadflowai.pl`; Cloudflare Email Routing configuration is pending.
Analytics are authorized but GA4/Search Console/Bing/consent configuration is pending.
Final legal identifiers/privacy layer remain pending company-registration completion.

## Still unresolved before final GO

- GitHub Pages repository setting/custom-domain activation and live deploy proof;
- Cloudflare DNS/TLS/canonical-host configuration;
- final Cloudflare HSTS/CSP/security-edge validation;
- local API machine selection and deployment;
- Cloudflare Tunnel for `api.leadflowai.pl`;
- lead delivery end-to-end proof;
- local chatbot/RAG end-to-end proof;
- durable rate limiting for the chosen local/API topology;
- Cloudflare Email Routing proof for `kontakt@leadflowai.pl`;
- GA4/Search Console/Bing and consent implementation;
- final legal/privacy data after company registration;
- live browser/mobile/CWV/accessibility/security acceptance.

`main` remains unchanged and no production deployment is authorized by this record.

PRODUCTION_READINESS=STATIC_FRONTEND_VALIDATED_FOR_GITHUB_PAGES
NEXT_STAGE=STAGE_11C_CLOUDFLARE_AND_LOCAL_API_PREPARATION
