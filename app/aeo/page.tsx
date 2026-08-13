import { PublicServicePage } from "@/components/public-service-page";
import { getSearchMetadata, getSearchPage } from "@/lib/search-pages";
import { withV13SocialMetadata } from "@/lib/social-metadata-v13";

const page = {
  ...getSearchPage("aeo"),
  eyebrow: "LEADFLOWAI / AEO",
  title: "AEO: treści i struktura strony przygotowane do udzielania jednoznacznych odpowiedzi.",
  lead: "Projektujemy odpowiedzi, hierarchię informacji, FAQ i semantykę tak, aby użytkownik oraz system odpowiedzi mogli szybko znaleźć konkretną, wiarygodną informację.",
  directAnswer: "AEO to optymalizacja sposobu, w jaki strona odpowiada na pytania. Nie sprowadza się do sekcji FAQ: najważniejsze informacje powinny być jasno sformułowane także w głównej treści, osadzone w poprawnej strukturze i zgodne z publicznie weryfikowalnymi faktami.",
};

export const metadata = withV13SocialMetadata(getSearchMetadata("aeo"), page.title, page.lead);

export default function AeoPage() {
  return <PublicServicePage page={page} />;
}
