import { SectionLabel } from "@/components/section-label";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SystemFlow } from "@/components/system-flow";
import { site, systemStages } from "@/lib/site";

const qualitySignals = [
  ["SEMANTIC", "HTML i struktura informacji projektowane jako fundament, nie kosmetyka."],
  ["PERFORMANCE", "Minimalny zbędny JavaScript, szybkie ładowanie i Core Web Vitals w procesie QA."],
  ["ACCESSIBLE", "Klawiatura, focus, kontrast, redukcja ruchu i semantyka od początku projektu."],
  ["SEARCH READY", "SEO, AEO, GEO / AI Search i structured data wpisane w architekturę strony."],
  ["CONVERSION", "CTA, formularze i ścieżki użytkownika projektowane pod mierzalny cel biznesowy."],
  ["SECURE", "Walidacja, hardening, ochrona formularzy i kontrola zależności jako standard techniczny."],
] as const;

const faqs = [
  {
    question: "Czy SEO, AEO i GEO są osobną usługą czy częścią budowy strony?",
    answer:
      "Mogą być rozwijane jako osobny zakres, ale w nowych projektach projektujemy ich fundament razem ze stroną: strukturę informacji, semantykę, metadata, structured data i treści odpowiadające na realne intencje użytkowników.",
  },
  {
    question: "Czy LeadFlowAI robi tylko nowe strony?",
    answer:
      "Nie. Możemy przeprowadzić audyt, redesign, modernizację albo migrację istniejącego serwisu, zachowując ważne adresy URL i elementy wartościowe dla widoczności.",
  },
  {
    question: "Czy chatbot AI jest obowiązkowy?",
    answer:
      "Nie. Dodajemy go tylko wtedy, gdy ma konkretną rolę — na przykład odpowiada na pytania, kwalifikuje zapytania albo pomaga wybrać usługę. Podstawowa strona pozostaje użyteczna bez chatbota.",
  },
  {
    question: "Czy zapewniacie utrzymanie po uruchomieniu?",
    answer:
      "Tak. Zakres może obejmować monitoring, backup, bezpieczeństwo, performance, aktualizacje oraz dalszy rozwój SEO, AEO i GEO / AI Search.",
  },
] as const;

function getStageSectionId(stageKey: (typeof systemStages)[number]["key"]) {
  switch (stageKey) {
    case "CREATE":
      return "create";
    case "DISCOVER":
      return "discover";
    case "INTELLIGENCE":
      return "intelligence";
    default:
      return undefined;
  }
}

export default function HomePage() {
  return (
    <main id="top">
      <section className="hero section-dark blueprint-surface" aria-labelledby="hero-title">
        <div className="page-shell">
          <SiteHeader />

          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">LEADFLOWAI / WEB ENGINEERING</p>
              <h1 id="hero-title">
                Strony internetowe
                <span>zaprojektowane do wzrostu.</span>
              </h1>
              <p className="hero-lead">
                Projektujemy i budujemy nowoczesne WWW, łącząc design, development, SEO, AEO,
                GEO / AI Search, konwersję i inteligentne funkcje w jeden spójny system.
              </p>

              <div className="hero-actions">
                <a className="button button-primary" href="#contact">
                  Wyceń stronę
                  <span aria-hidden="true">↗</span>
                </a>
                <a className="text-link" href="#system">
                  Zobacz jak pracuje system <span aria-hidden="true">↓</span>
                </a>
              </div>

              <ul className="capability-line" aria-label="Główne kompetencje">
                <li>WWW</li>
                <li>SEO</li>
                <li>AEO</li>
                <li>GEO</li>
                <li>AI</li>
                <li>CRO</li>
              </ul>
            </div>

            <div className="hero-visual">
              <SystemFlow />
            </div>
          </div>

          <div className="hero-bottomline" aria-hidden="true">
            <span>SCROLL TO ARCHITECTURE</span>
            <span>01—06</span>
          </div>
        </div>
      </section>

      <section id="system" className="section-light editorial-intro">
        <div className="page-shell section-pad">
          <SectionLabel index="00" label="SYSTEM" />
          <div className="editorial-grid content-frame content-frame-wide">
            <h2>
              Nie składamy stron.
              <span>Projektujemy systemy WWW.</span>
            </h2>
            <div className="editorial-copy">
              <p>
                Dobra strona nie kończy się na interfejsie. Musi być czytelna dla człowieka,
                wyszukiwarki i systemów AI, prowadzić użytkownika do działania i dawać się
                mierzyć oraz rozwijać.
              </p>
              <p>
                Dlatego design, kod, widoczność i konwersję traktujemy jako warstwy jednego
                produktu.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="system-stages" aria-label="System pracy LeadFlowAI">
        {systemStages.map((stage, index) => {
          const dark = index === 1 || index === 3 || index === 5;

          return (
            <article
              key={stage.key}
              id={getStageSectionId(stage.key)}
              className={`stage-section ${dark ? "section-dark" : "section-light"}`}
            >
              <div className="page-shell stage-grid content-frame stage-module">
                <SectionLabel index={stage.id} label={stage.key} inverted={dark} />
                <div className="stage-heading">
                  <h2>{stage.title}</h2>
                </div>
                <div className="stage-detail">
                  <p>{stage.description}</p>
                  <ul className="tag-list" aria-label={`Zakres ${stage.key}`}>
                    {stage.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section id="process" className="section-light process-section">
        <div className="page-shell section-pad">
          <SectionLabel index="07" label="PROCESS" />
          <div className="process-head content-frame content-frame-split">
            <h2>Od celu biznesowego do działającego systemu.</h2>
            <p>
              Zakres dobieramy do projektu. Nie każdy klient potrzebuje chatbota, sklepu czy
              zaawansowanej automatyzacji — ale każdy projekt potrzebuje świadomej architektury.
            </p>
          </div>

          <ol className="process-list">
            <li><span>01</span><strong>Diagnoza</strong><p>Cel, odbiorca, obecna strona, konkurencja, wymagania i mierzalny rezultat.</p></li>
            <li><span>02</span><strong>Architektura</strong><p>Informacja, UX, search architecture, treść, dane i plan konwersji.</p></li>
            <li><span>03</span><strong>Design + build</strong><p>Interfejs, komponenty, responsive, development i integracje.</p></li>
            <li><span>04</span><strong>Validation</strong><p>Funkcje, mobile, accessibility, SEO/AEO/GEO, performance i security.</p></li>
            <li><span>05</span><strong>Launch + growth</strong><p>Publikacja, monitoring, pomiar i rozwój na podstawie rzeczywistych danych.</p></li>
          </ol>
        </div>
      </section>

      <section className="quality-section section-dark blueprint-surface">
        <div className="page-shell section-pad">
          <SectionLabel index="08" label="QUALITY SIGNAL" inverted />
          <div className="quality-head content-frame content-frame-split">
            <h2>Nasza własna strona ma spełniać standard, który sprzedajemy.</h2>
            <p>Bez skrótów typu „naprawimy SEO później”. Jakość jest częścią architektury.</p>
          </div>

          <div className="quality-grid">
            {qualitySignals.map(([name, description], index) => (
              <article key={name} className="quality-item">
                <span aria-hidden="true">0{index + 1}</span>
                <h3>{name}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-light proof-section">
        <div className="page-shell section-pad proof-grid content-frame content-frame-proof">
          <SectionLabel index="09" label="PROOF" />
          <div>
            <p className="proof-kicker">REAL WORK ONLY</p>
            <h2>Portfolio bez fikcji.</h2>
          </div>
          <div className="proof-copy">
            <p>
              Pokazujemy wyłącznie prawdziwe realizacje i dane, które możemy udokumentować.
              Kolejne case studies pojawią się wraz z rzeczywistymi wdrożeniami LeadFlowAI i
              projektami Tervyxa, które mogą zostać publicznie pokazane.
            </p>
            <a className="text-link text-link-dark" href="#contact">
              Zbudujmy pierwszy projekt <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className="section-light faq-section">
        <div className="page-shell section-pad">
          <SectionLabel index="10" label="FAQ" />
          <div className="faq-grid content-frame content-frame-faq">
            <h2>Najważniejsze pytania.</h2>
            <div className="faq-list">
              {faqs.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section section-dark">
        <div className="page-shell contact-grid content-frame content-frame-contact">
          <SectionLabel index="11" label="START" inverted />
          <div>
            <p className="contact-kicker">MASZ PROJEKT?</p>
            <h2>Porozmawiajmy o stronie, która ma konkretną pracę do wykonania.</h2>
          </div>
          <div className="contact-actions">
            <a className="button button-primary button-large" href={`mailto:${site.email}`}>
              {site.email}
              <span aria-hidden="true">↗</span>
            </a>
            <p>Strony WWW · Landing pages · E-commerce · SEO · AEO · GEO · Chatboty · Integracje</p>
          </div>
        </div>

        <div className="page-shell">
          <SiteFooter />
        </div>
      </section>
    </main>
  );
}
