import { ServicePage } from "@/components/service-page";
import { getServiceMetadata, getServicePage } from "@/lib/services";
import { withV13SocialMetadata } from "@/lib/social-metadata-v13";

const page = {
  ...getServicePage("audyt-strony"),
  eyebrow: "LEADFLOWAI / AUDYT STRONY WWW",
  title: "Audyt strony internetowej, który kończy się listą decyzji i priorytetów, nie samym raportem.",
  lead: "Sprawdzamy UX, mobile, wydajność, SEO, AEO/GEO, dostępność, treść i ścieżki konwersji, a problemy porządkujemy według wpływu i kosztu naprawy.",
  directAnswer: "Audyt ma odpowiedzieć na trzy pytania: co realnie nie działa, jaki ma to wpływ na użytkownika lub widoczność oraz co warto naprawić najpierw. Dlatego wynik dzielimy na problemy krytyczne, szybkie poprawki i większe decyzje architektoniczne zamiast tworzyć długą listę uwag bez priorytetów.",
};

export const metadata = withV13SocialMetadata(
  {
    ...getServiceMetadata("audyt-strony"),
    title: page.title,
    description: page.lead,
  },
  page.title,
  page.lead,
);

export default function AudytStronyPage() {
  return <ServicePage page={page} />;
}
