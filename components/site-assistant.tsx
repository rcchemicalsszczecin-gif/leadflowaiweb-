"use client";

import { useState } from "react";
import { site } from "@/lib/site";

const suggestions = ["Czy robicie sklepy internetowe?", "Jak działa SEO + AEO + GEO?", "Jak wycenić stronę?"] as const;

export function SiteAssistant() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open ? (
        <aside className="site-assistant" aria-label="Asystent LeadFlowAI — funkcja wyłączona">
          <div className="assistant-head">
            <div>
              <p>LEADFLOWAI / ASSISTANT</p>
              <strong>Publiczny czat jest obecnie wyłączony.</strong>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Zamknij asystenta">×</button>
          </div>
          <div className="assistant-lines" aria-live="polite">
            <p className="assistant-line assistant-line-assistant">
              <span>AI</span>
              Ta funkcja nie łączy się z żadnym backendem. Jeśli chcesz omówić stronę, SEO/AEO/GEO, chatbot, modernizację albo wycenę, napisz bezpośrednio na {site.email}.
            </p>
          </div>
          <nav className="assistant-suggestions" aria-label="Przykładowe tematy rozmowy">
            {suggestions.map((suggestion) => (
              <a key={suggestion} href={`mailto:${site.email}?subject=${encodeURIComponent(`LeadFlowAI: ${suggestion}`)}`}>
                {suggestion}
              </a>
            ))}
          </nav>
          <p className="assistant-footnote">
            Brak zapisu danych · brak połączenia sieciowego · brak automatycznej odpowiedzi. Kontakt: <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </aside>
      ) : null}
      <button className="assistant-launcher" type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        <span aria-hidden="true">L/</span>Informacja o asystencie
      </button>
    </>
  );
}
