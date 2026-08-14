import { site } from "@/lib/site";

export function V14SiteFooter() {
  return (
    <footer className="v14-route-footer">
      <div className="v14-shell v14-route-footer-grid">
        <div>
          <a className="v14-brand" href="/" aria-label="LeadFlowAI — strona główna">
            <span className="v14-brand-mark" aria-hidden="true"><i /><i /></span>
            <span>LEADFLOWAI</span>
          </a>
          <p>LeadFlowAI jest marką {site.legalName}</p>
          <small>Strony WWW · SEO/AEO/GEO · AI · integracje · opieka</small>
        </div>

        <nav aria-label="Usługi i wiedza">
          <a href="/uslugi">Usługi</a>
          <a href="/realizacje">Realizacje</a>
          <a href="/wiedza">Wiedza</a>
          <a href="/lab">Demo</a>
        </nav>

        <nav aria-label="Firma i kontakt">
          <a href="/o-nas">O nas</a>
          <a href="/kontakt">Kontakt</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <span>leadflowai.pl</span>
        </nav>
      </div>
    </footer>
  );
}
