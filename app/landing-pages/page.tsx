import { ServicePage } from "@/components/service-page";
import { getServiceMetadata, getServicePage } from "@/lib/services";
import { withV13SocialMetadata } from "@/lib/social-metadata-v13";

const page = {
  ...getServicePage("landing-pages"),
  eyebrow: "LEADFLOWAI / STRONY KAMPANIJNE",
  title: "Strony kampanijne i landing page zaprojektowane pod jedną decyzję użytkownika.",
  lead: "Budujemy strony kampanijne do reklam, premier, zapisów i pozyskiwania zapytań: z jasną ofertą, logiczną kolejnością argumentów, mocnym CTA, mobile i pomiarem konwersji.",
  directAnswer: "Landing page ma sens wtedy, gdy użytkownik powinien wykonać jedno główne działanie. Ograniczamy rozpraszacze, układamy argumenty w kolejności decyzji, projektujemy formularz lub kontakt i mierzymy kluczowe zdarzenia zamiast traktować stronę jak skróconą wersję całego serwisu firmowego.",
};

export const metadata = withV13SocialMetadata(
  {
    ...getServiceMetadata("landing-pages"),
    title: page.title,
    description: page.lead,
  },
  page.title,
  page.lead,
);

export default function LandingPagesPage() {
  return <ServicePage page={page} />;
}
