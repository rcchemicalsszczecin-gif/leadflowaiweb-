import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const fail = (message) => {
  console.error(`PUBLIC_GEOGRAPHY_V16_FAIL: ${message}`);
  process.exit(1);
};

if (!existsSync("out")) fail("static export out/ missing");
if (!existsSync("out/sitemap.xml")) fail("sitemap.xml missing");

const files = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) walk(path);
    else if (name.endsWith(".html") || name.endsWith(".svg")) files.push(path);
  }
};
walk("out");

const decode = (value) =>
  value
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

const forbiddenCity = /\b(?:szczecin(?:a|ie)?|szczeciń(?:ski|ska|skie|skich))\b/giu;
const forbiddenRegion = /\b(?:zachodniopomorsk(?:ie|i|a)|pomorze\s+zachodnie)\b/giu;
const geographyViolations = [];
let cityCount = 0;
let regionCount = 0;
let nationalPositioning = false;
let serviceSchemas = 0;

const deepVisit = (value, visit) => {
  if (Array.isArray(value)) {
    value.forEach((item) => {
      deepVisit(item, visit);
    });
    return;
  }
  if (!value || typeof value !== "object") return;
  visit(value);
  Object.values(value).forEach((item) => {
    deepVisit(item, visit);
  });
};

for (const path of files) {
  const source = decode(readFileSync(path, "utf8"));
  const cityMatches = source.match(forbiddenCity) ?? [];
  const regionMatches = source.match(forbiddenRegion) ?? [];
  cityCount += cityMatches.length;
  regionCount += regionMatches.length;
  if (cityMatches.length || regionMatches.length) {
    geographyViolations.push(`${relative("out", path)} city=${cityMatches.length} region=${regionMatches.length}`);
  }
  if (/firm(?:y|om)?\s+w\s+całej\s+Polsce|dla\s+firm\s+w\s+Polsce/iu.test(source)) nationalPositioning = true;

  if (!path.endsWith(".html")) continue;
  for (const match of source.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    let payload;
    try {
      payload = JSON.parse(match[1]);
    } catch (error) {
      fail(`${relative("out", path)} invalid JSON-LD: ${error instanceof Error ? error.message : String(error)}`);
    }
    deepVisit(payload, (node) => {
      const types = Array.isArray(node["@type"]) ? node["@type"] : [node["@type"]];
      if (!types.includes("Service")) return;
      serviceSchemas += 1;
      if (node.areaServed?.["@type"] !== "Country" || node.areaServed?.name !== "Polska") {
        geographyViolations.push(`${relative("out", path)} Service.areaServed is not Country/Polska`);
      }
    });
  }
}

const sitemap = readFileSync("out/sitemap.xml", "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
const locationRoutes = sitemapUrls.filter((value) => /szczecin|zachodniopomor|pomorze-zachodnie/i.test(new URL(value).pathname));

if (cityCount || regionCount) fail(`forbidden public geography found: ${geographyViolations.join("; ")}`);
if (!nationalPositioning) fail("no natural Poland-national positioning statement found");
if (serviceSchemas !== 35) fail(`expected 35 Service schemas with Poland service area, found ${serviceSchemas}`);
if (locationRoutes.length) fail(`forbidden location routes: ${locationRoutes.join(", ")}`);

console.log(
  `PUBLIC_GEOGRAPHY_V16_PASS files=${files.length} city=0 region=0 national-positioning=PRESENT service-area=Polska services=${serviceSchemas} location-routes=0 keyword-stuffing=0`,
);
