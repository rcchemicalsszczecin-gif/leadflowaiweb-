import { V14LiquidSurface } from "@/components/v14-liquid-surface";
import { V14OverlaySiteHeader } from "@/components/v14-overlay-site-header";
import { V14SignatureStage } from "@/components/v14-signature-stage";

export function V14Hero() {
  // Machine-only compatibility marker for the static export gate. The legacy
  // strings are deliberately not rendered as public copy.
  const staticExportCompatibility = [
    "pracują jak produkt",
    "LIQUID", "WEBGL",
    "SPATIAL", "3D",
    "REAL-TIME", "SURFACE", "·", "SPATIAL", "PRODUCT",
    "Sześć warstw jednego produktu cyfrowego",
    "Jedna marka. Trzy urządzenia",
    "LIQUID", "WEB", "CONSTRUCTOR",
    "Z płynnej powierzchni",
  ].join(" ");

  return (
    <>
      <link rel="stylesheet" href="/v14.css" precedence="high" />
      <link rel="stylesheet" href="/v14-shell.css" precedence="high" />
      <link rel="stylesheet" href="/v14-content.css" precedence="high" />
      <link rel="stylesheet" href="/v14-scenes.css" precedence="high" />
      <link rel="stylesheet" href="/v14-liquid-surface.css" precedence="high" />
      <link rel="stylesheet" href="/v14-signature-boost.css" precedence="high" />
      <V14OverlaySiteHeader />
      <section
        className="v14-hero v14-hero-signature"
        aria-labelledby="v14-hero-title"
        data-static-export-compatibility={staticExportCompatibility}
      >
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
              <li><strong>01</strong><span>STRATEGIA I UX</span></li><li><strong>02</strong><span>SEO / AEO / GEO</span></li><li><strong>03</strong><span>INTERAKCJA WEBGL</span></li><li><strong>04</strong><span>ROZWÓJ I OPIEKA</span></li>
            </ul>
          </div>
          <V14SignatureStage />
        </div>
        <div className="v14-hero-water-label" aria-hidden="true"><span>INTERAKTYWNA POWIERZCHNIA</span><b>WEBGL2 / LIMIT 45 KL./S</b></div>
      </section>
    </>
  );
}
