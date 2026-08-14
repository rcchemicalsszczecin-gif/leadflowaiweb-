import { PublicServicePage } from "@/components/public-service-page";
import { getSearchMetadata, getSearchPage } from "@/lib/search-pages";
import { withV13SocialMetadata } from "@/lib/social-metadata-v13";

const basePage = getSearchPage("geo-ai-search");
const page = {
  ...basePage,
  eyebrow: "LEADFLOWAI / GEO · AI SEARCH · ŹRÓDŁA",
  title: "GEO i AI Search: źródłowa architektura informacji bez obietnic cytowania przez AI.",
  lead:
    "Porządkujemy encje, publiczne fakty, dowody, relacje usług i treści eksperckie tak, aby firma była opisana jako jedno spójne źródło. Dla Google fundamentem generatywnego AI Search nadal jest klasyczne SEO i indeks wyszukiwarki — bez specjalnego schema czy pliku llms.txt.",
  directAnswer:
    "GEO w LeadFlowAI oznacza gotowość źródłową: jednoznaczną tożsamość marki i operatora, spójne fakty, oryginalne informacje, sensowne linkowanie oraz dane strukturalne zgodne z widoczną treścią. Nie traktujemy GEO jako osobnego algorytmu ani sposobu na kupienie cytowania. Google wprost wskazuje, że jego funkcje generatywnej AI opierają się na podstawowych systemach rankingu i jakości Search, nie wymagają specjalnego schema ani pliku llms.txt, a indeksowanie i wyświetlanie nie są gwarantowane.",
  faqs: [
    ...basePage.faqs,
    {
      question: "Czy Google wymaga llms.txt albo specjalnego schema do AI Search?",
      answer:
        "Nie. Aktualny przewodnik Google mówi, że do widoczności w Google Search, także w funkcjach generatywnej AI, nie jest potrzebny llms.txt ani specjalny markup AI. Standardowe structured data nadal mają sens wtedy, gdy poprawnie opisują widoczną treść i wspierają normalne funkcje wyszukiwarki.",
    },
    {
      question: "Jak mierzyć widoczność strony w generatywnej AI Google?",
      answer:
        "Jeżeli dana usługa Search Console ma dostęp do Raportu skuteczności generatywnej AI, można w nim obserwować wyświetlenia w AI Overviews i AI Mode oraz analizować strony, urządzenia i kraje. Raport jest wdrażany etapami, więc jego brak nie powinien być zastępowany szacunkami ani zewnętrzną 'tajną metryką'.",
    },
  ],
};

const baseMetadata = getSearchMetadata("geo-ai-search");
const metaDescription =
  "GEO i AI Search: encje, publiczne fakty, dowody i źródłowa treść. Dla Google fundamentem pozostaje SEO — bez llms.txt, specjalnego AI schema i gwarancji cytowania.";

export const metadata = withV13SocialMetadata(
  {
    ...baseMetadata,
    title: page.title,
    description: metaDescription,
  },
  page.title,
  metaDescription,
);

export default function GeoAiSearchPage() {
  return <PublicServicePage page={page} />;
}
