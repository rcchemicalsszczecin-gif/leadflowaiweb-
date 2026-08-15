# LEADFLOWAI — DEPLOYMENT READINESS

STATUS: PRODUCTION V14 LIVE / DEPLOYMENT PASS — CURRENT REPOSITORY/DEPLOYMENT IDENTITY IS DEFINED BELOW
DATE: 2026-08-15

## Current production

```text
CURRENT_PRODUCTION_BRANCH=main
CURRENT_PRODUCTION_REPOSITORY_HEAD=67663b08c950de120a94ef8495b5cdc8c9bdecfe
CURRENT_VISUAL_RUNTIME_AUTHORITY=V14_GLOBAL_LIQUID_WORLD
LATEST_SUCCESSFUL_PAGES_RUN_NUMBER=38
LATEST_SUCCESSFUL_PAGES_RUN_ID=31810716199
LATEST_DEPLOYED_HEAD_SHA=67663b08c950de120a94ef8495b5cdc8c9bdecfe
CURRENT_IMMEDIATE_ROLLBACK_TARGET=NOT_PROVEN
```

Current production properties:
- production visual/runtime authority: V14 Global Liquid World;
- framework: Next.js 16.3.1 static export;
- hosting: GitHub Pages;
- public domain: `https://leadflowai.pl`.

The latest Pages checkpoint is `CONTROLLER_VERIFIED_EXTERNAL_EVIDENCE`, last reconciled on `2026-08-15`: status `built`, source branch `main`, source path `/`, build type `workflow`, run status/conclusion `completed` / `success`, CNAME `leadflowai.pl`, approved HTTPS certificate and HTTPS enforcement `true`.

## Historical release milestones

- Global Liquid merge milestone: `36ad3fd6130ce21e68a2c5e701a516fcb3703b65`;
- accepted Global Liquid candidate: `50b71632c687e032311556371108ce3f8d989650`;
- Global Liquid milestone Pages run: `31809931666`;
- pre-Global-Liquid production revision: `5bba6a6c963fa61ea3920bb4fcefff65ff9376cc`;
- initial V14 production merge: `39c9b304eff42a71ea36aee871dce569d8f374f0`;
- initial V14 release candidate: `242263ffe1593d1a80890b7f6bc1514316ed2656`;
- initial V14 deployment run: `31800348526`;
- older V13 reference: `10627e2f18ccfc7ef86c76a695dab9cf7933cce9`.

These identifiers retain historical evidence value. None is declared the current repository HEAD or current immediate rollback target.

## Public boundaries

- direct contact: `kontakt@leadflowai.pl`;
- online lead delivery: OFF by Owner;
- public chatbot: OFF by Owner;
- analytics runtime: not authorized by V14;
- future dynamic API: separate boundary at `https://api.leadflowai.pl` when separately authorized.

## Release gates completed

V14 release completed after:
- V14.9 final QA PASS;
- Owner Visual PASS;
- R9 pre-merge hardening PASS;
- explicit Owner `MERGE AUTHORIZED`;
- exact-head merge guard;
- post-merge Pages build/deploy PASS.

## Production invariants

- `output: "export"` remains active;
- sitemap and robots export statically;
- CNAME and `.nojekyll` remain in the Pages artifact;
- 35 service pages, 21 knowledge articles and 63 dominant search intents remain preserved;
- public core navigation/content/contact remains independent of any future API;
- chatbot/lead backend remains OFF unless separately authorized.

## Security boundary

The static frontend does not own persistent Next.js server headers. Edge security policy belongs to the actual deployment/provider layer. Secrets must never be committed or exposed through public environment variables unless intentionally public.

## Launch decision

V14 Global Liquid World remains the current production visual/runtime authority. The current immediate rollback target is `NOT_PROVEN`; any rollback revision must be selected from verified known-good evidence under normal Owner recovery/release authority.
