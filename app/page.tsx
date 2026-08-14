import { V14DeviceTheater } from "@/components/v14-device-theater";
import { V14Hero } from "@/components/v14-hero";
import { V14Services } from "@/components/v14-services";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <main className="v14-page">
      <V14Hero />
      <V14Services />
      <V14DeviceTheater />
      <section className="v14-foundation" aria-labelledby="v14-foundation-title">
        <div className="v14-shell">
          <p>V14 / VISUAL REBUILD</p>
          <h2 id="v14-foundation-title">Nowy system wizualny budujemy jako produkt, nie kolejną warstwę CSS na V9.</h2>
          <div className="v14-foundation-grid">
            <a href="/uslugi"><span>01</span><strong>Usługi</strong><small>6 filarów produktu ↗</small></a>
            <a href="/realizacje"><span>02</span><strong>Realizacje</strong><small>device theater ↗</small></a>
            <a href="/seo-aeo-geo"><span>03</span><strong>Search + AI</strong><small>SEO / AEO / GEO · Chatboty / RAG ↗</small></a>
            <a href="/kontakt"><span>04</span><strong>Kontakt</strong><small>{site.email} ↗</small></a>
          </div>
        </div>
      </section>
    </main>
  );
}
