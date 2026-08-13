export const projectTypes = [
  "strona-firmowa",
  "landing-page",
  "e-commerce",
  "modernizacja",
  "web-development",
  "audyt",
  "seo-aeo-geo",
  "inne",
] as const;

export const budgetRanges = ["nie-wiem", "do-3000", "3000-6000", "6000-12000", "12000-plus"] as const;

export type ProjectType = (typeof projectTypes)[number];
export type BudgetRange = (typeof budgetRanges)[number];

export type LeadPayload = {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: ProjectType;
  currentUrl: string;
  goal: string;
  scope: string;
  budget: BudgetRange;
  deadline: string;
  contactPermission: true;
  startedAt: number;
};

type ParseResult =
  | { ok: true; value: LeadPayload }
  | { ok: false; errors: Record<string, string> };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanString(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function isAllowedUrl(value: string): boolean {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export function parseLeadPayload(input: unknown): ParseResult {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { ok: false, errors: { form: "Nieprawidłowe dane formularza." } };
  }

  const raw = input as Record<string, unknown>;
  const errors: Record<string, string> = {};
  const honeypot = cleanString(raw.website, 200);

  if (honeypot) {
    return { ok: false, errors: { form: "Nieprawidłowe dane formularza." } };
  }

  const name = cleanString(raw.name, 100);
  const email = cleanString(raw.email, 254).toLowerCase();
  const phone = cleanString(raw.phone, 50);
  const company = cleanString(raw.company, 120);
  const projectType = cleanString(raw.projectType, 50) as ProjectType;
  const currentUrl = cleanString(raw.currentUrl, 500);
  const goal = cleanString(raw.goal, 2000);
  const scope = cleanString(raw.scope, 2500);
  const budget = cleanString(raw.budget, 30) as BudgetRange;
  const deadline = cleanString(raw.deadline, 120);
  const contactPermission = raw.contactPermission === true;
  const startedAt = typeof raw.startedAt === "number" ? raw.startedAt : Number(raw.startedAt);

  if (name.length < 2) errors.name = "Podaj imię lub nazwę kontaktową.";
  if (!emailPattern.test(email) || email.length > 254) errors.email = "Podaj poprawny adres e-mail.";
  if (!projectTypes.includes(projectType)) errors.projectType = "Wybierz rodzaj projektu.";
  if (goal.length < 20) errors.goal = "Opisz cel projektu nieco dokładniej (minimum 20 znaków).";
  if (!budgetRanges.includes(budget)) errors.budget = "Wybierz orientacyjny budżet lub opcję „nie wiem”.";
  if (currentUrl && !isAllowedUrl(currentUrl)) errors.currentUrl = "Podaj pełny adres zaczynający się od http:// lub https://.";
  if (!contactPermission) errors.contactPermission = "Potwierdź zgodę na użycie danych do odpowiedzi na zapytanie.";
  if (!Number.isFinite(startedAt) || startedAt <= 0) errors.form = "Odśwież formularz i spróbuj ponownie.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    value: {
      name,
      email,
      phone,
      company,
      projectType,
      currentUrl,
      goal,
      scope,
      budget,
      deadline,
      contactPermission: true,
      startedAt,
    },
  };
}
