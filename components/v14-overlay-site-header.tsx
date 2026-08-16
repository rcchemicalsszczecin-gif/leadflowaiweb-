import { HeaderBrandIdentity } from "@/components/brand-identity";
import { V14SiteNavigation } from "@/components/v14-site-navigation";

export function V14OverlaySiteHeader() {
  return (
    <>
      <link rel="stylesheet" href="/v14-option-a.css" precedence="high" />
      <a className="v14-skip-link" href="#main-content">Przejdź do treści</a>
      <header className="v14-header">
        <div className="v14-shell v14-header-inner">
          <HeaderBrandIdentity />
          <V14SiteNavigation />
        </div>
      </header>
    </>
  );
}
