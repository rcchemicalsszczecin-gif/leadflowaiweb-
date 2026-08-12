import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { knowledgeArticles } from "@/lib/knowledge";

export const metadata: Metadata = {
  title: "Wiedza o WWW, SEO, AEO, GEO i chatbotach",
  description:
    "Praktyczna wiedza LeadFlowAI o projektowaniu stron, SEO, AEO, GEO / AI Search, chatbotach, migracjach i jakości WWW.",
  alternates: { canonical: "/wiedza" },
};

export default function KnowledgePage() {
  return (
    <main className="knowledge-page">
      <section className="knowledge-hero section-dark blueprint-surface">
        <div className="page-shell">
          <SiteHeader />
          <div className="knowledge-hero-copy">
            <p className="eyebrow">LEADFLOWAI / KNOWLEDGE</p>
            <h1>Wiedza, która pomaga podejmować decyzje o stronie.</h1>
            <p>
              Bez produkowania artykułów dla samej liczby URL-i. Publikujemy materiały powiązane z realnymi problemami: architekturą WWW, widocznością, migracją, konwersją i inteligentnymi funkcjami.
            </p>
          </div>
        </div>
      </section>

      <section className="section-light">
        <div className="page-shell section-pad knowledge-index">
          <div className="knowledge-index-head">
            <p className="service-index">01 / ARTICLES</p>
            <h2>Fundamenty przed narzędziami.</h2>
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
          <p className="service-index">02 / EDITORIAL RULE</p>
          <h2>Nie publikujemy fikcyjnego doświadczenia.</h2>
          <p>
            Materiały opisują nasze podejście i praktyki projektowe. Gdy treść wymaga danych klienta, wyników albo regulowanych twierdzeń branżowych, takie informacje muszą pochodzić z rzeczywistego źródła i przejść odpowiednią weryfikację.
          </p>
        </div>
        <div className="page-shell"><SiteFooter /></div>
      </section>
    </main>
  );
}
