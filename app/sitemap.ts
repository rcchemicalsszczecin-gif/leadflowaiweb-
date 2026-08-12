import type { MetadataRoute } from "next";
import { searchServiceLinks } from "@/lib/search-pages";
import { coreServiceLinks } from "@/lib/services";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "kontakt",
    ...coreServiceLinks.map((item) => item.slug),
    ...searchServiceLinks.map((item) => item.slug),
  ];

  return routes.map((route) => ({
    url: route ? `${site.url}/${route}` : site.url,
    changeFrequency: route ? "monthly" : "weekly",
    priority: route === "" ? 1 : route === "kontakt" ? 0.7 : 0.8,
  }));
}
