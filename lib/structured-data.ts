import type { KnowledgeArticle } from "@/lib/knowledge";
import { knowledgeEditorialV13 } from "@/lib/knowledge-editorial-v13";
import type { ServicePageData } from "@/lib/services";
import { site } from "@/lib/site";

const organizationId = `${site.url}/#organization`;
const websiteId = `${site.url}/#website`;

type StructuredKnowledgeArticle = KnowledgeArticle & {
  reviewedAt?: string;
};

export function getGlobalStructuredData(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: site.legalName,
        url: site.url,
        email: site.email,
        brand: {
          "@type": "Brand",
          name: site.name,
          url: site.url,
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: site.url,
        name: site.name,
        inLanguage: "pl-PL",
        publisher: { "@id": organizationId },
      },
    ],
  };
}

export function getPageStructuredData(page: ServicePageData): Record<string, unknown> {
  const url = `${site.url}/${page.slug}`;
  const serviceId = `${url}#service`;
  const webPageId = `${url}#webpage`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": webPageId,
        url,
        name: page.title,
        description: page.lead,
        inLanguage: "pl-PL",
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": serviceId },
        about: { "@id": serviceId },
      },
      {
        "@type": "Service",
        "@id": serviceId,
        name: page.title,
        serviceType: page.title,
        description: page.directAnswer,
        url,
        provider: { "@id": organizationId },
        areaServed: {
          "@type": "Country",
          name: "Polska",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: site.name,
            item: site.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: page.title,
            item: url,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };
}

export function getArticleStructuredData(article: StructuredKnowledgeArticle): Record<string, unknown> {
  const url = `${site.url}/wiedza/${article.slug}`;
  const webPageId = `${url}#webpage`;
  const articleId = `${url}#article`;
  const dateModified = article.reviewedAt ?? knowledgeEditorialV13.reviewedAt;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": webPageId,
        url,
        name: article.title,
        description: article.description,
        inLanguage: "pl-PL",
        dateModified,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": articleId },
      },
      {
        "@type": "Article",
        "@id": articleId,
        headline: article.title,
        description: article.description,
        url,
        inLanguage: "pl-PL",
        dateModified,
        mainEntityOfPage: { "@id": webPageId },
        author: { "@id": organizationId },
        publisher: { "@id": organizationId },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: site.name,
            item: site.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Wiedza",
            item: `${site.url}/wiedza`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
            item: url,
          },
        ],
      },
    ],
  };
}
