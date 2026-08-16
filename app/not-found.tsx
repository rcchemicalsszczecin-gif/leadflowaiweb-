import { V14SiteFooter } from "@/components/v14-site-footer";
import { V14SiteHeader } from "@/components/v14-site-header";

export default function NotFound() {
  return (
    <div className="v14-route-page v14-not-found-page">
      <V14SiteHeader mode="static" />
      <main id="main-content" tabIndex={-1}>
        <section className="v14-shell v14-not-found" aria-labelledby="not-found-title">
          <p className="v14-not-found-code" aria-hidden="true">404</p>
          <div>
            <p className="v14-kicker">NIE ZNALEZIONO</p>
            <h1 id="not-found-title">Ta ścieżka nie prowadzi do aktywnej strony.</h1>
            <p>
              Adres mógł się zmienić albo zawierać błąd. Wróć do strony głównej lub przejdź do pełnej oferty.
            </p>
            <div className="v14-not-found-actions">
              <a className="v14-button v14-button-primary" href="/">Strona główna <span aria-hidden="true">↗</span></a>
              <a className="v14-button v14-button-ghost" href="/uslugi">Zobacz usługi</a>
            </div>
          </div>
        </section>
      </main>
      <V14SiteFooter />
    </div>
  );
}
