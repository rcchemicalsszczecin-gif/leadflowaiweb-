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

export const portfolioCases = [
  {
    id: "01 / LEADFLOWAI",
    status: "PROJEKT WŁASNY · PUBLICZNIE DZIAŁAJĄCY · AKTYWNIE ROZWIJANY",
    name: "LeadFlowAI.pl",
    description:
      "Własna platforma web-production Tervyxa Systems i demonstrator sposobu, w jaki łączymy architekturę informacji, development, interakcję, SEO/AEO/GEO, wydajność oraz kontrolę public truth.",
    url: "https://leadflowai.pl/",
    facts: [
      { label: "Marka", value: "LeadFlowAI" },
      { label: "Domena", value: "leadflowai.pl" },
      { label: "Operator", value: "Tervyxa Systems sp. z o.o." },
      { label: "Status", value: "Produkcja + dalszy rozwój" },
    ],
    scope: [
      { title: "Web architecture", description: "Next.js App Router, TypeScript, statyczny deployment i wspólne registry usług." },
      { title: "Interactive experience", description: "Browser-native 3D, WebGL water, motion, Live Lab i reduced-motion." },
      { title: "Search architecture", description: "SEO, AEO, GEO / AI Search, direct answers, schema, sitemap i public truth." },
      { title: "Performance", description: "Budżety JS/CSS/HTML i kontrolowane tryby renderowania desktop/mobile." },
      { title: "Conversion", description: "Ścieżki usługowe i jawny kontakt e-mail bez uruchamiania niezatwierdzonego backendu leadowego." },
      { title: "Release evidence", description: "Branch CI, merge-result CI i identyfikowany deployment produkcyjny dla większych wydań." },
    ],
  },
  {
    id: "02 / TRANSKRYPCJAAI",
    status: "PROJEKT WŁASNY · PUBLICZNY SERWIS LIVE · PRODUKT W AKTYWACJI",
    name: "TranskrypcjaAI.pl",
    description:
      "Marka Tervyxa Systems zbudowana wokół usług transkrypcji i pracy z nagraniami. Publiczna warstwa marketingowa, lead pipeline i search launch są wdrożone, a osobny trial transkrypcji przeszedł realny test E2E na materiale należącym do projektu.",
    note:
      "Publiczny upload klienta pozostaje wyłączony do zamknięcia finalnej warstwy prywatności, integracji UI oraz końcowego QA przeglądarek, dostępności i mobile.",
    url: "https://transkrypcjaai.pl/",
    facts: [
      { label: "Marka", value: "TranskrypcjaAI" },
      { label: "Domena", value: "transkrypcjaai.pl" },
      { label: "Relacja", value: "Marka Tervyxa Systems sp. z o.o." },
      { label: "Status", value: "Marketing live · upload publiczny OFF" },
    ],
    scope: [
      { title: "Static TypeScript", description: "Dependency-light frontend, performance budgets, Playwright i własne walidatory." },
      { title: "Search launch", description: "21 canonical routes, crawler access oraz sitemap zgłoszona do Google Search Console i Bing." },
      { title: "Lead pipeline", description: "Produkcyjna ścieżka formularzowa zweryfikowana E2E przez dedykowaną domenę formularzy." },
      { title: "Trial transcription", description: "Ograniczony backend trial z walidacją wejścia i realnym testem transkrypcji audio." },
      { title: "Activation boundary", description: "Działający backend nie oznacza automatycznej publikacji funkcji użytkownikom." },
      { title: "Governance", description: "Oddzielone bramki marketingu, wyszukiwania, backendu, prywatności i publicznej aktywacji." },
    ],
  },
  {
    id: "03 / TERVYXA",
    status: "PROJEKT WŁASNY · TERVYXA.PL LIVE · FLAGSHIP REBUILD W TOKU",
    name: "Tervyxa.pl",
    description:
      "Oficjalny serwis Tervyxa Systems prezentujący systemy AI dla firm, automatyzację procesów, RAG, lokalne AI, integracje API i dedykowane oprogramowanie. Publiczna wersja działa na tervyxa.pl, a równolegle rozwijana jest większa docelowa platforma firmy.",
    note:
      "Docelowa architektura nie jest wyłącznie redesignem: obejmuje model oferty i capability, warstwę danych, pipeline jakości, search architecture oraz mechanizmy publikowania zweryfikowanych informacji.",
    url: "https://tervyxa.pl/",
    facts: [
      { label: "Marka", value: "Tervyxa Systems" },
      { label: "Domena", value: "tervyxa.pl" },
      { label: "Publiczna warstwa", value: "PL + EN" },
      { label: "Status", value: "Serwis live · flagship rebuild aktywny" },
    ],
    scope: [
      { title: "Public platform", description: "Oferta, rozwiązania, technologie, centrum wiedzy, pytania, porównania i treści metodologiczne." },
      { title: "Entity + search", description: "Canonical, hreflang PL/EN oraz Organization, WebSite, WebPage i Service schema." },
      { title: "Flagship architecture", description: "Docelowa aplikacja Next.js 16 rozwijana jako platforma wiedzy, interakcji i sprzedaży." },
      { title: "Data layer", description: "Repo docelowej platformy obejmuje Prisma/PostgreSQL i warstwę komunikacji e-mail." },
      { title: "Quality system", description: "Osobne audyty routingu, search, content quality, linking, AI-search readiness i public copy." },
      { title: "Governance", description: "Rozwój oparty na modelu CLAIM → EVIDENCE → REVIEW → PUBLIC STATUS." },
    ],
  },
] as const satisfies readonly PortfolioCase[];
