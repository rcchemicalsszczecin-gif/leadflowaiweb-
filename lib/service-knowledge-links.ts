const SERVICE_KNOWLEDGE: Readonly<Record<string, readonly { href: string; label: string }[]>> = {
  "strony-internetowe": [
    { href: "/wiedza/jak-zaplanowac-strone-firmowa", label: "Jak zaplanować stronę firmową" },
    { href: "/wiedza/seo-aeo-geo-jedna-architektura", label: "SEO, AEO i GEO jako jedna architektura" },
  ],
  seo: [
    { href: "/wiedza/seo-aeo-geo-jedna-architektura", label: "SEO, AEO i GEO jako jedna architektura" },
    { href: "/wiedza/ai-search-google-co-robic-2026", label: "AI Search i Google — co robić w 2026" },
  ],
  aeo: [
    { href: "/wiedza/seo-aeo-geo-jedna-architektura", label: "SEO, AEO i GEO jako jedna architektura" },
  ],
  "geo-ai-search": [
    { href: "/wiedza/seo-aeo-geo-jedna-architektura", label: "SEO, AEO i GEO jako jedna architektura" },
    { href: "/wiedza/ai-search-google-co-robic-2026", label: "AI Search i Google — co robić w 2026" },
  ],
  "seo-aeo-geo": [
    { href: "/wiedza/seo-aeo-geo-jedna-architektura", label: "SEO, AEO i GEO jako jedna architektura" },
    { href: "/wiedza/ai-search-google-co-robic-2026", label: "AI Search i Google — co robić w 2026" },
  ],
  "chatboty-ai": [
    { href: "/wiedza/chatbot-na-stronie-kiedy-ma-sens", label: "Kiedy chatbot na stronie ma sens" },
    { href: "/wiedza/rag-na-stronie-jak-zaprojektowac", label: "Jak zaprojektować RAG na stronie" },
  ],
  "rag-bazy-wiedzy": [
    { href: "/wiedza/rag-na-stronie-jak-zaprojektowac", label: "Jak zaprojektować RAG na stronie" },
  ],
  "core-web-vitals": [
    { href: "/wiedza/core-web-vitals-co-poprawiac", label: "Core Web Vitals — co warto poprawiać" },
  ],
  "dostepnosc-wcag": [
    { href: "/wiedza/wcag-22-co-sprawdzic-na-stronie", label: "WCAG 2.2 — co sprawdzić na stronie" },
  ],
};

export function getServiceKnowledgeLinks(slug: string) {
  return SERVICE_KNOWLEDGE[slug] ?? [];
}
