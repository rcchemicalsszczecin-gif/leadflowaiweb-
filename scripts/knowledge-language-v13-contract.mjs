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

if (!page.includes("toPublicKnowledgeArticle(sourceArticle)")) fail("knowledge route bypasses public article adapter");
if (!page.includes("getArticleStructuredData(article)")) fail("Article JSON-LD does not use public article model");
if (!adapter.includes('MIGRATION: "MIGRACJA"')) fail("editorial migration label is not translated");
for (const required of ["publicKnowledgeEyebrow", "publicText(article.title)", "section.paragraphs.map(publicText)"]) {
  if (!adapter.includes(required)) fail(`knowledge adapter invariant missing: ${required}`);
}
for (const required of ["dane rzeczywiste", "zewnętrzne usługi", "zaplecze serwerowe", "tryb awaryjny", "obszar widoku"]) {
  if (!publicText.includes(required)) fail(`editorial terminology mapping missing: ${required}`);
}

console.log("KNOWLEDGE_LANGUAGE_V13_PASS metadata=PL ui=PL schema=PL eyebrow=PL editorial=PL");
