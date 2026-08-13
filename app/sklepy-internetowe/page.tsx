import { ServicePage } from "@/components/service-page";
import { getServiceMetadata, getServicePage } from "@/lib/services";

export const metadata = getServiceMetadata("sklepy-internetowe");

export default function SklepyInternetowePage() {
  return <ServicePage page={getServicePage("sklepy-internetowe")} />;
}
