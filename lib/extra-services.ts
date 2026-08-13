import type { Metadata } from "next";
import type { ServicePageData } from "@/lib/services";
import { site } from "@/lib/site";

export const extraServicePages = {
  "rag-bazy-wiedzy": {
    slug: "rag-bazy-wiedzy",
    code: "INTELLIGENCE / RAG",
    eyebrow: "LEADFLOWAI / RAG + BAZY WIEDZY",
    title: "RAG i bazy wiedzy dla asystentów pracujących na zatwierdzonych źródłach.",
    lead: "Projektujemy źródła, ekstrakcję, podział treści, embeddingi, wyszukiwanie, reranking, cytowanie i tryb awaryjny dla systemów, które mają odpowiadać z kontrolowanego kontekstu.",
    directAnswer: "RAG ma sens wtedy, gdy odpowiedź powinna wynikać z konkretnej, aktualizowanej wiedzy. Najpierw porządkujemy źródła i ich aktualność, potem projektujemy wyszukiwanie, ranking i sposób podawania kontekstu do modelu. Brak odpowiedniego źródła powinien być obsłużony jawnie zamiast zastępowany zgadywaniem.",
    capabilities: ["RAG", "Embeddingi", "Podział treści", "Wyszukiwanie", "Reranking", "Cytowania", "Kontrola źródeł", "Ewaluacja"],
    outcomes: [
      { title: "Odpowiedzi oparte na źródłach", description: "Model otrzymuje wybrane fragmenty z zatwierdzonej bazy wiedzy." },
      { title: "Kontrola aktualności", description: "Źródła mogą być aktualizowane bez ponownego trenowania całego modelu." },
      { title: "Jawny brak odpowiedzi", description: "System może poinformować o braku wystarczającego kontekstu i skierować użytkownika dalej." },
    ],
    deliverables: [
      { index: "01", title: "Inwentaryzacja wiedzy", description: "Źródła, formaty, właściciele informacji, aktualność i zasady publikacji do systemu.", tags: ["Źródła", "Aktualność", "Właściciele", "Zasady"] },
      { index: "02", title: "Pipeline wyszukiwania", description: "Ekstrakcja, podział treści, embeddingi, indeks, filtrowanie i reranking dobrane do pytań.", tags: ["Podział treści", "Embeddingi", "Indeks", "Reranking"] },
      { index: "03", title: "Kontrakt odpowiedzi", description: "Sposób cytowania, limity kontekstu, tryb awaryjny i zasady użycia pobranej treści.", tags: ["Kontekst", "Cytowania", "Tryb awaryjny", "Odpowiedzi"] },
      { index: "04", title: "Zestaw ewaluacyjny", description: "Pytania testowe, oczekiwane źródła i przypadki braku odpowiedzi.", tags: ["Ewaluacja", "Recall", "Precyzja", "QA"] },
    ],
    process: [
      { title: "Źródła", description: "Ustalamy materiały dopuszczone do bazy wiedzy." },
      { title: "Indeks", description: "Projektujemy podział treści i wyszukiwanie." },
      { title: "Odpowiedź", description: "Łączymy wyszukiwanie z modelem i cytowaniem." },
      { title: "Ewaluacja", description: "Testujemy pytania poprawne, trudne i bez odpowiedzi." },
      { title: "Aktualizacja", description: "Definiujemy sposób odświeżania źródeł." },
    ],
    faqs: [
      { question: "Czy RAG całkowicie eliminuje błędne odpowiedzi?", answer: "Nie. Dobre źródła, wyszukiwanie, cytowanie i tryb awaryjny ograniczają ryzyko, ale system nadal wymaga testów i kontroli jakości." },
      { question: "Czy można korzystać z dokumentów firmowych?", answer: "Tak, jeśli firma ma prawo je przetwarzać, da się je wiarygodnie odczytać i ustalimy zasady aktualizacji." },
      { question: "Czy RAG musi działać w chmurze?", answer: "Nie zawsze. Architektura może być chmurowa, lokalna lub hybrydowa zależnie od danych i skali." },
    ],
    related: ["integracje-ai", "chatboty-ai", "agenci-ai-www"],
  },
  "agenci-ai-www": {
    slug: "agenci-ai-www",
    code: "INTELLIGENCE / AGENTS",
    eyebrow: "LEADFLOWAI / AGENTY AI",
    title: "Agenci AI dla aplikacji webowych z jasno ograniczonym procesem i punktami zatwierdzenia.",
    lead: "Projektujemy procesy agentowe wtedy, gdy model ma wybierać kolejne kroki lub narzędzia, ale każda funkcja ma określony zakres, limit i sposób kontroli.",
    directAnswer: "Agent AI może wykonywać wieloetapowy proces, dlatego wymaga bardziej precyzyjnego kontraktu niż zwykły chatbot. Definiujemy dozwolone funkcje, dane wejściowe, limit kroków, stan procesu, obsługę błędów oraz miejsca, w których potrzebna jest decyzja człowieka.",
    capabilities: ["Procesy agentowe", "Użycie narzędzi", "Stan", "Zatwierdzenia", "Limity", "Ponowienia", "Obserwowalność", "Ewaluacja"],
    outcomes: [
      { title: "Automatyzacja z granicami", description: "Agent działa tylko w zakresie zdefiniowanego procesu i dostępnych funkcji." },
      { title: "Punkty zatwierdzenia", description: "Wybrane działania mogą zatrzymywać proces i wymagać decyzji człowieka." },
      { title: "Możliwość analizy procesu", description: "Kroki i błędy mogą być rejestrowane w zakresie potrzebnym do utrzymania jakości." },
    ],
    deliverables: [
      { index: "01", title: "Granice działania agenta", description: "Cel, dostępne funkcje, limity, warunki zakończenia i miejsca wymagające zatwierdzenia.", tags: ["Zakres", "Narzędzia", "Limity", "Zatwierdzenia"] },
      { index: "02", title: "Proces i stan", description: "Stan procesu, kolejność kroków, limity czasu i kontrola ponowień.", tags: ["Stan", "Proces", "Limit czasu", "Ponowienia"] },
      { index: "03", title: "Człowiek w procesie", description: "Interfejs zatwierdzenia dla kroków, które nie powinny działać całkowicie automatycznie.", tags: ["Zatwierdzenie", "Człowiek", "Weryfikacja", "UX"] },
      { index: "04", title: "QA scenariuszy", description: "Testy typowych, granicznych i błędnych przebiegów przed publikacją.", tags: ["Ewaluacja", "Scenariusze", "Tryb awaryjny", "QA"] },
    ],
    process: [
      { title: "Cel", description: "Definiujemy proces i oczekiwany wynik." },
      { title: "Funkcje", description: "Ograniczamy dostępne narzędzia do minimum potrzebnego do zadania." },
      { title: "Prototyp", description: "Sprawdzamy przebieg na reprezentatywnych przypadkach." },
      { title: "Kontrola", description: "Dodajemy limity, zatwierdzenia i tryb awaryjny." },
      { title: "Ewaluacja", description: "Testujemy jakość i nieoczekiwane przebiegi." },
    ],
    faqs: [
      { question: "Czy każdy chatbot powinien być agentem?", answer: "Nie. Jeżeli wystarczy odpowiedź, wyszukanie wiedzy lub prosta kwalifikacja, agent tylko niepotrzebnie zwiększa złożoność." },
      { question: "Czy agent może mieć punkty zatwierdzenia?", answer: "Tak. Udział człowieka jest właściwym rozwiązaniem tam, gdzie kolejny krok powinien być potwierdzony." },
      { question: "Czy można ograniczyć liczbę kroków?", answer: "Tak. Limit czasu, kroków i kosztu pomaga utrzymać przewidywalność procesu." },
    ],
    related: ["integracje-ai", "automatyzacje-www", "rag-bazy-wiedzy"],
  },
  "monitoring-www": {
    slug: "monitoring-www",
    code: "CARE / MONITORING",
    eyebrow: "LEADFLOWAI / MONITORING WWW",
    title: "Monitoring stron i aplikacji: dostępność, błędy, formularze i krytyczne ścieżki.",
    lead: "Projektujemy testy dostępności, testy syntetyczne, logi i alerty tak, aby wykryty sygnał oznaczał konkretny problem, właściciela i następny krok.",
    directAnswer: "Monitoring ma wartość wtedy, gdy wykryty problem prowadzi do działania. Ustalamy co jest krytyczne, jak często to sprawdzać, jaki próg oznacza incydent i kto otrzymuje alert. Sam status strony głównej nie wystarcza, jeśli krytycznym kanałem jest formularz lub integracja.",
    capabilities: ["Dostępność", "Testy syntetyczne", "Śledzenie błędów", "Logi", "Alerty", "Formularze", "API", "Instrukcje reakcji"],
    outcomes: [
      { title: "Szybsze wykrycie problemu", description: "Niedostępność może zostać wykryta zanim zgłosi ją użytkownik." },
      { title: "Mniej ślepych punktów", description: "Monitorowane mogą być także formularze, endpointy i inne krytyczne kroki." },
      { title: "Alert z kontekstem", description: "Powiadomienie może wskazywać system, typ problemu i pierwszy krok diagnozy." },
    ],
    deliverables: [
      { index: "01", title: "Mapa monitoringu", description: "Komponenty, krytyczność, częstotliwość, progi i właściciel reakcji.", tags: ["Krytyczność", "Progi", "Właściciel", "Testy"] },
      { index: "02", title: "Testy i telemetria", description: "Dostępność, żądania syntetyczne, logi lub śledzenie błędów dobrane do architektury.", tags: ["Testy", "Logi", "Błędy", "Telemetria"] },
      { index: "03", title: "Kierowanie alertów", description: "Kanały, priorytet, ograniczenie częstotliwości i eskalacja zmniejszające liczbę zbędnych alarmów.", tags: ["Alerty", "Kierowanie", "Priorytet", "Eskalacja"] },
      { index: "04", title: "Instrukcje reakcji", description: "Podstawowe kroki diagnozy, cofnięcia wdrożenia i komunikacji dla krytycznych problemów.", tags: ["Instrukcja", "Cofnięcie", "Diagnoza", "Odzyskiwanie"] },
    ],
    process: [
      { title: "Ścieżki krytyczne", description: "Wybieramy elementy, których awaria ma realny skutek." },
      { title: "Sygnały", description: "Dobieramy mierzalne sygnały i progi." },
      { title: "Alerty", description: "Konfigurujemy kierowanie i właściciela reakcji." },
      { title: "Test", description: "Sprawdzamy czy alert dochodzi i czy wiadomo jak rozpocząć diagnozę." },
      { title: "Dostrajanie", description: "Ograniczamy fałszywe alarmy i aktualizujemy testy wraz z serwisem." },
    ],
    faqs: [
      { question: "Czy monitoring zastępuje testy?", answer: "Nie. Testy chronią przed częścią regresji przed wdrożeniem, a monitoring wykrywa problemy w działającym środowisku." },
      { question: "Czy warto monitorować formularz kontaktowy?", answer: "Tak, jeśli jest krytycznym kanałem zapytań. Sama dostępność strony nie potwierdza, że formularz i jego integracja działają." },
      { question: "Czy każdy alert wymaga natychmiastowej reakcji?", answer: "Nie. Priorytet i eskalacja powinny odpowiadać rzeczywistemu wpływowi problemu." },
    ],
    related: ["opieka-utrzymanie-stron", "hosting-deploy", "core-web-vitals"],
  },
} as const satisfies Record<string, ServicePageData>;

export type ExtraServiceSlug = keyof typeof extraServicePages;

export function getExtraServicePage(slug: ExtraServiceSlug): ServicePageData {
  return extraServicePages[slug];
}

export function getExtraServiceMetadata(slug: ExtraServiceSlug): Metadata {
  const page = extraServicePages[slug];
  return {
    title: page.title,
    description: page.lead,
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      type: "website",
      locale: "pl_PL",
      url: `${site.url}/${page.slug}`,
      siteName: site.name,
      title: page.title,
      description: page.lead,
    },
  };
}

export const extraServiceLinks = [
  { slug: "rag-bazy-wiedzy", label: "RAG i bazy wiedzy", pillar: "INTELLIGENCE" },
  { slug: "agenci-ai-www", label: "Agenci AI", pillar: "INTELLIGENCE" },
  { slug: "monitoring-www", label: "Monitoring WWW", pillar: "CARE" },
] as const;
