import { existsSync, readFileSync, statSync } from "node:fs";
import { join, normalize } from "node:path";
import { gzipSync } from "node:zlib";

const fail = (message) => {
  console.error(`ROUTE_PERFORMANCE_V14_FAIL: ${message}`);
  process.exit(1);
};

if (!existsSync("out")) fail("missing static export directory: out");

const routes = [
  {
    name: "homepage",
    html: "out/index.html",
    limits: { htmlRaw: 70000, htmlGzip: 16000, jsRaw: 450000, jsGzip: 140000, cssRaw: 160000, cssGzip: 35000, totalGzip: 190000 },
  },
  {
    name: "service",
    html: "out/strony-internetowe/index.html",
    limits: { htmlRaw: 100000, htmlGzip: 24000, jsRaw: 400000, jsGzip: 130000, cssRaw: 160000, cssGzip: 35000, totalGzip: 180000 },
  },
  {
    name: "knowledge-hub",
    html: "out/wiedza/index.html",
    limits: { htmlRaw: 100000, htmlGzip: 24000, jsRaw: 400000, jsGzip: 130000, cssRaw: 160000, cssGzip: 35000, totalGzip: 180000 },
  },
  {
    name: "knowledge-article",
    html: "out/wiedza/wcag-22-co-sprawdzic-na-stronie/index.html",
    limits: { htmlRaw: 100000, htmlGzip: 24000, jsRaw: 400000, jsGzip: 130000, cssRaw: 160000, cssGzip: 35000, totalGzip: 180000 },
  },
  {
    name: "contact",
    html: "out/kontakt/index.html",
    limits: { htmlRaw: 100000, htmlGzip: 24000, jsRaw: 400000, jsGzip: 130000, cssRaw: 160000, cssGzip: 35000, totalGzip: 180000 },
  },
  {
    name: "lab",
    html: "out/lab/index.html",
    limits: { htmlRaw: 120000, htmlGzip: 26000, jsRaw: 500000, jsGzip: 160000, cssRaw: 180000, cssGzip: 40000, totalGzip: 220000 },
  },
];

const size = (path) => statSync(path).size;
const gzip = (path) => gzipSync(readFileSync(path)).byteLength;

function localAssetPath(reference) {
  const clean = reference.split("#")[0].split("?")[0];
  if (!clean || /^(?:https?:)?\/\//i.test(clean) || clean.startsWith("data:")) return null;
  const decoded = decodeURIComponent(clean);
  const relative = decoded.startsWith("/") ? decoded.slice(1) : decoded;
  const asset = normalize(join("out", relative));
  if (!asset.startsWith(`out${process.platform === "win32" ? "\\" : "/"}`) && asset !== "out") return null;
  return asset;
}

function collectAssets(html) {
  const refs = new Set();
  const attributePattern = /(?:src|href)=["']([^"']+)["']/gi;
  for (const match of html.matchAll(attributePattern)) {
    const asset = localAssetPath(match[1]);
    if (!asset || !existsSync(asset)) continue;
    if (asset.endsWith(".js") || asset.endsWith(".css")) refs.add(asset);
  }
  return [...refs];
}

function metric(raw, gz) {
  return { raw, gzip: gz };
}

function sumAssets(assets, extension) {
  const selected = assets.filter((asset) => asset.endsWith(extension));
  return metric(
    selected.reduce((total, asset) => total + size(asset), 0),
    selected.reduce((total, asset) => total + gzip(asset), 0),
  );
}

function assertAtMost(route, label, actual, limit) {
  if (actual > limit) fail(`${route} ${label}=${actual} exceeds ${limit}`);
}

for (const route of routes) {
  if (!existsSync(route.html)) fail(`missing representative route artifact: ${route.html}`);
  const htmlBuffer = readFileSync(route.html);
  const htmlText = htmlBuffer.toString("utf8");
  const assets = collectAssets(htmlText);
  const html = metric(htmlBuffer.byteLength, gzipSync(htmlBuffer).byteLength);
  const js = sumAssets(assets, ".js");
  const css = sumAssets(assets, ".css");
  const totalRaw = html.raw + js.raw + css.raw;
  const totalGzip = html.gzip + js.gzip + css.gzip;

  assertAtMost(route.name, "htmlRaw", html.raw, route.limits.htmlRaw);
  assertAtMost(route.name, "htmlGzip", html.gzip, route.limits.htmlGzip);
  assertAtMost(route.name, "jsRaw", js.raw, route.limits.jsRaw);
  assertAtMost(route.name, "jsGzip", js.gzip, route.limits.jsGzip);
  assertAtMost(route.name, "cssRaw", css.raw, route.limits.cssRaw);
  assertAtMost(route.name, "cssGzip", css.gzip, route.limits.cssGzip);
  assertAtMost(route.name, "totalGzip", totalGzip, route.limits.totalGzip);

  console.log(
    `ROUTE_PERFORMANCE_V14_ROUTE name=${route.name} html=${html.raw}/${html.gzip} js=${js.raw}/${js.gzip} css=${css.raw}/${css.gzip} total=${totalRaw}/${totalGzip} assets=${assets.length}`,
  );
}

console.log(`ROUTE_PERFORMANCE_V14_PASS routes=${routes.length} representative=HOMEPAGE_SERVICE_KNOWLEDGE_ARTICLE_CONTACT_LAB budgets=ENFORCED`);
