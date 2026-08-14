import { existsSync, readFileSync, statSync } from "node:fs";
import { join, normalize } from "node:path";
import { gzipSync } from "node:zlib";

const fail = (message) => {
  console.error(`ROUTE_PERFORMANCE_V14_FAIL: ${message}`);
  process.exit(1);
};

if (!existsSync("out")) fail("missing static export directory: out");

// Baseline measured on the scene-bounded V14 candidate on 2026-08-14.
// Ceilings intentionally leave only a small regression margin; they are not generic web targets.
const routes = [
  {
    name: "homepage",
    html: "out/index.html",
    limits: { htmlRaw: 70000, htmlGzip: 16000, jsRaw: 667000, jsGzip: 201000, cssRaw: 130000, cssGzip: 28000, totalRaw: 860000, totalGzip: 242000, assets: 16 },
  },
  {
    name: "service",
    html: "out/strony-internetowe/index.html",
    limits: { htmlRaw: 100000, htmlGzip: 24000, jsRaw: 645000, jsGzip: 192000, cssRaw: 125000, cssGzip: 27000, totalRaw: 830000, totalGzip: 228000, assets: 14 },
  },
  {
    name: "knowledge-hub",
    html: "out/wiedza/index.html",
    limits: { htmlRaw: 100000, htmlGzip: 24000, jsRaw: 645000, jsGzip: 192000, cssRaw: 125000, cssGzip: 27000, totalRaw: 820000, totalGzip: 226000, assets: 14 },
  },
  {
    name: "knowledge-article",
    html: "out/wiedza/wcag-22-co-sprawdzic-na-stronie/index.html",
    limits: { htmlRaw: 100000, htmlGzip: 24000, jsRaw: 645000, jsGzip: 192000, cssRaw: 125000, cssGzip: 27000, totalRaw: 805000, totalGzip: 223000, assets: 14 },
  },
  {
    name: "contact",
    html: "out/kontakt/index.html",
    limits: { htmlRaw: 100000, htmlGzip: 24000, jsRaw: 648000, jsGzip: 193000, cssRaw: 125000, cssGzip: 27000, totalRaw: 805000, totalGzip: 225000, assets: 15 },
  },
  {
    name: "lab",
    html: "out/lab/index.html",
    limits: { htmlRaw: 120000, htmlGzip: 26000, jsRaw: 660000, jsGzip: 197000, cssRaw: 125000, cssGzip: 27000, totalRaw: 820000, totalGzip: 230000, assets: 15 },
  },
];

const size = (path) => statSync(path).size;
const gzip = (path) => gzipSync(readFileSync(path)).byteLength;
const violations = [];

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

function checkAtMost(route, label, actual, limit) {
  if (actual > limit) violations.push(`${route} ${label}=${actual} exceeds ${limit}`);
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

  console.log(
    `ROUTE_PERFORMANCE_V14_ROUTE name=${route.name} html=${html.raw}/${html.gzip} js=${js.raw}/${js.gzip} css=${css.raw}/${css.gzip} total=${totalRaw}/${totalGzip} assets=${assets.length}`,
  );

  checkAtMost(route.name, "htmlRaw", html.raw, route.limits.htmlRaw);
  checkAtMost(route.name, "htmlGzip", html.gzip, route.limits.htmlGzip);
  checkAtMost(route.name, "jsRaw", js.raw, route.limits.jsRaw);
  checkAtMost(route.name, "jsGzip", js.gzip, route.limits.jsGzip);
  checkAtMost(route.name, "cssRaw", css.raw, route.limits.cssRaw);
  checkAtMost(route.name, "cssGzip", css.gzip, route.limits.cssGzip);
  checkAtMost(route.name, "totalRaw", totalRaw, route.limits.totalRaw);
  checkAtMost(route.name, "totalGzip", totalGzip, route.limits.totalGzip);
  checkAtMost(route.name, "assets", assets.length, route.limits.assets);
}

if (violations.length) {
  for (const violation of violations) console.error(`ROUTE_PERFORMANCE_V14_VIOLATION: ${violation}`);
  fail(`violations=${violations.length}`);
}

console.log(`ROUTE_PERFORMANCE_V14_PASS routes=${routes.length} baseline=MEASURED_2026-08-14 margins=TIGHT asset-count=ENFORCED`);
