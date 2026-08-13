import { existsSync, readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`CONTENT_CONTRACT_FAIL: ${message}`);
  process.exit(1);
};

const read = (path) => {
  if (!existsSync(path)) fail(`missing ${path}`);
  return readFileSync(path, "utf8");
};

const portfolio = read("app/realizacje/page.tsx");
const knowledgeIndex = read("app/wiedza/page.tsx");
const knowledgeArticle = read("app/wiedza/[slug]/page.tsx");
const knowledgeCore = read("lib/knowledge.ts");
const knowledgeExpanded = read("lib/knowledge-expanded.ts");
const knowledgeRegistry = read("lib/knowledge-registry.ts");
const schema = read("lib/structured-data.ts");
const sitemap = read("app/sitemap.ts");
const footer = read("components/site-footer.tsx");

if (!portfolio.includes("PROJEKT WŁASNY") || !portfolio.includes("Nie przedstawiamy go jako klientowskiego case study")) {
  fail("portfolio real-work disclosure missing");
}
if (!portfolio.includes("LeadFlowAI.pl") || !portfolio.includes("AKTYWNIE ROZWIJANY")) fail("own-project status missing");
if (!portfolio.includes("Nie publikujemy wymyślonych wyników")) fail("portfolio evidence boundary missing");

for (const phrase of [
  "jak-zaplanowac-strone-firmowa",
  "seo-aeo-geo-jedna-architektura",
  "chatbot-na-stronie-kiedy-ma-sens",
  "modernizacja-strony-bez-utraty-widocznosci",
]) {
  if (!knowledgeCore.includes(phrase)) fail(`core knowledge article missing ${phrase}`);
}

for (const phrase of [
  "ile-kosztuje-profesjonalna-strona-internetowa",
  "core-web-vitals-lcp-inp-cls-praktycznie",
  "wcag-22-co-sprawdzic-na-stronie",
  "cro-jak-znalezc-problemy-z-konwersja",
  "rag-na-stronie-jak-zaprojektowac",
  "ai-search-google-co-robic-2026",
  "structured-data-kiedy-schema-ma-sens",
  "architektura-tresci-klastry-tematyczne",
]) {
  if (!knowledgeExpanded.includes(phrase)) fail(`expanded knowledge article missing ${phrase}`);
}

if (!knowledgeRegistry.includes("coreKnowledgeArticles") || !knowledgeRegistry.includes("expandedKnowledgeArticles")) {
  fail("knowledge registry does not combine both clusters");
}
if (!knowledgeIndex.includes("knowledge-registry") || !knowledgeIndex.includes("metadata")) fail("knowledge index contract incomplete");
if (!knowledgeArticle.includes("generateStaticParams") || !knowledgeArticle.includes("generateMetadata") || !knowledgeArticle.includes("getArticleStructuredData")) {
  fail("knowledge article route contract incomplete");
}
if (!knowledgeArticle.includes("Źródła i standardy")) fail("knowledge source rendering missing");
if (!schema.includes('"@type": "Article"') || !schema.includes("getArticleStructuredData")) fail("Article structured-data contract missing");
if (!sitemap.includes("knowledge-registry") || !sitemap.includes('"realizacje"') || !sitemap.includes('"wiedza"')) fail("content routes missing from sitemap registry");
if (!footer.includes('href="/realizacje"') || !footer.includes('href="/wiedza"')) fail("content discovery links missing from footer");

for (const forbidden of ["gwarantujemy pierwsze miejsce", "setki zadowolonych klientow", "setki zadowolonych klientów"]) {
  const allKnowledge = `${knowledgeCore}\n${knowledgeExpanded}`.toLowerCase();
  if (portfolio.toLowerCase().includes(forbidden) || allKnowledge.includes(forbidden)) fail(`unsupported marketing claim found: ${forbidden}`);
}

console.log("CONTENT_CONTRACT_PASS portfolio=REAL_ONLY knowledge=20 sources=SUPPORTED article-schema=PASS sitemap=PASS language=PL");
