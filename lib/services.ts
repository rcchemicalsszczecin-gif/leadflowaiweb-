import type { Metadata } from "next";
import { site } from "@/lib/site";

export type ServicePageData = {
  slug: string;
  code: string;
  eyebrow: string;
  title: string;
  lead: string;
  directAnswer: string;
  capabilities: readonly string[];
  outcomes: readonly { title: string; description: string }[];
  deliverables: readonly { index: string; title: string; description: string; tags: readonly string[] }[];
  process: readonly { title: string; description: string }[];
  faqs: readonly { question: string; answer: string }[];
  related: readonly string[];
};

export const servicePages = {
  "strony-internetowe": {
    slug: "strony-internetowe",
    code: "WWW / CORE",
    eyebrow: "LEADFLOWAI / STRONY INTERNETOWE",
    title: "Profesjonalne strony internetowe zbudowane jako system biznesowy.",
    lead:
      "Projektujemy i wdrażamy strony firmowe i usługowe, w których UX, development, SEO, AEO, GEO / AI Search, konwersja i wydajność powstają jako jedna architektura.",
    directAnswer:
      "Tworzenie strony internetowej w LeadFlowAI obejmuje nie tylko warstwę wizualną. Projekt zaczynamy od celu biznesowego i struktury informacji, następnie budujemy interfejs i kod, a widoczność, konwersję, dostępność, wydajność i bezpieczeństwo traktujemy jako elementy tego samego produktu.",
    capabilities: ["Strategia", "UX/UI", "Development", "SEO", "AEO", "GEO", "CRO", "Analytics"],
    outcomes: [
      { title: "Czytelna oferta", description: "Architektura informacji prowadzi użytkownika od potrzeby do właściwej usługi i działania." },
      { title: "Techniczny fundament widoczności", description: "Semantyka, metadata, indeksowalność i struktura są projektowane przed publikacją, a nie jako późniejsza poprawka." },
      { title: "Mierzalna konwersja", description: "CTA, formularze i zdarzenia analityczne wynikają z konkretnego celu biznesowego strony." },
    ],
    deliverables: [
      { index: "01", title: "Architektura i UX", description: "Mapa informacji, hierarchia treści, ścieżki użytkownika, CTA i responsive-first wireframe logiki strony.", tags: ["IA", "UX", "Mobile-first", "CRO"] },
      { index: "02", title: "Design system i interfejs", description: "Spójny język wizualny, typografia, komponenty, stany interakcji i dostępność bez uzależniania projektu od gotowego szablonu.", tags: ["UI", "Design system", "WCAG", "Responsive"] },
      { index: "03", title: "Development", description: "Produkcja strony w technologii dobranej do zakresu, z naciskiem na semantyczny HTML, mały koszt JavaScript i łatwy dalszy rozwój.", tags: ["Next.js", "React", "TypeScript", "Performance"] },
      { index: "04", title: "Search architecture", description: "SEO techniczne, AEO i GEO / AI Search przygotowane razem z treścią, strukturą encji i danymi strony.", tags: ["SEO", "AEO", "GEO", "Schema"] },
      { index: "05", title: "QA i uruchomienie", description: "Walidacja funkcji, mobile, dostępności, wydajności, bezpieczeństwa i krytycznych elementów wyszukiwalności przed publikacją.", tags: ["QA", "CWV", "Security", "Launch"] },
    ],
    process: [
      { title: "Diagnoza", description: "Ustalamy odbiorców, ofertę, stan obecny, konkurencję, wymagania i cel strony." },
      { title: "Architektura", description: "Układamy strukturę treści, konwersję, widoczność i wymagania techniczne." },
      { title: "Design + build", description: "Projektujemy interfejs, komponenty i implementujemy działający produkt." },
      { title: "Validation", description: "Testujemy to, co ma znaczenie dla użytkownika, wyszukiwarki i utrzymania." },
      { title: "Launch + rozwój", description: "Po publikacji mierzymy dane i rozwijamy stronę tam, gdzie ma to biznesowe uzasadnienie." },
    ],
    faqs: [
      { question: "Czy SEO, AEO i GEO mogą być częścią budowy nowej strony?", answer: "Tak. Właśnie tak preferujemy budować nowe serwisy: search architecture powstaje razem z informacją, kodem i treścią zamiast być doklejana po wdrożeniu." },
      { question: "Czy klient może później sam edytować treść?", answer: "Tak, jeżeli projekt tego wymaga. Dobieramy CMS lub panel do realnej częstotliwości zmian zamiast automatycznie instalować ciężki system zarządzania treścią." },
      { question: "Czy robicie także strony bez chatbota i automatyzacji?", answer: "Oczywiście. Chatboty i integracje są modułami opcjonalnymi. Podstawą zawsze pozostaje szybka, czytelna i użyteczna strona." },
    ],
    related: ["landing-pages", "modernizacja-stron", "web-development"],
  },
  "landing-pages": {
    slug: "landing-pages",
    code: "WWW / CONVERT",
    eyebrow: "LEADFLOWAI / LANDING PAGES",
    title: "Landing pages projektowane pod jeden konkretny cel.",
    lead:
      "Budujemy strony kampanii, usług i ofert, w których komunikat, hierarchia, szybkość, tracking i CTA są podporządkowane mierzalnej konwersji.",
    directAnswer:
      "Dobry landing page ogranicza rozproszenie i prowadzi użytkownika do jednego głównego działania. W LeadFlowAI projektujemy treść, UX, development, pomiar i techniczny fundament widoczności jako jedną ścieżkę konwersji.",
    capabilities: ["Campaign UX", "CRO", "Copy structure", "Forms", "Analytics", "Performance", "SEO"],
    outcomes: [
      { title: "Jedna dominująca akcja", description: "Treść i interfejs prowadzą do jasno zdefiniowanego celu zamiast konkurować o uwagę użytkownika." },
      { title: "Szybki pomiar", description: "Zdarzenia i konwersje można mierzyć od początku, dzięki czemu dalsze decyzje wynikają z danych." },
      { title: "Gotowość kampanii", description: "Strona jest przygotowana do ruchu z reklam, social media, e-maila lub organic search zależnie od projektu." },
    ],
    deliverables: [
      { index: "01", title: "Message architecture", description: "Oferta, obiekcje, dowody, CTA i kolejność sekcji ustawione zgodnie z intencją kampanii.", tags: ["Offer", "Copy", "CRO", "UX"] },
      { index: "02", title: "Responsive design", description: "Interfejs zoptymalizowany pod szybkie zrozumienie oferty i działanie na telefonie i desktopie.", tags: ["UI", "Mobile", "Accessibility", "CTA"] },
      { index: "03", title: "Fast build", description: "Lekka implementacja ograniczająca koszt ładowania, szczególnie istotny dla ruchu płatnego i mobile.", tags: ["Performance", "CWV", "Forms", "QA"] },
      { index: "04", title: "Measurement", description: "Plan zdarzeń i konwersji przygotowany tak, aby można było ocenić, gdzie użytkownicy kończą lub porzucają ścieżkę.", tags: ["Events", "Analytics", "Funnel", "CRO"] },
    ],
    process: [
      { title: "Cel", description: "Definiujemy pojedynczą główną konwersję oraz źródło ruchu." },
      { title: "Oferta", description: "Układamy komunikat, obiekcje, dowody i strukturę odpowiedzi." },
      { title: "Design + build", description: "Budujemy szybką stronę bez zbędnych elementów odciągających uwagę." },
      { title: "Pomiar", description: "Konfigurujemy wymagane punkty pomiarowe i sprawdzamy ścieżkę." },
      { title: "Iteracja", description: "Po zebraniu danych można poprawiać komunikaty, kolejność i CTA." },
    ],
    faqs: [
      { question: "Czy landing page może działać niezależnie od głównej strony firmy?", answer: "Tak. Może być osobnym adresem kampanii lub częścią głównego serwisu. Wybór zależy od źródła ruchu, marki i potrzeb analitycznych." },
      { question: "Czy robicie landing pages pod reklamy?", answer: "Tak. Projekt może być przygotowany pod konkretną kampanię, przy czym konfiguracja reklam sama w sobie nie jest wymagana, aby zbudować stronę i pomiar konwersji." },
      { question: "Czy landing musi być jedną długą stroną?", answer: "Nie. Liczy się spójność ścieżki. Przy bardziej złożonej decyzji sprzedażowej sensowny może być mały, celowy zestaw podstron." },
    ],
    related: ["strony-internetowe", "audyt-strony", "web-development"],
  },
  "sklepy-internetowe": {
    slug: "sklepy-internetowe",
    code: "WWW / COMMERCE",
    eyebrow: "LEADFLOWAI / E-COMMERCE",
    title: "Sklepy internetowe, w których katalog, zakup i widoczność tworzą jeden system.",
    lead:
      "Projektujemy e-commerce od struktury kategorii i produktu po checkout, integracje, wydajność, analitykę i techniczne SEO.",
    directAnswer:
      "Sklep internetowy musi jednocześnie pomagać znaleźć produkt, zrozumieć ofertę i bezpiecznie przejść przez zakup. Dlatego architekturę katalogu, UX, płatności, integracje, dane produktowe i search architecture planujemy wspólnie.",
    capabilities: ["E-commerce UX", "Catalog", "Checkout", "Payments", "SEO", "Schema", "Analytics", "Integrations"],
    outcomes: [
      { title: "Czytelny katalog", description: "Kategorie, filtry i strony produktów odpowiadają sposobowi, w jaki klienci szukają i porównują ofertę." },
      { title: "Kontrolowany checkout", description: "Ścieżka zakupowa minimalizuje zbędne kroki i jasno komunikuje stan zamówienia." },
      { title: "Dane gotowe do rozwoju", description: "Analityka i integracje pozwalają później rozwijać sprzedaż bez przebudowy całej architektury." },
    ],
    deliverables: [
      { index: "01", title: "Commerce architecture", description: "Kategorie, produkty, warianty, filtry, wyszukiwarka, koszyk i wymagania operacyjne sklepu.", tags: ["Catalog", "IA", "UX", "Search"] },
      { index: "02", title: "Product experience", description: "Projekt kart i stron produktów z hierarchią informacji, wariantami i elementami wspierającymi decyzję zakupową.", tags: ["PDP", "UI", "Mobile", "CRO"] },
      { index: "03", title: "Checkout + payments", description: "Proces koszyka i zamówienia, integracja płatności i niezbędne stany błędów oraz potwierdzeń.", tags: ["Checkout", "Payments", "Validation", "Security"] },
      { index: "04", title: "Search + data", description: "Techniczne SEO, dane produktowe i structured data projektowane zgodnie z rzeczywistą strukturą oferty.", tags: ["SEO", "Product data", "Schema", "Analytics"] },
      { index: "05", title: "Integrations", description: "Połączenia z systemami zewnętrznymi dobierane do realnego procesu: dostawa, magazyn, CRM, mailing lub inne API.", tags: ["API", "CRM", "Shipping", "Automation"] },
    ],
    process: [
      { title: "Model sprzedaży", description: "Ustalamy asortyment, warianty, płatności, dostawy i proces operacyjny." },
      { title: "Katalog + UX", description: "Projektujemy architekturę kategorii, wyszukiwanie i strony produktu." },
      { title: "Build + integrations", description: "Implementujemy sklep, checkout i wymagane połączenia." },
      { title: "QA transakcji", description: "Testujemy krytyczne ścieżki zakupowe, błędy, mobile i bezpieczeństwo." },
      { title: "Launch + pomiar", description: "Po publikacji monitorujemy działanie i dane istotne dla sprzedaży." },
    ],
    faqs: [
      { question: "Czy każdy sklep wymaga rozwiązania custom?", answer: "Nie. Technologię dobieramy do skali katalogu, procesów i integracji. Custom ma sens wtedy, gdy realnie rozwiązuje ograniczenia gotowej platformy." },
      { question: "Czy SEO produktowe jest uwzględniane podczas budowy?", answer: "Tak. Struktura kategorii, adresy URL, metadata, crawlability i dane produktów powinny być planowane przed uruchomieniem." },
      { question: "Czy można połączyć sklep z zewnętrznym systemem?", answer: "Tak, jeżeli system udostępnia odpowiednią integrację lub API. Zakres i niezawodność połączenia oceniamy przed implementacją." },
    ],
    related: ["web-development", "strony-internetowe", "audyt-strony"],
  },
  "web-development": {
    slug: "web-development",
    code: "WWW / ENGINEERING",
    eyebrow: "LEADFLOWAI / WEB DEVELOPMENT",
    title: "Dedykowany web development dla funkcji, których nie da się sensownie zamknąć w szablonie.",
    lead:
      "Budujemy niestandardowe moduły, portale, konfiguratory, panele i integracje internetowe tam, gdzie wymagania wykraczają poza klasyczną stronę.",
    directAnswer:
      "Custom web development ma sens wtedy, gdy proces biznesowy wymaga własnej logiki, interakcji lub integracji. Zaczynamy od domeny problemu i kontraktów danych, a dopiero później wybieramy komponenty i technologię.",
    capabilities: ["Next.js", "React", "TypeScript", "APIs", "Portals", "Dashboards", "Integrations", "Security"],
    outcomes: [
      { title: "Funkcja dopasowana do procesu", description: "Kod wynika z rzeczywistego workflow zamiast zmuszać firmę do obchodzenia ograniczeń gotowego szablonu." },
      { title: "Architektura do rozwoju", description: "Granice modułów, dane i integracje są projektowane tak, aby kolejne etapy nie wymagały przepisywania całości." },
      { title: "Kontrolowana złożoność", description: "Nie budujemy custom bez powodu — zakres pozostaje proporcjonalny do wartości biznesowej." },
    ],
    deliverables: [
      { index: "01", title: "Discovery techniczne", description: "Wymagania funkcjonalne, przepływy, role, dane, integracje i ryzyka projektu.", tags: ["Requirements", "Data", "Flows", "Risk"] },
      { index: "02", title: "Architecture", description: "Podział odpowiedzialności, API, modele danych, interfejsy i plan implementacji.", tags: ["Architecture", "API", "Types", "Contracts"] },
      { index: "03", title: "Implementation", description: "Kod frontendu i backendu w zakresie wymaganym przez produkt, z kontrolą zależności i stanów błędów.", tags: ["React", "Next.js", "TypeScript", "Server"] },
      { index: "04", title: "Integration + security", description: "Połączenia z usługami zewnętrznymi, walidacja danych, ograniczenia dostępu i bezpieczna obsługa sekretów.", tags: ["Auth", "Validation", "Secrets", "API"] },
      { index: "05", title: "Verification", description: "Testy krytycznych przepływów, typecheck, lint, build i kontrola regresji adekwatna do ryzyka.", tags: ["QA", "Types", "Build", "Observability"] },
    ],
    process: [
      { title: "Problem", description: "Opisujemy proces i rezultat zamiast zaczynać od listy frameworków." },
      { title: "Kontrakty", description: "Ustalamy dane, role, integracje i granice odpowiedzialności." },
      { title: "Implementacja etapowa", description: "Budujemy logiczne części produktu z walidacją po każdym większym etapie." },
      { title: "Hardening", description: "Sprawdzamy błędy, bezpieczeństwo, wydajność i zachowanie integracji." },
      { title: "Rozwój", description: "Kolejne funkcje wynikają z użycia produktu i priorytetów biznesowych." },
    ],
    faqs: [
      { question: "Czy web development oznacza aplikację od zera?", answer: "Nie zawsze. Czasem wystarczy pojedynczy moduł lub integracja w istniejącym serwisie. Zakres dobieramy do problemu." },
      { question: "Czy można zbudować portal lub panel klienta?", answer: "Tak. Wymaga to osobnego określenia ról, danych, autoryzacji i procesów, dlatego taki zakres traktujemy jak system webowy, nie zwykłą podstronę." },
      { question: "Czy integrujecie zewnętrzne API?", answer: "Tak, po weryfikacji dokumentacji, limitów, uwierzytelniania i zachowania systemu w sytuacjach błędowych." },
    ],
    related: ["strony-internetowe", "sklepy-internetowe", "modernizacja-stron"],
  },
  "modernizacja-stron": {
    slug: "modernizacja-stron",
    code: "WWW / MODERNIZE",
    eyebrow: "LEADFLOWAI / MODERNIZACJA STRON",
    title: "Modernizacja strony bez wyrzucania wartości, którą już zbudowała.",
    lead:
      "Audytujemy istniejący serwis, porządkujemy architekturę, redesignujemy UX/UI i migrujemy technologię z kontrolą adresów URL, widoczności i ryzyka regresji.",
    directAnswer:
      "Redesign nie powinien oznaczać przypadkowego skasowania starej struktury. Przed zmianą identyfikujemy wartościowe treści, adresy, dane i funkcje, a następnie projektujemy migrację tak, aby poprawić produkt bez niepotrzebnej utraty istniejących sygnałów i procesów.",
    capabilities: ["Audit", "Redesign", "Migration", "Redirects", "SEO preservation", "Performance", "Accessibility"],
    outcomes: [
      { title: "Lepszy produkt bez ślepego resetu", description: "Zachowujemy elementy, które nadal mają wartość, zamiast przebudowywać wszystko tylko dlatego, że projekt jest stary." },
      { title: "Kontrolowana migracja", description: "Mapa URL, redirecty i krytyczne integracje są częścią planu przed przełączeniem produkcji." },
      { title: "Nowy fundament techniczny", description: "Modernizacja może poprawić wydajność, dostępność, bezpieczeństwo i łatwość dalszego rozwoju." },
    ],
    deliverables: [
      { index: "01", title: "Inventory + audit", description: "Spis kluczowych URL-i, treści, funkcji, integracji i problemów technicznych istniejącej strony.", tags: ["Inventory", "SEO", "UX", "Tech"] },
      { index: "02", title: "Migration plan", description: "Decyzje co zostaje, co się zmienia, które adresy wymagają redirectów i jakie są krytyczne zależności.", tags: ["URLs", "Redirects", "Risk", "Dependencies"] },
      { index: "03", title: "Redesign + rebuild", description: "Nowy interfejs i implementacja zgodne z aktualnymi celami biznesowymi oraz standardami jakości.", tags: ["UX/UI", "Development", "Responsive", "WCAG"] },
      { index: "04", title: "Search preservation", description: "Kontrola indeksowalności, metadata, internal linking i migracji adresów istotnych dla obecnej widoczności.", tags: ["SEO", "Crawl", "Canonical", "Redirects"] },
      { index: "05", title: "Cutover + monitoring", description: "Kontrolowane przełączenie i obserwacja błędów, formularzy, indeksacji oraz wydajności po publikacji.", tags: ["Launch", "Monitoring", "QA", "CWV"] },
    ],
    process: [
      { title: "Audyt", description: "Ustalamy co obecna strona robi dobrze, co blokuje rozwój i co jest ryzykowne do zmiany." },
      { title: "Plan zachowania wartości", description: "Mapujemy treści, URL-e, dane i integracje." },
      { title: "Redesign + rebuild", description: "Projektujemy i implementujemy nowy serwis." },
      { title: "Migration QA", description: "Sprawdzamy redirecty, formularze, indeksowalność, mobile i krytyczne funkcje." },
      { title: "Monitorowanie", description: "Po publikacji obserwujemy zachowanie systemu i reagujemy na realne problemy." },
    ],
    faqs: [
      { question: "Czy podczas redesignu trzeba zmieniać wszystkie adresy URL?", answer: "Nie. Jeśli obecny adres jest sensowny i ma wartość, często lepiej go zachować. Zmiany URL powinny mieć konkretny powód i plan redirectów." },
      { question: "Czy modernizacja może dotyczyć tylko wydajności lub SEO?", answer: "Tak. Nie każdy projekt wymaga pełnego redesignu. Audyt pozwala dobrać zakres do rzeczywistych problemów." },
      { question: "Czy można przenieść stronę na inną technologię?", answer: "Tak, ale migracja technologii powinna uwzględniać dane, funkcje, URL-e, formularze, analitykę i zależności, nie tylko wygląd." },
    ],
    related: ["audyt-strony", "strony-internetowe", "web-development"],
  },
  "audyt-strony": {
    slug: "audyt-strony",
    code: "WWW / AUDIT",
    eyebrow: "LEADFLOWAI / AUDYT STRONY",
    title: "Audyt strony, który kończy się priorytetami, a nie listą przypadkowych uwag.",
    lead:
      "Analizujemy UX, SEO, AEO, GEO / AI Search, performance, accessibility, CRO, bezpieczeństwo i analitykę w zakresie istotnym dla danego serwisu.",
    directAnswer:
      "Audyt strony ma wartość wtedy, gdy odróżnia symptomy od przyczyn i porządkuje działania według wpływu oraz ryzyka. Wynik powinien wskazywać co jest nie tak, dlaczego ma znaczenie, jak to zweryfikowano i co warto zrobić najpierw.",
    capabilities: ["UX", "SEO", "AEO", "GEO", "CWV", "WCAG", "CRO", "Security"],
    outcomes: [
      { title: "Jedna mapa problemów", description: "Problemy techniczne, treściowe i konwersyjne są analizowane razem, dzięki czemu nie optymalizujemy jednego wskaźnika kosztem reszty." },
      { title: "Priorytety", description: "Wyniki są grupowane według wpływu, pilności, zależności i kosztu wdrożenia." },
      { title: "Podstawa decyzji", description: "Audyt może zakończyć się planem napraw, modernizacji albo decyzją, że pełna przebudowa nie jest potrzebna." },
    ],
    deliverables: [
      { index: "01", title: "Technical surface", description: "Indeksowalność, metadata, semantyka, wydajność, błędy, bezpieczeństwo i stan techniczny w zakresie możliwym do zweryfikowania.", tags: ["SEO", "CWV", "HTML", "Security"] },
      { index: "02", title: "Experience + conversion", description: "Hierarchia, mobile, dostępność, CTA, formularze i kluczowe ścieżki użytkownika.", tags: ["UX", "WCAG", "CRO", "Forms"] },
      { index: "03", title: "AEO / GEO readiness", description: "Czy treść, encje i struktura strony są jasne dla systemów odpowiedzi i generatywnego wyszukiwania bez obiecywania gwarantowanej widoczności.", tags: ["AEO", "GEO", "Entities", "Content"] },
      { index: "04", title: "Priority matrix", description: "Rekomendacje rozdzielone na krytyczne, wysokiego wpływu, rozwojowe i opcjonalne.", tags: ["Impact", "Risk", "Effort", "Roadmap"] },
    ],
    process: [
      { title: "Zakres", description: "Ustalamy cel audytu, typ strony i dostępne źródła danych." },
      { title: "Evidence", description: "Zbieramy obserwacje z kodu, narzędzi, zachowania strony i publicznych danych." },
      { title: "Analiza", description: "Łączymy problemy w przyczyny i zależności zamiast raportować każdy symptom oddzielnie." },
      { title: "Priorytety", description: "Układamy kolejność działań według wpływu i ryzyka." },
      { title: "Plan", description: "Wynik może zostać wykorzystany do samodzielnych poprawek lub osobnego etapu wdrożeniowego." },
    ],
    faqs: [
      { question: "Czy audyt oznacza, że później trzeba zlecić LeadFlowAI poprawki?", answer: "Nie. Audyt jest samodzielnym produktem. Możemy później wdrożyć rekomendacje, ale raport powinien być użyteczny również bez dalszego zlecenia." },
      { question: "Czy audyt obejmuje GEO i AEO?", answer: "Może obejmować, jeśli taki zakres jest potrzebny. Oceniamy strukturę odpowiedzi, jasność encji, dane publiczne i architekturę treści, ale nie obiecujemy gwarantowanego cytowania przez modele AI." },
      { question: "Czy każdy audyt ma taki sam zakres?", answer: "Nie. Sklep, landing page i serwis B2B mają inne ryzyka i cele. Zakres powinien być dopasowany do strony i decyzji, którą ma wspierać." },
    ],
    related: ["modernizacja-stron", "strony-internetowe", "landing-pages"],
  },
} as const satisfies Record<string, ServicePageData>;

export type ServiceSlug = keyof typeof servicePages;

export function getServicePage(slug: ServiceSlug): ServicePageData {
  return servicePages[slug];
}

export function getServiceMetadata(slug: ServiceSlug): Metadata {
  const page = servicePages[slug];
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

export const coreServiceLinks = [
  { slug: "strony-internetowe", label: "Strony internetowe" },
  { slug: "landing-pages", label: "Landing pages" },
  { slug: "sklepy-internetowe", label: "E-commerce" },
  { slug: "web-development", label: "Web development" },
  { slug: "modernizacja-stron", label: "Modernizacja" },
  { slug: "audyt-strony", label: "Audyt strony" },
] as const;
