# LEADFLOWAI — OPERATIONS RUNBOOK V1

STATUS: PROVIDER-NEUTRAL BASELINE
DATE: 2026-08-12

## Scope

This runbook defines operational behavior that can be validated before choosing a production hosting provider. It does not authorize deployment.

## Current production boundary

- Production deployment: NOT AUTHORIZED.
- Hosting provider: UNSELECTED.
- DNS cutover: NOT AUTHORIZED.
- `main`: must remain unchanged until Owner approval.
- Public domain target: `https://leadflowai.pl`.
- Public contact: `kontakt@leadflowai.pl`.

## Runtime health

Endpoint: `GET /api/health`.

Expected healthy response:
- HTTP 200;
- JSON `status=ok`;
- service `leadflowai-web`;
- `Cache-Control: no-store`.

The health endpoint intentionally does not expose secrets, environment values, Git hashes, hostnames, user data or provider configuration.

## Required production secrets

Server-only values where the corresponding feature is enabled:
- `LEAD_WEBHOOK_URL`;
- `LEAD_WEBHOOK_TOKEN`;
- `CHAT_PROVIDER_URL`;
- `CHAT_PROVIDER_TOKEN`;
- `CHAT_PROVIDER_MODEL`.

Secrets must live in the deployment secret store/environment, never in Git or browser-exposed `NEXT_PUBLIC_*` variables.

## Pre-deploy minimum checks

1. Clean target commit and Owner-approved release identity.
2. Quality workflow green on that exact commit.
3. Production build green.
4. Required environment variables configured for features being enabled.
5. `/api/health` verified in the target environment.
6. `/kontakt` tested with a non-production or controlled delivery target before accepting real leads.
7. Chat provider success path tested separately if remote AI is enabled.
8. Domain/TLS/DNS configuration verified before traffic cutover.
9. Legal/public company data reviewed before production publication.
10. Rollback target recorded before release.

## Incident triage

### Site unavailable
- check hosting/runtime status;
- check `/api/health`;
- inspect deployment logs without exposing submitted PII;
- compare current release identity with last known-good release;
- rollback when the current release is the suspected cause.

### Lead form unavailable
- verify `/kontakt` page;
- verify `/api/leads` same-origin behavior;
- verify server-only webhook configuration;
- use `kontakt@leadflowai.pl` as the public fallback channel;
- do not claim successful lead delivery when webhook proof is absent.

### Assistant unavailable
- core website/navigation/contact must remain usable;
- local knowledge/fallback should work without a remote provider;
- if remote provider fails, do not block the site;
- verify provider credentials/endpoint only in the deployment secret environment.

## Rollback principle

Rollback means restoring the last known-good application release/configuration without rewriting repository history. DNS and deployment rollback procedures must be finalized for the chosen provider before launch.
