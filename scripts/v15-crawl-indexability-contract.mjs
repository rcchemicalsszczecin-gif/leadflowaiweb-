import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const fail = (message) => {
  console.error(`V15_CRAWL_INDEXABILITY_FAIL: ${message}`);
  process.exit(1);
};

if (!existsSync("out")) fail("static export out/ missing");
if (!existsSync("out/sitemap.xml")) fail("sitemap.xml missing");
if (!existsSync("out/robots.txt")) fail("robots.txt missing");

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
  const tags = html.match(/<link\b[^>]*>/gi) ?? [];
  for (const tag of tags) {
    if (!/\brel=["']canonical["']/i.test(tag)) continue;
    return tag.match(/\bhref=["']([^"']+)["']/i)?.[1] ?? null;
  }
  return null;
};
const normalizePathname = (pathname) => {
  if (!pathname || pathname === "/") return "/";
  const clean = pathname.replace(/\/{2,}/g, "/").replace(/\/$/, "");
  return `${clean}/`;
};
const canonicalToPathname = (canonical) => {
  const url = new URL(canonical);
  if (url.protocol !== "https:" || url.hostname !== "leadflowai.pl") {
    fail(`canonical outside canonical HTTPS host: ${canonical}`);
  }
  if (url.search || url.hash) fail(`canonical contains query/hash: ${canonical}`);
  return normalizePathname(url.pathname);
};

const pages = new Map();
const noindexFiles = [];
for (const path of htmlFiles) {
  const html = readFileSync(path, "utf8");
  if (hasNoindex(html)) {
    noindexFiles.push(relative("out", path));
    continue;
  }
  const canonical = getCanonical(html);
  if (!canonical) fail(`indexable HTML missing canonical: ${relative("out", path)}`);
  const pathname = canonicalToPathname(canonical);
  if (pages.has(pathname)) fail(`duplicate canonical pathname: ${pathname}`);
  pages.set(pathname, { path, html, canonical });
}

const sitemap = readFileSync("out/sitemap.xml", "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
const sitemapPaths = new Set(sitemapUrls.map(canonicalToPathname));
const canonicalPaths = new Set(pages.keys());

if (sitemapPaths.size !== sitemapUrls.length) fail("duplicate normalized URL in sitemap");
if (canonicalPaths.size !== pages.size) fail("duplicate normalized canonical path");

const missingFromSitemap = [...canonicalPaths].filter((path) => !sitemapPaths.has(path));
const missingFromHtml = [...sitemapPaths].filter((path) => !canonicalPaths.has(path));
if (missingFromSitemap.length) fail(`indexable canonicals absent from sitemap: ${missingFromSitemap.join(", ")}`);
if (missingFromHtml.length) fail(`sitemap paths without indexable canonical HTML: ${missingFromHtml.join(", ")}`);

const inbound = new Map([...canonicalPaths].map((path) => [path, new Set()]));
const outbound = new Map([...canonicalPaths].map((path) => [path, new Set()]));
const broken = [];
let internalAnchorCount = 0;
let externalAnchorCount = 0;
let mailtoCount = 0;

for (const [sourcePath, page] of pages) {
  const hrefs = [...page.html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["'][^>]*>/gi)].map((match) => match[1].trim());
  for (const href of hrefs) {
    if (!href || href.startsWith("#")) continue;
    if (/^(mailto:|tel:)/i.test(href)) {
      if (/^mailto:/i.test(href)) mailtoCount += 1;
      continue;
    }
    if (/^(javascript:|data:)/i.test(href)) {
      broken.push(`${sourcePath} -> forbidden href ${href}`);
      continue;
    }

    let url;
    try {
      url = new URL(href, page.canonical);
    } catch {
      broken.push(`${sourcePath} -> invalid href ${href}`);
      continue;
    }

    if (url.hostname !== "leadflowai.pl") {
      externalAnchorCount += 1;
      continue;
    }
    if (url.protocol !== "https:") {
      broken.push(`${sourcePath} -> non-HTTPS internal href ${href}`);
      continue;
    }

    const targetPath = normalizePathname(url.pathname);
    internalAnchorCount += 1;
    if (!canonicalPaths.has(targetPath)) {
      broken.push(`${sourcePath} -> ${targetPath} (from ${href})`);
      continue;
    }
    outbound.get(sourcePath).add(targetPath);
    if (targetPath !== sourcePath) inbound.get(targetPath).add(sourcePath);
  }
}

if (broken.length) {
  console.error(`V15_CRAWL_INDEXABILITY_BROKEN_LINKS count=${broken.length}`);
  for (const defect of broken.slice(0, 100)) console.error(`- ${defect}`);
  process.exit(1);
}

const orphanPaths = [...inbound.entries()]
  .filter(([path, sources]) => path !== "/" && sources.size === 0)
  .map(([path]) => path);
if (orphanPaths.length) fail(`orphan indexable pages: ${orphanPaths.join(", ")}`);

const emptyOutbound = [...outbound.entries()]
  .filter(([path, targets]) => path !== "/kontakt/" && targets.size === 0)
  .map(([path]) => path);
if (emptyOutbound.length) fail(`indexable pages without internal navigation targets: ${emptyOutbound.join(", ")}`);

const robots = readFileSync("out/robots.txt", "utf8");
if (!/User-agent:\s*\*/i.test(robots)) fail("robots wildcard user-agent missing");
if (!/Allow:\s*\//i.test(robots)) fail("robots public allow rule missing");
if (/Disallow:\s*\//i.test(robots)) fail("robots contains global disallow");
if (!robots.includes("Sitemap: https://leadflowai.pl/sitemap.xml")) fail("robots canonical sitemap directive missing");

const inboundCounts = [...inbound.entries()].filter(([path]) => path !== "/").map(([, sources]) => sources.size);
const minInbound = inboundCounts.length ? Math.min(...inboundCounts) : 0;
const maxInbound = inboundCounts.length ? Math.max(...inboundCounts) : 0;
const pagesWithMailto = [...pages.values()].filter(({ html }) => /href=["']mailto:/i.test(html)).length;

console.log(
  `V15_CRAWL_INDEXABILITY_PASS indexable=${pages.size} noindex=${noindexFiles.length} sitemap=${sitemapPaths.size}_EXACT canonical-host=HTTPS internal-anchors=${internalAnchorCount} external-anchors=${externalAnchorCount} broken=0 orphans=0 min-inbound=${minInbound} max-inbound=${maxInbound} mailto-anchors=${mailtoCount} pages-with-mailto=${pagesWithMailto} robots=PUBLIC_CRAWL`,
);
