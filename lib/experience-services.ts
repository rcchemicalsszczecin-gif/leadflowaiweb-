import type { Metadata } from "next";
import type { ServicePageData } from "@/lib/services";
import { site } from "@/lib/site";

export const experienceServices = {
  "strony-3d-webgl": {
    slug: "strony-3d-webgl",
    code: "WWW / 3D",
    eyebrow: "LEADFLOWAI / 3D + WEBGL",
    title: "Strony 3D i WebGL, które zamieniają produkt w interaktywne doświadczenie.",
    lead: "Projektujemy lekkie sceny 3D, prezentacje produktów, wizualizacje danych i interakcje WebGL tam, gdzie przestrzeń faktycznie pomaga zrozumieć ofertę.",
    directAnswer: "3D na stronie ma sens wtedy, gdy wnosi informację, emocję lub możliwość eksploracji, której nie daje zwykły obraz. Zakres obejmuje koncepcję doświadczenia, model interakcji, implementację, tryb awaryjny, mobile i kontrolę kosztu GPU.",
    capabilities: ["3D", "WebGL", "Shadery", "Produkt", "Przewijanie", "Interakcja", "Wydajność", "Tryb awaryjny"],
    outcomes: [
      { title: "Produkt, który można eksplorować", description: "Użytkownik może obracać, zbliżać lub poznawać elementy produktu bez opuszczania strony." },
      { title: "Narracja przestrzenna", description: "Przewijanie i ruch mogą sterować kamerą, światłem i kolejnością informacji zamiast tylko przesuwać tekst." },
      { title: "Kontrolowany koszt", description: "3D jest ładowane tylko tam, gdzie potrzebne, z limitami jakości i trybem awaryjnym dla słabszych urządzeń." },
    ],
    deliverables: [
      { index: "01", title: "Koncepcja doświadczenia", description: "Rola 3D, scenariusz interakcji, urządzenia docelowe i granice wydajności.", tags: ["UX", "Narracja", "Zakres", "Wydajność"] },
      { index: "02", title: "Scena i interakcja", description: "Model sceny, kamera, światło, materiały, sterowanie kursorem, dotykiem lub przewijaniem.", tags: ["3D", "WebGL", "Sterowanie", "Ruch"] },
      { index: "03", title: "Integracja ze stroną", description: "Połączenie sceny z treścią, CTA, routingiem i systemem wizualnym strony.", tags: ["React", "UI", "CTA", "Responsywność"] },
      { index: "04", title: "Tryby wydajności", description: "Leniwe ładowanie, limity DPR/FPS, ograniczenie ruchu i statyczny tryb awaryjny tam, gdzie renderowanie 3D nie jest właściwe.", tags: ["CWV", "GPU", "Tryb awaryjny", "Mobile"] },
    ],
    process: [
      { title: "Cel", description: "Ustalamy co użytkownik ma zrozumieć lub zrobić dzięki 3D." },
      { title: "Prototyp", description: "Budujemy mały prototyp ruchu i interakcji przed pełną sceną." },
      { title: "Budowa", description: "Tworzymy scenę i integrujemy ją z interfejsem." },
      { title: "QA wydajności", description: "Testujemy urządzenia, FPS, pamięć GPU, tryb awaryjny i ograniczenie ruchu." },
      { title: "Publikacja", description: "Publikujemy dopiero po sprawdzeniu, że efekt nie psuje użyteczności strony." },
    ],
    faqs: [
      { question: "Czy każda strona powinna mieć 3D?", answer: "Nie. 3D jest narzędziem. Jeżeli nie wspiera produktu, narracji albo zrozumienia oferty, lepiej użyć prostszej warstwy wizualnej." },
      { question: "Czy WebGL działa na telefonach?", answer: "Tak, ale zakres jakości musi być adaptacyjny. Na urządzeniach mobilnych często stosujemy niższy DPR, mniej geometrii i uproszczone efekty." },
      { question: "Czy można przygotować wersję bez WebGL?", answer: "Tak. Dla krytycznych treści przygotowujemy statyczny lub uproszczony tryb awaryjny, żeby strona nie zależała od możliwości GPU." },
    ],
    related: ["web-development", "strony-internetowe", "landing-pages"],
  },
  "interaktywne-strony": {
    slug: "interaktywne-strony",
    code: "WWW / INTERACTIVE",
    eyebrow: "LEADFLOWAI / INTERAKTYWNE WWW PREMIUM",
    title: "Interaktywne strony premium, które reagują na użytkownika i prowadzą narrację.",
    lead: "Projektujemy narracje przewijane, konfiguratory, mikrointerakcje, dynamiczne moduły i dedykowany interfejs, które mają konkretną rolę w doświadczeniu użytkownika.",
    directAnswer: "Interaktywność nie powinna oznaczać przypadkowych animacji. Każdy ruch, najechanie, przewinięcie i przejście projektujemy tak, aby pomagały zrozumieć strukturę, pokazać relację lub prowadzić do działania.",
    capabilities: ["Interaktywny UX", "Przewijanie", "Mikrointerakcje", "Konfigurator", "Ruch", "Stany", "Responsywność", "Dostępność"],
    outcomes: [
      { title: "Wyraźniejsza narracja", description: "Ruch pokazuje zależności i kolejność zamiast konkurować z treścią." },
      { title: "Lepsza eksploracja", description: "Konfiguratory i moduły pozwalają użytkownikowi samodzielnie odkryć właściwą opcję." },
      { title: "Premium bez chaosu", description: "Interakcje działają w ramach jednego systemu wizualnego i respektują preferencję ograniczonego ruchu." },
    ],
    deliverables: [
      { index: "01", title: "Mapa interakcji", description: "Lista interakcji, ich funkcja, wyzwalacz, stan początkowy i tryb awaryjny.", tags: ["UX", "Stany", "Ruch", "Dostępność"] },
      { index: "02", title: "Komponenty interaktywne", description: "Karty, sekcje narracyjne, konfiguratory, odkrywanie treści, najechanie i zachowanie podczas przewijania.", tags: ["React", "CSS", "JS", "Responsywność"] },
      { index: "03", title: "Język ruchu", description: "Spójne tempo, easing, hierarchia i zasady ograniczenia ruchu dla całego interfejsu.", tags: ["Ruch", "Tempo", "Ograniczony ruch", "System"] },
      { index: "04", title: "QA", description: "Klawiatura, dotyk, focus, mobile, wydajność i regresja funkcjonalna.", tags: ["QA", "Klawiatura", "Dotyk", "CWV"] },
    ],
    process: [
      { title: "Narracja", description: "Ustalamy gdzie interakcja pomaga zrozumieć produkt lub ofertę." },
      { title: "Prototyp", description: "Testujemy ruch na małym komponencie." },
      { title: "System", description: "Budujemy wspólny język interakcji i komponentów." },
      { title: "Integracja", description: "Łączymy ruch z treścią, CTA i analityką." },
      { title: "Weryfikacja", description: "Sprawdzamy urządzenia, dostępność i koszt renderowania." },
    ],
    faqs: [
      { question: "Czy dużo animacji zawsze poprawia stronę?", answer: "Nie. Nadmiar ruchu pogarsza czytelność. Najlepsza interakcja ma funkcję i pojawia się wtedy, gdy użytkownik jej potrzebuje." },
      { question: "Czy interakcje mogą działać bez myszy?", answer: "Tak. Projektujemy stany dla dotyku, klawiatury i focusu, a elementy wymagające najechania mają alternatywę." },
      { question: "Czy można animować istniejącą stronę?", answer: "Tak, ale najpierw trzeba sprawdzić strukturę i wydajność, żeby ruch nie maskował problemów bazowego interfejsu." },
    ],
    related: ["strony-internetowe", "web-development", "modernizacja-stron"],
  },
  "motion-design": {
    slug: "motion-design",
    code: "WWW / MOTION",
    eyebrow: "LEADFLOWAI / RUCH I MIKROINTERAKCJE",
    title: "Ruch w interfejsie WWW jako część informacji, nie warstwa ozdobna.",
    lead: "Budujemy język przejść, odkrywania treści, najechania, przewijania i mikroanimacji, który wzmacnia hierarchię strony i nie blokuje wydajności ani dostępności.",
    directAnswer: "Ruch w interfejsie powinien wyjaśniać zmianę stanu, kierować uwagę i budować ciągłość między sekcjami. Dlatego określamy tempo, priorytet i ograniczenie ruchu tak samo świadomie jak typografię lub kolor.",
    capabilities: ["System ruchu", "Mikrointerakcje", "Przewijanie", "Najechanie", "Odkrywanie", "Tempo", "Ograniczony ruch", "Wydajność"],
    outcomes: [
      { title: "Spójny rytm", description: "Elementy reagują według jednej logiki zamiast zestawu przypadkowych efektów." },
      { title: "Czytelniejsze stany", description: "Animacja pomaga zrozumieć co się otworzyło, zmieniło lub zostało wybrane." },
      { title: "Kontrola dostępności", description: "Ograniczony ruch i stany bez animacji są projektowane razem z wersją pełną." },
    ],
    deliverables: [
      { index: "01", title: "Tokeny ruchu", description: "Czasy, easing, odległości i zasady priorytetu ruchu.", tags: ["Tempo", "Easing", "Tokeny", "System"] },
      { index: "02", title: "Ruch komponentów", description: "Najechanie, focus, odkrywanie, accordion, modal, nawigacja i stany komponentów.", tags: ["UI", "Stany", "Interakcja", "Dostępność"] },
      { index: "03", title: "Choreografia przewijania", description: "Ruch sekcji i narracja przewijana tylko tam, gdzie pomaga przekazać treść.", tags: ["Przewijanie", "Narracja", "Ruch", "Wydajność"] },
      { index: "04", title: "Tryb ograniczonego ruchu", description: "Alternatywny przebieg bez zbędnego ruchu zgodny z preferencjami użytkownika.", tags: ["Dostępność", "Ograniczony ruch", "QA", "Tryb awaryjny"] },
    ],
    process: [
      { title: "Audyt", description: "Sprawdzamy gdzie ruch pomaga, a gdzie przeszkadza." },
      { title: "Tokeny", description: "Definiujemy podstawowe tempo i easing." },
      { title: "Komponenty", description: "Wdrażamy ruch na kluczowych komponentach." },
      { title: "Przewijanie", description: "Dodajemy większe sekwencje tylko tam, gdzie są uzasadnione." },
      { title: "QA", description: "Testujemy ograniczony ruch, mobile i płynność." },
    ],
    faqs: [
      { question: "Czy animacje interfejsu wymagają WebGL?", answer: "Nie. Większość interfejsu może działać na CSS i lekkim JavaScript. WebGL ma sens dla bardziej złożonych scen i efektów." },
      { question: "Czy animacje wpływają na Core Web Vitals?", answer: "Mogą. Dlatego unikamy ciężkich operacji układu, ograniczamy koszt renderowania i testujemy realne urządzenia." },
      { question: "Czy można wyłączyć ruch?", answer: "Tak. Projekt powinien respektować prefers-reduced-motion i zachować pełną użyteczność bez animacji." },
    ],
    related: ["strony-internetowe", "web-development", "landing-pages"],
  },
  "chatboty-ai": {
    slug: "chatboty-ai",
    code: "WWW / AI",
    eyebrow: "LEADFLOWAI / CHATBOTY AI",
    title: "Chatboty AI dla stron, które mają określoną pracę i kontrolowane źródło wiedzy.",
    lead: "Projektujemy asystentów WWW do FAQ, kwalifikacji zapytań, nawigacji po ofercie i pracy z bazą wiedzy, z trybem awaryjnym i kontrolą odpowiedzi.",
    directAnswer: "Chatbot nie powinien być obowiązkowym wejściem do strony ani generować niezweryfikowanych informacji. Najpierw definiujemy rolę, źródła wiedzy, granice odpowiedzi i sposób przekazania użytkownika do człowieka.",
    capabilities: ["Chatbot AI", "RAG", "Wiedza", "Kwalifikacja", "Ograniczenia", "Tryb awaryjny", "Analityka", "Integracje"],
    outcomes: [
      { title: "Szybsza odpowiedź", description: "Bot może obsłużyć powtarzalne pytania i kierować użytkownika do właściwej treści." },
      { title: "Kwalifikacja", description: "Interakcja może zebrać kontekst zapytania przed kontaktem z człowiekiem." },
      { title: "Kontrola publicznych informacji", description: "Źródła i tryb awaryjny ograniczają ryzyko zmyślania cen, terminów lub warunków." },
    ],
    deliverables: [
      { index: "01", title: "Rola i ograniczenia", description: "Definicja zadań, zakazanych odpowiedzi, trybu awaryjnego i eskalacji do człowieka.", tags: ["Zakres", "Bezpieczeństwo", "Tryb awaryjny", "UX"] },
      { index: "02", title: "Warstwa wiedzy", description: "Zatwierdzone źródła, struktura wiedzy i RAG tam, gdzie jest potrzebny.", tags: ["RAG", "Treści", "Źródła", "Wyszukiwanie"] },
      { index: "03", title: "Doświadczenie rozmowy", description: "Interfejs, stany błędów, sugestie pytań i zachowanie na mobile.", tags: ["UI", "Mobile", "Dostępność", "Tryb awaryjny"] },
      { index: "04", title: "Integracja i monitoring", description: "API, limity, analityka, logowanie zgodne z polityką danych i obserwowalność działania.", tags: ["API", "Limit zapytań", "Analityka", "Monitoring"] },
    ],
    process: [
      { title: "Zastosowanie", description: "Ustalamy konkretną rolę chatbota." },
      { title: "Wiedza", description: "Wybieramy i porządkujemy zatwierdzone źródła." },
      { title: "Prototyp", description: "Testujemy pytania graniczne i tryb awaryjny." },
      { title: "Integracja", description: "Łączymy chat z interfejsem i wymaganymi systemami." },
      { title: "Monitoring", description: "Obserwujemy jakość odpowiedzi i błędy po uruchomieniu." },
    ],
    faqs: [
      { question: "Czy chatbot jest potrzebny każdej firmie?", answer: "Nie. Jeżeli użytkownik łatwo znajduje odpowiedzi na stronie i nie ma powtarzalnego zadania dla bota, chatbot może być zbędny." },
      { question: "Czy chatbot może odpowiadać na podstawie dokumentów firmy?", answer: "Tak, przez RAG lub inne kontrolowane źródło wiedzy, o ile dokumenty nadają się do takiego użycia i mają określony poziom dostępu." },
      { question: "Czy strona działa, gdy model AI jest niedostępny?", answer: "Powinna. Nawigacja, oferta i kontakt pozostają niezależne od chatbota, a sam moduł ma mieć tryb awaryjny." },
    ],
    related: ["web-development", "strony-internetowe", "audyt-strony"],
  },
} as const satisfies Record<string, ServicePageData>;

export type ExperienceServiceSlug = keyof typeof experienceServices;

export function getExperienceService(slug: ExperienceServiceSlug): ServicePageData {
  return experienceServices[slug];
}

export function getExperienceServiceMetadata(slug: ExperienceServiceSlug): Metadata {
  const page = experienceServices[slug];
  return {
    title: page.title,
    description: page.lead,
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      type: "website",
      locale: "pl_PL",
      url: `${site.url}/${page.slug}`,
      siteName: site.name,
      title: page.title,
      description: page.lead,
    },
  };
}

export const experienceServiceLinks = [
  { slug: "strony-3d-webgl", label: "3D / WebGL" },
  { slug: "interaktywne-strony", label: "Interaktywne strony premium" },
  { slug: "motion-design", label: "Ruch i mikrointerakcje" },
  { slug: "chatboty-ai", label: "Chatboty AI" },
] as const;
