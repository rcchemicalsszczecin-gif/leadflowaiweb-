# LEADFLOWAI REPOSITORY STATUS

DATE: 2026-08-12

BRAND=LEADFLOWAI
DOMAIN=leadflowai.pl
PUBLIC_EMAIL=kontakt@leadflowai.pl
FOUNDATION_STAGE=PASS
DESIGN_DIRECTION=APPROVED_V1
APPLICATION_SCAFFOLD=PASS
DESIGN_SYSTEM=IMPLEMENTED_V1
HOMEPAGE=IMPLEMENTED_V1
CORE_MONEY_PAGES=PASS
SEO_AEO_GEO_DEEP_FOUNDATION=PASS
CONTACT_UI=PASS
CHATBOT_UI=PASS
PORTFOLIO_KNOWLEDGE=PASS
STATIC_FRONTEND=PASS
GITHUB_PAGES_ARTIFACT=PASS
GITHUB_PAGES_WORKFLOW=READY_NOT_DEPLOYED
FRONTEND_API_ORIGIN=https://api.leadflowai.pl
LOCAL_API=NOT_STARTED_IN_CURRENT_STAGE
CLOUDFLARE_DNS_TLS=PENDING
CLOUDFLARE_TUNNEL=PENDING
EMAIL_ROUTING=PENDING_CONFIGURATION
ANALYTICS=PENDING_CONFIGURATION
LEGAL_FINALIZATION=PENDING_COMPANY_REGISTRATION
PRODUCTION_PUBLISHED=NO
MAIN_MUTATED=NO
WORK_BRANCH=build/leadflowai

## Stage 11A/B — static frontend + GitHub Pages
Quality workflow run `31628230187` — PASS.

Validated on commit `b69cf053f8520ee48b152ba03fed9d66397b6fbc`:
- Next.js static export with `output: "export"`;
- dynamic frontend Route Handlers removed from `app/api/**`;
- lead and assistant browser requests target `https://api.leadflowai.pl`;
- `out/` generated successfully;
- `out/CNAME` contains `leadflowai.pl`;
- `out/.nojekyll` exists;
- sitemap and robots export statically;
- static artifact contains no lead/chat/health API routes;
- GitHub Pages Actions workflow is prepared for `main` / explicit dispatch and does not auto-deploy `build/leadflowai`;
- representative public routes passed static HTTP smoke tests.

## Current architecture boundary

Public frontend target: GitHub Pages.
DNS/TLS/edge target: Cloudflare.
Dynamic API target: `api.leadflowai.pl` on Owner-controlled local hardware through Cloudflare Tunnel.
Public mail: `kontakt@leadflowai.pl`, planned through Cloudflare Email Routing to the existing Gmail destination.

The previous in-repository lead/chat server implementations were validated as behavior during earlier stages but are no longer claimed to execute on GitHub Pages. Their required behavior is preserved in `docs/architecture/LOCAL-API-BOUNDARY.md` for the local backend stage.

Production and `main` remain untouched.
