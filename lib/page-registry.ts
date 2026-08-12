import { coreServiceLinks, servicePages, type ServiceSlug } from "@/lib/services";
import { searchPages, searchServiceLinks, type SearchSlug } from "@/lib/search-pages";

export type PublicPageSlug = ServiceSlug | SearchSlug;

export function getPublicPage(slug: string) {
  if (slug in servicePages) {
    return servicePages[slug as ServiceSlug];
  }
  if (slug in searchPages) {
    return searchPages[slug as SearchSlug];
  }
  return undefined;
}

export const primaryPublicLinks = [...coreServiceLinks, ...searchServiceLinks] as const;
