# LEADFLOWAI — ROOT AGENT CONSTITUTION

STATUS: NORMATIVE
OWNER: Paweł Niewiadomski
LEGAL ENTITY: Tervyxa Systems sp. z o.o.
PUBLIC BRAND: LeadFlowAI
PRIMARY DOMAIN: leadflowai.pl

## Authority chain
1. Current explicit Owner instruction.
2. This `AGENTS.md`.
3. `docs/governance/*`.
4. Current Owner-approved Master Plan.
5. Current architecture/design decision records.
6. Current committed repository evidence.
7. Reference/history/memory.

Lower authority never silently overrides higher authority.
A later explicit Owner decision supersedes an earlier design/release decision inside the scope it changes.

## Execution model
Work may be executed as a complete bounded STAGE when the Owner authorizes starting that stage.
A stage may contain multiple gates and many files when all work is necessary for one coherent stage outcome.

1000% = MAXIMUM COMPLETENESS INSIDE CURRENT SCOPE
1000% != MAXIMUM SCOPE

For every stage: define objective, in-scope, forbidden work, write set/domain, before-state, recovery, dependencies, validation, exit criteria and STOP semantics.
FILE COUNT != SCOPE.
Unexpected changed paths = FAIL / STOP.

## No opportunistic expansion
No unrelated cleanup, refactors, dependency changes, runtime changes, deployment, credentials, cross-project mutation or publication unless included in the active stage.

## Git authority
Direct mutation of `main`, force-push and history rewrite are prohibited without explicit Owner instruction.
Feature-branch commits may be created when the current Owner instruction explicitly authorizes starting implementation.
Merge to `main`, production deployment and release remain Owner-controlled unless explicitly delegated.

Current V14 implementation branch: `v14/full-visual-rebuild`.
Production baseline remains `main` until explicit Owner merge authorization.

## Public truth
No fabricated clients, testimonials, case studies, metrics, certifications, awards, legal identifiers, guarantees, rankings, offices, partnerships, AI citations or research.
CLAIM -> EVIDENCE -> REVIEW -> PUBLIC STATUS.
Live demonstrations must be labeled as first-party demos/concepts and never implied to be client case studies.
Qualitative interface status labels may describe demo/system states but must not masquerade as customer metrics or business results.
Original research requires a real auditable dataset, methodology, time range, sample rules and stated limitations before publication.

## Website invariants
LeadFlowAI must itself demonstrate the quality it sells:
- semantic HTML;
- responsive/mobile-first UX;
- accessibility;
- performance and Core Web Vitals;
- technical SEO;
- AEO;
- GEO / AI Search architecture;
- valid structured data;
- CRO and lead capture architecture;
- security;
- privacy-aware analytics;
- maintainability and observability.

Current functional/public boundaries:
- public chatbot UI: OFF until a separate Owner decision;
- online lead-form delivery: OFF until a separate Owner decision;
- direct e-mail through `kontakt@leadflowai.pl`: ACTIVE;
- analytics/consent runtime: not activated without a separate reviewed stage.

## Current design authority — V14
The active visual authority is the later Owner decision recorded in `docs/governance/WEBSITE-OWNER-DECISION-V14.md` together with the execution plan in `docs/plans/V14-VISUAL-REBUILD.md`.

V14 supersedes V9/V9.2 visual freeze for the public redesign areas authorized by the Owner.
V9/V9.2, V8 and earlier design records remain historical evidence/recovery checkpoints, not the current homepage design authority.

V13 remains authoritative for the Polish content/search/public-truth foundation unless V14 explicitly changes presentation without changing the underlying truth model.
Preserve through V14:
- existing public URLs;
- 35 service/money pages;
- 21 knowledge articles;
- 63 dominant search intents;
- metadata/canonical/sitemap/robots;
- structured-data/public-truth boundaries;
- real-only portfolio;
- direct-answer/decision/FAQ information architecture.

V7 remains a useful functional baseline for the dedicated `/lab` interactive demonstrations, but its old visual dependency on V5/V6/V9 is not current authority.

## V14 visual principles
- LeadFlowAI must read as a premium web/product studio rather than a technical dashboard template.
- Use a controlled 12-column/grid-based system, deliberate spacing and strong editorial hierarchy.
- Use light and dark scenes intentionally for rhythm.
- Real browser/product/device UI should outrank decorative abstract diagrams.
- Liquid/Water is a selective signature experience, not a permanent wallpaper requirement.
- The old motherboard photograph is not a protected current design asset.
- Global fade/dimming of ordinary content during scroll is prohibited.
- Mobile receives its own composition/navigation/touch treatment rather than scaled desktop.
- Motion must explain state, hierarchy or system behavior and respect reduced motion.
- No heavyweight third-party 3D dependency solely for decorative effects.
- Essential information and navigation must remain usable without animation or WebGL.

## Historical design records
Historical design documents V1–V9.2 and V10 responsive/performance records may retain accurate evidence of their original stage. They must not be interpreted as present operational authority when they conflict with the current V14 Owner decision.

Historical executable contracts may remain for evidence, but active Quality must not require superseded historical visual assumptions such as V9.2 freeze or the old Unsplash motherboard asset.

## Validation
Each stage requires relevant technical validation, changed-path review, semantic/public-truth checks and a formal PASS/FAIL/BLOCKER verdict.

V14 acceptance additionally requires:
- mobile navigation and touch behavior;
- keyboard/focus/reduced-motion coverage;
- route-level and aggregate performance evidence;
- Chromium and Firefox representative QA;
- all 63 intent URLs and 21 knowledge articles preserved;
- valid static export/search artifacts;
- no accidental public API/chat/lead activation;
- reliable visual preview evidence;
- explicit Owner visual approval before merge.

Completion of a stage does not automatically authorize deployment or merge.
