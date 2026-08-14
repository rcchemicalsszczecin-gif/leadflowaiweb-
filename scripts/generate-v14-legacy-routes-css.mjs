import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const sources = [
  "app/services.css",
  "app/precision-water.css",
  "app/circuit-water-v3.css",
  "app/hardware-board-v4.css",
  "app/realistic-board-v5.css",
  "app/content-frames-v6.css",
];

const chunks = sources.map((path) => {
  const css = readFileSync(path, "utf8").trim();
  if (/url\(\s*["']?https?:\/\//i.test(css) || /\bunsplash\b/i.test(css)) {
    throw new Error(`External/stock asset residue in legacy bridge source: ${path}`);
  }
  return `/* SOURCE: ${path} */\n${css}`;
});

const output = [
  "/* GENERATED FILE — V14 LEGACY ROUTE BRIDGE. DO NOT EDIT DIRECTLY. */",
  "/* Preserves legacy service + V2→V6 cascade for migrated non-home routes while root remains V14-clean. */",
  ...chunks,
  "",
].join("\n\n");

mkdirSync("public", { recursive: true });
writeFileSync("public/v14-legacy-routes.css", output, "utf8");

console.log(
  `V14_LEGACY_ROUTE_CSS_GENERATED sources=${sources.length} bytes=${Buffer.byteLength(output)} stock=ABSENT external-assets=ABSENT`,
);
