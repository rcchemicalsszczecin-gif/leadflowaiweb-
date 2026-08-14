import type { SourcedKnowledgeArticle } from "@/lib/knowledge-expanded";

export type V15KnowledgeArticle = SourcedKnowledgeArticle & {
  reviewedAt?: string;
  reviewedLabel?: string;
};

export function applyV15KnowledgeOverride(article: SourcedKnowledgeArticle): V15KnowledgeArticle {
  if (article.slug !== "ai-search-google-co-robic-2026") return article;

  return {
    ...article,
    description:
      "Aktualne podejście Google do generatywnego AI Search w 2026: SEO jako fundament, wartościowa treść, crawlability, brak specjalnego llms.txt/schema oraz pomiar w Search Console, gdy raport jest dostępny.",
    summary:
      "Google w 2026 jednoznacznie utrzymuje SEO jako fundament funkcji generatywnej AI w Search. Nie wymaga specjalnego llms.txt, osobnego schema ani przepisywania treści wyłącznie pod AI. Najlepszą bazą pozostają indeksowalna strona, unikalna i użyteczna treść, jasna struktura oraz realne dane pomiarowe z Search Console, jeśli dana usługa ma dostęp do raportu generatywnej AI.",
    sections: [
      ...article.sections,
      {
        title: "5. Google nie traktuje AEO i GEO jako osobnych systemów rankingowych",
        paragraphs: [
          "Google rozpoznaje terminy AEO i GEO używane na rynku, ale z perspektywy swojej wyszukiwarki opisuje optymalizację pod generatywną AI jako dalszą część SEO. AI Overviews i AI Mode wykorzystują podstawowe systemy rankingu i jakości Search oraz treści pobierane z indeksu wyszukiwarki.",
          "To nie znaczy, że praca nad odpowiedziami, encjami i źródłowością jest zbędna. Oznacza natomiast, że nie powinna być sprzedawana jako tajny drugi algorytm odłączony od poprawnego SEO, indeksowalności i wartości treści.",
        ],
      },
      {
        title: "6. llms.txt, drobne chunkowanie i specjalny schema nie są wymagane przez Google",
        paragraphs: [
          "Aktualny przewodnik Google wprost wskazuje, że pliki llms.txt i inne specjalne pliki lub markup AI nie pomagają ani nie szkodzą widoczności w Google Search, ponieważ Google ich do tego celu nie używa. Nie ma też specjalnego schema.org wymaganego do funkcji generatywnej AI.",
          "Google nie wymaga również dzielenia treści na sztucznie małe fragmenty ani przepisywania całej strony specjalnym językiem pod modele. Treść powinna przede wszystkim dobrze odpowiadać użytkownikowi, a structured data nadal powinny opisywać to, co jest publicznie widoczne.",
        ],
      },
      {
        title: "7. AI Search warto mierzyć w Search Console, gdy raport jest dostępny",
        paragraphs: [
          "Google udostępnia Raport skuteczności generatywnej AI w Search Console wybranej grupie właścicieli witryn. Raport obejmuje wyświetlenia w AI Overviews i AI Mode oraz pozwala analizować między innymi strony, urządzenia i kraje.",
          "Raport jest wdrażany etapami, dlatego jego brak nie jest wystarczającym dowodem braku widoczności w AI Search. Jeżeli property nie ma do niego dostępu, poprawną odpowiedzią jest brak pierwszoplanowych danych pomiarowych — nie własny wymyślony score, liczba cytowań czy rzekoma wewnętrzna metryka Google.",
        ],
      },
    ],
    sources: [
      ...(article.sources ?? []),
      {
        label: "Google Search Console — Raport skuteczności generatywnej AI",
        href: "https://support.google.com/webmasters/answer/16984139?hl=pl",
      },
    ],
    reviewedAt: "2026-08-14",
    reviewedLabel: "14.08.2026",
  };
}
