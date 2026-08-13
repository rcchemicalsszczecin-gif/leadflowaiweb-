# LEADFLOWAI — CURRENT STATE

STATUS: AUTHORITATIVE CURRENT-STATE CHECKPOINT
DATE: 2026-08-13
OWNER: Paweł Niewiadomski
LEGAL ENTITY: Tervyxa Systems sp. z o.o.
PUBLIC BRAND: LeadFlowAI
PRIMARY DOMAIN: leadflowai.pl

## Purpose

This file is the authoritative current-state checkpoint for release status, active work, current validation and known operational blockers. Historical plans, stage records, validation reports and architecture documents remain evidence, but they do not override this checkpoint when they describe an older state.

## Production baseline

- Initial GitHub Pages production launch: COMPLETE.
- Production/release branch: `main`.
- Current audited `main` commit: `0c902a899deae9f300b81e536680447559ed2e1d`.
- `main` contains the V10 responsive/mobile/performance production baseline.
- Further production promotion remains Owner-controlled.

## Active work branch

- Branch: `content/full-offer-v11`.
- Current branch head immediately before this checkpoint update: `eba25874d2262dac592e2d54d4399d1de370c91f`.
- Latest fully validated PR head: `89cca23f0b15bf88a2c0995db0b63254af96becf` with Quality #134 SUCCESS.
- The branch contains Full Offer V11 plus the bounded Portfolio V12 foundation and bounded repository-hardening corrections.
- It is not production authority until Owner-controlled promotion to `main`.

## Current validated product state

The latest complete PR Quality validation for the validated branch head against current `main` passed the complete repository verification chain:

- search contract: PASS;
- Full Offer V11: PASS, including 20 expanded services across six pillars;
- Portfolio V12: PASS, three first-party/own projects, zero fabricated external client case studies;
- lead/contact contract: PASS with online form delivery OFF by Owner and direct e-mail active;
- chatbot contract: PASS with public UI OFF and dormant code bounded;
- content/knowledge contract: PASS with 21 knowledge articles and supported-source boundary;
- operations/static deployment contracts: PASS;
- V9.2 design contract: PASS;
- V10 responsive/performance contract: PASS;
- TypeScript: PASS;
- Biome lint gate: PASS with 22 non-blocking CSS specificity warnings at the latest fully validated checkpoint;
- Next.js production build/static export: PASS;
- performance budget: PASS;
- static artifact contract: PASS;
- static route smoke: PASS.

The validated build generated 66 static pages. Dynamic API routes are absent from the static artifact.

## Repository-hardening state

Completed on the work branch:

- Portfolio V12 optional-note TypeScript inference blocker fixed.
- Source-of-truth/current-state governance synchronized with V9/V9.2 and current production reality.
- Superseded 17-service V11 offer contract removed; the active V11 contract covers 20 expanded services.
- Committed `tsconfig.json` normalized for Next.js 16 by including `.next/dev/types/**/*.ts`; subsequent validated builds no longer rewrite `tsconfig.json`.
- CSS specificity debt in the new V11/V12 knowledge/portfolio layer reduced without changing visual values; warnings dropped from 35 to 22 at the fully validated checkpoint.
- A further one-selector `services.css` cleanup exists at `eba25874d2262dac592e2d54d4399d1de370c91f`; it is intentionally not promoted to validated status until its own Quality evidence exists.

## Current visual authority

- Homepage visual authority: Premium Art Direction V9 plus Premium Calibration V9.2.
- V9.2 is the current homepage calibration authority and supersedes V9 only for the bounded areas defined in `docs/design/LEADFLOWAI-PREMIUM-CALIBRATION-V9-2.md`.
- V9 remains the underlying premium art-direction language.
- V7 remains authoritative for the dedicated Live Lab and interactive service routes.
- V6 remains fallback frame grammar outside premium overrides.
- V5 remains authoritative for the realistic hardware background and bounded water renderer.
- Visual design is frozen after V9.2 except for corrections explicitly allowed by V10 responsive/performance governance.

## Current commercial/content state

- Public positioning: professional WWW production first.
- Full offer architecture: CREATE, DISCOVER, CONVERT, INTELLIGENCE, CONNECT, CARE.
- SEO + AEO + GEO / AI Search: active offer and implemented architecture layer.
- Public chatbot widget: OFF pending explicit Owner enablement and runtime configuration.
- Online lead/contact form delivery: OFF by Owner.
- Active contact path: `kontakt@leadflowai.pl` via direct e-mail.
- Public evidence rule: real evidence only; no fabricated clients, case studies, metrics, rankings or guarantees.

## Known technical/governance debt

The following are known and must not be misreported as resolved:

1. `main` is currently unprotected at GitHub repository settings level; required status checks are not enforced by branch protection.
2. No committed `package-lock.json` exists, so dependency installation is not fully reproducible and CI currently uses `npm install` rather than `npm ci`.
3. The latest fully validated Biome run reports 22 non-blocking CSS `noDescendingSpecificity` warnings. The remaining warnings are in legacy/general or frozen visual layers; V8/V9/V9.2 and the water layer must not be opportunistically rewritten merely to reach zero warnings.
4. Performance remains within budget but has limited JavaScript headroom; future heavy dependencies/effects require explicit budget review.
5. Historical documents may contain superseded status statements. Their historical evidence remains valid, but current status is determined by this file plus higher-authority governance and Owner decisions.
6. `scripts/governance-contract.mjs` exists as a bounded consistency checker but is not part of `npm run verify`; it must not be represented as an active CI gate unless explicitly wired and validated later.

## Current STOP boundary

This checkpoint does not authorize:

- merge to `main`;
- production deployment of the V11/V12 branch;
- public chatbot activation;
- online lead form activation;
- new credentials/secrets;
- Cloudflare production mutations;
- unrelated dependency upgrades;
- visual redesign beyond the frozen V9.2/V10 boundary.

Any of those requires a separately authorized bounded stage or explicit Owner instruction.
