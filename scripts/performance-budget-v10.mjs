import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join } from "node:path";
import { gzipSync } from "node:zlib";

const OUT = "out";
const limits = {
  jsRaw: 725_000,
  jsGzip: 220_000,
  cssRaw: 195_000,
  cssGzip: 40_000,
  homepageRaw: 70_000,
  homepageGzip: 16_000,
  largestJsRaw: 240_000,
  totalRaw: 4_250_000,
};

const fail = (message) => {
  console.error(`PERFORMANCE_BUDGET_V10_FAIL: ${message}`);
  process.exit(1);
};

if (!existsSync(OUT)) fail("missing out/ build artifact");

const walk = (dir) => {
  const output = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const stats = statSync(path);
    if (stats.isDirectory()) output.push(...walk(path));
    else output.push(path);
  }
  return output;
};

const files = walk(OUT);
const sizeOf = (paths) => paths.reduce((sum, path) => sum + statSync(path).size, 0);
const gzipSizeOf = (paths) => paths.reduce((sum, path) => sum + gzipSync(readFileSync(path), { level: 9 }).byteLength, 0);

const jsFiles = files.filter((path) => extname(path) === ".js");
const cssFiles = files.filter((path) => extname(path) === ".css");
const homepage = join(OUT, "index.html");
if (!existsSync(homepage)) fail("missing homepage static HTML");

const metrics = {
  jsRaw: sizeOf(jsFiles),
  jsGzip: gzipSizeOf(jsFiles),
  cssRaw: sizeOf(cssFiles),
  cssGzip: gzipSizeOf(cssFiles),
  homepageRaw: statSync(homepage).size,
  homepageGzip: gzipSync(readFileSync(homepage), { level: 9 }).byteLength,
  largestJsRaw: jsFiles.reduce((largest, path) => Math.max(largest, statSync(path).size), 0),
  totalRaw: sizeOf(files),
};

for (const [name, limit] of Object.entries(limits)) {
  const value = metrics[name];
  if (value > limit) fail(`${name}=${value} exceeds budget=${limit}`);
}

console.log(
  `PERFORMANCE_BUDGET_V10_PASS jsRaw=${metrics.jsRaw}/${limits.jsRaw} jsGzip=${metrics.jsGzip}/${limits.jsGzip} cssRaw=${metrics.cssRaw}/${limits.cssRaw} cssGzip=${metrics.cssGzip}/${limits.cssGzip} homepageRaw=${metrics.homepageRaw}/${limits.homepageRaw} homepageGzip=${metrics.homepageGzip}/${limits.homepageGzip} largestJsRaw=${metrics.largestJsRaw}/${limits.largestJsRaw} totalRaw=${metrics.totalRaw}/${limits.totalRaw}`,
);
