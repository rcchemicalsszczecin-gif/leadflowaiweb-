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
    status: "PROJEKT WŁASNY · PRODUKCJA DZIAŁA · KANDYDAT ROZWIJANY ODDZIELNIE",
    name: "LeadFlowAI.pl",
    description:
      "Własny serwis LeadFlowAI i demonstrator sposobu, w jaki łączymy architekturę informacji, statyczne wdrożenie, interakcję, SEO/AEO/GEO oraz kontrolę publicznej prawdy.",
    note:
      "Publiczna produkcja i rozwijany kandydat mają rozdzielone identyfikatory wydania. Opis nie oznacza wyników sprzedażowych, pozycji w wyszukiwarce ani finalnej akceptacji całego produktu.",
    url: "https://leadflowai.pl/",
    facts: [
      { label: "Marka", value: "LeadFlowAI" },
      { label: "Domena", value: "leadflowai.pl" },
      { label: "Operator", value: "Tervyxa Systems sp. z o.o." },
      { label: "Status", value: "Produkcja działa · kandydat w rozwoju" },
    ],
    scope: [
      { title: "Architektura WWW", description: "Next.js App Router, TypeScript, statyczny eksport i 35 tras usługowych w kontrolowanym rejestrze." },
      { title: "Interaktywne doświadczenie", description: "Pierwszoplanowa treść DOM, WebGL2 z ograniczeniami renderowania oraz ścieżki bez WebGL i z ograniczonym ruchem." },
      { title: "Architektura widoczności", description: "21 materiałów wiedzy i model 63 intencji wraz z canonical, schema i sitemap; bez deklarowania zewnętrznych rankingów." },
      { title: "Kontrola jakości", description: "Deterministyczne kontrakty CI, skanowanie śledzonego repozytorium i chroniona gałąź produkcyjna." },
      { title: "Kontakt", description: "Jawny kontakt e-mail bez aktywowania niezatwierdzonego formularza, chatbota ani analityki." },
      { title: "Granica dowodu", description: "Kontrakty techniczne potwierdzają stan kodu, ale nie są dowodem wyników biznesowych ani terenowych Core Web Vitals." },
    ],
  },
  {
    id: "02 / TRANSKRYPCJAAI",
    status: "MARKA TERVYXA SYSTEMS · PUBLICZNY SERWIS DZIAŁA · AKTYWACJE ROZDZIELONE",
    name: "TranskrypcjaAI.pl",
    description:
      "Marka Tervyxa Systems poświęcona transkrypcji i pracy z nagraniami. Prywatne źródło buduje publiczny serwis przez Cloudflare Pages, a repozytorium rozdziela stronę marketingową, próbę oraz nieaktywowany portal zamówień.",
    note:
      "Ograniczona publiczna próba działa, ale portal zamówień i pełna ścieżka samoobsługowa pozostają wyłączone. Nie publikujemy wskaźników dokładności, przewagi modelu ani wyników klientów.",
    url: "https://transkrypcjaai.pl/",
    facts: [
      { label: "Marka", value: "TranskrypcjaAI" },
      { label: "Domena", value: "transkrypcjaai.pl" },
      { label: "Relacja", value: "Marka Tervyxa Systems sp. z o.o." },
      { label: "Status", value: "Serwis działa · portal zamówień wyłączony" },
    ],
    scope: [
      { title: "Prywatne źródło", description: "Prywatne repozytorium GitHub z kontrolowanym CI oraz produkcyjnym buildem Cloudflare Pages." },
      { title: "Warstwa publiczna", description: "27 kanonicznych tras zapisanych w aktualnym kontrakcie projektu i publiczna domena odpowiadająca przez Cloudflare." },
      { title: "Oferta", description: "Transkrypcja, napisy i uporządkowane rezultaty są opisane jako usługi, bez przypisywania ich jednemu modelowi lub backendowi." },
      { title: "Ograniczona próba", description: "Publiczna próba jest oddzielona od pełnego portalu zamówień i od niezatwierdzonych materiałów dowodowych." },
      { title: "Dostępność i wydajność", description: "Repozytorium zawiera przyjęte bramki przeglądarek, dostępności i budżetów zasobów; nie są to bieżące dane terenowe." },
      { title: "Granica aktywacji", description: "Działający serwis nie oznacza aktywacji portalu zamówień, gwarancji dokładności ani publikacji prywatnego źródła." },
    ],
  },
  {
    id: "03 / TERVYXA",
    status: "PROJEKT WŁAŚCICIELSKI · TERVYXA.PL DZIAŁA · KANDYDAT PRZEBUDOWY ODDZIELONY",
    name: "Tervyxa.pl",
    description:
      "Publiczny serwis Tervyxa Systems przedstawia systemy AI dla firm, automatyzację, RAG, integracje API i dedykowane oprogramowanie. Oddzielne repozytorium rozwija większą, zarządzaną dowodami platformę kandydującą.",
    note:
      "Działająca witryna i niepromowany kandydat są odrębnymi stanami. Opis nie przedstawia wewnętrznych modeli kompetencji ani nieukończonego R&D jako dostarczonego wyniku klienta.",
    url: "https://tervyxa.pl/",
    facts: [
      { label: "Marka", value: "Tervyxa Systems" },
      { label: "Domena", value: "tervyxa.pl" },
      { label: "Publiczna warstwa", value: "PL + EN" },
      { label: "Status", value: "Serwis działa · główna przebudowa aktywna" },
    ],
    scope: [
      { title: "Platforma publiczna", description: "Polska i angielska warstwa serwisu z canonical oraz hreflang, zweryfikowana na działającej domenie." },
      { title: "Zakres publiczny", description: "Systemy AI, automatyzacja procesów, integracje API, lokalne AI, RAG i oprogramowanie dedykowane." },
      { title: "Kandydat Next.js", description: "Oddzielne repozytorium rozwija platformę wiedzy, interakcji i sprzedaży jako stan kandydujący, nie produkcyjny." },
      { title: "Publiczna prawda", description: "Polityka DEKLARACJA → DOWÓD → WERYFIKACJA → STATUS PUBLICZNY ogranicza komunikację o stanie projektu." },
      { title: "Architektura wyszukiwania", description: "Repozytorium definiuje warstwy search, answer, entity i AI Search bez deklarowania rankingów lub cytowań." },
      { title: "Granica dowodu", description: "Niepromowane prace wizualne i wewnętrzna taksonomia kompetencji nie są prezentowane jako rezultat dla klienta." },
    ],
  },
];
