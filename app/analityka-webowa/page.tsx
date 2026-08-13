import { PublicServicePage } from "@/components/public-service-page";
import { getExpandedServicePage } from "@/lib/expanded-services";
import { getExpandedServiceMetadata } from "@/lib/expanded-service-utils";

const page = {
  ...getExpandedServicePage("analityka-webowa"),
  eyebrow: "LEADFLOWAI / ANALITYKA WEBOWA",
  title: "Analityka webowa, która pokazuje co użytkownik robi i gdzie strona traci wynik.",
  lead: "Projektujemy pomiar zdarzeń, konwersji i kluczowych ścieżek tak, aby dane odpowiadały na pytania biznesowe zamiast generować przypadkowy zestaw wykresów.",
  directAnswer: "Dobra analityka zaczyna się od decyzji, które firma chce podejmować na podstawie danych. Definiujemy zdarzenia, konwersje i kontekst pomiaru, wdrażamy je technicznie, a następnie sprawdzamy jakość danych przed wyciąganiem wniosków.",
};

export const metadata = {
  ...getExpandedServiceMetadata("analityka-webowa"),
  title: page.title,
  description: page.lead,
};

export default function Page() {
  return <PublicServicePage page={page} />;
}
