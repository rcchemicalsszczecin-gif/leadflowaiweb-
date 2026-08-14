import { ServicePage } from "@/components/service-page";
import { getExperienceService, getExperienceServiceMetadata } from "@/lib/experience-services";
import { withV13SocialMetadata } from "@/lib/social-metadata-v13";

const page = getExperienceService("chatboty-ai");

export const metadata = withV13SocialMetadata(
  getExperienceServiceMetadata("chatboty-ai"),
  page.title,
  page.lead,
);

export default function ChatbotyAIPage() {
  return <ServicePage page={page} />;
}
