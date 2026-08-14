# LEADFLOWAI — BACKUP / RECOVERY BASELINE

STATUS: PRODUCTION V14 BASELINE
DATE: 2026-08-14

## Production static frontend

Authoritative application source is Git.

Current production branch: `main`.
Current production V14 merge revision: `39c9b304eff42a71ea36aee871dce569d8f374f0`.
Validated V14 release candidate: `242263ffe1593d1a80890b7f6bc1514316ed2656`.
Previous known-good V13 rollback baseline: `10627e2f18ccfc7ef86c76a695dab9cf7933cce9`.

GitHub Pages deployment run `31800348526` passed for the V14 merge revision.

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

V14 production release evidence includes:
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

V14 `39c9b304eff42a71ea36aee871dce569d8f374f0` is the current production baseline. V13 `10627e2f18ccfc7ef86c76a695dab9cf7933cce9` remains the immediate historical rollback reference until a newer known-good production release supersedes it.