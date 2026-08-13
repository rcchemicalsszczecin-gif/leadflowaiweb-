# V13.0 — public route inventory

STATUS: HISTORICAL V13.0 SNAPSHOT — SUPERSEDED BY V13.10 SEARCH INTENT MAP

> Ten dokument zachowuje stan wejściowy routingu jako evidence. Nie jest bieżącym source of truth dla publicznego tree. Aktualna mapa 63 indeksowalnych URL-i i ich dominant intents: `docs/quality/V13-10-SEARCH-INTENT-MAP.md`.

## Public surfaces

Jawne route z `app/` w momencie V13.0:

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

`/wiedza/[slug]` generowało dodatkowo 21 artykułów z registry.

## Generator model

Usługi są składane z pięciu registry: core, experience, search, expanded i extra. Renderer wspólny: `components/service-page.tsx`. Knowledge ma osobny generator SSG.

## V13 rule

Każdy route przed finalnym PASS musi mieć: dominant intent, PL public copy, unikalne metadata, właściwe related links, zweryfikowany canonical, właściwy typ schema i decyzję visual: KEEP / REBUILD / REMOVE.
