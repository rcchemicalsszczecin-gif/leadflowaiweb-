import { JsonLd } from "@/components/json-ld";
import { ServiceKnowledgeLinks } from "@/components/service-knowledge-links";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPublicPage, primaryPublicLinks } from "@/lib/page-registry";
import { publicCode } from "@/lib/public-language-v13";
import { toPublicServicePage } from "@/lib/public-service-page";
import { getServiceDecisionGuidance } from "@/lib/service-decision-guidance";
import type { ServicePageData } from "@/lib/services";
import { site } from "@/lib/site";
import { getPageStructuredData } from "@/lib/structured-data";

type ServicePageProps = {
  page: ServicePageData;
};

const templateFlow = {
  BUILD: { key: "build", href: "#scope", label: "Zobacz zakres" },
  EXPERIENCE: { key: "experience", href: "/lab", label: "Zobacz demo" },
  SEARCH: { key: "search", href: "#decision", label: "Sprawdź dopasowanie" },
  AI: { key: "ai", href: "#decision", label: "Sprawdź kiedy ma sens" },
  PLATFORM: { key: "platform", href: "#process", label: "Zobacz proces" },
  CARE: { key: "care", href: "#decision", label: "Sprawdź ryzyka" },
} as const;

export function ServicePage({ page }: ServicePageProps) {
  const publicPage = toPublicServicePage(page);
  const decision = getServiceDecisionGuidance(publicPage.slug);
  const [comparisonTitle, comparisonA, comparisonB] = decision.compare;
  const template = templateFlow[decision.group];

  return (
    <main className={`service-page service-template-${template.key}`} data-service-template={decision.group}>
      <JsonLd data={getPageStructuredData(publicPage)} />

      <section className="service-hero section-dark blueprint-surface">
        <div className="page-shell">
          <SiteHeader />

          <div className="service-hero-grid">
            <div className="service-hero-copy">
              <nav className="breadcrumb" aria-label="Okruszki">
                <a href="/">LeadFlowAI</a>
                <span aria-hidden="true">/</span>
                <span>{publicCode(publicPage.code)}</span>
              </nav>
              <p className="eyebrow">{publicPage.eyebrow}</p>
              <h1>{publicPage.title}</h1>
              <p className="service-lead">{publicPage.lead}</p>
              <div className="hero-actions">
                <a className="button button-primary" href={`mailto:${site.email}?subject=${encodeURIComponent(`Wycena: ${publicPage.title}`)}`}>
                  Wyceń projekt <span aria-hidden="true">↗</span>
                </a>
                <a className="text-link" href={template.href}>
                  {template.label} <span aria-hidden="true">{template.href.startsWith("#") ? "↓" : "↗"}</span>
                </a>
              </div>
            </div>

            <aside className="service-capability-panel" aria-label="Zakres usługi">
              <p className="panel-label">{decision.label}</p>
              <ul>
                {publicPage.capabilities.map((item, index) => (
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
          <p className="service-index">00 / ODPOWIEDŹ WPROST</p>
          <h2>Co dokładnie dostajesz?</h2>
          <p>{publicPage.directAnswer}</p>
        </div>
      </section>

      <section className="section-light service-outcomes">
        <div className="page-shell section-pad">
          <div className="service-section-head">
            <p className="service-index">01 / WARTOŚĆ DLA BIZNESU</p>
            <h2>Projekt ma rozwiązywać konkretny problem, nie tylko wyglądać nowocześnie.</h2>
          </div>
          <div className="outcome-grid">
            {publicPage.outcomes.map((item, index) => (
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
            <p className="service-index">02 / ZAKRES</p>
            <h2>Zakres projektujemy jako spójny system.</h2>
          </div>
          <div className="deliverable-list">
            {publicPage.deliverables.map((item) => (
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

      <section id="process" className="section-light service-process">
        <div className="page-shell section-pad">
          <div className="service-section-head">
            <p className="service-index">03 / PROCES</p>
            <h2>Proces bez ukrywania ryzyk i zależności.</h2>
          </div>
          <ol>
            {publicPage.process.map((item, index) => (
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
            <p className="service-index">04 / PYTANIA</p>
            <h2>Pytania, które warto wyjaśnić przed startem.</h2>
          </div>
          <div className="service-faq-grid">
            {publicPage.faqs.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="decision" className="section-dark service-deliverables service-decision-v13">
        <div className="page-shell section-pad">
          <div className="service-section-head service-section-head-dark">
            <p className="service-index">05 / DECYZJA</p>
            <h2>Czy ten zakres pasuje do Twojego projektu?</h2>
          </div>
          <div className="deliverable-list">
            <article>
              <span className="deliverable-index">01</span>
              <div><h3>Ma sens, gdy</h3><p>{decision.fit[0]}</p></div>
              <ul className="tag-list" aria-label="Drugi warunek dopasowania"><li>{decision.fit[1]}</li></ul>
            </article>
            <article>
              <span className="deliverable-index">02</span>
              <div><h3>Nie musi mieć sensu, gdy</h3><p>{decision.noFit[0]}</p></div>
              <ul className="tag-list" aria-label="Drugi warunek niedopasowania"><li>{decision.noFit[1]}</li></ul>
            </article>
            <article>
              <span className="deliverable-index">03</span>
              <div><h3>Co wpływa na koszt</h3><p>Nie publikujemy jednej ceny dla wszystkich projektów.</p></div>
              <ul className="tag-list" aria-label="Czynniki kosztu">{decision.cost.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
            <article>
              <span className="deliverable-index">04</span>
              <div><h3>Co wpływa na czas</h3><p>Harmonogram wynika z rzeczywistego zakresu i zależności.</p></div>
              <ul className="tag-list" aria-label="Czynniki czasu">{decision.time.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
            <article>
              <span className="deliverable-index">05</span>
              <div><h3>{comparisonTitle}</h3><p>{comparisonA}</p></div>
              <ul className="tag-list" aria-label="Alternatywa"><li>{comparisonB}</li></ul>
            </article>
          </div>
        </div>
      </section>

      <ServiceKnowledgeLinks slug={publicPage.slug} />

      <section className="section-light related-services">
        <div className="page-shell section-pad">
          <div className="service-section-head">
            <p className="service-index">07 / POWIĄZANE</p>
            <h2>Zobacz powiązane usługi i obszary rozwoju.</h2>
          </div>
          <nav className="related-grid" aria-label="Powiązane usługi">
            {publicPage.related.map((slug) => {
              const related = getPublicPage(slug);
              if (!related) return null;
              return (
                <a key={slug} href={`/${slug}`}>
                  <span>{publicCode(related.code)}</span>
                  <strong>{related.title}</strong>
                  <span aria-hidden="true">↗</span>
                </a>
              );
            })}
          </nav>
          <nav className="service-directory" aria-label="Główne usługi LeadFlowAI">
            {primaryPublicLinks.map((item) => (
              <a key={item.slug} href={`/${item.slug}`} aria-current={item.slug === publicPage.slug ? "page" : undefined}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="contact-section section-dark">
        <div className="page-shell contact-grid">
          <p className="section-label section-label-inverted"><span>08</span><span>LEADFLOWAI / KONTAKT</span></p>
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
