"use client";

import { useEffect, useRef } from "react";

type Ripple = {
  x: number;
  y: number;
  born: number;
  life: number;
  speed: number;
  strength: number;
  width: number;
};

const MAX_RIPPLES = 48;

function addRipple(ripples: Ripple[], ripple: Ripple) {
  ripples.push(ripple);
  if (ripples.length > MAX_RIPPLES) {
    ripples.splice(0, ripples.length - MAX_RIPPLES);
  }
}

export function WaterSurface() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const ripples: Ripple[] = [];
    let frame = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let pointerX = window.innerWidth * 0.5;
    let pointerY = window.innerHeight * 0.45;
    let pointerVisible = false;
    let lastBrushAt = 0;
    let lastBrushX = -1000;
    let lastBrushY = -1000;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const brush = (x: number, y: number, now: number) => {
      addRipple(ripples, {
        x,
        y,
        born: now,
        life: 1150,
        speed: 0.095,
        strength: 0.22,
        width: 1.05,
      });
    };

    const stone = (x: number, y: number, now: number) => {
      const waves = [
        { delay: 0, speed: 0.19, strength: 0.65, width: 1.7, life: 1800 },
        { delay: 70, speed: 0.15, strength: 0.44, width: 1.3, life: 1650 },
        { delay: 145, speed: 0.12, strength: 0.3, width: 1.0, life: 1500 },
      ];

      for (const wave of waves) {
        addRipple(ripples, {
          x,
          y,
          born: now + wave.delay,
          life: wave.life,
          speed: wave.speed,
          strength: wave.strength,
          width: wave.width,
        });
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      pointerVisible = true;

      if (reducedMotion.matches || event.pointerType === "touch") return;

      const now = performance.now();
      const dx = pointerX - lastBrushX;
      const dy = pointerY - lastBrushY;
      const distance = Math.hypot(dx, dy);

      if (now - lastBrushAt > 38 && distance > 13) {
        brush(pointerX, pointerY, now);
        lastBrushAt = now;
        lastBrushX = pointerX;
        lastBrushY = pointerY;
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      pointerVisible = true;
      if (!reducedMotion.matches) stone(pointerX, pointerY, performance.now());
    };

    const onPointerLeave = () => {
      pointerVisible = false;
    };

    const draw = (now: number) => {
      context.clearRect(0, 0, width, height);

      if (pointerVisible && !reducedMotion.matches) {
        const glow = context.createRadialGradient(pointerX, pointerY, 0, pointerX, pointerY, 150);
        glow.addColorStop(0, "rgba(184, 255, 56, 0.055)");
        glow.addColorStop(0.34, "rgba(170, 220, 255, 0.025)");
        glow.addColorStop(1, "rgba(0, 0, 0, 0)");
        context.fillStyle = glow;
        context.fillRect(pointerX - 150, pointerY - 150, 300, 300);
      }

      context.globalCompositeOperation = "screen";

      for (let index = ripples.length - 1; index >= 0; index -= 1) {
        const ripple = ripples[index];
        const elapsed = now - ripple.born;
        if (elapsed < 0) continue;

        const progress = elapsed / ripple.life;
        if (progress >= 1) {
          ripples.splice(index, 1);
          continue;
        }

        const radius = 10 + elapsed * ripple.speed;
        const fade = (1 - progress) ** 2;
        const alpha = ripple.strength * fade;

        context.beginPath();
        context.arc(ripple.x, ripple.y, radius, 0, Math.PI * 2);
        context.strokeStyle = `rgba(205, 237, 255, ${alpha})`;
        context.lineWidth = ripple.width;
        context.stroke();

        context.beginPath();
        context.arc(ripple.x + 1.5, ripple.y + 1, Math.max(2, radius - 4), 0, Math.PI * 2);
        context.strokeStyle = `rgba(184, 255, 56, ${alpha * 0.42})`;
        context.lineWidth = Math.max(0.55, ripple.width * 0.55);
        context.stroke();

        if (ripple.strength > 0.5 && progress < 0.42) {
          const core = context.createRadialGradient(
            ripple.x,
            ripple.y,
            0,
            ripple.x,
            ripple.y,
            42 + radius * 0.18,
          );
          core.addColorStop(
            0,
            `rgba(248, 250, 252, ${0.08 * (1 - progress / 0.42)})`,
          );
          core.addColorStop(1, "rgba(248, 250, 252, 0)");
          context.fillStyle = core;
          context.fillRect(ripple.x - 100, ripple.y - 100, 200, 200);
        }
      }

      context.globalCompositeOperation = "source-over";
      frame = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeave);
    frame = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
    };
  }, []);

  return (
    <>
      <div className="precision-ambient" aria-hidden="true">
        <div className="ambient-grid" />
        <div className="ambient-scan" />
        <div className="ambient-orbit ambient-orbit-a" />
        <div className="ambient-orbit ambient-orbit-b" />
        <div className="ambient-node ambient-node-a" />
        <div className="ambient-node ambient-node-b" />
        <div className="ambient-node ambient-node-c" />
      </div>
      <canvas ref={canvasRef} className="water-surface" role="presentation" />
    </>
  );
}
