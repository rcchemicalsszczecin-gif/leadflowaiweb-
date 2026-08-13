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
        <p className="footer-note">Marka {site.legalName}</p>
      </div>

      <div className="footer-meta">
        <nav className="footer-service-links" aria-label="Główne usługi LeadFlowAI">
          <a href="/uslugi">Pełna oferta</a>
          {[...coreServiceLinks, ...experienceServiceLinks, ...searchServiceLinks].map((item) => (
            <a key={item.slug} href={`/${item.slug}`}>
              {item.label}
            </a>
          ))}
          <a href="/lab">Live Lab</a>
          <a href="/realizacje">Realizacje</a>
          <a href="/wiedza">Wiedza</a>
        </nav>
        <nav className="footer-links" aria-label="Kontakt i informacje">
          <a href="/kontakt">Kontakt</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <span>leadflowai.pl</span>
        </nav>
      </div>
    </footer>
  );
}
