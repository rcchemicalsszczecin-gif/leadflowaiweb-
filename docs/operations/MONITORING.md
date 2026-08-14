# LEADFLOWAI — MONITORING BASELINE

STATUS: PRODUCTION V13 BASELINE / V14 RELEASE REQUIREMENTS
DATE: 2026-08-14

## Principles

Monitoring and release verification must detect user-impacting failures without collecting unnecessary personal data.

The current public site is a static GitHub Pages frontend. Future dynamic API/AI services, if separately authorized, are independent failure domains.

## Required production checks

### Static frontend availability
- `https://leadflowai.pl/`;
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
- no active public lead submit endpoint is exposed while lead delivery is OFF;
- public chatbot remains unmounted while chatbot UI is OFF;
- V14 mobile navigation remains available when desktop navigation is hidden;
- `/#process` resolves to an actual process anchor;
- static frontend remains usable when WebGL/motion is unavailable or reduced.

### Search health
- robots remains crawlable as intended;
- sitemap contains the current public registry;
- canonical domain remains `https://leadflowai.pl`;
- 63 dominant intent URLs remain represented by the production route architecture;
- 21 knowledge articles remain generated;
- structured data matches visible facts;
- no fake publication/update dates or fabricated evidence are introduced.

### Build/deployment health
Track separately:
- Quality workflow failures;
- GitHub Pages build/deploy failures;
- V14 preview workflow failures;
- visual preview artifact generation failures.

## V14 release-performance surfaces

Before V14 merge, record both aggregate and route-level evidence for at least:
- homepage;
- representative service page;
- knowledge index;
- representative article;
- `/lab`.

Track:
- JS/CSS payload and regressions;
- largest route HTML;
- Core Web Vitals lab indicators where available;
- mobile overflow/touch/navigation defects;
- reduced-motion behavior;
- visual regressions on representative Chromium and Firefox runs.

Build budgets are regression gates, not claims about field performance.

## Alert classes

P1 — public static site unavailable.
P1 — widespread release/deployment failure affecting critical routes.
P2 — direct contact route broken or incorrect public e-mail identity.
P2 — widespread broken navigation/mobile shell after release.
P2 — sitemap/robots/canonical/public-truth regression.
P3 — isolated visual/motion degradation while core content remains usable.
P3 — optional Liquid/WebGL unavailable while fallback remains correct.

Future API/AI alerts must not be treated as current production requirements until those functions are explicitly enabled.

## Analytics / real user measurement

Analytics, consent and field-conversion measurement require the separately approved privacy/runtime stage.

When authorized, useful measurements may include:
- availability;
- Core Web Vitals;
- direct contact initiation;
- service-to-contact path;
- portfolio-to-contact path;
- knowledge-to-service path;
- search impressions/indexing through approved webmaster tools.

No metric in this document is evidence of actual current traffic, rankings or conversion results unless backed by real captured data.
