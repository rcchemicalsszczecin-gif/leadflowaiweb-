import { existsSync, readFileSync } from "node:fs";
const fail = (m) => { console.error(`DESIGN_V13_FAIL: ${m}`); process.exit(1); };
const read = (p) => { if (!existsSync(p)) fail(`missing ${p}`); return readFileSync(p, "utf8"); };
const owner = read("docs/governance/WEBSITE-OWNER-DECISION-V13.md");
if (!owner.includes("STATUS: ACTIVE OWNER AUTHORITY")) fail("V13 owner authority missing");
console.log("DESIGN_V13_PASS authority=PASS");
