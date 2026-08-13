import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { knowledgeArticles } from "@/lib/knowledge-registry";

export const metadata: Metadata = {
  title: "Baza wiedzy o stronach WWW, SEO, AEO, GEO i konwersji",
  description:
    "Praktyczna baza wiedzy LeadFlowAI o projektowaniu i budowie stron internetowych, SEO, AEO, GEO, widoczności w wyszukiwaniu AI, CRO, analityce, dostępności, wydajności, integracjach i utrzymaniu WWW.",
  alternates: { canonical: "/wiedza" },
};

export default function KnowledgePage() {
  return (
    <main className="knowledge-page">
      <section className="knowledge-hero section-dark blueprint-surface">
        <div className="page-shell">
          <SiteHeader />
          <div className="knowledge-hero-copy">
            <p className="eyebrow">LEADFLOWAI / BAZA WIEDZY</p>
            <h1>Wiedza, która pomaga podejmować lepsze decyzje o stronie internetowej.</h1>
            <p>
              Zebraliśmy materiały o architekturze WWW, widoczności, SEO, AEO, GEO, konwersji, AI, integracjach i jakości technicznej. Każdy artykuł odpowiada na konkretny problem zamiast istnieć wyłącznie dla kolejnego adresu URL.
            </p>
          </div>
        </div>
      </section>

      <section className="section-light">
        <div className="page-shell section-pad knowledge-index">
          <div className="knowledge-index-head">
            <p className="service-index">01 / MATERIAŁY</p>
            <h2>Najpierw problem i decyzja. Potem technologia.</h2>
          </div>

          <div className="knowledge-cards">
            {knowledgeArticles.map((article, index) => (
              <article key={article.slug}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{article.eyebrow}</p>
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <a href={`/wiedza/${article.slug}`}>
                  Czytaj materiał <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark knowledge-truth">
        <div className="page-shell section-pad">
          <p className="service-index">02 / ZASADA REDAKCYJNA</p>
          <h2>Publikujemy treści, które mają pomagać użytkownikowi i dają się obronić źródłami lub rzeczywistą praktyką.</h2>
          <p>
            Materiały opisują nasze podejście, praktyki projektowe i możliwe do zweryfikowania standardy. Gdy temat wymaga danych klienta, wyników, prawa albo regulowanych twierdzeń, informacja musi pochodzić z rzeczywistego źródła i przejść odpowiednią weryfikację.
          </p>
        </div>
        <div className="page-shell"><SiteFooter /></div>
      </section>
    </main>
  );
}
