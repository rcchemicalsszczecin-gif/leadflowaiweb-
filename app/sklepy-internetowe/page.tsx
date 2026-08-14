import { ServicePage } from "@/components/service-page";
import { getServiceMetadata, getServicePage } from "@/lib/services";
import { withV13SocialMetadata } from "@/lib/social-metadata-v13";

const page = getServicePage("sklepy-internetowe");

export const metadata = withV13SocialMetadata(
  getServiceMetadata("sklepy-internetowe"),
  page.title,
  page.lead,
);

export default function SklepyInternetowePage() {
  return <ServicePage page={page} />;
}
