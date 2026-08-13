# V13.10 — Acceptance matrix 1–60

STATUS: FINAL AUDIT COMPLETE — RELEASE CANDIDATE WITH EXPLICIT BOUNDARIES

Legenda:
- `PASS` — zaimplementowane i objęte istniejącym lub V13 gate’em / audytem.
- `PASS_WITH_BOUNDARY` — zaimplementowana bezpieczna wersja, ale rozszerzenie wymaga dodatkowej public truth / Owner data albo pozostaje poza zakresem statycznego frontendu.
- `DEFERRED_TO_V13.11_BY_EVIDENCE` — nie wolno symulować danych; aktywacja po realnym pomiarze.

## Workstreams 1–15

1. `PASS` — pełna polonizacja publicznego UI + rendered artifact scan.
2. `PASS` — publiczne etapy: Projekt i budowa / Widoczność / Konwersja / Inteligencja / Integracje / Opieka.
3. `PASS` — Public Language V13 + rendered HTML gate blokują placeholdery i retired EN.
4. `PASS` — `V13-10-PUBLIC-GLOSSARY.md` jest autorytatywnym glossary/brand dictionary.
5. `PASS` — developer-demo microcopy zastąpione treścią biznesową.
6. `PASS` — LeadFlowAI pozycjonowane jako specjalista WWW z AI/search jako przewagą.
7. `PASS` — buyer-first hero.
8. `PASS` — first-party browser/mobile hero showcase.
9. `PASS` — buyer-first header: Usługi / Realizacje / Wiedza / O nas / Demo / Jak pracujemy + kontakt jako stałe CTA.
10. `PASS` — spójny system głównego CTA „Wyceń projekt” i contextual secondary CTA.
11. `PASS` — selector rodzaju projektu w konfiguratorach/brief builderze.
12. `PASS` — problem/audience paths na `/uslugi`.
13. `PASS` — trzy poziomy zakresu bez publicznego cennika: Nowa strona / Strona + wzrost / Dedykowany system WWW.
14. `PASS` — contextual CTA zależne od grupy usługi.
15. `PASS` — frontend-only brief builder na `/kontakt`; generuje mailto, niczego nie zapisuje.

## Workstreams 16–30

16. `PASS` — V9.2 zachowane jako DNA, nie sztywna granica V13.
17. `PASS` — mniej abstrakcji, więcej browser-native UI i wizualizacji produktu.
18. `PASS` — kluczowe grafiki mają funkcję informacyjną/biznesową albo są jawnie demonstracyjne.
19. `PASS` — Liquid Circuit pozostaje signature experience.
20. `PASS` — scroll-driven story pokazuje dojrzewanie strony jako systemu.
21. `PASS` — Live Lab / browser demo pokazuje zachowanie dobrej strony zamiast samego opisu.
22. `PASS` — publiczny split: Człowiek / Google / System AI na `/seo-aeo-geo`.
23. `PASS` — Visual Entity Graph.
24. `PASS` — edukacyjny AI Search Preview z jawnym brakiem gwarancji ekspozycji/cytowania.
25. `PASS` — first-party system ilustracji CSS/SVG/UI.
26. `PASS` — publiczna warstwa V13 nie zależy od Unsplash; first-party OG i visual authority.
27. `PASS` — premium editorial typography zachowana w systemie V9/V13.
28. `PASS` — zmienny rytm cinematic / content / proof.
29. `PASS` — motion powiązany z narracją i stanami, z reduced-motion.
30. `PASS` — osobne reguły mobile dla hero, search education i kluczowych układów.

## Workstreams 31–45

31. `PASS` — wizualne portfolio LeadFlowAI / Tervyxa / TranskrypcjaAI.
32. `PASS` — evidence-first case storytelling.
33. `PASS` — Before/After jako jawne demo koncepcyjne, nie realizacja klienta.
34. `PASS` — publiczny standard jakości na homepage.
35. `PASS` — CI/performance/schema/accessibility jako dowód, nie fikcyjne KPI.
36. `PASS` — `/o-nas`.
37. `PASS_WITH_BOUNDARY` — relacja Brand → Tervyxa Systems, public truth i trust są wdrożone; final legal identifiers / final privacy activation wymagają zatwierdzonych danych Ownera i rzeczywistych aktywnych mechanizmów.
38. `PASS` — transparentny proces i publiczna Metodologia LeadFlow.
39. `PASS` — „ma sens / nie musi mieć sensu” na wszystkich 35 usługach.
40. `PASS` — czynniki kosztu i czasu bez niezatwierdzonych cen/terminów.
41. `PASS` — sześć głównych filarów oferty na `/uslugi`.
42. `PASS` — sześć service template flows z grupowymi CTA i jawnie identyfikowanym template group.
43. `PASS` — publiczne tagi/nagłówki przechodzą przez normalizację PL.
44. `PASS` — entity-first copy na money pages i w schema.
45. `PASS` — unikalny answer-first block na money pages.

## Workstreams 46–60

46. `PASS` — problem-driven buyer paths i decision sections zamiast technology-first katalogu.
47. `PASS` — comparison content w service decision layer.
48. `PASS` — segmentacja: lokalna firma usługowa / B2B / sprzedaż-produkt / zespół systemowy.
49. `PASS` — nazwana Metodologia LeadFlow oparta na realnym procesie.
50. `PASS` — H1/lead/direct answers/FAQ/CTA/metadata przeszły V13 rewrite + public normalizers + rendered audit.
51. `PASS` — kompletna 63-URL Search Intent Map + unique-intent gate.
52. `PASS` — pillar architecture: sześć filarów usług + główne money/search pillars.
53. `PASS` — pięć topical hubs na `/wiedza`, obejmujących 21/21 artykułów bez thin hub URLs.
54. `PASS` — service→knowledge topic graph + related knowledge/service linking.
55. `PASS` — redakcja, data faktycznej weryfikacji, metodologia; brak fikcyjnego `datePublished`.
56. `PASS` — primary-source layer dla treści technicznych + jawna metodologia dla tekstów opiniotwórczych.
57. `PASS_WITH_BOUNDARY` — `/local-seo` ma evidence-safe przykład Szczecina i zakaz doorway; nie publikuje niepotwierdzonego adresu LeadFlowAI/NAP.
58. `PASS` — Organization/Brand/WebSite/WebPage/Service/FAQ/Breadcrumb/Article graph i spójny public model.
59. `DEFERRED_TO_V13.11_BY_EVIDENCE` — original research wymaga realnego datasetu; syntetyczne KPI/badanie są zabronione przez evidence boundary.
60. `PASS_WITH_BOUNDARY` — finalny search + AI-readiness + release audit zakończony na finalnym technicznym checkpointcie: Quality #348 SUCCESS, PR ahead-only względem `main`, 63/63 intent map, rendered HTML gate, static/runtime boundaries, public chatbot OFF, lead backend OFF, frontend-only brief bez storage/network, brak nowych backend/API paths i brak nowych runtime dependencies. Granice zewnętrzne poniżej pozostają jawne i nie są ukrywane jako kodowy PASS.

## Carried release debt / external boundaries

- `main` branch protection / required checks — nadal brak.
- workflow Node — `22`, nie exact minor pin.
- 21 legacy CSS specificity warnings — non-blocking, bez nowych warningów V13.
- external-live HTTP smoke — zależny od DNS środowiska wykonawczego.
- final wordmark/logo — Owner/design decision pending.
- final legal identifiers — Owner/public registry truth pending.
- analytics/privacy — OFF do osobnej autoryzacji i realnej aktywacji pomiaru.
- public chatbot — OFF by Owner.
- online lead delivery — OFF by Owner; kontakt i brief działają przez mailto.
- public pricing — nie jest wymagane przez V13; zakres kosztu jest opisany czynnikami bez wymyślonej stawki.
- workstream 59 / original research — świadomie V13.11 po realnym datasecie.

## Release gate

V13.10 jest technicznie zamknięte jako release candidate z jawnymi boundary. PR #16 pozostaje Draft i nie przechodzi do `main`, dopóki Owner nie wyda osobnej, jawnej decyzji merge. Punkt 59 nie może zostać sztucznie zmieniony na PASS bez realnego datasetu.
