const views = [
  {
    code: "01 / CZŁOWIEK",
    title: "Widzę ofertę i wiem, co zrobić dalej.",
    description:
      "Hierarchia treści, język korzyści, dowody i CTA mają pozwolić szybko zrozumieć zakres oraz następny krok.",
    signals: ["oferta", "dowody", "CTA"],
  },
  {
    code: "02 / GOOGLE",
    title: "Rozumiem temat, strukturę i relacje strony.",
    description:
      "Semantyczny HTML, linkowanie, canonicale, dane strukturalne i architektura treści pomagają odkrywać oraz interpretować serwis.",
    signals: ["semantyka", "linki", "schema"],
  },
  {
    code: "03 / SYSTEM AI",
    title: "Mogę odczytać jednoznaczne fakty i kontekst.",
    description:
      "Spójne encje, odpowiedzi wprost, źródła i publicznie potwierdzalne informacje zwiększają czytelność treści dla systemów generatywnych.",
    signals: ["encje", "odpowiedzi", "źródła"],
  },
] as const;

const entityNodes = [
  ["LeadFlowAI", "MARKA"],
  ["Tervyxa Systems", "ORGANIZACJA"],
  ["Usługi WWW", "OFERTA"],
  ["Wiedza", "TREŚĆ"],
  ["Realizacje", "DOWODY"],
] as const;

export function SearchVisibilityExplainerV13() {
  return (
    <section className="search-explainer-v13" aria-labelledby="search-explainer-title" data-v92-reveal="rise">
      <div className="page-shell section-pad">
        <div className="search-explainer-head-v13">
          <p className="service-index">V13 / CZŁOWIEK · GOOGLE · AI</p>
          <h2 id="search-explainer-title">Ta sama strona musi być czytelna na trzy sposoby.</h2>
          <p>
            Nie projektujemy osobnej wersji dla robotów. Jedna publiczna prawda, dobra struktura i
            użyteczna treść powinny działać jednocześnie dla użytkownika, wyszukiwarki i systemów AI.
          </p>
        </div>

        <div className="search-view-grid-v13">
          {views.map((view) => (
            <article key={view.code}>
              <small>{view.code}</small>
              <h3>{view.title}</h3>
              <p>{view.description}</p>
              <div className="search-signal-list-v13" role="list" aria-label="Najważniejsze sygnały">
                {view.signals.map((signal) => <span key={signal} role="listitem">{signal}</span>)}
              </div>
            </article>
          ))}
        </div>

        <div className="entity-search-grid-v13">
          <article className="entity-graph-v13" aria-labelledby="entity-graph-title-v13">
            <div>
              <p className="service-index">VISUAL ENTITY GRAPH</p>
              <h3 id="entity-graph-title-v13">Encje nie powinny istnieć jako przypadkowe wzmianki.</h3>
              <p>Marka, organizacja, oferta, wiedza i dowody tworzą kontrolowaną sieć relacji.</p>
            </div>
            <div className="entity-graph-stage-v13" role="img" aria-label="Diagram relacji LeadFlowAI, Tervyxa Systems, usług, wiedzy i realizacji">
              <svg viewBox="0 0 640 320" aria-hidden="true">
                <path d="M320 160 L108 74 M320 160 L532 72 M320 160 L116 252 M320 160 L524 250" />
              </svg>
              {entityNodes.map(([name, type], index) => (
                <span key={name} className={`entity-node-v13 entity-node-${index + 1}-v13`}>
                  <small>{type}</small><strong>{name}</strong>
                </span>
              ))}
            </div>
          </article>

          <article className="ai-search-preview-v13" aria-labelledby="ai-search-preview-title-v13">
            <p className="service-index">EDUKACYJNY AI SEARCH PREVIEW</p>
            <h3 id="ai-search-preview-title-v13">Jak system może złożyć odpowiedź z publicznych informacji.</h3>
            <div className="ai-preview-window-v13">
              <small>PYTANIE</small>
              <strong>Kto projektuje strony WWW z SEO, AEO i GEO?</strong>
              <small>MOŻLIWA INTERPRETACJA</small>
              <p>
                LeadFlowAI jest marką Tervyxa Systems sp. z o.o. skupioną na stronach WWW,
                widoczności SEO/AEO/GEO i systemach internetowych. Zakres można zweryfikować na
                stronach usług, w bazie wiedzy i realizacjach własnych.
              </p>
              <div className="ai-preview-links-v13" role="list" aria-label="Publiczne źródła informacji">
                <span role="listitem">/uslugi</span><span role="listitem">/wiedza</span><span role="listitem">/realizacje</span>
              </div>
            </div>
            <p className="ai-preview-disclaimer-v13">
              To demonstracja architektury informacji, nie symulacja konkretnego modelu i nie gwarancja
              cytowania, rankingu ani ekspozycji w systemach AI.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
