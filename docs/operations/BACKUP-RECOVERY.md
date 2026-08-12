# LEADFLOWAI — BACKUP / RECOVERY BASELINE V1

STATUS: PRE-PRODUCTION DESIGN
DATE: 2026-08-12

## Recovery domains

### Source code
Authoritative application source is Git. Recovery uses a known-good commit/release; no force-push or history rewrite is required for normal rollback.

### Content
Current public service/knowledge content is repository-managed and follows the same source recovery path.

### Secrets
Production secrets must not be backed up in Git. The selected hosting/provider process must document secret-store export/recovery or secure manual reconstruction before launch.

### Lead data
The current repository does not contain a lead database. When a webhook/CRM is selected, that destination becomes a separate data-recovery domain and must have its own retention/backup policy.

### Chat data
V1 has no persistent conversation database. If persistence is introduced later, it requires a separate privacy, retention, access and recovery decision.

## Pre-release recovery evidence

Before production launch record:
- release commit/revision;
- previous known-good revision;
- deployment configuration identity;
- environment variable inventory by name only, never secret values in Git evidence;
- DNS/TLS provider and rollback method;
- lead destination and test proof;
- backup/retention responsibility for any persistent external data.

## Restore validation

A rollback/restore is not considered successful solely because deployment completes. Re-check:
- `/api/health`;
- homepage;
- `/kontakt`;
- lead fallback/delivery path as appropriate;
- assistant local/fallback mode;
- sitemap/robots;
- critical security headers.
