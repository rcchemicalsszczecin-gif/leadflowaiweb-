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
import {
  CinematicCoreV92,
  ClosingVisualV92,
  ManifestSceneV92,
  PremiumExperienceControllerV92,
} from "@/components/premium-v9-2-enhancements";
import { SectionLabel } from "@/components/section-label";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";

const qualitySignals = [
  ["SEMANTYKA", "HTML i struktura informacji projektowane jako fundament, nie kosmetyka."],
  ["WYDAJNOŚĆ", "Minimalny zbędny JavaScript, szybkie ładowanie i Core Web Vitals w procesie QA."],
  ["DOSTĘPNOŚĆ", "Klawiatura, focus, kontrast, redukcja ruchu i semantyka od początku projektu."],
  ["GOTOWOŚĆ NA WYSZUKIWANIE", "SEO, AEO, GEO / AI Search i dane strukturalne wpisane w architekturę strony."],
  ["KONWERSJA", "CTA, formularze i ścieżki użytkownika projektowane pod mierzalny cel biznesowy."],
  ["BEZPIECZEŃSTWO", "Walidacja, utwardzanie, ochrona formularzy i kontrola zależności jako standard techniczny."],
] as const;

const faqs = [
  {
    question: "Czy SEO, AEO i GEO są osobną usługą czy częścią budowy strony?",
    answer:
      "Mogą być rozwijane jako osobny zakres, ale w nowych projektach projektujemy ich fundament razem ze stroną: strukturę informacji, semantykę, metadane, dane strukturalne i treści odpowiadające na realne intencje użytkowników.",
  },
  {
    question: "Czy LeadFlowAI robi tylko nowe strony?",
    answer:
      "Nie. Możemy przeprowadzić audyt, przeprojektowanie, modernizację albo migrację istniejącego serwisu, zachowując ważne adresy URL i elementy wartościowe dla widoczności.",
  },
  {
    question: "Czy chatbot AI jest obowiązkowy?",
    answer:
      "Nie. Dodajemy go tylko wtedy, gdy ma konkretną rolę — na przykład odpowiada na pytania, kwalifikuje zapytania albo pomaga wybrać usługę. Podstawowa strona pozostaje użyteczna bez chatbota.",
  },
  {
    question: "Czy zapewniacie utrzymanie po uruchomieniu?",
    answer:
      "Tak. Zakres może obejmować monitoring, kopie zapasowe, bezpieczeństwo, wydajność, aktualizacje oraz dalszy rozwój SEO, AEO i GEO / AI Search.",
  },
] as const;

export default function HomePage() {
  return (
    <main id="top" className="premium-page-v9 premium-page-v92">
      <PremiumInteractionLayerV9 />
      <PremiumExperienceControllerV92 />

      <section className="hero hero-v9 section-dark" aria-labelledby="hero-title" data-v92-reveal="depth">
        <div className="page-shell">
          <SiteHeader />

          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">LEADFLOWAI / STRONY WWW · WIDOCZNOŚĆ · SYSTEMY</p>
              <h1 id="hero-title">
                Strony internetowe
                <span>zaprojektowane do realnej pracy.</span>
              </h1>
              <p className="hero-lead">
                Projektujemy i budujemy strony WWW, które jasno przedstawiają ofertę, prowadzą do
                kontaktu i są przygotowane pod SEO, AEO oraz GEO / AI Search. Interakcje, 3D,
                automatyzacje i AI dodajemy tylko wtedy, gdy wzmacniają konkretny cel biznesowy.
              </p>

              <div className="hero-actions">
                <MagneticLinkV9 href="/kontakt" className="hero-primary-v9" cursor="ZACZNIJ">
                  Wyceń projekt <span aria-hidden="true">↗</span>
                </MagneticLinkV9>
                <MagneticLinkV9 href="/realizacje" className="hero-secondary-v9" cursor="OTWÓRZ">
                  Zobacz realizacje <span aria-hidden="true">↗</span>
                </MagneticLinkV9>
              </div>

              <ul className="capability-line" aria-label="Główne kompetencje">
                <li>STRONY WWW</li>
                <li>WIDOCZNOŚĆ</li>
                <li>KONWERSJA</li>
                <li>INTERAKCJE</li>
                <li>AI</li>
              </ul>
            </div>

            <div className="hero-visual">
              <PremiumHeroV9 />
            </div>
          </div>

          <div className="hero-bottomline" aria-hidden="true">
            <span>PRZEWIJAJ / ODKRYWAJ</span>
            <span>LEADFLOW / 2026</span>
          </div>
        </div>
      </section>

      <section id="system" className="premium-intro-v9" data-v92-reveal="mask">
        <div className="page-shell section-pad">
          <SectionLabel index="00" label="PODEJŚCIE" />
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
                Dlatego projekt, kod, widoczność, konwersję, ruch i inteligencję traktujemy
                jako warstwy jednego produktu.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PremiumStageJourneyV9 />
      <ManifestSceneV92 />
      <WhatWeBuildV9 />
      <CinematicCoreV92 />
      <ScrollStoryV9 />
      <LiquidCircuitV9 />
      <PremiumProofV9 />

      <div className="premium-before-after-zone-v9" data-cursor="PRZESUŃ" data-v92-reveal="wipe">
        <BeforeAfterDemo />
      </div>

      <section id="process" className="section-light process-section premium-process-v9" data-v92-reveal="rise">
        <div className="page-shell section-pad">
          <SectionLabel index="14" label="PROCES" />
          <div className="process-head">
            <h2>Od celu biznesowego do działającego produktu.</h2>
            <p>
              Zakres dobieramy do projektu. Nie każdy klient potrzebuje chatbota, sklepu, 3D czy
              zaawansowanej automatyzacji — ale każdy projekt potrzebuje świadomej architektury.
            </p>
          </div>

          <ol className="process-list">
            <li><span>01</span><strong>Diagnoza</strong><p>Cel, odbiorca, obecna strona, konkurencja, wymagania i mierzalny rezultat.</p></li>
            <li><span>02</span><strong>Architektura</strong><p>Informacja, UX, architektura wyszukiwania, treść, dane i plan konwersji.</p></li>
            <li><span>03</span><strong>Projekt + wdrożenie</strong><p>Interfejs, komponenty, responsywność, programowanie, ruch, 3D i integracje tam, gdzie mają sens.</p></li>
            <li><span>04</span><strong>Walidacja</strong><p>Funkcje, urządzenia mobilne, dostępność, SEO/AEO/GEO, wydajność i bezpieczeństwo.</p></li>
            <li><span>05</span><strong>Publikacja + rozwój</strong><p>Uruchomienie, monitoring, pomiar i rozwój na podstawie rzeczywistych danych.</p></li>
          </ol>
        </div>
      </section>

      <section className="quality-section section-dark premium-quality-v9" data-v92-reveal="depth">
        <div className="page-shell section-pad">
          <SectionLabel index="15" label="JAKOŚĆ" inverted />
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

      <div className="premium-command-zone-v9" data-v92-reveal="wipe">
        <ProjectCommandCenter />
      </div>

      <section className="section-light faq-section premium-faq-v9" data-v92-reveal="rise">
        <div className="page-shell section-pad">
          <SectionLabel index="16" label="FAQ" />
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

      <section id="contact" className="contact-section section-dark premium-contact-v9 premium-closing-v92" data-v92-reveal="depth">
        <ClosingVisualV92 />
        <div className="page-shell contact-grid">
          <SectionLabel index="17" label="KONTAKT" inverted />
          <div>
            <p className="contact-kicker">MASZ PROJEKT?</p>
            <h2>Zbudujmy stronę, którą da się zapamiętać.</h2>
          </div>
          <div className="contact-actions">
            <MagneticLinkV9 href={`mailto:${site.email}`} className="button button-primary button-large" cursor="E-MAIL">
              {site.email}
              <span aria-hidden="true">↗</span>
            </MagneticLinkV9>
            <p>WWW · 3D / WEBGL · INTERAKCJE · SPRZEDAŻ INTERNETOWA · WIDOCZNOŚĆ · AI · INTEGRACJE</p>
          </div>
        </div>

        <div className="page-shell">
          <SiteFooter />
        </div>
      </section>
    </main>
  );
}
