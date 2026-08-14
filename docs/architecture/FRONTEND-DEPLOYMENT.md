# LEADFLOWAI — STATIC FRONTEND DEPLOYMENT

STATUS: PRODUCTION V14 ARCHITECTURE
DATE: 2026-08-14

## Current architecture

Public website frontend:
- domain: `https://leadflowai.pl`;
- source: GitHub repository;
- production branch: `main`;
- production authority: V14 Global Liquid World;
- production merge revision: `36ad3fd6130ce21e68a2c5e701a516fcb3703b65`;
- validated Global Liquid candidate: `50b71632c687e032311556371108ce3f8d989650`;
- previous production revision: `5bba6a6c963fa61ea3920bb4fcefff65ff9376cc`;
- initial V14 merge (historical): `39c9b304eff42a71ea36aee871dce569d8f374f0`;
- previous V13 rollback reference: `10627e2f18ccfc7ef86c76a695dab9cf7933cce9`;
- build: Next.js static export (`output: "export"`);
- artifact: `out/`;
- hosting: GitHub Pages;
- deployment: GitHub Actions Pages workflow;
- custom-domain marker: `public/CNAME` -> `leadflowai.pl`;
- Jekyll bypass marker: `public/.nojekyll`.

GitHub Pages run `31809931666` passed full verification/build, artifact identity, upload and deploy for the current production merge. Pages reports status `built`, CNAME `leadflowai.pl`, approved TLS certificate and HTTPS enforcement.

## Visual/runtime delivery boundary

The public static artifact includes a first-party global WebGL2 submerged-compute field. It is not a server dependency and does not require an external visual asset service.

Current visual architecture:
- accepted first-screen hero remains its own dedicated Liquid/spatial composition;
- one root-mounted `V14GlobalTechLiquid` field supplies the PCB/CPU/GPU/VRAM submerged world across remaining public routes;
- `V14GlobalTechHeroGuard` suppresses the global field while the accepted hero covers the viewport;
- root module CSS import remains `globals.css` only;
- `/v14-global-tech-world.css` is loaded as a first-party static stylesheet asset;
- dedicated `V14LiquidSurface` scenes remain used by hero/constructor sections;
- reduced-motion fallback, frame/DPR caps and document-visibility suspension remain part of the runtime contract.

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
- disabled public lead/chat functionality is not represented as active static endpoints;
- Global Liquid World remains a first-party static/browser runtime and does not create a server dependency.

## Security boundary

Response-header enforcement belongs to the actual edge/provider layer because production is a static GitHub Pages deployment, not a persistent Next.js server runtime. Secrets must not be committed or exposed through `NEXT_PUBLIC_*` unless intentionally public.

## Release baseline

V14 Global Liquid World is now production. The initial V14 Owner Visual PASS/merge remains historical release evidence, and the Global Liquid production authorization plus exact candidate validation are the current release evidence. Further production changes require normal Owner/governance authority.