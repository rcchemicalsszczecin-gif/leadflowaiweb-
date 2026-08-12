import { parseLeadPayload } from "@/lib/lead";
import { site } from "@/lib/site";

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MIN_FILL_TIME_MS = 1200;
const MAX_FORM_AGE_MS = 2 * 60 * 60 * 1000;
const MAX_BODY_CHARS = 20_000;

type RateEntry = { count: number; resetAt: number };
const rateState = new Map<string, RateEntry>();

function json(body: Record<string, unknown>, status: number, extraHeaders?: HeadersInit) {
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

function webhookConfig(): { url: URL; token: string | null } | null {
  const raw = process.env.LEAD_WEBHOOK_URL?.trim();
  if (!raw) return null;

  try {
    const url = new URL(raw);
    const localDevelopment = process.env.NODE_ENV !== "production" && ["localhost", "127.0.0.1"].includes(url.hostname);
    if (url.protocol !== "https:" && !localDevelopment) return null;
    return { url, token: process.env.LEAD_WEBHOOK_TOKEN?.trim() || null };
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return json({ ok: false, code: "ORIGIN_REJECTED" }, 403);
  }

  const now = Date.now();
  const key = clientKey(request);
  if (rateLimited(key, now)) {
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

  const parsed = parseLeadPayload(input);
  if (!parsed.ok) {
    return json({ ok: false, code: "VALIDATION_FAILED", errors: parsed.errors }, 422);
  }

  const elapsed = now - parsed.value.startedAt;
  if (elapsed < MIN_FILL_TIME_MS || elapsed > MAX_FORM_AGE_MS) {
    return json({ ok: false, code: "FORM_TIMING_REJECTED" }, 422);
  }

  const webhook = webhookConfig();
  if (!webhook) {
    return json(
      {
        ok: false,
        code: "DELIVERY_UNCONFIGURED",
        fallbackEmail: site.email,
      },
      503,
    );
  }

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (webhook.token) headers.Authorization = `Bearer ${webhook.token}`;

  const outbound = {
    source: "leadflowai.pl",
    submittedAt: new Date(now).toISOString(),
    lead: {
      name: parsed.value.name,
      email: parsed.value.email,
      phone: parsed.value.phone,
      company: parsed.value.company,
      projectType: parsed.value.projectType,
      currentUrl: parsed.value.currentUrl,
      goal: parsed.value.goal,
      scope: parsed.value.scope,
      budget: parsed.value.budget,
      deadline: parsed.value.deadline,
      contactPermission: parsed.value.contactPermission,
    },
  };

  try {
    const response = await fetch(webhook.url, {
      method: "POST",
      headers,
      body: JSON.stringify(outbound),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      return json({ ok: false, code: "DELIVERY_FAILED", fallbackEmail: site.email }, 502);
    }
  } catch {
    return json({ ok: false, code: "DELIVERY_FAILED", fallbackEmail: site.email }, 502);
  }

  return json({ ok: true, code: "ACCEPTED" }, 202);
}
