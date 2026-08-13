# LeadFlowAI Responsive + Performance V10

STATUS: CANDIDATE / NOT PRODUCTION
OWNER AUTHORITY: current Owner instruction to freeze design and continue with responsive/mobile QA followed by performance/Core Web Vitals work.
BASELINE PRODUCTION COMMIT: `35415996c7f2978e728bf96334443c1b56712579` (V9.2)

## Scope

This stage is technical QA only. V9.2 visual art direction is frozen.

Allowed:
- responsive overflow/clipping fixes;
- mobile navigation access;
- touch-target and safe-area corrections;
- portrait/landscape viewport corrections;
- reduced-motion behavior;
- renderer scheduling and compact-device scaling;
- responsive image delivery using the same approved hardware source;
- build-size regression budgets and CI evidence.

Forbidden:
- visual redesign;
- new visual language, palette or typography direction;
- new service/content positioning;
- new heavyweight 3D/WebGL dependency;
- fabricated performance or business metrics;
- production merge/deploy without current Owner authorization.

## Stage 1 — Responsive / Mobile QA

Implementation requirements:
- preserve desktop V9.2 composition;
- provide full mobile navigation instead of hiding primary navigation without replacement;
- minimum 44 px touch targets for key mobile controls;
- account for iOS safe-area insets;
- prevent accidental horizontal overflow;
- maintain readable contact/email controls on narrow screens;
- explicit compact-phone and mobile-landscape handling;
- disable pointer-only hover behavior on coarse pointers;
- preserve reduced-motion behavior.

## Stage 2 — Performance / CWV foundation

Runtime requirements:
- desktop water remains bounded to 45 FPS and DPR <= 1.15;
- compact/coarse devices use 30 FPS, DPR <= 1 and at most five active ripples;
- hidden documents stop the water RAF completely and resume safely when visible;
- reduced-motion does not allocate a WebGL context;
- global pointermove is installed only for fine pointers;
- no global scroll event loop is introduced;
- compact viewports receive smaller variants of the same approved Unsplash hardware image;
- isolated mobile header blur is disabled on compact screens.

## Production V9.2 size baseline

Measured from GitHub Pages artifact for run `31692998853`:
- JavaScript raw: 687,789 bytes;
- JavaScript gzip: 202,958 bytes;
- CSS raw: 165,143 bytes;
- CSS gzip: 32,542 bytes;
- homepage HTML raw: 61,187 bytes;
- homepage HTML gzip: 13,471 bytes;
- total static artifact payload on disk: 3,684,080 bytes;
- largest JS chunk raw: 227,538 bytes.

These are build-artifact measurements, not field Core Web Vitals and not claims about user-perceived load time.

## Regression budgets

Candidate build must remain within:
- JavaScript raw <= 725,000 bytes;
- JavaScript gzip <= 220,000 bytes;
- CSS raw <= 195,000 bytes;
- CSS gzip <= 40,000 bytes;
- homepage HTML raw <= 70,000 bytes;
- homepage HTML gzip <= 16,000 bytes;
- largest JS chunk raw <= 240,000 bytes;
- complete static output <= 4,250,000 bytes.

Budgets are regression gates, not optimization targets or public performance claims.

## Validation

Required before PR readiness:
- existing search/lead/chat/content/operations/static/design contracts PASS;
- Responsive/Performance V10 source contract PASS;
- TypeScript PASS;
- Biome PASS;
- static Next.js build PASS;
- performance budget PASS after build;
- GitHub Pages artifact contract PASS;
- route smoke PASS;
- changed-path review confirms no unauthorized design/content expansion.

## Exit condition

PASS means a mergeable PR may be prepared. It does not authorize mutation of `main` or production deployment.