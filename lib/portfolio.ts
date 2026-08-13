export type PortfolioCase = {
  id: string;
  status: string;
  name: string;
  description: string;
  note?: string;
  url: string;
  facts: readonly { label: string; value: string }[];
  scope: readonly { title: string; description: string }[];
};

export const portfolioCases: readonly PortfolioCase[] = [
  {
    id: "01 / LEADFLOWAI",
    status: "PROJEKT WŁASNY · PUBLICZNIE DZIAŁAJĄCY · AKTYWNIE ROZWIJANY",
    name: "LeadFlowAI.pl",
    description:
      "Własna platforma internetowa Tervyxa Systems i demonstrator sposobu, w jaki łączymy architekturę informacji, wdrożenie, interakcję, SEO/AEO/GEO, wydajność oraz kontrolę publicznej prawdy.",
    url: "https://leadflowai.pl/",
    facts: [
      { label: "Marka", value: "LeadFlowAI" },
      { label: "Domena", value: "leadflowai.pl" },
      { label: "Operator", value: "Tervyxa Systems sp. z o.o." },
      { label: "Status", value: "Produkcja + dalszy rozwój" },
    ],
    scope: [
      { title: "Architektura WWW", description: "Next.js App Router, TypeScript, statyczna publikacja i wspólne rejestry usług." },
      { title: "Interaktywne doświadczenie", description: "Natywne dla przeglądarki 3D, WebGL, interakcje, laboratorium możliwości i tryb ograniczonego ruchu." },
      { title: "Architektura widoczności", description: "SEO, AEO, GEO / AI Search, bezpośrednie odpowiedzi, schema, sitemap i publiczna prawda." },
      { title: "Wydajność", description: "Budżety JS/CSS/HTML i kontrolowane tryby renderowania na komputerach i urządzeniach mobilnych." },
      { title: "Konwersja", description: "Ścieżki usługowe i jawny kontakt e-mail bez uruchamiania niezatwierdzonego zaplecza do obsługi zapytań." },
      { title: "Dowody wydania", description: "CI dla gałęzi i wyniku scalenia oraz identyfikowane wdrożenie produkcyjne dla większych wydań." },
    ],
  },
  {
    id: "02 / TRANSKRYPCJAAI",
    status: "PROJEKT WŁASNY · PUBLICZNY SERWIS DZIAŁA · PRODUKT W AKTYWACJI",
    name: "TranskrypcjaAI.pl",
    description:
      "Marka Tervyxa Systems zbudowana wokół usług transkrypcji i pracy z nagraniami. Publiczna warstwa marketingowa, ścieżka pozyskiwania zapytań i start widoczności są wdrożone, a osobna próbna transkrypcja przeszła realny test E2E na materiale należącym do projektu.",
    note:
      "Publiczne przesyłanie plików przez klienta pozostaje wyłączone do zamknięcia finalnej warstwy prywatności, integracji interfejsu oraz końcowego QA przeglądarek, dostępności i urządzeń mobilnych.",
    url: "https://transkrypcjaai.pl/",
    facts: [
      { label: "Marka", value: "TranskrypcjaAI" },
      { label: "Domena", value: "transkrypcjaai.pl" },
      { label: "Relacja", value: "Marka Tervyxa Systems sp. z o.o." },
      { label: "Status", value: "Marketing działa · publiczne przesyłanie plików wyłączone" },
    ],
    scope: [
      { title: "Statyczny TypeScript", description: "Lekki frontend, własne kontrakty jakości i kontrolowane bramki publikacji." },
      { title: "Start widoczności", description: "21 adresów kanonicznych, dostęp robotów oraz sitemap zgłoszona do Google Search Console i Bing." },
      { title: "Ścieżka zapytań", description: "Produkcyjna ścieżka formularzowa zweryfikowana E2E przez dedykowaną domenę formularzy." },
      { title: "Próbna transkrypcja", description: "Ograniczony backend próbny z walidacją wejścia i realnym testem transkrypcji audio." },
      { title: "Granica aktywacji", description: "Działające zaplecze nie oznacza automatycznej publikacji funkcji użytkownikom." },
      { title: "Zarządzanie zmianą", description: "Oddzielone bramki marketingu, wyszukiwania, zaplecza, prywatności i publicznej aktywacji." },
    ],
  },
  {
    id: "03 / TERVYXA",
    status: "PROJEKT WŁASNY · TERVYXA.PL DZIAŁA · GŁÓWNA PRZEBUDOWA W TOKU",
    name: "Tervyxa.pl",
    description:
      "Oficjalny serwis Tervyxa Systems prezentujący systemy AI dla firm, automatyzację procesów, RAG, lokalne AI, integracje API i dedykowane oprogramowanie. Publiczna wersja działa na tervyxa.pl, a równolegle rozwijana jest większa docelowa platforma firmy.",
    note:
      "Docelowa architektura nie jest wyłącznie zmianą wyglądu: obejmuje model oferty i kompetencji, warstwę danych, system jakości, architekturę widoczności oraz mechanizmy publikowania zweryfikowanych informacji.",
    url: "https://tervyxa.pl/",
    facts: [
      { label: "Marka", value: "Tervyxa Systems" },
      { label: "Domena", value: "tervyxa.pl" },
      { label: "Publiczna warstwa", value: "PL + EN" },
      { label: "Status", value: "Serwis działa · główna przebudowa aktywna" },
    ],
    scope: [
      { title: "Platforma publiczna", description: "Oferta, rozwiązania, technologie, centrum wiedzy, pytania, porównania i treści metodologiczne." },
      { title: "Encje i widoczność", description: "Canonical, hreflang PL/EN oraz Organization, WebSite, WebPage i Service schema." },
      { title: "Architektura docelowa", description: "Docelowa aplikacja Next.js 16 rozwijana jako platforma wiedzy, interakcji i sprzedaży." },
      { title: "Warstwa danych", description: "Repo docelowej platformy zawiera Prisma, PostgreSQL i warstwę komunikacji e-mail przez Resend." },
      { title: "System jakości", description: "Osobne audyty routingu, widoczności, jakości treści, linkowania, gotowości AI Search i publicznego copy." },
      { title: "Zarządzanie zmianą", description: "Rozwój oparty na modelu: DEKLARACJA → DOWÓD → WERYFIKACJA → STATUS PUBLICZNY." },
    ],
  },
];
