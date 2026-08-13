"use client";

import { useEffect, useRef, useState } from "react";

const serviceCards = [
  {
    code: "01 / BUDOWA",
    title: "Strony 3D / WebGL",
    description: "Interaktywne sceny, produkty i przestrzenie, które pracują na realną narrację marki zamiast być dekoracją.",
    tags: ["3D", "WebGL", "Shadery"],
    href: "/strony-3d-webgl",
  },
  {
    code: "02 / INTERAKCJA",
    title: "Interaktywne strony premium",
    description: "Narracje przewijane, konfiguratory, mikrointerakcje i dedykowany interfejs projektowane jako część doświadczenia produktu.",
    tags: ["Ruch", "UX", "Interakcja"],
    href: "/interaktywne-strony",
  },
  {
    code: "03 / INTELIGENCJA",
    title: "AI na stronie",
    description: "Chatboty, RAG i inteligentne funkcje z określoną rolą, trybem awaryjnym i kontrolą publicznie potwierdzonych informacji.",
    tags: ["AI", "RAG", "Automatyzacja"],
    href: "/chatboty-ai",
  },
] as const;

const assembly = [
  ["WWW", "Interfejs i kod"],
  ["WIDOCZNOŚĆ", "SEO · AEO · GEO"],
  ["KONWERSJA", "CRO i pomiar"],
  ["INTELIGENCJA", "AI i logika"],
  ["INTEGRACJE", "API i połączenia"],
  ["ROZWÓJ", "Monitoring i dalszy rozwój"],
] as const;

const capabilities = [
  { key: "WWW", x: 50, y: 50, description: "Architektura, UX/UI i development." },
  { key: "3D", x: 18, y: 22, description: "WebGL, przestrzeń, produkt i interakcja." },
  { key: "SEO", x: 80, y: 18, description: "Indeksowanie, semantyka, metadane i Core Web Vitals." },
  { key: "AEO", x: 86, y: 48, description: "Treści odpowiadające wprost na pytania i czytelna struktura odpowiedzi." },
  { key: "GEO", x: 77, y: 79, description: "Czytelność encji, potwierdzone informacje i widoczność w wyszukiwaniu AI." },
  { key: "AI", x: 48, y: 86, description: "Chatboty, RAG i inteligentne funkcje." },
  { key: "CRO", x: 18, y: 76, description: "Ścieżki decyzji, CTA i eksperymenty." },
  { key: "DANE", x: 11, y: 48, description: "Analityka, zdarzenia, CRM i API." },
] as const;

const projectOptions = ["WWW", "E-COMMERCE", "3D / WEBGL", "AI", "SEO / AEO / GEO"] as const;
const goalOptions = ["ZAPYTANIA", "SPRZEDAŻ", "WIZERUNEK", "AUTOMATYZACJA", "MODERNIZACJA"] as const;

export function SignalDivider({ label }: { label: string }) {
  return (
    <div className="signal-divider" aria-hidden="true">
      <span className="signal-divider-label">{label}</span>
      <span className="signal-divider-line"><i /></span>
      <span className="signal-divider-state">PRZEPŁYW DANYCH / AKTYWNY</span>
    </div>
  );
}

export function Live3DShowcase() {
  const sceneRef = useRef<HTMLDivElement>(null);

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    sceneRef.current?.style.setProperty("--chip-rx", `${-y * 18}deg`);
    sceneRef.current?.style.setProperty("--chip-ry", `${x * 24}deg`);
    sceneRef.current?.style.setProperty("--light-x", `${50 + x * 32}%`);
    sceneRef.current?.style.setProperty("--light-y", `${42 + y * 24}%`);
  };

  const reset = () => {
    sceneRef.current?.style.setProperty("--chip-rx", "-8deg");
    sceneRef.current?.style.setProperty("--chip-ry", "18deg");
  };

  return (
    <section className="live-3d content-frame" aria-labelledby="live-3d-title">
      <div className="live-3d-copy">
        <p className="experience-kicker">NA ŻYWO / PRODUKT 3D</p>
        <h2 id="live-3d-title">Obiekt, który reaguje zamiast tylko wyglądać.</h2>
        <p>
          To nie film ani render. Poniższy moduł jest liczony w przeglądarce i reaguje na położenie kursora. Tak samo możemy budować prezentacje produktu, urządzenia, architektury lub danych.
        </p>
        <a className="text-link" href="/strony-3d-webgl">Zobacz usługę 3D / WebGL <span aria-hidden="true">↗</span></a>
      </div>

      <div
        className="processor-scene"
        ref={sceneRef}
        onPointerMove={onPointerMove}
        onPointerLeave={reset}
        role="img"
        aria-label="Interaktywny model 3D procesora LeadFlowAI"
      >
        <div className="processor-orbit processor-orbit-a" />
        <div className="processor-orbit processor-orbit-b" />
        <div className="processor-chip">
          <div className="chip-face chip-front">
            <span>LF</span><strong>RDZEŃ AI</strong><small>SILNIK INTERAKCJI</small>
          </div>
          <div className="chip-face chip-back" />
          <div className="chip-face chip-left" />
          <div className="chip-face chip-right" />
          <div className="chip-face chip-top" />
          <div className="chip-face chip-bottom" />
        </div>
        <div className="processor-shadow" />
        <div className="processor-readout">
          <span>KURSOR / AKTYWNY</span><span>TRANSFORMACJA 3D</span><span>ŚWIATŁO GPU</span>
        </div>
      </div>
    </section>
  );
}

export function InteractiveServiceCards() {
  return (
    <section className="experience-services" aria-labelledby="experience-services-title">
      <div className="experience-heading">
        <p className="experience-kicker">MOŻLIWOŚCI NA ŻYWO / 02</p>
        <h2 id="experience-services-title">Usługi, które można poczuć na stronie.</h2>
      </div>
      <div className="experience-card-grid">
        {serviceCards.map((card) => (
          <a className="experience-card" href={card.href} key={card.title}>
            <span className="experience-card-code">{card.code}</span>
            <div className="experience-card-visual" aria-hidden="true">
              <i /><i /><i /><b />
            </div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <ul>{card.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
            <span className="experience-card-arrow" aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}

export function SystemAssembly() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-assembly-step]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.assemblyStep ?? 0);
            setActive(index);
          }
        }
      },
      { rootMargin: "-32% 0px -45%", threshold: 0.1 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="assembly-section content-frame" ref={rootRef} aria-labelledby="assembly-title">
      <div className="assembly-head">
        <p className="experience-kicker">PRZEWIJANIE / BUDOWA SYSTEMU</p>
        <h2 id="assembly-title">Strona składa się warstwa po warstwie.</h2>
        <p>Przewijając moduły aktywujesz kolejne elementy systemu. Tak projektujemy zależności między designem, widocznością, konwersją, AI i integracjami.</p>
      </div>
      <div className="assembly-layout">
        <div className="assembly-rail" aria-hidden="true">
          <div className="assembly-energy" style={{ height: `${((active + 1) / assembly.length) * 100}%` }} />
          {assembly.map(([name], index) => (
            <span key={name} className={index <= active ? "is-active" : ""} style={{ top: `${(index / (assembly.length - 1)) * 100}%` }} />
          ))}
        </div>
        <div className="assembly-steps">
          {assembly.map(([name, description], index) => (
            <article key={name} data-assembly-step={index} className={index === active ? "is-current" : index < active ? "is-complete" : ""}>
              <span>0{index + 1}</span><div><h3>{name}</h3><p>{description}</p></div>
            </article>
          ))}
        </div>
        <div className="assembly-core" aria-hidden="true">
          <div className="assembly-core-ring" />
          <strong>{assembly[active][0]}</strong>
          <small>{Math.round(((active + 1) / assembly.length) * 100)}% SYSTEM GOTOWY</small>
        </div>
      </div>
    </section>
  );
}

export function BrowserDemo() {
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");
  const [panel, setPanel] = useState<"landing" | "commerce" | "dashboard">("landing");
  const panelLabels = { landing: "LANDING PAGE", commerce: "SKLEP", dashboard: "PANEL" } as const;

  return (
    <section className="browser-demo content-frame" aria-labelledby="browser-demo-title">
      <div className="browser-demo-copy">
        <p className="experience-kicker">NA ŻYWO / PROTOTYP W PRZEGLĄDARCE</p>
        <h2 id="browser-demo-title">Nie opisujemy tylko interfejsów. Pokazujemy ich zachowanie.</h2>
        <p>Przełącz scenariusz i szerokość. Demo pozostaje lekkie, ale prezentuje responsywność, hierarchię, CTA i stany produktu w jednym module.</p>
        <fieldset className="demo-controls" style={{ border: 0, padding: 0, margin: 0, minInlineSize: 0 }}>
          <legend style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", border: 0 }}>
            Wybór scenariusza demo
          </legend>
          {(["landing", "commerce", "dashboard"] as const).map((item) => (
            <button type="button" key={item} onClick={() => setPanel(item)} className={panel === item ? "is-active" : ""}>{panelLabels[item]}</button>
          ))}
        </fieldset>
      </div>
      <div className={`browser-shell browser-${viewport}`}>
        <div className="browser-toolbar"><span /><span /><span /><b>leadflowai://demo-na-zywo</b>
          <button type="button" onClick={() => setViewport(viewport === "desktop" ? "mobile" : "desktop")}>{viewport === "desktop" ? "TELEFON" : "DESKTOP"}</button>
        </div>
        <div className={`browser-canvas browser-panel-${panel}`}>
          <div className="demo-nav"><strong>DEMO.</strong><span>01</span><span>02</span><span>03</span></div>
          <div className="demo-hero"><small>{panelLabels[panel]} / NA ŻYWO</small><h3>{panel === "landing" ? "Jedna oferta. Jedna akcja." : panel === "commerce" ? "Produkt bez tarcia." : "Dane, które prowadzą do decyzji."}</h3><button type="button">DZIAŁAJ ↗</button></div>
          <div className="demo-cards"><i /><i /><i /></div>
        </div>
      </div>
    </section>
  );
}

export function BeforeAfterDemo() {
  const [value, setValue] = useState(58);
  return (
    <section className="before-after content-frame" aria-labelledby="before-after-title">
      <div className="before-after-head">
        <p className="experience-kicker">MODERNIZACJA / PRZED → PO</p>
        <h2 id="before-after-title">Zmiana jakości bez utraty informacji.</h2>
        <p>Neutralne demo koncepcyjne — nie jest przedstawiane jako realizacja klienta. Przeciągnij suwak i porównaj dwa podejścia do tej samej informacji.</p>
      </div>
      <div className="comparison-stage" style={{ "--split": `${value}%` } as React.CSSProperties}>
        <div className="comparison-before"><span>PRZED</span><div className="legacy-header" /><div className="legacy-columns"><i /><i /></div><div className="legacy-lines"><i /><i /><i /><i /></div></div>
        <div className="comparison-after"><span>PO</span><div className="after-nav" /><div className="after-hero"><b>PRECYZYJNY SYSTEM CYFROWY</b><i /></div><div className="after-cards"><i /><i /><i /></div></div>
        <div className="comparison-handle" aria-hidden="true"><b>↔</b></div>
        <input aria-label="Porównanie przed i po" type="range" min="12" max="88" value={value} onChange={(event) => setValue(Number(event.target.value))} />
      </div>
    </section>
  );
}

export function CapabilityConstellation() {
  const [selected, setSelected] = useState("WWW");
  const current = capabilities.find((item) => item.key === selected) ?? capabilities[0];
  return (
    <section className="constellation content-frame" aria-labelledby="constellation-title">
      <div className="constellation-copy">
        <p className="experience-kicker">MAPA KOMPETENCJI / NA ŻYWO</p>
        <h2 id="constellation-title">Jedna strona, wiele połączonych kompetencji.</h2>
        <p>{current.description}</p>
        <strong>{current.key}</strong>
      </div>
      <div className="constellation-map">
        <svg viewBox="0 0 100 100" aria-hidden="true">
          {capabilities.filter((item) => item.key !== "WWW").map((item) => <line key={item.key} x1="50" y1="50" x2={item.x} y2={item.y} className={selected === item.key || selected === "WWW" ? "is-active" : ""} />)}
          <circle cx="50" cy="50" r="18" className="constellation-core-ring" />
        </svg>
        {capabilities.map((item) => (
          <button key={item.key} type="button" className={`constellation-node ${selected === item.key ? "is-active" : ""}`} style={{ left: `${item.x}%`, top: `${item.y}%` }} onMouseEnter={() => setSelected(item.key)} onFocus={() => setSelected(item.key)} onClick={() => setSelected(item.key)}>{item.key}</button>
        ))}
      </div>
    </section>
  );
}

export function ProjectCommandCenter() {
  const [project, setProject] = useState<(typeof projectOptions)[number]>("WWW");
  const [goal, setGoal] = useState<(typeof goalOptions)[number]>("ZAPYTANIA");
  const subject = encodeURIComponent(`LeadFlowAI — ${project} / ${goal}`);

  return (
    <section className="command-center content-frame" aria-labelledby="command-center-title">
      <div className="command-copy">
        <p className="experience-kicker">KONFIGURATOR PROJEKTU</p>
        <h2 id="command-center-title">Skonfiguruj kierunek projektu.</h2>
        <p>To nie formularz backendowy. Wybór buduje prosty brief i przygotowuje wiadomość do bezpośredniego kontaktu.</p>
      </div>
      <div className="command-console">
        <div className="command-row"><span>TYP PROJEKTU</span><div>{projectOptions.map((option) => <button type="button" key={option} className={project === option ? "is-active" : ""} onClick={() => setProject(option)}>{option}</button>)}</div></div>
        <div className="command-row"><span>GŁÓWNY CEL</span><div>{goalOptions.map((option) => <button type="button" key={option} className={goal === option ? "is-active" : ""} onClick={() => setGoal(option)}>{option}</button>)}</div></div>
        <div className="command-status"><span>ZAKRES / GOTOWY</span><strong>{project} → {goal}</strong><i /></div>
        <a className="button button-primary button-large" href={`mailto:kontakt@leadflowai.pl?subject=${subject}`}>ROZPOCZNIJ ROZMOWĘ <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}
