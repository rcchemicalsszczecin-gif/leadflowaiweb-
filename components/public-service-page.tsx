import { ServicePage } from "@/components/service-page";
import { toPublicServicePage } from "@/lib/public-service-page";
import type { ServicePageData } from "@/lib/services";

export function PublicServicePage({ page }: { page: ServicePageData }) {
  return <ServicePage page={toPublicServicePage(page)} />;
}
