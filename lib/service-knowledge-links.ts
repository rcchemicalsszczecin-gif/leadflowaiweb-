const SERVICE_KNOWLEDGE: Readonly<Record<string, readonly { href: string; label: string }[]>> = {
  "strony-internetowe": [
    { href: "/wiedza/jak-zaplanowac-strone-firmowa", label: "Jak zaplanować stronę firmową" },
    { href: "/wiedza/ile-kosztuje-profesjonalna-strona-internetowa", label: "Od czego zależy koszt profesjonalnej strony" },
    { href: "/wiedza/jak-wybrac-technologie-do-strony-internetowej", label: "Jak dobrać technologię do strony" },
  ],
  "landing-pages": [
    { href: "/wiedza/landing-page-jak-zaprojektowac", label: "Jak zaprojektować landing page pod jeden cel" },
    { href: "/wiedza/cro-jak-znalezc-problemy-z-konwersja", label: "Jak diagnozować problemy z konwersją" },
  ],
  "sklepy-internetowe": [
    { href: "/wiedza/architektura-sklepu-internetowego-seo-cro", label: "Architektura sklepu: SEO i droga do zakupu" },
    { href: "/wiedza/cro-jak-znalezc-problemy-z-konwersja", label: "Jak diagnozować problemy z konwersją" },
  ],
  "web-development": [
    { href: "/wiedza/jak-wybrac-technologie-do-strony-internetowej", label: "Jak dobrać technologię do strony" },
    { href: "/wiedza/integracja-api-checklista-produkcyjna", label: "Checklista produkcyjnej integracji API" },
  ],
  "modernizacja-stron": [
    { href: "/wiedza/modernizacja-strony-bez-utraty-widocznosci", label: "Modernizacja strony bez niepotrzebnej utraty widoczności" },
    { href: "/wiedza/core-web-vitals-lcp-inp-cls-praktycznie", label: "Core Web Vitals: LCP, INP i CLS w praktyce" },
  ],
  "audyt-strony": [
    { href: "/wiedza/core-web-vitals-lcp-inp-cls-praktycznie", label: "Core Web Vitals: LCP, INP i CLS w praktyce" },
    { href: "/wiedza/wcag-22-co-sprawdzic-na-stronie", label: "WCAG 2.2 — co sprawdzić na stronie" },
    { href: "/wiedza/bezpieczenstwo-strony-powierzchnia-ataku", label: "Jak rozpoznać powierzchnię ataku strony" },
  ],
  "strony-3d-webgl": [
    { href: "/wiedza/jak-wybrac-technologie-do-strony-internetowej", label: "Jak dobrać technologię do strony" },
    { href: "/wiedza/core-web-vitals-lcp-inp-cls-praktycznie", label: "Core Web Vitals: LCP, INP i CLS w praktyce" },
  ],
  "interaktywne-strony": [
    { href: "/wiedza/jak-wybrac-technologie-do-strony-internetowej", label: "Jak dobrać technologię do strony" },
    { href: "/wiedza/cro-jak-znalezc-problemy-z-konwersja", label: "Jak diagnozować problemy z konwersją" },
  ],
  "motion-design": [
    { href: "/wiedza/core-web-vitals-lcp-inp-cls-praktycznie", label: "Core Web Vitals: LCP, INP i CLS w praktyce" },
    { href: "/wiedza/wcag-22-co-sprawdzic-na-stronie", label: "WCAG 2.2 — co sprawdzić na stronie" },
  ],
  "ux-ui-design": [
    { href: "/wiedza/jak-zaplanowac-strone-firmowa", label: "Jak zaplanować stronę firmową" },
    { href: "/wiedza/cro-jak-znalezc-problemy-z-konwersja", label: "Jak diagnozować problemy z konwersją" },
  ],
  "copywriting-content": [
    { href: "/wiedza/architektura-tresci-klastry-tematyczne", label: "Jak budować klastry tematyczne bez kanibalizacji" },
    { href: "/wiedza/seo-aeo-geo-jedna-architektura", label: "SEO, AEO i GEO jako jedna architektura" },
  ],
  seo: [
    { href: "/wiedza/seo-aeo-geo-jedna-architektura", label: "SEO, AEO i GEO jako jedna architektura" },
    { href: "/wiedza/structured-data-kiedy-schema-ma-sens", label: "Kiedy structured data i schema.org mają sens" },
    { href: "/wiedza/ai-search-google-co-robic-2026", label: "AI Search i Google — co robić w 2026" },
  ],
  aeo: [
    { href: "/wiedza/seo-aeo-geo-jedna-architektura", label: "SEO, AEO i GEO jako jedna architektura" },
    { href: "/wiedza/ai-search-google-co-robic-2026", label: "AI Search i Google — co robić w 2026" },
  ],
  "geo-ai-search": [
    { href: "/wiedza/seo-aeo-geo-jedna-architektura", label: "SEO, AEO i GEO jako jedna architektura" },
    { href: "/wiedza/ai-search-google-co-robic-2026", label: "AI Search i Google — co robić w 2026" },
    { href: "/wiedza/structured-data-kiedy-schema-ma-sens", label: "Kiedy structured data i schema.org mają sens" },
  ],
  "seo-aeo-geo": [
    { href: "/wiedza/seo-aeo-geo-jedna-architektura", label: "SEO, AEO i GEO jako jedna architektura" },
    { href: "/wiedza/ai-search-google-co-robic-2026", label: "AI Search i Google — co robić w 2026" },
    { href: "/wiedza/structured-data-kiedy-schema-ma-sens", label: "Kiedy structured data i schema.org mają sens" },
  ],
  "local-seo": [
    { href: "/wiedza/seo-aeo-geo-jedna-architektura", label: "SEO, AEO i GEO jako jedna architektura" },
    { href: "/wiedza/architektura-tresci-klastry-tematyczne", label: "Jak budować klastry tematyczne bez kanibalizacji" },
  ],
  "cro-optymalizacja-konwersji": [
    { href: "/wiedza/cro-jak-znalezc-problemy-z-konwersja", label: "Jak diagnozować problemy z konwersją" },
    { href: "/wiedza/plan-pomiaru-analityka-strony", label: "Jak zbudować plan pomiaru strony" },
  ],
  "analityka-webowa": [
    { href: "/wiedza/plan-pomiaru-analityka-strony", label: "Jak zbudować plan pomiaru strony" },
    { href: "/wiedza/cro-jak-znalezc-problemy-z-konwersja", label: "Jak diagnozować problemy z konwersją" },
  ],
  "formularze-lead-generation": [
    { href: "/wiedza/automatyzacja-formularz-crm-workflow", label: "Jak połączyć formularz, automatyzację i CRM" },
    { href: "/wiedza/plan-pomiaru-analityka-strony", label: "Jak zbudować plan pomiaru strony" },
  ],
  "chatboty-ai": [
    { href: "/wiedza/chatbot-na-stronie-kiedy-ma-sens", label: "Kiedy chatbot na stronie ma sens" },
    { href: "/wiedza/rag-na-stronie-jak-zaprojektowac", label: "Jak zaprojektować RAG na stronie" },
  ],
  "rag-bazy-wiedzy": [
    { href: "/wiedza/rag-na-stronie-jak-zaprojektowac", label: "Jak zaprojektować RAG na stronie" },
    { href: "/wiedza/chatbot-na-stronie-kiedy-ma-sens", label: "Kiedy chatbot na stronie ma sens" },
  ],
  "agenci-ai-www": [
    { href: "/wiedza/rag-na-stronie-jak-zaprojektowac", label: "Jak zaprojektować RAG na stronie" },
    { href: "/wiedza/integracja-api-checklista-produkcyjna", label: "Checklista produkcyjnej integracji API" },
  ],
  "integracje-ai": [
    { href: "/wiedza/rag-na-stronie-jak-zaprojektowac", label: "Jak zaprojektować RAG na stronie" },
    { href: "/wiedza/integracja-api-checklista-produkcyjna", label: "Checklista produkcyjnej integracji API" },
  ],
  "integracje-api": [
    { href: "/wiedza/integracja-api-checklista-produkcyjna", label: "Checklista produkcyjnej integracji API" },
    { href: "/wiedza/automatyzacja-formularz-crm-workflow", label: "Jak połączyć formularz, automatyzację i CRM" },
  ],
  "automatyzacje-www": [
    { href: "/wiedza/automatyzacja-formularz-crm-workflow", label: "Jak połączyć formularz, automatyzację i CRM" },
    { href: "/wiedza/integracja-api-checklista-produkcyjna", label: "Checklista produkcyjnej integracji API" },
  ],
  "aplikacje-webowe": [
    { href: "/wiedza/jak-wybrac-technologie-do-strony-internetowej", label: "Jak dobrać technologię do strony" },
    { href: "/wiedza/integracja-api-checklista-produkcyjna", label: "Checklista produkcyjnej integracji API" },
  ],
  "cms-headless": [
    { href: "/wiedza/cms-czy-headless-cms", label: "Kiedy CMS, headless CMS lub brak CMS ma sens" },
    { href: "/wiedza/architektura-tresci-klastry-tematyczne", label: "Jak budować klastry tematyczne bez kanibalizacji" },
  ],
  pwa: [
    { href: "/wiedza/jak-wybrac-technologie-do-strony-internetowej", label: "Jak dobrać technologię do strony" },
    { href: "/wiedza/core-web-vitals-lcp-inp-cls-praktycznie", label: "Core Web Vitals: LCP, INP i CLS w praktyce" },
  ],
  "strony-wielojezyczne": [
    { href: "/wiedza/strona-wielojezyczna-hreflang-seo", label: "Routing, hreflang i canonical strony wielojęzycznej" },
    { href: "/wiedza/architektura-tresci-klastry-tematyczne", label: "Jak budować klastry tematyczne bez kanibalizacji" },
  ],
  "core-web-vitals": [
    { href: "/wiedza/core-web-vitals-lcp-inp-cls-praktycznie", label: "Core Web Vitals: LCP, INP i CLS w praktyce" },
  ],
  "dostepnosc-wcag": [
    { href: "/wiedza/wcag-22-co-sprawdzic-na-stronie", label: "WCAG 2.2 — co sprawdzić na stronie" },
  ],
  "bezpieczenstwo-stron": [
    { href: "/wiedza/bezpieczenstwo-strony-powierzchnia-ataku", label: "Jak rozpoznać powierzchnię ataku strony" },
  ],
  "hosting-deploy": [
    { href: "/wiedza/bezpieczenstwo-strony-powierzchnia-ataku", label: "Jak rozpoznać powierzchnię ataku strony" },
    { href: "/wiedza/core-web-vitals-lcp-inp-cls-praktycznie", label: "Core Web Vitals: LCP, INP i CLS w praktyce" },
  ],
  "opieka-utrzymanie-stron": [
    { href: "/wiedza/bezpieczenstwo-strony-powierzchnia-ataku", label: "Jak rozpoznać powierzchnię ataku strony" },
    { href: "/wiedza/core-web-vitals-lcp-inp-cls-praktycznie", label: "Core Web Vitals: LCP, INP i CLS w praktyce" },
  ],
  "monitoring-www": [
    { href: "/wiedza/plan-pomiaru-analityka-strony", label: "Jak zbudować plan pomiaru strony" },
    { href: "/wiedza/core-web-vitals-lcp-inp-cls-praktycznie", label: "Core Web Vitals: LCP, INP i CLS w praktyce" },
  ],
};

export function getServiceKnowledgeLinks(slug: string) {
  return SERVICE_KNOWLEDGE[slug] ?? [];
}
