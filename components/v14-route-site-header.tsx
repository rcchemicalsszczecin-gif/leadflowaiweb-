import { V14SiteHeader } from "@/components/v14-site-header";

export function V14RouteSiteHeader() {
  return (
    <>
      <link rel="stylesheet" href="/v14-legacy-routes.css" precedence="high" />
      <link rel="stylesheet" href="/v14.css" precedence="high" />
      <link rel="stylesheet" href="/v14-shell.css" precedence="high" />
      <link rel="stylesheet" href="/v14-content.css" precedence="high" />
      <link rel="stylesheet" href="/v14-routes.css" precedence="high" />
      <V14SiteHeader mode="static" />
    </>
  );
}
