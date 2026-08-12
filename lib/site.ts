export const site = {
  name: "Averiq",
  legalName: "Tervyxa Systems sp. z o.o.",
  url: "https://leadflowai.pl",
  email: "kontakt@tervyxa.pl",
  description:
    "Averiq projektuje i buduje profesjonalne strony internetowe z SEO, AEO, GEO / AI Search, CRO, chatbotami i integracjami WWW.",
} as const;

export const navigation = [
  { href: "#create", label: "WWW" },
  { href: "#discover", label: "SEO · AEO · GEO" },
  { href: "#intelligence", label: "Chatboty" },
  { href: "#process", label: "Proces" },
] as const;

export const systemStages = [
  {
    id: "01",
    key: "CREATE",
    title: "Projektujemy i budujemy.",
    description:
      "Strony firmowe, landing pages, e-commerce, redesign i custom web development — od architektury informacji po produkcyjny kod.",
    tags: ["UX/UI", "Responsive", "Development", "CMS"],
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
    tags: ["CRO", "Leads", "Analytics", "Forms"],
  },
  {
    id: "04",
    key: "INTELLIGENCE",
    title: "Dodajemy inteligencję tam, gdzie ma sens.",
    description:
      "Chatbot może odpowiadać na pytania, kwalifikować zapytania i kierować użytkownika do właściwej usługi bez zasłaniania strony.",
    tags: ["AI Chatbot", "RAG", "Qualification", "FAQ"],
  },
  {
    id: "05",
    key: "CONNECT",
    title: "Łączymy stronę z biznesem.",
    description:
      "Formularze, CRM, e-mail, kalendarze, API i automatyzacje mogą tworzyć jeden kontrolowany przepływ danych.",
    tags: ["CRM", "API", "Webhooks", "Automation"],
  },
  {
    id: "06",
    key: "CARE",
    title: "Utrzymujemy i rozwijamy.",
    description:
      "Monitoring, bezpieczeństwo, performance, backupy i dalszy rozwój widoczności pozwalają stronie pracować także po publikacji.",
    tags: ["Monitoring", "Security", "CWV", "Maintenance"],
  },
] as const;
