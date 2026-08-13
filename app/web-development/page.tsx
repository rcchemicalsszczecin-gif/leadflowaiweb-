import { ServicePage } from "@/components/service-page";
import { getServiceMetadata, getServicePage } from "@/lib/services";

const page = {
  ...getServicePage("web-development"),
  eyebrow: "LEADFLOWAI / APLIKACJE I SYSTEMY WWW",
  title: "Dedykowane aplikacje i systemy WWW, gdy zwykła strona przestaje wystarczać.",
  lead: "Budujemy panele, konfiguratory, portale, narzędzia wewnętrzne i dedykowane moduły webowe połączone z API, danymi oraz procesami firmy.",
  directAnswer: "Web development wybieramy wtedy, gdy projekt wymaga logiki, stanu, danych lub integracji wykraczających poza klasyczną stronę informacyjną. Najpierw ograniczamy zakres do realnego procesu biznesowego, a dopiero potem projektujemy interfejs, architekturę aplikacji, integracje, bezpieczeństwo i sposób utrzymania.",
};

export const metadata = {
  ...getServiceMetadata("web-development"),
  title: page.title,
  description: page.lead,
};

export default function WebDevelopmentPage() {
  return <ServicePage page={page} />;
}
