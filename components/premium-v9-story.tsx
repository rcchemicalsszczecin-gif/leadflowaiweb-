"use client";

import { useEffect, useRef, useState } from "react";

const buildModes = [
  { key: "WEB", label: "STRONY WWW", note: "Architektura, projekt i wdrożenie", href: "/strony-internetowe" },
  { key: "3D", label: "3D", note: "WebGL, produkt i przestrzeń", href: "/strony-3d-webgl" },
  { key: "SEARCH", label: "WIDOCZNOŚĆ", note: "SEO, AEO i GEO / AI Search", href: "/seo-aeo-geo" },
  { key: "AI", label: "AI", note: "Chatboty i inteligentne funkcje", href: "/chatboty-ai" },
  { key: "COMMERCE", label: "SKLEPY", note: "Sklepy i ścieżki zakupu", href: "/sklepy-internetowe" },
] as const;

const storyStates = [
  ["01", "DOŚWIADCZENIE", "Najpierw człowiek rozumie ofertę i wie, co zrobić dalej."],
  ["02", "WIDOCZNOŚĆ", "Semantyka, SEO, AEO i GEO powstają razem z architekturą."],
  ["03", "KONWERSJA", "Treść, CTA i pomiar tworzą spójną ścieżkę decyzji."],
  ["04", "INTELIGENCJA", "AI i integracje pojawiają się dopiero tam, gdzie mają konkretną pracę."],
] as const;

export function WhatWeBuildV9() {
  const [active, setActive] = useState<(typeof buildModes)[number]["key"]>("WEB");
  const current = buildModes.find((item) => item.key === active) ?? buildModes[0];

  return (
    <section
      id="what-we-build"
      className="what-build-v9 what-build-v92"
      aria-labelledby="what-build-title"
      data-v92-reveal="mask"
    >
      <div className="what-build-head-v9">
        <p>WHAT WE BUILD</p>
        <h2 id="what-build-title">Nie jeden typ strony.<br /><span>Jeden spójny system WWW.</span></h2>
      </div>
      <div className="what-build-layout-v9">
        <nav aria-label="Obszary projektowe LeadFlowAI">
          {buildModes.map((item, index) => (
            <a
              href={item.href}
              key={item.key}
              className={active === item.key ? "is-active" : ""}
              onMouseEnter={() => setActive(item.key)}
              onFocus={() => setActive(item.key)}
              data-cursor="ZOBACZ"
            >
              <small>0{index + 1}</small>
              <strong>{item.label}</strong>
              <span>{item.note}</span>
            </a>
          ))}
        </nav>
        <div
          className={`what-build-art-v9 mode-${active.toLowerCase().replace(" ", "-")}`}
          data-mode={active}
          data-cursor="EXPLORE"
        >
          <span className="what-build-ghost-v9">{current.label}</span>
          <div className="what-build-object-v9"><i /><i /><i /><b /></div>
          <div className="capability-live-stage-v92" aria-hidden="true">
            <i className="capability-plane-v92 capability-plane-a-v92" />
            <i className="capability-plane-v92 capability-plane-b-v92" />
            <i className="capability-plane-v92 capability-plane-c-v92" />
            <b className="capability-core-v92">{current.label}</b>
            <span className="capability-orbit-v92 capability-orbit-a-v92" />
            <span className="capability-orbit-v92 capability-orbit-b-v92" />
          </div>
          <p>{current.note}</p>
        </div>
      </div>
    </section>
  );
}

export function ScrollStoryV9() {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const steps = Array.from(root.querySelectorAll<HTMLElement>("[data-story-step]"));
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.storyStep ?? 0));
      }
    }, { rootMargin: "-34% 0px -44%", threshold: 0.1 });
    steps.forEach((step) => {
      observer.observe(step);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="system-story"
      className="scroll-story-v9 scroll-story-v92"
      ref={rootRef}
      aria-labelledby="story-title"
      data-v92-reveal="depth"
    >
      <div className="story-sticky-v9">
        <div className="story-copy-v9">
          <p>JEDEN SYSTEM / CZTERY WARSTWY</p>
          <h2 id="story-title">Strona dojrzewa<br /><span>w trakcie przewijania.</span></h2>
          <strong>{storyStates[active][1]}</strong>
          <p>{storyStates[active][2]}</p>
        </div>
        <div className={`story-scene-v9 story-state-${active}`} aria-hidden="true">
          <div className="story-core-v9">{storyStates[active][0]}</div>
          <div className="story-ring-v9 story-ring-a-v9" />
          <div className="story-ring-v9 story-ring-b-v9" />
          <div className="story-beam-v9" />
          <div className="story-depth-plane-v92" />
          <span>WWW</span><span>WIDOCZNOŚĆ</span><span>CRO</span><span>AI</span>
        </div>
      </div>
      <div className="story-steps-v9">
        {storyStates.map(([index, title, description], step) => (
          <article data-story-step={step} key={index} className={step === active ? "is-active" : ""}>
            <span>{index}</span><div><h3>{title}</h3><p>{description}</p></div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function LiquidCircuitV9() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [impact, setImpact] = useState({ x: 50, y: 50, id: 0 });

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const root = rootRef.current;
    if (!root || event.pointerType === "touch") return;
    const rect = root.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    root.style.setProperty("--liquid-x", `${x}%`);
    root.style.setProperty("--liquid-y", `${y}%`);
  };

  const onDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setImpact((value) => ({ x, y, id: value.id + 1 }));
  };

  return (
    <section
      id="liquid-circuit"
      className="liquid-signature-v9 liquid-signature-v92"
      aria-labelledby="liquid-title"
      data-v92-reveal="wipe"
    >
      <div className="liquid-copy-v9">
        <p>SIGNATURE EXPERIENCE</p>
        <h2 id="liquid-title">LeadFlow<br /><span>Liquid Circuit.</span></h2>
        <p>Woda, warstwa sprzętowa i interfejs reagują jak jeden system. Ruch wzbudza powierzchnię, a impuls budzi pobliskie ścieżki danych.</p>
        <a href="/lab" data-cursor="OTWÓRZ">Zobacz możliwości <span aria-hidden="true">↗</span></a>
      </div>
      <div
        className="liquid-field-v9"
        ref={rootRef}
        onPointerMove={onMove}
        onPointerDown={onDown}
        data-cursor="DOTKNIJ"
        role="img"
        aria-label="Interaktywna demonstracja LeadFlow Liquid Circuit"
      >
        <div className="liquid-lens-v9" />
        <svg viewBox="0 0 1000 600" aria-hidden="true">
          <path d="M20 140 H215 Q265 140 265 190 V255 H470 Q520 255 520 305 V420 H770 Q820 420 820 365 V300 H980" />
          <path d="M50 480 H180 V390 H360 V330 H590 V165 H820 V95 H960" />
          <path d="M110 70 H330 V135 H455 V90 H690 V225 H910" />
        </svg>
        <div className="liquid-nodes-v9"><i /><i /><i /><i /><i /><i /></div>
        <div key={impact.id} className="liquid-impact-v9" style={{ left: `${impact.x}%`, top: `${impact.y}%` }}><i /><i /><i /></div>
        <div className="liquid-readout-v9"><span>WODA</span><span>SPRZĘT</span><span>DANE</span></div>
      </div>
    </section>
  );
}

export function PremiumProofV9() {
  const proofs = [
    { code: "01", title: "Liquid Hardware", note: "Interaktywna woda i własna warstwa sprzętowa", href: "/lab" },
    { code: "02", title: "Rdzeń 3D", note: "Przestrzeń 3D działająca bezpośrednio w przeglądarce", href: "/strony-3d-webgl" },
    { code: "03", title: "Prototyp responsywny", note: "Rzeczywiste stany desktop/mobile bez filmu", href: "/lab" },
  ] as const;

  return (
    <section
      id="proof"
      className="premium-proof-v9 premium-proof-v92"
      aria-labelledby="proof-v9-title"
      data-v92-reveal="rise"
    >
      <div className="premium-proof-head-v9">
        <p>FIRST-PARTY PROOF</p>
        <h2 id="proof-v9-title">Mniej obietnic.<br /><span>Więcej działającego kodu.</span></h2>
        <p>To są demonstracje LeadFlowAI, nie fikcyjne realizacje klientów. Każdy moduł można uruchomić i sprawdzić bezpośrednio w przeglądarce.</p>
      </div>
      <div className="premium-proof-grid-v9">
        {proofs.map((proof, index) => (
          <a href={proof.href} key={proof.title} className={`proof-card-v9 proof-card-${index + 1}-v9`} data-cursor="OTWÓRZ">
            <span>{proof.code} / DEMO NA ŻYWO</span>
            <div className="proof-art-v9"><i /><i /><i /></div>
            <h3>{proof.title}</h3>
            <p>{proof.note}</p>
            <b aria-hidden="true">↗</b>
          </a>
        ))}
      </div>
    </section>
  );
}
