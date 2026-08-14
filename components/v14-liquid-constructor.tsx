import type { CSSProperties } from "react";

const layerBase: CSSProperties = {
  position: "absolute",
  left: "8%",
  width: "84%",
  border: "1px solid rgba(199,255,47,.22)",
  borderRadius: 18,
  background: "rgba(10,15,17,.82)",
  boxShadow: "0 28px 70px rgba(0,0,0,.28)",
  transformStyle: "preserve-3d",
};

export function V14LiquidConstructor() {
  return (
    <section className="v14-foundation" aria-labelledby="v14-liquid-title" style={{ background: "rgba(4,9,12,.78)", color: "#f5f7f2" }}>
      <style>{`body:has(.v14-page) .realistic-board-photo{background:#03070c;background-image:none;transform:none}body:has(.v14-page) .circuit-water-glass{background:linear-gradient(180deg,rgba(2,7,10,.02),rgba(2,7,10,.12))}`}</style>
      <div className="v14-shell" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))", gap: 64, alignItems: "center" }}>
        <div>
          <p style={{ margin: 0, fontSize: 11, letterSpacing: ".16em", color: "#9ba39a" }}>03 / LIQUID WEB CONSTRUCTOR</p>
          <h2 id="v14-liquid-title" style={{ maxWidth: 720, margin: "18px 0 24px", fontSize: "clamp(42px,5vw,72px)", lineHeight: .98, letterSpacing: "-.06em" }}>Z płynnej powierzchni do kompletnego produktu WWW.</h2>
          <p style={{ maxWidth: 610, margin: 0, fontSize: 17, lineHeight: 1.68, color: "#aeb5ad" }}>Liquid Engine nie jest już tapetą. Staje się początkiem systemu: powierzchnia odsłania grid, grid buduje interfejs, a nad produktem pojawiają się warstwy Search i AI.</p>
          <ol style={{ listStyle: "none", padding: 0, margin: "34px 0 0", display: "grid", gap: 10 }}>
            {[["01","LIQUID","signature interaction"],["02","GRID","architektura informacji"],["03","PRODUCT UI","interfejs i komponenty"],["04","SEARCH","SEO · AEO · GEO"],["05","AI","RAG · encje · integracje"]].map(([n,title,copy]) => (
              <li key={n} style={{ display: "grid", gridTemplateColumns: "38px 1fr auto", gap: 12, alignItems: "center", padding: "11px 0", borderTop: "1px solid rgba(255,255,255,.1)" }}><span style={{ color: "#c7ff2f", fontSize: 10 }}>{n}</span><strong style={{ fontSize: 13 }}>{title}</strong><small style={{ color: "#788178", fontSize: 10 }}>{copy}</small></li>
            ))}
          </ol>
        </div>

        <figure style={{ position: "relative", minHeight: 560, margin: 0, perspective: 1500 }}>
          <svg viewBox="0 0 700 560" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <defs><radialGradient id="liquidGlow"><stop offset="0" stopColor="#c7ff2f" stopOpacity=".2"/><stop offset="1" stopColor="#c7ff2f" stopOpacity="0"/></radialGradient></defs>
            <ellipse cx="350" cy="430" rx="300" ry="104" fill="url(#liquidGlow)"/>
            <ellipse cx="350" cy="430" rx="250" ry="72" fill="none" stroke="#c7ff2f" strokeOpacity=".28"/>
            <ellipse cx="350" cy="430" rx="170" ry="48" fill="none" stroke="#c7ff2f" strokeOpacity=".15"/>
            <path d="M80 430 Q180 380 280 428 T480 426 T640 430" fill="none" stroke="#c7ff2f" strokeOpacity=".2"/>
          </svg>
          <div style={{ ...layerBase, bottom: 58, height: 92, transform: "rotateX(68deg) translateZ(-70px)", background: "repeating-linear-gradient(90deg,rgba(199,255,47,.08) 0 1px,transparent 1px 38px),repeating-linear-gradient(0deg,rgba(199,255,47,.08) 0 1px,transparent 1px 38px)" }}><span style={{ position: "absolute", left: 16, top: 12, fontSize: 9, color: "#c7ff2f" }}>02 / GRID</span></div>
          <div style={{ ...layerBase, bottom: 150, height: 210, transform: "rotateX(5deg) translateZ(20px)", padding: 18 }}>
            <div style={{ display: "flex", gap: 6, alignItems: "center", borderBottom: "1px solid rgba(255,255,255,.1)", paddingBottom: 12 }}><i style={{ width: 7, height: 7, borderRadius: "50%", background: "#c7ff2f" }}/><small style={{ marginLeft: 8, color: "#768078" }}>leadflowai / product-ui</small></div>
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr .8fr", gap: 14, paddingTop: 20 }}><div><small style={{ color: "#c7ff2f" }}>03 / PRODUCT UI</small><strong style={{ display: "block", marginTop: 10, fontSize: 26, letterSpacing: "-.04em" }}>Interfejs gotowy do działania.</strong><span style={{ display: "block", width: "74%", height: 9, marginTop: 22, borderRadius: 99, background: "rgba(255,255,255,.1)" }}/><span style={{ display: "block", width: "52%", height: 9, marginTop: 9, borderRadius: 99, background: "rgba(255,255,255,.07)" }}/></div><div style={{ borderRadius: 14, border: "1px solid rgba(199,255,47,.18)", background: "radial-gradient(circle,#c7ff2f18,transparent 66%)" }}/></div>
          </div>
          <div style={{ ...layerBase, bottom: 374, height: 64, transform: "translateZ(80px)", display: "flex", alignItems: "center", justifyContent: "space-around" }}><span style={{ color: "#829083", fontSize: 9 }}>04 / SEARCH</span><b>SEO</b><b>AEO</b><b>GEO</b></div>
          <div style={{ ...layerBase, bottom: 450, height: 64, transform: "translateZ(130px)", display: "flex", alignItems: "center", justifyContent: "space-around" }}><span style={{ color: "#829083", fontSize: 9 }}>05 / AI</span><b style={{ color: "#c7ff2f" }}>RAG</b><b>ENCJE</b><b>API</b><b>AGENT</b></div>
          <figcaption style={{ position: "absolute", right: "8%", bottom: 18, fontSize: 9, letterSpacing: ".12em", color: "#6f786f" }}>LIQUID → GRID → PRODUCT → SEARCH → AI</figcaption>
        </figure>
      </div>
    </section>
  );
}
