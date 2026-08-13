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

## Public truth
No fabricated clients, testimonials, case studies, metrics, certifications, awards, legal identifiers, guarantees, rankings, offices or partnerships.
CLAIM -> EVIDENCE -> REVIEW -> PUBLIC STATUS.
Live demonstrations must be labeled as first-party demos/concepts and never implied to be client case studies.
Qualitative interface status labels may describe demo/system states but must not masquerade as customer metrics or business results.

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
- CRO and lead capture;
- security;
- privacy-aware analytics;
- maintainability and observability.

## Design authority
The current homepage calibration direction is recorded in `docs/design/LEADFLOWAI-PREMIUM-CALIBRATION-V9-2.md`.
V9.2 supersedes V9 only for homepage width calibration, clipping control, cinematic composition variety, progress/navigation detail, reveal timing, browser-native 3D centerpiece and the closing scene.
V9 remains the underlying premium art-direction language and keeps Liquid Circuit plus first-party proof authoritative.
V7 remains authoritative for the dedicated Live Lab and interactive service routes; V6 remains fallback frame grammar outside premium overrides; V5 remains authoritative for the realistic hardware background and bounded water renderer.
Premium direction means broad safe compositions, deliberate whitespace, strong editorial scale, restrained signal green, selective interaction and no accidental clipping.
Interactive additions must remain bounded, accessible and performance-aware. Heavy third-party 3D dependencies are not justified for decorative homepage effects.
Visual implementation must follow the current Owner-approved design record unless the Owner changes it.

The Owner has frozen visual design after V9.2. Responsive/Performance V10 may correct responsive defects, navigation access, touch ergonomics, rendering cost, asset delivery and measurable performance regressions only. It must not alter V9.2 art direction, visual hierarchy, palette, cinematic composition or service/content positioning.

## Validation
Each stage requires relevant technical validation, changed-path review, semantic/public-truth checks and a formal PASS/FAIL/BLOCKER verdict.
Completion of a stage does not automatically authorize deployment or merge.