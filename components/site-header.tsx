import { navigation } from "@/lib/site";

const navigationPreview: Record<(typeof navigation)[number]["href"], readonly [string, string]> = {
  "/uslugi": ["OFERTA", "Pełny zakres usług"],
  "/realizacje": ["DOWODY", "Projekty własne i zakres"],
  "/wiedza": ["WIEDZA", "Praktyka WWW i widoczności"],
  "/o-nas": ["O NAS", "LeadFlowAI i Tervyxa Systems"],
  "/#process": ["PROCES", "Od strategii do publikacji"],
};

export function SiteHeader() {
  return (
    <header className="site-header site-header-v92">
      <a className="brand" href="/" aria-label="LeadFlowAI — strona główna">
        <span className="brand-mark" aria-hidden="true">
          L/
        </span>
        <span>LeadFlowAI</span>
      </a>

      <nav className="site-nav site-nav-v92" aria-label="Główna nawigacja">
        {navigation.map((item) => {
          const [code, note] = navigationPreview[item.href];
          return (
            <a key={item.href} href={item.href} className="site-nav-link-v92" data-cursor="OTWÓRZ">
              <span>{item.label}</span>
              <span className="nav-preview-v92" aria-hidden="true">
                <small>{code}</small>
                <strong>{note}</strong>
                <i />
              </span>
            </a>
          );
        })}
      </nav>

      <details className="mobile-nav-v10">
        <summary aria-label="Otwórz nawigację">
          <span>MENU</span>
          <i aria-hidden="true" />
        </summary>
        <nav className="mobile-nav-panel-v10" aria-label="Nawigacja mobilna">
          {navigation.map((item) => {
            const [code, note] = navigationPreview[item.href];
            return (
              <a key={item.href} href={item.href}>
                <small>{code}</small>
                <span>{item.label}</span>
                <em>{note}</em>
              </a>
            );
          })}
          <a className="mobile-nav-contact-v10" href="/kontakt">
            <small>KONTAKT</small>
            <span>Wyceń projekt</span>
            <em>Napisz bezpośrednio</em>
          </a>
        </nav>
      </details>

      <a className="button button-small button-ghost header-cta-v92" href="/kontakt" data-cursor="ZACZNIJ">
        Wyceń projekt
      </a>
    </header>
  );
}
