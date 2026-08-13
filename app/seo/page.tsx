import { ServicePage } from "@/components/service-page";
import { getSearchMetadata, getSearchPage } from "@/lib/search-pages";

const seoPage = {
  ...getSearchPage("seo"),
  eyebrow: "LEADFLOWAI / SEO STRON INTERNETOWYCH",
  title: "SEO dla stron internetowych od fundamentów technicznych i architektury treści.",
  lead: "Projektujemy indeksowanie, semantykę, linkowanie wewnętrzne, metadane, wydajność i strukturę treści tak, aby wyszukiwarka mogła poprawnie znaleźć i zrozumieć serwis.",
  directAnswer: "SEO tej strony koncentruje się na klasycznej widoczności organicznej: poprawnym indeksowaniu, strukturze informacji, sygnałach strony i jakości technicznej. AEO, GEO oraz SEO lokalne mają osobne strony i rozwijają inne intencje zamiast kopiować ten sam zakres.",
  capabilities: ["SEO techniczne", "Indeksowanie", "Architektura treści", "Linkowanie wewnętrzne", "Metadane", "Core Web Vitals", "Semantyczny HTML"],
};

export const metadata = {
  ...getSearchMetadata("seo"),
  title: seoPage.title,
  description: seoPage.lead,
};

export default function SeoPage() {
  return <ServicePage page={seoPage} />;
}
