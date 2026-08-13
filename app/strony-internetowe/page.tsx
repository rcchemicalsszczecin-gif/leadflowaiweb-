import { ServicePage } from "@/components/service-page";
import { getServiceMetadata, getServicePage } from "@/lib/services";

const page = {
  ...getServicePage("strony-internetowe"),
  eyebrow: "LEADFLOWAI / TWORZENIE STRON INTERNETOWYCH",
  title: "Tworzenie stron internetowych, które mają sprzedawać, budować zaufanie i być widoczne w wyszukiwarkach.",
  lead: "Projektujemy i wdrażamy strony firmowe jako kompletne narzędzie biznesowe: od architektury informacji i UX/UI przez development, mobile i wydajność po SEO, AEO, GEO oraz mierzalną ścieżkę kontaktu.",
  directAnswer: "Dobra strona firmowa nie kończy się na wyglądzie. Powinna szybko wyjaśniać ofertę, prowadzić użytkownika do działania, działać dobrze na telefonie, być technicznie przygotowana do indeksowania i publikować informacje w formie czytelnej również dla systemów odpowiedzi oraz wyszukiwania AI. Dlatego projektujemy te warstwy razem od początku.",
  capabilities: ["Architektura informacji", "UX/UI", "Development", "Mobile", "SEO", "AEO", "GEO", "Konwersja", "Analityka", "Wydajność"],
};

export const metadata = {
  ...getServiceMetadata("strony-internetowe"),
  title: page.title,
  description: page.lead,
};

export default function StronyInternetowePage() {
  return <ServicePage page={page} />;
}
