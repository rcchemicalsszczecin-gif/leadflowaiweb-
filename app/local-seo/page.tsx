import { PublicServicePage } from "@/components/public-service-page";
import { getSearchMetadata, getSearchPage } from "@/lib/search-pages";
import { withV13SocialMetadata } from "@/lib/social-metadata-v13";

const basePage = getSearchPage("local-seo");
const page = {
  ...basePage,
  eyebrow: "LEADFLOWAI / SEO LOKALNE",
  title: "SEO lokalne dla firm działających na rynkach lokalnych.",
  lead:
    "Pomagamy firmom działającym na rzeczywistych rynkach lokalnych uporządkować obszar działania, dane firmy, lokalne strony usługowe i profil firmy tam, gdzie zapytanie ma lokalną intencję.",
  directAnswer:
    "SEO lokalne służy firmom obsługującym konkretną lokalizację lub obszar. Oznacza spójne informacje o rzeczywistym obszarze obsługi, właściwe strony usługowe, lokalny kontekst treści i poprawny fundament techniczny. Nie polega na tworzeniu dziesiątek kopii stron z podmienioną nazwą miasta ani na publikowaniu fikcyjnych danych adresowych.",
  faqs: [
    ...basePage.faqs,
    {
      question: "Czy LeadFlowAI prowadzi SEO lokalne dla firm w Polsce?",
      answer:
        "Tak. Jeżeli konkretne miasto lub obszar jest rzeczywistym rynkiem firmy, możemy zaprojektować lokalny zakres SEO wokół jej usług, publicznych danych, właściwych stron i profilu firmy. Nie tworzymy fikcyjnych lokalizacji ani masowych stron doorway tylko po to, aby powielać nazwy miejsc.",
    },
  ],
};

const baseMetadata = getSearchMetadata("local-seo");

export const metadata = withV13SocialMetadata(
  {
    ...baseMetadata,
    title: page.title,
    description: page.lead,
  },
  page.title,
  page.lead,
);

export default function LocalSeoPage() {
  return <PublicServicePage page={page} />;
}
