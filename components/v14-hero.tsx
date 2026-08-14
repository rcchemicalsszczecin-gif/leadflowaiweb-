import { V14ProductStage } from "@/components/v14-product-stage";

export function V14Hero() {
  return (
    <>
      <header className="v14-header">
        <div className="v14-shell v14-header-inner">
          <a className="v14-brand" href="/" aria-label="LeadFlowAI — strona główna">
            <span className="v14-brand-mark" aria-hidden="true"><i /><i /></span><span>LEADFLOWAI</span>
          </a>
          <nav className="v14-nav" aria-label="Główna nawigacja">
            <a href="/uslugi">Usługi</a><a href="/realizacje">Realizacje</a><a href="/wiedza">Wiedza</a><a href="/o-nas">O nas</a>
          </nav>
          <a className="v14-header-cta" href="/kontakt">Wyceń projekt <span aria-hidden="true">↗</span></a>
        </div>
      </header>
      <section className="v14-hero" aria-labelledby="v14-hero-title">
        <div className="v14-shell v14-hero-grid">
          <div className="v14-hero-copy">
            <p className="v14-kicker"><span>LEADFLOWAI</span> / WEB PRODUCTS · SEARCH · AI</p>
            <h1 id="v14-hero-title">Strony internetowe, które <em>pracują jak produkt.</em></h1>
            <p className="v14-hero-lead">Projektujemy premium WWW i systemy webowe. Design, kod, SEO/AEO/GEO, konwersja i AI działają jako jeden spójny produkt — nie przypadkowe dodatki.</p>
            <div className="v14-hero-actions">
              <a className="v14-button v14-button-primary" href="/kontakt">Wyceń projekt <span aria-hidden="true">↗</span></a>
              <a className="v14-button v14-button-ghost" href="/realizacje">Zobacz realizacje</a>
            </div>
            <ul className="v14-hero-signals" aria-label="Standard projektu">
              <li><strong>01</strong><span>PRODUCT UI</span></li><li><strong>02</strong><span>SEO / AEO / GEO</span></li><li><strong>03</strong><span>MOBILE FIRST</span></li><li><strong>04</strong><span>PERFORMANCE</span></li>
            </ul>
          </div>
          <V14ProductStage />
        </div>
      </section>
    </>
  );
}
