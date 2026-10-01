import { existsSync, readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`V15_LOCAL_INTENT_FAIL: ${message}`);
  process.exit(1);
};

const read = (path) => {
  if (!existsSync(path)) fail(`missing ${path}`);
  return readFileSync(path, "utf8");
};

const websiteHtml = read("out/strony-internetowe/index.html");
const localSeoHtml = read("out/local-seo/index.html");
const sitemap = read("out/sitemap.xml");

const stripHtml = (html) =>
  html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const extract = (html, tag) => {
  const match = html.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? stripHtml(match[1]) : "";
};

const websiteText = stripHtml(websiteHtml);
const localSeoText = stripHtml(localSeoHtml);
const websiteTitle = extract(websiteHtml, "title");
const localSeoTitle = extract(localSeoHtml, "title");

for (const [label, value, required] of [
  ["website visible copy", websiteText, "całej Polski"],
  ["local SEO visible copy", localSeoText, "lokalną intencję"],
  ["local SEO visible copy", localSeoText, "fikcyjnych danych adresowych"],
]) {
  if (!value.includes(required)) fail(`${label} missing required local-intent phrase: ${required}`);
}

const forbiddenGeography = /\b(?:szczecin(?:a|ie)?|szczeciń(?:ski|ska|skie|skich)|zachodniopomorsk(?:ie|i|a)|pomorze\s+zachodnie)\b/giu;
for (const [label, value] of [
  ["website public output", websiteText],
  ["local SEO public output", localSeoText],
  ["website title", websiteTitle],
  ["local SEO title", localSeoTitle],
]) {
  const matches = value.match(forbiddenGeography) ?? [];
  if (matches.length) fail(`${label} contains forbidden city/region positioning: ${matches.join(", ")}`);
}

if (!/href=["']\/local-seo\/?["']/i.test(websiteHtml)) {
  fail("/strony-internetowe does not contextually link to /local-seo");
}
if (!/href=["']\/strony-internetowe\/?["']/i.test(localSeoHtml)) {
  fail("/local-seo does not link back to /strony-internetowe");
}

const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
if (sitemapUrls.length !== 63) fail(`expected preserved 63-URL sitemap, found ${sitemapUrls.length}`);
if (sitemapUrls.some((url) => new URL(url).pathname.toLowerCase().includes("szczecin"))) {
  fail("a dedicated Szczecin canonical was introduced before first-party data authorizes it");
}

const combined = `${websiteHtml}\n${localSeoHtml}`;
if (/"@type"\s*:\s*"LocalBusiness"/i.test(combined)) {
  fail("LocalBusiness schema introduced without verified location authority");
}
if (/streetAddress/i.test(combined)) {
  fail("address-bearing schema/content marker introduced without verified location authority");
}

console.log(
  "V15_LOCAL_INTENT_PASS pages=strony-internetowe,local-seo market=Poland-national local-service=VALID crosslinks=BIDIRECTIONAL sitemap=63_PRESERVED new-city-url=NO localbusiness=NO address-claim=NO",
);
