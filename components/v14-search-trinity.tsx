import Image from "next/image";

export function V14SearchTrinity() {
  return (
    <section className="v14-st" aria-labelledby="v14-trinity-title">
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
