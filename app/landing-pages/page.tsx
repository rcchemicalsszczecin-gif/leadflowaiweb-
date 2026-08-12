import { ServicePage } from "@/components/service-page";
import { getServiceMetadata, getServicePage } from "@/lib/services";

export const metadata = getServiceMetadata("landing-pages");

export default function LandingPagesPage() {
  return <ServicePage page={getServicePage("landing-pages")} />;
}
