import { ServicePage } from "@/components/service-page";
import { getSearchMetadata, getSearchPage } from "@/lib/search-pages";

export const metadata = getSearchMetadata("seo-aeo-geo");

export default function SeoAeoGeoPage() {
  return <ServicePage page={getSearchPage("seo-aeo-geo")} />;
}
