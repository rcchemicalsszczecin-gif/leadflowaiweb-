import { ServicePage } from "@/components/service-page";
import { getServiceMetadata, getServicePage } from "@/lib/services";

const basePage = getServicePage("strony-internetowe");
const page = {
  ...basePage,
  eyebrow: "LEADFLOWAI / TWORZENIE STRON INTERNETOWYCH",
  title: "Tworzenie stron internetowych dla firm ze Szczecina i całej Polski.",
  lead:
    "Projektujemy i wdrażamy strony firmowe dla firm ze Szczecina oraz firm z całej Polski. Łączymy architekturę informacji, UX/UI, development, mobile i wydajność z SEO, AEO, GEO oraz mierzalną ścieżką kontaktu.",
  directAnswer:
    "LeadFlowAI tworzy strony internetowe dla firm ze Szczecina i realizuje projekty zdalnie dla firm z całej Polski. Dobra strona firmowa nie kończy się na wyglądzie: powinna szybko wyjaśniać ofertę, prowadzić użytkownika do działania, działać dobrze na telefonie, być technicznie przygotowana do indeksowania i publikować informacje czytelne także dla systemów odpowiedzi oraz wyszukiwania AI. Dlatego te warstwy projektujemy razem od początku.",
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
      question: "Czy tworzycie strony internetowe dla firm ze Szczecina?",
      answer:
        "Tak. Szczecin jest jednym z rynków, dla których LeadFlowAI rozwija ofertę stron internetowych. Projekty możemy prowadzić zdalnie, dlatego ten sam proces obsługuje również firmy z innych części Polski. Nie uzależniamy współpracy od fizycznej wizyty w biurze.",
    },
  ],
  related: ["local-seo", ...basePage.related],
};

export const metadata = {
  ...getServiceMetadata("strony-internetowe"),
  title: page.title,
  description: page.lead,
};

export default function StronyInternetowePage() {
  return <ServicePage page={page} />;
}
