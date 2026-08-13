import { ServicePage } from "@/components/service-page";
import { getExperienceService, getExperienceServiceMetadata } from "@/lib/experience-services";

export const metadata = getExperienceServiceMetadata("chatboty-ai");

export default function ChatbotyAIPage() {
  return <ServicePage page={getExperienceService("chatboty-ai")} />;
}
