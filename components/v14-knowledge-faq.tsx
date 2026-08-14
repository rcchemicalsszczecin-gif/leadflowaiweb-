import { knowledgeArticles } from "@/lib/knowledge-registry";

const featuredSlugs = [
  "jak-zaplanowac-strone-firmowa",
  "seo-aeo-geo-jedna-architektura",
  "ai-search-google-co-robic-2026",
] as const;

const featured = featuredSlugs
  .map((slug) => knowledgeArticles.find((article) => article.slug === slug))
  .filter((article): article is NonNullable<typeof article> => Boolean(article));

const faqs = [
  {
    question: "Czy SEO, AEO i GEO są częścią budowy strony?",
    answer:
      "Tak — fundament techniczny, struktura informacji, semantyka, metadata i dane strukturalne najlepiej projektować razem ze stroną. Rozbudowany research i stały rozwój widoczności mogą być osobnym zakresem.",
  },
  {
    question: "Czy każda strona potrzebuje AI, chatbota albo WebGL?",
    answer:
      "Nie. Te moduły mają sens tylko wtedy, gdy rozwiązują konkretny problem. Podstawą pozostaje czytelna, szybka i dostępna strona, która działa także bez efektów i dodatkowych usług.",
  },
  {
    question: "Czy modernizujecie istniejące strony bez utraty ważnych URL-i?",
    answer:
      "Tak. Modernizacja powinna zaczynać się od audytu adresów, treści, linkowania i indeksowalności. Wartościowych elementów nie usuwa się tylko dlatego, że zmienia się design lub technologia.",
  },
  {
    question: "Jak wygląda pierwszy krok, jeśli nie mam gotowej specyfikacji?",
    answer:
      "Wystarczy opisać rodzaj projektu, główny cel i obecny stan. Zakres, ryzyka, technologię i kolejność prac można uporządkować przed rozpoczęciem produkcji.",
  },
] as const;

export function V14KnowledgeFaq() {
  return (
    <section className="v14-knowledge" aria-labelledby="v14-knowledge-title">
      <div className="v14-shell">
        <div className="v14-section-head v14-knowledge-head">
          <p>07 / WIEDZA I DECYZJE</p>
          <h2 id="v14-knowledge-title">Najpierw odpowiedź. Potem kontekst i dowody.</h2>
          <span>Wiedza ma pomagać podjąć decyzję, a nie tylko zwiększać liczbę tekstów w serwisie.</span>
        </div>

        <div className="v14-knowledge-grid">
          {featured.map((article, index) => (
            <article key={article.slug}>
              <small>0{index + 1} / WIEDZA</small>
              <h3>{article.title}</h3>
              <p>{article.summary}</p>
              <a href={`/wiedza/${article.slug}`}>Czytaj dalej <span aria-hidden="true">↗</span></a>
            </article>
          ))}
        </div>

        <div className="v14-faq-layout">
          <div>
            <p className="v14-faq-kicker">FAQ / PRZED STARTEM</p>
            <h2>Najczęstsze pytania przed decyzją o projekcie.</h2>
            <a href="/wiedza">Przejdź do całej bazy wiedzy <span aria-hidden="true">↗</span></a>
          </div>
          <div className="v14-faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
