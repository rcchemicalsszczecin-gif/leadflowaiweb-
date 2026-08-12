import { navigation } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="LeadFlowAI — strona główna">
        <span className="brand-mark" aria-hidden="true">
          L/
        </span>
        <span>LeadFlowAI</span>
      </a>

      <nav className="site-nav" aria-label="Główna nawigacja">
        {navigation.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <a className="button button-small button-ghost" href="#contact">
        Wycena strony
      </a>
    </header>
  );
}
