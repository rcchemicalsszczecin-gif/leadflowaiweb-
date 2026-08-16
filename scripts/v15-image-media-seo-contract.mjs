import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const fail = (message) => {
  console.error(`V15_IMAGE_MEDIA_SEO_FAIL: ${message}`);
  process.exit(1);
};

if (!existsSync("out")) fail("static export out/ missing");
if (!existsSync("out/brand/og-leadflowai-brand.png")) fail("approved brand-led OG asset missing from static export");

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
const metaContent = (html, attribute, value) => {
  const results = [];
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    const selector = new RegExp(`\\b${attribute}=["']${value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`, "i");
    if (!selector.test(tag)) continue;
    const content = tag.match(/\bcontent=["']([^"']+)["']/i)?.[1];
    if (content) results.push(content);
  }
  return results;
};

const resolveFirstPartyAsset = (raw, display, kind, violations) => {
  let url;
  try {
    url = new URL(raw, "https://leadflowai.pl/");
  } catch {
    violations.push(`${display}: invalid ${kind} URL: ${raw}`);
    return null;
  }

  if (url.protocol !== "https:") {
    violations.push(`${display}: ${kind} must use HTTPS: ${raw}`);
    return null;
  }
  if (url.hostname !== "leadflowai.pl") {
    violations.push(`${display}: external ${kind} host is not allowed: ${url.hostname}`);
    return null;
  }

  const pathname = decodeURIComponent(url.pathname);
  const assetPath = join("out", pathname.replace(/^\/+/, ""));
  if (!existsSync(assetPath) || statSync(assetPath).isDirectory()) {
    violations.push(`${display}: missing first-party ${kind} asset: ${pathname}`);
    return null;
  }
  return pathname;
};

const violations = [];
const uniqueImageAssets = new Set();
const uniqueSocialAssets = new Set();
let indexableCount = 0;
let imgCount = 0;
let decorativeImgCount = 0;
let informativeImgCount = 0;
let ogImageRefs = 0;
let twitterImageRefs = 0;

for (const path of htmlFiles) {
  const html = readFileSync(path, "utf8");
  if (hasNoindex(html)) continue;
  indexableCount += 1;
  const display = relative("out", path);

  if (html.includes("/v14-search-trinity.svg")) {
    violations.push(`${display}: retired light Search/Google/AI media is rendered instead of the dark authority asset`);
  }

  for (const tag of html.match(/<img\b[^>]*>/gi) ?? []) {
    imgCount += 1;
    const altMatch = tag.match(/\balt=["']([^"']*)["']/i);
    if (!altMatch) {
      violations.push(`${display}: rendered <img> is missing an alt attribute`);
    } else if (altMatch[1].trim() === "") {
      decorativeImgCount += 1;
    } else {
      informativeImgCount += 1;
    }

    const src = tag.match(/\bsrc=["']([^"']+)["']/i)?.[1];
    if (!src) {
      violations.push(`${display}: rendered <img> is missing src`);
      continue;
    }
    if (src.startsWith("data:") || src.startsWith("blob:")) continue;
    const resolved = resolveFirstPartyAsset(src, display, "image", violations);
    if (resolved) uniqueImageAssets.add(resolved);
  }

  const ogImages = metaContent(html, "property", "og:image");
  if (ogImages.length === 0) violations.push(`${display}: og:image missing`);
  for (const value of ogImages) {
    ogImageRefs += 1;
    const resolved = resolveFirstPartyAsset(value, display, "og:image", violations);
    if (resolved) uniqueSocialAssets.add(resolved);
  }

  const twitterImages = metaContent(html, "name", "twitter:image");
  if (twitterImages.length === 0) violations.push(`${display}: twitter:image missing`);
  for (const value of twitterImages) {
    twitterImageRefs += 1;
    const resolved = resolveFirstPartyAsset(value, display, "twitter:image", violations);
    if (resolved) uniqueSocialAssets.add(resolved);
  }
}

if (indexableCount !== 63) violations.push(`GLOBAL: expected 63 indexable pages, found ${indexableCount}`);
if (!uniqueSocialAssets.has("/brand/og-leadflowai-brand.png")) {
  violations.push("GLOBAL: approved /brand/og-leadflowai-brand.png is not used by rendered social metadata");
}

if (violations.length) {
  console.error(`V15_IMAGE_MEDIA_SEO_DEFECTS count=${violations.length}`);
  for (const violation of violations) console.error(`- ${violation}`);
  process.exit(1);
}

console.log(
  `V15_IMAGE_MEDIA_SEO_PASS indexable=63 img=${imgCount} informative=${informativeImgCount} decorative=${decorativeImgCount} unique-img-assets=${uniqueImageAssets.size} og-image-refs=${ogImageRefs} twitter-image-refs=${twitterImageRefs} social-assets=${uniqueSocialAssets.size} first-party=PASS external-media=ABSENT missing-assets=0 alt=PASS retired-light-search-art=ABSENT`,
);
