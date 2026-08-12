# LEADFLOWAI — LEAD / CONTACT SYSTEM V1

STATUS: IMPLEMENTED FOR VALIDATION
DATE: 2026-08-12

## Public route

`/kontakt` provides a structured project brief for website-related enquiries.

Collected fields are limited to project qualification/contact needs:
- contact name;
- e-mail;
- optional phone;
- optional company/brand;
- project type;
- optional current URL;
- project goal;
- optional scope/details;
- budget range;
- optional deadline;
- confirmation that submitted data may be used to answer the enquiry.

The form explicitly tells users not to submit passwords, card details or technical secrets.

## API

`POST /api/leads`

Route Handler uses native Request/Response APIs and runs on Node runtime.

Server checks:
- same-origin request;
- best-effort request rate limiting;
- JSON content type;
- bounded request body;
- JSON parsing;
- honeypot;
- server-side field validation;
- basic form timing check;
- controlled delivery configuration.

Submitted PII is not intentionally written to console logs by the route.

## Delivery

Server-only environment variables:
- `LEAD_WEBHOOK_URL`;
- `LEAD_WEBHOOK_TOKEN` (optional bearer token).

Production webhook URLs must use HTTPS.

When delivery is not configured, the API returns a controlled `503 DELIVERY_UNCONFIGURED` response with the public fallback address `kontakt@tervyxa.pl`. The UI must not claim that a lead was sent successfully in this state.

When the configured destination fails, the API returns `502 DELIVERY_FAILED` and the same fallback contact path.

## Abuse controls

V1 includes:
- hidden honeypot;
- minimum/maximum form age;
- same-origin request validation;
- body-size limit;
- in-process rate limiter when client IP is available.

### Important production limitation

The in-process rate limiter is **best-effort only**. It is not a durable distributed rate-limit authority across multiple serverless/runtime instances. A production hosting decision must define a durable edge/store-backed rate limit if deployment architecture requires it.

This limitation must not be misrepresented as solved by V1.

## Privacy minimization

The webhook payload intentionally excludes IP address and user-agent data. Network-derived IP may be used transiently for best-effort abuse limiting but is not included in the outbound lead object by this implementation.

## Validation

Static contract: `scripts/lead-contract.mjs`.

CI runtime smoke after production build verifies:
- `/kontakt` returns a usable page;
- foreign Origin POST is rejected with 403;
- a valid same-origin submission without configured webhook returns controlled 503;
- fallback response contains `DELIVERY_UNCONFIGURED` and `kontakt@tervyxa.pl`.

A real delivery success test requires an explicitly configured non-production webhook destination and is intentionally outside the current repository-only stage.
