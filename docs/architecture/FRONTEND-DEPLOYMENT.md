# LEADFLOWAI — STATIC FRONTEND DEPLOYMENT V1

STATUS: IMPLEMENTED FOR VALIDATION
DATE: 2026-08-12

## Locked architecture

Public website frontend:
- domain: `https://leadflowai.pl`;
- source: GitHub repository;
- build: Next.js static export (`output: "export"`);
- artifact: `out/`;
- hosting target: GitHub Pages;
- deployment mechanism: GitHub Actions Pages workflow;
- custom-domain artifact marker: `public/CNAME` -> `leadflowai.pl`;
- Jekyll bypass marker: `public/.nojekyll`.

Dynamic application backend is **not** hosted by GitHub Pages.

Public API origin:
- `https://api.leadflowai.pl`;
- frontend build-time source of truth: `NEXT_PUBLIC_API_BASE_URL`;
- production default in code: `https://api.leadflowai.pl`.

## Why this split exists

GitHub Pages is a static host. Lead submission and chatbot requests require POST/server behavior and therefore belong to the separate local API service exposed later through Cloudflare Tunnel.

The frontend must remain usable if the API or local AI service is unavailable. Contact e-mail fallback is `kontakt@leadflowai.pl`.

## GitHub Pages workflow

`.github/workflows/pages.yml`:
1. checks out source;
2. installs Node dependencies;
3. runs the full repository verification contract;
4. runs `next build`, producing `out/`;
5. verifies static artifact identity;
6. uploads `out/` as the GitHub Pages artifact;
7. deploys only from `main` or explicit workflow dispatch according to GitHub Pages environment controls.

No automatic deployment is triggered by pushes to `build/leadflowai`.

## Static export invariants

- `app/api/**` must not exist in the frontend App Router.
- server-only Route Handlers must not be required by the frontend build.
- internal public routes must export to HTML.
- knowledge dynamic slugs must use `generateStaticParams`.
- sitemap and robots must be emitted as static files.
- `out/CNAME` must contain `leadflowai.pl`.
- `out/.nojekyll` must exist.
- browser POST targets must resolve to `https://api.leadflowai.pl`.

## Security boundary

Response-header enforcement is no longer implemented in `next.config.ts`, because static GitHub Pages output cannot provide the same Next.js server header behavior. Final HSTS/CSP and the production response-header layer belong to the Cloudflare stage after DNS/TLS is live and tested.

## Explicit non-goals of this stage

- no Cloudflare DNS mutation;
- no Pages custom-domain setting mutation;
- no production deploy;
- no local API deployment;
- no Cloudflare Tunnel setup;
- no HSTS/CSP activation;
- no merge to `main`.
