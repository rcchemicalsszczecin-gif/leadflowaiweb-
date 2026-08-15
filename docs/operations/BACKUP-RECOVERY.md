# LEADFLOWAI — BACKUP / RECOVERY BASELINE

STATUS: PRODUCTION V14 BASELINE — VISUAL/RUNTIME AUTHORITY; CURRENT REPOSITORY/DEPLOYMENT IDENTITY IS DEFINED BELOW
DATE: 2026-08-15

## Production static frontend

Authoritative application source is Git.

```text
CURRENT_PRODUCTION_BRANCH=main
CURRENT_PRODUCTION_REPOSITORY_HEAD=67663b08c950de120a94ef8495b5cdc8c9bdecfe
CURRENT_VISUAL_RUNTIME_AUTHORITY=V14_GLOBAL_LIQUID_WORLD
LATEST_SUCCESSFUL_PAGES_RUN_NUMBER=38
LATEST_SUCCESSFUL_PAGES_RUN_ID=31810716199
LATEST_DEPLOYED_HEAD_SHA=67663b08c950de120a94ef8495b5cdc8c9bdecfe
CURRENT_IMMEDIATE_ROLLBACK_TARGET=NOT_PROVEN
```

The current production visual/runtime authority is V14 Global Liquid World. The current Pages run and service facts are `CONTROLLER_VERIFIED_EXTERNAL_EVIDENCE`, last reconciled on `2026-08-15`; repository contents do not prove mutable provider state indefinitely.

Current external checkpoint:
- Pages status: `built`;
- source: branch `main`, path `/`;
- build type: `workflow`;
- public URL: `https://leadflowai.pl/`;
- CNAME: `leadflowai.pl`;
- latest run status/conclusion: `completed` / `success`;
- HTTPS certificate: `approved`;
- HTTPS enforcement: `true`.

Normal rollback restores/redeploys a known-good Git revision/artifact through normal history. Force-push/history rewrite is not a normal recovery mechanism.

## Recovery domains

### Public content
Service, knowledge, portfolio and search/public-truth data are repository-managed and recover through the same Git/static-artifact path.

### DNS/TLS/edge
DNS/TLS/edge provider configuration is separate from repository recovery. GitHub Pages currently reports CNAME `leadflowai.pl`, approved TLS and HTTPS enforcement.

### Future local API
`api.leadflowai.pl`, if later activated, is a separate service/recovery domain with its own release, secrets, supervision, tunnel and last known-good state.

### Secrets
Production secrets must not be backed up in Git. Provider/API secrets require secure provider/host recovery or reconstruction procedures.

### Lead data
The current static frontend contains no lead database and online lead delivery is OFF. Direct e-mail remains the active contact path.

### Chat data
No persistent public chat system is active. Public chatbot remains OFF.

## Release recovery evidence

Historical V14 and Global Liquid release checkpoints remain valid evidence with distinct roles:
- Global Liquid merge milestone: `36ad3fd6130ce21e68a2c5e701a516fcb3703b65`;
- accepted Global Liquid candidate: `50b71632c687e032311556371108ce3f8d989650`;
- Global Liquid milestone Pages run: `31809931666`;
- pre-Global-Liquid production revision: `5bba6a6c963fa61ea3920bb4fcefff65ff9376cc`;
- initial V14 production merge: `39c9b304eff42a71ea36aee871dce569d8f374f0`;
- initial V14 release candidate: `242263ffe1593d1a80890b7f6bc1514316ed2656`;
- initial V14 deployment run: `31800348526`;
- older V13 reference: `10627e2f18ccfc7ef86c76a695dab9cf7933cce9`.

The release evidence model includes:
- exact release candidate SHA;
- Owner Visual PASS;
- R9 pre-merge hardening PASS;
- explicit Owner merge authorization;
- exact guarded merge SHA;
- Quality/browser/preview/search/security/performance PASS;
- GitHub Pages build/deploy PASS.

## Restore validation

After rollback/redeploy verify homepage, `/uslugi/`, a representative service, `/kontakt/`, `/realizacje/`, `/wiedza/`, a representative article, `/lab/`, sitemap, robots, canonical domain and core static assets.

## Safety principle

The current immediate rollback target is `NOT_PROVEN`. For an incident, select the exact revision from verified known-good release and deployment evidence under normal Owner recovery/release authority. Restore through normal Git/Pages history, never through force-push or history rewriting. The checkpoints above are evidence inputs, not an automatic rollback selection.
