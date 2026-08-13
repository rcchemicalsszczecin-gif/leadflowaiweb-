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
  cursor = "OTWÓRZ",
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
    scene.style.setProperty("--v9-hero-rx", `${-y * 5}deg`);
    scene.style.setProperty("--v9-hero-ry", `${x * 7}deg`);
    scene.style.setProperty("--v9-hero-x", `${50 + x * 14}%`);
    scene.style.setProperty("--v9-hero-y", `${45 + y * 12}%`);
  };

  const reset = () => {
    const scene = sceneRef.current;
    scene?.style.setProperty("--v9-hero-rx", "-1deg");
    scene?.style.setProperty("--v9-hero-ry", "2deg");
  };

  return (
    <div
      className="premium-hero-scene-v9 hero-product-scene-v13"
      ref={sceneRef}
      onPointerMove={onMove}
      onPointerLeave={reset}
      data-cursor="PORUSZ"
      role="img"
      aria-label="Interaktywna wizualizacja strony internetowej LeadFlowAI na komputerze i telefonie"
    >
      <div className="hero-orb-v9" />

      <div className="hero-browser-v13" aria-hidden="true">
        <div className="hero-browser-toolbar-v13">
          <span><i /><i /><i /></span>
          <b>leadflowai.pl</b>
          <em>HTTPS</em>
        </div>
        <div className="hero-browser-body-v13">
          <div className="hero-browser-copy-v13">
            <small>STRONY WWW / WIDOCZNOŚĆ</small>
            <strong>Strona, która pracuje.</strong>
            <span>Oferta → zaufanie → kontakt</span>
            <i>WYCENA PROJEKTU ↗</i>
          </div>
          <div className="hero-browser-art-v13">
            <span className="hero-browser-orbit-v13" />
            <span className="hero-browser-core-v13">L/</span>
            <span className="hero-browser-line-v13 line-a" />
            <span className="hero-browser-line-v13 line-b" />
          </div>
        </div>
        <div className="hero-browser-signals-v13">
          <span>SEO</span><span>AEO</span><span>GEO</span><span>CWV</span><span>WCAG</span>
        </div>
      </div>

      <div className="hero-mobile-v13" aria-hidden="true">
        <div className="hero-mobile-speaker-v13" />
        <small>LEADFLOWAI</small>
        <strong>WWW</strong>
        <span>WIDOCZNOŚĆ</span>
        <i>↗</i>
      </div>
    </div>
  );
}
