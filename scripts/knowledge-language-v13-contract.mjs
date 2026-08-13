import { existsSync, readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`KNOWLEDGE_LANGUAGE_V13_FAIL: ${message}`);
  process.exit(1);
};

const read = (path) => {
  if (!existsSync(path)) fail(`missing ${path}`);
  return readFileSync(path, "utf8");
};

const page = read("app/wiedza/[slug]/page.tsx");
const adapter = read("lib/public-knowledge-article.ts");
const publicText = read("lib/public-text.ts");
const editorial = read("lib/knowledge-editorial-v13.ts");
const schema = read("lib/structured-data.ts");

if (!page.includes("toPublicKnowledgeArticle(sourceArticle)")) fail("knowledge route bypasses public article adapter");
if (!page.includes("getArticleStructuredData(article)")) fail("Article JSON-LD does not use public article model");
if (!adapter.includes('MIGRATION: "MIGRACJA"')) fail("editorial migration label is not translated");
for (const required of ["publicKnowledgeEyebrow", "publicText(article.title)", "section.paragraphs.map(publicText)", "mergeKnowledgeSources(article.slug, article.sources)"]) {
  if (!adapter.includes(required)) fail(`knowledge adapter invariant missing: ${required}`);
}
for (const required of ["dane rzeczywiste", "zewnętrzne usługi", "zaplecze serwerowe", "tryb awaryjny", "obszar widoku"]) {
  if (!publicText.includes(required)) fail(`editorial terminology mapping missing: ${required}`);
}
for (const required of ["Redakcja:", "Zweryfikowano:", "getKnowledgeMethodology", "modifiedTime: knowledgeEditorialV13.reviewedAt"]) {
  if (!page.includes(required)) fail(`knowledge editorial UI/metadata missing: ${required}`);
}
for (const required of ["Redakcja LeadFlowAI / Tervyxa Systems", 'reviewedAt: "2026-08-13"', "mergeKnowledgeSources", "Google Search Central", "OWASP", "RFC 9110", "Retrieval-Augmented Generation"]) {
  if (!editorial.includes(required)) fail(`editorial/source layer missing: ${required}`);
}
if (!schema.includes("dateModified: knowledgeEditorialV13.reviewedAt")) fail("truthful knowledge review date missing from schema");
if (schema.includes("datePublished")) fail("datePublished must remain absent until a real publication date exists");

console.log("KNOWLEDGE_LANGUAGE_V13_PASS metadata=PL ui=PL schema=PL eyebrow=PL editorial=REVIEWED sources=PRIMARY_LAYER dateModified=TRUTHFUL datePublished=ABSENT");
