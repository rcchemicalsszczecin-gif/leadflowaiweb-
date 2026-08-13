import type { Metadata } from "next";
import type { ServicePageData } from "@/lib/services";
import { site } from "@/lib/site";

export const extraServicePages = {
  "rag-bazy-wiedzy": {
    slug: "rag-bazy-wiedzy",
    code: "INTELLIGENCE / RAG",
    eyebrow: "LEADFLOWAI / RAG + BAZY WIEDZY",
    title: "RAG i bazy wiedzy dla asystentów pracujących na zatwierdzonych źródłach.",
    lead: "Projektujemy źródła, ekstrakcję, chunking, embedding, retrieval, reranking, cytowanie i fallback dla systemów, które mają odpowiadać z kontrolowanego kontekstu.",
    directAnswer: "RAG ma sens wtedy, gdy odpowiedź powinna wynikać z konkretnej, aktualizowanej wiedzy. Najpierw porządkujemy źródła i ich aktualność, potem projektujemy wyszukiwanie, ranking i sposób podawania kontekstu do modelu. Brak odpowiedniego źródła powinien być obsłużony jawnie zamiast zastępowany zgadywaniem.",
    capabilities: ["RAG", "Embeddings", "Chunking", "Retrieval", "Reranking", "Citations", "Source control", "Evaluation"],
    outcomes: [
      { title: "Odpowiedzi oparte na źródłach", description: "Model otrzymuje wybrane fragmenty z zatwierdzonej bazy wiedzy." },
      { title: "Kontrola aktualności", description: "Źródła mogą być aktualizowane bez ponownego trenowania całego modelu." },
      { title: "Jawny brak odpowiedzi", description: "System może poinformować o braku wystarczającego kontekstu i skierować użytkownika dalej." },
    ],
    deliverables: [
      { index: "01", title: "Knowledge inventory", description: "Źródła, formaty, właściciele informacji, aktualność i zasady publikacji do systemu.", tags: ["Sources", "Freshness", "Ownership", "Governance"] },
      { index: "02", title: "Retrieval pipeline", description: "Ekstrakcja, chunking, embedding, indeks, filtrowanie i reranking dobrane do pytań.", tags: ["Chunking", "Embeddings", "Index", "Reranker"] },
      { index: "03", title: "Answer contract", description: "Sposób cytowania, limity kontekstu, fallback i zasady użycia retrieved content.", tags: ["Context", "Citations", "Fallback", "Answers"] },
      { index: "04", title: "Evaluation set", description: "Pytania testowe, oczekiwane źródła i przypadki braku odpowiedzi.", tags: ["Evaluation", "Recall", "Precision", "QA"] },
    ],
    process: [
      { title: "Źródła", description: "Ustalamy materiały dopuszczone do bazy wiedzy." },
      { title: "Indeks", description: "Projektujemy podział treści i wyszukiwanie." },
      { title: "Odpowiedź", description: "Łączymy retrieval z modelem i cytowaniem." },
      { title: "Ewaluacja", description: "Testujemy pytania poprawne, trudne i bez odpowiedzi." },
      { title: "Aktualizacja", description: "Definiujemy sposób odświeżania źródeł." },
    ],
    faqs: [
      { question: "Czy RAG całkowicie eliminuje błędne odpowiedzi?", answer: "Nie. Dobre źródła, retrieval, cytowanie i fallback ograniczają ryzyko, ale system nadal wymaga testów i kontroli jakości." },
      { question: "Czy można korzystać z dokumentów firmowych?", answer: "Tak, jeśli firma ma prawo je przetwarzać, da się je wiarygodnie odczytać i ustalimy zasady aktualizacji." },
      { question: "Czy RAG musi działać w chmurze?", answer: "Nie zawsze. Architektura może być chmurowa, lokalna lub hybrydowa zależnie od danych i skali." },
    ],
    related: ["integracje-ai", "chatboty-ai", "agenci-ai-www"],
  },
  "agenci-ai-www": {
    slug: "agenci-ai-www",
    code: "INTELLIGENCE / AGENTS",
    eyebrow: "LEADFLOWAI / AGENTY AI",
    title: "Agenci AI dla aplikacji webowych z jasno ograniczonym workflow i punktami zatwierdzenia.",
    lead: "Projektujemy agentowe procesy wtedy, gdy model ma wybierać kolejne kroki lub narzędzia, ale każda funkcja ma określony zakres, limit i sposób kontroli.",
    directAnswer: "Agent AI może wykonywać wieloetapowy proces, dlatego wymaga bardziej precyzyjnego kontraktu niż zwykły chatbot. Definiujemy dozwolone funkcje, dane wejściowe, limit kroków, stan procesu, obsługę błędów oraz miejsca, w których potrzebna jest decyzja człowieka.",
    capabilities: ["Agent workflows", "Tool use", "State", "Approvals", "Limits", "Retries", "Observability", "Evaluation"],
    outcomes: [
      { title: "Automatyzacja z granicami", description: "Agent działa tylko w zakresie zdefiniowanego workflow i dostępnych funkcji." },
      { title: "Punkty zatwierdzenia", description: "Wybrane działania mogą zatrzymywać proces i wymagać decyzji człowieka." },
      { title: "Możliwość analizy procesu", description: "Kroki i błędy mogą być rejestrowane w zakresie potrzebnym do utrzymania jakości." },
    ],
    deliverables: [
      { index: "01", title: "Agent boundary", description: "Cel, dostępne funkcje, limity, warunki zakończenia i miejsca wymagające zatwierdzenia.", tags: ["Scope", "Tools", "Limits", "Approvals"] },
      { index: "02", title: "Workflow + state", description: "Stan procesu, kolejność kroków, timeouty i kontrola ponowień.", tags: ["State", "Workflow", "Timeout", "Retries"] },
      { index: "03", title: "Human-in-the-loop", description: "Interfejs zatwierdzenia dla kroków, które nie powinny działać całkowicie automatycznie.", tags: ["Approval", "Human", "Review", "UX"] },
      { index: "04", title: "Scenario QA", description: "Testy typowych, granicznych i błędnych przebiegów przed publikacją.", tags: ["Evaluation", "Scenarios", "Fallback", "QA"] },
    ],
    process: [
      { title: "Cel", description: "Definiujemy proces i oczekiwany wynik." },
      { title: "Funkcje", description: "Ograniczamy dostępne narzędzia do minimum potrzebnego do zadania." },
      { title: "Prototyp", description: "Sprawdzamy przebieg na reprezentatywnych przypadkach." },
      { title: "Kontrola", description: "Dodajemy limity, zatwierdzenia i fallback." },
      { title: "Ewaluacja", description: "Testujemy jakość i nieoczekiwane przebiegi." },
    ],
    faqs: [
      { question: "Czy każdy chatbot powinien być agentem?", answer: "Nie. Jeżeli wystarczy odpowiedź, wyszukanie wiedzy lub prosta kwalifikacja, agent tylko niepotrzebnie zwiększa złożoność." },
      { question: "Czy agent może mieć punkty zatwierdzenia?", answer: "Tak. Human-in-the-loop jest właściwym rozwiązaniem tam, gdzie kolejny krok powinien być potwierdzony." },
      { question: "Czy można ograniczyć liczbę kroków?", answer: "Tak. Limit czasu, kroków i kosztu pomaga utrzymać przewidywalność procesu." },
    ],
    related: ["integracje-ai", "automatyzacje-www", "rag-bazy-wiedzy"],
  },
  "monitoring-www": {
    slug: "monitoring-www",
    code: "CARE / MONITORING",
    eyebrow: "LEADFLOWAI / MONITORING WWW",
    title: "Monitoring stron i aplikacji: dostępność, błędy, formularze i krytyczne ścieżki.",
    lead: "Projektujemy uptime checks, synthetic tests, logi i alerty tak, aby wykryty sygnał oznaczał konkretny problem, właściciela i następny krok.",
    directAnswer: "Monitoring ma wartość wtedy, gdy wykryty problem prowadzi do działania. Ustalamy co jest krytyczne, jak często to sprawdzać, jaki próg oznacza incydent i kto otrzymuje alert. Sam status strony głównej nie wystarcza, jeśli krytycznym kanałem jest formularz lub integracja.",
    capabilities: ["Uptime", "Synthetic checks", "Error tracking", "Logs", "Alerts", "Forms", "APIs", "Runbooks"],
    outcomes: [
      { title: "Szybsze wykrycie problemu", description: "Niedostępność może zostać wykryta zanim zgłosi ją użytkownik." },
      { title: "Mniej ślepych punktów", description: "Monitorowane mogą być także formularze, endpointy i inne krytyczne kroki." },
      { title: "Alert z kontekstem", description: "Powiadomienie może wskazywać system, typ problemu i pierwszy krok diagnozy." },
    ],
    deliverables: [
      { index: "01", title: "Monitoring map", description: "Komponenty, krytyczność, częstotliwość, progi i właściciel reakcji.", tags: ["Criticality", "Thresholds", "Owner", "Checks"] },
      { index: "02", title: "Checks + telemetry", description: "Uptime, synthetic requesty, logi lub error tracking dobrane do architektury.", tags: ["Checks", "Logs", "Errors", "Telemetry"] },
      { index: "03", title: "Alert routing", description: "Kanały, priorytet, cooldown i eskalacja ograniczające zbędne alarmy.", tags: ["Alerts", "Routing", "Priority", "Escalation"] },
      { index: "04", title: "Runbooks", description: "Podstawowe kroki diagnozy, rollbacku i komunikacji dla krytycznych problemów.", tags: ["Runbook", "Rollback", "Diagnosis", "Recovery"] },
    ],
    process: [
      { title: "Critical paths", description: "Wybieramy elementy, których awaria ma realny skutek." },
      { title: "Signals", description: "Dobieramy mierzalne sygnały i progi." },
      { title: "Alerts", description: "Konfigurujemy routing i właściciela reakcji." },
      { title: "Test", description: "Sprawdzamy czy alert dochodzi i czy wiadomo jak rozpocząć diagnozę." },
      { title: "Tuning", description: "Ograniczamy fałszywe alarmy i aktualizujemy checks wraz z serwisem." },
    ],
    faqs: [
      { question: "Czy monitoring zastępuje testy?", answer: "Nie. Testy chronią przed częścią regresji przed wdrożeniem, a monitoring wykrywa problemy w działającym środowisku." },
      { question: "Czy warto monitorować formularz kontaktowy?", answer: "Tak, jeśli jest krytycznym kanałem leadów. Sama dostępność strony nie potwierdza, że formularz i jego integracja działają." },
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
