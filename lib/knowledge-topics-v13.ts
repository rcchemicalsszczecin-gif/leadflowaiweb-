export const knowledgeTopicsV13 = [
  {
    key: "WWW",
    label: "STRONY WWW I ARCHITEKTURA",
    description: "Planowanie strony, technologia, modernizacja, sklepy, landing pages, CMS i wielojęzyczność.",
    slugs: [
      "jak-zaplanowac-strone-firmowa",
      "ile-kosztuje-profesjonalna-strona-internetowa",
      "jak-wybrac-technologie-do-strony-internetowej",
      "modernizacja-strony-bez-utraty-widocznosci",
      "landing-page-jak-zaprojektowac",
      "architektura-sklepu-internetowego-seo-cro",
      "cms-czy-headless-cms",
      "strona-wielojezyczna-hreflang-seo",
    ],
  },
  {
    key: "SEARCH",
    label: "SEO, AEO, GEO I TREŚĆ",
    description: "Widoczność, generatywne wyszukiwanie, dane strukturalne, klastry tematyczne i migracje.",
    slugs: [
      "seo-aeo-geo-jedna-architektura",
      "ai-search-google-co-robic-2026",
      "structured-data-kiedy-schema-ma-sens",
      "architektura-tresci-klastry-tematyczne",
    ],
  },
  {
    key: "CONVERSION",
    label: "KONWERSJA I POMIAR",
    description: "CRO, analityka, formularze i projektowanie ścieżek prowadzących do mierzalnego działania.",
    slugs: [
      "cro-jak-znalezc-problemy-z-konwersja",
      "plan-pomiaru-analityka-strony",
      "automatyzacja-formularz-crm-workflow",
    ],
  },
  {
    key: "AI",
    label: "AI, RAG I INTEGRACJE",
    description: "Chatboty, RAG, integracje API i bezpieczne granice automatyzacji.",
    slugs: [
      "chatbot-na-stronie-kiedy-ma-sens",
      "rag-na-stronie-jak-zaprojektowac",
      "integracja-api-checklista-produkcyjna",
    ],
  },
  {
    key: "QUALITY",
    label: "JAKOŚĆ TECHNICZNA",
    description: "Core Web Vitals, dostępność WCAG, bezpieczeństwo i utrzymanie niezawodnej strony.",
    slugs: [
      "core-web-vitals-lcp-inp-cls-praktycznie",
      "wcag-22-co-sprawdzic-na-stronie",
      "bezpieczenstwo-strony-powierzchnia-ataku",
    ],
  },
] as const;

export function getKnowledgeTopic(slug: string) {
  return knowledgeTopicsV13.find((topic) => topic.slugs.some((item) => item === slug));
}
