# LEADFLOWAI — DEPLOYMENT READINESS

STATUS: PRODUCTION V13 LIVE / V14 NOT AUTHORIZED FOR MERGE
DATE: 2026-08-14

## Current production architecture

Frontend:
- source: GitHub repository;
- production branch: `main`;
- framework: Next.js static export;
- hosting: GitHub Pages;
- public domain: `https://leadflowai.pl`;
- production V13 revision: `10627e2f18ccfc7ef86c76a695dab9cf7933cce9`;
- GitHub Pages deployment for that revision: PASS.

Public contact:
- `kontakt@leadflowai.pl`;
- direct e-mail path is active;
- online lead delivery remains OFF by Owner.

Dynamic API/chat:
- not part of the GitHub Pages artifact;
- `https://api.leadflowai.pl` remains a future/separately authorized local API boundary;
- public LeadFlowAI chatbot remains OFF.

Analytics:
- runtime analytics/consent activation is not part of current V14 work unless separately authorized.

## Current V14 release boundary

- implementation branch: `v14/full-visual-rebuild`;
- active plan: `docs/plans/V14-VISUAL-REBUILD.md`;
- V14 is a feature-branch candidate, not production;
- current V14 Quality/preview evidence does not authorize merge;
- final production promotion requires reliable preview evidence, Owner visual PASS, final Quality on the exact release SHA and explicit Owner merge authorization.

## V14 blockers before release readiness

At minimum:
- source-of-truth/governance synchronization complete;
- V14 mobile navigation/anchor/accessibility defects resolved;
- CSS/runtime historical override stack materially consolidated;
- homepage V14.1–V14.7 literally complete;
- 35 service/money pages and primary routes migrated to V14 shell/templates;
- 63 public search intents and 21 knowledge articles preserved;
- route-level + aggregate performance PASS;
- keyboard/touch/reduced-motion/mobile PASS;
- Chromium + Firefox representative QA PASS;
- static artifact/search/public-truth PASS;
- no accidental chatbot/lead backend activation;
- dependency/security review complete for the release;
- reliable visual preview artifacts available;
- explicit Owner visual approval.

## Static frontend invariants

- `output: "export"` remains active;
- dynamic `app/api/**` handlers are not required by the static public frontend;
- sitemap and robots export statically;
- `CNAME`/`.nojekyll` remain in the Pages artifact;
- public core navigation/content/contact must remain usable without any future API.

## Security boundary

Static GitHub Pages does not own server-side application headers the way a Next.js server runtime would. Edge response-security policy belongs to the actual edge/deployment layer and must be validated against the live provider configuration before tightening CSP/HSTS.

Secrets must never be committed or exposed through `NEXT_PUBLIC_*` unless they are intentionally public configuration.

## Launch decision

Production V13 is already live.

V14 current status: **NOT AUTHORIZED FOR PRODUCTION MERGE**.

That statement protects the current feature branch; it must not be misread as saying LeadFlowAI production itself is not launched.
