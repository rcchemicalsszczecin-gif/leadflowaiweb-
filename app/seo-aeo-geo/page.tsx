import { PublicServicePage } from "@/components/public-service-page";
import { getSearchMetadata, getSearchPage } from "@/lib/search-pages";

const page = {
  ...getSearchPage("seo-aeo-geo"),
  eyebrow: "LEADFLOWAI / SEO + AEO + GEO",
  title: "SEO, AEO i GEO jako jeden system widoczności strony w wyszukiwarkach i odpowiedziach AI.",
  lead: "Łączymy klasyczne SEO, architekturę odpowiedzi AEO i czytelność encji dla generatywnych systemów AI tak, aby każda warstwa wzmacniała tę samą publiczną informację zamiast tworzyć osobne, konkurujące strategie.",
  directAnswer: "SEO odpowiada przede wszystkim za odkrywanie i indeksowanie treści, AEO za strukturę odpowiedzi na konkretne pytania, a GEO za jednoznaczność firmy, usług, relacji i dowodów dla systemów generatywnych. Najlepszy efekt daje wspólna architektura informacji, w której każda ważna podstrona ma własną intencję, jasne encje, odpowiedzi wprost, linkowanie wewnętrzne oraz dane strukturalne zgodne z tym, co użytkownik widzi na stronie.",
  capabilities: ["SEO techniczne", "SEO on-page", "AEO", "GEO", "Architektura treści", "Encje", "Dane strukturalne", "Linkowanie wewnętrzne", "Publiczna prawda", "Pomiar"],
};

export const metadata = {
  ...getSearchMetadata("seo-aeo-geo"),
  title: page.title,
  description: page.lead,
};

export default function SeoAeoGeoPage() {
  return <PublicServicePage page={page} />;
}
