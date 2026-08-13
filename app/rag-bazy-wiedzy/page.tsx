import { ServicePage } from "@/components/service-page";
import { getExtraServiceMetadata, getExtraServicePage } from "@/lib/extra-services";

export const metadata = getExtraServiceMetadata("rag-bazy-wiedzy");

export default function RagBazyWiedzyPage() { return <ServicePage page={getExtraServicePage("rag-bazy-wiedzy")} />; }
