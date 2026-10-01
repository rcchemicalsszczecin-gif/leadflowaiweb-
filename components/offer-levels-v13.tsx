const levels = [
  ["Nowa strona", "Oferta, architektura informacji, projekt, wdrożenie i fundament widoczności.", "/strony-internetowe", "Zobacz budowę strony"],
  ["Strona + wzrost", "Budowa lub modernizacja połączona z SEO/AEO/GEO, CRO, analityką albo treścią.", "/audyt-strony", "Zacznij od audytu"],
  ["Dedykowany system WWW", "Własna logika, panel, integracje, automatyzacja, AI/RAG lub funkcje aplikacyjne.", "/web-development", "Zobacz systemy WWW"],
] as const;

export function OfferLevelsV13() {
  return (
    <section className="section-dark service-deliverables services-offer-levels" aria-labelledby="offer-levels-title">
      <div className="page-shell section-pad">
        <div className="service-section-head service-section-head-dark">
          <p className="service-index">SKALA REALIZACJI</p>
          <h2 id="offer-levels-title">Dobieramy skalę realizacji do problemu, nie do gotowego pakietu cenowego.</h2>
          <p>To profile zakresu, nie sztywny cennik. Projekt może łączyć elementy kilku poziomów.</p>
        </div>
        <div className="offer-level-list">
          {levels.map(([title, description, href, cta]) => (
            <article key={title}>
              <div><h3>{title}</h3><p>{description}</p></div>
              <a className="text-link" href={href}>{cta} <span aria-hidden="true">↗</span></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
