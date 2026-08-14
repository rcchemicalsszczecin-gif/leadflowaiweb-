import Image from "next/image";

const css = `.v14-st{background:#f3f5ef;color:#0b0d0f;padding:108px 0 122px}.v14-st-head{max-width:930px;margin-bottom:34px}.v14-st-k{margin:0;font-size:10px;letter-spacing:.14em;color:#697169}.v14-st h2{margin:18px 0 20px;font-size:clamp(42px,5vw,72px);line-height:.98;letter-spacing:-.06em}.v14-st-lead{max-width:700px;margin:0;font-size:17px;line-height:1.65;color:#626a62}.v14-st-img{display:block;width:100%;height:auto}.v14-st-points{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:18px 0 0;padding:0;list-style:none}.v14-st-points li{font-size:12px;color:#626a62}.v14-st-points b{color:#111511}.v14-st-link{display:block;margin-top:28px;text-align:center;color:#111511;font-size:14px;font-weight:750;text-decoration:none}@media(max-width:620px){.v14-st{padding:76px 0 86px}.v14-st-points{grid-template-columns:1fr}}`;

export function V14SearchTrinity() {
  return (
    <section className="v14-st" aria-labelledby="v14-trinity-title">
      <style>{css}</style>
      <div className="v14-shell">
        <div className="v14-st-head">
          <p className="v14-st-k">04 / CZŁOWIEK · GOOGLE · SYSTEM AI</p>
          <h2 id="v14-trinity-title">Ta sama strona musi być czytelna na trzy różne sposoby.</h2>
          <p className="v14-st-lead">Jedna publiczna prawda ma być użyteczna dla człowieka, jednoznaczna dla wyszukiwarki i możliwa do zweryfikowania przez system generatywny.</p>
        </div>
        <Image
          className="v14-st-img"
          src="/v14-search-trinity.svg"
          alt="Trzy sposoby odczytania strony LeadFlowAI: człowiek, Google i system AI"
          width={1200}
          height={500}
          sizes="(max-width: 768px) 100vw, 1360px"
        />
        <ul className="v14-st-points">
          <li><b>Człowiek:</b> oferta, dowody i CTA.</li>
          <li><b>Google:</b> semantyka, canonical, schema i linki.</li>
          <li><b>System AI:</b> encje, fakty i źródła.</li>
        </ul>
        <a className="v14-st-link" href="/seo-aeo-geo">Zobacz pełną architekturę SEO / AEO / GEO <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}
