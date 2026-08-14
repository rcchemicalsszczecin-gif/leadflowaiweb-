const navItems = [
  { href: "/uslugi", label: "Usługi" },
  { href: "/realizacje", label: "Realizacje" },
  { href: "/#process", label: "Jak pracujemy" },
  { href: "/wiedza", label: "Wiedza" },
  { href: "/o-nas", label: "O nas" },
] as const;

type V14SiteHeaderProps = {
  mode?: "overlay" | "static";
  includeStyles?: boolean;
};

export function V14SiteHeader({ mode = "static", includeStyles = true }: V14SiteHeaderProps) {
  return (
    <>
      {includeStyles ? (
        <>
          <link rel="stylesheet" href="/v14.css" precedence="high" />
          <link rel="stylesheet" href="/v14-shell.css" precedence="high" />
          <link rel="stylesheet" href="/v14-content.css" precedence="high" />
        </>
      ) : null}
      <a className="v14-skip-link" href="#main-content">Przejdź do treści</a>
      <header className={`v14-header ${mode === "static" ? "v14-header-static" : ""}`}>
        <div className="v14-shell v14-header-inner">
          <a className="v14-brand" href="/" aria-label="LeadFlowAI — strona główna">
            <span className="v14-brand-mark" aria-hidden="true"><i /><i /></span>
            <span>LEADFLOWAI</span>
          </a>

          <nav className="v14-nav" aria-label="Główna nawigacja">
            {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
          </nav>

          <div className="v14-header-actions">
            <details className="v14-mobile-nav">
              <summary aria-label="Otwórz nawigację mobilną">
                <span>MENU</span><i aria-hidden="true" />
              </summary>
              <nav className="v14-mobile-nav-panel" aria-label="Nawigacja mobilna">
                {navItems.map((item, index) => (
                  <a key={item.href} href={item.href}>
                    <span>{item.label}</span><span aria-hidden="true">0{index + 1}</span>
                  </a>
                ))}
                <a href="/kontakt"><span>Wyceń projekt</span><span aria-hidden="true">↗</span></a>
              </nav>
            </details>
            <a className="v14-header-cta" href="/kontakt">Wyceń projekt <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </header>
    </>
  );
}
