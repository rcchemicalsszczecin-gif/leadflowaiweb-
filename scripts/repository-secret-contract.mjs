import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootArg = process.argv.indexOf("--root");
const root = resolve(rootArg === -1 ? process.cwd() : process.argv[rootArg + 1]);

const patterns = [
  ["GITHUB_CLASSIC_TOKEN", /\bgh[pousr]_[A-Za-z0-9]{30,255}\b/],
  ["GITHUB_FINE_GRAINED_TOKEN", /\bgithub_pat_[A-Za-z0-9_]{50,255}\b/],
  ["BEARER_CREDENTIAL", /\bBearer\s+[A-Za-z0-9._~+/=-]{24,}\b/i],
  ["PRIVATE_KEY_MATERIAL", /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/],
  ["AWS_ACCESS_KEY", /\bAKIA[0-9A-Z]{16}\b/],
  [
    "SECRET_ASSIGNMENT",
    /\b(?:password|passwd|api[_-]?key|secret|token)\s*[:=]\s*["']?[A-Za-z0-9._~+/=-]{16,}/i,
  ],
];

const fingerprint = (value) => createHash("sha256").update(value).digest("hex").slice(0, 12);

export function scanRepository(scanRoot = root) {
  const tracked = execFileSync("git", ["ls-files", "-z"], {
    cwd: scanRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  })
    .split("\0")
    .filter(Boolean);
  const findings = [];
  let binarySkipped = 0;
  let scanned = 0;

  for (const path of tracked) {
    const content = readFileSync(resolve(scanRoot, path));
    if (content.subarray(0, 8192).includes(0)) {
      binarySkipped += 1;
      continue;
    }
    scanned += 1;
    const lines = content.toString("utf8").split(/\r?\n/);
    for (let index = 0; index < lines.length; index += 1) {
      for (const [classification, pattern] of patterns) {
        const match = pattern.exec(lines[index]);
        if (match) {
          findings.push({ path, line: index + 1, classification, fingerprint: fingerprint(match[0]) });
        }
      }
    }
  }
  return { tracked: tracked.length, scanned, binarySkipped, findings };
}

export const formatFinding = (finding) =>
  `REPOSITORY_SECRET_SCAN_FINDING path=${finding.path} line=${finding.line} class=${finding.classification} fingerprint=sha256:${finding.fingerprint}`;

if (resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  let result;
  try {
    result = scanRepository(root);
  } catch {
    console.error("REPOSITORY_SECRET_SCAN_FAIL class=SCOPE_OR_READ_ERROR detail=redacted");
    process.exit(1);
  }

  if (result.findings.length) {
    for (const finding of result.findings) console.error(formatFinding(finding));
    console.error(
      `REPOSITORY_SECRET_SCAN_FAIL tracked=${result.tracked} findings=${result.findings.length} output=REDACTED`,
    );
    process.exit(1);
  }

  console.log(
    `REPOSITORY_SECRET_SCAN_PASS tracked=${result.tracked} scanned=${result.scanned} binary-skipped=${result.binarySkipped} findings=0 scope=GIT_LS_FILES output=REDACTED`,
  );
}
