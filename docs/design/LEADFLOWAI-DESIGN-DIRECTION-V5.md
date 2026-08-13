# LEADFLOWAI — REALISTIC HARDWARE WATER V5

STATUS: OWNER-APPROVED IMPLEMENTATION CANDIDATE
DATE: 2026-08-13
SUPERSEDES: V4 where background realism, scroll comfort and performance conflict

## Objective
Preserve the successful interactive water surface while replacing the procedural/drawn motherboard with a photoreal hardware background and materially reducing scroll/render cost.

## Visual model
- The motherboard/background is a real hardware photograph rather than procedurally drawn PCB geometry.
- Source photo: Brecht Corbeel / Unsplash, https://unsplash.com/photos/Y2RuzisrEcs, free to use under the Unsplash License.
- The photograph is fixed behind the whole site so the visual environment remains continuous while content scrolls.
- WebGL renders only transparent water highlights/refraction cues and restrained moving cyan/green energy pulses.
- Foreground copy and CTA remain optically stable.
- Large section bands are highly transparent; text itself receives localized dark reading lanes.

## Performance architecture
V4 performed expensive procedural hardware generation in the fragment shader for every pixel and also used many backdrop-filter surfaces. V5 removes those costs.

V5 requirements:
- no procedural motherboard construction in GLSL;
- no scroll-position world-space recomputation for the background;
- maximum eight active ripple impulses;
- water height and gradient calculated in one ripple loop instead of repeated finite-difference samples;
- WebGL canvas DPR capped at 1.15 desktop / 1.0 compact viewports;
- animation capped near 45 FPS;
- transparent WebGL composition over the real photograph;
- most cards use opaque/translucent color surfaces without backdrop-filter;
- only the site header may retain a restrained blur;
- reduced-motion disables the animated canvas.

## Reading comfort
- The motherboard remains visible between content regions.
- Hero copy, service hero copy, article/portfolio hero copy and stage copy use local dark gradient reading lanes.
- Text contrast is increased versus V4.
- Background does not translate with scroll, reducing visual conflict between moving copy and moving scenery.

## Interaction
- Pointer movement keeps the light brush/muskanie water response.
- Click/tap keeps the stronger multi-wave stone impact.
- Energy pulses remain secondary to the photographic hardware and must not turn the background back into an illustrated circuit diagram.

## Acceptance
PASS requires:
1. photoreal hardware source present and attributed in repository documentation;
2. procedural motherboard shader removed;
3. water interaction retained;
4. bounded ripple count and DPR;
5. frame-rate cap present;
6. scroll-driven shader world motion removed;
7. expensive backdrop-filter removed from bulk content cards;
8. localized reading lanes present;
9. static export and route smoke PASS.
