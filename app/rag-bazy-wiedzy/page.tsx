import { ServicePage } from "@/components/service-page";
import { getExtraServiceMetadata, getExtraServicePage } from "@/lib/extra-services";
import { withV13SocialMetadata } from "@/lib/social-metadata-v13";

const page = getExtraServicePage("rag-bazy-wiedzy");

export const metadata = withV13SocialMetadata(
  getExtraServiceMetadata("rag-bazy-wiedzy"),
  page.title,
  page.lead,
);

export default function RagBazyWiedzyPage() {
  return <ServicePage page={page} />;
}
