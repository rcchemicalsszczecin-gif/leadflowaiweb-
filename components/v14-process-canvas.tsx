import Image from "next/image";

const steps = [
  ["1", "Diagnoza", "Cel, odbiorca i wynik biznesowy."],
  ["2", "Architektura", "Informacja, UX, treść, widoczność i dane."],
  ["3", "Projekt i budowa", "Kierunek wizualny, komponenty i kod."],
  ["4", "Sprawdzenie", "Telefon, dostępność, wydajność i bezpieczeństwo."],
  ["5", "Publikacja + rozwój", "Wdrożenie, monitoring i dalsze decyzje."],
] as const;

export function V14ProcessCanvas() {
  return (
    <section id="process" className="v14-pc" aria-labelledby="v14-process-title">
      <div className="v14-shell v14-pc-grid">
        <div>
          <p className="v14-pc-k">JAK PRACUJEMY</p>
          <h2 id="v14-process-title">Każdy etap kończy się czymś, co można sprawdzić.</h2>
          <p className="v14-pc-lead">Najpierw ustalamy cel i zakres. Potem projektujemy, budujemy oraz weryfikujemy całość przed publikacją — bez ukrywania ryzyk i stanu prac.</p>
          <ol className="v14-pc-list">
            {steps.map(([n, title, copy]) => <li key={n}><span>{n}</span><strong>{title}</strong><small>{copy}</small></li>)}
          </ol>
          <p className="v15-process-boundary"><strong>Po naszej stronie:</strong> diagnoza, projekt, budowa i weryfikacja. <strong>Po Twojej:</strong> kontekst firmy, materiały, decyzje i akceptacja zakresu.</p>
        </div>
        <figure className="v14-qc-figure">
          <Image
            className="v14-qc-img"
            src="/v14-quality-canvas.svg"
            alt="Plan kontroli jakości LeadFlowAI: dostępność, wydajność, widoczność i bezpieczeństwo przed publikacją"
            width={720}
            height={560}
            sizes="(max-width: 768px) 100vw, 680px"
          />
        </figure>
      </div>
    </section>
  );
}
