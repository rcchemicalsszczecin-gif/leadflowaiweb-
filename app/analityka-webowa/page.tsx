import { ServicePage } from "@/components/service-page";
import { getExpandedServicePage } from "@/lib/expanded-services";
import { getExpandedServiceMetadata } from "@/lib/expanded-service-utils";

export const metadata = getExpandedServiceMetadata("analityka-webowa");
export default function Page() { return <ServicePage page={getExpandedServicePage("analityka-webowa")} />; }
