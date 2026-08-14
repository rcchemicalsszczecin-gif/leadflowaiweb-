import { V14SiteFooter } from "@/components/v14-site-footer";
import { V14SiteHeader } from "@/components/v14-site-header";

export default function NotFound() {
  return (
    <main id="main-content" className="v14-route-page v14-not-found-page" tabIndex={-1}>
      <V14SiteHeader mode="static" />
      <section className="v14-not-found" aria-labelledby="not-found-title">
        <div className="v14-shell v14-not-found-grid">
          <div>
            <p className="v14-not-found-code" aria-hidden="true">404</p>
            <p className="v14-not-found-kicker">LEADFLOWAI / NIE ZNALEZIONO</p>
            <h1 id="not-found-title">Ta ścieżka nie prowadzi do aktywnej strony.</h1>
            <p className="v14-not-found-lead">
              Adres mógł się zmienić albo zawierać błąd. Wróć do strony głównej, przejdź do pełnej
              oferty lub napisz bezpośrednio do LeadFlowAI.
            </p>
            <div className="v14-not-found-actions">
              <a className="v14-primary" href="/">Strona główna <span aria-hidden="true">↗</span></a>
              <a className="v14-secondary" href="/uslugi">Zobacz usługi</a>
              <a className="v14-secondary" href="/kontakt">Kontakt</a>
            </div>
          </div>
          <div className="v14-not-found-signal" aria-hidden="true">
            <span>ROUTE</span><strong>NOT_FOUND</strong><i /><i /><i />
          </div>
        </div>
      </section>
      <V14SiteFooter />
    </main>
  );
}
