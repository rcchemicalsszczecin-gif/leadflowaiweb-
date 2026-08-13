# LEADFLOWAI — LEAD / CONTACT SYSTEM

STATUS: DIRECT E-MAIL MODE / ONLINE FORM DISABLED BY OWNER
DATE: 2026-08-13

## Public route

`/kontakt` remains the public contact and project-brief route.

The site currently does **not** submit lead data to any HTTP endpoint, Worker, webhook, Apps Script, mail-sending service or local backend.

The online form delivery path is intentionally disabled by Owner decision. The public UI must not pretend that a form submission is available while no delivery backend exists.

## Active contact path

Public contact address:

`kontakt@leadflowai.pl`

Cloudflare Email Routing is configured and independently tested for inbound mail. Messages addressed to the public LeadFlowAI mailbox are routed to the Owner's existing Gmail destination.

The website exposes a direct `mailto:` CTA and a short checklist describing what is useful to include in the first message.

## Explicitly not active

The following are not part of the current production contact path:
- `POST /api/leads`;
- `POST /leads` on `api.leadflowai.pl`;
- `forms.leadflowai.pl`;
- Cloudflare Email Sending;
- Google Apps Script relay;
- webhook delivery;
- any server-side form mailer.

No public form may call any of these paths until Owner explicitly reopens the lead-delivery stage.

## Privacy / security posture

Because the online form is disabled, the current public frontend does not collect or transmit contact-form PII.

The contact page explicitly tells users not to send passwords, card data or other technical secrets in the initial message. Access credentials and sensitive implementation data are handled only in a later appropriate project stage.

## Future reactivation gate

If Owner later decides to enable an online form, the implementation must first define and validate:
- a real delivery destination;
- server-side validation;
- bounded payload handling;
- origin/CORS policy;
- abuse/rate-limit controls;
- privacy/legal disclosures;
- failure and fallback behavior;
- end-to-end delivery evidence.

Until those gates pass, direct e-mail remains the only active lead path.

## Validation

Static contract: `scripts/lead-contract.mjs`.

The contract fails if the disabled contact component:
- calls `fetch` or `apiUrl`;
- exposes a submit form;
- omits the explicit disabled-state copy;
- omits the direct `mailto:` path;
- changes the authoritative public e-mail identity.
