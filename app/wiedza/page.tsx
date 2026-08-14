import type { Metadata } from "next";
import { V14SiteFooter } from "@/components/v14-site-footer";
import { V14SiteHeader } from "@/components/v14-site-header";
import { knowledgeArticles } from "@/lib/knowledge-registry";
import { knowledgeTopicsV13 } from "@/lib/knowledge-topics-v13";
import { toPublicKnowledgeArticle } from "@/lib/public-knowledge-article";
import { site } from "@/lib/site";

const title = "Baza wiedzy o stronach WWW, SEO, AEO, GEO i konwersji";
const description =
  "Praktyczna baza wiedzy LeadFlowAI o projektowaniu i budowie stron internetowych, SEO, AEO, GEO, widoczności w wyszukiwaniu AI, CRO, analityce, dostępności, wydajności, integracjach i utrzymaniu WWW.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/wiedza" },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: `${site.url}/wiedza/`,
    siteName: site.name,
    title,
    description,
    images: [{ url: `${site.url}/og-leadflowai.svg`, width: 1200, height: 630, alt: `${site.name} — baza wiedzy` }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${site.url}/og-leadflowai.svg`],
  },
};

export default function KnowledgePage() {
  const publicArticles = knowledgeArticles.map(toPublicKnowledgeArticle);

  return (
    <main id="main-content" className="knowledge-page v14-route-page v14-knowledge-page" tabIndex={-1}>
      <V14SiteHeader mode="static" />

      <section className="knowledge-hero section-dark blueprint-surface">
        <div className="page-shell">
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
            <p className="service-index">01 / KLASTRY TEMATYCZNE</p>
            <h2>Najpierw problem i decyzja. Potem technologia.</h2>
            <p>Materiały są pogrupowane według pytania, które pomagają rozwiązać. Nie tworzymy osobnych, cienkich hubów tylko po to, żeby zwiększać liczbę adresów URL.</p>
          </div>

          {knowledgeTopicsV13.map((topic, topicIndex) => {
            const articles = publicArticles.filter((article) => topic.slugs.some((slug) => slug === article.slug));

            return (
              <section key={topic.key} className="knowledge-topic-v13" aria-labelledby={`knowledge-topic-${topic.key.toLowerCase()}`}>
                <div className="service-section-head">
                  <p className="service-index">{String(topicIndex + 1).padStart(2, "0")} / {topic.label}</p>
                  <h2 id={`knowledge-topic-${topic.key.toLowerCase()}`}>{topic.label}</h2>
                  <p>{topic.description}</p>
                </div>
                <div className="knowledge-cards">
                  {articles.map((article, index) => (
                    <article key={article.slug}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <p>{article.eyebrow}</p>
                      <h3>{article.title}</h3>
                      <p>{article.description}</p>
                      <a href={`/wiedza/${article.slug}`}>
                        Czytaj materiał <span aria-hidden="true">↗</span>
                      </a>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
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
      </section>

      <V14SiteFooter />
    </main>
  );
}
