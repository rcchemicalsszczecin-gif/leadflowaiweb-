import { V14LiquidSurface } from "@/components/v14-liquid-surface";
import { V14SignatureStage } from "@/components/v14-signature-stage";

const navItems = [
  { href: "/uslugi", label: "Usługi" },
  { href: "/realizacje", label: "Realizacje" },
  { href: "/#process", label: "Jak pracujemy" },
  { href: "/wiedza", label: "Wiedza" },
  { href: "/o-nas", label: "O nas" },
] as const;

export function V14Hero() {
  return (
    <>
      <link rel="stylesheet" href="/v14.css" precedence="high" />
      <link rel="stylesheet" href="/v14-shell.css" precedence="high" />
      <link rel="stylesheet" href="/v14-content.css" precedence="high" />
      <link rel="stylesheet" href="/v14-scenes.css" precedence="high" />
      <link rel="stylesheet" href="/v14-liquid-surface.css" precedence="high" />
      <a className="v14-skip-link" href="#main-content">Przejdź do treści</a>
      <header className="v14-header">
        <div className="v14-shell v14-header-inner">
          <a className="v14-brand" href="/" aria-label="LeadFlowAI — strona główna">
            <span className="v14-brand-mark" aria-hidden="true"><i /><i /></span><span>LEADFLOWAI</span>
          </a>
          <nav className="v14-nav" aria-label="Główna nawigacja">
            {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
          </nav>
          <div className="v14-header-actions">
            <details className="v14-mobile-nav">
              <summary aria-label="Otwórz nawigację mobilną">
                <span>MENU</span><i aria-hidden="true" />
              </summary>
              <nav className="v14-mobile-nav-panel" aria-label="Nawigacja mobilna">
                {navItems.map((item, index) => (
                  <a key={item.href} href={item.href}>
                    <span>{item.label}</span><span aria-hidden="true">0{index + 1}</span>
                  </a>
                ))}
                <a href="/kontakt"><span>Wyceń projekt</span><span aria-hidden="true">↗</span></a>
              </nav>
            </details>
            <a className="v14-header-cta" href="/kontakt">Wyceń projekt <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </header>
      <section className="v14-hero v14-hero-signature" aria-labelledby="v14-hero-title">
        <V14LiquidSurface variant="hero" />
        <div className="v14-hero-depth-mask" aria-hidden="true" />
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
              <li><strong>01</strong><span>PRODUCT UI</span></li><li><strong>02</strong><span>SEO / AEO / GEO</span></li><li><strong>03</strong><span>LIQUID WEBGL</span></li><li><strong>04</strong><span>SPATIAL 3D</span></li>
            </ul>
          </div>
          <V14SignatureStage />
        </div>
        <div className="v14-hero-water-label" aria-hidden="true"><span>REAL-TIME LIQUID</span><b>WEBGL2 / 45 FPS CAP</b></div>
      </section>
    </>
  );
}
