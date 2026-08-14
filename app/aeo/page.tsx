import { PublicServicePage } from "@/components/public-service-page";
import { getSearchMetadata, getSearchPage } from "@/lib/search-pages";
import { withV13SocialMetadata } from "@/lib/social-metadata-v13";

const basePage = getSearchPage("aeo");
const page = {
  ...basePage,
  eyebrow: "LEADFLOWAI / AEO · ARCHITEKTURA ODPOWIEDZI",
  title: "AEO: architektura odpowiedzi oparta na dobrym SEO, nie osobnym algorytmie.",
  lead:
    "Porządkujemy pytania, odpowiedzi, definicje, FAQ i semantykę tak, aby ważna informacja była szybka do znalezienia dla człowieka i systemu odpowiedzi. W Google AEO nie zastępuje SEO ani nie tworzy osobnego wymogu rankingowego dla funkcji generatywnej AI.",
  directAnswer:
    "AEO w LeadFlowAI oznacza projektowanie strony tak, aby konkretne pytanie miało jasną, wiarygodną odpowiedź z potrzebnym kontekstem. To warstwa architektury informacji i treści, nie trik rankingowy. Z perspektywy Google optymalizacja pod funkcje generatywnej AI nadal opiera się na podstawach SEO, indeksowalnej treści i systemach jakości wyszukiwarki. AEO pomaga więc uporządkować odpowiedzi, ale nie daje osobnej ścieżki do AI Overviews, AI Mode ani gwarancji cytowania.",
  faqs: [
    ...basePage.faqs,
    {
      question: "Czy Google wymaga osobnej optymalizacji AEO dla AI Overviews i AI Mode?",
      answer:
        "Nie. Według aktualnych wytycznych Google nie ma dodatkowego technicznego wymogu AEO dla funkcji generatywnej AI. Nadal liczą się podstawy SEO, dostępność do indeksowania, użyteczna treść i dobra struktura informacji. AEO traktujemy jako praktykę porządkowania odpowiedzi, a nie osobny system rankingowy Google.",
    },
  ],
};

const baseMetadata = getSearchMetadata("aeo");
const metaDescription =
  "AEO porządkuje odpowiedzi, definicje i FAQ tak, by informacja była czytelna dla ludzi i systemów odpowiedzi. Bez obietnic AI i bez zastępowania SEO.";

export const metadata = withV13SocialMetadata(
  {
    ...baseMetadata,
    title: page.title,
    description: metaDescription,
  },
  page.title,
  metaDescription,
);

export default function AeoPage() {
  return <PublicServicePage page={page} />;
}
