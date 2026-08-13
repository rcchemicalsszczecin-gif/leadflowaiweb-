import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/service-page";
import {
  extendedServicePages,
  getExtendedServiceMetadata,
  getExtendedServicePage,
} from "@/lib/extended-services";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(extendedServicePages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return getExtendedServiceMetadata(slug);
}

export default async function ExtendedServiceRoute({ params }: PageProps) {
  const { slug } = await params;
  const page = getExtendedServicePage(slug);
  if (!page) notFound();
  return <ServicePage page={page} />;
}
