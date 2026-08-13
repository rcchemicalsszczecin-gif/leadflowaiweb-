import { ServicePage } from "@/components/service-page";
import { getServiceMetadata, getServicePage } from "@/lib/services";

const page = {
  ...getServicePage("modernizacja-stron"),
  eyebrow: "LEADFLOWAI / MODERNIZACJA STRONY",
  title: "Modernizacja strony internetowej bez utraty tego, co już działa i pozycjonuje się dobrze.",
  lead: "Przebudowujemy stare lub niespójne serwisy, porządkując UX, mobile, wydajność, technologię i widoczność przy kontrolowanej migracji adresów, treści i sygnałów SEO.",
  directAnswer: "Modernizacja nie powinna oznaczać automatycznego wyrzucenia całej obecnej strony. Najpierw ustalamy, co trzeba zachować, co blokuje użytkownika i widoczność, a co warto przebudować. Dopiero potem planujemy nową architekturę, migrację treści, przekierowania, warstwę wizualną oraz QA przed publikacją.",
};

export const metadata = {
  ...getServiceMetadata("modernizacja-stron"),
  title: page.title,
  description: page.lead,
};

export default function ModernizacjaStronPage() {
  return <ServicePage page={page} />;
}
