const DEFAULT_API_BASE_URL = "https://api.leadflowai.pl";

export const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/+$/, "");

export function apiUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${apiBaseUrl}${normalized}`;
}
