const steps = [
  ["01", "Diagnoza", "Cel, odbiorca i wynik biznesowy."],
  ["02", "Architektura", "Informacja, UX, content, search i dane."],
  ["03", "Projekt + build", "Design system, komponenty i kod."],
  ["04", "Walidacja", "Mobile, dostępność, performance i bezpieczeństwo."],
  ["05", "Publikacja + rozwój", "Wdrożenie, monitoring i dalsze decyzje."],
] as const;

const css = `.v14-pc{background:#0a0d10;color:#f5f7f2;padding:108px 0 120px}.v14-pc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:60px;align-items:center}.v14-pc-k{margin:0;font-size:11px;letter-spacing:.16em;color:#8f998f}.v14-pc h2{margin:18px 0 22px;font-size:clamp(42px,5vw,70px);line-height:.98;letter-spacing:-.06em}.v14-pc-lead{max-width:610px;margin:0;font-size:17px;line-height:1.65;color:#a7afa7}.v14-pc-list{list-style:none;padding:0;margin:30px 0 0}.v14-pc-list li{display:grid;grid-template-columns:38px 142px 1fr;gap:12px;padding:12px 0;border-top:1px solid #ffffff1a}.v14-pc-list span{font-size:10px;color:#c7ff2f}.v14-pc-list strong{font-size:13px}.v14-pc-list small{font-size:12px;line-height:1.45;color:#7f897f}.v14-qc-img{display:block;width:100%;height:auto}@media(max-width:620px){.v14-pc{padding:74px 0 84px}.v14-pc-list li{grid-template-columns:32px 1fr}.v14-pc-list small{grid-column:2}}`;

export function V14ProcessCanvas() {
  return (
    <section id="process" className="v14-pc" aria-labelledby="v14-process-title">
      <style>{css}</style>
      <div className="v14-shell v14-pc-grid">
        <div>
          <p className="v14-pc-k">05 / METODOLOGIA</p>
          <h2 id="v14-process-title">Od decyzji biznesowej do działającego produktu.</h2>
          <p className="v14-pc-lead">Proces prowadzi do kolejnych decyzji i działających artefaktów.</p>
          <ol className="v14-pc-list">
            {steps.map(([n, title, copy]) => <li key={n}><span>{n}</span><strong>{title}</strong><small>{copy}</small></li>)}
          </ol>
        </div>
        <figure style={{ margin: 0 }}>
          <img className="v14-qc-img" src="/v14-quality-canvas.svg" alt="Quality Canvas LeadFlowAI: dostępność, wydajność, search i bezpieczeństwo przed publikacją" />
        </figure>
      </div>
    </section>
  );
}
