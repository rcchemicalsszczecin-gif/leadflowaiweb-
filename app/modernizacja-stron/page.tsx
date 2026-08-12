import { ServicePage } from "@/components/service-page";
import { getServiceMetadata, getServicePage } from "@/lib/services";

export const metadata = getServiceMetadata("modernizacja-stron");

export default function ModernizacjaStronPage() {
  return <ServicePage page={getServicePage("modernizacja-stron")} />;
}
