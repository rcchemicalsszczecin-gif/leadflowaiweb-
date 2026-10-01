export function V14DeviceTheater() {
  return (
    <section className="v14-device-theater" aria-labelledby="v14-device-title">
      <div className="v14-shell v14-device-layout">
        <div className="v14-device-copy">
          <p>PRODUKT, NIE MAKIETA</p>
          <h2 id="v14-device-title">Ten sam cel. Inne decyzje na każdym ekranie.</h2>
          <span>Wersja mobilna nie jest pomniejszonym desktopem. Zmieniamy hierarchię, nawigację i gęstość treści, aby najważniejsze działanie pozostało łatwe.</span>
          <a href="/realizacje">Zobacz zakres potwierdzonych realizacji <b aria-hidden="true">↗</b></a>
        </div>
        <figure className="v14-device-stage">
          <div className="v14-device-glow" aria-hidden="true" />
          <div className="v14-device-desktop" aria-hidden="true">
            <i className="v14-device-toolbar" />
            <div className="v14-device-demo v14-device-demo-desktop">
              <nav><b>LeadFlowAI</b><span>Usługi</span><span>Realizacje</span><span>Wiedza</span></nav>
              <div className="v14-device-demo-grid"><div className="v14-device-demo-copy"><small>STRONA FIRMOWA</small><strong>Oferta, która prowadzi do rozmowy.</strong><em>ZAPYTAJ O PROJEKT ↗</em></div><aside><span>STRATEGIA</span><span>WIDOCZNOŚĆ</span><span>ROZWÓJ</span></aside></div>
            </div>
          </div>
          <div className="v14-device-tablet" aria-hidden="true">
            <i />
            <div className="v14-device-demo v14-device-demo-tablet"><nav><b>LeadFlowAI</b><span>MENU</span></nav><small>STRONA FIRMOWA</small><strong>Najważniejsze najpierw.</strong><p>Oferta i dowód w krótszej ścieżce.</p><em>POZNAJ ZAKRES ↗</em></div>
          </div>
          <div className="v14-device-mobile" aria-hidden="true">
            <i />
            <div className="v14-device-demo v14-device-demo-mobile"><nav><b>LF</b><span>MENU</span></nav><small>WERSJA MOBILNA</small><strong>Cel bez zbędnych kroków.</strong><em>NAPISZ DO NAS ↗</em></div>
          </div>
          <figcaption className="v14-device-caption"><span>DEMONSTRACYJNY INTERFEJS LEADFLOWAI</span><b>UKŁAD RESPONSYWNY / REALIZACJA WŁASNA</b></figcaption>
        </figure>
      </div>
    </section>
  );
}
