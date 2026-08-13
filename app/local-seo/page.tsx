import { PublicServicePage } from "@/components/public-service-page";
import { getSearchMetadata, getSearchPage } from "@/lib/search-pages";
import { withV13SocialMetadata } from "@/lib/social-metadata-v13";

const basePage = getSearchPage("local-seo");
const page = {
  ...basePage,
  eyebrow: "LEADFLOWAI / SEO LOKALNE",
  title: "SEO lokalne dla firm, których klienci szukają usług w konkretnym miejscu.",
  lead: "Łączymy realny obszar działania firmy, spójne dane, lokalne strony usługowe i profil firmy tam, gdzie zapytanie rzeczywiście ma lokalną intencję.",
  directAnswer: "SEO lokalne służy firmom obsługującym konkretną lokalizację lub obszar. Nie polega na tworzeniu dziesiątek kopii stron z podmienioną nazwą miasta. Jeżeli rzeczywistym obszarem działania firmy jest na przykład Szczecin, tę lokalizację opisujemy jako prawdziwy kontekst usługi — bez sztucznych stron dla każdej dzielnicy i bez fikcyjnych danych adresowych.",
  faqs: [
    ...basePage.faqs,
    {
      question: "Czy można pozycjonować lokalnie firmę działającą w Szczecinie bez tworzenia stron doorway?",
      answer: "Tak. Jeżeli Szczecin jest rzeczywistym obszarem działalności firmy, lokalny kontekst można budować przez spójne dane, właściwe strony usługowe, treści odnoszące się do realnej obsługi lokalnej i prawdziwe sygnały firmy. Nie trzeba tworzyć kopii tej samej strony z podmienioną nazwą dzielnicy lub miasta.",
    },
  ],
};

export const metadata = withV13SocialMetadata(getSearchMetadata("local-seo"), page.title, page.lead);

export default function LocalSeoPage() {
  return <PublicServicePage page={page} />;
}
