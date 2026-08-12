import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPublicPage, primaryPublicLinks } from "@/lib/page-registry";
import type { ServicePageData } from "@/lib/services";
import { site } from "@/lib/site";
import { getPageStructuredData } from "@/lib/structured-data";

type ServicePageProps = {
  page: ServicePageData;
};

export function ServicePage({ page }: ServicePageProps) {
  return (
    <main className="service-page">
      <JsonLd data={getPageStructuredData(page)} />

      <section className="service-hero section-dark blueprint-surface">
        <div className="page-shell">
          <SiteHeader />

          <div className="service-hero-grid">
            <div className="service-hero-copy">
              <nav className="breadcrumb" aria-label="Okruszki">
                <a href="/">LeadFlowAI</a>
                <span aria-hidden="true">/</span>
                <span>{page.code}</span>
              </nav>
              <p className="eyebrow">{page.eyebrow}</p>
              <h1>{page.title}</h1>
              <p className="service-lead">{page.lead}</p>
              <div className="hero-actions">
                <a className="button button-primary" href={`mailto:${site.email}?subject=${encodeURIComponent(`Wycena: ${page.title}`)}`}>
                  Zapytaj o projekt <span aria-hidden="true">↗</span>
                </a>
                <a className="text-link" href="#scope">
                  Zobacz zakres <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>

            <aside className="service-capability-panel" aria-label="Zakres usługi">
              <p className="panel-label">CAPABILITY MAP</p>
              <ul>
                {page.capabilities.map((item, index) => (
                  <li key={item}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{item}</strong>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="section-light service-answer">
        <div className="page-shell service-answer-grid">
          <p className="service-index">00 / DIRECT ANSWER</p>
          <h2>Co dokładnie dostajesz?</h2>
          <p>{page.directAnswer}</p>
        </div>
      </section>

      <section className="section-light service-outcomes">
        <div className="page-shell section-pad">
          <div className="service-section-head">
            <p className="service-index">01 / BUSINESS VALUE</p>
            <h2>Projekt ma rozwiązywać konkretny problem, nie tylko wyglądać nowocześnie.</h2>
          </div>
          <div className="outcome-grid">
            {page.outcomes.map((item, index) => (
              <article key={item.title}>
                <span>0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="scope" className="section-dark service-deliverables">
        <div className="page-shell section-pad">
          <div className="service-section-head service-section-head-dark">
            <p className="service-index">02 / SCOPE</p>
            <h2>Zakres projektujemy jako spójny system.</h2>
          </div>
          <div className="deliverable-list">
            {page.deliverables.map((item) => (
              <article key={item.index}>
                <span className="deliverable-index">{item.index}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <ul className="tag-list" aria-label={`Elementy: ${item.title}`}>
                  {item.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-light service-process">
        <div className="page-shell section-pad">
          <div className="service-section-head">
            <p className="service-index">03 / PROCESS</p>
            <h2>Proces bez ukrywania ryzyk i zależności.</h2>
          </div>
          <ol>
            {page.process.map((item, index) => (
              <li key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-light service-faq">
        <div className="page-shell section-pad">
          <div className="service-section-head">
            <p className="service-index">04 / FAQ</p>
            <h2>Pytania, które warto wyjaśnić przed startem.</h2>
          </div>
          <div className="service-faq-grid">
            {page.faqs.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section-light related-services">
        <div className="page-shell section-pad">
          <div className="service-section-head">
            <p className="service-index">05 / RELATED</p>
            <h2>Zobacz powiązane obszary WWW i widoczności.</h2>
          </div>
          <nav className="related-grid" aria-label="Powiązane usługi">
            {page.related.map((slug) => {
              const related = getPublicPage(slug);
              if (!related) return null;
              return (
                <a key={slug} href={`/${slug}`}>
                  <span>{related.code}</span>
                  <strong>{related.title}</strong>
                  <span aria-hidden="true">↗</span>
                </a>
              );
            })}
          </nav>
          <nav className="service-directory" aria-label="Główne usługi LeadFlowAI">
            {primaryPublicLinks.map((item) => (
              <a key={item.slug} href={`/${item.slug}`} aria-current={item.slug === page.slug ? "page" : undefined}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="contact-section section-dark">
        <div className="page-shell contact-grid">
          <p className="section-label section-label-inverted"><span>06</span><span>LEADFLOWAI / START</span></p>
          <div>
            <p className="contact-kicker">MASZ PROJEKT?</p>
            <h2>Opisz cel. Dobierzemy zakres strony do realnej pracy, którą ma wykonywać.</h2>
          </div>
          <div className="contact-actions">
            <a className="button button-primary button-large" href={`mailto:${site.email}`}>
              {site.email} <span aria-hidden="true">↗</span>
            </a>
            <p>WWW · SEO · AEO · GEO · CRO · Chatboty · Integracje</p>
          </div>
        </div>
        <div className="page-shell">
          <SiteFooter />
        </div>
      </section>
    </main>
  );
}
