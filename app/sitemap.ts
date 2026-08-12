import type { MetadataRoute } from "next";
import { knowledgeArticles } from "@/lib/knowledge";
import { searchServiceLinks } from "@/lib/search-pages";
import { coreServiceLinks } from "@/lib/services";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "kontakt",
    "realizacje",
    "wiedza",
    ...coreServiceLinks.map((item) => item.slug),
    ...searchServiceLinks.map((item) => item.slug),
    ...knowledgeArticles.map((article) => `wiedza/${article.slug}`),
  ];

  return routes.map((route) => ({
    url: route ? `${site.url}/${route}` : site.url,
    changeFrequency: route === "" ? "weekly" : route.startsWith("wiedza/") ? "yearly" : "monthly",
    priority: route === "" ? 1 : route === "kontakt" ? 0.7 : route.startsWith("wiedza/") ? 0.65 : 0.8,
  }));
}
