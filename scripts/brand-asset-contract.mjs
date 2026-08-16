import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";

const fail = (message) => {
  console.error(`BRAND_ASSET_CONTRACT_FAIL: ${message}`);
  process.exit(1);
};
const provenancePath = "docs/architecture/BRAND-ASSET-PROVENANCE.md";
if (!existsSync(provenancePath)) fail(`missing ${provenancePath}`);
const provenance = readFileSync(provenancePath, "utf8");
const excludedDirectories = new Set([".git", ".next", "node_modules", "out"]);
const walkRepository = (directory = ".") => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const path = directory === "." ? entry.name : `${directory}/${entry.name}`;
  if (entry.isDirectory()) return excludedDirectories.has(entry.name) ? [] : walkRepository(path);
  return entry.isFile() && statSync(path).size <= 12 * 1024 * 1024 ? [path] : [];
});
const tracked = walkRepository();
const hash = (path) => createHash("sha256").update(readFileSync(path)).digest("hex");

const masters = [
  ["PRIMARY_LOGO", "4a5736eae07fbd166deec6567c907fe7b809697d45cf6f647399cbdaba1652ba", "1536x1024"],
  ["COMPACT_MARK", "1c7b5a4c27eb4ccf22f089183e6bd5f072ffed3cc16ea0fd056cd53da777cbf5", "400x400"],
  ["HERO", "dc0e64dbd7fc56179c086b1860926a9821b139ef15afb735be2ce0f8c4405ba9", "1536x585"],
];
for (const [id, masterHash, dimensions] of masters) {
  if (!provenance.includes(`\`${id}\``) || !provenance.includes(`\`${masterHash}\``) || !provenance.includes(dimensions)) {
    fail(`recorded master identity incomplete: ${id}`);
  }
}
for (const path of tracked) {
  if (!existsSync(path)) continue;
  if (masters.some(([, masterHash]) => hash(path) === masterHash)) fail(`immutable raw master tracked at ${path}`);
}

const derivatives = [
  ["public/brand/leadflowai-compact-header.png", "863269126160fa09079d8126840d3b1037932e15693b42030a1e47b574dc50de", "128x128", "COMPACT_MARK", "HeaderBrandIdentity"],
  ["public/brand/leadflowai-primary-footer.webp", "8a13dc8456a2dad6ef0b532e1afea67e8821006ed165e0d477f40869bf5a970f", "480x320", "PRIMARY_LOGO", "FooterBrandIdentity"],
  ["app/icon.png", "733c6e97b3af0d4f39af50db5d76c62fdb9b8ac54b6f3a2a85bc30a6190d8ae1", "256x256", "COMPACT_MARK", "Next.js app-icon convention"],
  ["public/brand/og-leadflowai-brand.png", "fd581c59246977754bfd7d5d39313fad1c8777fbaa0b458f73ac26ce7c0ba420", "1200x630", "COMPACT_MARK", "Open Graph/Twitter metadata"],
];
for (const [path, expectedHash, dimensions, source, consumer] of derivatives) {
  if (!existsSync(path) || !tracked.includes(path)) fail(`admitted derivative is not tracked: ${path}`);
  if (hash(path) !== expectedHash) fail(`admitted derivative hash drift: ${path}`);
  for (const marker of [`\`${path}\``, `\`${expectedHash}\``, dimensions, `\`${source}\``, consumer, "APPROVED_EXACT_DERIVATIVE"]) {
    if (!provenance.includes(marker)) fail(`derivative record incomplete for ${path}: ${marker}`);
  }
}

const visualMedia = [
  ["public/v14-portfolio-stage.svg", "a535ee0b36442837daccdc722fd3d2bb524178491df901e2b41516dca9f2ee1e"],
  ["public/v14-quality-canvas.svg", "7c8b5596d5b9aafc0ef6159c0c9e4f37bd9f9829045fbee7426c7252f74ebf2e"],
  ["public/v14-search-trinity-dark.svg", "87c330733e3161619ee0877c11760a98356d94380c25a4008fc361ea06928c90"],
  ["public/v14-search-trinity.svg", "7aa2803c8ab0f917882771acf5ba4c0ff748e21b8100b9a0d4c984bbc87307ef"],
];
for (const [path, expectedHash] of visualMedia) {
  if (!tracked.includes(path) || hash(path) !== expectedHash || !provenance.includes(`\`${expectedHash}\``)) {
    fail(`tracked visual media unclassified or stale: ${path}`);
  }
}

for (const retired of ["app/icon.svg", "components/v14-brand-mark.tsx", "public/og-leadflowai.svg"]) {
  if (existsSync(retired)) fail(`superseded identity still present in candidate: ${retired}`);
}
const consumers = `${readFileSync("components/brand-identity.tsx", "utf8")}\n${readFileSync("components/v14-closing.tsx", "utf8")}\n${readFileSync("app/layout.tsx", "utf8")}`;
for (const required of ["/brand/leadflowai-compact-header.png", "/brand/leadflowai-primary-footer.webp", "/brand/og-leadflowai-brand.png", "LeadFlowAI"]) {
  if (!consumers.includes(required)) fail(`public consumer mapping missing: ${required}`);
}
for (const required of [
  "OWNER_ASSET_MASTER_REPOSITORY_ADMISSION=FORBIDDEN",
  "OWNER_ASSET_MASTER_PUBLICATION_AS_RAW_MASTER=FORBIDDEN",
  "BINARY_DERIVATIVE_REPOSITORY_ADMISSION_COUNT=4",
  "HERO_DERIVATIVE_REPOSITORY_ADMISSION_COUNT=0",
  "UNKNOWN_CONSUMER_COUNT=0",
  "UNCLASSIFIED_ADMITTED_BRAND_ASSET_COUNT=0",
  "APPROVED_FUTURE_ROLE_NOT_YET_ADMITTED",
  "PENDING_EVIDENCE_BASED_RETIREMENT",
]) if (!provenance.includes(required)) fail(`required provenance invariant missing: ${required}`);

if (/^\|[^\n]*UNKNOWN_PROVENANCE[^\n]*APPROVED_(?:EXACT_DERIVATIVE|DERIVATIVE_FAMILY)/m.test(provenance)) fail("unknown provenance is represented as approved");
console.log("BRAND_ASSET_CONTRACT_PASS masters=3 tracked-master-matches=0 admitted-derivatives=4 retired-identities=3 unknown-consumers=0 hero-admission=0");
