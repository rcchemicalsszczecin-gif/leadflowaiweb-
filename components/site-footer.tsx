import { experienceServiceLinks } from "@/lib/experience-services";
import { searchServiceLinks } from "@/lib/search-pages";
import { coreServiceLinks } from "@/lib/services";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <a className="brand footer-brand" href="/" aria-label="LeadFlowAI — strona główna">
          <span className="brand-mark" aria-hidden="true">
            L/
          </span>
          <span>LeadFlowAI</span>
        </a>
        <p className="footer-note">LeadFlowAI jest marką {site.legalName}</p>
        <p className="footer-note">Strony WWW · widoczność SEO/AEO/GEO · interakcje · systemy internetowe</p>
      </div>

      <div className="footer-meta">
        <nav className="footer-service-links" aria-label="Główne usługi LeadFlowAI">
          <a href="/uslugi">Wszystkie usługi</a>
          {[...coreServiceLinks, ...experienceServiceLinks, ...searchServiceLinks].map((item) => (
            <a key={item.slug} href={`/${item.slug}`}>
              {item.label}
            </a>
          ))}
          <a href="/lab">Demo możliwości</a>
        </nav>
        <nav className="footer-links" aria-label="Firma, wiedza i kontakt">
          <a href="/realizacje">Realizacje</a>
          <a href="/wiedza">Baza wiedzy</a>
          <a href="/o-nas">O LeadFlowAI</a>
          <a href="/kontakt">Kontakt</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <span>leadflowai.pl</span>
        </nav>
      </div>
    </footer>
  );
}
