import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getKnowledgeArticle, knowledgeArticles } from "@/lib/knowledge";
import { getArticleStructuredData } from "@/lib/structured-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return knowledgeArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getKnowledgeArticle(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/wiedza/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url: `/wiedza/${article.slug}`,
    },
  };
}

export default async function KnowledgeArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getKnowledgeArticle(slug);
  if (!article) notFound();

  return (
    <main className="knowledge-article-page">
      <JsonLd data={getArticleStructuredData(article)} />

      <section className="knowledge-article-hero section-dark blueprint-surface">
        <div className="page-shell">
          <SiteHeader />
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
            <p className="service-index">LEADFLOWAI / KNOWLEDGE</p>
            <p>Materiał redakcyjny o architekturze i praktykach WWW. Bez fikcyjnych case studies i bez gwarancji wyników.</p>
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
          <p className="service-index">NEXT / PROJECT</p>
          <h2>Potrzebujesz przełożyć tę wiedzę na konkretną stronę?</h2>
          <a className="button button-primary" href="/kontakt">Opisz projekt <span aria-hidden="true">↗</span></a>
        </div>
        <div className="page-shell"><SiteFooter /></div>
      </section>
    </main>
  );
}
