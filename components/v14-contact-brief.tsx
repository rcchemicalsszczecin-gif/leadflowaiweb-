"use client";

import { useState } from "react";
import { site } from "@/lib/site";

const projectOptions = ["STRONA WWW", "SKLEP", "APLIKACJA", "SEO / AEO / GEO", "AI / INTEGRACJE"] as const;
const goalOptions = ["WIĘCEJ ZAPYTAŃ", "SPRZEDAŻ", "WIDOCZNOŚĆ", "MODERNIZACJA", "AUTOMATYZACJA"] as const;
const stateOptions = ["START OD ZERA", "MAM STRONĘ", "ROZBUDOWUJĘ SYSTEM"] as const;

export function V14ContactBrief() {
  const [project, setProject] = useState<(typeof projectOptions)[number]>("STRONA WWW");
  const [goal, setGoal] = useState<(typeof goalOptions)[number]>("WIĘCEJ ZAPYTAŃ");
  const [state, setState] = useState<(typeof stateOptions)[number]>("START OD ZERA");

  const subject = encodeURIComponent(`LeadFlowAI — ${project} / ${goal}`);
  const body = encodeURIComponent(
    `Rodzaj projektu: ${project}\nGłówny cel: ${goal}\nStan obecny: ${state}\n\nDodatkowy opis projektu:\n`,
  );

  return (
    <section className="v14-brief" aria-labelledby="v14-brief-title">
      <div className="v14-shell v14-brief-grid">
        <div className="v14-brief-copy">
          <p>08 / BRIEF PROJEKTU</p>
          <h2 id="v14-brief-title">Trzy decyzje wystarczą, żeby zacząć rozmowę.</h2>
          <span>
            Wybory pozostają w przeglądarce. Strona niczego nie zapisuje ani nie wysyła
            samodzielnie — przycisk otwiera przygotowaną wiadomość e-mail.
          </span>
        </div>

        <div className="v14-brief-console">
          <OptionGroup label="RODZAJ PROJEKTU" options={projectOptions} value={project} onChange={setProject} />
          <OptionGroup label="GŁÓWNY CEL" options={goalOptions} value={goal} onChange={setGoal} />
          <OptionGroup label="STAN OBECNY" options={stateOptions} value={state} onChange={setState} />

          <div className="v14-brief-result" aria-live="polite">
            <small>BRIEF / GOTOWY</small>
            <strong>{project} → {goal}</strong>
          </div>

          <a
            className="v14-button v14-button-primary v14-brief-action"
            href={`mailto:${site.email}?subject=${subject}&body=${body}`}
          >
            Otwórz wiadomość <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

type OptionGroupProps<T extends string> = {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
};

function OptionGroup<T extends string>({ label, options, value, onChange }: OptionGroupProps<T>) {
  return (
    <fieldset className="v14-brief-group">
      <legend>{label}</legend>
      <div>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={value === option}
            className={value === option ? "is-active" : ""}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
