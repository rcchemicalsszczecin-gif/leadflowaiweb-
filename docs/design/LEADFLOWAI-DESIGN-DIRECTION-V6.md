# LeadFlowAI — Content Frames V6

STATUS: OWNER-APPROVED IMPLEMENTATION CANDIDATE
DATE: 2026-08-13

## Objective
Retain the approved Realistic Hardware Water V5 environment while rebuilding the foreground hierarchy so copy no longer floats directly over the hardware photograph.

## Locked visual rules
- V5 realistic motherboard photograph and interactive water behavior remain unchanged.
- Large decorative stage numbers such as oversized `01 / 02 / ...` are retired.
- Stage identity remains available as compact technical labels (`01 / CREATE`, `02 / DISCOVER`, etc.).
- Major homepage content groups use restrained technical frames instead of unbounded floating copy.
- Frames use thin low-contrast borders, small signal-green corner markers and dark translucent surfaces.
- Frames must not become large opaque slabs that hide the hardware environment.
- No bulk backdrop-filter is reintroduced.
- Headline scale is reduced and line-height relaxed compared with early production versions.
- Stage title and description are separated into a clear two-column hierarchy on desktop.
- Process and quality indexes are compact chips rather than decorative oversized numerals.
- Mobile collapses framed modules to a single column with smaller typography and preserved reading contrast.

## Homepage module grammar
1. Section label: compact mono index + LeadFlowAI label.
2. Framed module: title / supporting copy / tags or actions.
3. Technical corners: top-left signal marker and bottom-right blueprint marker.
4. Hardware remains visible around and between modules.

## Performance invariants
- No new animation loop.
- No new scroll listener.
- No new backdrop-filter on bulk cards.
- V5 WebGL ripple/FPS/DPR bounds remain authoritative.

## Accessibility
- Visual indexes are supplementary; semantic heading structure remains unchanged.
- Foreground text retains sufficient dark reading surface over the detailed photograph.
- Reduced-motion behavior remains inherited from V5.

## Supersession
V6 supersedes V5 only for foreground typography, section numbering and content framing. V5 remains authoritative for background realism, water interaction and rendering-performance architecture.
