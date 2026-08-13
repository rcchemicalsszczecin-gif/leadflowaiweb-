# LeadFlowAI — Premium Calibration V9.2

STATUS: OWNER-REQUESTED IMPLEMENTATION CANDIDATE
SCOPE: homepage visual calibration and cinematic experience only
BASELINE: Premium Art Direction V9

## Objective
V9.2 keeps the V9 design language but removes the remaining narrow/cropped/template-like feeling visible in production QA. It calibrates the page for 1440, 1600 and 1920-class desktop viewports, strengthens cinematic composition and adds a bounded signature 3D centerpiece without introducing another WebGL context or a heavyweight 3D dependency.

## Stage A — Layout Calibration
1. Wider safe canvas and explicit clipping control.
2. Hero rebalanced toward a 55/45 editorial + visual composition.
3. Vertical dead space reduced across the journey.
4. Body/secondary contrast increased for real-hardware backgrounds.
5. Explicit 1440 / 1600 / 1920 / laptop / tablet / mobile calibration.

## Stage B — Cinematic Composition
6. 01–06 receive materially different compositions rather than alternating copies.
7. Stage visuals receive deeper planes, material, light and spatial layers.
8. Art-directed hardware crop changes by stage and active state.
9. A full dark-void typographic manifest creates a deliberate visual reset.
10. WHAT WE BUILD becomes a full capability scene with large live mode changes.

## Stage C — Interaction & Motion
11. Transition bridges visually connect consecutive 01–06 stages.
12. Four deliberate reveal languages are used: rise, depth, wipe and mask.
13. Sticky progress rail exposes the long-page structure on large desktop screens.
14. Navigation links receive small cinematic hover previews.
15. Magnetic/context interactions remain selective and bounded rather than global decoration.
16. Motion timing is standardized: fast hover, slower entrance, very slow ambient movement.

## Stage D — Signature & Closing
17. A browser-native CSS 3D core becomes the single major cinematic centerpiece.
18. Foreground/background depth planes strengthen spatial hierarchy without new WebGL.
19. Final contact becomes a real closing scene with a restrained signal/orbit system.
20. Reduced-motion and mobile fallbacks remove nonessential depth/motion while preserving content and interaction.

## Non-regression constraints
- V5 water renderer remains unchanged: MAX_RIPPLES=8 and 45 FPS bound.
- V5 realistic hardware source remains unchanged.
- V7 Live Lab and interactive service routes remain available.
- V9 Liquid Circuit and first-party proof remain available.
- No `three`, React Three Fiber, Babylon or other heavyweight 3D dependency.
- No global `scroll` event loop.
- No fabricated clients, metrics, awards or case studies.
- New visual motion must respect `prefers-reduced-motion`.

## Expected visual result
The page should read as a high-end digital experience studio rather than a narrow technical dashboard: broader compositions, fewer accidental crops, stronger live scenes, clearer rhythm, deliberate empty space, better readability and one recognisable cinematic signature.
