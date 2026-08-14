import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/lib/site";
import { getGlobalStructuredData } from "@/lib/structured-data";
import "./globals.css";
import "./services.css";
import "./contact.css";
import "./knowledge.css";
import "./precision-water.css";
import "./circuit-water-v3.css";
import "./hardware-board-v4.css";
import "./realistic-board-v5.css";
import "./content-frames-v6.css";
import "./interactive-v7.css";
import "./v13-visual-authority.css";
import "./v13-search-education.css";

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
        <JsonLd data={getGlobalStructuredData()} />
        {children}
      </body>
    </html>
  );
}
