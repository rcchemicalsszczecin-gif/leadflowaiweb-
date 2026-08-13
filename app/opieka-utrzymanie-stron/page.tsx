import { ServicePage } from "@/components/service-page";
import { getExpandedServicePage } from "@/lib/expanded-services";
import { getExpandedServiceMetadata } from "@/lib/expanded-service-utils";

const page = {
  ...getExpandedServicePage("opieka-utrzymanie-stron"),
  eyebrow: "LEADFLOWAI / OPIEKA I UTRZYMANIE",
  title: "Opieka nad stroną po publikacji: aktualizacje, monitoring, poprawki i rozwój bez utraty kontroli.",
  lead: "Ustalamy konkretny zakres odpowiedzialności za działającą stronę lub aplikację: monitoring, aktualizacje, kopie, naprawy, regresję i kolejne małe etapy rozwoju.",
  directAnswer: "Utrzymanie strony powinno jasno określać co jest monitorowane, co aktualizowane, jak wygląda reakcja na błąd oraz które zmiany mieszczą się w opiece, a które wymagają osobnego etapu rozwojowego. Dzięki temu serwis nie zamienia się w niekontrolowany dług techniczny.",
};

export const metadata = {
  ...getExpandedServiceMetadata("opieka-utrzymanie-stron"),
  title: page.title,
  description: page.lead,
};

export default function Page() {
  return <ServicePage page={page} />;
}
