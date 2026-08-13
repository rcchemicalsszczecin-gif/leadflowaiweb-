export type DecisionGroup = "BUILD" | "EXPERIENCE" | "SEARCH" | "AI" | "PLATFORM" | "CARE";

export type ServiceDecisionGuidance = {
  group: DecisionGroup;
  label: string;
  fit: readonly [string, string];
  noFit: readonly [string, string];
  cost: readonly [string, string, string];
  time: readonly [string, string, string];
  compare: readonly [string, string, string];
};

const sharedCost: readonly [string, string, string] = [
  "Zakres funkcji, ekranów i treści wymagających przygotowania lub przebudowy.",
  "Liczba integracji, danych, migracji i zależności z systemami zewnętrznymi.",
  "Poziom indywidualizacji oraz zakres QA, dostępności, wydajności i bezpieczeństwa.",
];

const sharedTime: readonly [string, string, string] = [
  "Gotowość materiałów, decyzji, dostępów i danych po stronie projektu.",
  "Liczba zależności oraz przypadków brzegowych wymagających walidacji.",
  "Zakres testów, iteracji i bezpiecznego wdrożenia zmian.",
];

const guidance: Record<DecisionGroup, ServiceDecisionGuidance> = {
  BUILD: {
    group: "BUILD",
    label: "BUDOWA I MODERNIZACJA WWW",
    fit: ["Gdy strona ma realizować konkretny cel biznesowy i potrzebuje spójnej architektury.", "Gdy obecny serwis ogranicza treść, widoczność, konwersję albo dalszy rozwój."],
    noFit: ["Gdy problem dotyczy jednej drobnej poprawki bez wpływu na resztę systemu.", "Gdy nie ma jeszcze ustalonej oferty, odbiorcy ani celu strony."],
    cost: sharedCost,
    time: sharedTime,
    compare: ["Od nowa czy modernizacja?", "Od nowa — gdy obecna architektura blokuje kluczowe funkcje lub rozwój.", "Modernizacja — gdy wartościowe URL-e, treść i fundament techniczny można zachować."],
  },
  EXPERIENCE: {
    group: "EXPERIENCE",
    label: "UX/UI, TREŚĆ I INTERAKCJA",
    fit: ["Gdy sposób prezentacji realnie wpływa na zrozumienie oferty i decyzję użytkownika.", "Gdy 3D, ruch lub interakcja mają wyjaśniać albo demonstrować produkt, a nie tylko dekorować."],
    noFit: ["Gdy efekt nie ma określonej funkcji biznesowej lub informacyjnej.", "Gdy dodatkowa złożoność pogorszyłaby dostępność, wydajność lub utrzymanie bez proporcjonalnej wartości."],
    cost: sharedCost,
    time: sharedTime,
    compare: ["Prosty interfejs czy doświadczenie premium?", "Prosty interfejs — gdy liczy się maksymalna czytelność i szybkość wdrożenia.", "Doświadczenie premium — gdy narracja lub produkt rzeczywiście wymagają własnej formy."],
  },
  SEARCH: {
    group: "SEARCH",
    label: "WIDOCZNOŚĆ, POMIAR I KONWERSJA",
    fit: ["Gdy trzeba uporządkować intencje, treści i techniczne sygnały zamiast dodawać przypadkowe URL-e.", "Gdy ruch lub oferta istnieją, ale strona nie prowadzi czytelnie do odpowiedzi i działania."],
    noFit: ["Gdy oczekiwaniem jest gwarancja pozycji, cytowania przez AI albo konkretnego ruchu.", "Gdy publiczne fakty i oferta są niespójne i najpierw wymagają uporządkowania u źródła."],
    cost: sharedCost,
    time: [sharedTime[0], sharedTime[1], "Czas ponownego odkrycia i przetworzenia zmian przez wyszukiwarki pozostaje poza kontrolą wykonawcy."],
    compare: ["SEO, AEO czy GEO / AI Search?", "Wspólny fundament — semantyka, treść, publiczna prawda i jakość techniczna.", "Różne intencje — każda warstwa ma inne zadanie i nie jest osobnym magicznym algorytmem."],
  },
  AI: {
    group: "AI",
    label: "AI, RAG, AUTOMATYZACJE I INTEGRACJE",
    fit: ["Gdy istnieje konkretny proces, pytanie lub przepływ danych, który można opisać i sprawdzić.", "Gdy system może pracować na kontrolowanych źródłach z jasno określonymi granicami."],
    noFit: ["Gdy AI ma być dodane wyłącznie dlatego, że jest modne, bez zadania i kryterium powodzenia.", "Gdy proces wymaga niekontrolowanego dostępu do danych wrażliwych lub decyzji bez zabezpieczeń."],
    cost: sharedCost,
    time: sharedTime,
    compare: ["Reguły czy AI / RAG?", "Reguły — gdy proces jest deterministyczny i można go opisać jednoznacznymi warunkami.", "AI / RAG — gdy zadanie wymaga interpretacji języka lub nieustrukturyzowanej wiedzy z kontrolą źródeł."],
  },
  PLATFORM: {
    group: "PLATFORM",
    label: "APLIKACJE I PLATFORMY TREŚCIOWE",
    fit: ["Gdy użytkownik ma wykonywać zadania, zarządzać danymi albo wracać do produktu.", "Gdy wielu redaktorów lub użytkowników potrzebuje kontrolowanego modelu treści, danych i uprawnień."],
    noFit: ["Gdy głównym zadaniem jest tylko publikacja informacji i kontakt, bez stałej pracy w systemie.", "Gdy złożona platforma byłaby budowana na hipotetyczne potrzeby bez potwierdzonego scenariusza użycia."],
    cost: sharedCost,
    time: sharedTime,
    compare: ["Strona czy aplikacja / CMS?", "Strona — gdy głównym zadaniem jest informacja, oferta i pozyskanie kontaktu.", "Aplikacja / CMS — gdy użytkownicy wykonują powtarzalne operacje lub treść wymaga stałej pracy zespołu."],
  },
  CARE: {
    group: "CARE",
    label: "JAKOŚĆ, BEZPIECZEŃSTWO I UTRZYMANIE",
    fit: ["Gdy działający serwis ma problemy z wydajnością, dostępnością, bezpieczeństwem lub niezawodnością.", "Gdy strona jest ważnym kanałem biznesowym i potrzebuje kontroli po publikacji."],
    noFit: ["Gdy oczekiwaniem jest jednorazowy certyfikat albo obietnica całkowitego braku awarii.", "Gdy nie ma możliwości wdrażania napraw wykrytych w audycie lub monitoringu."],
    cost: sharedCost,
    time: sharedTime,
    compare: ["Jednorazowa naprawa czy stała opieka?", "Naprawa — przy dobrze odizolowanym problemie i stabilnym środowisku po zmianie.", "Opieka — gdy serwis stale się zmienia, ma wiele zależności albo jest krytyczny dla biznesu."],
  },
};

const groups: Record<string, DecisionGroup> = Object.fromEntries([
  ["BUILD", "strony-internetowe", "landing-pages", "sklepy-internetowe", "web-development", "modernizacja-stron", "audyt-strony"],
  ["EXPERIENCE", "strony-3d-webgl", "interaktywne-strony", "motion-design", "ux-ui-design", "copywriting-content"],
  ["SEARCH", "seo", "aeo", "geo-ai-search", "seo-aeo-geo", "local-seo", "cro-optymalizacja-konwersji", "analityka-webowa", "formularze-lead-generation"],
  ["AI", "chatboty-ai", "rag-bazy-wiedzy", "agenci-ai-www", "integracje-ai", "integracje-api", "automatyzacje-www"],
  ["PLATFORM", "aplikacje-webowe", "cms-headless", "pwa", "strony-wielojezyczne"],
  ["CARE", "core-web-vitals", "dostepnosc-wcag", "bezpieczenstwo-stron", "hosting-deploy", "opieka-utrzymanie-stron", "monitoring-www"],
].flatMap(([group, ...slugs]) => slugs.map((slug) => [slug, group]))) as Record<string, DecisionGroup>;

export function getServiceDecisionGuidance(slug: string) {
  const group = groups[slug];
  if (!group) throw new Error(`Missing V13 decision guidance for ${slug}`);
  return guidance[group];
}

export const serviceDecisionSlugs = Object.freeze(Object.keys(groups));
