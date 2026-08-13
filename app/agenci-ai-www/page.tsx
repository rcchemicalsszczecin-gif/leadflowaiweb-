import { ServicePage } from "@/components/service-page";
import { getExtraServiceMetadata, getExtraServicePage } from "@/lib/extra-services";

export const metadata = getExtraServiceMetadata("agenci-ai-www");

export default function AgenciAiWwwPage() { return <ServicePage page={getExtraServicePage("agenci-ai-www")} />; }
