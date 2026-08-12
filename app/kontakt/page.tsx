import type { Metadata } from "next";
import { LeadForm } from "@/components/lead-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt i wycena strony",
  description:
    "Opisz projekt WWW, cel biznesowy i potrzebny zakres. LeadFlowAI przygotuje właściwy kierunek realizacji strony, sklepu, landing page, modernizacji lub search architecture.",
  alternates: { canonical: "/kontakt" },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: `${site.url}/kontakt`,
    siteName: site.name,
    title: "Kontakt i wycena strony | LeadFlowAI",
    description: "Opisz projekt WWW i cel, który strona ma realizować.",
  },
};

export default function KontaktPage() {
  return (
    <main className="contact-page">
      <section className="contact-hero section-dark blueprint-surface">
        <div className="page-shell">
          <SiteHeader />
          <div className="contact-hero-grid">
            <div>
              <p className="eyebrow">LEADFLOWAI / KONTAKT</p>
              <h1>Opisz stronę, która ma konkretną pracę do wykonania.</h1>
            </div>
            <div className="contact-hero-copy">
              <p>
                Nie potrzebujesz gotowej specyfikacji. Wystarczy cel, obecna sytuacja i zakres,
                który już znasz. Resztę możemy uporządkować w procesie.
              </p>
              <ul>
                <li>WWW / landing pages / e-commerce</li>
                <li>modernizacja / migracja</li>
                <li>SEO + AEO + GEO / AI Search</li>
                <li>chatboty / integracje WWW</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-light contact-form-section">
        <div className="page-shell section-pad contact-form-grid">
          <aside className="contact-aside">
            <p className="service-index">00 / BRIEF</p>
            <h2>Krótki brief wystarczy, żeby zacząć.</h2>
            <p>
              Formularz służy wyłącznie do rozpoczęcia rozmowy o projekcie. Nie wpisuj haseł,
              danych kart płatniczych ani innych poufnych sekretów technicznych.
            </p>
            <div className="contact-direct">
              <span>BEZPOŚREDNI KONTAKT</span>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <small>LeadFlowAI — marka {site.legalName}</small>
            </div>
          </aside>
          <LeadForm />
        </div>
      </section>

      <section className="contact-next section-dark">
        <div className="page-shell contact-next-grid">
          <p className="section-label section-label-inverted"><span>03</span><span>LEADFLOWAI / NEXT</span></p>
          <h2>Po zapytaniu najpierw ustalamy zakres i ryzyka. Dopiero potem rozwiązanie.</h2>
          <p>
            Jeżeli projekt wymaga dodatkowych integracji, hostingu, dostępu do obecnej strony lub
            danych analitycznych, ustalamy to jako osobny bezpieczny etap — nie przez publiczny formularz.
          </p>
        </div>
        <div className="page-shell">
          <SiteFooter />
        </div>
      </section>
    </main>
  );
}
