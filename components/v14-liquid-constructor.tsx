const steps = [
  ["01", "LIQUID", "signature interaction"],
  ["02", "GRID", "architektura informacji"],
  ["03", "PRODUCT UI", "interfejs i komponenty"],
  ["04", "SEARCH", "SEO · AEO · GEO"],
  ["05", "AI", "RAG · encje · integracje"],
] as const;

export function V14LiquidConstructor() {
  return (
    <section className="v14-foundation v14-liquid" aria-labelledby="v14-liquid-title">
      <div className="v14-shell v14-liquid-grid">
        <div>
          <p className="v14-liquid-kicker">03 / LIQUID WEB CONSTRUCTOR</p>
          <h2 id="v14-liquid-title">Z płynnej powierzchni do kompletnego produktu WWW.</h2>
          <p className="v14-liquid-lead">Liquid Engine nie jest już tapetą. Staje się początkiem systemu: powierzchnia odsłania grid, grid buduje interfejs, a nad produktem pojawiają się warstwy Search i AI.</p>
          <ol className="v14-liquid-steps">
            {steps.map(([n, title, copy]) => (
              <li key={n}>
                <span>{n}</span><strong>{title}</strong><small>{copy}</small>
              </li>
            ))}
          </ol>
        </div>

        <figure className="v14-liquid-stage">
          <svg viewBox="0 0 700 560" aria-hidden="true" className="v14-liquid-wave">
            <defs><radialGradient id="liquidGlow"><stop offset="0" stopColor="#c7ff2f" stopOpacity=".2"/><stop offset="1" stopColor="#c7ff2f" stopOpacity="0"/></radialGradient></defs>
            <ellipse cx="350" cy="430" rx="300" ry="104" fill="url(#liquidGlow)"/>
            <ellipse cx="350" cy="430" rx="250" ry="72" fill="none" stroke="#c7ff2f" strokeOpacity=".28"/>
            <ellipse cx="350" cy="430" rx="170" ry="48" fill="none" stroke="#c7ff2f" strokeOpacity=".15"/>
            <path d="M80 430 Q180 380 280 428 T480 426 T640 430" fill="none" stroke="#c7ff2f" strokeOpacity=".2"/>
          </svg>

          <div className="v14-liquid-layer v14-liquid-layer-grid"><span>02 / GRID</span></div>

          <div className="v14-liquid-layer v14-liquid-layer-product">
            <div className="v14-liquid-windowbar"><i /><small>leadflowai / product-ui</small></div>
            <div className="v14-liquid-product-body">
              <div>
                <small>03 / PRODUCT UI</small>
                <strong>Interfejs gotowy do działania.</strong>
                <span className="v14-liquid-copyline" />
                <span className="v14-liquid-copyline v14-liquid-copyline-short" />
              </div>
              <div className="v14-liquid-product-art" />
            </div>
          </div>

          <div className="v14-liquid-layer v14-liquid-layer-search">
            <span>04 / SEARCH</span><b>SEO</b><b>AEO</b><b>GEO</b>
          </div>
          <div className="v14-liquid-layer v14-liquid-layer-ai">
            <span>05 / AI</span><b>RAG</b><b>ENCJE</b><b>API</b><b>AGENT</b>
          </div>

          <figcaption className="v14-liquid-caption">LIQUID → GRID → PRODUCT → SEARCH → AI</figcaption>
        </figure>
      </div>
    </section>
  );
}
