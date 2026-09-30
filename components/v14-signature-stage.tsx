"use client";

import { useEffect, useRef } from "react";
import { V14BrowserMockup } from "@/components/v14-browser-mockup";
import { V14PhoneMockup } from "@/components/v14-phone-mockup";

export function V14SignatureStage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    if (reducedMotion.matches || !finePointer.matches) return;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;

    const apply = () => {
      frame = 0;
      root.style.setProperty("--sig-ry", `${targetX * 7.5}deg`);
      root.style.setProperty("--sig-rx", `${targetY * -5.5}deg`);
      root.style.setProperty("--sig-x", `${targetX * 16}px`);
      root.style.setProperty("--sig-y", `${targetY * 10}px`);
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = root.getBoundingClientRect();
      if (
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom
      ) {
        targetX = 0;
        targetY = 0;
      } else {
        targetX = ((event.clientX - bounds.left) / Math.max(bounds.width, 1) - 0.5) * 2;
        targetY = ((event.clientY - bounds.top) / Math.max(bounds.height, 1) - 0.5) * 2;
      }
      if (!frame) frame = window.requestAnimationFrame(apply);
    };

    const onPointerLeave = () => {
      targetX = 0;
      targetY = 0;
      if (!frame) frame = window.requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("blur", onPointerLeave);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("blur", onPointerLeave);
    };
  }, []);

  return (
    <div ref={rootRef} className="v14-signature-stage" role="img" aria-label="Przestrzenny podgląd produktu WWW">
      <div className="v14-signature-scene" aria-hidden="true">
        <div className="v14-signature-horizon" />
        <div className="v14-signature-orbit v14-signature-orbit-a" />
        <div className="v14-signature-orbit v14-signature-orbit-b" />
        <div className="v14-signature-grid-plane" />

        <div className="v14-signature-browser-layer">
          <V14BrowserMockup />
        </div>
        <div className="v14-signature-phone-layer">
          <V14PhoneMockup />
        </div>

        <div className="v14-signature-node v14-signature-node-search">
          <small>WARSTWA WIDOCZNOŚCI</small>
          <strong>SEO · AEO · GEO</strong>
          <span>ENCJE / INTENCJE / ODPOWIEDZI</span>
        </div>
        <div className="v14-signature-node v14-signature-node-ai">
          <small>WARSTWA AI</small>
          <strong>RAG · API · AGENT AI</strong>
          <span>KONTEKST / DZIAŁANIE</span>
        </div>
        <div className="v14-signature-node v14-signature-node-runtime">
          <small>DZIAŁAJĄCY PRODUKT</small>
          <strong>UI / DANE / PRZEPŁYW</strong>
          <span>GOTOWY DO WERYFIKACJI</span>
        </div>

        <div className="v14-signature-depth-scale">
          <span>GŁĘBIA 00</span><span>GŁĘBIA 80</span><span>GŁĘBIA 160</span><span>GŁĘBIA 240</span>
        </div>
        <div className="v14-signature-hud">
          <small>INTERAKTYWNA POWIERZCHNIA / WEBGL2</small>
          <strong>RUCH · GŁĘBIA · PRODUKT WWW</strong>
        </div>
      </div>
    </div>
  );
}
