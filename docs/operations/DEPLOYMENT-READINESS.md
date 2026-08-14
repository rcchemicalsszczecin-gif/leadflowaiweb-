# LEADFLOWAI — DEPLOYMENT READINESS

STATUS: PRODUCTION V14 LIVE / DEPLOYMENT PASS
DATE: 2026-08-14

## Current production

- production branch: `main`;
- production authority: V14 Full Visual Rebuild;
- production merge revision: `39c9b304eff42a71ea36aee871dce569d8f374f0`;
- validated release candidate: `242263ffe1593d1a80890b7f6bc1514316ed2656`;
- previous V13 rollback baseline: `10627e2f18ccfc7ef86c76a695dab9cf7933cce9`;
- framework: Next.js 16.3.1 static export;
- hosting: GitHub Pages;
- public domain: `https://leadflowai.pl`.

GitHub Pages run `31800348526` completed successfully for the V14 merge SHA. Build, full verify, artifact identity and deploy all passed.

## Public boundaries

- direct contact: `kontakt@leadflowai.pl`;
- online lead delivery: OFF by Owner;
- public chatbot: OFF by Owner;
- analytics runtime: not authorized by V14;
- future dynamic API: separate boundary at `https://api.leadflowai.pl` when separately authorized.

## Release gates completed

V14 release completed after:
- V14.9 final QA PASS;
- Owner Visual PASS;
- R9 pre-merge hardening PASS;
- explicit Owner `MERGE AUTHORIZED`;
- exact-head merge guard;
- post-merge Pages build/deploy PASS.

## Production invariants

- `output: "export"` remains active;
- sitemap and robots export statically;
- CNAME and `.nojekyll` remain in the Pages artifact;
- 35 service pages, 21 knowledge articles and 63 dominant search intents remain preserved;
- public core navigation/content/contact remains independent of any future API;
- chatbot/lead backend remains OFF unless separately authorized.

## Security boundary

The static frontend does not own persistent Next.js server headers. Edge security policy belongs to the actual deployment/provider layer. Secrets must never be committed or exposed through public environment variables unless intentionally public.

## Launch decision

V14 is released and is the current production baseline. V13 remains the immediate rollback reference.