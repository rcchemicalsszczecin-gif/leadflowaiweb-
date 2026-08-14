import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const fail=(message)=>{console.error(`PUBLIC_ARTIFACT_V14_FAIL: ${message}`);process.exit(1)};
if(!existsSync("out"))fail("missing static export directory: out");
const htmlFiles=[];
const walk=(dir)=>{for(const name of readdirSync(dir)){const path=join(dir,name);const stat=statSync(path);if(stat.isDirectory())walk(path);else if(name.endsWith(".html"))htmlFiles.push(path)}};
walk("out");

const banned=["DIGITAL EXPERIENCE STUDIO","WHAT WE BUILD","FIRST-PARTY PROOF","SIGNATURE EXPERIENCE","INTELLIGENCE.","SCROLL / EXPERIENCE","STUDIO DOŚWIADCZEŃ CYFROWYCH","WWW / STRATEGY","SEARCH / ARCHITECTURE","AI / WEBSITE","MIGRATION / SEARCH","ACCESSIBILITY / WCAG","PERFORMANCE / CWV","Lorem ipsum","Coming soon","PLACEHOLDER"];
for(const path of htmlFiles){const html=readFileSync(path,"utf8");for(const literal of banned)if(html.includes(literal))fail(`${path} exposes retired or placeholder literal: ${literal}`)}

for(const path of ["out/index.html","out/o-nas/index.html","out/uslugi/index.html","out/wiedza/seo-aeo-geo-jedna-architektura/index.html","out/wiedza/wcag-22-co-sprawdzic-na-stronie/index.html"])if(!existsSync(path))fail(`missing required public artifact: ${path}`);
const home=readFileSync("out/index.html","utf8");
for(const required of ["pracują jak produkt","Wyceń projekt","Zobacz realizacje","v14-browser","v14-phone","V14 / VISUAL REBUILD","Search + AI"])if(!home.includes(required))fail(`V14 homepage artifact missing: ${required}`);
if(!home.includes("/v14.css"))fail("consolidated V14 stylesheet not rendered");
const about=readFileSync("out/o-nas/index.html","utf8");
if(!about.includes("Tervyxa Systems sp. z o.o."))fail("public trust entity missing from about artifact");
console.log(`PUBLIC_ARTIFACT_V14_PASS html=${htmlFiles.length} placeholders=ABSENT retired-en=ABSENT buyer-first=PASS product-stage=PASS css=CONSOLIDATED trust=PASS`);
