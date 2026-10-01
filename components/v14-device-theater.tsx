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
            <img src="/proof/leadflowai-service-desktop.webp" width="1440" height="900" loading="eager" decoding="async" alt="" />
          </div>
          <div className="v14-device-tablet" aria-hidden="true">
            <i />
            <img src="/proof/leadflowai-service-tablet.webp" width="768" height="1024" loading="eager" decoding="async" alt="" />
          </div>
          <div className="v14-device-mobile" aria-hidden="true">
            <i />
            <img src="/proof/leadflowai-service-mobile.webp" width="390" height="844" loading="eager" decoding="async" alt="" />
          </div>
          <figcaption className="v14-device-caption"><span>RZECZYWISTY WIDOK STRONY USŁUGOWEJ LEADFLOWAI</span><b>DESKTOP · TABLET · TELEFON / REALIZACJA WŁASNA</b></figcaption>
        </figure>
      </div>
    </section>
  );
}
