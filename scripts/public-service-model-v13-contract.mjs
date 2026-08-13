import { readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`PUBLIC_SERVICE_MODEL_V13_FAIL: ${message}`);
  process.exit(1);
};

const renderer = readFileSync("components/service-page.tsx", "utf8");
const adapter = readFileSync("lib/public-service-page.ts", "utf8");
const text = readFileSync("lib/public-text.ts", "utf8");

for (const required of ["toPublicServicePage(page)", "getPageStructuredData(publicPage)"]) {
  if (!renderer.includes(required)) fail(`renderer missing ${required}`);
}

for (const required of ["capabilities: page.capabilities.map(publicTaxonomy)", "tags: item.tags.map(publicTaxonomy)", "description: publicText(item.description)"]) {
  if (!adapter.includes(required)) fail(`adapter missing ${required}`);
}

for (const required of ["search architecture", "development", "landing pages?", "checkout", "structured data", "internal linking", "question architecture", "local intent"]) {
  if (!text.toLowerCase().includes(required)) fail(`public text map missing ${required}`);
}

console.log("PUBLIC_SERVICE_MODEL_V13_PASS renderer=NORMALIZED schema=NORMALIZED taxonomy=PL descriptions=PL");
