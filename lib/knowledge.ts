export type KnowledgeSection = {
  title: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
};

export type KnowledgeArticle = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  summary: string;
  sections: readonly KnowledgeSection[];
  related: readonly { href: string; label: string }[];
};

export const knowledgeArticles = [
  {
    slug: "jak-zaplanowac-strone-firmowa",
    eyebrow: "WWW / STRATEGY",
    title: "Jak zaplanować stronę firmową, która ma konkretną pracę do wykonania?",
    description:
      "Praktyczny model planowania strony firmowej: cel, odbiorca, architektura informacji, konwersja, pomiar i rozwój.",
    summary:
      "Dobra strona firmowa zaczyna się od decyzji biznesowych, nie od wyboru szablonu. Najpierw trzeba ustalić odbiorcę, intencję wejścia, informację potrzebną do decyzji i działanie, które ma być mierzone.",
    sections: [
      {
        title: "1. Zacznij od celu, który da się nazwać",
        paragraphs: [
          "„Nowa strona” nie jest jeszcze celem. Celem może być zwiększenie liczby jakościowych zapytań, uporządkowanie oferty, obsługa kampanii, wejście na nowy rynek albo odciążenie zespołu dzięki lepszej informacji i formularzom.",
          "Cel wpływa na strukturę, treść, CTA, analitykę i zakres integracji. Bez niego łatwo zbudować estetyczny serwis, którego skuteczności nie da się ocenić.",
        ],
      },
      {
        title: "2. Zmapuj użytkownika i jego pytania",
        paragraphs: [
          "Strona powinna odpowiadać na realne pytania użytkownika w kolejności potrzebnej do podjęcia decyzji. Inaczej wygląda ścieżka osoby szukającej wykonawcy, inaczej klienta porównującego technologie, a jeszcze inaczej kupującego produkt.",
        ],
        bullets: [
          "Kim jest odbiorca i z jakim problemem przychodzi?",
          "Co musi zrozumieć, zanim zaufa ofercie?",
          "Jakich dowodów lub informacji potrzebuje?",
          "Jakie działanie ma wykonać na końcu ścieżki?",
        ],
      },
      {
        title: "3. Projektuj architekturę przed interfejsem",
        paragraphs: [
          "Architektura informacji porządkuje strony, sekcje, zależności i linkowanie. Dopiero na niej warto budować wireframe i warstwę wizualną.",
          "To samo drzewo informacji pracuje później dla użytkownika, SEO, AEO i systemów generatywnych. Jasna struktura ogranicza też koszt późniejszej rozbudowy.",
        ],
      },
      {
        title: "4. Zdefiniuj konwersję i pomiar",
        paragraphs: [
          "CTA nie powinno być przypadkowym przyciskiem dodanym na końcu projektu. Formularz, telefon, zakup, rezerwacja lub pobranie materiału są elementami systemu konwersji i powinny mieć własne zdarzenia pomiarowe.",
          "Pomiar nie zastępuje jakości projektu, ale pozwala później odróżnić opinię od rzeczywistego zachowania użytkowników.",
        ],
      },
      {
        title: "5. Zostaw miejsce na rozwój",
        paragraphs: [
          "Dobra architektura zakłada, że oferta, treść, integracje i wymagania wyszukiwarek będą się zmieniały. Dlatego komponenty, dane, URL-e i nawigacja powinny być zaprojektowane tak, żeby kolejne etapy nie wymagały przebudowy wszystkiego od zera.",
        ],
      },
    ],
    related: [
      { href: "/strony-internetowe", label: "Strony internetowe" },
      { href: "/audyt-strony", label: "Audyt strony" },
      { href: "/kontakt", label: "Wycena projektu" },
    ],
  },
  {
    slug: "seo-aeo-geo-jedna-architektura",
    eyebrow: "SEARCH / ARCHITECTURE",
    title: "SEO, AEO i GEO: dlaczego warto projektować je jako jedną architekturę?",
    description:
      "SEO, AEO i GEO / AI Search bez magicznych obietnic: wspólny fundament techniczny, public truth, struktura odpowiedzi i dane maszynowe.",
    summary:
      "SEO, AEO i GEO nie powinny być trzema sprzecznymi wersjami tej samej strony. Najlepszym fundamentem jest jedna czytelna informacja: poprawnie zbudowana technicznie, bezpośrednio odpowiadająca na pytania i spójna z publicznymi faktami o marce i usługach.",
    sections: [
      {
        title: "1. SEO pozostaje fundamentem technicznym",
        paragraphs: [
          "Semantyczny HTML, poprawne statusy, canonicale, sitemap, robots, linkowanie wewnętrzne, wydajność i dostępność nie przestają mieć znaczenia dlatego, że pojawiły się generatywne interfejsy wyszukiwania.",
          "Jeżeli strona jest trudna do zrozumienia dla crawlera albo ma niespójną architekturę URL, dokładanie warstwy „AI Search” nie naprawia podstawowego problemu.",
        ],
      },
      {
        title: "2. AEO porządkuje sposób udzielania odpowiedzi",
        paragraphs: [
          "Answer Engine Optimization można traktować jako dyscyplinę treści i informacji: jasne definicje, answer-first sections, opisowe nagłówki i FAQ tam, gdzie naprawdę odpowiadają na powtarzalne pytania.",
          "Odpowiedź powinna być krótka tam, gdzie pytanie jest proste, ale użytkownik musi mieć możliwość wejścia głębiej bez szukania informacji na innej stronie.",
        ],
      },
      {
        title: "3. GEO zaczyna się od entity clarity i public truth",
        paragraphs: [
          "System generatywny powinien móc rozpoznać, czym jest marka, kto jest operatorem prawnym, jakie usługi są faktycznie oferowane i które informacje są źródłem publicznym.",
          "Structured data może pomóc opisać te relacje maszynowo, ale nie może być kanałem do ukrywania twierdzeń, których użytkownik nie widzi lub których firma nie potrafi potwierdzić.",
        ],
      },
      {
        title: "4. Nie ma uczciwej gwarancji cytowania przez AI",
        paragraphs: [
          "Widoczność w systemach generatywnych zależy od wielu czynników pozostających poza kontrolą właściciela strony. Dlatego poprawna usługa GEO polega na zwiększaniu czytelności, spójności i jakości źródła, a nie na obiecywaniu konkretnego cytowania lub rekomendacji.",
        ],
      },
    ],
    related: [
      { href: "/seo-aeo-geo", label: "SEO + AEO + GEO" },
      { href: "/geo-ai-search", label: "GEO / AI Search" },
      { href: "/audyt-strony", label: "Audyt architektury" },
    ],
  },
  {
    slug: "chatbot-na-stronie-kiedy-ma-sens",
    eyebrow: "AI / WEBSITE",
    title: "Chatbot na stronie: kiedy pomaga biznesowi, a kiedy tylko przeszkadza?",
    description:
      "Jak określić rolę chatbota WWW: FAQ, kwalifikacja leadów, RAG, integracje, fallback i wymagania bezpieczeństwa.",
    summary:
      "Chatbot ma sens wtedy, gdy ma określoną pracę do wykonania. Sam fakt użycia modelu AI nie poprawia strony. Najpierw trzeba zdefiniować zadanie, źródło wiedzy, granice odpowiedzi, fallback oraz sposób przekazania użytkownika do człowieka.",
    sections: [
      {
        title: "1. Zacznij od roli, nie od modelu",
        paragraphs: [
          "Najprostszy bot może odpowiadać na powtarzalne pytania. Bardziej zaawansowany może pomagać dobrać usługę, kwalifikować zapytanie albo pracować na zatwierdzonej bazie wiedzy.",
          "Wybór technologii powinien wynikać z roli. Innego rozwiązania potrzebuje FAQ, innego RAG nad dokumentacją, a jeszcze innego asystent połączony z CRM lub systemem rezerwacji.",
        ],
      },
      {
        title: "2. Zdefiniuj granice public truth",
        paragraphs: [
          "Bot nie powinien wymyślać cen, terminów, regulaminów, wyników ani parametrów oferty. Tam, gdzie odpowiedź nie jest zatwierdzona, bezpieczniej jest powiedzieć „nie wiem” i skierować do właściwego kanału kontaktu.",
        ],
      },
      {
        title: "3. Strona musi działać bez chatbota",
        paragraphs: [
          "Chatbot jest warstwą pomocniczą. Nawigacja, oferta, formularz i kluczowe informacje nie mogą znikać za oknem czatu ani wymagać modelu do podstawowej obsługi użytkownika.",
          "Dobry fallback pozwala nadal skontaktować się z firmą, gdy provider AI, integracja lub sieć chwilowo nie działa.",
        ],
      },
      {
        title: "4. Bezpieczeństwo obejmuje również integracje",
        paragraphs: [
          "W praktyce ryzyko nie kończy się na modelu. Trzeba kontrolować dane wejściowe, pochodzenie żądań, limity, sekrety dostawców, logowanie wiadomości i uprawnienia narzędzi, z którymi chatbot może się łączyć.",
        ],
      },
    ],
    related: [
      { href: "/#intelligence", label: "Warstwa intelligence" },
      { href: "/web-development", label: "Custom web development" },
      { href: "/kontakt", label: "Porozmawiaj o chatbocie" },
    ],
  },
  {
    slug: "modernizacja-strony-bez-utraty-widocznosci",
    eyebrow: "MIGRATION / SEARCH",
    title: "Modernizacja strony bez niepotrzebnej utraty widoczności: co trzeba zaplanować?",
    description:
      "Redesign i migracja strony z kontrolą URL-i, redirectów, treści, metadata, linkowania, indeksacji i walidacji po wdrożeniu.",
    summary:
      "Redesign nie powinien zaczynać się od skasowania starej strony. Najpierw trzeba zinwentaryzować istniejące URL-e i elementy, które już mają wartość, a następnie zaprojektować mapę migracji oraz testy po uruchomieniu.",
    sections: [
      {
        title: "1. Zrób inwentaryzację przed zmianą",
        paragraphs: [
          "Lista istniejących adresów URL, ważnych treści, formularzy, integracji i elementów indeksowanych jest punktem odniesienia dla migracji. Bez before-state trudno później ustalić, czy spadek lub błąd jest skutkiem redesignu.",
        ],
      },
      {
        title: "2. Stwórz mapę stary URL → nowy URL",
        paragraphs: [
          "Jeżeli adres znika lub zmienia się jego odpowiednik, decyzja powinna być jawna. Redirect nie jest automatycznym rozwiązaniem każdego problemu, ale przypadkowe 404 dla wartościowych stron również nie są dobrą strategią.",
        ],
      },
      {
        title: "3. Nie usuwaj wartościowej informacji tylko dlatego, że zmienia się design",
        paragraphs: [
          "Nowa warstwa wizualna może uprościć sposób prezentacji, ale powinna zachować informację potrzebną użytkownikom i wyszukiwarkom. Warto oddzielić problem „starego wyglądu” od problemu „niepotrzebnej treści”.",
        ],
      },
      {
        title: "4. Po publikacji potrzebna jest walidacja",
        paragraphs: [
          "Po migracji trzeba sprawdzić routing, canonicale, redirecty, sitemap, robots, metadata, linki, formularze, wydajność i indeksowalność. Dopiero porównanie before/after daje podstawę do oceny jakości wdrożenia.",
        ],
      },
    ],
    related: [
      { href: "/modernizacja-stron", label: "Modernizacja stron" },
      { href: "/seo", label: "SEO techniczne" },
      { href: "/audyt-strony", label: "Audyt przed migracją" },
    ],
  },
] as const satisfies readonly KnowledgeArticle[];

export type KnowledgeSlug = (typeof knowledgeArticles)[number]["slug"];

export function getKnowledgeArticle(slug: string): KnowledgeArticle | undefined {
  return knowledgeArticles.find((article) => article.slug === slug);
}
