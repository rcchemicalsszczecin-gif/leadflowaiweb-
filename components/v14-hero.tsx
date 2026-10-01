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
            <p className="v14-kicker"><span>LEADFLOWAI</span> / STRONY I SYSTEMY WWW</p>
            <h1 id="v14-hero-title">Wyraziste strony, które <em>pomagają firmie rosnąć.</em></h1>
            <p className="v14-hero-lead">Projektujemy strony i systemy WWW, które łączą mocny wizerunek, czytelną ofertę, widoczność oraz technologię gotową do dalszego rozwoju.</p>
            <div className="v14-hero-actions">
              <a className="v14-button v14-button-primary" href="#kontakt">Porozmawiajmy o projekcie <span aria-hidden="true">↗</span></a>
              <a className="v14-button v14-button-ghost" href="#realizacje">Zobacz prawdziwe realizacje</a>
            </div>
            <ul className="v14-hero-signals" aria-label="Standard projektu">
              <li><span>STRATEGIA I UX</span></li><li><span>SEO / AEO / GEO</span></li><li><span>INTERAKCJA WEBGL</span></li><li><span>ROZWÓJ I OPIEKA</span></li>
            </ul>
          </div>
          <V14SignatureStage />
        </div>
      </section>
    </>
  );
}
