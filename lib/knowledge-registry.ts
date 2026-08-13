import { expandedKnowledgeArticles, type SourcedKnowledgeArticle } from "@/lib/knowledge-expanded";
import { knowledgeArticles as coreKnowledgeArticles } from "@/lib/knowledge";

export const knowledgeArticles = [
  ...coreKnowledgeArticles,
  ...expandedKnowledgeArticles,
] as readonly SourcedKnowledgeArticle[];

export type KnowledgeSlug = (typeof knowledgeArticles)[number]["slug"];

export function getKnowledgeArticle(slug: string): SourcedKnowledgeArticle | undefined {
  return knowledgeArticles.find((article) => article.slug === slug);
}
