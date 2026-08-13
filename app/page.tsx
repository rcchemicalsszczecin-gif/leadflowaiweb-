import { BeforeAfterDemo, ProjectCommandCenter } from "@/components/interactive-experience";
import {
  LiquidCircuitV9,
  MagneticLinkV9,
  PremiumHeroV9,
  PremiumInteractionLayerV9,
  PremiumProofV9,
  PremiumStageJourneyV9,
  ScrollStoryV9,
  WhatWeBuildV9,
} from "@/components/premium-art-direction-v9";
import { SectionLabel } from "@/components/section-label";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";

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

export default function HomePage() {
  return (
    <main id="top" className="premium-page-v9">
      <PremiumInteractionLayerV9 />

      <section className="hero hero-v9 section-dark" aria-labelledby="hero-title">
        <div className="page-shell">
          <SiteHeader />

          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">LEADFLOWAI / DIGITAL EXPERIENCE STUDIO</p>
              <h1 id="hero-title">
                Strony internetowe
                <span>zaprojektowane do wzrostu.</span>
              </h1>
              <p className="hero-lead">
                Projektujemy cyfrowe doświadczenia, które łączą design, development, 3D,
                SEO, AEO, GEO / AI Search, konwersję i inteligentne funkcje w jeden spójny produkt.
              </p>

              <div className="hero-actions">
                <MagneticLinkV9 href="#contact" className="hero-primary-v9" cursor="START">
                  Porozmawiajmy o projekcie <span aria-hidden="true">↗</span>
                </MagneticLinkV9>
                <MagneticLinkV9 href="/lab" className="hero-secondary-v9" cursor="OPEN">
                  Wejdź do Live Lab <span aria-hidden="true">↗</span>
                </MagneticLinkV9>
              </div>

              <ul className="capability-line" aria-label="Główne kompetencje">
                <li>WEB</li>
                <li>3D</li>
                <li>SEARCH</li>
                <li>CRO</li>
                <li>AI</li>
              </ul>
            </div>

            <div className="hero-visual">
              <PremiumHeroV9 />
            </div>
          </div>

          <div className="hero-bottomline" aria-hidden="true">
            <span>SCROLL / EXPERIENCE</span>
            <span>LEADFLOW / 2026</span>
          </div>
        </div>
      </section>

      <section id="system" className="premium-intro-v9">
        <div className="page-shell section-pad">
          <SectionLabel index="00" label="PHILOSOPHY" />
          <div className="editorial-grid">
            <h2>
              Nie składamy stron.
              <span>Projektujemy doświadczenia.</span>
            </h2>
            <div className="editorial-copy">
              <p>
                Dobra strona nie kończy się na interfejsie. Musi być czytelna dla człowieka,
                wyszukiwarki i systemów AI, prowadzić użytkownika do działania i dawać się
                mierzyć oraz rozwijać.
              </p>
              <p>
                Dlatego design, kod, widoczność, konwersję, motion i inteligencję traktujemy
                jako warstwy jednego produktu.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PremiumStageJourneyV9 />
      <WhatWeBuildV9 />
      <ScrollStoryV9 />
      <LiquidCircuitV9 />
      <PremiumProofV9 />

      <div className="premium-before-after-zone-v9" data-cursor="SLIDE">
        <BeforeAfterDemo />
      </div>

      <section id="process" className="section-light process-section premium-process-v9">
        <div className="page-shell section-pad">
          <SectionLabel index="07" label="PROCESS" />
          <div className="process-head">
            <h2>Od celu biznesowego do działającego produktu.</h2>
            <p>
              Zakres dobieramy do projektu. Nie każdy klient potrzebuje chatbota, sklepu, 3D czy
              zaawansowanej automatyzacji — ale każdy projekt potrzebuje świadomej architektury.
            </p>
          </div>

          <ol className="process-list">
            <li><span>01</span><strong>Diagnoza</strong><p>Cel, odbiorca, obecna strona, konkurencja, wymagania i mierzalny rezultat.</p></li>
            <li><span>02</span><strong>Architektura</strong><p>Informacja, UX, search architecture, treść, dane i plan konwersji.</p></li>
            <li><span>03</span><strong>Design + build</strong><p>Interfejs, komponenty, responsive, development, motion, 3D i integracje tam, gdzie mają sens.</p></li>
            <li><span>04</span><strong>Validation</strong><p>Funkcje, mobile, accessibility, SEO/AEO/GEO, performance i security.</p></li>
            <li><span>05</span><strong>Launch + growth</strong><p>Publikacja, monitoring, pomiar i rozwój na podstawie rzeczywistych danych.</p></li>
          </ol>
        </div>
      </section>

      <section className="quality-section section-dark premium-quality-v9">
        <div className="page-shell section-pad">
          <SectionLabel index="08" label="QUALITY" inverted />
          <div className="quality-head">
            <h2>Nasza strona ma spełniać standard, który sprzedajemy.</h2>
            <p>Jakość nie jest etapem na końcu. Jest częścią architektury od pierwszej decyzji.</p>
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

      <div className="premium-command-zone-v9">
        <ProjectCommandCenter />
      </div>

      <section className="section-light faq-section premium-faq-v9">
        <div className="page-shell section-pad">
          <SectionLabel index="09" label="FAQ" />
          <div className="faq-grid">
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

      <section id="contact" className="contact-section section-dark premium-contact-v9">
        <div className="page-shell contact-grid">
          <SectionLabel index="10" label="START" inverted />
          <div>
            <p className="contact-kicker">MASZ PROJEKT?</p>
            <h2>Zbudujmy stronę, którą da się zapamiętać.</h2>
          </div>
          <div className="contact-actions">
            <MagneticLinkV9 href={`mailto:${site.email}`} className="button button-primary button-large" cursor="MAIL">
              {site.email}
              <span aria-hidden="true">↗</span>
            </MagneticLinkV9>
            <p>WEB · 3D / WEBGL · INTERACTIVE · E-COMMERCE · SEARCH · AI · INTEGRACJE</p>
          </div>
        </div>

        <div className="page-shell">
          <SiteFooter />
        </div>
      </section>
    </main>
  );
}
