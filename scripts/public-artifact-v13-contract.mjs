import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const fail=(message)=>{console.error(`PUBLIC_ARTIFACT_V14_FAIL: ${message}`);process.exit(1)};
if(!existsSync("out"))fail("missing static export directory: out");
const htmlFiles=[];
const walk=(dir)=>{for(const name of readdirSync(dir)){const path=join(dir,name);const stat=statSync(path);if(stat.isDirectory())walk(path);else if(name.endsWith(".html"))htmlFiles.push(path)}};
walk("out");

const banned=["DIGITAL EXPERIENCE STUDIO","WHAT WE BUILD","FIRST-PARTY PROOF","SIGNATURE EXPERIENCE","INTELLIGENCE.","SCROLL / EXPERIENCE","STUDIO DOŚWIADCZEŃ CYFROWYCH","WWW / STRATEGY","SEARCH / ARCHITECTURE","AI / WEBSITE","MIGRATION / SEARCH","ACCESSIBILITY / WCAG","PERFORMANCE / CWV","Lorem ipsum","Coming soon","PLACEHOLDER","V14 / VISUAL REBUILD"];
for(const path of htmlFiles){const html=readFileSync(path,"utf8");for(const literal of banned)if(html.includes(literal))fail(`${path} exposes retired or placeholder literal: ${literal}`)}

for(const path of ["out/index.html","out/o-nas/index.html","out/uslugi/index.html","out/realizacje/index.html","out/kontakt/index.html","out/wiedza/index.html","out/wiedza/seo-aeo-geo-jedna-architektura/index.html","out/wiedza/wcag-22-co-sprawdzic-na-stronie/index.html"])if(!existsSync(path))fail(`missing required public artifact: ${path}`);
for(const asset of ["out/v14.css","out/v14-shell.css","out/v14-content.css","out/v14-scenes.css","out/v14-routes.css","out/v14-search-trinity.svg","out/v14-quality-canvas.svg","out/v14-portfolio-stage.svg"])if(!existsSync(asset))fail(`missing V14 first-party asset: ${asset}`);

const home=readFileSync("out/index.html","utf8");
for(const required of ["pracują jak produkt","Wyceń projekt","Zobacz realizacje","v14-browser","v14-phone","Sześć warstw jednego produktu cyfrowego","Jedna marka. Trzy urządzenia","LIQUID WEB CONSTRUCTOR","Z płynnej powierzchni","CZŁOWIEK · GOOGLE · SYSTEM AI","Od decyzji biznesowej do działającego produktu","v14-quality-canvas.svg","REALIZACJE WŁASNE","LeadFlowAI.pl","Tervyxa.pl","TranskrypcjaAI.pl","Zobacz pełne realizacje","WIEDZA I DECYZJE","FAQ / PRZED STARTEM","BRIEF PROJEKTU","Strona niczego nie zapisuje","nie wysyła","Otwórz wiadomość","Zbudujmy WWW, które samo pokazuje poziom Twojej firmy","kontakt@leadflowai.pl"])if(!home.includes(required))fail(`V14 homepage artifact missing: ${required}`);
for(const css of ["/v14.css","/v14-shell.css","/v14-content.css","/v14-scenes.css"])if(!home.includes(css))fail(`V14 stylesheet not rendered: ${css}`);
if(home.includes("images.unsplash.com"))fail("V14 homepage artifact still exposes stock motherboard URL");
if(home.includes("api.leadflowai.pl/leads"))fail("disabled lead endpoint leaked into V14 homepage");

const serviceSamples=[
  ["out/strony-internetowe/index.html","BUILD"],
  ["out/seo-aeo-geo/index.html","SEARCH"],
  ["out/chatboty-ai/index.html","AI"],
  ["out/opieka-utrzymanie-stron/index.html","CARE"],
];
for(const [path,group] of serviceSamples){
  if(!existsSync(path))fail(`missing representative V14 service artifact: ${path}`);
  const html=readFileSync(path,"utf8");
  for(const required of ["v14-service-page","v14-header-static","v14-route-footer","/v14-routes.css","ODPOWIEDŹ WPROST","WARTOŚĆ DLA BIZNESU","Co wpływa na koszt","Co wpływa na czas","application/ld+json"]){
    if(!html.includes(required))fail(`${path} missing V14 service artifact invariant: ${required}`);
  }
  if(!html.includes(`data-service-template="${group}"`))fail(`${path} lost service group template ${group}`);
  if(html.includes("api.leadflowai.pl/leads"))fail(`${path} leaked disabled lead endpoint`);
}

const routeSamples=[
  ["out/uslugi/index.html","v14-services-hub","LEADFLOWAI / PEŁNA OFERTA"],
  ["out/realizacje/index.html","v14-portfolio-page","REALNE PROJEKTY"],
  ["out/o-nas/index.html","v14-about-page","METODOLOGIA LEADFLOW"],
  ["out/kontakt/index.html","v14-contact-page","Formularz online jest obecnie wyłączony"],
  ["out/wiedza/index.html","v14-knowledge-page","KLASTRY TEMATYCZNE"],
];
for(const [path,routeClass,truth] of routeSamples){
  const html=readFileSync(path,"utf8");
  for(const required of [routeClass,"v14-header-static","v14-route-footer","/v14-routes.css","id=\"main-content\"",truth]){
    if(!html.includes(required))fail(`${path} missing V14 primary-route invariant: ${required}`);
  }
}

const knowledgeSamples=[
  "out/wiedza/seo-aeo-geo-jedna-architektura/index.html",
  "out/wiedza/wcag-22-co-sprawdzic-na-stronie/index.html",
  "out/wiedza/rag-na-stronie-jak-zaprojektowac/index.html",
];
for(const path of knowledgeSamples){
  const html=readFileSync(path,"utf8");
  for(const required of ["v14-knowledge-article-page","v14-header-static","v14-route-footer","/v14-routes.css","id=\"main-content\"","Redakcja:","Zweryfikowano:","application/ld+json"]){
    if(!html.includes(required))fail(`${path} missing V14 knowledge artifact invariant: ${required}`);
  }
}
if(!readFileSync("out/wiedza/wcag-22-co-sprawdzic-na-stronie/index.html","utf8").includes("Źródła i standardy"))fail("sourced article lost source section");

const about=readFileSync("out/o-nas/index.html","utf8");
if(!about.includes("Tervyxa Systems sp. z o.o."))fail("public trust entity missing from about artifact");

console.log(`PUBLIC_ARTIFACT_V14_PASS html=${htmlFiles.length} placeholders=ABSENT retired-en=ABSENT homepage=V14_FULL service-shell=V14 services=${serviceSamples.length} primary-routes=${routeSamples.length} knowledge-samples=${knowledgeSamples.length} decisions=PASS schema=PASS sources=PASS faq=PASS brief=FRONTEND_ONLY portfolio=FIRST_PARTY motherboard=ABSENT trust=PASS`);
