import { knowledgeArticles } from "@/lib/knowledge-registry";

const featuredSlugs = [
  "jak-zaplanowac-strone-firmowa",
  "seo-aeo-geo-jedna-architektura",
] as const;

const featured = featuredSlugs
  .map((slug) => knowledgeArticles.find((article) => article.slug === slug))
  .filter((article): article is NonNullable<typeof article> => Boolean(article));

const faqs = [
  {
    question: "Ile trwa realizacja strony?",
    answer:
      "Termin zależy od zakresu, materiałów i integracji. Po diagnozie przedstawiamy etapy oraz założenia.",
  },
  {
    question: "Jak wygląda wycena?",
    answer:
      "Najpierw ustalamy cel i stan obecny. Wycena opisuje zakres, etapy oraz wyłączenia.",
  },
  {
    question: "Czy SEO, AEO i GEO są częścią budowy strony?",
    answer:
      "Tak. Fundament techniczny, struktura informacji i semantyka powstają razem ze stroną. Stały rozwój widoczności może być osobnym zakresem.",
  },
  {
    question: "Co dzieje się po publikacji?",
    answer:
      "Możemy objąć serwis opieką, monitoringiem i rozwojem. Zakres utrzymania ustalamy oddzielnie.",
  },
  {
    question: "Czy można zacząć od audytu?",
    answer:
      "Tak. Audyt może być samodzielnym pierwszym krokiem. Porządkuje problemy, ryzyka i kolejność decyzji.",
  },
  {
    question: "Czy modernizujecie istniejące strony bez utraty ważnych URL-i?",
    answer:
      "Tak. Zaczynamy od audytu adresów, treści, linkowania i indeksowalności, aby chronić wartościowe elementy.",
  },
  {
    question: "Jak wygląda pierwszy krok, jeśli nie mam gotowej specyfikacji?",
    answer:
      "Wystarczy opisać projekt, cel i obecny stan. Zakres, ryzyka i kolejność prac ustalimy przed rozpoczęciem.",
  },
] as const;

export function V14KnowledgeFaq() {
  return (
    <section className="v14-knowledge" aria-labelledby="v14-knowledge-title">
      <div className="v14-shell">
        <div className="v14-section-head v14-knowledge-head">
          <p>WIEDZA PRZED DECYZJĄ</p>
          <h2 id="v14-knowledge-title">Konkretny temat, krótka odpowiedź, potem pełny kontekst.</h2>
          <span>Wybraliśmy trzy materiały, które pomagają uporządkować projekt, widoczność i zmiany w wyszukiwaniu.</span>
        </div>

        <div className="v14-knowledge-grid">
          {featured.map((article) => (
            <article key={article.slug}>
              <h3>{article.title}</h3>
              <a href={`/wiedza/${article.slug}`}>Czytaj dalej <span aria-hidden="true">↗</span></a>
            </article>
          ))}
        </div>

        <div className="v14-faq-layout">
          <div>
            <p className="v14-faq-kicker">PYTANIA PRZED STARTEM</p>
            <h2>Co warto ustalić, zanim zaczniemy.</h2>
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
