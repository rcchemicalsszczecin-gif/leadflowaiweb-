# LEADFLOWAI — STATIC FRONTEND DEPLOYMENT

STATUS: PRODUCTION V14 ARCHITECTURE
DATE: 2026-08-14

## Current architecture

Public website frontend:
- domain: `https://leadflowai.pl`;
- source: GitHub repository;
- production branch: `main`;
- production authority: V14 Full Visual Rebuild;
- production merge revision: `39c9b304eff42a71ea36aee871dce569d8f374f0`;
- validated release candidate: `242263ffe1593d1a80890b7f6bc1514316ed2656`;
- previous V13 rollback baseline: `10627e2f18ccfc7ef86c76a695dab9cf7933cce9`;
- build: Next.js static export (`output: "export"`);
- artifact: `out/`;
- hosting: GitHub Pages;
- deployment: GitHub Actions Pages workflow;
- custom-domain marker: `public/CNAME` -> `leadflowai.pl`;
- Jekyll bypass marker: `public/.nojekyll`.

GitHub Pages run `31800348526` passed build and deploy for the V14 production merge. Pages reports status `built`, CNAME `leadflowai.pl`, approved TLS certificate and HTTPS enforcement.

## Dynamic application boundary

GitHub Pages does not host dynamic application backend behavior for this project.

Future public API origin remains `https://api.leadflowai.pl`, but public chatbot and online lead delivery are OFF and the static frontend does not depend on that origin for core operation.

Active public contact path: `kontakt@leadflowai.pl`.

## GitHub Pages workflow

`.github/workflows/pages.yml`:
1. checks out `main`;
2. installs deterministic dependencies;
3. runs the repository verification contract;
4. builds static export;
5. verifies Pages artifact identity;
6. uploads `out/`;
7. deploys through the GitHub Pages environment.

## Static export invariants

- dynamic `app/api/**` handlers are not required by the frontend build;
- public routes export to HTML;
- knowledge dynamic slugs use static generation;
- sitemap and robots emit static files;
- `out/CNAME` contains `leadflowai.pl`;
- `out/.nojekyll` exists;
- disabled public lead/chat functionality is not represented as active static endpoints.

## Security boundary

Response-header enforcement belongs to the actual edge/provider layer because production is a static GitHub Pages deployment, not a persistent Next.js server runtime. Secrets must not be committed or exposed through `NEXT_PUBLIC_*` unless intentionally public.

## Release baseline

V14 is now production. Further production promotion rules apply to future releases; the completed V14 Owner Visual PASS and merge authorization are historical release evidence, not pending gates.