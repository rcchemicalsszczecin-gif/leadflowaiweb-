import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { formatFinding, scanRepository } from "./repository-secret-contract.mjs";

const fail = (message) => {
  console.error(`REPOSITORY_SECRET_NEGATIVE_TEST_FAIL: ${message}`);
  process.exit(1);
};

const git = (root, args) => execFileSync("git", args, { cwd: root, stdio: "ignore" });
const init = (root) => {
  git(root, ["init", "-q"]);
  git(root, ["config", "user.name", "Seeded Contract"]);
  git(root, ["config", "user.email", "seeded-contract@example.invalid"]);
};
const seededRoot = mkdtempSync(join(tmpdir(), "leadflowai-secret-negative-"));
const cleanRoot = mkdtempSync(join(tmpdir(), "leadflowai-secret-clean-"));

try {
  const seeds = [
    ["GITHUB_CLASSIC_TOKEN", ["gh", "p_"].join("") + "A".repeat(36)],
    ["GITHUB_FINE_GRAINED_TOKEN", ["github", "_pat_"].join("") + "B".repeat(60)],
    ["BEARER_CREDENTIAL", ["Bear", "er "].join("") + "c".repeat(32)],
    ["PRIVATE_KEY_MATERIAL", ["-----BEGIN ", "PRIVATE KEY-----"].join("")],
    ["AWS_ACCESS_KEY", ["AK", "IA"].join("") + "D".repeat(16)],
    ["SECRET_ASSIGNMENT", ["pass", "word="].join("") + "e".repeat(24)],
  ];

  init(seededRoot);
  writeFileSync(join(seededRoot, ".gitignore"), "ignored.txt\n", "utf8");
  writeFileSync(join(seededRoot, "tracked.txt"), seeds.map(([, value]) => value).join("\n"), "utf8");
  writeFileSync(join(seededRoot, "benign.txt"), "password=example\nBearer example\nghp_placeholder\n", "utf8");
  writeFileSync(join(seededRoot, "ignored.txt"), seeds[0][1], "utf8");
  writeFileSync(join(seededRoot, "untracked.txt"), seeds[1][1], "utf8");
  git(seededRoot, ["add", "--", ".gitignore", "tracked.txt", "benign.txt"]);

  const seededResult = scanRepository(seededRoot);
  const seededOutput = seededResult.findings.map(formatFinding).join("\n");
  if (!seededResult.findings.length) fail("seeded tracked credentials did not fail the scanner");
  for (const [classification, value] of seeds) {
    if (!seededOutput.includes(`class=${classification}`)) fail(`missing seeded class ${classification}`);
    if (seededOutput.includes(value)) fail(`raw seeded value leaked for ${classification}`);
  }
  if (seededOutput.includes("ignored.txt") || seededOutput.includes("untracked.txt")) {
    fail("scanner escaped the git ls-files scope");
  }

  init(cleanRoot);
  writeFileSync(join(cleanRoot, ".gitignore"), "ignored.txt\n", "utf8");
  writeFileSync(join(cleanRoot, "benign.txt"), "password=example\nBearer example\nghp_placeholder\n", "utf8");
  writeFileSync(join(cleanRoot, "ignored.txt"), seeds[0][1], "utf8");
  writeFileSync(join(cleanRoot, "untracked.txt"), seeds[1][1], "utf8");
  git(cleanRoot, ["add", "--", ".gitignore", "benign.txt"]);
  const cleanResult = scanRepository(cleanRoot);
  if (cleanResult.findings.length) fail("benign tracked and ignored/untracked policy did not pass");

  console.log(
    `REPOSITORY_SECRET_NEGATIVE_TEST_PASS classes=${seeds.length} raw-output=ABSENT tracked-scope=PROVEN benign=PASS ignored=EXCLUDED untracked=EXCLUDED`,
  );
} finally {
  rmSync(seededRoot, { recursive: true, force: true });
  rmSync(cleanRoot, { recursive: true, force: true });
}
