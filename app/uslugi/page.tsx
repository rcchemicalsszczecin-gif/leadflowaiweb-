import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { experienceServiceLinks } from "@/lib/experience-services";
import { expandedServiceLinks } from "@/lib/expanded-services";
import { extraServiceLinks } from "@/lib/extra-services";
import { searchServiceLinks } from "@/lib/search-pages";
import { coreServiceLinks } from "@/lib/services";

export const metadata: Metadata = {
  title: "Usługi LeadFlowAI — strony, AI, widoczność, konwersja i utrzymanie",
  description:
    "Pełny katalog usług LeadFlowAI: strony i aplikacje webowe, 3D/WebGL, SEO/AEO/GEO, CRO, analityka, AI, RAG, agenci, integracje, automatyzacje, WCAG, performance, bezpieczeństwo, monitoring i utrzymanie.",
  alternates: { canonical: "/uslugi" },
};

const pillars = [
  { key: "CREATE", title: "Tworzenie i rozwój produktów webowych", description: "Od architektury i UX/UI przez strony, e-commerce, aplikacje, CMS, PWA i doświadczenia interaktywne." },
  { key: "DISCOVER", title: "Widoczność i architektura informacji", description: "SEO, AEO, GEO / AI Search, local SEO i treść źródłowa projektowane jako jeden system informacji." },
  { key: "CONVERT", title: "Konwersja i pomiar", description: "Landing pages, CRO, formularze, lead generation i analityka połączone z rzeczywistym celem biznesowym." },
  { key: "INTELLIGENCE", title: "Inteligencja", description: "Chatboty, RAG, agenci i integracje AI z jasno określoną rolą, źródłami wiedzy, guardrails i fallbackiem." },
  { key: "CONNECT", title: "Integracje i automatyzacje", description: "API, webhooki, CRM, kalendarze i workflow łączące stronę z dalszym procesem firmy." },
  { key: "CARE", title: "Jakość, bezpieczeństwo i utrzymanie", description: "Core Web Vitals, WCAG, security, hosting, deployment, monitoring i dalszy rozwój." },
] as const;

export default function UslugiPage() {
  const all = [
    ...coreServiceLinks.map((item) => ({ ...item, pillar: item.slug === "landing-pages" ? "CONVERT" : "CREATE" })),
    ...experienceServiceLinks.map((item) => ({ ...item, pillar: item.slug === "chatboty-ai" ? "INTELLIGENCE" : "CREATE" })),
    ...searchServiceLinks.map((item) => ({ ...item, pillar: "DISCOVER" })),
    ...expandedServiceLinks,
    ...extraServiceLinks,
  ];

  return (
    <main className="service-page">
      <section className="service-hero section-dark blueprint-surface">
        <div className="page-shell">
          <SiteHeader />
          <div className="service-hero-grid">
            <div className="service-hero-copy">
              <p className="eyebrow">LEADFLOWAI / PEŁNA OFERTA</p>
              <h1>Budujemy cały system wokół obecności firmy w internecie.</h1>
              <p className="service-lead">
                Nie ograniczamy się do wykonania strony. Możemy zaprojektować produkt, widoczność, konwersję, AI, integracje i warstwę utrzymania jako jeden spójny system albo wejść tylko w potrzebny moduł.
              </p>
            </div>
          </div>
        </div>
      </section>

      {pillars.map((pillar, index) => {
        const items = all.filter((item) => item.pillar === pillar.key);
        return (
          <section key={pillar.key} className={index % 2 === 0 ? "section-light service-outcomes" : "section-dark service-deliverables"}>
            <div className="page-shell section-pad">
              <div className={index % 2 === 0 ? "service-section-head" : "service-section-head service-section-head-dark"}>
                <p className="service-index">{String(index + 1).padStart(2, "0")} / {pillar.key}</p>
                <h2>{pillar.title}</h2>
                <p>{pillar.description}</p>
              </div>
              <nav className="related-grid" aria-label={`Usługi: ${pillar.title}`}>
                {items.map((item) => (
                  <a key={item.slug} href={`/${item.slug}`}>
                    <span>{pillar.key}</span>
                    <strong>{item.label}</strong>
                    <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </nav>
            </div>
          </section>
        );
      })}

      <section className="section-dark portfolio-method">
        <div className="page-shell section-pad">
          <p className="service-index">07 / ZAKRES</p>
          <h2>Zakres dobieramy do problemu. Nie trzeba kupować całego systemu naraz.</h2>
          <p>
            Nowa strona może zacząć się od architektury i developmentu. Istniejący serwis może potrzebować tylko audytu, CRO, performance, WCAG, SEO/AEO/GEO, RAG, integracji albo monitoringu. Moduły są projektowane tak, aby mogły później tworzyć większy system bez przepisywania wszystkiego od początku.
          </p>
        </div>
        <div className="page-shell"><SiteFooter /></div>
      </section>
    </main>
  );
}
