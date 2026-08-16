import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const fail = (message) => {
  console.error(`WORKFLOW_SUPPLY_CHAIN_FAIL: ${message}`);
  process.exit(1);
};

const workflowDir = ".github/workflows";
const files = readdirSync(workflowDir)
  .filter((name) => /\.ya?ml$/.test(name))
  .sort();

const allowedPins = new Map([
  ["actions/checkout", "d23441a48e516b6c34aea4fa41551a30e30af803"],
  ["actions/setup-node", "249970729cb0ef3589644e2896645e5dc5ba9c38"],
  ["actions/configure-pages", "983d7736d9b0ae728b81ab479565c72886d7745b"],
  ["actions/upload-pages-artifact", "7b1f4a764d45c48632c6b24a0339c27f5614fb0b"],
  ["actions/deploy-pages", "d6db90164ac5ed86f2b6aed7e0febac5b3c0c03e"],
  ["actions/upload-artifact", "ea165f8d65b6e75b540449e92b4886f43607fa02"],
]);

let external = 0;
let setupNode = 0;
for (const file of files) {
  const path = join(workflowDir, file);
  const source = readFileSync(path, "utf8");
  if (!/permissions:\n(?:[ \t].*\n)*?[ \t]+contents: read/m.test(source)) {
    fail(`${path} lacks explicit contents: read`);
  }
  if (/\b(?:contents|pull-requests|actions|security-events): write\b/.test(source) && file !== "pages.yml") {
    fail(`${path} has an unauthorized write permission`);
  }
  if (/node-version:\s*[^\n]+/.test(source)) fail(`${path} uses a non-canonical inline Node version`);

  for (const match of source.matchAll(/^\s*uses:\s*([^\s#]+)/gm)) {
    const reference = match[1];
    if (reference.startsWith("./") || reference.startsWith("docker://")) continue;
    external += 1;
    const actionMatch = reference.match(/^([^@]+)@([0-9a-f]{40})$/);
    if (!actionMatch) fail(`${path} has a floating external Action reference`);
    const [, action, sha] = actionMatch;
    if (allowedPins.get(action) !== sha) fail(`${path} uses an unreviewed pin for ${action}`);
    if (action === "actions/setup-node") setupNode += 1;
  }

  const setupBlocks = [...source.matchAll(/uses:\s*actions\/setup-node@[0-9a-f]{40}[\s\S]{0,180}?node-version-file:\s*\.node-version/g)];
  const setupUses = [...source.matchAll(/uses:\s*actions\/setup-node@[0-9a-f]{40}/g)];
  if (setupBlocks.length !== setupUses.length) fail(`${path} does not consume .node-version for every setup-node step`);
}

const quality = readFileSync(join(workflowDir, "quality.yml"), "utf8");
if (!/^name: Quality$/m.test(quality)) fail("required workflow name changed");
if (!/^ {2}verify:$/m.test(quality)) fail("required verify job context changed");
if (!/pull_request:\n\s+branches:\n\s+- main/.test(quality)) fail("Quality no longer covers every PR to main");
if (!/push:\n\s+branches-ignore:\n\s+- main/.test(quality)) fail("Quality lacks universal non-production push coverage");
if (!/workflow_dispatch:/.test(quality)) fail("Quality lacks bounded manual recovery dispatch");

if (external !== 22) fail(`unexpected external Action reference count: ${external}`);
if (setupNode !== 8) fail(`unexpected setup-node reference count: ${setupNode}`);

console.log(
  `WORKFLOW_SUPPLY_CHAIN_PASS workflows=${files.length} external=${external} pinned=${external} floating=0 setup-node=${setupNode}_EXACT permissions=LEAST_PRIVILEGE quality=PR_MAIN_AND_NONPROD_PUSH`,
);
