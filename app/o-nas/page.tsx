import type { Metadata } from "next";
import { V14SiteFooter } from "@/components/v14-site-footer";
import { V14SiteHeader } from "@/components/v14-site-header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "O LeadFlowAI",
  description:
    "LeadFlowAI to marka Tervyxa Systems sp. z o.o. skoncentrowana na projektowaniu i budowie stron internetowych, widoczności SEO/AEO/GEO, interakcji i systemach WWW.",
  alternates: { canonical: "/o-nas" },
  openGraph: {
    title: "O LeadFlowAI",
    description:
      "Jak pracujemy, jak weryfikujemy publiczne twierdzenia i dlaczego łączymy projektowanie WWW, kod, widoczność oraz konwersję w jeden system.",
    url: "/o-nas",
    images: ["/og-leadflowai.svg"],
  },
};

const principles = [
  ["01", "Strona ma wykonywać pracę", "Projekt zaczynamy od celu biznesowego, użytkownika i decyzji, którą serwis ma ułatwiać — nie od wyboru efektu wizualnego."],
  ["02", "Widoczność jest częścią architektury", "SEO, AEO i GEO / AI Search projektujemy razem z treścią, strukturą informacji, linkowaniem i publiczną prawdą o marce."],
  ["03", "Dowód przed deklaracją", "Nie publikujemy fikcyjnych case studies, wymyślonych wyników ani funkcji, które nie są gotowe do publicznego użycia."],
  ["04", "Jakość musi być mierzalna", "Kod, statyczny build, routing, wydajność, dostępność i publiczne granice funkcji przechodzą automatyczne kontrole przed wydaniem."],
] as const;

const methodology = [
  ["01", "Diagnoza", "Ustalamy cel biznesowy, odbiorcę, problem, stan obecny, ograniczenia i wynik, który da się później ocenić."],
  ["02", "Architektura", "Projektujemy informację, ścieżki użytkownika, konwersję, widoczność, dane i granice techniczne przed budową interfejsu."],
  ["03", "Projekt i wdrożenie", "Budujemy interfejs i kod. Interakcje, 3D, AI i integracje trafiają do zakresu tylko wtedy, gdy mają konkretną pracę."],
  ["04", "Walidacja", "Sprawdzamy funkcje, urządzenia mobilne, dostępność, SEO/AEO/GEO, wydajność, bezpieczeństwo i publiczną zgodność informacji."],
  ["05", "Publikacja i rozwój", "Wydanie przechodzi Quality gates. Dalsze decyzje mają wynikać z rzeczywistych danych i zweryfikowanych potrzeb, nie z losowego dokładania funkcji."],
] as const;

export default function AboutPage() {
  return (
    <main id="main-content" className="about-page v14-route-page v14-about-page" tabIndex={-1}>
      <V14SiteHeader mode="static" />

      <section className="section-dark blueprint-surface">
        <div className="page-shell">
          <div className="portfolio-hero-copy section-pad">
            <p className="eyebrow">LEADFLOWAI / O NAS</p>
            <h1>Budujemy strony internetowe jako system: dla użytkownika, sprzedaży, Google i systemów AI.</h1>
            <p>
              LeadFlowAI jest marką {site.legalName}. Koncentrujemy się na projektowaniu i budowie nowoczesnych stron oraz systemów WWW, które łączą warstwę wizualną, techniczną, sprzedażową i architekturę widoczności.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="/realizacje">Zobacz realizacje <span aria-hidden="true">↗</span></a>
              <a className="text-link" href="/kontakt">Wyceń projekt <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-light">
        <div className="page-shell section-pad">
          <div className="service-section-head">
            <p className="service-index">01 / JAK MYŚLIMY O WWW</p>
            <h2>Technologia jest środkiem. Celem jest czytelna oferta, zaufanie, widoczność i działanie użytkownika.</h2>
          </div>
          <div className="outcome-grid">
            {principles.map(([index, title, description]) => (
              <article key={index}>
                <span>{index}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark service-deliverables">
        <div className="page-shell section-pad">
          <div className="service-section-head service-section-head-dark">
            <p className="service-index">02 / CO ŁĄCZYMY</p>
            <h2>Jedna realizacja może obejmować kilka specjalizacji, ale musi pozostawać jednym spójnym produktem.</h2>
          </div>
          <div className="portfolio-scope-grid">
            <article><span>01</span><h3>Strategia i treść</h3><p>Oferta, architektura informacji, odpowiedzi na pytania klientów i ścieżki do kontaktu.</p></article>
            <article><span>02</span><h3>Projekt i wdrożenie</h3><p>UX/UI, responsywność, interakcje, Next.js, WebGL i dedykowane komponenty tam, gdzie mają sens.</p></article>
            <article><span>03</span><h3>Widoczność</h3><p>SEO, AEO, GEO / AI Search, schema, canonicale, linkowanie i czytelne relacje encji.</p></article>
            <article><span>04</span><h3>Rozwój</h3><p>Analityka, CRO, integracje, automatyzacje, monitoring, utrzymanie i kolejne etapy produktu.</p></article>
          </div>
        </div>
      </section>

      <section className="section-light">
        <div className="page-shell section-pad">
          <div className="service-section-head">
            <p className="service-index">03 / METODOLOGIA LEADFLOW</p>
            <h2>Pięć etapów od problemu biznesowego do zweryfikowanego wydania.</h2>
            <p>To nazwa naszego rzeczywistego sposobu pracy, nie osobny produkt ani obietnica wyniku.</p>
          </div>
          <div className="deliverable-list">
            {methodology.map(([index, title, description]) => (
              <article key={index}>
                <span className="deliverable-index">{index}</span>
                <div><h3>{title}</h3><p>{description}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-light">
        <div className="page-shell section-pad">
          <div className="service-section-head">
            <p className="service-index">04 / PUBLICZNA PRAWDA</p>
            <h2>To, co publikuje strona, musi odpowiadać temu, co naprawdę istnieje.</h2>
          </div>
          <p>
            Dlatego projekty własne są oznaczone jako projekty własne, funkcje niegotowe publicznie pozostają wyłączone, a twierdzenia techniczne i biznesowe nie są wzmacniane fikcyjnymi liczbami. Ten sam standard stosujemy do treści usługowych, danych strukturalnych i materiałów wiedzy.
          </p>
        </div>
      </section>

      <section className="contact-section section-dark">
        <div className="page-shell contact-grid">
          <p className="section-label section-label-inverted"><span>05</span><span>LEADFLOWAI / KONTAKT</span></p>
          <div>
            <p className="contact-kicker">MASZ PROJEKT?</p>
            <h2>Opisz cel strony. Dobierzemy zakres do realnej pracy, którą ma wykonywać.</h2>
          </div>
          <div className="contact-actions">
            <a className="button button-primary button-large" href={`mailto:${site.email}`}>
              {site.email} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <V14SiteFooter />
    </main>
  );
}
