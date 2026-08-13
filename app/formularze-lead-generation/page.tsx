import { PublicServicePage } from "@/components/public-service-page";
import { getExpandedServicePage } from "@/lib/expanded-services";
import { getExpandedServiceMetadata } from "@/lib/expanded-service-utils";

export const metadata = getExpandedServiceMetadata("formularze-lead-generation");
export default function Page() { return <PublicServicePage page={getExpandedServicePage("formularze-lead-generation")} />; }
