import type { SourcedKnowledgeArticle } from "@/lib/knowledge-expanded";
import { publicText } from "@/lib/public-text";

const editorialTerms: Readonly<Record<string, string>> = {
  STRATEGY: "STRATEGIA",
  ARCHITECTURE: "ARCHITEKTURA",
  WEBSITE: "STRONA WWW",
  SEARCH: "WYSZUKIWANIE",
  CONTENT: "TREŚĆ",
  PERFORMANCE: "WYDAJNOŚĆ",
  ACCESSIBILITY: "DOSTĘPNOŚĆ",
  SECURITY: "BEZPIECZEŃSTWO",
  ANALYTICS: "ANALITYKA",
  CONVERSION: "KONWERSJA",
  DESIGN: "PROJEKTOWANIE",
  PROCESS: "PROCES",
  MAINTENANCE: "UTRZYMANIE",
  MIGRATION: "MIGRACJA",
};

export function publicKnowledgeEyebrow(value: string) {
  return value
    .split("/")
    .map((part) => editorialTerms[part.trim()] ?? part.trim())
    .join(" / ");
}

export function toPublicKnowledgeArticle(article: SourcedKnowledgeArticle): SourcedKnowledgeArticle {
  return {
    ...article,
    eyebrow: publicKnowledgeEyebrow(article.eyebrow),
    title: publicText(article.title),
    description: publicText(article.description),
    summary: publicText(article.summary),
    sections: article.sections.map((section) => ({
      ...section,
      title: publicText(section.title),
      paragraphs: section.paragraphs.map(publicText),
      bullets: section.bullets?.map(publicText),
    })),
    related: article.related.map((item) => ({ ...item, label: publicText(item.label) })),
  };
}
