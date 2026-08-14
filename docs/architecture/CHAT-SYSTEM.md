# LEADFLOWAI — SITE ASSISTANT / CHAT SYSTEM

STATUS: DORMANT CODE / PUBLIC UI OFF / FUTURE RUNTIME BOUNDARY
DATE: 2026-08-14

## Current Owner decision

The LeadFlowAI commercial offer may include AI chatbots.

The LeadFlowAI website itself does **not** currently expose a public chatbot widget.

Public chatbot UI remains OFF until a separate explicit Owner configuration/enablement stage.

## Current repository state

Dormant client/knowledge code may remain for future reuse:
- `components/site-assistant.tsx`;
- `lib/chat.ts`;
- future API URL helpers/boundaries.

Current root layout must not mount `SiteAssistant` while the public UI decision remains OFF.

The GitHub Pages frontend does not provide `POST /api/chat` and must not claim that it does.

## Future behavior contract

If the Owner later reopens the chatbot stage, the future runtime should preserve these validated design principles.

### Controlled knowledge
Known commercial/site questions may be answered from controlled LeadFlowAI knowledge rather than requiring a remote model for every response.

### AI/provider/local-model mode
Unknown questions may be sent to a separately deployed server-side/local-AI boundary when that runtime is explicitly configured.

Browser code must never receive secret provider credentials.

### Fallback
When AI/model/provider service is unavailable or cannot return a safe usable response, the assistant must have a deterministic fallback to normal site navigation/contact.

The public site itself must remain usable when the AI runtime is unavailable.

## Public-truth guardrails

Any future assistant/provider prompt must prohibit invention of:
- prices;
- delivery timelines;
- customers;
- case studies;
- rankings;
- awards/certifications;
- guarantees;
- company identifiers;
- guaranteed Google positions;
- guaranteed recommendation/citation by generative AI systems.

Public identity remains:
- Brand: LeadFlowAI;
- Domain: leadflowai.pl;
- Legal operator: Tervyxa Systems sp. z o.o.;
- Contact: kontakt@leadflowai.pl.

## Future security/privacy requirements

A future public chatbot runtime requires, before activation:
- explicit server-side API ownership;
- bounded request validation;
- narrow CORS/origin policy where cross-origin requests are used;
- rate limiting appropriate to the deployment;
- timeout/body limits;
- server-only secret handling;
- no accidental logging of user messages/PII beyond an explicitly approved policy;
- fallback behavior;
- monitoring/recovery evidence;
- privacy/legal review appropriate to actual data handling.

## Current validation

Current `scripts/chat-contract.mjs` must enforce the dormant state:
- public UI OFF;
- root layout does not mount SiteAssistant;
- no accidental active chat endpoint claim;
- controlled knowledge/public-truth/fallback code may remain dormant.

Historical records describing `POST /api/chat` as a current Next.js route or the assistant as globally rendered are superseded by the static GitHub Pages + dormant UI architecture.
