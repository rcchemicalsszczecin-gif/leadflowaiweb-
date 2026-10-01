import { ServicePage } from "@/components/service-page";
import { getServiceMetadata, getServicePage } from "@/lib/services";
import { withV13SocialMetadata } from "@/lib/social-metadata-v13";

const basePage = getServicePage("strony-internetowe");
const page = {
  ...basePage,
  eyebrow: "LEADFLOWAI / TWORZENIE STRON INTERNETOWYCH",
  title: "Tworzenie stron internetowych dla firm w całej Polsce.",
  lead:
    "Projektujemy i wdrażamy strony firmowe dla firm w całej Polsce. Łączymy architekturę informacji, UX/UI, development, mobile i wydajność z SEO, AEO, GEO oraz mierzalną ścieżką kontaktu.",
  directAnswer:
    "LeadFlowAI tworzy strony internetowe dla firm w całej Polsce i prowadzi projekty w uporządkowanym procesie zdalnym. Dobra strona firmowa nie kończy się na wyglądzie: powinna szybko wyjaśniać ofertę, prowadzić użytkownika do działania, działać dobrze na telefonie, być technicznie przygotowana do indeksowania i publikować informacje czytelne także dla systemów odpowiedzi oraz wyszukiwania AI. Dlatego te warstwy projektujemy razem od początku.",
  capabilities: [
    "Architektura informacji",
    "UX/UI",
    "Development",
    "Mobile",
    "SEO",
    "AEO",
    "GEO",
    "Konwersja",
    "Analityka",
    "Wydajność",
  ],
  faqs: [
    ...basePage.faqs,
    {
      question: "Czy realizujecie strony internetowe dla firm z całej Polski?",
      answer:
        "Tak. Projekty prowadzimy zdalnie dla firm z całej Polski. Współpraca nie wymaga fizycznej wizyty w biurze: zakres, materiały, decyzje i odbiory porządkujemy w jednym procesie projektowym.",
    },
  ],
  related: ["local-seo", ...basePage.related],
};

export const metadata = withV13SocialMetadata(
  {
    ...getServiceMetadata("strony-internetowe"),
    title: page.title,
    description: page.lead,
  },
  page.title,
  page.lead,
);

export default function StronyInternetowePage() {
  return <ServicePage page={page} />;
}
