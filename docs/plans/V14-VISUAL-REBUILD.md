# LEADFLOWAI — V14 UNIFIED VISUAL + REPAIR EXECUTION MASTER PLAN

STATUS: ACTIVE EXECUTION PLAN / CURRENT V14 DELIVERY AUTHORITY
OWNER: Paweł Niewiadomski
LEGAL ENTITY: Tervyxa Systems sp. z o.o.
PUBLIC BRAND: LeadFlowAI
PRIMARY DOMAIN: leadflowai.pl
BASELINE: production V13 on `main`
WORK BRANCH: `v14/full-visual-rebuild`

## 1. Purpose

V14 is the full visual and implementation-system rebuild of LeadFlowAI after the production V13 Polish Production Rebuild.

V13 remains the content/search/public-truth foundation. V14 must not discard the work already completed for:
- Polish public language;
- 35 public service/money pages;
- 21 knowledge articles;
- 63 dominant search intents;
- SEO/AEO/GEO / AI Search architecture;
- metadata, canonical, sitemap and robots;
- structured data and entity/public-truth boundaries;
- real-only portfolio;
- decision guidance, direct answers and useful FAQ content;
- direct e-mail contact;
- disabled public chatbot and disabled online lead delivery boundaries.

V14 rebuilds the presentation system, shell, visuals, motion, responsive behavior, route templates, CSS/runtime architecture and visual proof so that LeadFlowAI itself demonstrates the standard of web production it sells.

## 2. Non-negotiable invariants

1. `main` stays the production baseline until explicit Owner authorization for merge.
2. No fabricated clients, testimonials, KPI, rankings, AI citations, certifications, research or results.
3. Existing public URLs stay stable unless a separately justified redirect/migration stage proves a change is necessary.
4. Search intent ownership for the 63 public URLs remains stable through V14.
5. Visible public facts, metadata and structured data must remain consistent.
6. Public LeadFlowAI chatbot remains OFF.
7. Online lead form delivery remains OFF.
8. Direct e-mail through `kontakt@leadflowai.pl` remains ACTIVE.
9. Analytics/consent activation is out of scope without a separate Owner decision.
10. No heavy third-party 3D dependency merely for decoration.
11. Motion must have narrative value and respect `prefers-reduced-motion`.
12. Mobile receives its own art direction and interaction model.
13. Accessibility, performance and security gates are release blockers, not post-release suggestions.
14. Liquid/WebGL remains a LeadFlowAI signature but must be selective, bounded and non-blocking.
15. Historical V1–V13 design files remain evidence; they do not override current V14 Owner authority.

## 3. Audit baseline

The V14 recovery audit covered the complete tracked repository inventory: 231/231 tracked files.

Major audit findings:
- homepage V14 is a real component cutover, but the rest of the site still uses the V13/V9-era shell;
- V14.8 route migration was not started;
- V14.9 mobile/performance/accessibility acceptance is incomplete;
- V14.10 Owner visual acceptance is blocked by the broken screenshot workflow;
- mobile V14 homepage navigation disappears below the desktop breakpoint;
- `/#process` points to a missing V14 anchor;
- the active accessibility contract validates the legacy header rather than the V14 header;
- root layout still mounts WaterSurface globally;
- CSS is a historical override stack from V2 through V13 plus V14;
- aggregate CSS is at the historical V10 budget ceiling, leaving effectively no safe expansion headroom;
- old V10/operations contracts still enforce superseded pre-V14/pre-production assumptions;
- several files labelled CURRENT/ACTIVE still describe old V9.2 or pre-production state;
- Dependabot alerts are disabled and the standard install path uses `--no-audit`;
- six V14 CSS compatibility stubs contain no functional CSS;
- current V14 preview workflow can hang during sequential headless Chrome screenshot capture.

## 4. Delivery model

V14 is executed in bounded repair/build stages. Each stage requires:
- objective;
- exact bounded write domain;
- before-state identity;
- recovery point;
- implementation;
- relevant validation;
- changed-path review;
- explicit PASS / FAIL / BLOCKER verdict.

A later stage does not retroactively prove an earlier one.

---

# R0 — SOURCE OF TRUTH + GOVERNANCE REPAIR

## Objective
Make repository authority describe the real current state before more code is layered onto it.

## Required work
- update root `AGENTS.md` so V14 Owner authority supersedes V9/V9.2 visual freeze for current work;
- update `docs/governance/CURRENT-STATE.md` to production V13 + active V14 branch reality;
- synchronize `docs/governance/WEBSITE-OWNER-DECISIONS.md` with the later V14 Owner decision;
- update the Master Plan current sequence without deleting historical stages;
- mark old architecture/operations/status records as historical where they are no longer current;
- remove claims that production is not authorized where production V13 is already live;
- make historical V1–V13 design and release evidence explicitly historical rather than implicitly current;
- retain active V13 truth sources: public glossary, evidence boundaries, search-intent map and V13 final acceptance evidence.

## Contracts to repair
- operations contract must validate current production reality rather than require `NOT AUTHORIZED`;
- responsive/performance contract must stop requiring V9.2 freeze/Unsplash as current invariants;
- accessibility contract must cover V14 shell;
- current npm script aliases must use current V14 naming while historical scripts remain callable as historical evidence.

## Exit
No active/current/normative file may materially contradict V14 Owner authority or V13 production reality.

---

# R1 — P0 V14 UX / ACCESSIBILITY REPAIR

## Objective
Fix current user-facing regressions before visual expansion.

## Required work
1. Add a complete V14 mobile navigation at the breakpoint where desktop V14 nav disappears.
2. Preserve semantic `<nav>` labelling and keyboard operation.
3. Add visible 44px+ touch targets for mobile primary controls.
4. Add `id="process"` to the current process section or update the central navigation target consistently.
5. Add a skip-to-content path and stable main-content target.
6. Verify focus-visible for V14 buttons, nav, cards and interactive controls.
7. Add V14 reduced-motion behavior for device theater, constructor, spatial transforms, hover lifts and continuous decorative motion.
8. Remove pointer-only behavior from coarse-pointer contexts.
9. Add `aria-pressed`/equivalent selected-state semantics to the frontend-only brief builder.
10. Keep public functionality available when animation is disabled.

## Exit
V14 homepage is fully navigable at 360/390/768 and by keyboard with reduced motion enabled.

---

# R2 — CSS + RUNTIME DE-STACK

## Objective
End the V2→V13 global override stack before finishing V14.

## Required work
### CSS ownership
- define one V14 token/base/shell system;
- extract only still-required generic rules from `globals.css`, service/contact/knowledge styles and historical responsive layers;
- make `/lab` interactive CSS route-specific instead of global where technically possible;
- make service, knowledge and contact styles scoped by active route/template role;
- remove global dependence on V8/V9/V9.2 homepage layers after V14 shared shell migration;
- remove superseded V2/V3/V4/V5 global visual overrides when no active route references their selectors;
- retire V13 hero visual CSS after all active references are removed;
- move V14 component styling out of large inline style blocks into maintainable CSS/component modules;
- remove six empty V14 CSS compatibility-stub requests together with their references;
- reduce specificity debt rather than masking it with another override layer.

### Runtime ownership
- stop mounting the full WaterSurface environment globally by default;
- preserve the good renderer constraints: bounded DPR, bounded ripples, compact FPS, hidden-tab stop, cleanup and reduced-motion no-context behavior;
- mount Liquid/Water only in deliberate V14 signature scenes or explicitly approved routes;
- avoid a second global WebGL context;
- keep core navigation/content/CTA independent from WebGL availability.

## Performance target
Create meaningful headroom before adding the remaining V14 content. Historical aggregate budgets remain safety ceilings, not optimization targets.

## Exit
- no obsolete global V2–V9 visual dependency is needed by V14 homepage;
- active route CSS ownership is explainable;
- CSS raw/gzip has material headroom below the historical ceiling;
- V14 no longer relies on masking the old global motherboard background.

---

# V14.1 — HERO / PRODUCT PROOF

## Objective
Make the first viewport prove professional WWW production immediately.

## Required result
- buyer-first Polish positioning;
- real browser/product mockup rather than abstract decoration;
- mobile-device handoff;
- clear WWW / SEARCH / AI states;
- two primary paths: project valuation/contact and evidence/portfolio;
- responsive spatial depth without blocking LCP;
- optional pointer light only for fine pointers;
- reduced-motion static composition;
- no giant decorative heading replacing information.

## Acceptance
Hero remains clear with CSS motion disabled and at 360px width.

---

# V14.2 — SERVICES AS PRODUCTS

## Objective
Present the full offer through six understandable product groups rather than a technology catalogue.

## Required groups
- CREATE / WWW + products;
- DISCOVER / SEO + AEO + GEO;
- CONVERT / CRO + measurement;
- INTELLIGENCE / AI + RAG + agents;
- CONNECT / API + automation;
- CARE / quality + hosting + maintenance.

## Required improvements
- each card gets a meaningfully different visual language;
- each card states the buyer problem/outcome first;
- examples remain truthful and non-guaranteed;
- each group links into the existing service graph;
- cards remain keyboard and touch usable;
- no visual duplication that makes all six groups look like one template.

---

# V14.3 — PORTFOLIO / DEVICE THEATER

## Objective
Use real first-party projects as evidence and demonstrate responsive product thinking.

## Required projects
- LeadFlowAI;
- Tervyxa;
- TranskrypcjaAI.

## Required result
- desktop/tablet/mobile choreography;
- explicit first-party/own-project disclosure;
- no fake customer screenshots;
- visible project role/status/scope;
- path to the full `/realizacje` evidence page;
- static fallback remains understandable.

---

# V14.4 — LIQUID WEB CONSTRUCTOR

## Objective
Create one recognizable LeadFlowAI signature experience with real narrative meaning.

## Sequence
LIQUID → GRID → BROWSER → UI → SEARCH/ENTITY → AI/SYSTEM.

## Required constraints
- selective WebGL only;
- DOM/CSS/SVG for information-bearing layers;
- no heavy 3D library;
- no global scroll event loop;
- reduced-motion complete fallback;
- GPU effect never carries essential information;
- renderer starts/stops according to visibility and route ownership.

---

# V14.5 — SEARCH / AI VISUAL ARCHITECTURE

## Objective
Explain how the same public truth is interpreted by a human, classical search and generative/AI systems.

## Required result
- Human / Google / AI comparison;
- visible entity relationship model;
- search-result/answer transformation example;
- canonical/internal-link/schema/source relationship cues;
- explicit non-guarantee language for AI exposure/citation;
- link to relevant SEO/AEO/GEO services and knowledge;
- information remains grounded in the existing V13 search architecture.

---

# V14.6 — PROCESS / QUALITY / TRUST

## Objective
Turn implementation methodology into concrete evidence rather than generic agency claims.

## Required result
- five-step project process;
- sticky/structured project canvas where appropriate;
- accessibility, performance, responsive, security and search validation proof;
- real CI/evidence language without pretending lab checks are field metrics;
- methodology/about/trust connection;
- link to `/o-nas` and relevant knowledge;
- no invented certification badges.

---

# V14.7 — KNOWLEDGE / FAQ / CONTACT / CLOSING

## Objective
Complete the homepage information and conversion architecture that was reduced during the visual cutover.

## Required result
- editorial knowledge cards from real knowledge registry topics;
- useful homepage FAQ restored where it answers buyer objections;
- frontend-only brief builder integrated into V14 visual language;
- direct e-mail path remains authoritative;
- no submit UI implying an active lead backend;
- final CTA scene;
- V14 footer with brand/legal relationship, service/navigation links and contact;
- Liquid signature used with restraint in the closing scene;
- correct `/process` anchor and global navigation consistency.

---

# V14.8 — FULL ROUTE MIGRATION

## Objective
Move the entire public site into one V14 shell without changing search ownership or public truth.

## Shared system first
Before changing 35 routes individually:
- create shared V14 Header;
- shared V14 Footer;
- shared section/layout primitives;
- shared service renderer primitives;
- shared knowledge/article primitives;
- group-specific visual templates.

## 35 service/money pages
Preserve:
- URL;
- metadata;
- canonical;
- structured data;
- visible FAQ;
- direct answer;
- decision guidance;
- related-service links;
- service-to-knowledge links;
- evidence/public-truth boundaries.

Use differentiated templates by service family rather than one visual template copied 35 times.

## Other primary routes
Migrate:
- `/uslugi`;
- `/realizacje`;
- `/o-nas`;
- `/kontakt`;
- `/wiedza`;
- `/wiedza/[slug]`;
- `/lab`.

`/lab` keeps its valuable interactive functionality but receives the common V14 shell and updated visual integration.

---

# V14.9 — MOBILE / PERFORMANCE / ACCESSIBILITY / SECURITY QA

## Required viewport matrix
- 360;
- 390;
- 768;
- 1366;
- 1440;
- 1920.

## Browser matrix
At minimum:
- Chromium/Chrome;
- Firefox.

## Accessibility
- keyboard-only traversal;
- visible focus;
- semantic landmarks/headings;
- nav labels;
- touch targets;
- reduced motion;
- coarse pointer;
- alt/aria discipline;
- form/brief state semantics;
- no content loss without animation/WebGL.

## Performance
Keep aggregate safety budgets but add route-level budgets for at least:
- homepage;
- representative service page;
- knowledge index;
- article;
- `/lab`.

Measure route-relevant CSS/JS rather than treating the total exported repository payload as the only performance signal.

## Security/dependency hygiene
- secret scan/current public token-name checks;
- dependency vulnerability review using an authorized method;
- Dependabot/security alert posture reviewed;
- no public secret or API credential;
- no accidental `/api/**` static-public claim;
- static contact/chat boundaries remain enforced.

## Search/public truth
- all 63 dominant-intent URLs checked;
- all 21 articles generated;
- sitemap/robots/canonical validated;
- structured data matches visible content;
- no fake freshness/date publication;
- no placeholder/developer-demo public residue.

---

# V14.9A — PREVIEW PIPELINE

## Objective
Generate reliable visual evidence for Owner review.

## Required fix
Replace the hanging sequential Chrome screenshot pattern with isolated, bounded screenshot executions.

## Required preview set
- desktop above-fold;
- desktop full-page/long;
- 390 mobile above-fold;
- 390 mobile long/full;
- tablet representative view;
- optional Firefox rendering evidence if automated capture is practical.

Each capture process must have its own timeout/cleanup and must not prevent artifact upload if another bounded capture fails with useful diagnostics.

---

# V14.10 — OWNER VISUAL ACCEPTANCE

## Rule
No merge to `main` before explicit Owner visual approval of a real preview/deployment.

## Review sequence
1. hero/header;
2. services;
3. device/portfolio proof;
4. Liquid Constructor;
5. Search/AI scene;
6. process/quality/trust;
7. knowledge/FAQ;
8. contact/closing/footer;
9. representative service page;
10. knowledge/article page;
11. mobile full-page experience.

If any critical section is visually weak or functionally inconsistent, V14 remains on the feature branch for calibration.

---

# R9 — RELEASE HARDENING + MERGE

After Owner Visual PASS only:
- final branch identity check;
- full Quality PASS on exact release SHA;
- final changed-path inventory;
- PR moved from Draft to Ready;
- Owner merge authorization;
- merge to `main`;
- GitHub Pages deployment;
- deployment evidence;
- production smoke;
- update `CURRENT-STATE.md` to exact production revision;
- mark V14 plan complete/historical as appropriate;
- close superseded V13/V14 tracking residue.

Branch protection / required Quality checks should be enabled as a separate repository-settings hardening action when explicitly authorized.

---

# R10 — POST-V14 V15 SEARCH MASTER PLAN

V15 begins only after V14 production stabilizes.

V15 scope may include:
- Google Search Console evidence;
- Bing Webmaster evidence;
- crawl/index coverage;
- real branded/non-branded/local queries;
- content/search gaps;
- AI Search source-readiness;
- additional original evidence;
- first-party research only after a real auditable dataset exists;
- field Core Web Vitals and real conversion measurement only after the relevant analytics/privacy authority exists.

V15 must not fabricate data to fill missing measurement.

---

# 5. Cleanup ledger carried from the full repository audit

## Governance/status cleanup
- stale V9.2 current-authority language;
- stale V11/V12 production status;
- stale pre-production operations records;
- historical chat architecture described as active;
- historical active-stage labels that should be historical snapshots.

## Code cleanup after dependency proof
- old Premium V8/V9/V9.2 TSX components with no active public render path;
- obsolete global CSS layers after route migration;
- duplicate/compatibility V14 CSS stub references;
- obsolete V10 runtime photo-selection rules;
- historical package script aliases that obscure current V14 behavior.

Historical design/governance evidence is retained as history unless deletion is separately justified; active runtime dead code may be removed after reference and regression proof.

## Platform/repository hardening backlog
- `main` branch protection;
- required Quality check;
- review exact Node runtime pinning;
- dependency security alerts/audit;
- custom branded 404;
- favicon/site icons/apple-touch icon;
- final wordmark/logo when Owner supplies/approves it.

---

# 6. Definition of V14 DONE

V14 is DONE only when all of the following are true:

1. Source-of-truth files agree on production V13 and V14 authority.
2. Homepage V14 has complete mobile navigation, anchors, accessibility and reduced-motion behavior.
3. Legacy CSS/runtime stack has been materially consolidated rather than hidden under another override.
4. Liquid/WebGL is selectively mounted and bounded.
5. Homepage phases V14.1–V14.7 are genuinely complete, including knowledge, FAQ, contact and closing.
6. All 35 service/money pages use the V14 shell/templates while preserving V13 search/content truth.
7. Primary non-service routes use the V14 shell.
8. 63 intent URLs and 21 articles remain generated and semantically correct.
9. Route-level and aggregate performance gates pass with useful headroom.
10. Accessibility, mobile, Firefox/Chromium, security/dependency and static-export QA pass.
11. Reliable visual preview artifacts exist.
12. Owner has explicitly reviewed and approved the visual result.
13. Exact release SHA passes final Quality.
14. Owner explicitly authorizes merge.
15. Production deployment and post-deploy evidence pass.

Until all 15 conditions are met, V14 must not be reported as complete.
