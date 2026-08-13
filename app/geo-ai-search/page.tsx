import { PublicServicePage } from "@/components/public-service-page";
import { getSearchMetadata, getSearchPage } from "@/lib/search-pages";

const page = {
  ...getSearchPage("geo-ai-search"),
  eyebrow: "LEADFLOWAI / GEO I AI SEARCH",
  title: "GEO i AI Search: architektura informacji zwiększająca szansę na poprawne rozpoznanie i cytowanie marki przez systemy AI.",
  lead: "Porządkujemy encje, fakty, źródła, strukturę usług i treści eksperckie tak, aby publiczna wiedza o firmie była jednoznaczna, spójna i możliwa do zweryfikowania.",
  directAnswer: "GEO nie jest osobnym magicznym algorytmem. Fundamentem pozostają techniczne SEO, dostępna publicznie treść, jasne encje i wiarygodne źródła. Warstwa AI Search wzmacnia tę bazę przez odpowiednią strukturę informacji, spójność faktów, cytowalne odpowiedzi i relacje między tematami.",
};

export const metadata = {
  ...getSearchMetadata("geo-ai-search"),
  title: page.title,
  description: page.lead,
};

export default function GeoAiSearchPage() {
  return <PublicServicePage page={page} />;
}
