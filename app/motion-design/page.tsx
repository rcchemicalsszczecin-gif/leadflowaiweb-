import { ServicePage } from "@/components/service-page";
import { getExperienceService, getExperienceServiceMetadata } from "@/lib/experience-services";

export const metadata = getExperienceServiceMetadata("motion-design");

export default function MotionDesignPage() {
  return <ServicePage page={getExperienceService("motion-design")} />;
}
