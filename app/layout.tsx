import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/json-ld";
import { SiteAssistant } from "@/components/site-assistant";
import { site } from "@/lib/site";
import { getGlobalStructuredData } from "@/lib/structured-data";
import "./globals.css";
import "./services.css";
import "./contact.css";
import "./chat.css";
import "./knowledge.css";

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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f1eb" },
    { media: "(prefers-color-scheme: dark)", color: "#080b0f" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pl">
      <body>
        <JsonLd data={getGlobalStructuredData()} />
        {children}
        <SiteAssistant />
      </body>
    </html>
  );
}
