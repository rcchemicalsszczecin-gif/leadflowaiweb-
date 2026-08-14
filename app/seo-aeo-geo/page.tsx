import { PublicServicePage } from "@/components/public-service-page";
import { SearchVisibilityExplainerV13 } from "@/components/search-visibility-explainer-v13";
import { getSearchMetadata, getSearchPage } from "@/lib/search-pages";
import { withV13SocialMetadata } from "@/lib/social-metadata-v13";

const basePage = getSearchPage("seo-aeo-geo");
const page = {
  ...basePage,
  eyebrow: "LEADFLOWAI / SEO + AEO + GEO · JEDNA ARCHITEKTURA",
  title: "SEO, AEO i GEO: jedna architektura widoczności, trzy jasno rozdzielone role.",
  lead:
    "SEO buduje fundament odkrywania, indeksowania i jakości strony; AEO porządkuje odpowiedzi na pytania; GEO i AI Search wzmacniają jednoznaczność encji, źródeł i dowodów. Łączymy je w jeden publiczny source of truth zamiast trzech konkurujących strategii.",
  directAnswer:
    "SEO, AEO i GEO mają różne zadania, ale powinny pracować na tej samej stronie i tej samej publicznej prawdzie. SEO odpowiada za techniczną dostępność, indeksowalność, strukturę i klasyczne sygnały wyszukiwania. AEO porządkuje bezpośrednie odpowiedzi, definicje i kontekst. GEO / AI Search porządkuje encje, źródłowość, oryginalne informacje i dowody, które system generatywny może poprawnie zinterpretować. W Google funkcje generatywnej AI nadal opierają się na podstawowych systemach Search, dlatego AEO i GEO nie zastępują SEO ani nie tworzą osobnej gwarantowanej ścieżki rankingowej.",
  capabilities: [
    "SEO techniczne",
    "SEO on-page",
    "AEO",
    "GEO / AI Search",
    "Architektura treści",
    "Encje",
    "Dane strukturalne",
    "Linkowanie wewnętrzne",
    "Publiczna prawda",
    "Pomiar Search Console",
  ],
  faqs: [
    ...basePage.faqs,
    {
      question: "Czy Google ma osobny ranking GEO lub AEO?",
      answer:
        "Google opisuje optymalizację pod funkcje generatywnej AI jako część optymalizacji Search i wskazuje, że te funkcje korzystają z podstawowych systemów rankingu i jakości wyszukiwarki. Terminy AEO i GEO są użyteczne do rozdzielenia pracy nad odpowiedziami, encjami i źródłowością, ale nie traktujemy ich jako osobnych gwarantowanych algorytmów Google.",
    },
    {
      question: "Czy da się mierzyć widoczność w AI Search zamiast zgadywać?",
      answer:
        "Tak, gdy platforma udostępnia wiarygodne dane. Google wdraża w Search Console Raport skuteczności generatywnej AI dla wybranych usług. Do czasu uzyskania takiego źródła nie deklarujemy liczby wyświetleń, cytowań ani pozycji na podstawie własnych szacunków.",
    },
  ],
};

const baseMetadata = getSearchMetadata("seo-aeo-geo");
const metaDescription =
  "SEO buduje fundament widoczności, AEO porządkuje odpowiedzi, a GEO wzmacnia encje, źródła i dowody. Jedna architektura zamiast trzech konkurujących strategii.";

export const metadata = withV13SocialMetadata(
  {
    ...baseMetadata,
    title: page.title,
    description: metaDescription,
  },
  page.title,
  metaDescription,
);

export default function SeoAeoGeoPage() {
  return (
    <>
      <PublicServicePage page={page} />
      <SearchVisibilityExplainerV13 />
    </>
  );
}
