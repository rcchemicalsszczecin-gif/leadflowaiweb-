import { site } from "@/lib/site";

const briefPoints = [
  "rodzaj projektu: strona, landing page, sklep, modernizacja albo custom web development",
  "najważniejszy cel biznesowy strony",
  "obecna strona, jeśli już istnieje",
  "zakres funkcji, integracji albo SEO / AEO / GEO",
  "orientacyjny budżet i termin, jeśli są już określone",
];

export function LeadForm() {
  return (
    <section className="lead-form" aria-labelledby="direct-contact-title">
      <div className="form-section-head">
        <span>01</span>
        <div>
          <p className="form-kicker">KONTAKT</p>
          <h2 id="direct-contact-title">Napisz bezpośrednio na e-mail.</h2>
        </div>
      </div>

      <p>
        Formularz online jest obecnie wyłączony. Zapytania o projekty przyjmujemy bezpośrednio
        pod adresem <strong>{site.email}</strong>.
      </p>

      <div className="form-submit-row">
        <a className="button button-primary button-large" href={`mailto:${site.email}`}>
          Napisz e-mail
          <span aria-hidden="true">↗</span>
        </a>
        <p>{site.email}</p>
      </div>

      <div className="form-section-head">
        <span>02</span>
        <div>
          <p className="form-kicker">BRIEF</p>
          <h2>Co warto podać w pierwszej wiadomości?</h2>
        </div>
      </div>

      <ul>
        {briefPoints.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>

      <p>
        Nie wysyłaj haseł, danych kart płatniczych ani innych poufnych sekretów technicznych.
        Dostępy ustalamy dopiero w odpowiednim, bezpiecznym etapie realizacji.
      </p>
    </section>
  );
}
