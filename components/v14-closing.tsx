import { FooterBrandIdentity } from "@/components/brand-identity";
import { site } from "@/lib/site";

export function V14Closing() {
  return (
    <section className="v14-device-theater v14-closing-home" aria-labelledby="v14-closing-title">
      <div className="v14-shell v14-device-layout">
        <div className="v14-device-copy">
          <p>NASTĘPNY KROK</p>
          <h2 id="v14-closing-title">Zacznijmy od celu, nie od listy funkcji.</h2>
          <span>Napisz, co dziś nie działa i dokąd ma prowadzić nowa strona. Odpowiemy propozycją dalszej rozmowy — bez udawania automatycznego formularza.</span>
        </div>
        <div>
          <div className="v14-hero-actions">
            <a className="v14-button v14-button-primary" href={`mailto:${site.email}`}>Napisz do LeadFlowAI <span aria-hidden="true">↗</span></a>
            <a className="v14-button v14-button-ghost" href="/realizacje">Sprawdź realizacje</a>
          </div>
          <p className="v14-closing-taxonomy">STRONY WWW · WIDOCZNOŚĆ · AI · INTEGRACJE</p>
        </div>
      </div>
      <footer className="v14-shell v14-home-footer">
        <div className="v14-home-footer-brand"><FooterBrandIdentity /><small>marka Tervyxa Systems sp. z o.o.</small></div>
        <nav aria-label="Stopka"><a href="/uslugi">Usługi</a><a href="/realizacje">Realizacje</a><a href="/wiedza">Wiedza</a><a href="/o-nas">O nas</a></nav>
        <small>© 2026 LeadFlowAI</small>
      </footer>
    </section>
  );
}
