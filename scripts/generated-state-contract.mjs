import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`GENERATED_STATE_FAIL: ${message}`);
  process.exit(1);
};

const read = (path) => readFileSync(path, "utf8");
const runGit = (args) =>
  execFileSync("git", args, { cwd: process.cwd(), encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });

const exactNode = read(".node-version").trim();
if (exactNode !== "22.23.1") fail(`unexpected Node pin: ${exactNode}`);

const expectedNextEnv = [
  '/// <reference types="next" />',
  '/// <reference types="next/image-types/global" />',
  'import "./.next/types/routes.d.ts";',
  'import "./.next/types/root-params.d.ts";',
  "",
  "// NOTE: This file should not be edited",
  "// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.",
  "",
].join("\n");

if (read("next-env.d.ts") !== expectedNextEnv) {
  fail("next-env.d.ts is not the canonical Next.js 16.3.1 build/typegen form");
}

const tracked = new Set(runGit(["ls-files", "-z"]).split("\0").filter(Boolean));
if (!tracked.has("next-env.d.ts")) fail("next-env.d.ts must remain tracked as the build-mode canonical declaration");

const generated = [
  {
    path: "next-env.d.ts",
    source: "Next.js 16.3.1 type generation",
    command: "next typegen / next build",
    tracking: "TRACKED_BUILD_CANONICAL",
    consumer: "TypeScript and Next.js",
  },
  {
    path: ".next/",
    source: "Next.js compiler/type generation",
    command: "next typegen / next dev / next build",
    tracking: "IGNORED",
    consumer: "Next.js build and typecheck",
  },
  {
    path: "out/",
    source: "Next.js static export",
    command: "npm run build",
    tracking: "IGNORED_RELEASE_ARTIFACT",
    consumer: "static contracts and GitHub Pages upload",
  },
  {
    path: "public/v14-legacy-routes.css",
    source: "six tracked legacy route CSS sources",
    command: "npm run legacy-routes:css",
    tracking: "IGNORED_REGENERATED_INPUT",
    consumer: "Next.js export and migrated non-home routes",
  },
  {
    path: "*.tsbuildinfo",
    source: "TypeScript incremental compiler",
    command: "npm run typecheck / next build",
    tracking: "IGNORED_CACHE",
    consumer: "TypeScript incremental checks",
  },
];

for (const path of [".next/probe", "out/probe", "public/v14-legacy-routes.css", "probe.tsbuildinfo"]) {
  try {
    runGit(["check-ignore", "-q", path]);
  } catch {
    fail(`generated path is not ignored: ${path}`);
  }
}

if (tracked.has("public/v14-legacy-routes.css")) fail("legacy route bridge must be regenerated, not tracked");

const generator = read("scripts/generate-v14-legacy-routes-css.mjs");
for (const source of [
  "app/services.css",
  "app/precision-water.css",
  "app/circuit-water-v3.css",
  "app/hardware-board-v4.css",
  "app/realistic-board-v5.css",
  "app/content-frames-v6.css",
]) {
  if (!generator.includes(source)) fail(`legacy bridge source is unowned: ${source}`);
}

const packageJson = JSON.parse(read("package.json"));
if (packageJson.scripts["legacy-routes:css"] !== "node scripts/generate-v14-legacy-routes-css.mjs") {
  fail("legacy bridge generation command changed");
}

console.log(
  `GENERATED_STATE_PASS entries=${generated.length} tracked=1 ignored=4 node=${exactNode} next-env=BUILD_CANONICAL dirty-check=QUALITY_AND_CLEAN_ENV`,
);
