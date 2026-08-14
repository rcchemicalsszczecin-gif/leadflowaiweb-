import { existsSync, readFileSync } from "node:fs";
const fail=(m)=>{console.error(`PUBLIC_LANGUAGE_V14_FAIL: ${m}`);process.exit(1)};
const read=(p)=>{if(!existsSync(p))fail(`missing ${p}`);return readFileSync(p,"utf8")};

const publicSources=["app/page.tsx","app/o-nas/page.tsx","app/uslugi/page.tsx","app/kontakt/page.tsx","app/realizacje/page.tsx","app/wiedza/page.tsx","app/wiedza/[slug]/page.tsx","app/lab/page.tsx","app/local-seo/page.tsx","components/v14-hero.tsx","components/v14-browser-mockup.tsx","components/v14-phone-mockup.tsx","components/v14-services.tsx","components/v14-device-theater.tsx","components/v14-liquid-constructor.tsx","components/v14-search-trinity.tsx","components/v14-process-canvas.tsx","components/v14-portfolio.tsx","components/v14-closing.tsx","components/audience-paths-v13.tsx","components/contact-brief-builder-v13.tsx","components/offer-levels-v13.tsx","components/search-visibility-explainer-v13.tsx","components/interactive-experience.tsx","components/portfolio-project-visual.tsx","components/site-header.tsx","components/site-footer.tsx","components/service-page.tsx","lib/site.ts"];
const retired=["DIGITAL EXPERIENCE STUDIO","WHAT WE BUILD","FIRST-PARTY PROOF","SIGNATURE EXPERIENCE",'data-cursor="EXPLORE"','data-cursor="DRAG"','data-cursor="OPEN"','data-cursor="START"',">PHILOSOPHY<",'label="PHILOSOPHY"',"SCROLL / EXPERIENCE","Liquid Hardware","landing pages","e-commerce","redesign","desktop/mobile"];
for(const path of publicSources){const src=read(path);for(const literal of retired)if(src.includes(literal))fail(`${path} still exposes retired public literal: ${literal}`)}

const glossary=read("docs/quality/V13-10-PUBLIC-GLOSSARY.md");
for(const required of ["STATUS: ACTIVE PUBLIC LANGUAGE SOURCE OF TRUTH","LeadFlowAI","Tervyxa Systems sp. z o.o.","PROJEKT I BUDOWA","WIDOCZNOŚĆ","KONWERSJA","INTELIGENCJA","INTEGRACJE","OPIEKA","Terminy techniczne pozostawiane bez sztucznego tłumaczenia"])if(!glossary.includes(required))fail(`public glossary missing: ${required}`);

const owner=read("docs/governance/WEBSITE-OWNER-DECISION-V14.md");
if(!owner.includes("STATUS: ACTIVE OWNER AUTHORITY"))fail("V14 owner authority missing");
const home=read("app/page.tsx");
for(const required of ["V14Hero","V14Services","V14DeviceTheater","V14LiquidConstructor","V14SearchTrinity","V14ProcessCanvas","V14Portfolio","V14Closing"])if(!home.includes(required))fail(`V14 homepage composition missing: ${required}`);
const hero=read("components/v14-hero.tsx");
for(const required of ["LEADFLOWAI","pracują jak produkt","Wyceń projekt","Zobacz realizacje","MOBILE FIRST"])if(!hero.includes(required))fail(`V14 hero missing public label: ${required}`);
const services=read("components/v14-services.tsx");
for(const required of ["PROJEKT I BUDOWA","WIDOCZNOŚĆ","KONWERSJA","INTELIGENCJA","INTEGRACJE","OPIEKA","Chatboty","RAG"])if(!services.includes(required))fail(`V14 offer missing public label: ${required}`);
const liquid=read("components/v14-liquid-constructor.tsx");
for(const required of ["LIQUID WEB CONSTRUCTOR","Z płynnej powierzchni","PRODUCT UI","SEO · AEO · GEO","RAG · encje · integracje"])if(!liquid.includes(required))fail(`V14 Liquid Constructor missing public label: ${required}`);
const trinity=read("components/v14-search-trinity.tsx");
for(const required of ["CZŁOWIEK · GOOGLE · SYSTEM AI","Człowiek:","Google:","System AI:"])if(!trinity.includes(required))fail(`V14 search trinity missing public label: ${required}`);
const process=read("components/v14-process-canvas.tsx");
for(const required of ["METODOLOGIA","Diagnoza","Architektura","Walidacja","v14-quality-canvas.svg"])if(!process.includes(required))fail(`V14 process canvas missing: ${required}`);
const portfolio=read("components/v14-portfolio.tsx");
for(const required of ["REALIZACJE WŁASNE","LeadFlowAI.pl","Tervyxa.pl","TranskrypcjaAI.pl","nie screenshoty klientów"])if(!portfolio.includes(required))fail(`V14 portfolio missing public truth: ${required}`);
const closing=read("components/v14-closing.tsx");
for(const required of ["KONTAKT","Wyceń projekt","site.email","Tervyxa Systems sp. z o.o."])if(!closing.includes(required))fail(`V14 closing missing: ${required}`);
const about=read("app/o-nas/page.tsx");
for(const required of ["O LeadFlowAI","Tervyxa Systems sp. z o.o.","Dowód przed deklaracją","METODOLOGIA LEADFLOW"])if(!about.includes(required))fail(`about page missing trust/methodology label: ${required}`);

console.log(`PUBLIC_LANGUAGE_V14_PASS sources=${publicSources.length} retired=${retired.length} glossary=AUTHORITATIVE homepage=V14_COMPLETE_PL liquid=PASS trinity=PASS process=PASS portfolio=FIRST_PARTY closing=PASS trust=PL`);
