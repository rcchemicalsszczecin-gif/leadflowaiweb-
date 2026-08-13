const terms: Record<string, string> = {
  CREATE: "PROJEKT I BUDOWA",
  DISCOVER: "WIDOCZNOŚĆ",
  CONVERT: "KONWERSJA",
  INTELLIGENCE: "INTELIGENCJA",
  CONNECT: "INTEGRACJE",
  CARE: "OPIEKA",
};

export function publicLabel(value: string): string {
  return terms[value] ?? value;
}

export function publicCode(value: string): string {
  return value.split(" / ").map((part) => terms[part] ?? part).join(" / ");
}
