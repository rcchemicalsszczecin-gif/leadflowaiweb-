import { PublicServicePage } from "@/components/public-service-page";
import { getSearchMetadata, getSearchPage } from "@/lib/search-pages";
import { withV13SocialMetadata } from "@/lib/social-metadata-v13";

const page = {
  ...getSearchPage("local-seo"),
  eyebrow: "LEADFLOWAI / SEO LOKALNE",
  title: "SEO lokalne dla firm, których klienci szukają usług w konkretnym miejscu.",
  lead: "Łączymy realny obszar działania firmy, spójne dane, lokalne strony usługowe i profil firmy tam, gdzie zapytanie rzeczywiście ma lokalną intencję.",
  directAnswer: "SEO lokalne służy firmom obsługującym konkretną lokalizację lub obszar. Nie polega na tworzeniu dziesiątek kopii stron z podmienioną nazwą miasta. Fundamentem są prawdziwe informacje lokalne, spójne dane firmy, właściwe strony usługowe i czytelne powiązanie między firmą, usługą oraz miejscem.",
};

export const metadata = withV13SocialMetadata(getSearchMetadata("local-seo"), page.title, page.lead);

export default function LocalSeoPage() {
  return <PublicServicePage page={page} />;
}
