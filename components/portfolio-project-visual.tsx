type ProjectVisualProps = {
  index: number;
  name: string;
};

export function PortfolioProjectVisual({ index, name }: ProjectVisualProps) {
  const variant = index % 3;

  return (
    <div className={`portfolio-visual-v13 portfolio-visual-v13-${variant + 1}`} role="img" aria-label={`Wizualizacja architektury projektu ${name}`}>
      <div className="portfolio-visual-frame-v13">
        <div className="portfolio-visual-toolbar-v13">
          <i /><i /><i />
          <span>{name}</span>
        </div>
        <div className="portfolio-visual-stage-v13">
          <div className="portfolio-visual-grid-v13" aria-hidden="true" />
          <div className="portfolio-visual-core-v13">
            <small>PROJEKT WŁASNY</small>
            <strong>{name.replace(".pl", "")}</strong>
            <span>{variant === 0 ? "WWW · SEO · AEO · GEO" : variant === 1 ? "AUDIO · ASR · QA" : "AI · RAG · SYSTEMY"}</span>
          </div>
          <div className="portfolio-visual-node-v13 node-a" aria-hidden="true" />
          <div className="portfolio-visual-node-v13 node-b" aria-hidden="true" />
          <div className="portfolio-visual-node-v13 node-c" aria-hidden="true" />
          <svg viewBox="0 0 600 340" aria-hidden="true">
            <path d="M72 250 C165 185 208 235 294 170 S432 96 530 128" />
            <path d="M82 92 C172 130 214 72 306 116 S438 240 522 214" />
          </svg>
        </div>
      </div>
      <p>Wizualizacja systemowa · nie jest screenshotem klienta</p>
    </div>
  );
}
