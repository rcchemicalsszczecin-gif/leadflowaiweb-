import { expandedKnowledgeArticles, type SourcedKnowledgeArticle } from "@/lib/knowledge-expanded";
import { knowledgeArticles as coreKnowledgeArticles } from "@/lib/knowledge";
import {
  applyV15KnowledgeOverride,
  type V15KnowledgeArticle,
} from "@/lib/knowledge-v15-overrides";

export const knowledgeArticles = [
  ...coreKnowledgeArticles,
  ...expandedKnowledgeArticles,
] as readonly SourcedKnowledgeArticle[];

export type KnowledgeSlug = (typeof knowledgeArticles)[number]["slug"];

export function getKnowledgeArticle(slug: string): V15KnowledgeArticle | undefined {
  const article = knowledgeArticles.find((candidate) => candidate.slug === slug);
  return article ? applyV15KnowledgeOverride(article) : undefined;
}
