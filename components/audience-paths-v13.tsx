const paths = [
  {
    code: "01",
    title: "Lokalna firma usługowa",
    problem: "Potrzebuję czytelnej oferty, lokalnej widoczności i prostego kontaktu.",
    links: [["/strony-internetowe", "Nowa strona"], ["/local-seo", "Widoczność lokalna"], ["/formularze-lead-generation", "Kontakt i zapytania"]],
  },
  {
    code: "02",
    title: "Firma B2B",
    problem: "Mam złożoną ofertę i muszę prowadzić klienta od problemu do właściwego rozwiązania.",
    links: [["/strony-internetowe", "Architektura WWW"], ["/seo-aeo-geo", "Widoczność"], ["/integracje-api", "Integracje"]],
  },
  {
    code: "03",
    title: "Produkt lub sprzedaż internetowa",
    problem: "Strona ma wspierać zakup, kampanię albo mierzalną konwersję.",
    links: [["/sklepy-internetowe", "Sklep"], ["/landing-pages", "Kampania"], ["/cro-optymalizacja-konwersji", "CRO"]],
  },
  {
    code: "04",
    title: "Zespół rozwijający system",
    problem: "Potrzebuję aplikacji, własnej logiki, danych, AI albo automatyzacji.",
    links: [["/web-development", "System WWW"], ["/aplikacje-webowe", "Aplikacja"], ["/rag-bazy-wiedzy", "RAG i wiedza"]],
  },
] as const;

export function AudiencePathsV13() {
  return (
    <section className="section-light service-outcomes" aria-labelledby="audience-paths-title">
      <div className="page-shell section-pad">
        <div className="service-section-head">
          <p className="service-index">00 / OD PROBLEMU DO ZAKRESU</p>
          <h2 id="audience-paths-title">Nie musisz znać nazwy technologii, żeby znaleźć właściwy kierunek.</h2>
          <p>Zacznij od sytuacji biznesowej. Poniższe ścieżki prowadzą do właściwych obszarów oferty bez tworzenia sztucznych landingów dla każdej branży.</p>
        </div>
        <div className="outcome-grid">
          {paths.map((path) => (
            <article key={path.code}>
              <span>{path.code}</span>
              <h3>{path.title}</h3>
              <p>{path.problem}</p>
              <nav className="service-directory" aria-label={`Polecane kierunki: ${path.title}`}>
                {path.links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
              </nav>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
