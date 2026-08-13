# LEADFLOWAI DESIGN DIRECTION V2 — OBSIDIAN PRECISION WATER

STATUS: OWNER APPROVED
DATE: 2026-08-13
SUPERSEDES: `LEADFLOWAI-DESIGN-DIRECTION-V1.md` where visual-direction statements conflict

## Owner visual decision
The current production hero is the visual reference for the whole website.

The entire LeadFlowAI public site must use one coherent dark technical environment rather than alternating light and dark sections.

Core direction:
- obsidian / near-black surfaces across all public routes;
- strict precision grid and technical blueprint language;
- restrained signal-green accents;
- translucent technical panels, lines, nodes and system indicators;
- editorial typography retained, but headline scale reduced from the first production version;
- motion should make the interface feel like an active engineered system, not a static agency template.

## Signature water interaction
A global interactive water-surface layer is part of the visual identity.

Pointer behavior:
- cursor movement produces subtle low-amplitude ripples, like lightly brushing a water surface;
- pointer/click produces a stronger multi-wave impulse, like a small stone entering water;
- the effect is decorative and must never block clicks, links, text selection or navigation;
- ripple population and device-pixel ratio are bounded for predictable performance;
- touch receives the click/tap impulse without requiring continuous touch-move animation;
- `prefers-reduced-motion` disables the animated water layer and non-essential ambient motion.

The effect should read as a thin transparent liquid/refraction layer over the interface. It must not become a game effect, particle toy or neon cyberpunk visual.

## Ambient technical motion
The dark environment may include a restrained global ambient layer:
- moving blueprint grid;
- slow scan line;
- sparse orbit geometry;
- small signal nodes;
- local panel sweeps on hover;
- existing LeadFlowAI system-flow node animation.

Motion density remains deliberately low so that content hierarchy stays dominant.

## Typography
The original hero proved the correct direction but the first production headline scale was too dominant.

Desktop target:
- primary display type reduced to roughly `clamp(3.4rem, 6.35vw, 6.8rem)`;
- major section headings reduced to roughly `clamp(2.05rem, 3.9vw, 4.2rem)`;
- service/contact/knowledge heroes use similarly reduced responsive scales;
- mobile remains bold but must avoid headline overflow and excessive scroll occupation.

## Surfaces and contrast
There are no general-purpose light content sections in V2.

Former light sections are reinterpreted as:
- obsidian background;
- subtle tonal separation through `#080b0f` / `#0d1219`-class surfaces;
- white/soft-white typography;
- translucent white borders;
- limited signal-green state accents.

Cards/panels should feel like transparent instruments placed over the same system environment, not independent white cards.

## Route-wide requirement
The V2 language applies to:
- homepage;
- all money/service pages;
- SEO/AEO/GEO pages;
- knowledge index and articles;
- realizacje / portfolio;
- contact page;
- headers, footer, FAQ, process, related-service and CTA sections.

## Invariants
V2 does not change public-truth, SEO/AEO/GEO, accessibility or product architecture decisions.

Must remain true:
- public chatbot on LeadFlowAI remains disabled until explicitly enabled by Owner;
- chatbot remains part of the commercial offer;
- online lead delivery remains disabled until explicitly configured;
- direct `kontakt@leadflowai.pl` contact remains the active route;
- no fake portfolio, testimonials, metrics or legal identifiers;
- static GitHub Pages architecture remains intact.

## Performance and accessibility
- the water layer is Canvas 2D, transparent and pointer-events disabled;
- DPR is capped;
- concurrent ripples are capped;
- animation uses `requestAnimationFrame`;
- reduced-motion disables non-essential animation;
- the interface remains fully understandable with the effect removed;
- no visual effect may delay or gate navigation, content or CTA interaction.
