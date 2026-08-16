import { V14LiquidSurface } from "@/components/v14-liquid-surface";
import { V14OverlaySiteHeader } from "@/components/v14-overlay-site-header";
import { V14SignatureStage } from "@/components/v14-signature-stage";

export function V14Hero() {
  return (
    <>
      <link rel="stylesheet" href="/v14.css" precedence="high" />
      <link rel="stylesheet" href="/v14-shell.css" precedence="high" />
      <link rel="stylesheet" href="/v14-content.css" precedence="high" />
      <link rel="stylesheet" href="/v14-scenes.css" precedence="high" />
      <link rel="stylesheet" href="/v14-liquid-surface.css" precedence="high" />
      <link rel="stylesheet" href="/v14-signature-boost.css" precedence="high" />
      <V14OverlaySiteHeader />
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
