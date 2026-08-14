# V15.15 — Conversion Measurement Plan

STATUS: PLANNING_ONLY_RUNTIME_NOT_AUTHORIZED
DATE: 2026-08-14
OWNER_RUNTIME_AUTHORITY_REQUIRED: YES

## 1. Purpose

Define a minimal conversion-measurement model before any analytics, cookies, storage or third-party runtime is introduced.

This document does not activate analytics.

## 2. Current public conversion boundary

Current production facts remain:

- direct email through `kontakt@leadflowai.pl`: ACTIVE;
- frontend-only contact brief: ACTIVE without server delivery/storage;
- online lead delivery: OFF_BY_OWNER;
- public chatbot: OFF;
- analytics runtime: NOT AUTHORIZED;
- cookies/local storage for analytics: ABSENT;
- conversion rate: UNMEASURED.

## 3. Proposed future event taxonomy

Only after separate runtime/privacy authority, a minimal event model may include:

- `cta_contact_navigation` — navigation from a public page toward the contact route;
- `contact_email_click` — click on a direct `mailto:` contact path;
- `contact_brief_prepare` — user prepares the frontend-only brief for an email workflow;
- `service_to_knowledge` — contextual navigation from Service to supporting knowledge;
- `knowledge_to_service` — contextual navigation from knowledge to a Service page.

These event names are planning artifacts, not active telemetry.

## 4. Allowed low-risk context after authorization

Prefer non-PII context such as:

- landing path;
- current page path;
- service/topic context;
- device class only if provided in a privacy-appropriate implementation;
- source/medium only when lawfully available and necessary;
- release/version identity for change analysis.

## 5. Data that should not be placed in routine analytics events

Do not send:

- email addresses;
- names;
- phone numbers;
- free-text project descriptions;
- contact brief/message contents;
- passwords/secrets;
- payment information;
- sensitive identifiers;
- document contents;
- user-entered confidential business information.

## 6. Activation prerequisites

Before runtime activation:

1. separate explicit Owner authorization;
2. choose the measurement architecture/vendor or first-party approach;
3. identify legal/privacy basis and consent requirements appropriate to the implementation;
4. document cookies/storage/network destinations;
5. define data minimization and retention;
6. verify processor/subprocessor implications where relevant;
7. implement consent behavior if required;
8. validate event payloads against this no-PII boundary;
9. run browser/security/performance regression QA;
10. update public privacy information where required.

## 7. Measurement model after activation

A conversion observation should record only real events and retain:

- event name;
- date/window;
- landing/current route context;
- source context when valid;
- release SHA;
- count from the real measurement source;
- limitations and consent/data-loss context.

Unknown counts remain unknown. No conversion-rate denominator is inferred without a real source.

## 8. Forbidden without separate authority

- analytics script injection;
- pixels;
- cookie/identifier creation;
- local/session storage analytics state;
- behavioral profiling;
- form interception for tracking;
- background submission of contact content;
- claiming conversion rate or qualified lead volume.

## 9. Verdict

`V15_15_MEASUREMENT_PLAN=READY`

`ANALYTICS_RUNTIME=NOT_AUTHORIZED`

`COOKIES_STORAGE=NOT_INTRODUCED`

`PII_EVENT_PAYLOADS=FORBIDDEN`

`CONVERSION_RATE=UNMEASURED`
