# V13.0 — visual, asset and search inventory

STATUS: ACTIVE INVENTORY

## Visual decisions

KEEP DNA: WaterSurface/WebGL water jako signature layer; cinematic depth; premium motion; V9.2 reduced-motion/responsive controls; interaktywne demonstracje jako first-party proof.

REBUILD: hero — z abstrakcyjnych WEB/SEARCH/AI planes do żywego produktu WWW; What We Build; browser demo; before/after; portfolio; capability scenes; service-page visuals; kontakt/brief; knowledge hub visuals.

REMOVE/REPLACE: placeholder copy typu DEMO/ACTION/SYSTEM READY oraz dekoracje bez informacji biznesowej.

## Assets

`public/` ma obecnie tylko `.nojekyll` i `CNAME`. Brakuje własnego zestawu showcase images, portfolio screenshots, OG assets i lokalnych backgroundów. `realistic-board-v5.css` używa zewnętrznego zdjęcia Unsplash; V13 ma zastąpić je assetem własnym lub świadomie zatwierdzonym lokalnym materiałem.

## Search clusters

Search cluster wymagający odrębnych dominant intents:
- `/seo`: techniczne i on-page SEO dla stron;
- `/aeo`: answer-first architecture i odpowiedzi;
- `/geo-ai-search`: entity/public-truth/citation-readiness dla systemów generatywnych;
- `/seo-aeo-geo`: nadrzędny pillar łączący trzy warstwy;
- `/local-seo`: lokalna widoczność i lokalny entity/context.

## Schema findings

Fundament Organization/Brand/WebSite/WebPage/Service/FAQ/Article jest dobry. `Service.serviceType` nie powinno finalnie kopiować technicznego `page.code`; V13 ma wprowadzić osobne, ludzkie `serviceType`. FAQ schema ma pozostać tylko tam, gdzie FAQ jest realnie widoczne. Knowledge wymaga author/update/source layer.

## Final acceptance

Brak zewnętrznych stockowych assetów w kluczowych scenach bez jawnej decyzji; każdy money page ma własny visual purpose; każdy search route ma jeden dominant intent i nie duplikuje odpowiedzi strony nadrzędnej.