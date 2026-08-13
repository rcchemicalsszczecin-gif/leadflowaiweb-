import type { Metadata } from "next";
import { expandedServicePages, type ExpandedServiceSlug } from "@/lib/expanded-services";
import { site } from "@/lib/site";

export function getExpandedServiceMetadata(slug: ExpandedServiceSlug): Metadata {
  const page = expandedServicePages[slug];
  return {
    title: page.title,
    description: page.lead,
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      type: "website",
      locale: "pl_PL",
      url: `${site.url}/${page.slug}`,
      siteName: site.name,
      title: page.title,
      description: page.lead,
    },
  };
}
