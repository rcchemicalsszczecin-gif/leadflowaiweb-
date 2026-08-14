import { ServicePage } from "@/components/service-page";
import { getExperienceService, getExperienceServiceMetadata } from "@/lib/experience-services";
import { withV13SocialMetadata } from "@/lib/social-metadata-v13";

const page = getExperienceService("motion-design");

export const metadata = withV13SocialMetadata(
  getExperienceServiceMetadata("motion-design"),
  page.title,
  page.lead,
);

export default function MotionDesignPage() {
  return <ServicePage page={page} />;
}
