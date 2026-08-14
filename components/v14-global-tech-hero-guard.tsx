"use client";

import { useEffect } from "react";

export function V14GlobalTechHeroGuard() {
  useEffect(() => {
    const globalField = document.querySelector<HTMLElement>(".v14-global-tech-liquid");
    const hero = document.querySelector<HTMLElement>(".v14-hero-signature");
    if (!globalField || !hero) return;

    const update = () => {
      const bounds = hero.getBoundingClientRect();
      const covered = bounds.bottom > Math.min(window.innerHeight * 0.72, 680);
      globalField.dataset.heroCovered = covered ? "true" : "false";
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      delete globalField.dataset.heroCovered;
    };
  }, []);

  return null;
}
