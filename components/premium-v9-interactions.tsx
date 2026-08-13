"use client";

import { useEffect, useRef } from "react";

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
