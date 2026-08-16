import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";

const gitFiles = (args) =>
  execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] })
    .split("\0")
    .filter(Boolean);

const files = [...new Set([...gitFiles(["ls-files", "-z"]), ...gitFiles(["ls-files", "-z", "--others", "--exclude-standard"])])]
  .filter((path) => existsSync(path))
  .sort();

if (!files.length) {
  console.error("TRACKED_LINT_FAIL: no repository files resolved");
  process.exit(1);
}

execFileSync(
  "node_modules/.bin/biome",
  ["lint", "--max-diagnostics=100", "--files-ignore-unknown=true", ...files],
  { stdio: "inherit" },
);

console.log(`TRACKED_LINT_PASS files=${files.length} ignored-generated=EXCLUDED_BY_GIT_SCOPE`);
