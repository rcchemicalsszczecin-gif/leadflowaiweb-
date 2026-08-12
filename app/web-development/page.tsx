import { ServicePage } from "@/components/service-page";
import { getServiceMetadata, getServicePage } from "@/lib/services";

export const metadata = getServiceMetadata("web-development");

export default function WebDevelopmentPage() {
  return <ServicePage page={getServicePage("web-development")} />;
}
