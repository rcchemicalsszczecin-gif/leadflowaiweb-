export const site = {
  name: "LeadFlowAI",
  legalName: "Tervyxa Systems sp. z o.o.",
  url: "https://leadflowai.pl",
  email: "kontakt@leadflowai.pl",
  description:
    "LeadFlowAI projektuje i buduje profesjonalne strony internetowe, interaktywne doświadczenia 3D/WebGL, SEO, AEO, GEO / AI Search, CRO, chatboty i integracje WWW.",
} as const;

export const navigation = [
  { href: "/uslugi", label: "Usługi" },
  { href: "/realizacje", label: "Realizacje" },
  { href: "/wiedza", label: "Wiedza" },
  { href: "/o-nas", label: "O nas" },
  { href: "/lab", label: "Demo" },
  { href: "/#process", label: "Jak pracujemy" },
] as const;

export const systemStages = [
  {
    id: "01",
    key: "CREATE",
    title: "Projektujemy i budujemy.",
    description:
      "Strony firmowe, landing pages, e-commerce, interaktywne WWW, 3D/WebGL, redesign i dedykowane systemy internetowe — od architektury informacji po produkcyjny kod.",
    tags: ["UX/UI", "Responsywność", "Wdrożenie", "3D / WebGL"],
  },
  {
    id: "02",
    key: "DISCOVER",
    title: "Budujemy widoczność od fundamentów.",
    description:
      "Techniczne SEO, AEO i GEO / AI Search projektujemy razem ze strukturą strony, zamiast doklejać je po wdrożeniu.",
    tags: ["SEO", "AEO", "GEO", "Schema"],
  },
  {
    id: "03",
    key: "CONVERT",
    title: "Projektujemy drogę do kontaktu.",
    description:
      "CTA, formularze, hierarchia treści i analityka tworzą mierzalny system konwersji zamiast przypadkowego zestawu sekcji.",
    tags: ["CRO", "Zapytania", "Analityka", "Formularze"],
  },
  {
    id: "04",
    key: "INTELLIGENCE",
    title: "Dodajemy inteligencję tam, gdzie ma sens.",
    description:
      "Chatbot może odpowiadać na pytania, kwalifikować zapytania i kierować użytkownika do właściwej usługi bez zasłaniania strony.",
    tags: ["Chatbot AI", "RAG", "Kwalifikacja", "FAQ"],
  },
  {
    id: "05",
    key: "CONNECT",
    title: "Łączymy stronę z biznesem.",
    description:
      "Formularze, CRM, e-mail, kalendarze, API i automatyzacje mogą tworzyć jeden kontrolowany przepływ danych.",
    tags: ["CRM", "API", "Webhooki", "Automatyzacja"],
  },
  {
    id: "06",
    key: "CARE",
    title: "Utrzymujemy i rozwijamy.",
    description:
      "Monitoring, bezpieczeństwo, wydajność, kopie zapasowe i dalszy rozwój widoczności pozwalają stronie pracować także po publikacji.",
    tags: ["Monitoring", "Bezpieczeństwo", "CWV", "Utrzymanie"],
  },
] as const;
