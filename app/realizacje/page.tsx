import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { portfolioCases } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Realizacje i projekty własne",
  description:
    "Realizacje LeadFlowAI publikowane wyłącznie z prawdziwym zakresem i możliwym do potwierdzenia statusem. LeadFlowAI, TranskrypcjaAI i Tervyxa bez fikcyjnych wyników.",
  alternates: { canonical: "/realizacje" },
};

export default function PortfolioPage() {
  return (
    <main className="portfolio-page">
      <section className="portfolio-hero section-dark blueprint-surface">
        <div className="page-shell">
          <SiteHeader />
          <div className="portfolio-hero-copy">
            <p className="eyebrow">LEADFLOWAI / REAL WORK</p>
            <h1>Realne projekty. Jawny zakres. Jawny status.</h1>
            <p>
              Pokazujemy wyłącznie projekty, których kod, domenę albo stan wdrożenia możemy potwierdzić. Poniższe realizacje są projektami własnymi ekosystemu Tervyxa Systems — nie przedstawiamy ich jako zewnętrznych case studies ani nie dopisujemy im niezmierzonych wyników biznesowych.
            </p>
          </div>
        </div>
      </section>

      {portfolioCases.map((project, projectIndex) => (
        <section
          className={projectIndex % 2 === 0 ? "section-light portfolio-current" : "section-dark portfolio-current"}
          key={project.name}
        >
          <div className="page-shell section-pad">
            <p className="service-index">{project.id}</p>
            <div className="portfolio-case-grid">
              <div>
                <p className="portfolio-status">{project.status}</p>
                <h2>{project.name}</h2>
                <p>{project.description}</p>
                {project.note ? <p>{project.note}</p> : null}
                <p>
                  <a className={projectIndex % 2 === 0 ? "text-link text-link-dark" : "text-link"} href={project.url}>
                    Otwórz projekt <span aria-hidden="true">↗</span>
                  </a>
                </p>
              </div>
              <dl>
                {project.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="portfolio-scope-grid">
              {project.scope.map((item, index) => (
                <article key={item.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section-dark portfolio-method">
        <div className="page-shell section-pad">
          <p className="service-index">04 / CASE STUDY RULE</p>
          <h2>Dowód przed claimem. Status przed marketingiem.</h2>
          <ol>
            <li><span>01</span><div><h3>Problem</h3><p>Co rzeczywiście miało zostać rozwiązane i dla kogo?</p></div></li>
            <li><span>02</span><div><h3>Zakres</h3><p>Co zostało zaprojektowane, zbudowane albo wdrożone?</p></div></li>
            <li><span>03</span><div><h3>Technologia</h3><p>Jakie decyzje techniczne są potwierdzone przez kod lub wdrożenie?</p></div></li>
            <li><span>04</span><div><h3>Evidence</h3><p>Jakie testy, publiczne artefakty albo wyniki można realnie zweryfikować?</p></div></li>
          </ol>
        </div>
        <div className="page-shell"><SiteFooter /></div>
      </section>
    </main>
  );
}
