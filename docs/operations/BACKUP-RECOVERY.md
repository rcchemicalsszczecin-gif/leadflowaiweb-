# LEADFLOWAI — BACKUP / RECOVERY BASELINE

STATUS: PRODUCTION V13 BASELINE / V14 RELEASE SUPPORT
DATE: 2026-08-14

## Recovery domains

### Production static frontend
Authoritative application source is Git.

Current production branch: `main`.
Current production V13 revision: `10627e2f18ccfc7ef86c76a695dab9cf7933cce9`.

Normal frontend rollback means restoring/redeploying a known-good Git revision/artifact through normal history. Force-push/history rewrite is not a normal recovery mechanism.

### V14 feature work
V14 develops on `v14/full-visual-rebuild`.

While V14 is under review, the primary recovery guarantee is that production `main` remains untouched until explicit Owner merge authorization.

Each bounded V14 stage should record:
- before-state branch/HEAD;
- changed path set;
- validation result;
- resulting commit identity.

### Public content
Service, knowledge, portfolio and search/public-truth data are repository-managed and recover through the same Git/static-artifact path.

V14 must not trade away the V13 registry/search/public-truth recovery path for visual convenience.

### DNS/TLS/edge
DNS/TLS/edge provider configuration is a separate recovery domain from this repository. Record provider-side changes and rollback state when such changes are actually authorized.

### Future local API
`api.leadflowai.pl`, if later activated, is a separate service/recovery domain. Its application release, secrets, service supervision, tunnel and last known-good configuration must be managed independently from the static frontend.

### Secrets
Production secrets must not be backed up in Git. Provider/API secrets require secure provider/host recovery or reconstruction procedures.

### Lead data
The current static frontend contains no lead database and online lead delivery is OFF. Direct e-mail is the active contact path.

If persistent lead handling is introduced later, the selected destination becomes a separate data-recovery/retention domain.

### Chat data
No persistent public chat system is currently active. If persistence or public chatbot runtime is introduced later, it requires separate privacy, retention, access and recovery decisions.

## Pre-V14-release recovery evidence

Before V14 production merge record:
- exact V14 release candidate SHA;
- current production last known-good SHA;
- full Quality evidence for the candidate;
- visual preview identity;
- route/search/public-truth validation;
- aggregate + route-level performance evidence;
- any edge/provider configuration change plan if separately authorized;
- rollback method to the current V13 production baseline.

## Restore validation

After a frontend rollback/redeploy verify:
- homepage;
- `/uslugi/`;
- representative service route;
- `/kontakt/` and direct e-mail identity;
- `/realizacje/`;
- `/wiedza/` and representative article;
- `/lab/`;
- sitemap;
- robots;
- canonical domain;
- core static assets.

## Safety principle

A visual release is not worth weakening rollback, public truth or production stability.

Feature-branch development and exact release identities remain the primary V14 safety mechanism until the Owner explicitly approves production promotion.
