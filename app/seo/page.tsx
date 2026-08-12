import { ServicePage } from "@/components/service-page";
import { getSearchMetadata, getSearchPage } from "@/lib/search-pages";

export const metadata = getSearchMetadata("seo");

export default function SeoPage() {
  return <ServicePage page={getSearchPage("seo")} />;
}
