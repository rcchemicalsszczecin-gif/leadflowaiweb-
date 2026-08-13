"use client";

import { useEffect, useRef, useState } from "react";

const progressSections = [
  ["system", "00", "PODEJŚCIE"],
  ["create", "01", "PROJEKT"],
  ["discover", "02", "WIDOCZNOŚĆ"],
  ["convert", "03", "KONWERSJA"],
  ["intelligence", "04", "AI"],
  ["connect", "05", "INTEGRACJE"],
  ["care", "06", "OPIEKA"],
  ["manifest", "07", "ZASADA"],
  ["what-we-build", "08", "MOŻLIWOŚCI"],
  ["core-experience", "09", "RDZEŃ 3D"],
  ["system-story", "10", "SYSTEM"],
  ["liquid-circuit", "11", "LIQUID"],
  ["proof", "12", "DOWODY"],
  ["contact", "13", "KONTAKT"],
] as const;

export function PremiumExperienceControllerV92() {
  const [active, setActive] = useState("system");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("v92-motion-ready");

    const revealNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-v92-reveal]"));
    const sectionNodes = progressSections
      .map(([id]) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));

    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.classList.add("is-v92-visible");
        }
      },
      { rootMargin: "-8% 0px -8%", threshold: 0.08 },
    );

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-28% 0px -58%", threshold: [0.04, 0.16, 0.32] },
    );

    revealNodes.forEach((node) => {
      revealObserver.observe(node);
    });
    sectionNodes.forEach((node) => {
      sectionObserver.observe(node);
    });

    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
      root.classList.remove("v92-motion-ready");
    };
  }, []);

  return (
    <nav className="experience-rail-v92" aria-label="Postęp strony">
      <div className="experience-rail-line-v92" aria-hidden="true" />
      {progressSections.map(([id, index, label]) => (
        <a
          key={id}
          href={`#${id}`}
          className={active === id ? "is-active" : ""}
          aria-current={active === id ? "location" : undefined}
          data-cursor="SKOCZ"
        >
          <span>{index}</span>
          <strong>{label}</strong>
        </a>
      ))}
    </nav>
  );
}

export function ManifestSceneV92() {
  return (
    <section
      id="manifest"
      className="manifest-scene-v92"
      data-v92-reveal="mask"
      aria-labelledby="manifest-title"
    >
      <p className="manifest-kicker-v92">LEADFLOWAI / ZASADA STUDIA</p>
      <h2 id="manifest-title" className="manifest-title-v92">
        <span>PROJEKT.</span>
        <span>KOD.</span>
        <span>WIDOCZNOŚĆ.</span>
        <span>INTELLIGENCE.</span>
      </h2>
      <div className="manifest-rule-v92" aria-hidden="true">
        <i />
        <span>JEDNO POŁĄCZONE DOŚWIADCZENIE</span>
        <i />
      </div>
    </section>
  );
}

export function CinematicCoreV92() {
  const sceneRef = useRef<HTMLDivElement>(null);

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    const scene = sceneRef.current;
    if (!scene) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    scene.style.setProperty("--core-rx-v92", `${-y * 14}deg`);
    scene.style.setProperty("--core-ry-v92", `${x * 18}deg`);
    scene.style.setProperty("--core-light-x-v92", `${50 + x * 30}%`);
    scene.style.setProperty("--core-light-y-v92", `${42 + y * 24}%`);
  };

  const reset = () => {
    const scene = sceneRef.current;
    scene?.style.setProperty("--core-rx-v92", "-7deg");
    scene?.style.setProperty("--core-ry-v92", "10deg");
  };

  return (
    <section
      id="core-experience"
      className="core-experience-v92"
      data-v92-reveal="depth"
      aria-labelledby="core-title-v92"
    >
      <div className="core-copy-v92">
        <p>NA ŻYWO / 3D W PRZEGLĄDARCE</p>
        <h2 id="core-title-v92">Jedna scena.<br /><span>Realna głębia.</span></h2>
        <p>
          Bez filmu i bez ciężkiej biblioteki 3D. Obiekt, światło i warstwy reagują na ruch
          bezpośrednio w przeglądarce.
        </p>
        <a href="/strony-3d-webgl" data-cursor="OTWÓRZ">Zobacz ofertę 3D / WebGL <span aria-hidden="true">↗</span></a>
      </div>

      <div
        className="core-stage-v92"
        ref={sceneRef}
        onPointerMove={onMove}
        onPointerLeave={reset}
        data-cursor="DRAG"
        role="img"
        aria-label="Interaktywny trójwymiarowy rdzeń LeadFlowAI"
      >
        <div className="core-depth-plane-v92 core-depth-plane-a-v92" />
        <div className="core-depth-plane-v92 core-depth-plane-b-v92" />
        <div className="core-orbit-v92 core-orbit-a-v92" />
        <div className="core-orbit-v92 core-orbit-b-v92" />
        <div className="core-object-v92">
          <span className="core-face-v92 core-face-front-v92">LF</span>
          <span className="core-face-v92 core-face-back-v92" />
          <span className="core-face-v92 core-face-left-v92" />
          <span className="core-face-v92 core-face-right-v92" />
          <span className="core-face-v92 core-face-top-v92" />
          <span className="core-face-v92 core-face-bottom-v92" />
        </div>
        <div className="core-readout-v92">
          <span>GŁĘBIA / AKTYWNA</span>
          <span>RUCH / NA ŻYWO</span>
          <span>GPU / OGRANICZONE</span>
        </div>
      </div>
    </section>
  );
}

export function ClosingVisualV92() {
  return (
    <div className="closing-visual-v92" aria-hidden="true">
      <div className="closing-orbit-v92"><i /><i /><i /></div>
      <div className="closing-core-v92">LF</div>
      <svg viewBox="0 0 700 380" aria-hidden="true">
        <title>Decoracyjna ścieżka sygnału</title>
        <path d="M15 190 C155 95 205 285 340 190 S545 95 685 190" />
        <path d="M90 285 C205 205 260 330 360 265 S535 190 625 245" />
      </svg>
      <span>GOTOWE / BUDUJEMY</span>
    </div>
  );
}
