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
const commercialOffer = read("app/page.tsx") + read("components/v14-services.tsx");

for (const forbidden of ["fetch(", "XMLHttpRequest", "apiUrl(", "localStorage", "sessionStorage", "document.cookie"]) {
  if (component.includes(forbidden)) fail(`dormant assistant crossed network/storage boundary: ${forbidden}`);
}
for (const required of ["Publiczny czat jest obecnie wyłączony", "Brak zapisu danych", "brak połączenia sieciowego", "site.email", "mailto:"]) {
  if (!component.includes(required)) fail(`dormant assistant safe-state invariant missing: ${required}`);
}
if (!knowledge.includes("Nie wymyślaj cen") || !knowledge.includes("Tervyxa Systems sp. z o.o.") || !knowledge.includes("site.email")) fail("future public-truth guardrails missing");
if (!runtime.includes('https://api.leadflowai.pl') || !env.includes("NEXT_PUBLIC_API_BASE_URL=https://api.leadflowai.pl")) fail("future public API origin mismatch");
if (!site.includes('email: "kontakt@leadflowai.pl"')) fail("public contact source of truth mismatch");
if (layout.includes("SiteAssistant") || layout.includes("chat.css")) fail("public chatbot must remain disabled until Owner configuration decision");
if (!commercialOffer.includes("Chatbot") && !commercialOffer.includes("chatbot")) fail("chatbot must remain represented in the commercial offer");
if (env.includes("CHAT_PROVIDER_TOKEN") || env.includes("CHAT_PROVIDER_URL")) fail("server chat secrets must not live in frontend env template");
if (!boundary.includes("POST /chat") || !boundary.includes("local AI") || !boundary.includes("Cloudflare Tunnel")) fail("future local chat backend boundary incomplete");
if (existsSync("app/api/chat/route.ts")) fail("dynamic chat Route Handler must not remain in GitHub Pages frontend");

console.log("CHAT_CONTRACT_PASS offer=YES public-ui=OFF dormant-code=NETWORK_OFF local-ai=FUTURE_BOUNDARY_ONLY");
