"use client";

import { useEffect, useRef, useState } from "react";
import { systemStages } from "@/lib/site";

type StageKey = (typeof systemStages)[number]["key"];

const stageTitles: Record<StageKey, readonly [string, string]> = {
  CREATE: ["Projektujemy", "i budujemy."],
  DISCOVER: ["Budujemy widoczność", "od fundamentów."],
  CONVERT: ["Projektujemy drogę", "do decyzji."],
  INTELLIGENCE: ["Dodajemy inteligencję", "tam, gdzie ma sens."],
  CONNECT: ["Łączymy stronę", "z biznesem."],
  CARE: ["Utrzymujemy", "i rozwijamy."],
};

const buildModes = [
  { key: "WEB", note: "Architektura, design i development", href: "/strony-internetowe" },
  { key: "3D", note: "WebGL, produkt i przestrzeń", href: "/strony-3d-webgl" },
  { key: "SEARCH", note: "SEO, AEO i GEO / AI Search", href: "/seo-aeo-geo" },
  { key: "AI", note: "Chatboty i inteligentne funkcje", href: "/chatboty-ai" },
  { key: "COMMERCE", note: "Sklepy i ścieżki zakupu", href: "/sklepy-internetowe" },
] as const;

const storyStates = [
  ["01", "EXPERIENCE", "Najpierw człowiek rozumie ofertę i wie, co zrobić dalej."],
  ["02", "DISCOVER", "Semantyka, SEO, AEO i GEO powstają razem z architekturą."],
  ["03", "CONVERT", "Treść, CTA i pomiar tworzą spójną ścieżkę decyzji."],
  ["04", "INTELLIGENCE", "AI i integracje pojawiają się dopiero tam, gdzie mają konkretną pracę."],
] as const;

export function PremiumInteractionLayerV9() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const cursor = cursorRef.current;
    const label = labelRef.current;
    if (!cursor || !label) return;

    const finePointer = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches) return;

    let raf = 0;
    let clientX = 0;
    let clientY = 0;
    let targetLabel = "";

    const paint = () => {
      root.style.setProperty("--v9-pointer-x", `${clientX}px`);
      root.style.setProperty("--v9-pointer-y", `${clientY}px`);
      cursor.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      label.textContent = targetLabel;
      cursor.dataset.visible = targetLabel ? "true" : "false";
      raf = 0;
    };

    const onMove = (event: PointerEvent) => {
      clientX = event.clientX;
      clientY = event.clientY;
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-cursor]") : null;
      targetLabel = target?.dataset.cursor ?? "";
      if (!raf) raf = window.requestAnimationFrame(paint);
    };

    const onLeave = () => {
      targetLabel = "";
      cursor.dataset.visible = "false";
    };

    if (!reduced.matches) window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="premium-cursor-v9" ref={cursorRef} data-visible="false" aria-hidden="true">
      <span ref={labelRef} />
    </div>
  );
}

export function MagneticLinkV9({
  href,
  children,
  className = "",
  cursor = "OPEN",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  cursor?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    const node = ref.current;
    if (!node || event.pointerType === "touch") return;
    const rect = node.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    node.style.transform = `translate3d(${x * 0.12}px, ${y * 0.12}px, 0)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate3d(0,0,0)";
  };

  return (
    <a
      ref={ref}
      className={`magnetic-link-v9 ${className}`}
      href={href}
      data-cursor={cursor}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </a>
  );
}

export function PremiumHeroV9() {
  const sceneRef = useRef<HTMLDivElement>(null);

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const scene = sceneRef.current;
    if (!scene || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    scene.style.setProperty("--v9-hero-rx", `${-y * 6}deg`);
    scene.style.setProperty("--v9-hero-ry", `${x * 8}deg`);
    scene.style.setProperty("--v9-hero-x", `${50 + x * 18}%`);
    scene.style.setProperty("--v9-hero-y", `${45 + y * 16}%`);
  };

  const reset = () => {
    const scene = sceneRef.current;
    scene?.style.setProperty("--v9-hero-rx", "-1deg");
    scene?.style.setProperty("--v9-hero-ry", "2deg");
  };

  return (
    <div
      className="premium-hero-scene-v9"
      ref={sceneRef}
      onPointerMove={onMove}
      onPointerLeave={reset}
      data-cursor="MOVE"
      role="img"
      aria-label="Interaktywna kompozycja systemu LeadFlowAI"
    >
      <div className="hero-orb-v9" />
      <div className="hero-plane-v9 hero-plane-a-v9">
        <span>EXPERIENCE</span>
        <strong>WEB</strong>
      </div>
      <div className="hero-plane-v9 hero-plane-b-v9">
        <span>DISCOVER</span>
        <strong>SEARCH</strong>
      </div>
      <div className="hero-plane-v9 hero-plane-c-v9">
        <span>INTELLIGENCE</span>
        <strong>AI</strong>
      </div>
      <svg className="hero-circuit-v9" viewBox="0 0 800 620" aria-hidden="true">
        <path d="M80 390 C210 300 275 455 390 330 S610 210 735 305" />
        <path d="M125 205 C255 285 310 170 430 245 S605 430 720 390" />
        <circle cx="80" cy="390" r="5" />
        <circle cx="390" cy="330" r="5" />
        <circle cx="735" cy="305" r="5" />
        <circle cx="125" cy="205" r="5" />
        <circle cx="430" cy="245" r="5" />
        <circle cx="720" cy="390" r="5" />
      </svg>
      <div className="hero-core-v9">
        <small>LEADFLOW</small>
        <strong>ONE SYSTEM</strong>
        <span>design × code × search × intelligence</span>
      </div>
    </div>
  );
}

function CreateVisual() {
  return (
    <div className="cinematic-visual-v9 visual-create-v9" data-cursor="VIEW">
      <div className="floating-site-v9">
        <div className="floating-site-nav-v9"><span /> <i /><i /><i /></div>
        <div className="floating-site-copy-v9"><small>DESIGN / BUILD</small><strong>Digital product.</strong><b /></div>
        <div className="floating-site-grid-v9"><i /><i /><i /></div>
      </div>
      <div className="code-ribbon-v9"><span>&lt;main&gt;</span><span>&lt;Experience /&gt;</span><span>&lt;SearchReady /&gt;</span><span>&lt;/main&gt;</span></div>
    </div>
  );
}

function DiscoverVisual() {
  return (
    <div className="cinematic-visual-v9 visual-discover-v9" data-cursor="EXPLORE">
      <div className="search-orbit-v9"><strong>SEARCH</strong><small>entity / answer / context</small></div>
      {[
        ["SEO", "15%", "22%"], ["AEO", "76%", "18%"], ["GEO", "82%", "70%"], ["SCHEMA", "24%", "78%"],
      ].map(([label, left, top]) => <span className="search-node-v9" style={{ left, top }} key={label}>{label}</span>)}
      <svg viewBox="0 0 100 100" aria-hidden="true"><path d="M50 50 L15 22 M50 50 L76 18 M50 50 L82 70 M50 50 L24 78" /></svg>
    </div>
  );
}

function ConvertVisual() {
  return (
    <div className="cinematic-visual-v9 visual-convert-v9" data-cursor="FOLLOW">
      <div className="journey-line-v9"><span>VISIT</span><i /><span>VALUE</span><i /><span>ACTION</span><i /><span>LEAD</span></div>
      <div className="conversion-wave-v9"><b /><b /><b /><b /><b /></div>
      <strong className="conversion-word-v9">DECISION</strong>
    </div>
  );
}

function IntelligenceVisual() {
  return (
    <div className="cinematic-visual-v9 visual-intelligence-v9" data-cursor="INSPECT">
      <div className="ai-halo-v9" />
      <strong className="ai-core-v9">AI</strong>
      {[
        ["CONTEXT", "16%", "25%"], ["RAG", "76%", "20%"], ["FAQ", "84%", "70%"], ["ROUTING", "12%", "72%"],
      ].map(([label, left, top]) => <span className="ai-node-v9" style={{ left, top }} key={label}>{label}</span>)}
    </div>
  );
}

function ConnectVisual() {
  return (
    <div className="cinematic-visual-v9 visual-connect-v9" data-cursor="CONNECT">
      <div className="connect-core-v9">WWW</div>
      {[
        ["CRM", "10%", "15%"], ["MAIL", "78%", "12%"], ["API", "84%", "72%"], ["DATA", "8%", "75%"],
      ].map(([label, left, top]) => <span className="connect-node-v9" style={{ left, top }} key={label}>{label}</span>)}
      <svg viewBox="0 0 100 100" aria-hidden="true"><path d="M50 50 L10 15 M50 50 L78 12 M50 50 L84 72 M50 50 L8 75" /></svg>
    </div>
  );
}

function CareVisual() {
  return (
    <div className="cinematic-visual-v9 visual-care-v9" data-cursor="MONITOR">
      <div className="care-rings-v9"><i /><i /><i /></div>
      <strong>STABLE</strong>
      <div className="care-spectrum-v9">{Array.from({ length: 16 }, (_, index) => <i key={index} style={{ height: `${28 + ((index * 17) % 58)}%` }} />)}</div>
      <div className="care-labels-v9"><span>PERFORMANCE</span><span>SECURITY</span><span>SEARCH</span></div>
    </div>
  );
}

function StageVisual({ stage }: { stage: StageKey }) {
  switch (stage) {
    case "CREATE": return <CreateVisual />;
    case "DISCOVER": return <DiscoverVisual />;
    case "CONVERT": return <ConvertVisual />;
    case "INTELLIGENCE": return <IntelligenceVisual />;
    case "CONNECT": return <ConnectVisual />;
    case "CARE": return <CareVisual />;
  }
}

export function PremiumStageJourneyV9() {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-premium-stage]"));
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const index = Number((entry.target as HTMLElement).dataset.premiumStage ?? 0);
        setActive(index);
      }
    }, { rootMargin: "-30% 0px -52%", threshold: 0.08 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="premium-journey-v9" ref={rootRef} aria-label="System pracy LeadFlowAI">
      <div className="journey-spine-v9" aria-hidden="true">
        <div className="journey-spine-track-v9"><i style={{ height: `${((active + 1) / systemStages.length) * 100}%` }} /></div>
        <span>{String(active + 1).padStart(2, "0")}</span>
      </div>
      {systemStages.map((stage, index) => {
        const [lead, accent] = stageTitles[stage.key];
        return (
          <article
            id={stage.key.toLowerCase()}
            key={stage.key}
            data-premium-stage={index}
            className={`premium-stage-v9 ${index % 2 ? "is-reverse" : ""} ${index === active ? "is-active" : ""}`}
          >
            <div className="premium-stage-copy-v9">
              <p className="premium-stage-index-v9"><span>{stage.id}</span>{stage.key}</p>
              <h2><span>{lead}</span><em>{accent}</em></h2>
              <p>{stage.description}</p>
              <ul aria-label={`Zakres ${stage.key}`}>{stage.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
            </div>
            <div className="premium-stage-art-v9"><StageVisual stage={stage.key} /></div>
            {index < systemStages.length - 1 ? <div className="stage-transition-v9" aria-hidden="true"><i /><b /></div> : null}
          </article>
        );
      })}
    </section>
  );
}

export function WhatWeBuildV9() {
  const [active, setActive] = useState<(typeof buildModes)[number]["key"]>("WEB");
  const current = buildModes.find((item) => item.key === active) ?? buildModes[0];

  return (
    <section className="what-build-v9" aria-labelledby="what-build-title">
      <div className="what-build-head-v9">
        <p>WHAT WE BUILD</p>
        <h2 id="what-build-title">Nie jeden typ strony.<br /><span>Jedno studio doświadczeń.</span></h2>
      </div>
      <div className="what-build-layout-v9">
        <nav aria-label="Obszary projektowe LeadFlowAI">
          {buildModes.map((item) => (
            <a
              href={item.href}
              key={item.key}
              className={active === item.key ? "is-active" : ""}
              onMouseEnter={() => setActive(item.key)}
              onFocus={() => setActive(item.key)}
              data-cursor="VIEW"
            >
              <strong>{item.key}</strong><span>{item.note}</span>
            </a>
          ))}
        </nav>
        <div className={`what-build-art-v9 mode-${active.toLowerCase().replace(" ", "-")}`} data-cursor="EXPLORE">
          <span className="what-build-ghost-v9">{active}</span>
          <div className="what-build-object-v9"><i /><i /><i /><b /></div>
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
    steps.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="scroll-story-v9" ref={rootRef} aria-labelledby="story-title">
      <div className="story-sticky-v9">
        <div className="story-copy-v9">
          <p>ONE SYSTEM / FOUR STATES</p>
          <h2 id="story-title">Strona dojrzewa<br /><span>w trakcie scrolla.</span></h2>
          <strong>{storyStates[active][1]}</strong>
          <p>{storyStates[active][2]}</p>
        </div>
        <div className={`story-scene-v9 story-state-${active}`} aria-hidden="true">
          <div className="story-core-v9">{storyStates[active][0]}</div>
          <div className="story-ring-v9 story-ring-a-v9" />
          <div className="story-ring-v9 story-ring-b-v9" />
          <div className="story-beam-v9" />
          <span>WWW</span><span>SEARCH</span><span>CRO</span><span>AI</span>
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
    <section className="liquid-signature-v9" aria-labelledby="liquid-title">
      <div className="liquid-copy-v9">
        <p>SIGNATURE EXPERIENCE</p>
        <h2 id="liquid-title">LeadFlow<br /><span>Liquid Circuit.</span></h2>
        <p>Woda, hardware i interfejs reagują jak jeden system. Ruch wzbudza powierzchnię, a impuls budzi pobliskie ścieżki danych.</p>
        <a href="/lab" data-cursor="OPEN">Otwórz Live Lab <span aria-hidden="true">↗</span></a>
      </div>
      <div
        className="liquid-field-v9"
        ref={rootRef}
        onPointerMove={onMove}
        onPointerDown={onDown}
        data-cursor="TOUCH"
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
        <div className="liquid-readout-v9"><span>WATER</span><span>HARDWARE</span><span>DATA</span></div>
      </div>
    </section>
  );
}

export function PremiumProofV9() {
  const proofs = [
    { code: "01", title: "Liquid Hardware", note: "Interaktywna woda + real hardware background", href: "/lab" },
    { code: "02", title: "3D Core", note: "Browser-native przestrzeń i pointer interaction", href: "/strony-3d-webgl" },
    { code: "03", title: "Responsive Prototype", note: "Live states desktop/mobile bez filmu", href: "/lab" },
  ] as const;

  return (
    <section className="premium-proof-v9" aria-labelledby="proof-v9-title">
      <div className="premium-proof-head-v9">
        <p>FIRST-PARTY PROOF</p>
        <h2 id="proof-v9-title">Mniej obietnic.<br /><span>Więcej działającego kodu.</span></h2>
        <p>To są demonstracje LeadFlowAI, nie fikcyjne realizacje klientów. Każdy moduł można uruchomić i sprawdzić bezpośrednio w przeglądarce.</p>
      </div>
      <div className="premium-proof-grid-v9">
        {proofs.map((proof, index) => (
          <a href={proof.href} key={proof.title} className={`proof-card-v9 proof-card-${index + 1}-v9`} data-cursor="OPEN">
            <span>{proof.code} / LIVE DEMO</span>
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
