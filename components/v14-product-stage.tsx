import { V14BrowserMockup } from "@/components/v14-browser-mockup";
import { V14PhoneMockup } from "@/components/v14-phone-mockup";

export function V14ProductStage() {
  return (
    <>
      <link rel="stylesheet" href="/v14.css" precedence="high" />
      <link rel="stylesheet" href="/v14-base.css" precedence="high" />
      <div className="v14-product-stage">
        <div className="v14-stage-glow" aria-hidden="true" />
        <V14BrowserMockup />
        <V14PhoneMockup />
        <div className="v14-stage-hud"><small>LIQUID ENGINE</small><strong>SEARCH · UI · AI</strong></div>
      </div>
    </>
  );
}
