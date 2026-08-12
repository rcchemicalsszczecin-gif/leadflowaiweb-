import { existsSync, readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`CHAT_CONTRACT_FAIL: ${message}`);
  process.exit(1);
};

const read = (path) => {
  if (!existsSync(path)) fail(`missing ${path}`);
  return readFileSync(path, "utf8");
};

const component = read("components/site-assistant.tsx");
const route = read("app/api/chat/route.ts");
const knowledge = read("lib/chat.ts");
const layout = read("app/layout.tsx");
const env = read(".env.example");

if (!component.includes('fetch("/api/chat"') || !component.includes("Zapytaj LeadFlowAI")) fail("assistant UI/endpoint contract missing");
if (!component.includes("kontakt@leadflowai.pl") && !component.includes("site.email")) fail("assistant public contact fallback missing");

for (const token of ["sameOrigin", "rateLimited", "parseChatPayload", "localChatAnswer", "providerAnswer", "CHAT_PROVIDER_URL", "CHAT_PROVIDER_TOKEN", "CHAT_PROVIDER_MODEL", "MAX_BODY_CHARS"]) {
  if (!route.includes(token)) fail(`chat route missing ${token}`);
}

if (route.includes("console.log") || route.includes("console.error")) fail("chat route must not log user messages");
if (!knowledge.includes("Nie wymyślaj cen") || !knowledge.includes("Tervyxa Systems sp. z o.o.") || !knowledge.includes("kontakt@leadflowai.pl")) fail("public-truth guardrails missing");
if (!layout.includes("SiteAssistant") || !layout.includes("chat.css")) fail("global assistant integration missing");
if (!env.includes("CHAT_PROVIDER_URL=") || !env.includes("CHAT_PROVIDER_TOKEN=") || !env.includes("CHAT_PROVIDER_MODEL=")) fail("server chat env template missing");
if (env.includes("NEXT_PUBLIC_CHAT_PROVIDER")) fail("chat provider secret exposed as public env");

console.log("CHAT_CONTRACT_PASS ui=PASS local-knowledge=PASS provider-adapter=PASS public-truth=PASS");
