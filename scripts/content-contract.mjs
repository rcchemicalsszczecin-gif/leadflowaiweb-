import { existsSync, readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`CONTENT_CONTRACT_FAIL: ${message}`);
  process.exit(1);
};
const read = (path) => {
  if (!existsSync(path)) fail(`missing ${path}`);
  return readFileSync(path, "utf8");
};

const portfolioPage = read("app/realizacje/page.tsx");
const portfolioData = read("lib/portfolio.ts");
const knowledgeCore = read("lib/knowledge.ts");
const knowledgeExpanded = read("lib/knowledge-expanded.ts");
const knowledgeRegistry = read("lib/knowledge-registry.ts");
const knowledgeIndex = read("app/wiedza/page.tsx");
const knowledgeArticle = read("app/wiedza/[slug]/page.tsx");
const schema = read("lib/structured-data.ts");
const sitemap = read("app/sitemap.ts");
const footer = read("components/site-footer.tsx");

for (const phrase of ["portfolioCases", "Realne projekty", "Dowód przed deklaracją"]) {
  if (!portfolioPage.includes(phrase)) fail(`portfolio page missing ${phrase}`);
}
for (const phrase of [
  "LeadFlowAI.pl",
  "TranskrypcjaAI.pl",
  "Tervyxa.pl",
  "PROJEKT WŁASNY",
  "publiczne przesyłanie plików wyłączone",
  "DEKLARACJA → DOWÓD → WERYFIKACJA → STATUS PUBLICZNY",
]) {
  if (!portfolioData.includes(phrase)) fail(`portfolio data missing ${phrase}`);
}
if (!portfolioPage.includes("projektami własnymi ekosystemu Tervyxa Systems")) fail("portfolio own-project disclosure missing");
if (!portfolioPage.includes("nie przedstawiamy ich jako zewnętrznych realizacji klientów")) fail("portfolio client-case disclaimer missing");

const coreCount = [...knowledgeCore.matchAll(/slug: "([^"]+)"/g)].length;
const expandedCount = [...knowledgeExpanded.matchAll(/slug: "([^"]+)"/g)].length;
const totalKnowledge = coreCount + expandedCount;
if (coreCount !== 4 || expandedCount < 16 || totalKnowledge < 20) fail("knowledge inventory too small");
if (!knowledgeRegistry.includes("coreKnowledgeArticles") || !knowledgeRegistry.includes("expandedKnowledgeArticles")) fail("knowledge registry incomplete");
if (!knowledgeIndex.includes("knowledge-registry")) fail("knowledge index incomplete");
if (!knowledgeArticle.includes("generateStaticParams") || !knowledgeArticle.includes("getArticleStructuredData") || !knowledgeArticle.includes("Źródła i standardy")) fail("knowledge article route incomplete");
if (!schema.includes('"@type": "Article"')) fail("Article schema missing");
if (!sitemap.includes("knowledge-registry") || !sitemap.includes('"realizacje"') || !sitemap.includes('"wiedza"')) fail("content sitemap incomplete");
if (!footer.includes('href="/realizacje"') || !footer.includes('href="/wiedza"')) fail("content discovery links missing");

console.log(`CONTENT_CONTRACT_PASS portfolio=3_REAL_OWN_PROJECTS transkrypcja-upload=OFF knowledge=${totalKnowledge} sources=SUPPORTED schema=PASS sitemap=PASS language=PL`);
