import type { Metadata } from "next";
import { LeadForm } from "@/components/lead-form";
import { V14ContactBrief } from "@/components/v14-contact-brief";
import { V14SiteFooter } from "@/components/v14-site-footer";
import { V14SiteHeader } from "@/components/v14-site-header";
import { site } from "@/lib/site";
import { withV13SocialMetadata } from "@/lib/social-metadata-v13";

const pageTitle = "Kontakt i wycena strony internetowej";
const pageDescription =
  "Opisz projekt WWW, cel biznesowy i potrzebny zakres. LeadFlowAI pomoże uporządkować kierunek realizacji strony, sklepu, strony kampanijnej, modernizacji lub architektury widoczności SEO/AEO/GEO.";

export const metadata: Metadata = withV13SocialMetadata(
  {
    title: pageTitle,
    description: pageDescription,
    alternates: { canonical: "/kontakt" },
    openGraph: {
      type: "website",
      locale: "pl_PL",
      url: `${site.url}/kontakt/`,
      siteName: site.name,
    },
  },
  "Kontakt i wycena strony internetowej | LeadFlowAI",
  "Opisz projekt WWW i cel, który strona ma realizować.",
);

export default function KontaktPage() {
  return (
    <main id="main-content" className="contact-page v14-contact-page" tabIndex={-1}>
      <V14SiteHeader mode="static" />

      <section className="contact-hero section-dark blueprint-surface">
        <div className="page-shell">
          <div className="contact-hero-grid">
            <div>
              <p className="eyebrow">LEADFLOWAI / KONTAKT</p>
              <h1>Opisz stronę, która ma konkretną pracę do wykonania.</h1>
            </div>
            <div className="contact-hero-copy">
              <p>
                Nie potrzebujesz gotowej specyfikacji. Wystarczy cel, obecna sytuacja i zakres,
                który już znasz. Resztę możemy uporządkować razem przed rozpoczęciem realizacji.
              </p>
              <ul>
                <li>strony WWW / strony kampanijne / sklepy internetowe</li>
                <li>modernizacja / migracja</li>
                <li>SEO + AEO + GEO / widoczność w wyszukiwaniu AI</li>
                <li>chatboty / integracje WWW</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-light contact-form-section">
        <div className="page-shell section-pad contact-form-grid">
          <aside className="contact-aside">
            <p className="service-index">00 / KONTAKT</p>
            <h2>Krótki opis projektu wystarczy, żeby zacząć.</h2>
            <p>
              Kontakt służy wyłącznie do rozpoczęcia rozmowy o projekcie. Nie wysyłaj haseł,
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

      <V14ContactBrief />

      <section className="contact-next section-dark">
        <div className="page-shell contact-next-grid">
          <p className="section-label section-label-inverted"><span>03</span><span>LEADFLOWAI / CO DALEJ</span></p>
          <h2>Najpierw ustalamy cel, zakres i ryzyka. Dopiero potem dobieramy rozwiązanie.</h2>
          <p>
            Jeżeli projekt wymaga dodatkowych integracji, hostingu, dostępu do obecnej strony lub
            danych analitycznych, ustalamy to jako osobny bezpieczny etap — nie przez publiczną wiadomość.
          </p>
        </div>
      </section>

      <V14SiteFooter />
    </main>
  );
}
