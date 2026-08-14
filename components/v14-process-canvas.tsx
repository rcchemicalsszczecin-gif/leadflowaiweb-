const steps = [
  ["01", "Diagnoza", "Cel, odbiorca, obecny stan i wynik biznesowy."],
  ["02", "Architektura", "Informacja, UX, content, search i dane."],
  ["03", "Projekt + build", "Design system, komponenty, kod i interakcje."],
  ["04", "Walidacja", "Mobile, dostępność, performance i bezpieczeństwo."],
  ["05", "Publikacja + rozwój", "Wdrożenie, monitoring i dalsze decyzje."],
] as const;

const quality = [
  ["ACCESSIBILITY", "Klawiatura · focus · kontrast · reduced motion"],
  ["PERFORMANCE", "Budżety · CWV · JS/CSS · static artifact"],
  ["SEARCH", "SEO · AEO · GEO · schema · canonical"],
  ["SECURITY", "Boundary · brak sekretów · kontrola integracji"],
] as const;

const css = `.v14-pc{background:#0a0d10;color:#f5f7f2;padding:118px 0 132px}.v14-pc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:64px;align-items:start}.v14-pc-k{margin:0;font-size:11px;letter-spacing:.16em;color:#8f998f}.v14-pc h2{margin:18px 0 22px;font-size:clamp(42px,5vw,70px);line-height:.98;letter-spacing:-.06em}.v14-pc-lead{max-width:610px;margin:0;font-size:17px;line-height:1.65;color:#a7afa7}.v14-pc-list{list-style:none;padding:0;margin:34px 0 0}.v14-pc-list li{display:grid;grid-template-columns:42px 150px 1fr;gap:14px;padding:15px 0;border-top:1px solid #ffffff1a}.v14-pc-list span{font-size:10px;color:#c7ff2f}.v14-pc-list strong{font-size:13px}.v14-pc-list small{font-size:12px;line-height:1.45;color:#7f897f}.v14-qc{margin:0;padding:18px;border:1px solid #ffffff21;border-radius:26px;background:#101519;box-shadow:0 36px 90px #0005}.v14-qc-head{display:flex;align-items:center;gap:7px;padding:3px 4px 16px;border-bottom:1px solid #ffffff14}.v14-qc-dot{width:7px;height:7px;border-radius:50%;background:#c7ff2f}.v14-qc-head small{font-size:9px;letter-spacing:.12em;color:#778177}.v14-qc-head b{margin-left:auto;font-size:9px;color:#c7ff2f}.v14-qc-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;padding-top:16px}.v14-qc-card{min-height:145px;padding:15px;border:1px solid #ffffff14;border-radius:16px;background:#ffffff05}.v14-qc-card:nth-child(2){background:linear-gradient(145deg,#142018,#101519)}.v14-qc-card small{font-size:8px;color:#c7ff2f}.v14-qc-card strong{display:block;margin:12px 0 9px;font-size:15px}.v14-qc-card span{font-size:11px;line-height:1.5;color:#879087}.v14-qc-bar{height:4px;margin-top:17px;border-radius:99px;background:linear-gradient(90deg,#c7ff2f 72%,#29312b 72%)}.v14-qc-rule{display:grid;grid-template-columns:1fr auto;gap:18px;align-items:center;margin-top:10px;padding:16px 14px;border-radius:15px;background:#0b0f12}.v14-qc-rule small{font-size:8px;color:#778177}.v14-qc-rule strong{display:block;margin-top:5px;font-size:14px}.v14-qc-badge{padding:7px 10px;border:1px solid #c7ff2f55;border-radius:99px;color:#c7ff2f;font-size:9px}.v14-qc figcaption{margin-top:12px;font-size:9px;color:#667066}@media(max-width:620px){.v14-pc{padding:78px 0 88px}.v14-pc-list li{grid-template-columns:34px 1fr}.v14-pc-list small{grid-column:2}.v14-qc-grid{grid-template-columns:1fr}.v14-qc-rule{grid-template-columns:1fr}}`;

export function V14ProcessCanvas() {
  return (
    <section className="v14-pc" aria-labelledby="v14-process-title">
      <style>{css}</style>
      <div className="v14-shell v14-pc-grid">
        <div>
          <p className="v14-pc-k">05 / METODOLOGIA</p>
          <h2 id="v14-process-title">Od decyzji biznesowej do działającego produktu.</h2>
          <p className="v14-pc-lead">Proces ma prowadzić do kolejnych artefaktów i decyzji, nie do prezentacji dla samej prezentacji.</p>
          <ol className="v14-pc-list">
            {steps.map(([n, title, copy]) => <li key={n}><span>{n}</span><strong>{title}</strong><small>{copy}</small></li>)}
          </ol>
        </div>
        <figure className="v14-qc">
          <div className="v14-qc-head"><i className="v14-qc-dot" /><small>LEADFLOW / QUALITY CANVAS</small><b>PRE-PUBLISH</b></div>
          <div className="v14-qc-grid">
            {quality.map(([title, copy], index) => <article className="v14-qc-card" key={title}><small>0{index + 1}</small><strong>{title}</strong><span>{copy}</span><div className="v14-qc-bar" aria-hidden="true" /></article>)}
          </div>
          <div className="v14-qc-rule"><div><small>RELEASE RULE</small><strong>Publikujemy dopiero po przejściu ustalonych gate’ów.</strong></div><span className="v14-qc-badge">EVIDENCE FIRST</span></div>
          <figcaption>Panel pokazuje obszary walidacji, nie syntetyczne wyniki klienta.</figcaption>
        </figure>
      </div>
    </section>
  );
}
