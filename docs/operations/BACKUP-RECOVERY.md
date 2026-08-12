# LEADFLOWAI — BACKUP / RECOVERY BASELINE V2

STATUS: PRE-PRODUCTION DESIGN
DATE: 2026-08-12

## Recovery domains

### Static frontend source
Authoritative application source is Git. Frontend rollback means redeploying the **last known-good** commit/artifact to GitHub Pages; normal rollback does not require force-push or history rewrite.

### Content
Current public service/knowledge content is repository-managed and follows the same Git/static artifact recovery path.

### Cloudflare edge
DNS/TLS/Tunnel configuration becomes a separate recovery domain when configured. Before launch record the previous working DNS/Tunnel state and rollback procedure.

### Local API
`api.leadflowai.pl` is a separate service/recovery domain. Record its application release, service configuration and last known-good deployment independently from the frontend.

### Secrets
Production secrets must not be backed up in Git. Cloudflare and local API secrets require secure provider/host recovery or reconstruction procedures.

### Lead data
The frontend repository contains no lead database. The selected lead delivery destination/CRM becomes a separate data-recovery domain and requires its own retention/backup policy.

### Chat data
No persistent conversation database is assumed. If persistence is introduced later, it requires separate privacy, retention, access and recovery decisions.

## Pre-release recovery evidence

Before launch record:
- frontend release commit/revision and Pages artifact identity;
- frontend last known-good revision;
- Cloudflare DNS/TLS/Tunnel configuration identity and rollback method;
- local API release and last known-good revision;
- environment variable inventory by name only, never secret values;
- lead destination and successful controlled delivery proof;
- backup/retention responsibility for persistent external data.

## Restore validation

Frontend rollback validation:
- homepage and critical routes;
- `/kontakt/`;
- sitemap and robots;
- static asset loading and canonical domain.

API rollback validation after that service exists:
- `https://api.leadflowai.pl/health`;
- lead delivery path;
- chat controlled knowledge/fallback;
- CORS allow-list;
- local AI mode if enabled.

Edge rollback validation:
- DNS resolution;
- TLS;
- redirects/canonical host;
- final response security headers.
