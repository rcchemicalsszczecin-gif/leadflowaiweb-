"use client";

import { FormEvent, useState } from "react";
import { site } from "@/lib/site";

type ChatLine = {
  id: number;
  role: "assistant" | "user";
  text: string;
};

type ChatResponse = {
  ok?: boolean;
  answer?: string;
  code?: string;
};

const suggestions = ["Czy robicie sklepy internetowe?", "Jak działa SEO + AEO + GEO?", "Jak wycenić stronę?"] as const;

export function SiteAssistant() {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useState("");
  const [sequence, setSequence] = useState(2);
  const [lines, setLines] = useState<ChatLine[]>([
    {
      id: 1,
      role: "assistant",
      text: "Mogę pomóc dobrać typ strony, wyjaśnić SEO/AEO/GEO, chatboty, modernizację albo skierować Cię do wyceny.",
    },
  ]);

  async function ask(message: string) {
    const text = message.trim();
    if (!text || busy) return;

    const userId = sequence;
    const assistantId = sequence + 1;
    setSequence((value) => value + 2);
    setLines((current) => [...current, { id: userId, role: "user", text }]);
    setInput("");
    setBusy(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = (await response.json().catch(() => ({}))) as ChatResponse;
      const answer =
        response.ok && typeof data.answer === "string"
          ? data.answer
          : `Nie mogę teraz odpowiedzieć w czacie. Napisz na ${site.email} albo przejdź do /kontakt.`;

      setLines((current) => [...current, { id: assistantId, role: "assistant", text: answer }]);
    } catch {
      setLines((current) => [
        ...current,
        {
          id: assistantId,
          role: "assistant",
          text: `Połączenie z asystentem jest chwilowo niedostępne. Napisz na ${site.email} albo przejdź do /kontakt.`,
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void ask(input);
  }

  return (
    <>
      {open ? (
        <aside className="site-assistant" aria-label="Asystent LeadFlowAI">
          <div className="assistant-head">
            <div>
              <p>LEADFLOWAI / ASSISTANT</p>
              <strong>Pomoc w wyborze rozwiązania WWW</strong>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Zamknij asystenta">
              ×
            </button>
          </div>

          <div className="assistant-lines" aria-live="polite" aria-relevant="additions text">
            {lines.map((line) => (
              <p key={line.id} className={`assistant-line assistant-line-${line.role}`}>
                <span>{line.role === "assistant" ? "AI" : "TY"}</span>
                {line.text}
              </p>
            ))}
            {busy ? <p className="assistant-thinking">Sprawdzam zatwierdzone informacje…</p> : null}
          </div>

          <div className="assistant-suggestions" aria-label="Przykładowe pytania">
            {suggestions.map((suggestion) => (
              <button key={suggestion} type="button" onClick={() => void ask(suggestion)} disabled={busy}>
                {suggestion}
              </button>
            ))}
          </div>

          <form className="assistant-form" onSubmit={submit}>
            <label htmlFor="assistant-message">Twoje pytanie</label>
            <div>
              <input
                id="assistant-message"
                name="message"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                maxLength={1000}
                autoComplete="off"
                placeholder="Np. potrzebuję nowej strony firmowej…"
              />
              <button type="submit" disabled={busy || input.trim().length < 2}>
                Wyślij
              </button>
            </div>
          </form>

          <p className="assistant-footnote">
            Asystent nie podaje niezatwierdzonych cen ani gwarancji wyników. Kontakt: <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </aside>
      ) : null}

      <button
        className="assistant-launcher"
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true">L/</span>
        Zapytaj LeadFlowAI
      </button>
    </>
  );
}
