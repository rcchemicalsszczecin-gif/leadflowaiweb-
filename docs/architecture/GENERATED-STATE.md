# Generated-state contract

This document owns the generated paths used by the static LeadFlowAI frontend. `npm run generated:contract` is the machine check; the Quality workflow additionally proves that full verification leaves tracked state unchanged.

| Path | Source owner | Generation command | Tracking class | Expected byte stability | Consumer / validator |
|---|---|---|---|---|---|
| `next-env.d.ts` | Next.js `16.3.1` | `next typegen` / `next build` | tracked build-mode canonical | exact after typegen/build on pinned Node | TypeScript/Next; `generated:contract`; clean-build Git diff |
| `.next/` | Next.js | `next typegen`, `next dev`, `next build` | ignored compiler output | not retained | Next/TypeScript; ignore and clean-status checks |
| `out/` | Next.js static exporter | `npm run build` | ignored release artifact | deterministic contract, not Git identity | static/export/route contracts; Pages artifact upload |
| `public/v14-legacy-routes.css` | six tracked V2–V6 CSS sources | `npm run legacy-routes:css` | ignored, regenerated build input | deterministic for exact sources | migrated route export; responsive/CSS de-stack contracts |
| `*.tsbuildinfo` | TypeScript | `npm run typecheck` / `next build` | ignored cache | disposable | TypeScript; ignore and clean-status checks |

The tracked `next-env.d.ts` form is the exact production build/typegen form produced by the pinned framework. Next development mode may point at `.next/dev`; that transient development form is not an admissible commit state. Running `npm run generated:contract` and the canonical build returns and verifies the build-mode form.

`node_modules/` is lockfile-installed dependency state, not repository source. The historical ignored `build/` path has no current producer or consumer and is not classified as a release artifact.
