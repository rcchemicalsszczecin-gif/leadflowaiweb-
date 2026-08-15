# LEADFLOWAI — OPERATIONS RUNBOOK

STATUS: PRODUCTION V14 OPERATING BASELINE — CURRENT REPOSITORY/DEPLOYMENT IDENTITY IS DEFINED BELOW
DATE: 2026-08-15

## Current architecture

- Public frontend: GitHub Pages static export at `https://leadflowai.pl`.
- Public contact: `kontakt@leadflowai.pl`.
- Online lead delivery: OFF by Owner.
- Public chatbot: OFF by Owner.
- Future dynamic API boundary: `https://api.leadflowai.pl`, only when separately authorized.

```text
CURRENT_PRODUCTION_BRANCH=main
CURRENT_PRODUCTION_REPOSITORY_HEAD=67663b08c950de120a94ef8495b5cdc8c9bdecfe
CURRENT_VISUAL_RUNTIME_AUTHORITY=V14_GLOBAL_LIQUID_WORLD
LATEST_SUCCESSFUL_PAGES_RUN_ID=31810716199
LATEST_DEPLOYED_HEAD_SHA=67663b08c950de120a94ef8495b5cdc8c9bdecfe
CURRENT_IMMEDIATE_ROLLBACK_TARGET=NOT_PROVEN
```

The current visual/runtime authority is V14 Global Liquid World. The Pages checkpoint is `CONTROLLER_VERIFIED_EXTERNAL_EVIDENCE`, last reconciled on `2026-08-15`: run #38, status/conclusion `completed` / `success`, service status `built`, source `main` at `/`, build type `workflow`, CNAME `leadflowai.pl`, approved certificate and HTTPS enforcement `true`.

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
- compare current production against `67663b08c950de120a94ef8495b5cdc8c9bdecfe` and Pages run `31810716199`;
- inspect the incident and identify an exact known-good revision from release/deployment evidence;
- obtain normal Owner recovery/release authority for the incident-specific rollback target;
- restore/redeploy through normal Git/Pages history and validate the exact selected revision;
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

The current immediate rollback target is `NOT_PROVEN`. Select it for the specific incident from verified known-good evidence under normal Owner recovery/release authority, restore through normal Git/Pages history, and re-run production verification.

Historical checkpoints, by role:
- Global Liquid merge milestone: `36ad3fd6130ce21e68a2c5e701a516fcb3703b65`;
- accepted Global Liquid candidate: `50b71632c687e032311556371108ce3f8d989650`;
- Global Liquid milestone Pages run: `31809931666`;
- pre-Global-Liquid predecessor: `5bba6a6c963fa61ea3920bb4fcefff65ff9376cc`;
- initial V14 merge/candidate/deployment: `39c9b304eff42a71ea36aee871dce569d8f374f0` / `242263ffe1593d1a80890b7f6bc1514316ed2656` / `31800348526`;
- older V13 reference: `10627e2f18ccfc7ef86c76a695dab9cf7933cce9`.
