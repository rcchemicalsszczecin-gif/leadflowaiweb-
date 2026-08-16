import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`BRAND_ASSET_CONTRACT_FAIL: ${message}`);
  process.exit(1);
};

const provenancePath = "docs/architecture/BRAND-ASSET-PROVENANCE.md";
if (!existsSync(provenancePath)) fail(`missing ${provenancePath}`);
const provenance = readFileSync(provenancePath, "utf8");
const tracked = execFileSync("git", ["ls-files", "-z"], { encoding: "utf8" }).split("\0").filter(Boolean);

const masters = [
  ["PRIMARY_LOGO", "4a5736eae07fbd166deec6567c907fe7b809697d45cf6f647399cbdaba1652ba", "1536x1024"],
  ["COMPACT_MARK", "1c7b5a4c27eb4ccf22f089183e6bd5f072ffed3cc16ea0fd056cd53da777cbf5", "400x400"],
  ["HERO", "dc0e64dbd7fc56179c086b1860926a9821b139ef15afb735be2ce0f8c4405ba9", "1536x585"],
];

for (const [id, hash, dimensions] of masters) {
  if (!provenance.includes(`\`${id}\``) || !provenance.includes(`\`${hash}\``) || !provenance.includes(dimensions)) {
    fail(`recorded master identity incomplete: ${id}`);
  }
}

for (const path of tracked) {
  const bytes = readFileSync(path);
  const hash = createHash("sha256").update(bytes).digest("hex");
  if (masters.some(([, masterHash]) => hash === masterHash)) fail(`immutable raw master tracked at ${path}`);
}

const knownAssets = [
  "app/icon.svg",
  "components/v14-brand-mark.tsx",
  "public/og-leadflowai.svg",
  "public/v14-portfolio-stage.svg",
  "public/v14-quality-canvas.svg",
  "public/v14-search-trinity-dark.svg",
  "public/v14-search-trinity.svg",
];

for (const path of knownAssets) {
  if (!tracked.includes(path)) fail(`known identity asset is not tracked: ${path}`);
  if (!provenance.includes(`\`${path}\``)) fail(`known identity asset is unclassified: ${path}`);
  const hash = createHash("sha256").update(readFileSync(path)).digest("hex");
  if (!provenance.includes(`\`${hash}\``)) fail(`known identity asset hash is stale: ${path}`);
}

for (const required of [
  "OWNER_ASSET_MASTER_REPOSITORY_ADMISSION=FORBIDDEN",
  "OWNER_ASSET_MASTER_PUBLICATION_AS_RAW_MASTER=FORBIDDEN",
  "ONLY_PUBLIC_SERVING_DERIVATIVES_MAY_BE_ADMITTED_WHILE_REPOSITORY_IS_PUBLIC=YES",
  "UNKNOWN_PROVENANCE_DEFAULT_ADMISSION=BLOCKED",
  "BINARY_DERIVATIVE_REPOSITORY_ADMISSION_COUNT=0",
  "DERIVATIVE_SHA256",
  "SOURCE_MASTER_SHA256",
  "DERIVATIVE_DIMENSIONS",
  "TRANSFORM_DESCRIPTION",
  "INTENDED_PUBLIC_CONSUMER",
  "PUBLIC_EXPOSURE_CLASS",
  "LICENSE_CLASS",
  "OWNER_APPROVAL_STATE",
  "SUPERSESSION_OR_RETIREMENT_STATE",
  "PENDING_EVIDENCE_BASED_RETIREMENT",
]) {
  if (!provenance.includes(required)) fail(`required provenance invariant missing: ${required}`);
}

if (/^\|[^\n]*`UNKNOWN_PROVENANCE`[^\n]*`APPROVED(?:_EXACT_DERIVATIVE|_DERIVATIVE_FAMILY)`[^\n]*\|$/m.test(provenance)) {
  fail("unknown provenance is represented as approved");
}
if (/EXTERNAL_IMMUTABLE_MASTER[^\n|]*REPOSITORY_ADMITTED/.test(provenance)) fail("raw master is represented as admitted");

console.log(
  `BRAND_ASSET_CONTRACT_PASS masters=3 tracked-master-matches=0 classified-assets=${knownAssets.length} admitted-derivatives=0 unknown-consumers=0`,
);
