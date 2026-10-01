const services = [
  ["build", "ZBUDUJ", "Nowa strona lub serwis", "Od celu i struktury treści po projekt interfejsu, kod oraz wersję mobilną.", "/strony-internetowe", "WWW · UX/UI · KOD"],
  ["visibility", "DAJ SIĘ ZNALEŹĆ", "SEO, AEO i GEO od podstaw", "Struktura, semantyka i odpowiedzi przygotowane dla ludzi, wyszukiwarek i systemów AI.", "/seo-aeo-geo", "SEO · AEO · GEO"],
  ["conversion", "PROWADŹ DO DECYZJI", "Lepsza ścieżka kontaktu", "Hierarchia, wezwania do działania i pomiar projektowane wokół celu biznesowego.", "/cro-optymalizacja-konwersji", "CRO · KONTAKT · DANE"],
  ["intelligence", "DODAJ INTELIGENCJĘ", "AI z uzasadnioną rolą", "Chatboty, RAG i funkcje AI oparte na sprawdzonym źródle wiedzy.", "/chatboty-ai", "AI · RAG · AGENTY"],
  ["integration", "POŁĄCZ", "Strona zintegrowana z firmą", "API, automatyzacje i przepływy danych łączące serwis z codzienną pracą.", "/integracje-api", "API · AUTOMATYZACJE"],
  ["care", "ROZWIJAJ", "Opieka po publikacji", "Monitoring, bezpieczeństwo, wydajność i kolejne decyzje po uruchomieniu.", "/opieka-utrzymanie-stron", "OPIEKA · BEZPIECZEŃSTWO"],
] as const;

type ServiceVisualProps = { kind: (typeof services)[number][0] };

function ServiceVisual({ kind }: ServiceVisualProps) {
  const visualIndex = ["build", "visibility", "conversion", "intelligence", "integration", "care"].indexOf(kind) + 1;
  return <figure className={`v14-service-visual-${String(visualIndex).padStart(2, "0")}`} aria-hidden="true"><i /><i /><i /><i /></figure>;
}

export function V14Services() {
  return (
    <section className="v14-services" aria-labelledby="v14-services-title">
      <div className="v14-shell">
        <p className="v15-proof-line"><strong>SPRAWDŹ, CZY TO PASUJE.</strong> Dla firm, które traktują stronę jak część biznesu: 35 tras usługowych, 21 materiałów wiedzy i mapa 63 intencji wyszukiwania — bez obietnic pozycji.</p>
        <div className="v14-section-head">
          <p>OBSZARY WSPÓŁPRACY</p>
          <h2 id="v14-services-title">Zacznij od potrzeby, nie od listy technologii.</h2>
          <span>Wybierz kierunek, który najlepiej opisuje obecną sytuację. Zakres doprecyzujemy wspólnie.</span>
        </div>
        <div className="v14-service-grid">
          {services.map(([kind, label, title, copy, href, tech]) => (
            <a className={`v14-service-card v14-service-card-${kind}`} href={href} key={kind}>
              <div className="v14-service-meta"><small>{label}</small><b aria-hidden="true">↗</b></div>
              <ServiceVisual kind={kind} />
              <h3>{title}</h3>
              <p>{copy}</p>
              <em>{tech}</em>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
