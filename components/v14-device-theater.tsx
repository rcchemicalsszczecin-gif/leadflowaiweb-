export function V14DeviceTheater() {
  return (
    <section className="v14-device-theater" aria-labelledby="v14-device-title">
      <link rel="stylesheet" href="/v14-device-theater.css" precedence="high" />
      <div className="v14-shell v14-device-layout">
        <div className="v14-device-copy">
          <p>02 / REALNY PRODUKT</p>
          <h2 id="v14-device-title">Jedna marka. Trzy urządzenia. Inne decyzje projektowe.</h2>
          <span>Responsywność nie oznacza pomniejszonego desktopu. Hierarchia, nawigacja i interakcje zmieniają się razem z kontekstem urządzenia.</span>
          <a href="/realizacje">Zobacz realizacje <b aria-hidden="true">↗</b></a>
        </div>
        <div className="v14-device-stage" aria-label="Wizualizacja systemowa responsywnego produktu LeadFlowAI">
          <div className="v14-device-glow" aria-hidden="true" />
          <div className="v14-device-desktop" aria-hidden="true">
            <i className="v14-device-toolbar" /><div className="v14-device-screen"><small>LEADFLOW / DESKTOP</small><strong>WEB PRODUCT</strong><span /><span /><span /></div>
          </div>
          <div className="v14-device-tablet" aria-hidden="true">
            <i /><div><small>TABLET</small><strong>SEARCH</strong><span /><span /></div>
          </div>
          <div className="v14-device-mobile" aria-hidden="true">
            <i /><div><small>MOBILE</small><strong>AI</strong><span /><span /></div>
          </div>
          <div className="v14-device-caption"><span>WIZUALIZACJA SYSTEMOWA</span><b>RESPONSIVE / FIRST-PARTY</b></div>
        </div>
      </div>
    </section>
  );
}
