"use client";

import { useEffect, useRef, useState } from "react";
import { SystemFlow } from "@/components/system-flow";

const stages = ["CREATE", "DISCOVER", "CONVERT", "INTELLIGENCE", "CONNECT", "CARE"] as const;

type StageKey = (typeof stages)[number];

export function HeroSystemV8() {
  const rootRef = useRef<HTMLDivElement>(null);

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    rootRef.current?.style.setProperty("--hero-rx", `${-y * 3.8}deg`);
    rootRef.current?.style.setProperty("--hero-ry", `${x * 5.4}deg`);
    rootRef.current?.style.setProperty("--hero-light-x", `${50 + x * 30}%`);
    rootRef.current?.style.setProperty("--hero-light-y", `${42 + y * 22}%`);
  };

  const reset = () => {
    rootRef.current?.style.setProperty("--hero-rx", "0deg");
    rootRef.current?.style.setProperty("--hero-ry", "0deg");
    rootRef.current?.style.setProperty("--hero-light-x", "55%");
    rootRef.current?.style.setProperty("--hero-light-y", "42%");
  };

  return (
    <div
      className="hero-system-v8"
      ref={rootRef}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      <div className="hero-system-plane hero-system-plane-back" aria-hidden="true" />
      <div className="hero-system-plane hero-system-plane-mid" aria-hidden="true" />
      <div className="hero-system-core">
        <SystemFlow />
      </div>
      <div className="hero-system-readout" aria-hidden="true">
        <span>LIVE / SYSTEM</span>
        <span>INTERACTION / ACTIVE</span>
        <span>MOTION / BOUNDED</span>
      </div>
    </div>
  );
}

export function SystemSpineV8() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-v8-stage]"));
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.v8Stage ?? 0);
        setActive(index);
      },
      { rootMargin: "-26% 0px -44%", threshold: [0.08, 0.2, 0.4, 0.65] },
    );

    nodes.forEach((node) => {
      observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <aside className="system-spine-v8" aria-hidden="true">
      <div className="system-spine-track-v8">
        <div
          className="system-spine-energy-v8"
          style={{ height: `${((active + 1) / stages.length) * 100}%` }}
        />
      </div>
      {stages.map((stage, index) => (
        <div
          className={`system-spine-node-v8 ${index <= active ? "is-active" : ""} ${index === active ? "is-current" : ""}`}
          key={stage}
          style={{ top: `${(index / (stages.length - 1)) * 100}%` }}
        >
          <i />
          <span>0{index + 1}</span>
          <b>{stage}</b>
        </div>
      ))}
    </aside>
  );
}

function CreateVisual() {
  return (
    <div className="stage-live-v8 create-live-v8">
      <div className="stage-live-toolbar-v8"><span /><span /><span /><b>leadflowai://build</b></div>
      <div className="create-layout-v8">
        <div className="create-browser-v8">
          <div className="create-browser-nav-v8"><b>BRAND.</b><i /><i /><i /></div>
          <div className="create-browser-hero-v8"><small>DESIGN / BUILD</small><strong>Digital product.</strong><em /></div>
          <div className="create-browser-grid-v8"><i /><i /><i /></div>
        </div>
        <div className="create-code-v8" aria-hidden="true">
          <span>01</span><code>&lt;main&gt;</code>
          <span>02</span><code>&nbsp;&nbsp;&lt;Experience /&gt;</code>
          <span>03</span><code>&nbsp;&nbsp;&lt;SearchReady /&gt;</code>
          <span>04</span><code>&lt;/main&gt;</code>
          <div className="create-code-cursor-v8" />
        </div>
      </div>
      <div className="stage-status-v8"><span>SEMANTIC / ON</span><span>RESPONSIVE / READY</span></div>
    </div>
  );
}

function DiscoverVisual() {
  const nodes = [
    ["CRAWL", 18, 28],
    ["ENTITY", 74, 18],
    ["ANSWER", 84, 58],
    ["SCHEMA", 62, 82],
    ["INTENT", 22, 76],
  ] as const;

  return (
    <div className="stage-live-v8 discover-live-v8">
      <div className="discover-map-v8">
        <svg viewBox="0 0 100 100" aria-hidden="true">
          {nodes.map(([name, x, y]) => <line key={name} x1="50" y1="50" x2={x} y2={y} />)}
          <circle cx="50" cy="50" r="15" className="discover-ring-v8" />
          <circle cx="50" cy="50" r="24" className="discover-ring-v8 discover-ring-delay-v8" />
        </svg>
        <div className="discover-core-v8"><span>SEARCH</span><strong>ARCH</strong><small>LIVE MAP</small></div>
        {nodes.map(([name, x, y], index) => (
          <div className="discover-node-v8" key={name} style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${index * -0.7}s` }}>
            <i /><span>{name}</span>
          </div>
        ))}
      </div>
      <div className="discover-results-v8">
        <article><span>01</span><div><strong>Direct answer</strong><i /></div></article>
        <article><span>02</span><div><strong>Entity clarity</strong><i /></div></article>
        <article><span>03</span><div><strong>Structured context</strong><i /></div></article>
      </div>
      <div className="stage-status-v8"><span>SEO / STRUCTURED</span><span>AI SEARCH / READY</span></div>
    </div>
  );
}

function ConvertVisual() {
  return (
    <div className="stage-live-v8 convert-live-v8">
      <div className="convert-path-v8">
        <div className="convert-step-v8 convert-step-1-v8"><span>01</span><strong>VISIT</strong><small>INTENT</small></div>
        <i />
        <div className="convert-step-v8 convert-step-2-v8"><span>02</span><strong>VALUE</strong><small>MESSAGE</small></div>
        <i />
        <div className="convert-step-v8 convert-step-3-v8"><span>03</span><strong>ACTION</strong><small>CTA</small></div>
        <i />
        <div className="convert-step-v8 convert-step-4-v8"><span>04</span><strong>LEAD</strong><small>CONTACT</small></div>
      </div>
      <div className="convert-funnel-v8" aria-hidden="true">
        <span /><span /><span /><b />
      </div>
      <div className="convert-readout-v8"><span>PATH / CLEAR</span><span>FRICTION / REDUCE</span><span>MEASURE / EVENTS</span></div>
      <div className="stage-status-v8"><span>CRO / ACTIVE</span><span>CTA / CONNECTED</span></div>
    </div>
  );
}

function IntelligenceVisual() {
  const points = [
    [12, 22], [29, 12], [48, 25], [70, 13], [88, 30], [20, 52], [42, 48], [64, 54], [84, 62], [29, 82], [55, 78], [76, 86],
  ] as const;

  return (
    <div className="stage-live-v8 intelligence-live-v8">
      <div className="ai-network-v8">
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <path d="M12 22 L29 12 L48 25 L70 13 L88 30 L84 62 L76 86 L55 78 L29 82 L20 52 L12 22 M20 52 L42 48 L64 54 L84 62 M29 12 L42 48 L55 78 M48 25 L64 54 L76 86" />
        </svg>
        {points.map(([x, y], index) => <i key={`${x}-${y}`} style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${index * -0.23}s` }} />)}
        <div className="ai-core-v8"><small>RAG / CONTEXT</small><strong>AI</strong><span>CONTROLLED</span></div>
      </div>
      <div className="ai-pipeline-v8">
        <span>QUESTION</span><i /><span>CONTEXT</span><i /><span>ANSWER</span><i /><span>FALLBACK</span>
      </div>
      <div className="stage-status-v8"><span>PUBLIC TRUTH / LOCKED</span><span>FALLBACK / READY</span></div>
    </div>
  );
}

function ConnectVisual() {
  const endpoints = ["CRM", "MAIL", "CAL", "API", "DATA"] as const;
  return (
    <div className="stage-live-v8 connect-live-v8">
      <div className="connect-core-v8"><small>WEBSITE</small><strong>HUB</strong><span>ROUTING</span></div>
      <svg className="connect-lines-v8" viewBox="0 0 100 100" aria-hidden="true">
        <path d="M50 50 L15 16 M50 50 L85 17 M50 50 L91 53 M50 50 L76 86 M50 50 L20 83" />
      </svg>
      {endpoints.map((endpoint, index) => (
        <div className={`connect-endpoint-v8 connect-endpoint-${index + 1}-v8`} key={endpoint}>
          <i /><strong>{endpoint}</strong><small>READY</small>
        </div>
      ))}
      <div className="connect-packets-v8" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      <div className="stage-status-v8"><span>DATA FLOW / CONTROLLED</span><span>INTEGRATIONS / MODULAR</span></div>
    </div>
  );
}

function CareVisual() {
  return (
    <div className="stage-live-v8 care-live-v8">
      <div className="care-toolbar-v8"><span>SYSTEM / OBSERVE</span><b>● ONLINE</b></div>
      <div className="care-dashboard-v8">
        <article><span>PERFORMANCE</span><div className="care-chart-v8"><i /><i /><i /><i /><i /><i /><i /></div><strong>WATCH</strong></article>
        <article><span>SEARCH HEALTH</span><div className="care-bars-v8"><i /><i /><i /><i /></div><strong>CHECK</strong></article>
        <article><span>SECURITY</span><div className="care-shield-v8"><i /><b>✓</b></div><strong>HARDEN</strong></article>
        <article><span>CHANGE</span><div className="care-log-v8"><i /><i /><i /></div><strong>ITERATE</strong></article>
      </div>
      <div className="stage-status-v8"><span>MONITOR / CONTINUOUS</span><span>GROWTH / ITERATIVE</span></div>
    </div>
  );
}

export function StageVisualV8({ stageKey }: { stageKey: StageKey }) {
  switch (stageKey) {
    case "CREATE": return <CreateVisual />;
    case "DISCOVER": return <DiscoverVisual />;
    case "CONVERT": return <ConvertVisual />;
    case "INTELLIGENCE": return <IntelligenceVisual />;
    case "CONNECT": return <ConnectVisual />;
    case "CARE": return <CareVisual />;
  }
}
