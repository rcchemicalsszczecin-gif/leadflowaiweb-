import { ServicePage } from "@/components/service-page";
import { getExperienceService, getExperienceServiceMetadata } from "@/lib/experience-services";

export const metadata = getExperienceServiceMetadata("strony-3d-webgl");

export default function Strony3DWebGLPage() {
  return <ServicePage page={getExperienceService("strony-3d-webgl")} />;
}
