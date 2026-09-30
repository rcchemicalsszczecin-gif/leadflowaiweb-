import Image from "next/image";

export function V14SearchTrinity() {
  return (
    <section className="v14-st" aria-labelledby="v14-trinity-title">
      <div className="v14-shell">
        <div className="v14-st-head">
          <p className="v14-st-k">WIDOCZNOŚĆ: SEO · AEO · GEO</p>
          <h2 id="v14-trinity-title">Jedna dobra odpowiedź, trzy sposoby odnalezienia.</h2>
          <p className="v14-st-lead">Treść najpierw pomaga człowiekowi. Poprawna struktura pozwala zrozumieć ją wyszukiwarce, a jawne fakty ułatwiają weryfikację systemom AI.</p>
        </div>
        <Image
          className="v14-st-img"
          src="/v14-search-trinity-dark.svg"
          alt="Trzy sposoby odczytania strony LeadFlowAI: człowiek, Google i system AI"
          width={1200}
          height={500}
          sizes="(max-width: 768px) 100vw, 1360px"
        />
        <ul className="v14-st-points">
          <li><b>Dla człowieka:</b> jasna oferta, dowody i następny krok.</li>
          <li><b>Dla Google:</b> semantyka, adresy kanoniczne, schema i linki.</li>
          <li><b>Dla systemów AI:</b> jednoznaczne encje, fakty i źródła.</li>
        </ul>
        <a className="v14-st-link" href="/seo-aeo-geo">Zobacz pełną architekturę SEO / AEO / GEO <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}
