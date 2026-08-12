import { ServicePage } from "@/components/service-page";
import { getServiceMetadata, getServicePage } from "@/lib/services";

export const metadata = getServiceMetadata("strony-internetowe");

export default function StronyInternetowePage() {
  return <ServicePage page={getServicePage("strony-internetowe")} />;
}
