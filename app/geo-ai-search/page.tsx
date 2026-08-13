import { ServicePage } from "@/components/service-page";
import { getSearchMetadata, getSearchPage } from "@/lib/search-pages";

export const metadata = getSearchMetadata("geo-ai-search");

export default function GeoAiSearchPage() {
  return <ServicePage page={getSearchPage("geo-ai-search")} />;
}
