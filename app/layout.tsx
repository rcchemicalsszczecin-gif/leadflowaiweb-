import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/json-ld";
import { V14GlobalTechHeroGuard } from "@/components/v14-global-tech-hero-guard";
import { V14GlobalTechLiquid } from "@/components/v14-global-tech-liquid";
import { site } from "@/lib/site";
import { getGlobalStructuredData } from "@/lib/structured-data";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "LeadFlowAI — profesjonalne strony internetowe",
    template: "%s | LeadFlowAI",
  },
  description: site.description,
  applicationName: site.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: site.url,
    siteName: site.name,
    title: "LeadFlowAI — strony internetowe zaprojektowane do wzrostu",
    description: site.description,
    images: [
      {
        url: "/og-leadflowai.svg",
        width: 1200,
        height: 630,
        alt: "LeadFlowAI — strony internetowe, SEO, AEO i GEO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LeadFlowAI — strony internetowe zaprojektowane do wzrostu",
    description: site.description,
    images: ["/og-leadflowai.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#03070c",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pl">
      <body>
        <link rel="stylesheet" href="/v14-global-tech-world.css" precedence="high" />
        <V14GlobalTechLiquid />
        <V14GlobalTechHeroGuard />
        <JsonLd data={getGlobalStructuredData()} />
        {children}
      </body>
    </html>
  );
}
