# LEADFLOWAI — SITE ASSISTANT / CHAT SYSTEM V1

STATUS: IMPLEMENTED FOR VALIDATION
DATE: 2026-08-12

## Purpose

The LeadFlowAI site assistant is a website-support layer, not a replacement for navigation, service pages or the contact form.

It must remain useful when no external AI provider is configured.

## Modes

### 1. KNOWLEDGE

Known commercial/site questions are answered from controlled local knowledge in `lib/chat.ts`.

Topics include:
- websites;
- landing pages;
- e-commerce;
- SEO/AEO/GEO;
- chatbot scope;
- modernization/migration;
- audits;
- pricing/quote direction;
- contact;
- LeadFlowAI / Tervyxa relationship.

### 2. PROVIDER

Unknown questions may be forwarded server-side to an optional provider configured through:
- `CHAT_PROVIDER_URL`;
- `CHAT_PROVIDER_TOKEN`;
- `CHAT_PROVIDER_MODEL`.

The browser never receives provider URL/token credentials.

The provider is expected to accept an OpenAI-compatible chat payload. This adapter is intentionally provider-neutral and does not claim that any provider is already configured.

### 3. FALLBACK

When no provider is configured or the provider cannot return a safe usable response, the API returns a controlled fallback directing the user to `/kontakt` or `kontakt@leadflowai.pl`.

The UI does not pretend a remote model answered in fallback mode.

## Public-truth guardrails

The provider system prompt explicitly prohibits invention of:
- prices;
- timelines;
- customers;
- case studies;
- rankings;
- awards/certifications;
- guarantees;
- company registration identifiers.

It also prohibits guarantees of Google positions or recommendation/citation by generative AI systems.

Public identity remains:
- Brand: LeadFlowAI;
- Domain: leadflowai.pl;
- Legal operator: Tervyxa Systems sp. z o.o.;
- Contact: kontakt@leadflowai.pl.

## Security / privacy

`POST /api/chat` uses:
- same-origin validation;
- JSON content-type requirement;
- bounded request body;
- server-side message validation;
- best-effort in-process rate limiting;
- server-only provider credentials;
- HTTPS provider requirement in production;
- outbound timeout;
- bounded provider response body.

The route intentionally does not log submitted chat messages.

No conversation database or persistent user profile is implemented in V1.

### Rate-limit limitation

The in-process limiter is best-effort only and is not a distributed production authority across multiple runtime instances. Durable production limiting remains a deployment-stage concern.

## UX / accessibility

The assistant is globally available through `SiteAssistant` and remains optional.

Requirements implemented in V1:
- explicit launcher button;
- close button;
- visible label and message input;
- `aria-live` for new responses;
- keyboard-operable native buttons/form controls;
- mobile layout;
- no chatbot dependency for core navigation/contact.

## Validation

Static contract: `scripts/chat-contract.mjs`.

CI runtime smoke verifies:
- assistant launcher is rendered;
- foreign-origin requests are rejected with 403;
- a known e-commerce question returns `mode=knowledge`;
- an unknown question without provider returns `mode=fallback`;
- fallback includes `kontakt@leadflowai.pl`.

A real remote provider success test requires explicit non-production provider credentials and is intentionally outside repository-only validation.
