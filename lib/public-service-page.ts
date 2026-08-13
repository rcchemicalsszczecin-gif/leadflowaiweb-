import { publicLabel } from "@/lib/public-language";
import { publicText } from "@/lib/public-text";
import type { ServicePageData } from "@/lib/services";

const publicTaxonomy = (value: string) => publicLabel(publicText(value));

export function toPublicServicePage(page: ServicePageData): ServicePageData {
  return {
    ...page,
    eyebrow: publicText(page.eyebrow),
    title: publicText(page.title),
    lead: publicText(page.lead),
    directAnswer: publicText(page.directAnswer),
    capabilities: page.capabilities.map(publicTaxonomy),
    outcomes: page.outcomes.map((item) => ({
      title: publicText(item.title),
      description: publicText(item.description),
    })),
    deliverables: page.deliverables.map((item) => ({
      ...item,
      title: publicTaxonomy(item.title),
      description: publicText(item.description),
      tags: item.tags.map(publicTaxonomy),
    })),
    process: page.process.map((item) => ({
      title: publicTaxonomy(item.title),
      description: publicText(item.description),
    })),
    faqs: page.faqs.map((item) => ({
      question: publicText(item.question),
      answer: publicText(item.answer),
    })),
  };
}
