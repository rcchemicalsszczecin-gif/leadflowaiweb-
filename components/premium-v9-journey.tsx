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

const stageLabels: Record<StageKey, string> = {
  CREATE: "PROJEKT I BUDOWA",
  DISCOVER: "WIDOCZNOŚĆ",
  CONVERT: "KONWERSJA",
  INTELLIGENCE: "INTELIGENCJA",
  CONNECT: "INTEGRACJE",
  CARE: "OPIEKA",
};

const revealModes = ["depth", "wipe", "rise", "mask", "depth", "wipe"] as const;

const careSpectrum = [
  ["bar-01", 28], ["bar-02", 45], ["bar-03", 62], ["bar-04", 79],
  ["bar-05", 38], ["bar-06", 55], ["bar-07", 72], ["bar-08", 31],
  ["bar-09", 48], ["bar-10", 65], ["bar-11", 82], ["bar-12", 41],
  ["bar-13", 58], ["bar-14", 75], ["bar-15", 34], ["bar-16", 51],
] as const;

function CreateVisual() {
  return (
    <div className="cinematic-visual-v9 visual-create-v9" data-cursor="ZOBACZ">
      <div className="floating-site-v9">
        <div className="floating-site-nav-v9"><span /> <i /><i /><i /></div>
        <div className="floating-site-copy-v9"><small>PROJEKT / WDROŻENIE</small><strong>Produkt cyfrowy.</strong><b /></div>
        <div className="floating-site-grid-v9"><i /><i /><i /></div>
      </div>
      <div className="code-ribbon-v9"><span>&lt;main&gt;</span><span>&lt;Doswiadczenie /&gt;</span><span>&lt;GotoweNaWyszukiwanie /&gt;</span><span>&lt;/main&gt;</span></div>
      <div className="stage-ambient-plane-v92" aria-hidden="true" />
    </div>
  );
}

function DiscoverVisual() {
  return (
    <div className="cinematic-visual-v9 visual-discover-v9" data-cursor="EXPLORE">
      <div className="search-orbit-v9"><strong>WIDOCZNOŚĆ</strong><small>encja / odpowiedź / kontekst</small></div>
      {[
        ["SEO", "15%", "22%"], ["AEO", "76%", "18%"], ["GEO", "82%", "70%"], ["SCHEMA", "24%", "78%"],
      ].map(([label, left, top]) => <span className="search-node-v9" style={{ left, top }} key={label}>{label}</span>)}
      <svg viewBox="0 0 100 100" aria-hidden="true"><path d="M50 50 L15 22 M50 50 L76 18 M50 50 L82 70 M50 50 L24 78" /></svg>
      <div className="search-depth-ring-v92" aria-hidden="true" />
    </div>
  );
}

function ConvertVisual() {
  return (
    <div className="cinematic-visual-v9 visual-convert-v9" data-cursor="ŚLEDŹ">
      <div className="journey-line-v9"><span>ODWIEDZINY</span><i /><span>WARTOŚĆ</span><i /><span>DZIAŁANIE</span><i /><span>ZAPYTANIE</span></div>
      <div className="conversion-wave-v9"><b /><b /><b /><b /><b /></div>
      <strong className="conversion-word-v9">DECYZJA</strong>
      <div className="conversion-depth-v92" aria-hidden="true"><i /><i /><i /></div>
    </div>
  );
}

function IntelligenceVisual() {
  return (
    <div className="cinematic-visual-v9 visual-intelligence-v9" data-cursor="SPRAWDŹ">
      <div className="ai-halo-v9" />
      <strong className="ai-core-v9">AI</strong>
      {[
        ["KONTEKST", "16%", "25%"], ["RAG", "76%", "20%"], ["FAQ", "84%", "70%"], ["KIEROWANIE", "12%", "72%"],
      ].map(([label, left, top]) => <span className="ai-node-v9" style={{ left, top }} key={label}>{label}</span>)}
      <div className="ai-depth-mesh-v92" aria-hidden="true"><i /><i /><i /></div>
    </div>
  );
}

function ConnectVisual() {
  return (
    <div className="cinematic-visual-v9 visual-connect-v9" data-cursor="POŁĄCZ">
      <div className="connect-core-v9">WWW</div>
      {[
        ["CRM", "10%", "15%"], ["E-MAIL", "78%", "12%"], ["API", "84%", "72%"], ["DANE", "8%", "75%"],
      ].map(([label, left, top]) => <span className="connect-node-v9" style={{ left, top }} key={label}>{label}</span>)}
      <svg viewBox="0 0 100 100" aria-hidden="true"><path d="M50 50 L10 15 M50 50 L78 12 M50 50 L84 72 M50 50 L8 75" /></svg>
      <div className="connect-depth-grid-v92" aria-hidden="true" />
    </div>
  );
}

function CareVisual() {
  return (
    <div className="cinematic-visual-v9 visual-care-v9" data-cursor="MONITORUJ">
      <div className="care-rings-v9"><i /><i /><i /></div>
      <strong>STABILNIE</strong>
      <div className="care-spectrum-v9">
        {careSpectrum.map(([id, height]) => <i key={id} style={{ height: `${height}%` }} />)}
      </div>
      <div className="care-labels-v9"><span>WYDAJNOŚĆ</span><span>BEZPIECZEŃSTWO</span><span>WIDOCZNOŚĆ</span></div>
      <div className="care-scan-v92" aria-hidden="true" />
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
    nodes.forEach((node) => {
      observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="premium-journey-v9 premium-journey-v92" ref={rootRef} aria-label="System pracy LeadFlowAI">
      <div className="journey-spine-v9" aria-hidden="true">
        <div className="journey-spine-track-v9"><i style={{ height: `${((active + 1) / systemStages.length) * 100}%` }} /></div>
        <span>{String(active + 1).padStart(2, "0")}</span>
      </div>
      {systemStages.map((stage, index) => {
        const [lead, accent] = stageTitles[stage.key];
        const stageLabel = stageLabels[stage.key];
        return (
          <article
            id={stage.key.toLowerCase()}
            key={stage.key}
            data-premium-stage={index}
            data-v92-reveal={revealModes[index]}
            data-v92-layout={`scene-${index + 1}`}
            className={`premium-stage-v9 premium-stage-v92 ${index % 2 ? "is-reverse" : ""} ${index === active ? "is-active" : ""}`}
          >
            <div className="premium-stage-copy-v9">
              <p className="premium-stage-index-v9"><span>{stage.id}</span>{stageLabel}</p>
              <h2><span>{lead}</span><em>{accent}</em></h2>
              <p>{stage.description}</p>
              <ul aria-label={`Zakres: ${stageLabel}`}>{stage.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
            </div>
            <div className="premium-stage-art-v9"><StageVisual stage={stage.key} /></div>
            {index < systemStages.length - 1 ? (
              <div className={`stage-transition-v9 stage-transition-v92 transition-${stage.key.toLowerCase()}`} aria-hidden="true">
                <i /><b /><span />
              </div>
            ) : null}
          </article>
        );
      })}
    </section>
  );
}
