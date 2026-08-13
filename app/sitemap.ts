import type { MetadataRoute } from "next";
import { experienceServiceLinks } from "@/lib/experience-services";
import { expandedServiceLinks } from "@/lib/expanded-services";
import { knowledgeArticles } from "@/lib/knowledge";
import { searchServiceLinks } from "@/lib/search-pages";
import { coreServiceLinks } from "@/lib/services";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "uslugi",
    "kontakt",
    "realizacje",
    "wiedza",
    "lab",
    ...coreServiceLinks.map((item) => item.slug),
    ...experienceServiceLinks.map((item) => item.slug),
    ...searchServiceLinks.map((item) => item.slug),
    ...expandedServiceLinks.map((item) => item.slug),
    ...knowledgeArticles.map((article) => `wiedza/${article.slug}`),
  ];

  return routes.map((route) => ({
    url: route ? `${site.url}/${route}` : site.url,
    changeFrequency: route === "" ? "weekly" : route === "lab" ? "monthly" : route.startsWith("wiedza/") ? "yearly" : "monthly",
    priority: route === "" ? 1 : route === "uslugi" ? 0.9 : route === "kontakt" ? 0.7 : route === "lab" ? 0.85 : route.startsWith("wiedza/") ? 0.65 : 0.8,
  }));
}
