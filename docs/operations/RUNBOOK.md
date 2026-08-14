# LEADFLOWAI — OPERATIONS RUNBOOK

STATUS: PRODUCTION V14 OPERATING BASELINE
DATE: 2026-08-14

## Current architecture

- Public frontend: GitHub Pages static export at `https://leadflowai.pl`.
- Production branch: `main`.
- Production V14 merge revision: `39c9b304eff42a71ea36aee871dce569d8f374f0`.
- Validated V14 release candidate: `242263ffe1593d1a80890b7f6bc1514316ed2656`.
- Previous V13 rollback baseline: `10627e2f18ccfc7ef86c76a695dab9cf7933cce9`.
- GitHub Pages deployment run `31800348526`: PASS.
- Public contact: `kontakt@leadflowai.pl`.
- Online lead delivery: OFF by Owner.
- Public chatbot: OFF by Owner.
- Future dynamic API boundary: `https://api.leadflowai.pl`, only when separately authorized.

## Frontend health

Critical production checks:
- `/`;
- `/uslugi/`;
- `/strony-internetowe/`;
- `/kontakt/`;
- `/realizacje/`;
- `/o-nas/`;
- `/wiedza/`;
- representative knowledge article;
- `/lab/`;
- `/sitemap.xml`;
- `/robots.txt`.

GitHub Pages has no application-server health endpoint in this architecture.

## Current release evidence

V14 production was promoted only after:
1. full V14 final QA;
2. 28/28 Chrome/Firefox browser matrix;
3. visual preview PASS including active Liquid WebGL2 evidence;
4. rendered Search/Public Truth PASS;
5. security/dependency/performance PASS;
6. Owner Visual PASS;
7. R9 pre-merge hardening PASS;
8. explicit Owner merge authorization;
9. exact-head guarded merge;
10. GitHub Pages build/deploy PASS.

## Incident triage

### Static site unavailable
- check GitHub Pages workflow/deployment;
- check DNS/TLS/edge status;
- compare current production against `39c9b304eff42a71ea36aee871dce569d8f374f0`;
- if necessary roll back through normal Git history to V13 `10627e2f18ccfc7ef86c76a695dab9cf7933cce9` or another verified known-good release;
- do not rewrite history.

### Contact path problem
- verify `/kontakt/`;
- verify direct mail destination `kontakt@leadflowai.pl`;
- do not invent an unapproved webhook/backend fallback.

### Search regression
- check sitemap, robots, canonical set and structured data;
- preserve 63 dominant intent URLs and 21 knowledge articles;
- compare generated output with registries/public truth.

### Visual/runtime regression
- verify mobile nav, reduced motion, overflow and Liquid fallback;
- keep essential content independent from WebGL.

## Security boundary

- no secrets in Git;
- chatbot and online lead backend remain OFF;
- static frontend is not a server-side validation/rate-limit layer;
- edge security headers belong to the actual provider layer;
- dependency audit remains a CI gate.

## Rollback principle

Current production baseline is V14 `39c9b304eff42a71ea36aee871dce569d8f374f0`. Immediate known-good historical rollback baseline is V13 `10627e2f18ccfc7ef86c76a695dab9cf7933cce9`. Restore through normal Git/Pages history and re-run production verification.