import { PublicServicePage } from "@/components/public-service-page";
import { getExpandedServicePage } from "@/lib/expanded-services";
import { getExpandedServiceMetadata } from "@/lib/expanded-service-utils";

export const metadata = {
  ...getExpandedServiceMetadata("copywriting-content"),
  title: "Copywriting i content dla stron — SEO, oferta i konwersja",
};

export default function Page() {
  return <PublicServicePage page={getExpandedServicePage("copywriting-content")} />;
}
