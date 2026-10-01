import type { DecisionGroup } from "@/lib/service-decision-guidance";

type ServiceCompositionProps = {
  group: DecisionGroup;
  capabilities: readonly string[];
  deliverables: readonly { title: string; description: string }[];
};

const familyCopy: Record<DecisionGroup, { eyebrow: string; title: string; lead: string }> = {
  BUILD: {
    eyebrow: "ARCHITEKTURA REALIZACJI",
    title: "Każda warstwa wynika z celu i przygotowuje następną.",
    lead: "Zakres pokazujemy jako jedną konstrukcję: od decyzji o informacji po działający, sprawdzony produkt.",
  },
  EXPERIENCE: {
    eyebrow: "CEL INTERAKCJI",
    title: "Forma ma pomagać zrozumieć, porównać albo podjąć decyzję.",
    lead: "Ruch, 3D i niestandardowy interfejs mają sens tylko wtedy, gdy wykonują konkretną pracę i zachowują czytelną alternatywę.",
  },
  SEARCH: {
    eyebrow: "OD INTENCJI DO DZIAŁANIA",
    title: "Jedna uporządkowana treść pracuje dla człowieka, wyszukiwarki i systemu AI.",
    lead: "Widoczność zaczyna się od odpowiedzi, struktury i publicznej prawdy — nie od obietnicy pozycji.",
  },
  AI: {
    eyebrow: "ŹRÓDŁA I GRANICE",
    title: "Automatyzacja zaczyna się od kontrolowanego kontekstu, nie od efektownej rozmowy.",
    lead: "Pokazujemy przepływ od zatwierdzonych źródeł do odpowiedzi lub działania, razem z miejscem na kontrolę i tryb awaryjny.",
  },
  PLATFORM: {
    eyebrow: "SYSTEM PRACY",
    title: "Interfejs łączy zadania użytkownika z treścią, danymi i logiką systemu.",
    lead: "Platforma ma porządkować powtarzalną pracę. Najpierw definiujemy zadania i relacje, dopiero potem ekrany.",
  },
  CARE: {
    eyebrow: "KONTROLA I CIĄGŁOŚĆ",
    title: "Jakość po publikacji wymaga wykrycia, decyzji i bezpiecznej reakcji.",
    lead: "Opieka nie jest jednym statusem. To powtarzalny przepływ sprawdzania, utrzymania i odzyskiwania działania.",
  },
};

function BuildVisual({ deliverables }: Pick<ServiceCompositionProps, "deliverables">) {
  return (
    <div className="service-family-visual service-build-visual" role="img" aria-label="Architektura budowy produktu WWW">
      {deliverables.slice(0, 5).map((item, index) => (
        <article key={item.title}>
          <span aria-hidden="true">{index + 1}</span>
          <div><strong>{item.title}</strong><p>{item.description}</p></div>
        </article>
      ))}
    </div>
  );
}

function ExperienceVisual({ capabilities }: Pick<ServiceCompositionProps, "capabilities">) {
  return (
    <div className="service-family-visual service-experience-visual" role="img" aria-label="Relacja celu, doświadczenia i dostępnej alternatywy">
      <div className="experience-purpose"><small>CEL</small><strong>Zrozumienie i decyzja</strong></div>
      <div className="experience-layer"><small>DOŚWIADCZENIE</small><strong>{capabilities.slice(0, 3).join(" · ")}</strong></div>
      <div className="experience-fallback"><small>ALTERNATYWA</small><strong>Pełna treść i działanie bez efektu</strong></div>
    </div>
  );
}

function SearchVisual() {
  return (
    <div className="service-family-visual service-search-visual" role="img" aria-label="Przepływ od intencji przez treść do odkrycia i działania">
      <div className="search-source"><small>ŹRÓDŁO</small><strong>Uporządkowana treść</strong><span>fakty · odpowiedzi · relacje</span></div>
      <div className="search-paths">
        <article><small>INTENCJA</small><strong>Realne pytanie</strong></article>
        <article><small>ODKRYCIE</small><strong>Semantyka i indeksacja</strong></article>
        <article><small>DECYZJA</small><strong>Czytelny następny krok</strong></article>
      </div>
    </div>
  );
}

function AiVisual() {
  const stages = [
    ["ŹRÓDŁA", "Zatwierdzona wiedza i dane"],
    ["KONTEKST", "Wyszukiwanie lub reguły"],
    ["ODPOWIEDŹ / DZIAŁANIE", "Jawny zakres funkcji"],
    ["GRANICA", "Kontrola, brak odpowiedzi, człowiek"],
  ] as const;
  return (
    <div className="service-family-visual service-ai-visual" role="img" aria-label="Przepływ systemu AI od źródła do kontrolowanego działania">
      {stages.map(([label, text]) => <article key={label}><small>{label}</small><strong>{text}</strong></article>)}
    </div>
  );
}

function PlatformVisual() {
  return (
    <div className="service-family-visual service-platform-visual" role="img" aria-label="Relacja zadań, interfejsu, treści, danych i systemu">
      <div className="platform-users"><small>UŻYTKOWNICY</small><strong>Zadania i decyzje</strong></div>
      <div className="platform-interface"><small>INTERFEJS</small><strong>Widoki i stany pracy</strong></div>
      <div className="platform-model"><article><small>TREŚĆ</small><strong>Model i publikacja</strong></article><article><small>DANE</small><strong>Relacje i uprawnienia</strong></article></div>
      <div className="platform-system"><small>SYSTEM</small><strong>Logika · API · integracje</strong></div>
    </div>
  );
}

function CareVisual() {
  const states = [
    ["SPRAWDŹ", "Sygnał i wpływ"],
    ["UTRZYMAJ", "Priorytet i działanie"],
    ["ODZYSKAJ", "Bezpieczny powrót"],
  ] as const;
  return (
    <div className="service-family-visual service-care-visual" role="img" aria-label="Przepływ sprawdzania, utrzymania i odzyskiwania działania">
      <div className="care-route" aria-hidden="true" />
      {states.map(([label, text]) => <article key={label}><i aria-hidden="true" /><small>{label}</small><strong>{text}</strong></article>)}
      <p>Wynik prowadzi do decyzji, właściciela i następnego bezpiecznego kroku.</p>
    </div>
  );
}

export function ServiceCompositionV15({ group, capabilities, deliverables }: ServiceCompositionProps) {
  const copy = familyCopy[group];
  return (
    <section className={`service-family-module service-family-${group.toLowerCase()}`} data-composition-family={group} aria-labelledby="service-family-title">
      <div className="page-shell service-family-layout">
        <header>
          <p className="service-index">{copy.eyebrow}</p>
          <h2 id="service-family-title">{copy.title}</h2>
          <p>{copy.lead}</p>
        </header>
        {group === "BUILD" && <BuildVisual deliverables={deliverables} />}
        {group === "EXPERIENCE" && <ExperienceVisual capabilities={capabilities} />}
        {group === "SEARCH" && <SearchVisual />}
        {group === "AI" && <AiVisual />}
        {group === "PLATFORM" && <PlatformVisual />}
        {group === "CARE" && <CareVisual />}
      </div>
    </section>
  );
}
