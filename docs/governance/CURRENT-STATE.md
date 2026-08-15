# LEADFLOWAI — CURRENT STATE

STATUS: AUTHORITATIVE CURRENT-STATE CHECKPOINT
DATE: 2026-08-15
OWNER: Paweł Niewiadomski
LEGAL ENTITY: Tervyxa Systems sp. z o.o.
PUBLIC BRAND: LeadFlowAI
PRIMARY DOMAIN: leadflowai.pl

## 1. Current production authority

- Production branch: `main`.
- Current production repository HEAD: `67663b08c950de120a94ef8495b5cdc8c9bdecfe`.
- Current production visual/runtime authority: V14 Global Liquid World.
- V14 Global Liquid runtime merge milestone: `36ad3fd6130ce21e68a2c5e701a516fcb3703b65` — `Merge V14 Global Liquid World`.
- Merged Global Liquid candidate: `50b71632c687e032311556371108ce3f8d989650`.
- Previous production baseline before Global Liquid: `5bba6a6c963fa61ea3920bb4fcefff65ff9376cc`.
- Initial V14 release merge (historical): `39c9b304eff42a71ea36aee871dce569d8f374f0` from candidate `242263ffe1593d1a80890b7f6bc1514316ed2656`.
- V13 `10627e2f18ccfc7ef86c76a695dab9cf7933cce9` remains an older major rollback/reference checkpoint.

The later `main` commits through `67663b08...` preserve the V14 production visual/runtime authority. Production state must be identified by current `main` plus deployment evidence, not by the older runtime merge milestone alone.

## 2. Current production deployment proof

Latest GitHub Pages deployment for current `main`:

- workflow: `Deploy GitHub Pages`;
- run number: `38`;
- run id: `31810716199`;
- head branch: `main`;
- head SHA: `67663b08c950de120a94ef8495b5cdc8c9bdecfe`;
- status: `completed`;
- conclusion: `success`.

Therefore the exact current `main` HEAD is proven to have passed the configured Pages deployment workflow and been deployed by that workflow.

Historical Global Liquid deployment run #36 / run id `31809931666` remains milestone evidence for `36ad3fd...`, but it is no longer the latest production deployment identity.

Known Pages/public configuration remains:
- custom domain: `leadflowai.pl`;
- HTTPS-enabled public frontend;
- GitHub Pages deployment from the repository workflow.

## 3. Preserved production public foundation

Current production continues to preserve the established public model including:
- 35 service/money pages;
- 21 knowledge articles;
- 63 dominant public search intents/canonical baseline;
- canonical/sitemap/robots and structured-data architecture;
- direct answers, FAQ and service decision guidance;
- reviewed/source-backed knowledge layer;
- first-party/real-only portfolio principle;
- direct contact through `kontakt@leadflowai.pl`.

Current functional boundaries:
- public chatbot UI: OFF by Owner;
- online lead delivery: OFF by Owner;
- analytics/consent runtime: NOT AUTHORIZED;
- direct email: ACTIVE.

READY != ACTIVE.
CANDIDATE != PRODUCTION.

## 4. Current V14 production visual/runtime authority

The accepted first-screen hero remains the lead visual composition.

V14 Global Liquid World extends the signature visual system across the remaining public site while protecting that hero from duplicate canvas/GPU competition.

Current production visual/runtime invariants include:
- no white/paper public section art direction;
- one root-mounted first-party WebGL2 submerged-compute field outside the protected hero viewport;
- explicit PCB traces/vias, CPU/socket/die, GPU package, VRAM modules, capacitors and rail-like hardware forms;
- liquid refraction, caustics, specular bands, ripples and depth as atmosphere rather than essential meaning;
- pointer/scroll response with frame caps;
- DPR caps, document-visibility suspension and reduced-motion fallback;
- hero guard preventing redundant global-field competition with the accepted hero;
- `V14LiquidSurface` retained for dedicated hero/constructor signature scenes;
- Owner-provided LeadFlowAI brand mark in the public shell;
- dark/translucent service, knowledge, contact and Lab surfaces over the shared world;
- essential navigation/content usable without WebGL/animation.

## 5. Production architecture

Current production foundation:
- Next.js `16.3.1`;
- React `19.2.4`;
- static export;
- GitHub Pages public frontend;
- centralized service/knowledge/metadata/structured-data foundations;
- first-party visual runtime without a heavyweight third-party decorative 3D dependency;
- dormant chatbot/lead-delivery code does not imply public activation.

The production line still contains bounded legacy/compatibility styling on migrated inner routes. Homepage remains bridge-free according to the accepted post-V14 architecture and later maintenance evidence.

## 6. V15 Search candidate — NOT PRODUCTION

Branch:
`v15/search-master-plan`

Exact Draft candidate head:
`5925c553bae0d59ebb7cb10043f46453fb8da8b6`

PR #22:
- state: open;
- Draft: yes;
- merged: no;
- base: `main` at `67663b08...`.

V15 is the evidence-driven Search / SEO / AEO / GEO / AI Search candidate built on top of production V14.

Important exact-head candidate evidence includes:
- 63 indexable canonical URLs;
- 35 service pages;
- 21 knowledge articles;
- canonical/sitemap parity;
- repaired Open Graph/canonical ownership;
- expanded Service <-> knowledge graph;
- corrected structured-data trailing-slash/canonical parity;
- corrected social image inheritance;
- Quality exact-head PASS;
- Browser Matrix exact-head PASS;
- Route Visual Preview exact-head PASS;
- static build and npm audit PASS at the recorded candidate checkpoint.

V15 explicitly does NOT prove external Google/Bing/index/ranking/CTR/field-CWV/conversion/AI-citation performance.

External states such as Google Search Console and Bing Webmaster remain evidence-gated.

No V15 PASS authorizes merge or deployment by itself.

## 7. Post-V15 CSS de-stack candidate — NOT PRODUCTION

Branch:
`post-v15/css-destack`

Exact head:
`5c65435f2de5b2318c1c2585a478c9595f576f76`

PR #26:
- state: open;
- Draft: yes;
- merged: no;
- base: `v15/search-master-plan` at `5925c553...`;
- targets V15, not `main`.

The branch performs reference-proven legacy CSS/component maintenance without changing production/search/canonical authority.

Latest exact-head Post-V15 Maintenance QA evidence:
- workflow: `Post-V15 Maintenance QA`;
- run #48;
- run id: `31833697190`;
- head SHA: `5c65435f2de5b2318c1c2585a478c9595f576f76`;
- status: completed;
- conclusion: success.

At this candidate checkpoint:
- retired V13 visual authority stylesheet is absent from runtime loading;
- known retired components are removed;
- protected dormant chatbot/contact helper components remain explicitly classified rather than opportunistically deleted;
- homepage remains compatibility-bridge-free;
- inner-route compatibility CSS remains only where current evidence does not yet justify blanket deletion;
- post-V15 CSS/component maintenance contracts are green.

This branch is technically ahead of V15 but remains non-production.

## 8. Local SSD Point Zero before Codex

Owner-established local working environment:

- base storage: SSD-backed local filesystem;
- local working branch before control-plane import: `codex/post-v15-hardening`;
- base/upstream: `origin/post-v15/css-destack`;
- exact base HEAD: `5c65435f2de5b2318c1c2585a478c9595f576f76`;
- tracked files at that base: 292;
- `npm run verify`: PASS;
- static export: PASS;
- tracked files after verification were returned byte-for-byte to the pre-verification baseline;
- worktree: CLEAN.

A local verification exposed a Next.js-generated mutation of tracked `next-env.d.ts`; the mutation was captured as evidence and the file restored exactly to HEAD. This is maintenance/audit evidence, not an authorized source change.

## 9. Codex control-plane candidate — NOT PRODUCTION

Branch:
`governance/codex-control-plane-v1`

Base:
`post-v15/css-destack` at `5c65435f2de5b2318c1c2585a478c9595f576f76`.

Purpose:
- install a strict Owner -> ChatGPT Controller -> Codex Executor -> ChatGPT Strict Review -> Owner workflow;
- make Codex read/write/Git boundaries explicit;
- enforce bounded stages/gates;
- enforce exact-path scope;
- enforce evidence-backed PASS;
- make staging/commit/push/merge/deployment Owner-controlled;
- define prompt/report contracts;
- reconcile governance that previously allowed agent feature-branch commits.

This branch is an isolated governance candidate. It does not modify `main`, does not merge V15/post-V15, and does not authorize deployment.

## 10. Current governance execution model

The intended control-plane lifecycle is:

READ / STATUS / INVENTORY
-> PREWRITE
-> OWNER AUTHORIZATION
-> IMPLEMENTATION
-> VALIDATION
-> CODEX FINAL REPORT
-> CHATGPT STRICT REVIEW
-> OWNER REVIEW
-> OWNER EXACT-PATH STAGING
-> OWNER COMMIT
-> OWNER PUSH
-> POST-PUSH VALIDATION
-> NEXT-STAGE DECISION.

Codex does not stage, commit, push, merge or deploy under the normal workflow.

Prompts to Codex are English by default.
ChatGPT reviews/translates the Codex report for the Owner.

## 11. Repository settings / IP debt

Current known repository-level debt includes:
- `main` branch protection is OFF at repository-settings level;
- required status checks are not enforced by branch protection;
- Dependabot alerts/settings hardening remains unresolved;
- repository is public;
- licensing/IP/public-private policy remains a separate Owner decision;
- no release/tag model is relied upon as the primary deployment identity.

These are governance/repository-setting concerns and are not automatically runtime defects.

## 12. External evidence gaps

Repository code/evidence cannot by itself prove:
- Google indexing/rankings/CTR;
- Search Console performance;
- Bing Webmaster external state;
- field Core Web Vitals/CrUX;
- analytics/conversion data;
- real AI-search citations;
- backlink/business-profile state.

Classify these as `BLOCKED_EXTERNAL_EVIDENCE` unless current external evidence is actually obtained.

## 13. Current product-completion authority and next macro stage

Current top-level product-completion authority:

`docs/plans/LEADFLOWAI_AUTHORITATIVE_MASTER_PLAN_V2.md`

```text
AUTHORITATIVE_TOP_LEVEL_MASTER_PLAN=docs/plans/LEADFLOWAI_AUTHORITATIVE_MASTER_PLAN_V2.md
CURRENT_SITE_STATUS=NOT_FINISHED
CURRENT_PRODUCT_COMPLETION_PROGRAM=A→Z / C01–C27
C01_TRUTH_RECONCILIATION=COMPLETE
C01A_INVENTORY=COMPLETE
C01B_OPERATIONAL_DOCUMENT_CORRECTION=COMPLETE
C01C_VALIDATOR_HARDENING=COMPLETE
C01D_FINAL_CONTRADICTION_REVIEW=PASS_WITH_WARNINGS_OUTCOME_B
OPERATIONS_CURRENT_TRUTH_PER_FILE=6_OF_6
OPERATIONS_NEGATIVE_TESTS=8_OF_8
C01_CORE_CONTRACTS=3_OF_3_PASS
CURRENT_IMMEDIATE_ROLLBACK_TARGET=NOT_PROVEN
C01_RESIDUAL_OPEN_BACKLOG=OPS-03,OPS-04
NEXT_MACRO_STAGE=C02
C02_IMPLEMENTATION_AUTHORIZED=NO
```

Current product status and program:

- `CURRENT_SITE_STATUS=NOT_FINISHED`;
- `TECHNICAL_PASS_DOES_NOT_EQUAL_PRODUCT_COMPLETION=YES`;
- `CURRENT_PRODUCT_COMPLETION_PROGRAM=A→Z / C01–C27`;
- `C01_TRUTH_RECONCILIATION=COMPLETE`;
- `C01_RESIDUAL_OPEN_BACKLOG=OPS-03,OPS-04`;
- `NEXT_MACRO_STAGE=C02`;
- `C02_IMPLEMENTATION_AUTHORIZED=NO`.

V1 is superseded as the current top-level Master Plan and retained as historical product/delivery provenance. V15 remains the active subordinate Search / SEO / AEO / GEO / AI Search domain plan and candidate evidence program. Neither classification promotes candidate code to production.

The control-plane import, clean Point Zero, complete 301-file Codex absorption, repository audit, Full Product Completion Plan and Master Plan V2 synthesis are completed milestones. They are not future execution steps.

Current Owner-controlled planning inputs for future bounded stages include:

- `OWNER_LIQUID_VERTICAL_ORIENTATION_DEFECT=CONFIRMED`; the defect is not fixed by this documentation promotion;
- external immutable primary logo master: `/home/leadflowai/LeadFlowAI-SSD/owner-assets/leadflowai-brand/leadflowai-primary-logo-owner-approved.png`, 1536×1024 RGBA, SHA256 `4a5736eae07fbd166deec6567c907fe7b809697d45cf6f647399cbdaba1652ba`;
- external immutable compact mark master: `/home/leadflowai/LeadFlowAI-SSD/owner-assets/leadflowai-brand/leadflowai-brand-mark-owner-approved.png`, 400×400 RGBA, SHA256 `1c7b5a4c27eb4ccf22f089183e6bd5f072ffed3cc16ea0fd056cd53da777cbf5`;
- external immutable hero visual master: `/home/leadflowai/LeadFlowAI-SSD/owner-assets/leadflowai-brand/leadflowai-hero-owner-approved.png`, 1536×585 RGBA, SHA256 `dc0e64dbd7fc56179c086b1860926a9821b139ef15afb735be2ce0f8c4405ba9`.

These assets remain outside the repository pending C02/C04 IP and asset-admission authority. They are not attached, implemented or deployed.

C01 Operations Truth Reconciliation was completed through separately bounded Owner-authorized gates. Its per-file operational truth is 6/6, negative tests are 8/8 and the three core contracts pass. This truth-reconciliation closeout does not close OPS-03 or OPS-04, establish an immediate rollback SHA, prove production release readiness or change the production branch, Pages deployment or public runtime.

C02 Repository, IP and GitHub Decision is the next macro stage. `C02_IMPLEMENTATION_AUTHORIZED=NO`; it requires a separate exact Owner-authorized gate, and no later C-stage is authorized automatically.

## 14. Production protection

No candidate branch, successful CI run, Codex report or local PASS automatically authorizes:
- merge to `main`;
- production deployment;
- public runtime activation;
- canonical-set migration;
- analytics;
- chatbot;
- online lead delivery.

Further production mutation requires explicit Owner authority and current evidence.
