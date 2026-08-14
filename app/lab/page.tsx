import type { Metadata } from "next";
import {
  BeforeAfterDemo,
  BrowserDemo,
  CapabilityConstellation,
  InteractiveServiceCards,
  Live3DShowcase,
  ProjectCommandCenter,
  SignalDivider,
  SystemAssembly,
} from "@/components/interactive-experience";
import { V14SiteFooter } from "@/components/v14-site-footer";
import { V14SiteHeader } from "@/components/v14-site-header";

export const metadata: Metadata = {
  title: "Laboratorium — 3D, WebGL, ruch i interaktywne WWW",
  description:
    "Laboratorium LeadFlowAI: działające w przeglądarce demonstracje 3D, interakcji, narracji przewijanej, UI, przebudowy stron i architektury doświadczenia.",
  alternates: { canonical: "/lab" },
};

export default function LabPage() {
  return (
    <main id="main-content" className="lab-page v14-route-page v14-lab-page" tabIndex={-1}>
      <V14SiteHeader mode="static" />

      <header className="lab-hero">
        <p className="experience-kicker">LEADFLOWAI / LABORATORIUM</p>
        <h1>Nie slajdy. Działające doświadczenia.</h1>
        <p>
          Ta przestrzeń jest demonstracją możliwości frontendowych LeadFlowAI. Moduły poniżej są
          prawdziwym kodem uruchomionym w przeglądarce. Nie są przedstawiane jako realizacje
          klientów.
        </p>
      </header>

      <SignalDivider label="LABORATORIUM / 3D" />
      <Live3DShowcase />
      <InteractiveServiceCards />
      <SignalDivider label="LABORATORIUM / SYSTEM PRZEWIJANIA" />
      <SystemAssembly />
      <BrowserDemo />
      <BeforeAfterDemo />
      <CapabilityConstellation />
      <ProjectCommandCenter />

      <V14SiteFooter />
    </main>
  );
}
