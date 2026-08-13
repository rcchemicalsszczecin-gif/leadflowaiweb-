import type { Metadata } from "next";
import type { ServicePageData } from "@/lib/services";
import { site } from "@/lib/site";

export const searchPages = {
  seo: {
    slug: "seo",
    code: "SEARCH / SEO",
    eyebrow: "LEADFLOWAI / SEO",
    title: "SEO projektowane razem ze stroną, a nie dopisywane po wdrożeniu.",
    lead:
      "Budujemy techniczny i informacyjny fundament widoczności: crawlability, indeksowalność, semantykę, internal linking, metadata, wydajność i strukturę treści.",
    directAnswer:
      "SEO w LeadFlowAI oznacza przede wszystkim poprawną architekturę strony i treści. Nie sprowadzamy procesu do wstawiania fraz. Sprawdzamy czy robot może znaleźć i zrozumieć stronę, czy użytkownik trafia na właściwą odpowiedź i czy technologia nie blokuje indeksacji lub wydajności.",
    capabilities: ["Technical SEO", "On-page", "Internal linking", "Metadata", "Crawl", "Indexing", "CWV", "Content architecture"],
    outcomes: [
      { title: "Czytelna struktura", description: "Adresy, nagłówki, linkowanie i hierarchia treści wspierają zarówno użytkownika, jak i crawler." },
      { title: "Kontrola techniczna", description: "Canonical, robots, sitemap, statusy, metadata i wydajność są częścią wdrożenia." },
      { title: "Rozwój na danych", description: "Po publikacji decyzje można opierać na indeksacji, zapytaniach i realnym zachowaniu użytkowników." },
    ],
    deliverables: [
      { index: "01", title: "Crawl & index architecture", description: "Struktura URL, sitemap, robots, canonical, statusy odpowiedzi i kontrola tego, co powinno być indeksowane.", tags: ["Crawl", "Index", "Canonical", "Sitemap"] },
      { index: "02", title: "Semantic structure", description: "HTML, headings, breadcrumbs, internal linking i relacje między stronami opisujące strukturę oferty.", tags: ["HTML", "Headings", "Links", "Breadcrumbs"] },
      { index: "03", title: "Page signals", description: "Tytuły, opisy, treść, obrazy i dane strony dopasowane do rzeczywistej intencji użytkownika.", tags: ["Metadata", "Content", "Images", "Intent"] },
      { index: "04", title: "Performance & quality", description: "Core Web Vitals, mobile, accessibility i stabilność techniczna jako część jakości strony, nie osobny kosmetyczny audyt.", tags: ["CWV", "Mobile", "WCAG", "QA"] },
    ],
    process: [
      { title: "Intent map", description: "Łączymy usługę, użytkownika i zapytania z właściwymi typami stron." },
      { title: "Technical foundation", description: "Projektujemy indeksowalność, routing, metadata i linkowanie." },
      { title: "Content architecture", description: "Treść odpowiada na potrzebę i prowadzi dalej w serwisie." },
      { title: "Verification", description: "Sprawdzamy crawl, build, metadata i krytyczne sygnały techniczne." },
      { title: "Measurement", description: "Po publikacji analizujemy dane z narzędzi wyszukiwarki i konwersji." },
    ],
    faqs: [
      { question: "Czy SEO jest wliczone w każdą nową stronę?", answer: "Podstawy technicznego SEO powinny być częścią profesjonalnej budowy strony. Rozbudowany research, content i stały rozwój organiczny mogą być osobnym zakresem." },
      { question: "Czy gwarantujecie konkretną pozycję w Google?", answer: "Nie. Możemy kontrolować jakość techniczną, treść i proces optymalizacji, ale wynik wyszukiwania zależy także od konkurencji i systemów wyszukiwarki." },
      { question: "Czy SEO ma znaczenie przy redesignie?", answer: "Tak. Redesign bez kontroli URL-i, redirectów, metadata i indeksowalności może niepotrzebnie utracić wcześniej zbudowaną wartość." },
    ],
    related: ["seo-aeo-geo", "aeo", "geo-ai-search"],
  },
  aeo: {
    slug: "aeo",
    code: "SEARCH / AEO",
    eyebrow: "LEADFLOWAI / AEO",
    title: "AEO: treść i struktura, z których łatwo wydobyć poprawną odpowiedź.",
    lead:
      "Projektujemy strony tak, aby kluczowe pytania miały jednoznaczne odpowiedzi, jasne definicje, logiczną hierarchię i wystarczający kontekst.",
    directAnswer:
      "Answer Engine Optimization to sposób organizowania informacji tak, aby system odpowiedzi mógł szybko znaleźć konkretną, wiarygodną odpowiedź. AEO nie zastępuje SEO — opiera się na poprawnej architekturze, treści i publicznej prawdzie firmy.",
    capabilities: ["Answer-first", "Definitions", "FAQ", "Semantic headings", "Entity clarity", "Structured content", "Source context"],
    outcomes: [
      { title: "Szybka odpowiedź", description: "Najważniejsza informacja nie jest ukryta po kilku ekranach marketingowego tekstu." },
      { title: "Jasny kontekst", description: "Definicje, warunki i ograniczenia zmniejszają ryzyko wyrwania odpowiedzi z kontekstu." },
      { title: "Lepsza użyteczność", description: "Ten sam układ, który pomaga answer engines, zwykle pomaga także użytkownikowi szybko zrozumieć ofertę." },
    ],
    deliverables: [
      { index: "01", title: "Question architecture", description: "Mapa realnych pytań użytkowników i miejsc, w których odpowiedź powinna występować.", tags: ["Questions", "Intent", "IA", "UX"] },
      { index: "02", title: "Answer-first sections", description: "Krótka odpowiedź na początku sekcji, a niżej uzasadnienie, warunki i rozwinięcie.", tags: ["Answers", "Context", "Headings", "Copy"] },
      { index: "03", title: "Entity consistency", description: "Jednoznaczne nazwy marki, firmy, usług i relacji między nimi w treści oraz danych strony.", tags: ["Entities", "Brand", "Public truth", "Consistency"] },
      { index: "04", title: "Machine-readable support", description: "Structured data i semantyczny HTML używane tylko tam, gdzie opisują faktycznie widoczną treść.", tags: ["Schema", "HTML", "FAQ", "Validation"] },
    ],
    process: [
      { title: "Pytania", description: "Zbieramy pytania wynikające z decyzji klienta i oferty." },
      { title: "Odpowiedzi", description: "Budujemy konkretne odpowiedzi z wymaganym kontekstem i ograniczeniami." },
      { title: "Struktura", description: "Umieszczamy je w logicznych sekcjach i relacjach między podstronami." },
      { title: "Semantyka", description: "Wspieramy treść HTML-em i danymi strukturalnymi tam, gdzie jest to uzasadnione." },
      { title: "Review", description: "Weryfikujemy spójność faktów i unikamy obietnic, których nie da się udowodnić." },
    ],
    faqs: [
      { question: "Czy AEO zastępuje SEO?", answer: "Nie. AEO korzysta z tych samych fundamentów: dostępnej strony, jasnej informacji, semantyki i wiarygodnej treści." },
      { question: "Czy FAQ wystarczy do AEO?", answer: "Nie. FAQ może być użyteczne, ale kluczowa jest cała architektura informacji i jakość odpowiedzi na stronach ofertowych." },
      { question: "Czy AEO daje gwarancję pojawienia się w odpowiedzi AI?", answer: "Nie. Możemy zwiększać klarowność i dostępność informacji, ale nie kontrolujemy decyzji zewnętrznego systemu odpowiedzi." },
    ],
    related: ["seo-aeo-geo", "seo", "geo-ai-search"],
  },
  "geo-ai-search": {
    slug: "geo-ai-search",
    code: "SEARCH / GEO",
    eyebrow: "LEADFLOWAI / GEO · AI SEARCH",
    title: "GEO / AI Search bez magii: jasne encje, publiczna prawda i źródłowa treść.",
    lead:
      "Przygotowujemy serwis tak, aby generatywne systemy wyszukiwania miały czytelne, spójne i możliwe do zweryfikowania informacje o marce, usługach i kompetencjach.",
    directAnswer:
      "Generative Engine Optimization nie jest gwarantowanym sposobem na pojawienie się w ChatGPT czy innym modelu. W praktyce budujemy warstwę nad dobrym SEO: jednoznaczną tożsamość podmiotu, spójne fakty, oryginalne informacje, structured data i treść, którą łatwo zacytować bez utraty kontekstu.",
    capabilities: ["Entity clarity", "Public truth", "Source-friendly content", "Structured data", "Original evidence", "Consistency", "AI Search"],
    outcomes: [
      { title: "Jedna tożsamość", description: "Marka, podmiot prawny, usługi i domena są opisane bez sprzecznych wariantów." },
      { title: "Treść źródłowa", description: "Strona publikuje konkretne informacje, procesy i dowody zamiast generycznych sloganów bez wartości informacyjnej." },
      { title: "Mniej niejednoznaczności", description: "Machine-readable dane wspierają fakty widoczne dla człowieka zamiast tworzyć osobną, ukrytą wersję prawdy." },
    ],
    deliverables: [
      { index: "01", title: "Entity map", description: "Relacje między marką, operatorem prawnym, domeną, usługami, lokalizacją i publicznymi dowodami.", tags: ["Entity", "Organization", "Brand", "Relations"] },
      { index: "02", title: "Public-truth layer", description: "Spójne fakty biznesowe publikowane w treści, metadata i structured data bez wymyślonych certyfikatów czy realizacji.", tags: ["Truth", "Claims", "Evidence", "Consistency"] },
      { index: "03", title: "Citation-friendly content", description: "Definicje, dane, porównania, procesy i odpowiedzi z kontekstem ułatwiającym poprawne przytoczenie informacji.", tags: ["Sources", "Answers", "Context", "Original content"] },
      { index: "04", title: "Technical support", description: "Semantic HTML, crawlability, structured data, canonical i sitemap wspierają dostęp do tej samej publicznej informacji.", tags: ["SEO", "Schema", "Crawl", "Canonical"] },
    ],
    process: [
      { title: "Identity", description: "Ustalamy jednoznacznie kto jest marką, kto operatorem i jakie usługi są rzeczywiście oferowane." },
      { title: "Evidence", description: "Oddzielamy udokumentowane fakty od planów i marketingowych hipotez." },
      { title: "Content", description: "Budujemy treść źródłową, odpowiedzi i informacje własne marki." },
      { title: "Machine layer", description: "Wspieramy widoczne fakty semantyką i structured data." },
      { title: "Observation", description: "Widoczność w AI Search obserwujemy jako sygnał, a nie obiecany ranking." },
    ],
    faqs: [
      { question: "Czy możecie zagwarantować, że ChatGPT poleci moją firmę?", answer: "Nie. Żaden wykonawca nie kontroluje generatywnego systemu wyszukiwania. Możemy natomiast poprawić jakość i jednoznaczność publicznych informacji, z których takie systemy mogą korzystać." },
      { question: "Czy GEO wymaga osobnej strony internetowej?", answer: "Nie. Najlepiej działa jako warstwa poprawnie zbudowanej strony i klasycznego SEO, a nie jako osobny techniczny silos." },
      { question: "Czy structured data wystarczy do GEO?", answer: "Nie. Dane strukturalne wspierają interpretację, ale bez dobrej treści, spójnych faktów i realnych dowodów nie tworzą autorytetu same z siebie." },
    ],
    related: ["seo-aeo-geo", "aeo", "seo"],
  },
  "seo-aeo-geo": {
    slug: "seo-aeo-geo",
    code: "SEARCH / UNIFIED",
    eyebrow: "LEADFLOWAI / SEO + AEO + GEO",
    title: "Jedna architektura widoczności dla Google, answer engines i AI Search.",
    lead:
      "Łączymy techniczne SEO, strukturę odpowiedzi AEO i public-truth/entity layer GEO, żeby nie budować trzech sprzecznych wersji tej samej strony.",
    directAnswer:
      "SEO, AEO i GEO rozwiązują częściowo różne problemy, ale mają wspólny fundament: dostępna technicznie strona, jasna informacja, spójne fakty, wartościowa treść i prawidłowe relacje między stronami oraz encjami. Dlatego projektujemy je jako jedną warstwę search architecture.",
    capabilities: ["SEO", "AEO", "GEO", "Entities", "Schema", "Internal linking", "Public truth", "Content systems"],
    outcomes: [
      { title: "Jeden source of truth", description: "Treść dla użytkownika, metadata i structured data opisują tę samą rzeczywistość." },
      { title: "Mniej długu SEO", description: "Widoczność jest częścią architektury projektu, więc później nie trzeba łatać przypadkowych decyzji URL i treści." },
      { title: "Gotowość do zmian wyszukiwania", description: "Model oparty na jakości informacji jest mniej zależny od pojedynczego kanału niż trik pod jeden algorytm." },
    ],
    deliverables: [
      { index: "01", title: "Search architecture", description: "Mapa intencji, typów stron, URL-i, linkowania i informacji, które muszą istnieć publicznie.", tags: ["Intent", "IA", "URLs", "Links"] },
      { index: "02", title: "Technical SEO layer", description: "Crawl, index, canonical, sitemap, robots, metadata, performance i semantyczny HTML.", tags: ["SEO", "Crawl", "CWV", "HTML"] },
      { index: "03", title: "Answer layer", description: "Direct answers, definicje, FAQ i kontekst odpowiadający na rzeczywiste pytania użytkowników.", tags: ["AEO", "Answers", "FAQ", "Context"] },
      { index: "04", title: "Entity & GEO layer", description: "Spójna tożsamość marki i firmy, public truth, structured data oraz źródłowe treści.", tags: ["GEO", "Entities", "Schema", "Evidence"] },
      { index: "05", title: "Validation", description: "Kontrola zgodności treści, danych strukturalnych, linków, canonical, indeksowalności i publicznych claimów.", tags: ["QA", "Truth", "Schema", "Search"] },
    ],
    process: [
      { title: "Truth", description: "Ustalamy fakty biznesowe i granice tego, co można publicznie twierdzić." },
      { title: "Intent", description: "Mapujemy potrzeby użytkowników i właściwe strony odpowiedzi." },
      { title: "Architecture", description: "Budujemy routing, linkowanie, semantic HTML i machine-readable layer." },
      { title: "Content", description: "Tworzymy konkretne odpowiedzi i źródłowe informacje zamiast syntetycznego filleru." },
      { title: "Measure", description: "Po publikacji analizujemy indeksację, ruch, konwersje i obserwowalne sygnały AI Search." },
    ],
    faqs: [
      { question: "Czy trzeba wybrać między SEO, AEO a GEO?", answer: "Nie. Dla nowoczesnej strony sensowniejsze jest potraktowanie ich jako warstw jednej architektury informacji i widoczności." },
      { question: "Czy GEO to nowy algorytm pozycjonowania?", answer: "Nie. To praktyki zwiększające klarowność i źródłowość informacji dla generatywnych systemów, oparte na poprawnym SEO i publicznej prawdzie." },
      { question: "Czy LeadFlowAI oferuje ten zakres przy produkcji WWW?", answer: "Tak. Przy nowych stronach fundament SEO/AEO/GEO może być zaprojektowany razem z UX, treścią i kodem. Dalszy rozwój może być osobnym zakresem." },
    ],
    related: ["seo", "aeo", "geo-ai-search"],
  },
  "local-seo": {
    slug: "local-seo",
    code: "SEARCH / LOCAL",
    eyebrow: "LEADFLOWAI / LOCAL SEO",
    title: "Local SEO dla firm, których klient szuka usługi w konkretnym miejscu.",
    lead:
      "Łączymy lokalne strony usługowe, spójne dane firmy, Google Business Profile i techniczny fundament serwisu tam, gdzie lokalna intencja rzeczywiście istnieje.",
    directAnswer:
      "Local SEO ma sens dla biznesów obsługujących konkretny obszar lub lokalizację. Fundamentem są spójne dane NAP, właściwy profil firmy, realne lokalne informacje i strony, które rozwiązują lokalną potrzebę — nie setki automatycznych kopii nazw miast.",
    capabilities: ["Local intent", "GBP", "NAP", "LocalBusiness", "Reviews", "Local pages", "Internal linking"],
    outcomes: [
      { title: "Spójne dane", description: "Nazwa, adres/obszar, telefon i informacje firmy nie przeczą sobie pomiędzy stroną a profilami zewnętrznymi." },
      { title: "Lokalna odpowiedź", description: "Strony usługowe wyjaśniają realnie gdzie i jak firma działa, zamiast podmieniać tylko nazwę miasta." },
      { title: "Czytelna encja lokalna", description: "Dane strukturalne i profil firmy wspierają fakty widoczne publicznie, jeśli dany typ biznesu i lokalizacji to uzasadnia." },
    ],
    deliverables: [
      { index: "01", title: "Local intent map", description: "Usługi, obszary działania i realne zapytania lokalne, które uzasadniają osobne strony lub sekcje.", tags: ["Intent", "Services", "Areas", "IA"] },
      { index: "02", title: "NAP & entity consistency", description: "Spójność podstawowych danych i relacji pomiędzy marką, firmą i lokalizacją.", tags: ["NAP", "Entity", "Truth", "Consistency"] },
      { index: "03", title: "Local pages", description: "Unikalne strony lokalne tylko tam, gdzie mają własną treść, ofertę lub wartość dla użytkownika.", tags: ["Content", "Local", "UX", "Internal links"] },
      { index: "04", title: "Profile & schema support", description: "Wsparcie Google Business Profile i LocalBusiness schema tylko w przypadkach, w których dane są prawdziwe i właściwe semantycznie.", tags: ["GBP", "Schema", "Reviews", "Validation"] },
    ],
    process: [
      { title: "Obszar", description: "Ustalamy rzeczywisty model obsługi lokalnej i lokalizacje." },
      { title: "Spójność", description: "Porządkujemy dane i encje firmy." },
      { title: "Treść", description: "Budujemy lokalne odpowiedzi o rzeczywistej wartości." },
      { title: "Technika", description: "Wdrażamy internal linking, metadata i właściwe dane strukturalne." },
      { title: "Monitoring", description: "Sprawdzamy widoczność, profile i konwersje z lokalnego ruchu." },
    ],
    faqs: [
      { question: "Czy warto tworzyć podstronę dla każdego miasta?", answer: "Nie automatycznie. Strona powinna istnieć tylko wtedy, gdy ma unikalną wartość i odpowiada rzeczywistemu obszarowi działania. Masowe doorway pages są złym kierunkiem." },
      { question: "Czy Google Business Profile jest częścią Local SEO?", answer: "Często tak, ale jego konfiguracja musi odzwierciedlać prawdziwy model firmy i obowiązujące zasady platformy." },
      { question: "Czy LocalBusiness schema zawsze jest właściwa?", answer: "Nie. Stosujemy dane strukturalne zgodnie z rzeczywistym typem podmiotu i publicznie widocznymi informacjami." },
    ],
    related: ["seo", "seo-aeo-geo", "strony-internetowe"],
  },
} as const satisfies Record<string, ServicePageData>;

export type SearchSlug = keyof typeof searchPages;

export function getSearchPage(slug: SearchSlug): ServicePageData {
  return searchPages[slug];
}

export function getSearchMetadata(slug: SearchSlug): Metadata {
  const page = searchPages[slug];
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

export const searchServiceLinks = [
  { slug: "seo-aeo-geo", label: "SEO + AEO + GEO" },
  { slug: "seo", label: "SEO" },
  { slug: "aeo", label: "AEO" },
  { slug: "geo-ai-search", label: "GEO / AI Search" },
  { slug: "local-seo", label: "Local SEO" },
] as const;
