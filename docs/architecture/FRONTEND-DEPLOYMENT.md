# LEADFLOWAI — STATIC FRONTEND DEPLOYMENT

STATUS: PRODUCTION ARCHITECTURE
DATE: 2026-08-14

## Current architecture

Public website frontend:
- domain: `https://leadflowai.pl`;
- source: GitHub repository;
- production branch: `main`;
- current production V13 revision: `10627e2f18ccfc7ef86c76a695dab9cf7933cce9`;
- build: Next.js static export (`output: "export"`);
- artifact: `out/`;
- hosting: GitHub Pages;
- deployment: GitHub Actions Pages workflow;
- custom-domain marker: `public/CNAME` -> `leadflowai.pl`;
- Jekyll bypass marker: `public/.nojekyll`.

GitHub Pages deployment for the current V13 production merge is PASS.

## Dynamic application boundary

GitHub Pages does not host dynamic application backend behavior for this project.

Future public API origin remains:
- `https://api.leadflowai.pl`;
- build-time public origin helper: `NEXT_PUBLIC_API_BASE_URL`;
- deployment/runtime remains separate and is not currently required by the public site because public chatbot and online lead delivery are OFF.

The static frontend must remain usable if any future API/local AI service is unavailable.

Active public contact fallback/path: `kontakt@leadflowai.pl`.

## GitHub Pages workflow

`.github/workflows/pages.yml`:
1. checks out source;
2. installs deterministic dependencies with the committed lockfile;
3. runs the repository verification contract;
4. builds the static export;
5. verifies static artifact identity;
6. uploads `out/` as the Pages artifact;
7. deploys production from `main` under GitHub Pages environment controls.

V14 feature-branch work is not production deployment authority.

## Static export invariants

- dynamic `app/api/**` handlers must not be required by the frontend build;
- internal public routes must export to HTML;
- knowledge dynamic slugs use static generation;
- sitemap and robots emit static files;
- `out/CNAME` contains `leadflowai.pl`;
- `out/.nojekyll` exists;
- disabled public lead/chat functionality must not be represented as active static API endpoints.

## Security boundary

Response-header enforcement is not owned by static Next.js server configuration because the deployed frontend is served by GitHub Pages/edge infrastructure rather than a persistent Next.js application server.

Final CSP/HSTS/response security policy must be validated and applied at the actual live edge/provider layer in a separately authorized configuration stage.

## V14 boundary

V14 changes presentation, route templates and CSS/runtime ownership while preserving this static deployment architecture unless the Owner explicitly authorizes a separate infrastructure change.

V14 production promotion requires reliable preview evidence, final Quality on the exact release SHA, explicit Owner visual PASS and explicit Owner merge authorization.
