export default function NotFound() {
  return (
    <main id="main-content" className="section-dark" tabIndex={-1}>
      <div className="page-shell">
        <div className="site-header">
          <a className="brand" href="/" aria-label="LeadFlowAI — strona główna">
            <span className="brand-mark" aria-hidden="true">L/</span>
            <span>LEADFLOWAI</span>
          </a>
          <span aria-hidden="true" />
          <a className="button button-primary button-small" href="/kontakt">Wyceń projekt</a>
        </div>
      </div>

      <section className="page-shell section-pad" aria-labelledby="not-found-title">
        <p className="eyebrow">404 / NIE ZNALEZIONO</p>
        <h1 id="not-found-title">Ta ścieżka nie prowadzi do aktywnej strony.</h1>
        <p className="hero-lead">
          Adres mógł się zmienić albo zawierać błąd. Wróć do strony głównej, przejdź do pełnej
          oferty lub napisz bezpośrednio do LeadFlowAI.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="/">Strona główna <span aria-hidden="true">↗</span></a>
          <a className="button button-ghost" href="/uslugi">Zobacz usługi</a>
          <a className="text-link" href="/kontakt">Kontakt</a>
        </div>
      </section>
    </main>
  );
}
