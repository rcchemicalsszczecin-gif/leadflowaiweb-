# SOURCE OF TRUTH POLICY

STATUS: NORMATIVE

Authority is determined by role, not file age or verbosity.

## Authority map

- Governance and execution authority: root `AGENTS.md` + current files under `docs/governance/`.
- Current repository/release/work-state checkpoint: `docs/governance/CURRENT-STATE.md`.
- Current Owner decisions: `docs/governance/WEBSITE-OWNER-DECISIONS.md` plus any later explicit Owner decision record.
- Product plan: `docs/plans/LEADFLOWAI_AUTHORITATIVE_MASTER_PLAN_V1.md`, interpreted through current Owner decisions and `CURRENT-STATE.md`.
- Homepage design authority: `docs/design/LEADFLOWAI-PREMIUM-CALIBRATION-V9-2.md` over the bounded V9.2 calibration scope, with `docs/design/LEADFLOWAI-PREMIUM-ART-DIRECTION-V9.md` as the underlying premium art-direction language.
- Preserved design layers: V7 for the dedicated Live Lab and interactive service routes, V6 as fallback frame grammar outside premium overrides, and V5 for the realistic hardware background/bounded water renderer, as constrained by `AGENTS.md` and current Owner decisions.
- Architecture: current architecture files that do not conflict with higher authority or `CURRENT-STATE.md`.
- Implementation truth: current committed source plus validation evidence for the exact revision/merge ref being evaluated.
- Public business truth: current Owner-approved legal/business facts and evidence-backed public claims.

## Historical evidence rule

Older plans, stage reports, validation records, architecture documents and superseded design decisions remain historical evidence. A historical file may accurately describe the state that existed when it was written, but it must not be treated as current operational status when `CURRENT-STATE.md`, a later Owner decision or higher authority records a newer state.

In particular, `docs/design/LEADFLOWAI-DESIGN-DIRECTION-V1.md` is the original approved design foundation/history, not the current homepage visual authority.

## Conflict rule

On conflict:

1. STOP the conflicting interpretation.
2. Classify each source by the authority chain in `AGENTS.md`.
3. Prefer the higher-authority/current source.
4. Reconcile documentation in a bounded governance stage when necessary.
5. Never allow conversation memory/history to silently override current repository authority.
