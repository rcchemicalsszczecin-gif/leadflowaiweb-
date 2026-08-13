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
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Laboratorium — 3D, WebGL, motion i interaktywne WWW",
  description:
    "Laboratorium LeadFlowAI: działające w przeglądarce demonstracje 3D, interakcji, narracji przewijanej, UI, redesignu i architektury doświadczenia.",
  alternates: { canonical: "/lab" },
};

export default function LabPage() {
  return (
    <main className="lab-page">
      <div className="page-shell"><SiteHeader /></div>
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

      <div className="page-shell"><SiteFooter /></div>
    </main>
  );
}
