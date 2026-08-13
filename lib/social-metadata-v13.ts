import type { Metadata } from "next";
import { site } from "@/lib/site";

export function withV13SocialMetadata(metadata: Metadata, title: string, description: string): Metadata {
  return {
    ...metadata,
    openGraph: {
      ...(metadata.openGraph ?? {}),
      title,
      description,
      images: [{ url: `${site.url}/og-leadflowai.svg`, width: 1200, height: 630, alt: `${site.name} — ${title}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${site.url}/og-leadflowai.svg`],
    },
  };
}
