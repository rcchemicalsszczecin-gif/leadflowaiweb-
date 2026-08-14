import { ServicePage } from "@/components/service-page";
import { getExpandedServicePage } from "@/lib/expanded-services";
import { getExpandedServiceMetadata } from "@/lib/expanded-service-utils";

const page = {
  ...getExpandedServicePage("bezpieczenstwo-stron"),
  eyebrow: "LEADFLOWAI / BEZPIECZEŃSTWO STRON",
  title: "Bezpieczeństwo strony i aplikacji: mniej powierzchni ataku, lepsza kontrola danych i przewidywalne odzyskiwanie.",
  lead: "Analizujemy granice publiczne i prywatne, dane wejściowe, uprawnienia, zależności, sekrety, konfigurację wdrożenia i procedury odtworzenia odpowiednio do architektury serwisu.",
  directAnswer: "Bezpieczeństwo strony nie sprowadza się do HTTPS. Trzeba kontrolować dane wejściowe, uprawnienia, zależności, sekrety, integracje i konfigurację środowiska, a także wiedzieć jak wykryć problem i wrócić do poprawnego stanu po awarii.",
};

export const metadata = {
  ...getExpandedServiceMetadata("bezpieczenstwo-stron"),
  title: "Bezpieczeństwo stron i aplikacji — ochrona danych i wdrożeń",
  description: page.lead,
};

export default function Page() {
  return <ServicePage page={page} />;
}
