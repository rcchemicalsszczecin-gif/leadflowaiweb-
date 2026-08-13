import { PublicServicePage } from "@/components/public-service-page";
import { getSearchMetadata, getSearchPage } from "@/lib/search-pages";

const page = {
  ...getSearchPage("aeo"),
  eyebrow: "LEADFLOWAI / AEO",
  title: "AEO: treści i struktura strony przygotowane do udzielania jednoznacznych odpowiedzi.",
  lead: "Projektujemy odpowiedzi, hierarchię informacji, FAQ i semantykę tak, aby użytkownik oraz system odpowiedzi mogli szybko znaleźć konkretną, wiarygodną informację.",
  directAnswer: "AEO to optymalizacja sposobu, w jaki strona odpowiada na pytania. Nie sprowadza się do sekcji FAQ: najważniejsze informacje powinny być jasno sformułowane także w głównej treści, osadzone w poprawnej strukturze i zgodne z publicznie weryfikowalnymi faktami.",
};

export const metadata = {
  ...getSearchMetadata("aeo"),
  title: page.title,
  description: page.lead,
};

export default function AeoPage() {
  return <PublicServicePage page={page} />;
}
