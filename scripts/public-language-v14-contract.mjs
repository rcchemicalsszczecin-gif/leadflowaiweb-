import { existsSync, readFileSync } from "node:fs";
const fail=(m)=>{console.error(`PUBLIC_LANGUAGE_V14_FAIL: ${m}`);process.exit(1)};
const read=(p)=>{if(!existsSync(p))fail(`missing ${p}`);return readFileSync(p,"utf8")};

const publicSources=["app/page.tsx","app/o-nas/page.tsx","app/uslugi/page.tsx","app/kontakt/page.tsx","app/realizacje/page.tsx","app/wiedza/page.tsx","app/wiedza/[slug]/page.tsx","app/lab/page.tsx","app/local-seo/page.tsx","components/v14-hero.tsx","components/v14-site-header.tsx","components/v14-signature-stage.tsx","components/v14-browser-mockup.tsx","components/v14-phone-mockup.tsx","components/v14-services.tsx","components/v14-device-theater.tsx","components/v14-liquid-constructor.tsx","components/v14-liquid-surface.tsx","components/v14-search-trinity.tsx","components/v14-process-canvas.tsx","components/v14-portfolio.tsx","components/v14-knowledge-faq.tsx","components/v14-contact-brief.tsx","components/v14-closing.tsx","components/audience-paths-v13.tsx","components/contact-brief-builder-v13.tsx","components/offer-levels-v13.tsx","components/search-visibility-explainer-v13.tsx","components/interactive-experience.tsx","components/portfolio-project-visual.tsx","components/service-page.tsx","lib/site.ts"];
const retired=["DIGITAL EXPERIENCE STUDIO","WHAT WE BUILD","FIRST-PARTY PROOF","SIGNATURE EXPERIENCE",'data-cursor="EXPLORE"','data-cursor="DRAG"','data-cursor="OPEN"','data-cursor="START"',">PHILOSOPHY<",'label="PHILOSOPHY"',"SCROLL / EXPERIENCE","Liquid Hardware","landing pages","e-commerce","redesign","desktop/mobile"];
for(const path of publicSources){const src=read(path);for(const literal of retired)if(src.includes(literal))fail(`${path} still exposes retired public literal: ${literal}`)}

const glossary=read("docs/quality/V13-10-PUBLIC-GLOSSARY.md");
for(const required of ["STATUS: ACTIVE PUBLIC LANGUAGE SOURCE OF TRUTH","LeadFlowAI","Tervyxa Systems sp. z o.o.","PROJEKT I BUDOWA","WIDOCZNOŚĆ","KONWERSJA","INTELIGENCJA","INTEGRACJE","OPIEKA","Terminy techniczne pozostawiane bez sztucznego tłumaczenia"])if(!glossary.includes(required))fail(`public glossary missing: ${required}`);

const owner=read("docs/governance/WEBSITE-OWNER-DECISION-V14.md");
if(!owner.includes("STATUS: COMPLETED OWNER AUTHORITY / PRODUCTION RELEASED")||!owner.includes("OWNER_MERGE_AUTHORIZATION=GRANTED_AND_EXERCISED"))fail("V14 production owner authority missing");
const home=read("app/page.tsx");
for(const required of ["V14Hero","V14Services","V14DeviceTheater","V14LiquidConstructor","V14SearchTrinity","V14ProcessCanvas","V14Portfolio","V14KnowledgeFaq","V14ContactBrief","V14Closing"])if(!home.includes(required))fail(`V14 homepage composition missing: ${required}`);
const hero=read("components/v14-hero.tsx");
for(const required of ["LEADFLOWAI","pracują jak produkt","Wyceń projekt","Zobacz realizacje","LIQUID WEBGL","SPATIAL 3D","V14SignatureStage",'variant="hero"',"/v14-content.css","/v14-liquid-surface.css"])if(!hero.includes(required))fail(`V14 hero missing public/signature label: ${required}`);
const signature=read("components/v14-signature-stage.tsx");
for(const required of ["SEARCH LAYER","AI LAYER","LIVE PRODUCT","LIQUID ENGINE / WEBGL2","REAL-TIME SURFACE · SPATIAL PRODUCT"])if(!signature.includes(required))fail(`V14 signature stage missing label: ${required}`);
const services=read("components/v14-services.tsx");
for(const required of ["PROJEKT I BUDOWA","WIDOCZNOŚĆ","KONWERSJA","INTELIGENCJA","INTEGRACJE","OPIEKA","Chatboty","RAG"])if(!services.includes(required))fail(`V14 offer missing public label: ${required}`);
const liquid=read("components/v14-liquid-constructor.tsx");
for(const required of ["LIQUID WEB CONSTRUCTOR","Z płynnej powierzchni","aktywną, przestrzenną warstwą LeadFlowAI","PRODUCT UI","SEO · AEO · GEO","RAG · encje · integracje","V14LiquidSurface"])if(!liquid.includes(required))fail(`V14 Liquid Constructor missing public/runtime label: ${required}`);
const liquidSurface=read("components/v14-liquid-surface.tsx");
for(const forbidden of ["realistic-board-photo","images.unsplash.com"]){if(liquidSurface.includes(forbidden))fail(`V14 Liquid runtime exposes retired stock dependency: ${forbidden}`)}
const trinity=read("components/v14-search-trinity.tsx");
for(const required of ["CZŁOWIEK · GOOGLE · SYSTEM AI","Człowiek:","Google:","System AI:"])if(!trinity.includes(required))fail(`V14 search trinity missing public label: ${required}`);
const processCanvas=read("components/v14-process-canvas.tsx");
for(const required of ["METODOLOGIA","Diagnoza","Architektura","Walidacja","v14-quality-canvas.svg"])if(!processCanvas.includes(required))fail(`V14 process canvas missing: ${required}`);
const portfolio=read("components/v14-portfolio.tsx");
for(const required of ["REALIZACJE WŁASNE","LeadFlowAI.pl","Tervyxa.pl","TranskrypcjaAI.pl","nie screenshoty klientów"])if(!portfolio.includes(required))fail(`V14 portfolio missing public truth: ${required}`);
const knowledgeFaq=read("components/v14-knowledge-faq.tsx");
for(const required of ["WIEDZA I DECYZJE","FAQ / PRZED STARTEM","SEO, AEO i GEO","bazy wiedzy"])if(!knowledgeFaq.includes(required))fail(`V14 knowledge/FAQ layer missing: ${required}`);
const brief=read("components/v14-contact-brief.tsx");
for(const required of ["BRIEF PROJEKTU","Strona niczego nie zapisuje","nie wysyła","aria-pressed"])if(!brief.includes(required))fail(`V14 brief boundary missing: ${required}`);
if(!brief.includes("mailto:")||!brief.includes("site.email"))fail("V14 brief mailto boundary missing");
const closing=read("components/v14-closing.tsx");
for(const required of ["KONTAKT","Wyceń projekt","site.email","Tervyxa Systems sp. z o.o."])if(!closing.includes(required))fail(`V14 closing missing: ${required}`);
const about=read("app/o-nas/page.tsx");
for(const required of ["O LeadFlowAI","Tervyxa Systems sp. z o.o.","Dowód przed deklaracją","METODOLOGIA LEADFLOW"])if(!about.includes(required))fail(`about page missing trust/methodology label: ${required}`);

console.log(`PUBLIC_LANGUAGE_V14_PASS authority=PRODUCTION_RELEASED sources=${publicSources.length} retired=${retired.length} glossary=AUTHORITATIVE hero=LIQUID_WEBGL_SPATIAL_3D knowledge=PASS faq=PASS brief=FRONTEND_ONLY liquid=ACTIVE_SIGNATURE trinity=PASS process=PASS portfolio=FIRST_PARTY closing=PASS header=V14_ACTIVE trust=PL`);