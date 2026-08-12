import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <a className="brand footer-brand" href="#top" aria-label="LeadFlowAI — wróć na początek">
          <span className="brand-mark" aria-hidden="true">
            L/
          </span>
          <span>LeadFlowAI</span>
        </a>
        <p className="footer-note">Marka {site.legalName}</p>
      </div>

      <nav className="footer-links" aria-label="Kontakt i informacje">
        <a href={`mailto:${site.email}`}>{site.email}</a>
        <span>leadflowai.pl</span>
      </nav>
    </footer>
  );
}
