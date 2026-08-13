import { existsSync, readFileSync } from "node:fs";

const fail = (message) => {
  console.error(`PUBLIC_LANGUAGE_V13_FAIL: ${message}`);
  process.exit(1);
};

const read = (path) => {
  if (!existsSync(path)) fail(`missing ${path}`);
  return readFileSync(path, "utf8");
};

const publicSources = [
  "app/page.tsx",
  "components/premium-v9-story.tsx",
  "components/premium-v9-journey.tsx",
  "components/interactive-experience.tsx",
  "components/site-header.tsx",
  "components/site-footer.tsx",
  "components/service-page.tsx",
  "app/uslugi/page.tsx",
  "app/kontakt/page.tsx",
  "app/realizacje/page.tsx",
  "app/wiedza/page.tsx",
];

const retiredPublicLiterals = [
  "DIGITAL EXPERIENCE STUDIO",
  "WHAT WE BUILD",
  "FIRST-PARTY PROOF",
  "SIGNATURE EXPERIENCE",
  'data-cursor="EXPLORE"',
  ">PHILOSOPHY<",
  'label="PHILOSOPHY"',
  'label="PROCESS"',
  'label="QUALITY"',
  'label="START"',
  "SCROLL / EXPERIENCE",
  "Liquid Hardware",
];

for (const path of publicSources) {
  const source = read(path);
  for (const literal of retiredPublicLiterals) {
    if (source.includes(literal)) fail(`${path} still exposes retired public literal: ${literal}`);
  }
}

const home = read("app/page.tsx");
for (const required of [
  "STUDIO DOŚWIADCZEŃ CYFROWYCH",
  'label="PODEJŚCIE"',
  'label="PROCES"',
  'label="JAKOŚĆ"',
  'label="KONTAKT"',
]) {
  if (!home.includes(required)) fail(`homepage missing Polish public label: ${required}`);
}

const story = read("components/premium-v9-story.tsx");
for (const required of ["CO BUDUJEMY", "WŁASNY DOWÓD", "DOŚWIADCZENIE AUTORSKIE"]) {
  if (!story.includes(required)) fail(`premium story missing Polish public label: ${required}`);
}

console.log(`PUBLIC_LANGUAGE_V13_PASS sources=${publicSources.length} retired=${retiredPublicLiterals.length} homepage=PL premium-story=PL`);
