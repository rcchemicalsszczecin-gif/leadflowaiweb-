import { ServicePage } from "@/components/service-page";
import { getSearchMetadata, getSearchPage } from "@/lib/search-pages";

export const metadata = getSearchMetadata("aeo");

export default function AeoPage() {
  return <ServicePage page={getSearchPage("aeo")} />;
}
