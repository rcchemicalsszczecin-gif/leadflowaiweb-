import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";

const fail = (message) => {
  console.error(`V15_TECHNICAL_SEO_FAIL: ${message}`);
  process.exit(1);
};

if (!existsSync("out")) fail("static export out/ missing");

const htmlFiles = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) walk(path);
    else if (name.endsWith(".html")) htmlFiles.push(path);
  }
};
walk("out");

const hasNoindex = (html) => /<meta\b[^>]*\bname=["']robots["'][^>]*\bcontent=["'][^"']*noindex/i.test(html);
const getCanonical = (html) => {
  for (const tag of html.match(/<link\b[^>]*>/gi) ?? []) {
    if (!/\brel=["']canonical["']/i.test(tag)) continue;
    return tag.match(/\bhref=["']([^"']+)["']/i)?.[1] ?? null;
  }
  return null;
};
const getMetaDescription = (html) => {
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    if (!/\bname=["']description["']/i.test(tag)) continue;
    return tag.match(/\bcontent=["']([^"']*)["']/i)?.[1] ?? null;
  }
  return null;
};
const getOgUrl = (html) => {
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    if (!/\bproperty=["']og:url["']/i.test(tag)) continue;
    return tag.match(/\bcontent=["']([^"']+)["']/i)?.[1] ?? null;
  }
  return null;
};
const routeFromArtifact = (path) => {
  const rel = relative("out", path).replaceAll("\\", "/");
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return `/${dirname(rel).replaceAll("\\", "/")}/`;
  return null;
};
const normalizeText = (value) => value.replace(/\s+/g, " ").trim();

const indexable = [];
for (const path of htmlFiles) {
  const html = readFileSync(path, "utf8");
  if (!hasNoindex(html)) indexable.push({ path, html });
}
if (indexable.length !== 63) fail(`expected 63 indexable HTML artifacts, found ${indexable.length}`);

const titleOwners = new Map();
const descriptionOwners = new Map();
const canonicalOwners = new Map();
const missingAssets = [];
let localImageRefs = 0;
let ogUrlCount = 0;

for (const { path, html } of indexable) {
  const display = relative("out", path);
  const route = routeFromArtifact(path);
  if (!route) fail(`${display}: indexable artifact is not route/index.html shaped`);

  if (/<meta\b[^>]*http-equiv=["']refresh["']/i.test(html)) {
    fail(`${display}: meta refresh is not allowed on indexable pages`);
  }

  const canonical = getCanonical(html);
  if (!canonical) fail(`${display}: canonical missing`);

  let canonicalUrl;
  try {
    canonicalUrl = new URL(canonical);
  } catch {
    fail(`${display}: canonical is not a valid absolute URL: ${canonical}`);
  }
  if (canonicalUrl.protocol !== "https:") fail(`${display}: canonical must use HTTPS`);
  if (canonicalUrl.hostname !== "leadflowai.pl") fail(`${display}: canonical host drift: ${canonicalUrl.hostname}`);
  if (canonicalUrl.search || canonicalUrl.hash) fail(`${display}: canonical contains query/hash`);
  if (!canonicalUrl.pathname.endsWith("/")) fail(`${display}: canonical must use trailing-slash form: ${canonicalUrl.pathname}`);
  if (canonicalUrl.pathname !== route) {
    fail(`${display}: canonical pathname ${canonicalUrl.pathname} does not match rendered route ${route}`);
  }
  if (canonicalOwners.has(canonical)) fail(`${display}: canonical duplicated by ${canonicalOwners.get(canonical)}`);
  canonicalOwners.set(canonical, display);

  const title = normalizeText(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "");
  if (!title) fail(`${display}: title missing`);
  const titleKey = title.toLocaleLowerCase("pl");
  if (titleOwners.has(titleKey)) fail(`${display}: duplicate title also used by ${titleOwners.get(titleKey)}`);
  titleOwners.set(titleKey, display);

  const description = normalizeText(getMetaDescription(html) ?? "");
  if (!description) fail(`${display}: meta description missing`);
  const descriptionKey = description.toLocaleLowerCase("pl");
  if (descriptionOwners.has(descriptionKey)) {
    fail(`${display}: duplicate meta description also used by ${descriptionOwners.get(descriptionKey)}`);
  }
  descriptionOwners.set(descriptionKey, display);

  const ogUrl = getOgUrl(html);
  if (ogUrl) {
    ogUrlCount += 1;
    if (ogUrl !== canonical) fail(`${display}: og:url does not match canonical`);
  }

  for (const tag of html.match(/<img\b[^>]*>/gi) ?? []) {
    const src = tag.match(/\bsrc=["']([^"']+)["']/i)?.[1];
    if (!src || src.startsWith("data:") || src.startsWith("blob:") || /^https?:\/\//i.test(src)) continue;
    if (!src.startsWith("/")) continue;
    localImageRefs += 1;
    const clean = decodeURIComponent(src.split(/[?#]/, 1)[0]);
    const assetPath = join("out", clean);
    if (!existsSync(assetPath) || statSync(assetPath).isDirectory()) {
      missingAssets.push(`${display} -> ${src}`);
    }
  }
}

if (missingAssets.length) {
  fail(`missing local image assets (${missingAssets.length}): ${missingAssets.slice(0, 10).join(", ")}`);
}

if (canonicalOwners.size !== 63) fail(`expected 63 unique canonicals, found ${canonicalOwners.size}`);
if (titleOwners.size !== 63) fail(`expected 63 unique titles, found ${titleOwners.size}`);
if (descriptionOwners.size !== 63) fail(`expected 63 unique descriptions, found ${descriptionOwners.size}`);

console.log(
  `V15_TECHNICAL_SEO_PASS indexable=63 canonicals=63_EXACT route-canonical=EXACT trailing-slash=PASS titles=63_UNIQUE descriptions=63_UNIQUE meta-refresh=ABSENT local-image-refs=${localImageRefs} missing-local-images=0 og-url-checked=${ogUrlCount}`,
);
