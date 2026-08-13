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
    directAnswer: "3D na stronie ma sens wtedy, gdy wnosi informację, emocję lub możliwość eksploracji, której nie daje zwykły obraz. Zakres obejmuje koncepcję doświadczenia, model interakcji, implementację, fallback, mobile i kontrolę kosztu GPU.",
    capabilities: ["3D", "WebGL", "Shaders", "Product", "Scroll", "Interaction", "Performance", "Fallback"],
    outcomes: [
      { title: "Produkt, który można eksplorować", description: "Użytkownik może obracać, zbliżać lub poznawać elementy produktu bez opuszczania strony." },
      { title: "Narracja przestrzenna", description: "Scroll i ruch mogą sterować kamerą, światłem i kolejnością informacji zamiast tylko przesuwać tekst." },
      { title: "Kontrolowany koszt", description: "3D jest ładowane tylko tam, gdzie potrzebne, z limitami jakości i fallbackiem dla słabszych urządzeń." },
    ],
    deliverables: [
      { index: "01", title: "Experience concept", description: "Rola 3D, scenariusz interakcji, urządzenia docelowe i granice wydajności.", tags: ["UX", "Story", "Scope", "Performance"] },
      { index: "02", title: "Scene + interaction", description: "Model sceny, kamera, światło, materiały, sterowanie kursorem, dotykiem lub scrollem.", tags: ["3D", "WebGL", "Input", "Motion"] },
      { index: "03", title: "Web integration", description: "Połączenie sceny z treścią, CTA, routingiem i design systemem strony.", tags: ["React", "UI", "CTA", "Responsive"] },
      { index: "04", title: "Performance modes", description: "Lazy load, limity DPR/FPS, reduced motion i statyczny fallback tam, gdzie renderowanie 3D nie jest właściwe.", tags: ["CWV", "GPU", "Fallback", "Mobile"] },
    ],
    process: [
      { title: "Cel", description: "Ustalamy co użytkownik ma zrozumieć lub zrobić dzięki 3D." },
      { title: "Prototype", description: "Budujemy mały prototyp ruchu i interakcji przed pełną sceną." },
      { title: "Build", description: "Tworzymy scenę i integrujemy ją z interfejsem." },
      { title: "Performance QA", description: "Testujemy urządzenia, FPS, pamięć GPU, fallback i reduced motion." },
      { title: "Launch", description: "Publikujemy dopiero po sprawdzeniu, że efekt nie psuje użyteczności strony." },
    ],
    faqs: [
      { question: "Czy każda strona powinna mieć 3D?", answer: "Nie. 3D jest narzędziem. Jeżeli nie wspiera produktu, narracji albo zrozumienia oferty, lepiej użyć prostszej warstwy wizualnej." },
      { question: "Czy WebGL działa na telefonach?", answer: "Tak, ale zakres jakości musi być adaptacyjny. Na mobile często stosujemy niższy DPR, mniej geometrii i uproszczone efekty." },
      { question: "Czy można zrobić fallback bez WebGL?", answer: "Tak. Dla krytycznych treści przygotowujemy statyczny lub uproszczony fallback, żeby strona nie zależała od możliwości GPU." },
    ],
    related: ["web-development", "strony-internetowe", "landing-pages"],
  },
  "interaktywne-strony": {
    slug: "interaktywne-strony",
    code: "WWW / INTERACTIVE",
    eyebrow: "LEADFLOWAI / INTERACTIVE PREMIUM",
    title: "Interaktywne strony premium, które reagują na użytkownika i prowadzą narrację.",
    lead: "Projektujemy scroll stories, konfiguratory, mikrointerakcje, dynamiczne moduły i custom UI, które mają konkretną rolę w doświadczeniu użytkownika.",
    directAnswer: "Interaktywność nie powinna oznaczać przypadkowych animacji. Każdy ruch, hover, scroll i przejście projektujemy tak, aby pomagały zrozumieć strukturę, pokazać relację lub prowadzić do działania.",
    capabilities: ["Interactive UX", "Scroll", "Microinteraction", "Configurator", "Motion", "State", "Responsive", "Accessibility"],
    outcomes: [
      { title: "Wyraźniejsza narracja", description: "Ruch pokazuje zależności i kolejność zamiast konkurować z treścią." },
      { title: "Lepsza eksploracja", description: "Konfiguratory i moduły pozwalają użytkownikowi samodzielnie odkryć właściwą opcję." },
      { title: "Premium bez chaosu", description: "Interakcje działają w ramach jednego design systemu i respektują reduced motion." },
    ],
    deliverables: [
      { index: "01", title: "Interaction map", description: "Lista interakcji, ich funkcja, trigger, stan początkowy i fallback.", tags: ["UX", "States", "Motion", "A11y"] },
      { index: "02", title: "Interactive components", description: "Karty, story sections, configurators, reveal, hover i scroll behavior.", tags: ["React", "CSS", "JS", "Responsive"] },
      { index: "03", title: "Motion language", description: "Spójne tempo, easing, hierarchia i zasady reduced-motion dla całego interfejsu.", tags: ["Motion", "Timing", "Reduced motion", "System"] },
      { index: "04", title: "QA", description: "Klawiatura, touch, focus, mobile, performance i regresja funkcjonalna.", tags: ["QA", "Keyboard", "Touch", "CWV"] },
    ],
    process: [
      { title: "Story", description: "Ustalamy gdzie interakcja pomaga zrozumieć produkt lub ofertę." },
      { title: "Prototype", description: "Testujemy ruch na małym komponencie." },
      { title: "System", description: "Budujemy wspólny język interakcji i komponentów." },
      { title: "Integracja", description: "Łączymy motion z treścią, CTA i analityką." },
      { title: "Validation", description: "Sprawdzamy urządzenia, dostępność i koszt renderowania." },
    ],
    faqs: [
      { question: "Czy dużo animacji zawsze poprawia stronę?", answer: "Nie. Nadmiar ruchu pogarsza czytelność. Najlepsza interakcja ma funkcję i pojawia się wtedy, gdy użytkownik jej potrzebuje." },
      { question: "Czy interakcje mogą działać bez myszy?", answer: "Tak. Projektujemy stany dla touch, klawiatury i focus, a elementy wymagające hover mają alternatywę." },
      { question: "Czy można animować istniejącą stronę?", answer: "Tak, ale najpierw trzeba sprawdzić strukturę i performance, żeby motion nie maskował problemów bazowego interfejsu." },
    ],
    related: ["strony-internetowe", "web-development", "modernizacja-stron"],
  },
  "motion-design": {
    slug: "motion-design",
    code: "WWW / MOTION",
    eyebrow: "LEADFLOWAI / MOTION DESIGN",
    title: "Motion design dla WWW: ruch jako część informacji, nie warstwa ozdobna.",
    lead: "Budujemy język przejść, reveal, hover, scroll i mikroanimacji, który wzmacnia hierarchię strony i nie blokuje wydajności ani dostępności.",
    directAnswer: "Motion design w interfejsie powinien wyjaśniać zmianę stanu, kierować uwagę i budować ciągłość między sekcjami. Dlatego określamy tempo, priorytet i reduced-motion tak samo świadomie jak typografię lub kolor.",
    capabilities: ["Motion system", "Microinteraction", "Scroll", "Hover", "Reveal", "Timing", "Reduced motion", "Performance"],
    outcomes: [
      { title: "Spójny rytm", description: "Elementy reagują według jednej logiki zamiast zestawu przypadkowych efektów." },
      { title: "Czytelniejsze stany", description: "Animacja pomaga zrozumieć co się otworzyło, zmieniło lub zostało wybrane." },
      { title: "Kontrola dostępności", description: "Reduced motion i stany bez animacji są projektowane razem z wersją pełną." },
    ],
    deliverables: [
      { index: "01", title: "Motion tokens", description: "Czasy, easing, odległości i zasady priorytetu ruchu.", tags: ["Timing", "Easing", "Tokens", "System"] },
      { index: "02", title: "Component motion", description: "Hover, focus, reveal, accordion, modal, navigation i stany komponentów.", tags: ["UI", "States", "Interaction", "A11y"] },
      { index: "03", title: "Scroll choreography", description: "Ruch sekcji i narracja scrollowana tylko tam, gdzie pomaga przekazać treść.", tags: ["Scroll", "Story", "Motion", "Performance"] },
      { index: "04", title: "Reduced-motion mode", description: "Alternatywny przebieg bez zbędnego ruchu zgodny z preferencjami użytkownika.", tags: ["A11y", "Reduced motion", "QA", "Fallback"] },
    ],
    process: [
      { title: "Audit", description: "Sprawdzamy gdzie ruch pomaga, a gdzie przeszkadza." },
      { title: "Tokens", description: "Definiujemy podstawowe tempo i easing." },
      { title: "Components", description: "Wdrażamy motion na kluczowych komponentach." },
      { title: "Scroll", description: "Dodajemy większe sekwencje tylko tam, gdzie są uzasadnione." },
      { title: "QA", description: "Testujemy reduced motion, mobile i płynność." },
    ],
    faqs: [
      { question: "Czy motion design wymaga WebGL?", answer: "Nie. Większość interfejsu może działać na CSS i lekkim JavaScript. WebGL ma sens dla bardziej złożonych scen i efektów." },
      { question: "Czy animacje wpływają na Core Web Vitals?", answer: "Mogą. Dlatego unikamy ciężkich operacji layoutowych, ograniczamy koszt renderowania i testujemy realne urządzenia." },
      { question: "Czy można wyłączyć ruch?", answer: "Tak. Projekt powinien respektować prefers-reduced-motion i zachować pełną użyteczność bez animacji." },
    ],
    related: ["strony-internetowe", "web-development", "landing-pages"],
  },
  "chatboty-ai": {
    slug: "chatboty-ai",
    code: "WWW / AI",
    eyebrow: "LEADFLOWAI / CHATBOTY AI",
    title: "Chatboty AI dla stron, które mają określoną pracę i kontrolowane źródło wiedzy.",
    lead: "Projektujemy asystentów WWW do FAQ, kwalifikacji zapytań, nawigacji po ofercie i pracy z bazą wiedzy, z fallbackiem i kontrolą odpowiedzi.",
    directAnswer: "Chatbot nie powinien być obowiązkowym wejściem do strony ani generować niezweryfikowanych informacji. Najpierw definiujemy rolę, źródła wiedzy, granice odpowiedzi i sposób przekazania użytkownika do człowieka.",
    capabilities: ["AI Chatbot", "RAG", "Knowledge", "Qualification", "Guardrails", "Fallback", "Analytics", "Integrations"],
    outcomes: [
      { title: "Szybsza odpowiedź", description: "Bot może obsłużyć powtarzalne pytania i kierować użytkownika do właściwej treści." },
      { title: "Kwalifikacja", description: "Interakcja może zebrać kontekst zapytania przed kontaktem z człowiekiem." },
      { title: "Kontrola public truth", description: "Źródła i fallback ograniczają ryzyko zmyślania cen, terminów lub warunków." },
    ],
    deliverables: [
      { index: "01", title: "Role + guardrails", description: "Definicja zadań, zakazanych odpowiedzi, fallbacku i eskalacji do człowieka.", tags: ["Scope", "Safety", "Fallback", "UX"] },
      { index: "02", title: "Knowledge layer", description: "Zatwierdzone źródła, struktura wiedzy i RAG tam, gdzie jest potrzebny.", tags: ["RAG", "Content", "Sources", "Retrieval"] },
      { index: "03", title: "Chat experience", description: "Interfejs, stany błędów, sugestie pytań i zachowanie na mobile.", tags: ["UI", "Mobile", "A11y", "Fallback"] },
      { index: "04", title: "Integration + monitoring", description: "API, limity, analityka, logowanie zgodne z polityką danych i obserwowalność działania.", tags: ["API", "Rate limit", "Analytics", "Monitoring"] },
    ],
    process: [
      { title: "Use case", description: "Ustalamy konkretną rolę chatbota." },
      { title: "Knowledge", description: "Wybieramy i porządkujemy zatwierdzone źródła." },
      { title: "Prototype", description: "Testujemy pytania graniczne i fallback." },
      { title: "Integration", description: "Łączymy chat z interfejsem i wymaganymi systemami." },
      { title: "Monitoring", description: "Obserwujemy jakość odpowiedzi i błędy po uruchomieniu." },
    ],
    faqs: [
      { question: "Czy chatbot jest potrzebny każdej firmie?", answer: "Nie. Jeżeli użytkownik łatwo znajduje odpowiedzi na stronie i nie ma powtarzalnego zadania dla bota, chatbot może być zbędny." },
      { question: "Czy chatbot może odpowiadać na podstawie dokumentów firmy?", answer: "Tak, przez RAG lub inne kontrolowane źródło wiedzy, o ile dokumenty nadają się do takiego użycia i mają określony poziom dostępu." },
      { question: "Czy strona działa, gdy model AI jest niedostępny?", answer: "Powinna. Nawigacja, oferta i kontakt pozostają niezależne od chatbota, a sam moduł ma mieć fallback." },
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
  { slug: "interaktywne-strony", label: "Interactive premium" },
  { slug: "motion-design", label: "Motion design" },
  { slug: "chatboty-ai", label: "Chatboty AI" },
] as const;
