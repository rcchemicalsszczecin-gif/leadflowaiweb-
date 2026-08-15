# LEADFLOWAI — MONITORING BASELINE

STATUS: PRODUCTION V14 BASELINE — VISUAL/RUNTIME AUTHORITY; CURRENT MONITORED DEPLOYMENT IDENTITY IS DEFINED BELOW
DATE: 2026-08-15

## Principles

Monitoring and release verification must detect user-impacting failures without collecting unnecessary personal data. The public site is a static GitHub Pages frontend; future API/AI services, if separately authorized, remain independent failure domains.

## Current production identity

```text
CURRENT_PRODUCTION_BRANCH=main
CURRENT_PRODUCTION_REPOSITORY_HEAD=67663b08c950de120a94ef8495b5cdc8c9bdecfe
CURRENT_VISUAL_RUNTIME_AUTHORITY=V14_GLOBAL_LIQUID_WORLD
LATEST_SUCCESSFUL_PAGES_RUN_ID=31810716199
LATEST_DEPLOYED_HEAD_SHA=67663b08c950de120a94ef8495b5cdc8c9bdecfe
CURRENT_IMMEDIATE_ROLLBACK_TARGET=NOT_PROVEN
```

- current visual/runtime authority: V14 Global Liquid World;
- domain: `https://leadflowai.pl/`;
- latest run status/conclusion: `completed` / `success`.

The Pages checkpoint is `CONTROLLER_VERIFIED_EXTERNAL_EVIDENCE`, last reconciled on `2026-08-15`. Current service evidence reports status `built`, source branch `main`, source path `/`, build type `workflow`, CNAME `leadflowai.pl`, approved HTTPS certificate and HTTPS enforcement `true`. Provider state requires current external revalidation at future release/incident checkpoints.

Historical monitoring/recovery evidence includes Global Liquid milestone `36ad3fd6130ce21e68a2c5e701a516fcb3703b65`, accepted candidate `50b71632c687e032311556371108ce3f8d989650`, milestone run `31809931666`, pre-Global-Liquid predecessor `5bba6a6c963fa61ea3920bb4fcefff65ff9376cc`, initial V14 merge/candidate/run `39c9b304eff42a71ea36aee871dce569d8f374f0` / `242263ffe1593d1a80890b7f6bc1514316ed2656` / `31800348526`, and older V13 reference `10627e2f18ccfc7ef86c76a695dab9cf7933cce9`. They are not the monitored current deployment identity.

## Required production checks

### Static frontend availability
- `/`;
- `/uslugi/`;
- `/strony-internetowe/`;
- `/kontakt/`;
- `/realizacje/`;
- `/o-nas/`;
- `/wiedza/`;
- representative article;
- `/lab/`;
- `/sitemap.xml`;
- `/robots.txt`.

### Functional static checks
- direct e-mail contact remains `kontakt@leadflowai.pl`;
- no public lead submit endpoint while lead delivery is OFF;
- public chatbot remains unmounted while chatbot UI is OFF;
- mobile navigation remains available when desktop navigation is hidden;
- `/#process` resolves to an actual process anchor;
- static frontend remains usable without WebGL/motion.

### Search health
- robots remains crawlable as intended;
- sitemap and canonical set remain aligned;
- canonical domain remains `https://leadflowai.pl`;
- 63 dominant intent URLs remain represented;
- 21 knowledge articles remain generated;
- structured data matches visible facts;
- no fabricated evidence or fake dates are introduced.

### Build/deployment health
Track:
- Quality workflow failures;
- GitHub Pages build/deploy failures;
- browser-matrix regressions when release work resumes;
- visual preview regressions when visual work resumes.

## Performance surfaces

Maintain aggregate and route-level regression budgets for homepage, representative service, knowledge hub/article, contact and Lab. Track JS/CSS payload, route HTML, Core Web Vitals lab indicators where available, mobile overflow/touch/navigation, reduced-motion behavior and cross-browser visual/functional regressions.

Build budgets are regression gates, not claims about field performance.

## Alert classes

P1 — public static site unavailable.
P1 — widespread release/deployment failure.
P2 — contact route/public e-mail identity broken.
P2 — widespread navigation/mobile shell regression.
P2 — sitemap/robots/canonical/public-truth regression.
P3 — isolated visual/motion degradation with usable core content.
P3 — optional Liquid/WebGL unavailable while fallback remains correct.

## Analytics / real-user measurement

Analytics, consent and field-conversion measurement remain a separately authorized privacy/runtime stage. Search Console/Bing/other webmaster data becomes V15 evidence only when actually connected and captured.
