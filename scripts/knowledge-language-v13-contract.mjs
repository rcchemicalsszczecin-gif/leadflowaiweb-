import { existsSync, readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`KNOWLEDGE_LANGUAGE_V15_FAIL: ${message}`);
  process.exit(1);
};

const read = (path) => {
  if (!existsSync(path)) fail(`missing ${path}`);
  return readFileSync(path, "utf8");
};

const indexPage = read("app/wiedza/page.tsx");
const page = read("app/wiedza/[slug]/page.tsx");
const adapter = read("lib/public-knowledge-article.ts");
const publicText = read("lib/public-text.ts");
const editorial = read("lib/knowledge-editorial-v13.ts");
const overrides = read("lib/knowledge-v15-overrides.ts");
const registry = read("lib/knowledge-registry.ts");
const schema = read("lib/structured-data.ts");

for (const source of [indexPage, page]) {
  for (const required of ["V14RouteSiteHeader", "V14SiteFooter", 'id="main-content"', "tabIndex={-1}"]) {
    if (!source.includes(required)) fail(`knowledge V14 shell invariant missing: ${required}`);
  }
  if (source.includes("<SiteHeader") || source.includes("<SiteFooter")) fail("legacy knowledge shell still mounted");
}

if (!page.includes("toPublicKnowledgeArticle(sourceArticle)")) fail("knowledge route bypasses public article adapter");
if (!page.includes("getArticleStructuredData(article)")) fail("Article JSON-LD does not use public article model");
if (!adapter.includes('MIGRATION: "MIGRACJA"')) fail("editorial migration label is not translated");
for (const required of [
  "publicKnowledgeEyebrow",
  "publicText(article.title)",
  "section.paragraphs.map(publicText)",
  "mergeKnowledgeSources(article.slug, article.sources)",
  "<T extends SourcedKnowledgeArticle>",
]) {
  if (!adapter.includes(required)) fail(`knowledge adapter invariant missing: ${required}`);
}
for (const required of ["dane rzeczywiste", "zewnętrzne usługi", "zaplecze serwerowe", "tryb awaryjny", "obszar widoku"]) {
  if (!publicText.includes(required)) fail(`editorial terminology mapping missing: ${required}`);
}
for (const required of [
  "Redakcja:",
  "Zweryfikowano:",
  "getKnowledgeMethodology",
  "const reviewedAt = article.reviewedAt ?? knowledgeEditorialV13.reviewedAt",
  "modifiedTime: reviewedAt",
  "const reviewedLabel = article.reviewedLabel ?? knowledgeEditorialV13.reviewedLabel",
  "generateStaticParams",
]) {
  if (!page.includes(required)) fail(`knowledge editorial UI/metadata/static-generation missing: ${required}`);
}
for (const required of [
  "Redakcja LeadFlowAI / Tervyxa Systems",
  'reviewedAt: "2026-08-13"',
  "mergeKnowledgeSources",
  "Google Search Central",
  "OWASP",
  "RFC 9110",
  "Retrieval-Augmented Generation",
]) {
  if (!editorial.includes(required)) fail(`editorial/source layer missing: ${required}`);
}

for (const required of [
  'article.slug !== "ai-search-google-co-robic-2026"',
  'reviewedAt: "2026-08-14"',
  'reviewedLabel: "14.08.2026"',
  "Google Search Console — Raport skuteczności generatywnej AI",
]) {
  if (!overrides.includes(required)) fail(`V15 article-specific review/source invariant missing: ${required}`);
}
if (!registry.includes("applyV15KnowledgeOverride(article)")) {
  fail("knowledge registry does not apply V15 article-specific truth override");
}
for (const required of [
  "type StructuredKnowledgeArticle = KnowledgeArticle &",
  "reviewedAt?: string",
  "const dateModified = article.reviewedAt ?? knowledgeEditorialV13.reviewedAt",
  "dateModified,",
]) {
  if (!schema.includes(required)) fail(`truthful per-article schema date invariant missing: ${required}`);
}
if (schema.includes("datePublished")) fail("datePublished must remain absent until a real publication date exists");

console.log(
  "KNOWLEDGE_LANGUAGE_V15_PASS shell=V14 articles=STATIC metadata=PL ui=PL schema=PL eyebrow=PL editorial=REVIEWED sources=PRIMARY_LAYER default-review=2026-08-13 per-article-review=SUPPORTED ai-search-review=2026-08-14 dateModified=TRUTHFUL datePublished=ABSENT",
);
