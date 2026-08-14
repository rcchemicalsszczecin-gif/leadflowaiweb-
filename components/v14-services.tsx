const services = [
  ["01", "PROJEKT I BUDOWA", "Strony WWW jak produkt", "UX/UI, development i responsywność projektowane jako jeden system.", "/strony-internetowe", "WWW · UX/UI · CODE"],
  ["02", "WIDOCZNOŚĆ", "SEO, AEO i GEO w strukturze", "Semantyka, encje i odpowiedzi wpisane w architekturę od początku.", "/seo-aeo-geo", "SEO · AEO · GEO"],
  ["03", "KONWERSJA", "Interfejs prowadzący do działania", "CTA, formularze, lead flow i pomiar podporządkowane celowi biznesowemu.", "/cro-optymalizacja-konwersji", "CRO · LEADS · DATA"],
  ["04", "INTELIGENCJA", "AI z konkretną rolą", "Chatboty, RAG i funkcje AI oparte na kontrolowanej wiedzy.", "/chatboty-ai", "AI · RAG · AGENTS"],
  ["05", "INTEGRACJE", "WWW połączone z firmą", "API, automatyzacje i przepływy danych łączące stronę z procesem operacyjnym.", "/integracje-api", "API · FLOW · SYSTEMS"],
  ["06", "OPIEKA", "Produkt gotowy do rozwoju", "Monitoring, bezpieczeństwo, wydajność i kontrolowany rozwój po publikacji.", "/opieka-utrzymanie-stron", "CARE · SECURITY · SPEED"],
] as const;

export function V14Services() {
  return (
    <section className="v14-services" aria-labelledby="v14-services-title">
      <link rel="stylesheet" href="/v14-services.css" precedence="high" />
      <div className="v14-shell">
        <div className="v14-section-head">
          <p>01 / SYSTEM OFERTY</p>
          <h2 id="v14-services-title">Sześć warstw jednego produktu cyfrowego.</h2>
          <span>Łączymy tylko te elementy, które realnie wzmacniają cel projektu.</span>
        </div>
        <div className="v14-service-grid">
          {services.map(([index, label, title, copy, href, tech]) => (
            <a className="v14-service-card" href={href} key={index}>
              <div className="v14-service-meta"><span>{index}</span><small>{label}</small><b aria-hidden="true">↗</b></div>
              <figure className={`v14-service-visual v14-service-visual-${index}`} aria-hidden="true"><i /><i /><i /><i /></figure>
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
