import { publicLabel } from "@/lib/public-language";
import type { ServicePageData } from "@/lib/services";

export function toPublicServicePage(page: ServicePageData): ServicePageData {
  return {
    ...page,
    capabilities: page.capabilities.map(publicLabel),
    deliverables: page.deliverables.map((item) => ({
      ...item,
      tags: item.tags.map(publicLabel),
    })),
    process: page.process.map((item) => ({
      ...item,
      title: publicLabel(item.title),
    })),
  };
}
