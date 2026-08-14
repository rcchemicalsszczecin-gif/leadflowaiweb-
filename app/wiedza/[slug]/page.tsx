import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { V14SiteFooter } from "@/components/v14-site-footer";
import { V14SiteHeader } from "@/components/v14-site-header";
import { getKnowledgeMethodology, knowledgeEditorialV13 } from "@/lib/knowledge-editorial-v13";
import { getKnowledgeArticle, knowledgeArticles } from "@/lib/knowledge-registry";
import { toPublicKnowledgeArticle } from "@/lib/public-knowledge-article";
import { getArticleStructuredData } from "@/lib/structured-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return knowledgeArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const sourceArticle = getKnowledgeArticle(slug);
  if (!sourceArticle) return {};
  const article = toPublicKnowledgeArticle(sourceArticle);
  const reviewedAt = article.reviewedAt ?? knowledgeEditorialV13.reviewedAt;

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/wiedza/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url: `/wiedza/${article.slug}`,
      modifiedTime: reviewedAt,
      images: ["/og-leadflowai.svg"],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: ["/og-leadflowai.svg"],
    },
  };
}

export default async function KnowledgeArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const sourceArticle = getKnowledgeArticle(slug);
  if (!sourceArticle) notFound();
  const article = toPublicKnowledgeArticle(sourceArticle);
  const methodology = getKnowledgeMethodology(Boolean(article.sources?.length));
  const reviewedLabel = article.reviewedLabel ?? knowledgeEditorialV13.reviewedLabel;

  return (
    <main id="main-content" className="knowledge-article-page v14-route-page v14-knowledge-article-page" tabIndex={-1}>
      <JsonLd data={getArticleStructuredData(article)} />
      <V14SiteHeader mode="static" />

      <section className="knowledge-article-hero section-dark blueprint-surface">
        <div className="page-shell">
          <div className="knowledge-article-head">
            <nav className="breadcrumb" aria-label="Okruszki">
              <a href="/">LeadFlowAI</a><span aria-hidden="true">/</span><a href="/wiedza">Wiedza</a>
            </nav>
            <p className="eyebrow">{article.eyebrow}</p>
            <h1>{article.title}</h1>
            <p>{article.summary}</p>
          </div>
        </div>
      </section>

      <article className="section-light knowledge-article-body">
        <div className="page-shell knowledge-article-grid">
          <aside aria-label="Informacja o materiale">
            <p className="service-index">LEADFLOWAI / WIEDZA</p>
            <p><strong>Redakcja:</strong> {knowledgeEditorialV13.editor}</p>
            <p><strong>Zweryfikowano:</strong> {reviewedLabel}</p>
            <p>{methodology}</p>
          </aside>

          <div className="knowledge-prose">
            {article.sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets ? (
                  <ul>
                    {section.bullets.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                ) : null}
              </section>
            ))}

            {article.sources?.length ? (
              <section className="knowledge-related">
                <h2>Źródła i standardy</h2>
                <p>Materiały źródłowe użyte do weryfikacji technicznych twierdzeń w tym artykule.</p>
                <nav aria-label="Źródła i standardy">
                  {article.sources.map((source) => (
                    <a key={source.href} href={source.href} target="_blank" rel="noreferrer">
                      {source.label}<span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </nav>
              </section>
            ) : null}

            <section className="knowledge-related">
              <h2>Powiązane strony LeadFlowAI</h2>
              <nav aria-label="Powiązane materiały i usługi">
                {article.related.map((item) => (
                  <a key={item.href} href={item.href}>{item.label}<span aria-hidden="true">↗</span></a>
                ))}
              </nav>
            </section>
          </div>
        </div>
      </article>

      <section className="section-dark knowledge-article-footer">
        <div className="page-shell section-pad">
          <p className="service-index">NASTĘPNY KROK / PROJEKT</p>
          <h2>Potrzebujesz przełożyć tę wiedzę na konkretną stronę?</h2>
          <a className="button button-primary" href="/kontakt">Opisz projekt <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <V14SiteFooter />
    </main>
  );
}
