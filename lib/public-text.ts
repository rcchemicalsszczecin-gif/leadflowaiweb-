const REPLACEMENTS: readonly [RegExp, string][] = [
  [/\bcheckout \+ payments\b/gi, "koszyk, zamówienie i płatności"],
  [/\bbuild \+ integrations\b/gi, "wdrożenie i integracje"],
  [/\blaunch \+ rozwój\b/gi, "publikacja i rozwój"],
  [/\bdesign \+ build\b/gi, "projekt i wdrożenie"],
  [/\bsearch \+ data\b/gi, "widoczność i dane"],
  [/\bproduct data\b/gi, "dane produktowe"],
  [/\bsearch architecture\b/gi, "architektura widoczności"],
  [/\bdesign system\b/gi, "system projektowy"],
  [/\bweb development\b/gi, "programowanie webowe"],
  [/\bdevelopment\b/gi, "programowanie"],
  [/\bresponsive-first\b/gi, "od wersji responsywnej"],
  [/\bmobile-first\b/gi, "od wersji mobilnej"],
  [/\bwireframe\b/gi, "makieta"],
  [/\blanding pages?\b/gi, "strony kampanijne"],
  [/\bcampaign ux\b/gi, "UX kampanii"],
  [/\bmessage architecture\b/gi, "architektura komunikatu"],
  [/\bresponsive design\b/gi, "projekt responsywny"],
  [/\bfast build\b/gi, "lekkie wdrożenie"],
  [/\btracking\b/gi, "pomiar"],
  [/\bcommerce architecture\b/gi, "architektura sprzedaży"],
  [/\bproduct experience\b/gi, "doświadczenie produktu"],
  [/\bcheckout\b/gi, "proces zakupu"],
  [/\bpayments\b/gi, "płatności"],
  [/\bcatalog\b/gi, "katalog"],
  [/\bshipping\b/gi, "dostawa"],
  [/\bintegrations\b/gi, "integracje"],
  [/\bautomation\b/gi, "automatyzacja"],
  [/\bcustom\b/gi, "dedykowane"],
  [/\blaunch\b/gi, "publikacja"],
  [/\bbuild\b/gi, "wdrożenie"],
  [/\bvalidation\b/gi, "walidacja"],
  [/\bperformance\b/gi, "wydajność"],
  [/\bsecurity\b/gi, "bezpieczeństwo"],
  [/\baccessibility\b/gi, "dostępność"],
  [/\banalytics\b/gi, "analityka"],
  [/\bevents\b/gi, "zdarzenia"],
  [/\bfunnel\b/gi, "lejek"],
  [/\bforms\b/gi, "formularze"],
  [/\bsource of truth\b/gi, "źródło prawdy"],
  [/\bpublic truth\b/gi, "publiczna prawda"],
  [/\bstructured data\b/gi, "dane strukturalne"],
  [/\btechnical seo\b/gi, "SEO techniczne"],
  [/\binternal linking\b/gi, "linkowanie wewnętrzne"],
  [/\bcontent architecture\b/gi, "architektura treści"],
];

export function publicText(value: string) {
  let result = value;
  for (const [pattern, replacement] of REPLACEMENTS) {
    result = result.replace(pattern, replacement);
  }
  return result;
}
