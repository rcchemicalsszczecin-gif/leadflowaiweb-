const REPLACEMENTS: readonly [RegExp, string][] = [
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
  [/\bintegrations\b/gi, "integracje"],
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
];

export function publicText(value: string) {
  let result = value;
  for (const [pattern, replacement] of REPLACEMENTS) {
    result = result.replace(pattern, replacement);
  }
  return result;
}
