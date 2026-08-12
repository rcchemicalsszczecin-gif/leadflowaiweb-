import { ServicePage } from "@/components/service-page";
import { getSearchMetadata, getSearchPage } from "@/lib/search-pages";

export const metadata = getSearchMetadata("local-seo");

export default function LocalSeoPage() {
  return <ServicePage page={getSearchPage("local-seo")} />;
}
