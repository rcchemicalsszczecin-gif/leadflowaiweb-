import { site } from "@/lib/site";

export type ChatMode = "knowledge" | "provider" | "fallback";

export type ParsedChat = {
  message: string;
};

export type ChatParseResult =
  | { ok: true; value: ParsedChat }
  | { ok: false; errors: string[] };

const normalize = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l");

const knowledge = [
  {
    keys: ["strona", "www", "firmowa", "website"],
    answer:
      "Tak. LeadFlowAI projektuje i buduje strony firmowe oraz serwisy usługowe od architektury informacji i UX/UI po development, SEO/AEO/GEO, analitykę i dalsze utrzymanie. Jeśli chcesz, możesz od razu przejść do formularza wyceny na /kontakt.",
  },
  {
    keys: ["landing", "kampania"],
    answer:
      "Landing page projektujemy pod jeden konkretny cel: lead, sprzedaż, zapis albo kampanię. Zakres może obejmować copy structure, CRO, tracking, formularz, integracje i wydajność. Szczegóły są na /landing-pages.",
  },
  {
    keys: ["sklep", "ecommerce", "e-commerce", "woocommerce", "shop"],
    answer:
      "Tak. LeadFlowAI buduje sklepy i serwisy e-commerce z naciskiem na architekturę kategorii i produktów, checkout, płatności, integracje, analitykę, performance i SEO. Szczegóły są na /sklepy-internetowe.",
  },
  {
    keys: ["seo", "aeo", "geo", "ai search", "widocznosc", "google"],
    answer:
      "SEO, AEO i GEO / AI Search traktujemy jako połączone warstwy jednej architektury. Budujemy techniczne SEO, semantykę, structured data, direct-answer content i spójny public truth. Nie obiecujemy gwarantowanej pozycji w Google ani cytowania przez systemy AI. Zobacz /seo-aeo-geo.",
  },
  {
    keys: ["chatbot", "rag", "asystent", "bot"],
    answer:
      "Chatbot jest opcjonalną warstwą strony, nie zamiennikiem dobrego UX. Może odpowiadać na pytania, kwalifikować zapytania, korzystać z kontrolowanej bazy wiedzy albo łączyć się z backendem/RAG. Zakres dobieramy do realnego celu biznesowego.",
  },
  {
    keys: ["modernizacja", "redesign", "stara strona", "migracja"],
    answer:
      "Możemy przeprowadzić audyt, redesign, modernizację albo migrację istniejącej strony. Przy migracji planujemy zachowanie wartościowych adresów URL, redirecty, crawl/indexation i kontrolę regresji. Zobacz /modernizacja-stron.",
  },
  {
    keys: ["audyt", "audit"],
    answer:
      "Audyt może objąć UX/UI, techniczne SEO, AEO/GEO, Core Web Vitals, accessibility, security, CRO i analitykę. Wynikiem jest lista problemów, priorytetów i rekomendowanych działań. Zobacz /audyt-strony.",
  },
  {
    keys: ["cena", "koszt", "ile kosztuje", "wycena", "budzet"],
    answer:
      `Nie publikujemy fikcyjnego cennika bez znajomości zakresu. Cena zależy m.in. od typu strony, liczby widoków, contentu, integracji, e-commerce i funkcji AI. Najszybciej wyślesz brief przez /kontakt albo napiszesz na ${site.email}.`,
  },
  {
    keys: ["kontakt", "email", "mail", "napisac", "napisać"],
    answer: `Kontakt do LeadFlowAI: ${site.email}. Możesz też skorzystać z formularza na /kontakt.`,
  },
  {
    keys: ["tervyxa", "firma", "operator", "spolka", "spółka"],
    answer:
      "LeadFlowAI jest marką web-production należącą do Tervyxa Systems sp. z o.o. Tervyxa Systems jest podmiotem prawnym/operatoriem, a leadflowai.pl jest wyspecjalizowaną marką i serwisem WWW.",
  },
] as const;

export function parseChatPayload(input: unknown): ChatParseResult {
  if (!input || typeof input !== "object") {
    return { ok: false, errors: ["Nieprawidłowe dane wejściowe."] };
  }

  const record = input as Record<string, unknown>;
  const message = typeof record.message === "string" ? record.message.trim() : "";
  const errors: string[] = [];

  if (message.length < 2) errors.push("Wiadomość jest za krótka.");
  if (message.length > 1000) errors.push("Wiadomość jest za długa.");

  if (errors.length > 0) return { ok: false, errors };
  return { ok: true, value: { message } };
}

export function localChatAnswer(message: string): string | null {
  const normalized = normalize(message);
  const item = knowledge.find((entry) => entry.keys.some((key) => normalized.includes(normalize(key))));
  return item?.answer ?? null;
}

export function providerSystemPrompt(): string {
  return [
    "Jesteś asystentem strony LeadFlowAI.pl.",
    "Odpowiadasz wyłącznie na pytania związane z ofertą stron WWW, web developmentem, SEO, AEO, GEO / AI Search, CRO, chatbotami, integracjami i utrzymaniem WWW.",
    "Publiczna marka: LeadFlowAI.",
    "Operator prawny: Tervyxa Systems sp. z o.o.",
    `Publiczny kontakt: ${site.email}.`,
    "Nie wymyślaj cen, terminów, klientów, case studies, wyników, rankingów, certyfikatów ani danych rejestrowych.",
    "Nie obiecuj gwarantowanych pozycji Google ani rekomendacji/cytowań przez systemy AI.",
    "Jeżeli brakuje zatwierdzonej informacji, powiedz to wprost i skieruj do /kontakt.",
    "Odpowiadaj zwięźle po polsku, chyba że użytkownik wyraźnie pisze w innym języku.",
  ].join("\n");
}

export function fallbackChatAnswer(): string {
  return `Nie mam jeszcze zatwierdzonej odpowiedzi na to pytanie. Opisz projekt na /kontakt albo napisz na ${site.email} — wtedy odpowiemy na podstawie konkretnego zakresu.`;
}
