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
CHATBOT_OFFER=YES
CHATBOT_PUBLIC_UI=OFF
CHATBOT_CODE=DORMANT_READY
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
- browser integrations use external service origins instead of GitHub Pages Route Handlers;
- `out/` generated successfully;
- `out/CNAME` contains `leadflowai.pl`;
- `out/.nojekyll` exists;
- sitemap and robots export statically;
- static artifact contains no lead/chat/health API routes;
- GitHub Pages Actions workflow is prepared for `main` / explicit dispatch and does not auto-deploy `build/leadflowai`;
- representative public routes passed static HTTP smoke tests.

## Chatbot owner decision

AI chatbots remain part of the LeadFlowAI commercial offer. The LeadFlowAI site chatbot itself is intentionally disabled until explicit Owner configuration/enablement. The dormant component and future local-AI boundary stay in the repository, but `app/layout.tsx` must not mount `SiteAssistant` or load `chat.css` while this decision remains active.

## Current architecture boundary

Public frontend target: GitHub Pages.
DNS/TLS/edge target: Cloudflare.
Future dynamic chatbot API target: `api.leadflowai.pl` on Owner-controlled local hardware through Cloudflare Tunnel, only if/when the public chatbot is enabled.
Public mail: `kontakt@leadflowai.pl`, planned through Cloudflare Email Routing to the existing Gmail destination.

Production and `main` remain untouched.
