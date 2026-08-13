# LeadFlowAI Premium Art Direction V9

STATUS: OWNER-REQUESTED IMPLEMENTATION CANDIDATE
DATE: 2026-08-13

## Objective
Move LeadFlowAI from a polished technical/dashboard aesthetic to a high-end digital experience studio aesthetic without discarding the proven Realistic Hardware Water V5 engine, the public Live Lab, or the underlying search/content architecture.

## Stage split

### V9A — Art Direction
- editorial hero with one dominant live visual;
- characteristic display/body typography hierarchy;
- materially fewer closed rectangles/frames on the homepage;
- restrained use of signal green;
- three material roles: glass, graphite, luminous;
- reduced technical microcopy/status density.

### V9B — Cinematic Composition
- cinematic 01–06 stage journey instead of repeated dashboard cards;
- stronger asymmetry and overlap;
- full-height visual moments;
- `What We Build` large-type capability scene;
- stage-to-stage bridge continuity;
- art-directed use of the real hardware photograph.

### V9C — Interaction Signature
- scroll-driven story with one scene transitioning through system states;
- context cursor only over intentional interactive areas;
- magnetic primary actions;
- foreground/background depth and restrained pointer parallax;
- slow ambient light instead of more widgets;
- `LeadFlow Liquid Circuit` as a first-party signature experience combining water/hardware/data language.

### V9D — Proof + Polish
- first-party proof section using real LeadFlowAI demos only;
- concept before/after retained but explicitly not represented as client work;
- premium restyling for process, quality, command center, FAQ and final CTA;
- mobile simplification;
- reduced-motion fallbacks;
- no new global WebGL context or heavyweight 3D dependency.

## Visual principles
1. Premium confidence comes from hierarchy and restraint, not maximum decoration.
2. Not every content group needs a frame.
3. Large editorial type and cinematic visual space outrank micro-status UI.
4. Green is an active signal; cyan/graphite/white form the base visual language.
5. Interactions should have a clear role: MOVE, VIEW, EXPLORE, FOLLOW, INSPECT, CONNECT, MONITOR, SLIDE, TOUCH, START, MAIL.
6. The real motherboard photograph remains background truth; local section crops may reuse the same cached source for art direction.
7. Motion is slow and bounded. `prefers-reduced-motion` removes continuous decorative motion.
8. Live demonstrations are first-party demos and must never be presented as customer case studies.

## V9 coverage of the 20 requested improvements
- premium editorial hero: implemented;
- brand typography system: implemented;
- ~50% fewer homepage frame containers: implemented by replacing V8 stage cards and framed intro with open composition;
- full-screen wow moments: What We Build, Scroll Story, Liquid Circuit, Proof;
- restrained green: implemented;
- stronger asymmetry: implemented in stage journey and capability scene;
- cinematic 01–06 visuals: implemented;
- art-directed photographic crops: implemented with the same cached Unsplash hardware source;
- multi-depth composition/parallax: implemented in hero and stage layers;
- stage transitions: implemented;
- scroll storytelling: implemented;
- context cursor: implemented only on `data-cursor` surfaces;
- magnetic CTA: implemented;
- large `What We Build`: implemented;
- proof section: implemented using first-party demos;
- stronger scale hierarchy: implemented;
- reduced technical microcopy: implemented;
- material system: implemented;
- slow animated light: implemented;
- signature experience: `LeadFlow Liquid Circuit` implemented.

## Performance constraints
- Preserve V5 water limits: `MAX_RIPPLES = 8`, ~45 FPS cap, bounded DPR.
- No new global WebGL renderer.
- No Three.js or equivalent dependency for decorative homepage effects.
- No scroll event loop. Scroll states use IntersectionObserver/sticky layout.
- Pointer work is restricted to intentional interactive surfaces/global lightweight cursor state.
- Mobile removes ambient pointer light and custom cursor.

## Supersession
V9 supersedes V8 for homepage art direction, composition, typography hierarchy and stage presentation.
V8 remains a recovery checkpoint.
V7 remains authoritative for the dedicated Live Lab and interactive-service routes.
V6 remains a fallback frame grammar outside V9 overrides.
V5 remains authoritative for the realistic hardware background and water rendering engine.
