# V15.16 — SERP / Demand Research — 2026-08-14

STATUS: OBSERVED_PUBLIC_SERP_BASELINE
DATE: 2026-08-14
EVIDENCE_CLASS: OBSERVED_PUBLIC_SERP
LOCALE_CONTEXT: Poland / Polish-language search
PRODUCTION_BASELINE: `67663b08c950de120a94ef8495b5cdc8c9bdecfe`
V15_BRANCH: `v15/search-master-plan`

## 1. Purpose

This record captures current public search-result observations used to choose the first bounded V15 local/on-page optimization slice.

It is **not** Google Search Console evidence and does not claim exact LeadFlowAI rankings, impressions, clicks, CTR or index state.

Search results can vary by engine, location, device, personalization and time. The pages below are recorded as surfaced competitors/examples, not as a guaranteed exact ranking order.

## 2. Query group — website production / Szczecin

Observed query family:

- `strony internetowe Szczecin`;
- `tworzenie stron internetowych Szczecin`;
- `strony www Szczecin`;
- `projektowanie stron Szczecin`.

Representative surfaced pages:

- AKTO — `https://akto.pl/`;
- home.pl — `https://home.pl/tworzenie-stron-internetowych/szczecin/`;
- StronLab — `https://stronlab.pl/`;
- Webtom — `https://webtom.pl/strony-internetowe-szczecin/`;
- Axperts — `https://axperts.pl/`;
- Digitay — `https://digitay.pl/tworzenie-stron-szczecin`;
- Invenis — `https://www.invenis.pl/strony-internetowe-szczecin/`;
- Dangos — `https://www.dangos.pl/szczecin`;
- SSI — `https://www.ssi.com.pl/`.

Observed recurring patterns:

- `Szczecin` appears directly in page title/H1 or primary opening copy;
- pages describe websites for local companies rather than only generic web-development capability;
- many combine local identity with ability to work for companies across Poland;
- portfolio/proof, process, responsive quality and SEO are common decision elements;
- some competitors use dedicated city routes, while others make the local market explicit on a broader homepage/service URL;
- several pages use aggressive price/time/guarantee claims that LeadFlowAI must not copy without evidence/authority.

## 3. Query group — Local SEO / Szczecin

Observed query family:

- `SEO Szczecin`;
- `pozycjonowanie stron Szczecin`;
- `local SEO Szczecin`;
- `audyt SEO Szczecin`.

Representative surfaced providers observed during the research pass included local/dedicated pages from agencies such as Seoverse, ICEA, BiteMedia, DevaGroup and Studio AM.

Recurring SERP/content pattern:

- the location is explicit early in the page;
- technical audit, content, local entity/profile work and measurement are commonly presented together;
- Google Business Profile/local-profile work appears frequently where the business model supports it;
- some competitors use strong outcome/position promises; LeadFlowAI must retain its no-guarantee public-truth boundary.

## 4. Query group — AEO / GEO / AI Search Poland

Observed query family:

- `AEO Polska optymalizacja answer engine`;
- `GEO AI Search Polska agencja`;
- `pozycjonowanie w AI ChatGPT Polska GEO`;
- `AI Search SEO Polska agencja`.

Representative surfaced providers included pozycjonowanie.ai, Sonada, PozycjonerSEO, Netin, SEOHOUSE and NaPierwszymMiejscu.

Observed market pattern:

- many pages position GEO/AEO as a distinct new service layer;
- several use strong language implying recommendations/citations in ChatGPT/Gemini/AI answers;
- some rely on proprietary visibility scores or broad AI-visibility promises;
- terminology is inconsistent across providers.

LeadFlowAI differentiation to preserve:

- SEO remains the technical/content foundation;
- AEO focuses on answer clarity and information architecture;
- GEO / AI Search focuses on entity clarity, public truth, source-friendly content and evidence;
- no guarantee of recommendation/citation by ChatGPT, Gemini, Google AI features or another third-party system;
- measured AI visibility must be recorded as dated observations/data, not marketing certainty.

## 5. Query group — websites for companies / Poland

Observed query family:

- `profesjonalne strony internetowe dla firm`;
- `tworzenie stron internetowych dla firm`;
- `nowoczesne strony internetowe dla firm`;
- `strona internetowa dla firmy`.

Representative surfaced examples include favpage and Biuro.com.pl, plus other regional providers combining a local market with nationwide remote delivery.

Important architecture observation:

A service page can naturally communicate both a real local market and nationwide delivery. A separate location URL is not automatically required merely because the local query contains a city name.

## 6. Current LeadFlowAI gap

Current `/strony-internetowe/` route-level copy strongly covers:

- business-purpose websites;
- UX/UI;
- development;
- mobile;
- SEO/AEO/GEO;
- conversion;
- analytics/performance.

It does **not** currently make the real Szczecin market explicit in its title/H1/lead/direct answer.

Current `/local-seo/` already contains a truthful Szczecin example in its direct answer and FAQ, including an explicit warning against doorway-page copies, but its primary title/lead remain generic.

## 7. First bounded decision

`V15_LOCAL_INTENT_DECISION_01=STRENGTHEN_EXISTING_CANONICALS`

Do **not** add a 64th indexable city page yet.

First slice:

1. Strengthen `/strony-internetowe/` so it explicitly serves companies from Szczecin while retaining nationwide delivery intent.
2. Strengthen `/local-seo/` so Szczecin is explicit in primary copy while the page remains useful for other genuine local markets.
3. Add contextual cross-linking between `/strony-internetowe/` and `/local-seo/` through the existing related-page registry/template.
4. Preserve the exact 63-URL canonical/sitemap set.
5. Do not claim a physical Szczecin office/address.
6. Do not add `LocalBusiness` or address-bearing structured data without separately verified public business-location authority.
7. Do not create doorway pages for districts/cities by template substitution.

## 8. Why no new city page yet

A new `/strony-internetowe-szczecin/`-style route would create additional canonical ownership and possible cannibalization before first-party query/index data is available.

The evidence-supported lower-risk test is to strengthen the existing high-value `/strony-internetowe/` canonical first, preserve the current sitemap cardinality, and later use Search Console/Bing evidence to decide whether local demand is distinct enough to justify a dedicated route.

## 9. Measurement boundary

Before Search Console/Bing property evidence exists, this research supports content/architecture hypotheses only.

It does not prove:

- LeadFlowAI ranking position for any query;
- search volume;
- impressions;
- CTR;
- conversions;
- Google/Bing index state;
- local-pack visibility.

Those remain `UNMEASURED` until first-party platform evidence is available.

## 10. Verdict

`V15_16_SERP_RESEARCH=PASS_OBSERVATIONAL`

`LOCAL_WWW_DEMAND=OBSERVED`

`LOCAL_SEO_DEMAND=OBSERVED`

`AI_SEARCH_MARKET_CLAIMS=REQUIRE_CONSERVATIVE_TRUTH_BOUNDARY`

`NEW_SZCZECIN_URL=DEFER_PENDING_FIRST_PARTY_DATA`

`EXISTING_CANONICAL_OPTIMIZATION=AUTHORIZED_BY_EVIDENCE_PLAN`
