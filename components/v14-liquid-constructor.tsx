import { V14LiquidSurface } from "@/components/v14-liquid-surface";

const steps = [
  ["1", "RUCH", "interakcja z konkretną rolą"],
  ["2", "STRUKTURA", "architektura informacji"],
  ["3", "INTERFEJS", "komponenty i działanie"],
  ["4", "WIDOCZNOŚĆ", "SEO · AEO · GEO"],
  ["5", "AI", "RAG · encje · integracje"],
] as const;

export function V14LiquidConstructor() {
  return (
    <section id="liquid" className="v14-foundation v14-liquid" aria-labelledby="v14-liquid-title">
      <div className="v14-shell v14-liquid-grid">
        <div>
          <p className="v14-liquid-kicker">INTERAKCJA Z UZASADNIENIEM</p>
          <h2 id="v14-liquid-title">Efekt ma sens wtedy, gdy wspiera doświadczenie marki.</h2>
          <p className="v14-liquid-lead">Interaktywna powierzchnia pokazuje, jak budujemy ruch i głębię bez ukrywania treści. Gdy urządzenie lub preferencje użytkownika tego wymagają, strona zachowuje znaczenie także bez WebGL.</p>
          <ol className="v14-liquid-steps">
            {steps.map(([n, title, copy]) => (
              <li key={n}>
                <span>{n}</span><strong>{title}</strong><small>{copy}</small>
              </li>
            ))}
          </ol>
        </div>

        <figure className="v14-liquid-stage">
          <V14LiquidSurface variant="constructor" />

          <svg viewBox="0 0 700 560" aria-hidden="true" className="v14-liquid-wave">
            <defs><radialGradient id="liquidGlow"><stop offset="0" stopColor="#5bdcff" stopOpacity=".2"/><stop offset="1" stopColor="#5bdcff" stopOpacity="0"/></radialGradient></defs>
            <ellipse cx="350" cy="430" rx="300" ry="104" fill="url(#liquidGlow)"/>
            <ellipse cx="350" cy="430" rx="250" ry="72" fill="none" stroke="#5bdcff" strokeOpacity=".28"/>
            <ellipse cx="350" cy="430" rx="170" ry="48" fill="none" stroke="#5bdcff" strokeOpacity=".15"/>
            <path d="M80 430 Q180 380 280 428 T480 426 T640 430" fill="none" stroke="#5bdcff" strokeOpacity=".2"/>
          </svg>

          <div className="v14-liquid-layer v14-liquid-layer-grid"><span>2 / STRUKTURA</span></div>

          <div className="v14-liquid-layer v14-liquid-layer-product">
              <div className="v14-liquid-windowbar"><i /><small>leadflowai / interfejs</small></div>
            <div className="v14-liquid-product-body">
              <div>
                <small>3 / INTERFEJS</small>
                <strong>Interfejs gotowy do działania.</strong>
                <span className="v14-liquid-product-note">Treść prowadzi do jasnego kolejnego kroku.</span>
              </div>
              <div className="v14-liquid-product-art"><span>CEL</span><i>→</i><strong>KONTAKT</strong></div>
            </div>
          </div>

          <div className="v14-liquid-layer v14-liquid-layer-search">
            <span>4 / WIDOCZNOŚĆ</span><b>SEO</b><b>AEO</b><b>GEO</b>
          </div>
          <div className="v14-liquid-layer v14-liquid-layer-ai">
            <span>5 / AI</span><b>RAG</b><b>ENCJE</b><b>API</b><b>AGENT</b>
          </div>

          <figcaption className="v14-liquid-caption">RUCH → STRUKTURA → INTERFEJS → WIDOCZNOŚĆ → AI</figcaption>
        </figure>
      </div>
    </section>
  );
}
