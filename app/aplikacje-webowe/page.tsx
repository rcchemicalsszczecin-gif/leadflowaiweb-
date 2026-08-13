import { PublicServicePage } from "@/components/public-service-page";
import { getExpandedServicePage } from "@/lib/expanded-services";
import { getExpandedServiceMetadata } from "@/lib/expanded-service-utils";

export const metadata = getExpandedServiceMetadata("aplikacje-webowe");
export default function Page() { return <PublicServicePage page={getExpandedServicePage("aplikacje-webowe")} />; }
