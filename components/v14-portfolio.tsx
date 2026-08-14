export function V14Portfolio() {
  return (
    <section className="v14-foundation" aria-labelledby="v14-portfolio-title">
      <div className="v14-shell">
        <p>06 / REALIZACJE WŁASNE</p>
        <h2 id="v14-portfolio-title">Najpierw pokazujemy własne produkty. Dopiero potem składamy deklaracje.</h2>
        <figure style={{ margin: "0 0 26px" }}>
          <img src="/v14-portfolio-stage.svg" alt="Wizualizacja systemowa projektów własnych LeadFlowAI, Tervyxa i TranskrypcjaAI" style={{ display: "block", width: "100%", height: "auto", borderRadius: 24 }} />
          <figcaption style={{ marginTop: 10, fontSize: 10, color: "#697069" }}>Wizualizacja systemowa · nie jest screenshotem klienta.</figcaption>
        </figure>
        <nav aria-label="Projekty własne LeadFlowAI" style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          <a className="v14-header-cta" href="/realizacje">LeadFlowAI.pl ↗</a>
          <a className="v14-header-cta" href="/realizacje">Tervyxa.pl ↗</a>
          <a className="v14-header-cta" href="/realizacje">TranskrypcjaAI.pl ↗</a>
          <a className="v14-header-cta" href="/realizacje">Zobacz pełne realizacje ↗</a>
        </nav>
      </div>
    </section>
  );
}
