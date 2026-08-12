import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <a className="brand footer-brand" href="#top" aria-label="Averiq — wróć na początek">
          <span className="brand-mark" aria-hidden="true">
            A/
          </span>
          <span>Averiq</span>
        </a>
        <p className="footer-note">Marka {site.legalName}</p>
      </div>

      <div className="footer-links" aria-label="Kontakt i informacje">
        <a href={`mailto:${site.email}`}>{site.email}</a>
        <span>leadflowai.pl</span>
      </div>
    </footer>
  );
}
