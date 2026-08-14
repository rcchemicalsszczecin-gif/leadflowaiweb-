import { ServicePage } from "@/components/service-page";
import { getExperienceService, getExperienceServiceMetadata } from "@/lib/experience-services";
import { withV13SocialMetadata } from "@/lib/social-metadata-v13";

const page = getExperienceService("strony-3d-webgl");

export const metadata = withV13SocialMetadata(
  getExperienceServiceMetadata("strony-3d-webgl"),
  page.title,
  page.lead,
);

export default function Strony3DWebGLPage() {
  return <ServicePage page={page} />;
}
