import {
  experienceServices,
  experienceServiceLinks,
  type ExperienceServiceSlug,
} from "@/lib/experience-services";
import {
  expandedServiceLinks,
  expandedServicePages,
  type ExpandedServiceSlug,
} from "@/lib/expanded-services";
import { searchPages, searchServiceLinks, type SearchSlug } from "@/lib/search-pages";
import { coreServiceLinks, servicePages, type ServiceSlug } from "@/lib/services";

export type PublicPageSlug = ServiceSlug | SearchSlug | ExperienceServiceSlug | ExpandedServiceSlug;

export function getPublicPage(slug: string) {
  if (slug in servicePages) {
    return servicePages[slug as ServiceSlug];
  }
  if (slug in searchPages) {
    return searchPages[slug as SearchSlug];
  }
  if (slug in experienceServices) {
    return experienceServices[slug as ExperienceServiceSlug];
  }
  if (slug in expandedServicePages) {
    return expandedServicePages[slug as ExpandedServiceSlug];
  }
  return undefined;
}

export const primaryPublicLinks = [...coreServiceLinks, ...searchServiceLinks] as const;
export const allPublicServiceLinks = [
  ...coreServiceLinks,
  ...experienceServiceLinks,
  ...searchServiceLinks,
  ...expandedServiceLinks,
] as const;
