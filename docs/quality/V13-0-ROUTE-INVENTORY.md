# V13.0 — public route inventory

STATUS: ACTIVE INVENTORY

## Public surfaces

Jawne route z `app/`:

- `/`
- `/aeo`
- `/agenci-ai-www`
- `/analityka-webowa`
- `/aplikacje-webowe`
- `/audyt-strony`
- `/automatyzacje-www`
- `/bezpieczenstwo-stron`
- `/chatboty-ai`
- `/cms-headless`
- `/copywriting-content`
- `/core-web-vitals`
- `/cro-optymalizacja-konwersji`
- `/dostepnosc-wcag`
- `/formularze-lead-generation`
- `/geo-ai-search`
- `/hosting-deploy`
- `/integracje-ai`
- `/integracje-api`
- `/interaktywne-strony`
- `/kontakt`
- `/lab`
- `/landing-pages`
- `/local-seo`
- `/modernizacja-stron`
- `/monitoring-www`
- `/motion-design`
- `/opieka-utrzymanie-stron`
- `/pwa`
- `/rag-bazy-wiedzy`
- `/realizacje`
- `/seo`
- `/seo-aeo-geo`
- `/sklepy-internetowe`
- `/strony-3d-webgl`
- `/strony-internetowe`
- `/strony-wielojezyczne`
- `/uslugi`
- `/ux-ui-design`
- `/web-development`
- `/wiedza`

`/wiedza/[slug]` generuje dodatkowo 21 artykułów z registry.

## Generator model

Usługi są składane z pięciu registry: core, experience, search, expanded i extra. Renderer wspólny: `components/service-page.tsx`. Knowledge ma osobny generator SSG.

## V13 rule

Każdy route przed finalnym PASS musi mieć: dominant intent, PL public copy, unikalne metadata, właściwe related links, zweryfikowany canonical, właściwy typ schema i decyzję visual: KEEP / REBUILD / REMOVE.