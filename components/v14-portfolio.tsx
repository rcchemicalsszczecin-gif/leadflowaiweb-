import { portfolioCases } from "@/lib/portfolio";

export function V14Portfolio() {
  return (
    <section id="realizacje" className="v14-foundation v15-portfolio" aria-labelledby="v14-portfolio-title">
      <div className="v14-shell">
        <div className="v15-portfolio-head"><p>REALIZACJE WŁASNE I MARKI POWIĄZANE</p><h2 id="v14-portfolio-title">Pokazujemy zakres, stan i ograniczenia — nie wymyślone wyniki.</h2><span>To projekty własne ekosystemu Tervyxa Systems, a nie lista zewnętrznych klientów.</span></div>
        <div className="v15-portfolio-list">
          {portfolioCases.map((project, index) => (
            <article key={project.name}>
              <div><small>0{index + 1}</small><span>PROJEKT WŁASNY / MARKA POWIĄZANA</span></div>
              <h3>{project.name}</h3><p>{project.scope[0].description}</p>
              <a href={project.url} target="_blank" rel="noreferrer">Otwórz publiczny serwis <span aria-hidden="true">↗</span></a>
            </article>
          ))}
        </div>
        <a className="v14-button v14-button-ghost v15-portfolio-more" href="/realizacje">Zobacz pełny zakres i ograniczenia</a>
        <aside className="v15-trust-line"><strong>MARKA I ODPOWIEDZIALNOŚĆ.</strong> LeadFlowAI to marka Tervyxa Systems sp. z o.o. Nie obiecujemy pozycji ani wyników sprzedażowych. <a href="/o-nas">Poznaj sposób pracy <span aria-hidden="true">↗</span></a></aside>
      </div>
    </section>
  );
}
