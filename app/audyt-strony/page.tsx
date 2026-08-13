import { ServicePage } from "@/components/service-page";
import { getServiceMetadata, getServicePage } from "@/lib/services";

export const metadata = getServiceMetadata("audyt-strony");

export default function AudytStronyPage() {
  return <ServicePage page={getServicePage("audyt-strony")} />;
}
