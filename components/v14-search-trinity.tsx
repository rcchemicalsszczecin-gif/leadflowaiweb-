import type { CSSProperties } from "react";

const card: CSSProperties = { minHeight: 430, padding: 22, border: "1px solid #d7dcd2", borderRadius: 24, background: "#fff", display: "flex", flexDirection: "column" };
const label: CSSProperties = { fontSize: 10, letterSpacing: ".14em", color: "#697169" };

export function V14SearchTrinity() {
  return (
    <section aria-labelledby="v14-trinity-title" style={{ background: "#f3f5ef", color: "#0b0d0f", padding: "112px 0 126px" }}>
      <div className="v14-shell">
        <div style={{ maxWidth: 930, marginBottom: 48 }}>
          <p style={{ ...label, margin: 0 }}>04 / CZŁOWIEK · GOOGLE · SYSTEM AI</p>
          <h2 id="v14-trinity-title" style={{ margin: "18px 0 20px", fontSize: "clamp(42px,5vw,72px)", lineHeight: .98, letterSpacing: "-.06em" }}>Ta sama strona musi być czytelna na trzy różne sposoby.</h2>
          <p style={{ maxWidth: 700, margin: 0, fontSize: 17, lineHeight: 1.65, color: "#626a62" }}>Nie budujemy osobnej wersji dla robotów. Jedna publiczna prawda ma być użyteczna dla człowieka, jednoznaczna dla wyszukiwarki i możliwa do zweryfikowania przez system generatywny.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: 14 }}>
          <article style={card}>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span style={label}>01 / CZŁOWIEK</span><b>UX</b></div>
            <h3 style={{ margin: "22px 0 10px", fontSize: 28, lineHeight: 1.04, letterSpacing: "-.045em" }}>Widzę ofertę i wiem, co zrobić dalej.</h3>
            <p style={{ margin: 0, color: "#687068", lineHeight: 1.55, fontSize: 14 }}>Hierarchia, produkt, dowody i CTA składają się w czytelną ścieżkę decyzji.</p>
            <figure style={{ margin: "auto 0 0", height: 190, borderRadius: 18, background: "#101410", padding: 16, display: "grid", gridTemplateRows: "28px 1fr", gap: 14 }}>
              <div style={{ display: "flex", gap: 7, alignItems: "center" }}><i style={{ width: 7, height: 7, borderRadius: "50%", background: "#c7ff2f" }}/><i style={{ width: 44, height: 5, borderRadius: 99, background: "#465046" }}/><i style={{ marginLeft: "auto", width: 48, height: 18, borderRadius: 99, background: "#c7ff2f" }}/></div>
              <div style={{ display: "grid", gridTemplateColumns: "1.2fr .8fr", gap: 10 }}><div><b style={{ display: "block", width: "84%", height: 16, borderRadius: 5, background: "#eef2e8" }}/><span style={{ display: "block", width: "68%", height: 7, marginTop: 12, borderRadius: 99, background: "#596159" }}/><span style={{ display: "block", width: "52%", height: 7, marginTop: 7, borderRadius: 99, background: "#3f473f" }}/><strong style={{ display: "block", width: 70, height: 24, marginTop: 18, borderRadius: 99, background: "#c7ff2f" }}/></div><div style={{ borderRadius: 12, border: "1px solid #c7ff2f33", background: "radial-gradient(circle,#c7ff2f20,transparent 68%)" }}/></div>
              <figcaption style={{ position: "absolute", width: 1, height: 1, overflow: "hidden" }}>Przykładowy interfejs użytkownika</figcaption>
            </figure>
          </article>

          <article style={card}>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span style={label}>02 / GOOGLE</span><b>SEARCH</b></div>
            <h3 style={{ margin: "22px 0 10px", fontSize: 28, lineHeight: 1.04, letterSpacing: "-.045em" }}>Rozumiem temat, strukturę i relacje serwisu.</h3>
            <p style={{ margin: 0, color: "#687068", lineHeight: 1.55, fontSize: 14 }}>Semantyka, canonicale, linkowanie i dane strukturalne tworzą spójny dokument.</p>
            <figure style={{ margin: "auto 0 0", height: 190, borderRadius: 18, background: "#f7f8f5", border: "1px solid #d9ded4", padding: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ width: 18, height: 18, borderRadius: "50%", border: "3px solid #4285f4" }}/><b style={{ color: "#1b1e1b", fontSize: 11 }}>leadflowai.pl › strony-internetowe</b></div>
              <strong style={{ display: "block", marginTop: 16, color: "#174ea6", fontSize: 18 }}>Strony internetowe projektowane jako produkt</strong>
              <span style={{ display: "block", marginTop: 10, height: 7, width: "92%", borderRadius: 99, background: "#c7ccc4" }}/><span style={{ display: "block", marginTop: 7, height: 7, width: "74%", borderRadius: 99, background: "#d4d8d1" }}/>
              <div style={{ display: "flex", gap: 6, marginTop: 18 }}><small style={{ padding: "5px 8px", borderRadius: 99, background: "#e8ebE5" }}>Service</small><small style={{ padding: "5px 8px", borderRadius: 99, background: "#e8ebE5" }}>FAQ</small><small style={{ padding: "5px 8px", borderRadius: 99, background: "#e8ebE5" }}>Entity</small></div>
              <figcaption style={{ position: "absolute", width: 1, height: 1, overflow: "hidden" }}>Edukacyjny podgląd struktury wyniku wyszukiwania</figcaption>
            </figure>
          </article>

          <article style={{ ...card, background: "#0e1215", color: "#f5f7f2", borderColor: "#222a24" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ ...label, color: "#8c968c" }}>03 / SYSTEM AI</span><b style={{ color: "#c7ff2f" }}>ENTITY</b></div>
            <h3 style={{ margin: "22px 0 10px", fontSize: 28, lineHeight: 1.04, letterSpacing: "-.045em" }}>Mogę odczytać fakty, encje i źródła.</h3>
            <p style={{ margin: 0, color: "#9da69d", lineHeight: 1.55, fontSize: 14 }}>Marka, organizacja, usługi, realizacje i wiedza tworzą kontrolowaną sieć relacji.</p>
            <figure style={{ position: "relative", margin: "auto 0 0", height: 190 }}>
              <svg viewBox="0 0 320 190" width="100%" height="100%" aria-hidden="true"><path d="M160 95L54 38M160 95L268 42M160 95L62 154M160 95L270 150" fill="none" stroke="#c7ff2f" strokeOpacity=".26"/><circle cx="160" cy="95" r="33" fill="#c7ff2f12" stroke="#c7ff2f"/><circle cx="54" cy="38" r="20" fill="#141b16" stroke="#647064"/><circle cx="268" cy="42" r="20" fill="#141b16" stroke="#647064"/><circle cx="62" cy="154" r="20" fill="#141b16" stroke="#647064"/><circle cx="270" cy="150" r="20" fill="#141b16" stroke="#647064"/><text x="160" y="99" textAnchor="middle" fill="#c7ff2f" fontSize="10">LEADFLOWAI</text><text x="54" y="41" textAnchor="middle" fill="#c7cec7" fontSize="7">FIRMA</text><text x="268" y="45" textAnchor="middle" fill="#c7cec7" fontSize="7">USŁUGI</text><text x="62" y="157" textAnchor="middle" fill="#c7cec7" fontSize="7">WIEDZA</text><text x="270" y="153" textAnchor="middle" fill="#c7cec7" fontSize="7">DOWODY</text></svg>
              <figcaption style={{ position: "absolute", width: 1, height: 1, overflow: "hidden" }}>Diagram relacji encji LeadFlowAI</figcaption>
            </figure>
          </article>
        </div>
        <div style={{ textAlign: "center", marginTop: 34 }}><a href="/seo-aeo-geo" style={{ color: "#111511", fontSize: 14, fontWeight: 750, textDecoration: "none" }}>Zobacz pełną architekturę SEO / AEO / GEO <span aria-hidden="true">↗</span></a></div>
      </div>
    </section>
  );
}
