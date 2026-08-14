import { ServicePage } from "@/components/service-page";
import { getExtraServiceMetadata, getExtraServicePage } from "@/lib/extra-services";
import { withV13SocialMetadata } from "@/lib/social-metadata-v13";

const page = getExtraServicePage("agenci-ai-www");

export const metadata = withV13SocialMetadata(
  getExtraServiceMetadata("agenci-ai-www"),
  page.title,
  page.lead,
);

export default function AgenciAiWwwPage() {
  return <ServicePage page={page} />;
}
