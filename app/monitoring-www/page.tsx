import { ServicePage } from "@/components/service-page";
import { getExtraServiceMetadata, getExtraServicePage } from "@/lib/extra-services";

export const metadata = getExtraServiceMetadata("monitoring-www");

export default function MonitoringWwwPage() { return <ServicePage page={getExtraServicePage("monitoring-www")} />; }
