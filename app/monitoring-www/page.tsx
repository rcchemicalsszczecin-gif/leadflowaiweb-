import { ServicePage } from "@/components/service-page";
import { getExtraServiceMetadata, getExtraServicePage } from "@/lib/extra-services";
import { withV13SocialMetadata } from "@/lib/social-metadata-v13";

const page = getExtraServicePage("monitoring-www");

export const metadata = withV13SocialMetadata(
  getExtraServiceMetadata("monitoring-www"),
  page.title,
  page.lead,
);

export default function MonitoringWwwPage() {
  return <ServicePage page={page} />;
}
