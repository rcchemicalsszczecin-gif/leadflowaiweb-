import { publicLabel } from "@/lib/public-language";
import { publicText } from "@/lib/public-text";
import type { ServicePageData } from "@/lib/services";

export function toPublicServicePage(page: ServicePageData): ServicePageData {
  return {
    ...page,
    eyebrow: publicText(page.eyebrow),
    title: publicText(page.title),
    lead: publicText(page.lead),
    directAnswer: publicText(page.directAnswer),
    capabilities: page.capabilities.map(publicLabel),
    outcomes: page.outcomes.map((item) => ({
      title: publicText(item.title),
      description: publicText(item.description),
    })),
    deliverables: page.deliverables.map((item) => ({
      ...item,
      title: publicLabel(publicText(item.title)),
      description: publicText(item.description),
      tags: item.tags.map(publicLabel),
    })),
    process: page.process.map((item) => ({
      title: publicLabel(publicText(item.title)),
      description: publicText(item.description),
    })),
    faqs: page.faqs.map((item) => ({
      question: publicText(item.question),
      answer: publicText(item.answer),
    })),
  };
}
