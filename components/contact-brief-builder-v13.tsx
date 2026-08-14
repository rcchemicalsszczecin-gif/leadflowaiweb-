"use client";

import { useState } from "react";
import { site } from "@/lib/site";

const projectOptions = ["STRONA WWW", "SKLEP INTERNETOWY", "APLIKACJA / SYSTEM", "SEO / AEO / GEO", "AI / INTEGRACJE"] as const;
const goalOptions = ["WIĘCEJ ZAPYTAŃ", "SPRZEDAŻ", "LEPSZA WIDOCZNOŚĆ", "MODERNIZACJA", "AUTOMATYZACJA"] as const;
const stateOptions = ["START OD ZERA", "MAM OBECNĄ STRONĘ", "MAM PROJEKT DO ROZBUDOWY"] as const;

export function ContactBriefBuilderV13() {
  const [project, setProject] = useState<(typeof projectOptions)[number]>("STRONA WWW");
  const [goal, setGoal] = useState<(typeof goalOptions)[number]>("WIĘCEJ ZAPYTAŃ");
  const [state, setState] = useState<(typeof stateOptions)[number]>("START OD ZERA");
  const subject = encodeURIComponent(`LeadFlowAI — ${project} / ${goal}`);
  const body = encodeURIComponent(`Rodzaj projektu: ${project}\nGłówny cel: ${goal}\nStan obecny: ${state}\n\nDodatkowy opis projektu:\n`);

  return (
    <section className="command-center content-frame" aria-labelledby="contact-brief-builder-title">
      <div className="command-copy">
        <p className="experience-kicker">BRIEF / BEZ BACKENDU</p>
        <h2 id="contact-brief-builder-title">Ułóż pierwszą wiadomość w trzech krokach.</h2>
        <p>Wybory pozostają wyłącznie w przeglądarce. Kliknięcie otwiera przygotowaną wiadomość e-mail — strona niczego nie zapisuje ani nie wysyła samodzielnie.</p>
      </div>
      <div className="command-console">
        <div className="command-row">
          <span>RODZAJ PROJEKTU</span>
          <div>{projectOptions.map((option) => <button type="button" key={option} aria-pressed={project === option} className={project === option ? "is-active" : ""} onClick={() => setProject(option)}>{option}</button>)}</div>
        </div>
        <div className="command-row">
          <span>GŁÓWNY CEL</span>
          <div>{goalOptions.map((option) => <button type="button" key={option} aria-pressed={goal === option} className={goal === option ? "is-active" : ""} onClick={() => setGoal(option)}>{option}</button>)}</div>
        </div>
        <div className="command-row">
          <span>STAN OBECNY</span>
          <div>{stateOptions.map((option) => <button type="button" key={option} aria-pressed={state === option} className={state === option ? "is-active" : ""} onClick={() => setState(option)}>{option}</button>)}</div>
        </div>
        <div className="command-status"><span>BRIEF / GOTOWY</span><strong>{project} → {goal}</strong><i /></div>
        <a className="button button-primary button-large" href={`mailto:${site.email}?subject=${subject}&body=${body}`}>OTWÓRZ WIADOMOŚĆ <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}
