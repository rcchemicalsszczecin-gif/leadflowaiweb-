import Image from "next/image";

const steps = [
  ["01", "Diagnoza", "Cel, odbiorca i wynik biznesowy."],
  ["02", "Architektura", "Informacja, UX, content, search i dane."],
  ["03", "Projekt + build", "Design system, komponenty i kod."],
  ["04", "Walidacja", "Mobile, dostępność, performance i bezpieczeństwo."],
  ["05", "Publikacja + rozwój", "Wdrożenie, monitoring i dalsze decyzje."],
] as const;

export function V14ProcessCanvas() {
  return (
    <section id="process" className="v14-pc" aria-labelledby="v14-process-title">
      <div className="v14-shell v14-pc-grid">
        <div>
          <p className="v14-pc-k">05 / METODOLOGIA</p>
          <h2 id="v14-process-title">Od decyzji biznesowej do działającego produktu.</h2>
          <p className="v14-pc-lead">Proces prowadzi do kolejnych decyzji i działających artefaktów.</p>
          <ol className="v14-pc-list">
            {steps.map(([n, title, copy]) => <li key={n}><span>{n}</span><strong>{title}</strong><small>{copy}</small></li>)}
          </ol>
        </div>
        <figure className="v14-qc-figure">
          <Image
            className="v14-qc-img"
            src="/v14-quality-canvas.svg"
            alt="Quality Canvas LeadFlowAI: dostępność, wydajność, search i bezpieczeństwo przed publikacją"
            width={720}
            height={560}
            sizes="(max-width: 768px) 100vw, 680px"
          />
        </figure>
      </div>
    </section>
  );
}
