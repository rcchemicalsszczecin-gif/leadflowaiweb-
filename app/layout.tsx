import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/json-ld";
import { WaterSurface } from "@/components/water-surface";
import { site } from "@/lib/site";
import { getGlobalStructuredData } from "@/lib/structured-data";
import "./globals.css";
import "./services.css";
import "./contact.css";
import "./knowledge.css";
import "./precision-water.css";
import "./circuit-water-v3.css";
import "./hardware-board-v4.css";

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
        <JsonLd data={getGlobalStructuredData()} />
        <WaterSurface />
        {children}
      </body>
    </html>
  );
}
