import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Realizacje i projekty własne",
  description:
    "Realizacje LeadFlowAI publikowane wyłącznie z prawdziwym zakresem i możliwym do potwierdzenia statusem. Bez fikcyjnych klientów i wyników.",
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
            <h1>Realizacje bez fikcyjnych historii sukcesu.</h1>
            <p>
              Pokazujemy tylko projekty, których zakres i status możemy potwierdzić. Projekty własne są oznaczone jako projekty własne, a klientowskie case studies pojawią się dopiero wtedy, gdy istnieje realne wdrożenie i zgoda na publikację.
            </p>
          </div>
        </div>
      </section>

      <section className="section-light portfolio-current">
        <div className="page-shell section-pad">
          <p className="service-index">01 / OWN PROJECT</p>
          <div className="portfolio-case-grid">
            <div>
              <p className="portfolio-status">PROJEKT WŁASNY · AKTYWNIE ROZWIJANY</p>
              <h2>LeadFlowAI.pl</h2>
              <p>
                Własny serwis web-production Tervyxa Systems, budowany jako demonstrator standardu oferowanego klientom. Nie przedstawiamy go jako klientowskiego case study.
              </p>
            </div>
            <dl>
              <div><dt>Marka</dt><dd>LeadFlowAI</dd></div>
              <div><dt>Domena</dt><dd>leadflowai.pl</dd></div>
              <div><dt>Operator</dt><dd>Tervyxa Systems sp. z o.o.</dd></div>
              <div><dt>Kontakt</dt><dd>{site.email}</dd></div>
            </dl>
          </div>

          <div className="portfolio-scope-grid">
            <article>
              <span>01</span>
              <h3>Architecture</h3>
              <p>Next.js App Router, TypeScript, wspólny design system i dane usługowe zamiast kopiowanych podstron.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Search</h3>
              <p>SEO, AEO, GEO / AI Search, public truth, sitemap, robots i structured data jako jedna architektura.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Conversion</h3>
              <p>Formularz briefu z server-side validation, same-origin protection i kontrolowanym fallbackiem.</p>
            </article>
            <article>
              <span>04</span>
              <h3>Intelligence</h3>
              <p>Asystent strony z lokalną wiedzą, public-truth guardrails i opcjonalnym serwerowym providerem AI.</p>
            </article>
            <article>
              <span>05</span>
              <h3>Quality evidence</h3>
              <p>CI sprawdza kontrakty domenowe, typecheck, lint, production build oraz runtime smoke testy leadów i czatu.</p>
            </article>
            <article>
              <span>06</span>
              <h3>Public status</h3>
              <p>Projekt jest nadal rozwijany na branchu roboczym. Nie publikujemy wymyślonych wyników, rankingów ani metryk produkcyjnych.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-dark portfolio-method">
        <div className="page-shell section-pad">
          <p className="service-index">02 / CASE STUDY RULE</p>
          <h2>Każda przyszła realizacja ma mieć dowód, nie marketingową legendę.</h2>
          <ol>
            <li><span>01</span><div><h3>Problem</h3><p>Co rzeczywiście miało zostać rozwiązane?</p></div></li>
            <li><span>02</span><div><h3>Zakres</h3><p>Co zostało zaprojektowane i wdrożone?</p></div></li>
            <li><span>03</span><div><h3>Technologia</h3><p>Jakie decyzje techniczne miały znaczenie dla wyniku?</p></div></li>
            <li><span>04</span><div><h3>Evidence</h3><p>Jakie realne dane, testy lub rezultaty możemy pokazać?</p></div></li>
          </ol>
        </div>
        <div className="page-shell"><SiteFooter /></div>
      </section>
    </main>
  );
}
