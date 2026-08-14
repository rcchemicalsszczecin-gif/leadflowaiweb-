# LeadFlowAI Responsive + Performance V10

STATUS: HISTORICAL BASELINE — SUPERSEDED AS ACTIVE AUTHORITY BY V14
ORIGINAL BASELINE: Premium Calibration V9.2

> This record preserves the responsive/performance constraints and measurements that were valid for the V9.2/V10 stage. It is not current V14 design authority. Current execution requirements are defined by `AGENTS.md`, `docs/governance/WEBSITE-OWNER-DECISION-V14.md` and `docs/plans/V14-VISUAL-REBUILD.md`.

## Historical purpose

V10 was a technical QA stage over the then-frozen V9.2 design. It introduced useful engineering constraints that remain valuable as historical evidence:
- mobile navigation access;
- 44px-class touch targets;
- safe-area handling;
- overflow/landscape/coarse-pointer safeguards;
- reduced-motion behavior;
- bounded WaterSurface rendering;
- build-size regression budgets.

The historical V9.2 visual freeze and old Unsplash/motherboard asset assumptions are no longer current V14 invariants.

## Historical runtime measurements / budgets

The V10 stage recorded the following safety ceilings:
- JavaScript raw <= 725,000 bytes;
- JavaScript gzip <= 220,000 bytes;
- CSS raw <= 195,000 bytes;
- CSS gzip <= 40,000 bytes;
- homepage HTML raw <= 70,000 bytes;
- homepage HTML gzip <= 16,000 bytes;
- largest JS chunk raw <= 240,000 bytes;
- complete static output <= historical V10 artifact ceiling.

These are regression ceilings from a historical architecture, not optimization targets and not public field-performance claims.

## Reusable runtime constraints

While WaterSurface remains in use, these historical constraints remain useful unless a later validated implementation replaces them:
- bounded ripple population;
- desktop rendering capped near 45 FPS;
- compact/coarse rendering near 30 FPS;
- bounded DPR;
- hidden documents stop the animation loop;
- reduced motion bypasses unnecessary WebGL allocation;
- global pointermove only for fine pointers;
- no global scroll event loop.

## V14 supersession

V14 changes the active design system, mobile shell and CSS/runtime ownership.

V14 additionally requires:
- current V14 mobile navigation;
- V14 reduced-motion coverage;
- CSS/runtime de-stack;
- selective Liquid/Water ownership;
- route-level performance evidence in addition to aggregate budgets;
- Chromium and Firefox representative QA;
- real Owner visual acceptance.

Historical V10 PASS does not prove current V14 responsive/performance state.
