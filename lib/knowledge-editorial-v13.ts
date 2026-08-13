import type { KnowledgeSource } from "@/lib/knowledge-expanded";

export const knowledgeEditorialV13 = {
  editor: "Redakcja LeadFlowAI / Tervyxa Systems",
  reviewedAt: "2026-08-13",
  reviewedLabel: "13.08.2026",
} as const;

const supplementalSources: Readonly<Record<string, readonly KnowledgeSource[]>> = {
  "seo-aeo-geo-jedna-architektura": [
    { label: "Google Search Central — funkcje AI a witryna", href: "https://developers.google.com/search/docs/appearance/ai-features?hl=pl" },
    { label: "Google Search Central — wprowadzenie do structured data", href: "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data" },
  ],
  "modernizacja-strony-bez-utraty-widocznosci": [
    { label: "Google Search Central — migracja witryny ze zmianą URL", href: "https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes" },
  ],
  "architektura-sklepu-internetowego-seo-cro": [
    { label: "Google Search Central — SEO dla e-commerce", href: "https://developers.google.com/search/docs/specialty/ecommerce" },
    { label: "Google Search Central — struktura serwisu e-commerce", href: "https://developers.google.com/search/docs/specialty/ecommerce/help-google-understand-your-ecommerce-site-structure" },
  ],
  "rag-na-stronie-jak-zaprojektowac": [
    { label: "Lewis et al. — Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks", href: "https://arxiv.org/abs/2005.11401" },
  ],
  "integracja-api-checklista-produkcyjna": [
    { label: "RFC 9110 — HTTP Semantics", href: "https://www.rfc-editor.org/rfc/rfc9110.html" },
  ],
  "bezpieczenstwo-strony-powierzchnia-ataku": [
    { label: "OWASP — Application Security Verification Standard", href: "https://owasp.org/www-project-application-security-verification-standard/" },
  ],
  "strona-wielojezyczna-hreflang-seo": [
    { label: "Google Search Central — witryny wielojęzyczne i wieloregionalne", href: "https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites" },
  ],
  "automatyzacja-formularz-crm-workflow": [
    { label: "RFC 9110 — HTTP Semantics", href: "https://www.rfc-editor.org/rfc/rfc9110.html" },
  ],
};

export function mergeKnowledgeSources(slug: string, current?: readonly KnowledgeSource[]) {
  const merged = [...(current ?? []), ...(supplementalSources[slug] ?? [])];
  return merged.filter((source, index) => merged.findIndex((item) => item.href === source.href) === index);
}

export function getKnowledgeMethodology(hasSources: boolean) {
  return hasSources
    ? "Materiał redakcyjny LeadFlowAI. Twierdzenia techniczne zweryfikowano na podstawie źródeł wskazanych poniżej; wnioski projektowe pozostają metodologią LeadFlowAI."
    : "Materiał metodologiczny LeadFlowAI oparty na praktyce projektowej i jawnych założeniach. Nie jest niezależnym badaniem ani gwarancją wyniku.";
}
