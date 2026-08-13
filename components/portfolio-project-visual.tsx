type ProjectVisualProps = {
  index: number;
  name: string;
};

export function PortfolioProjectVisual({ index, name }: ProjectVisualProps) {
  const variant = index % 3;
  const signal = variant === 0 ? "WWW · SEO · AEO · GEO" : variant === 1 ? "AUDIO · ASR · QA" : "AI · RAG · SYSTEMY";

  return (
    <figure
      role="img"
      aria-label={`Wizualizacja architektury projektu ${name}`}
      style={{ margin: 0, display: "grid", gap: "0.75rem" }}
    >
      <div
        style={{
          position: "relative",
          minHeight: "19rem",
          overflow: "hidden",
          border: "1px solid rgba(174, 227, 243, 0.18)",
          borderRadius: "1.25rem",
          background:
            "radial-gradient(circle at 72% 28%, rgba(92, 217, 246, 0.12), transparent 28%), linear-gradient(145deg, rgba(3, 10, 15, 0.98), rgba(7, 23, 31, 0.94))",
          boxShadow: "0 2rem 6rem rgba(0, 0, 0, 0.28)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.45rem",
            padding: "0.8rem 1rem",
            borderBottom: "1px solid rgba(174, 227, 243, 0.12)",
            fontSize: "0.72rem",
            letterSpacing: "0.08em",
          }}
        >
          <span aria-hidden="true">● ● ●</span>
          <strong style={{ marginLeft: "auto" }}>{name}</strong>
        </div>

        <div
          style={{
            position: "relative",
            minHeight: "15rem",
            display: "grid",
            placeItems: "center",
            padding: "2rem",
            backgroundImage:
              "linear-gradient(rgba(155, 231, 255, 0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(155, 231, 255, 0.035) 1px, transparent 1px)",
            backgroundSize: "2.4rem 2.4rem",
          }}
        >
          <svg viewBox="0 0 600 340" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.5 }}>
            <path d="M72 250 C165 185 208 235 294 170 S432 96 530 128" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <path d="M82 92 C172 130 214 72 306 116 S438 240 522 214" fill="none" stroke="currentColor" strokeWidth="1.2" />
          </svg>

          <div
            style={{
              position: "relative",
              zIndex: 1,
              width: "min(100%, 24rem)",
              padding: "1.4rem",
              border: "1px solid rgba(174, 227, 243, 0.16)",
              background: "rgba(3, 12, 17, 0.82)",
              backdropFilter: "blur(10px)",
            }}
          >
            <small style={{ display: "block", marginBottom: "0.7rem", letterSpacing: "0.16em", opacity: 0.68 }}>PROJEKT WŁASNY</small>
            <strong style={{ display: "block", fontSize: "clamp(1.5rem, 4vw, 2.7rem)", lineHeight: 1 }}>{name.replace(".pl", "")}</strong>
            <span style={{ display: "block", marginTop: "0.8rem", fontSize: "0.78rem", letterSpacing: "0.09em", opacity: 0.76 }}>{signal}</span>
          </div>
        </div>
      </div>

      <figcaption style={{ margin: 0, fontSize: "0.78rem", opacity: 0.66 }}>
        Wizualizacja systemowa · nie jest screenshotem klienta
      </figcaption>
    </figure>
  );
}
