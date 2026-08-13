import { ServicePage } from "@/components/service-page";
import { getExperienceService, getExperienceServiceMetadata } from "@/lib/experience-services";

export const metadata = getExperienceServiceMetadata("interaktywne-strony");

export default function InteraktywneStronyPage() {
  return <ServicePage page={getExperienceService("interaktywne-strony")} />;
}
