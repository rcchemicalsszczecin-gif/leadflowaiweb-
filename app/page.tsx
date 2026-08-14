import { V14DeviceTheater } from "@/components/v14-device-theater";
import { V14Hero } from "@/components/v14-hero";
import { V14LiquidConstructor } from "@/components/v14-liquid-constructor";
import { V14Services } from "@/components/v14-services";

export default function HomePage() {
  return (
    <main className="v14-page">
      <V14Hero />
      <V14Services />
      <V14DeviceTheater />
      <V14LiquidConstructor />
    </main>
  );
}
