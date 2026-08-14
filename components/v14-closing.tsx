import { site } from "@/lib/site";

export function V14Closing() {
  return (
    <section className="v14-device-theater" aria-labelledby="v14-closing-title">
      <div className="v14-shell v14-device-layout">
        <div className="v14-device-copy">
          <p>07 / KONTAKT</p>
          <h2 id="v14-closing-title">Zbudujmy WWW, które samo pokazuje poziom Twojej firmy.</h2>
          <span>Najpierw cel i architektura. Potem design, kod, widoczność i interakcje, które naprawdę mają po co istnieć.</span>
        </div>
        <div>
          <div className="v14-hero-actions">
            <a className="v14-button v14-button-primary" href="/kontakt">Wyceń projekt <span aria-hidden="true">↗</span></a>
            <a className="v14-button v14-button-ghost" href={`mailto:${site.email}`}>{site.email}</a>
          </div>
          <p style={{ margin: "24px 0 0", color: "#7f897f", fontSize: 11, letterSpacing: ".12em" }}>WWW · SEARCH · AI · SYSTEMS · LIQUID ENGINE</p>
        </div>
      </div>
      <footer className="v14-shell" style={{ display: "flex", flexWrap: "wrap", gap: 18, justifyContent: "space-between", alignItems: "center", marginTop: 76, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,.1)" }}>
        <div style={{ display: "grid", gap: 4 }}><strong>LEADFLOWAI</strong><small style={{ color: "#778177" }}>marka Tervyxa Systems sp. z o.o.</small></div>
        <nav aria-label="Stopka" style={{ display: "flex", flexWrap: "wrap", gap: 18 }}><a href="/uslugi">Usługi</a><a href="/realizacje">Realizacje</a><a href="/wiedza">Wiedza</a><a href="/o-nas">O nas</a></nav>
        <small style={{ color: "#778177" }}>© 2026 LeadFlowAI</small>
      </footer>
    </section>
  );
}
