# LEADFLOWAI — OPERATIONS RUNBOOK

STATUS: PRODUCTION V13 OPERATING BASELINE / V14 CANDIDATE
DATE: 2026-08-14

## Current architecture

- Public frontend: GitHub Pages static export at `https://leadflowai.pl`.
- Production branch: `main`.
- Production V13 revision: `10627e2f18ccfc7ef86c76a695dab9cf7933cce9`.
- GitHub Pages deployment for that revision: PASS.
- Public contact: `kontakt@leadflowai.pl`.
- Online lead delivery: OFF by Owner.
- Public chatbot: OFF by Owner.
- Future dynamic API boundary: `https://api.leadflowai.pl`, only when separately authorized.
- V14 implementation branch: `v14/full-visual-rebuild`.
- V14 merge/deployment: NOT AUTHORIZED until explicit Owner visual PASS + merge authorization.

## Frontend health

Critical static checks include:
- `/`;
- `/uslugi/`;
- `/strony-internetowe/`;
- `/kontakt/`;
- `/realizacje/`;
- `/o-nas/`;
- `/wiedza/`;
- representative article;
- `/lab/`;
- `/sitemap.xml`;
- `/robots.txt`.

GitHub Pages has no application-server health endpoint in this architecture.

## API health

No API health endpoint is required for the currently active public frontend because the chatbot and online lead delivery are disabled.

If a future Owner-authorized local API is deployed, it must provide an explicit health contract and remain a separate failure domain from the static frontend.

## Pre-V14-merge minimum checks

1. V14 source-of-truth/governance synchronized.
2. Exact candidate SHA recorded.
3. Full Quality workflow green on that exact SHA.
4. Mobile navigation, process anchor, keyboard, focus, touch and reduced-motion PASS.
5. CSS/runtime de-stack PASS with measurable performance headroom.
6. All 35 service pages and primary routes use the accepted V14 shell/templates.
7. 63 intent URLs and 21 articles remain generated and semantically correct.
8. Sitemap/robots/canonical/structured-data/public-truth checks PASS.
9. Public chatbot remains OFF.
10. Online lead delivery remains OFF.
11. `out/` contains `CNAME`, `.nojekyll`, sitemap and robots.
12. Aggregate and route-level performance checks PASS.
13. Representative Chromium and Firefox QA PASS.
14. Dependency/security review PASS or explicitly documented bounded blocker.
15. Reliable desktop/mobile preview artifacts exist.
16. Owner has explicitly given visual PASS.
17. Owner has explicitly authorized merge.

## Incident triage

### Static site unavailable
- check GitHub Pages workflow/deployment;
- check DNS/TLS/edge status;
- compare deployed release with last known-good `main` revision;
- redeploy/revert through normal Git history; do not rewrite history.

### Contact path problem
- verify `/kontakt/` renders;
- verify the direct `mailto:` destination remains `kontakt@leadflowai.pl`;
- do not fall back to an unapproved server/webhook path.

### Search artifact regression
- check `/sitemap.xml` and `/robots.txt`;
- compare route registry and generated output;
- verify canonical domain and structured-data/public-truth contracts.

### V14 visual regression before merge
- keep `main` unchanged;
- fix/calibrate only on `v14/full-visual-rebuild`;
- regenerate preview evidence;
- repeat Owner review.

## Security boundary

- no secrets in Git;
- static frontend cannot substitute for a server-side validation/rate-limit layer;
- disabled dynamic features must not leak fake endpoint claims into the public artifact;
- edge security headers must be validated at the actual live edge configuration;
- dependency vulnerability review must be treated separately from a successful `npm ci --no-audit` install.

## Rollback principle

Frontend rollback restores/redeploys the last known-good production revision or artifact through normal Git/Pages history.

Future API/edge configuration, if activated, is a separate recovery domain and must have its own last known-good identity and rollback procedure.
