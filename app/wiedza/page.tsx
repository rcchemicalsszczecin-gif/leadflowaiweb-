import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { knowledgeArticles } from "@/lib/knowledge-registry";

export const metadata: Metadata = {
  title: "Wiedza o stronach WWW, SEO, AEO, GEO, AI i konwersji",
  description:
    "Praktyczna wiedza LeadFlowAI o projektowaniu i budowie stron, SEO, AEO, GEO / AI Search, CRO, analityce, dostępności, performance, AI, integracjach i utrzymaniu WWW.",
  alternates: { canonical: "/wiedza" },
};

export default function KnowledgePage() {
  return (
    <main className="knowledge-page">
      <section className="knowledge-hero section-dark blueprint-surface">
        <div className="page-shell">
          <SiteHeader />
          <div className="knowledge-hero-copy">
            <p className="eyebrow">LEADFLOWAI / WIEDZA</p>
            <h1>Wiedza, która pomaga podejmować decyzje o stronie i całym systemie wokół niej.</h1>
            <p>
              Bez produkowania artykułów dla samej liczby adresów URL. Każdy materiał odpowiada na odrębny problem związany z architekturą WWW, widocznością, konwersją, AI, integracjami, jakością lub utrzymaniem.
            </p>
          </div>
        </div>
      </section>

      <section className="section-light">
        <div className="page-shell section-pad knowledge-index">
          <div className="knowledge-index-head">
            <p className="service-index">01 / ARTYKUŁY</p>
            <h2>Najpierw fundamenty i decyzje, potem narzędzia.</h2>
          </div>

          <div className="knowledge-cards">
            {knowledgeArticles.map((article, index) => (
              <article key={article.slug}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{article.eyebrow}</p>
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <a href={`/wiedza/${article.slug}`}>
                  Czytaj artykuł <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark knowledge-truth">
        <div className="page-shell section-pad">
          <p className="service-index">02 / ZASADA REDAKCYJNA</p>
          <h2>Nie publikujemy fikcyjnego doświadczenia ani treści tworzonych tylko po to, żeby zwiększyć liczbę podstron.</h2>
          <p>
            Materiały opisują nasze podejście, praktyki projektowe i możliwe do zweryfikowania standardy. Gdy temat wymaga danych klienta, wyników, prawa albo regulowanych twierdzeń, informacja musi pochodzić z rzeczywistego źródła i przejść odpowiednią weryfikację.
          </p>
        </div>
        <div className="page-shell"><SiteFooter /></div>
      </section>
    </main>
  );
}
