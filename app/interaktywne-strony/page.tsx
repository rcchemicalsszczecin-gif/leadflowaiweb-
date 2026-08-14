import { ServicePage } from "@/components/service-page";
import { getExperienceService, getExperienceServiceMetadata } from "@/lib/experience-services";
import { withV13SocialMetadata } from "@/lib/social-metadata-v13";

const page = getExperienceService("interaktywne-strony");

export const metadata = withV13SocialMetadata(
  getExperienceServiceMetadata("interaktywne-strony"),
  page.title,
  page.lead,
);

export default function InteraktywneStronyPage() {
  return <ServicePage page={page} />;
}
