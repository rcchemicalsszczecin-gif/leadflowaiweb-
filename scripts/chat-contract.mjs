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
const knowledge = read("lib/chat.ts");
const runtime = read("lib/runtime.ts");
const site = read("lib/site.ts");
const layout = read("app/layout.tsx");
const env = read(".env.example");
const boundary = read("docs/architecture/LOCAL-API-BOUNDARY.md");

if (!component.includes('apiUrl("/chat")') || !component.includes("Zapytaj LeadFlowAI")) fail("assistant UI/external endpoint contract missing");
if (!component.includes("site.email")) fail("assistant public contact fallback missing");
if (!knowledge.includes("Nie wymyślaj cen") || !knowledge.includes("Tervyxa Systems sp. z o.o.") || !knowledge.includes("site.email")) fail("public-truth guardrails missing");
if (!runtime.includes('https://api.leadflowai.pl') || !env.includes("NEXT_PUBLIC_API_BASE_URL=https://api.leadflowai.pl")) fail("public API origin mismatch");
if (!site.includes('email: "kontakt@leadflowai.pl"')) fail("public contact source of truth mismatch");
if (!layout.includes("SiteAssistant") || !layout.includes("chat.css")) fail("global assistant integration missing");
if (env.includes("CHAT_PROVIDER_TOKEN") || env.includes("CHAT_PROVIDER_URL")) fail("server chat secrets must not live in frontend env template");
if (!boundary.includes("POST /chat") || !boundary.includes("local AI") || !boundary.includes("Cloudflare Tunnel")) fail("local chat backend boundary incomplete");
if (existsSync("app/api/chat/route.ts")) fail("dynamic chat Route Handler must not remain in GitHub Pages frontend");

console.log("CHAT_CONTRACT_PASS ui=PASS external-api=PASS public-truth=PASS local-ai=PENDING");
