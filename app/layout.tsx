import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://leadflowai.pl"),
  title: {
    default: "Averiq — profesjonalne strony internetowe",
    template: "%s | Averiq",
  },
  description:
    "Averiq projektuje i buduje profesjonalne strony internetowe z SEO, AEO, GEO / AI Search, CRO i inteligentnymi funkcjami WWW.",
  applicationName: "Averiq",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
