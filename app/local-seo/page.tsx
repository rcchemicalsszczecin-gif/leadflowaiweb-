import { PublicServicePage } from "@/components/public-service-page";
import { getSearchMetadata, getSearchPage } from "@/lib/search-pages";
import { withV13SocialMetadata } from "@/lib/social-metadata-v13";

const basePage = getSearchPage("local-seo");
const page = {
  ...basePage,
  eyebrow: "LEADFLOWAI / SEO LOKALNE",
  title: "SEO lokalne dla firm ze Szczecina i innych rynków lokalnych.",
  lead:
    "Pomagamy firmom działającym w Szczecinie i na innych realnych rynkach lokalnych uporządkować obszar działania, dane firmy, lokalne strony usługowe i profil firmy tam, gdzie zapytanie rzeczywiście ma lokalną intencję.",
  directAnswer:
    "SEO lokalne służy firmom obsługującym konkretną lokalizację lub obszar. Dla firmy działającej w Szczecinie oznacza to spójne informacje o rzeczywistym obszarze obsługi, właściwe strony usługowe, lokalny kontekst treści i poprawny fundament techniczny. Nie polega to na tworzeniu dziesiątek kopii stron z podmienioną nazwą miasta ani na publikowaniu fikcyjnych danych adresowych.",
  faqs: [
    ...basePage.faqs,
    {
      question: "Czy LeadFlowAI prowadzi SEO lokalne dla firm ze Szczecina?",
      answer:
        "Tak. Jeżeli Szczecin jest rzeczywistym rynkiem lub obszarem obsługi firmy, możemy zaprojektować lokalny zakres SEO wokół jej usług, publicznych danych, właściwych stron i profilu firmy. Nie tworzymy fikcyjnych lokalizacji ani masowych stron doorway tylko po to, aby powielić nazwę miasta.",
    },
  ],
};

export const metadata = withV13SocialMetadata(getSearchMetadata("local-seo"), page.title, page.lead);

export default function LocalSeoPage() {
  return <PublicServicePage page={page} />;
}
