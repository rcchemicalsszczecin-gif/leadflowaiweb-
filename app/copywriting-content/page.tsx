import { ServicePage } from "@/components/service-page";
import { getExpandedServicePage } from "@/lib/expanded-services";
import { getExpandedServiceMetadata } from "@/lib/expanded-service-utils";

export const metadata = getExpandedServiceMetadata("copywriting-content");
export default function Page() { return <ServicePage page={getExpandedServicePage("copywriting-content")} />; }
