"use client";

import { useState } from "react";
import { budgetRanges, projectTypes } from "@/lib/lead";
import { site } from "@/lib/site";

type SubmitState =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string; fallbackEmail?: string };

type ErrorMap = Record<string, string>;

const projectLabels: Record<(typeof projectTypes)[number], string> = {
  "strona-firmowa": "Strona firmowa / usługowa",
  "landing-page": "Landing page",
  "e-commerce": "Sklep internetowy / e-commerce",
  modernizacja: "Modernizacja / redesign",
  "web-development": "Custom web development",
  audyt: "Audyt strony",
  "seo-aeo-geo": "SEO + AEO + GEO / AI Search",
  inne: "Inny projekt WWW",
};

const budgetLabels: Record<(typeof budgetRanges)[number], string> = {
  "nie-wiem": "Nie wiem — dobierzmy zakres",
  "do-3000": "Do 3 000 zł",
  "3000-6000": "3 000–6 000 zł",
  "6000-12000": "6 000–12 000 zł",
  "12000-plus": "12 000 zł+",
};

function FieldError({ name, errors }: { name: string; errors: ErrorMap }) {
  const error = errors[name];
  if (!error) return null;
  return (
    <p className="field-error" id={`${name}-error`} role="alert">
      {error}
    </p>
  );
}

export function LeadForm() {
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [state, setState] = useState<SubmitState>({ kind: "idle" });
  const [errors, setErrors] = useState<ErrorMap>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state.kind === "sending") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      company: formData.get("company"),
      projectType: formData.get("projectType"),
      currentUrl: formData.get("currentUrl"),
      goal: formData.get("goal"),
      scope: formData.get("scope"),
      budget: formData.get("budget"),
      deadline: formData.get("deadline"),
      website: formData.get("website"),
      contactPermission: formData.get("contactPermission") === "on",
      startedAt,
    };

    setErrors({});
    setState({ kind: "sending" });

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        code?: string;
        errors?: ErrorMap;
        fallbackEmail?: string;
      };

      if (response.status === 202 && data.ok) {
        form.reset();
        setStartedAt(Date.now());
        setState({
          kind: "success",
          message: "Zapytanie zostało przyjęte. Odpowiemy na podany adres e-mail.",
        });
        return;
      }

      if (response.status === 422 && data.errors) {
        setErrors(data.errors);
        setState({ kind: "error", message: "Sprawdź zaznaczone pola formularza." });
        return;
      }

      if (response.status === 429) {
        setState({
          kind: "error",
          message: "Wysłano zbyt wiele prób w krótkim czasie. Spróbuj ponownie później lub napisz e-mail.",
          fallbackEmail: site.email,
        });
        return;
      }

      setState({
        kind: "error",
        message:
          data.code === "DELIVERY_UNCONFIGURED"
            ? "Formularz nie ma jeszcze skonfigurowanego kanału dostarczenia. Napisz bezpośrednio na e-mail."
            : "Nie udało się bezpiecznie dostarczyć zapytania. Napisz bezpośrednio na e-mail.",
        fallbackEmail: data.fallbackEmail || site.email,
      });
    } catch {
      setState({
        kind: "error",
        message: "Nie udało się połączyć z formularzem. Napisz bezpośrednio na e-mail.",
        fallbackEmail: site.email,
      });
    }
  }

  const describedBy = (name: string) => (errors[name] ? `${name}-error` : undefined);

  return (
    <form className="lead-form" onSubmit={handleSubmit} noValidate>
      <div className="form-section-head">
        <span>01</span>
        <div>
          <p className="form-kicker">KONTAKT</p>
          <h2>Kto zgłasza projekt?</h2>
        </div>
      </div>

      <div className="form-grid form-grid-two">
        <label>
          <span>Imię / osoba kontaktowa *</span>
          <input name="name" autoComplete="name" required aria-invalid={Boolean(errors.name)} aria-describedby={describedBy("name")} />
          <FieldError name="name" errors={errors} />
        </label>
        <label>
          <span>E-mail *</span>
          <input name="email" type="email" autoComplete="email" required aria-invalid={Boolean(errors.email)} aria-describedby={describedBy("email")} />
          <FieldError name="email" errors={errors} />
        </label>
        <label>
          <span>Telefon</span>
          <input name="phone" type="tel" autoComplete="tel" />
        </label>
        <label>
          <span>Firma / marka</span>
          <input name="company" autoComplete="organization" />
        </label>
      </div>

      <div className="form-section-head">
        <span>02</span>
        <div>
          <p className="form-kicker">PROJEKT</p>
          <h2>Co ma powstać?</h2>
        </div>
      </div>

      <div className="form-grid form-grid-two">
        <label>
          <span>Rodzaj projektu *</span>
          <select name="projectType" defaultValue="" required aria-invalid={Boolean(errors.projectType)} aria-describedby={describedBy("projectType")}>
            <option value="" disabled>Wybierz zakres</option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>{projectLabels[type]}</option>
            ))}
          </select>
          <FieldError name="projectType" errors={errors} />
        </label>
        <label>
          <span>Obecna strona</span>
          <input name="currentUrl" type="url" inputMode="url" placeholder="https://..." aria-invalid={Boolean(errors.currentUrl)} aria-describedby={describedBy("currentUrl")} />
          <FieldError name="currentUrl" errors={errors} />
        </label>
      </div>

      <label className="form-full">
        <span>Najważniejszy cel projektu *</span>
        <textarea name="goal" rows={5} required minLength={20} placeholder="Np. nowa strona ma pozyskiwać zapytania B2B, uporządkować ofertę i przygotować firmę pod SEO/AEO/GEO..." aria-invalid={Boolean(errors.goal)} aria-describedby={describedBy("goal")} />
        <FieldError name="goal" errors={errors} />
      </label>

      <label className="form-full">
        <span>Zakres / funkcje / dodatkowe informacje</span>
        <textarea name="scope" rows={5} placeholder="Podstrony, sklep, chatbot, integracje, migracja, wielojęzyczność, CMS, konkretne wymagania..." />
      </label>

      <div className="form-grid form-grid-two">
        <label>
          <span>Orientacyjny budżet *</span>
          <select name="budget" defaultValue="nie-wiem" required aria-invalid={Boolean(errors.budget)} aria-describedby={describedBy("budget")}>
            {budgetRanges.map((range) => (
              <option key={range} value={range}>{budgetLabels[range]}</option>
            ))}
          </select>
          <FieldError name="budget" errors={errors} />
        </label>
        <label>
          <span>Termin / ograniczenie czasowe</span>
          <input name="deadline" placeholder="Np. do końca września / bez sztywnego terminu" />
        </label>
      </div>

      <div className="hp-field" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="permission-row">
        <input name="contactPermission" type="checkbox" required aria-invalid={Boolean(errors.contactPermission)} aria-describedby={describedBy("contactPermission")} />
        <span>Potwierdzam, że podane dane mogą zostać użyte do odpowiedzi na moje zapytanie. *</span>
      </label>
      <FieldError name="contactPermission" errors={errors} />
      <FieldError name="form" errors={errors} />

      <div className="form-submit-row">
        <button className="button button-primary button-large" type="submit" disabled={state.kind === "sending"}>
          {state.kind === "sending" ? "Wysyłanie…" : "Wyślij zapytanie"}
          <span aria-hidden="true">↗</span>
        </button>
        <p>
          Nie chcesz używać formularza? <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      </div>

      <div className={`form-status form-status-${state.kind}`} aria-live="polite" aria-atomic="true">
        {state.kind !== "idle" && state.kind !== "sending" ? (
          <>
            <p>{state.message}</p>
            {state.kind === "error" && state.fallbackEmail ? (
              <a href={`mailto:${state.fallbackEmail}`}>Napisz: {state.fallbackEmail}</a>
            ) : null}
          </>
        ) : state.kind === "sending" ? <p>Bezpiecznie przekazujemy zapytanie…</p> : null}
      </div>
    </form>
  );
}
