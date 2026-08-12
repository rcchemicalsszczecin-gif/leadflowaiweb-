import { fallbackChatAnswer, localChatAnswer, parseChatPayload, providerSystemPrompt } from "@/lib/chat";

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 30;
const MAX_BODY_CHARS = 4_000;
const MAX_PROVIDER_RESPONSE_CHARS = 50_000;

type RateEntry = { count: number; resetAt: number };
const rateState = new Map<string, RateEntry>();

function json(body: Record<string, unknown>, status = 200, extraHeaders?: HeadersInit) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...extraHeaders,
    },
  });
}

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const host = forwardedHost || request.headers.get("host")?.trim();
  if (!origin || !host) return false;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function clientKey(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  return forwarded || realIp || null;
}

function rateLimited(key: string | null, now: number): boolean {
  if (!key) return false;

  if (rateState.size > 5000) {
    for (const [entryKey, entry] of rateState) {
      if (entry.resetAt <= now) rateState.delete(entryKey);
    }
  }

  const current = rateState.get(key);
  if (!current || current.resetAt <= now) {
    rateState.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > MAX_REQUESTS;
}

type ProviderConfig = {
  url: URL;
  token: string | null;
  model: string;
};

function providerConfig(): ProviderConfig | null {
  const raw = process.env.CHAT_PROVIDER_URL?.trim();
  if (!raw) return null;

  try {
    const url = new URL(raw);
    const localDevelopment = process.env.NODE_ENV !== "production" && ["localhost", "127.0.0.1"].includes(url.hostname);
    if (url.protocol !== "https:" && !localDevelopment) return null;

    return {
      url,
      token: process.env.CHAT_PROVIDER_TOKEN?.trim() || null,
      model: process.env.CHAT_PROVIDER_MODEL?.trim() || "default",
    };
  } catch {
    return null;
  }
}

function extractProviderAnswer(input: unknown): string | null {
  if (!input || typeof input !== "object") return null;
  const record = input as Record<string, unknown>;

  if (typeof record.answer === "string" && record.answer.trim()) return record.answer.trim();
  if (typeof record.output_text === "string" && record.output_text.trim()) return record.output_text.trim();

  const choices = Array.isArray(record.choices) ? record.choices : [];
  const first = choices[0];
  if (first && typeof first === "object") {
    const message = (first as Record<string, unknown>).message;
    if (message && typeof message === "object") {
      const content = (message as Record<string, unknown>).content;
      if (typeof content === "string" && content.trim()) return content.trim();
    }
  }

  return null;
}

async function providerAnswer(message: string): Promise<string | null> {
  const provider = providerConfig();
  if (!provider) return null;

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (provider.token) headers.Authorization = `Bearer ${provider.token}`;

  try {
    const response = await fetch(provider.url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: provider.model,
        messages: [
          { role: "system", content: providerSystemPrompt() },
          { role: "user", content: message },
        ],
        temperature: 0.2,
        max_tokens: 450,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) return null;

    const raw = await response.text();
    if (!raw || raw.length > MAX_PROVIDER_RESPONSE_CHARS) return null;

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return null;
    }

    return extractProviderAnswer(parsed);
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return json({ ok: false, code: "ORIGIN_REJECTED" }, 403);
  }

  const now = Date.now();
  if (rateLimited(clientKey(request), now)) {
    return json({ ok: false, code: "RATE_LIMITED" }, 429, { "Retry-After": "600" });
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return json({ ok: false, code: "UNSUPPORTED_CONTENT_TYPE" }, 415);
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return json({ ok: false, code: "INVALID_BODY" }, 400);
  }

  if (rawBody.length > MAX_BODY_CHARS) {
    return json({ ok: false, code: "PAYLOAD_TOO_LARGE" }, 413);
  }

  let input: unknown;
  try {
    input = JSON.parse(rawBody);
  } catch {
    return json({ ok: false, code: "INVALID_JSON" }, 400);
  }

  const parsed = parseChatPayload(input);
  if (!parsed.ok) {
    return json({ ok: false, code: "VALIDATION_FAILED", errors: parsed.errors }, 422);
  }

  const local = localChatAnswer(parsed.value.message);
  if (local) {
    return json({ ok: true, mode: "knowledge", answer: local });
  }

  const provider = await providerAnswer(parsed.value.message);
  if (provider) {
    return json({ ok: true, mode: "provider", answer: provider });
  }

  return json({ ok: true, mode: "fallback", answer: fallbackChatAnswer() });
}
