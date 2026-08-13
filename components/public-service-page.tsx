import { ServicePage } from "@/components/service-page";
import type { ServicePageData } from "@/lib/services";

export function PublicServicePage({ page }: { page: ServicePageData }) {
  return <ServicePage page={page} />;
}
