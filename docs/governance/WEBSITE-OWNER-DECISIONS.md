# LEADFLOWAI — OWNER DECISIONS

STATUS: CURRENT
DATE: 2026-08-16
OWNER: Paweł Niewiadomski

This file records current product/business/runtime decisions. Historical execution detail remains in dedicated historical/decision/evidence files and must not override `CURRENT-STATE.md`.

## 1. Locked identity / business boundaries

- Legal/invoicing entity: Tervyxa Systems sp. z o.o.
- Public brand name: LeadFlowAI.
- Primary domain: leadflowai.pl.
- Public contact e-mail: kontakt@leadflowai.pl.
- Positioning: professional WWW production first.
- Core: websites, landing pages, e-commerce, redesign/modernization, custom web development.
- Interactive premium websites, 3D/WebGL experiences and motion design are explicit parts of the WWW offer.
- SEO + local SEO + AEO + GEO / AI Search are explicit parts of the WWW offer.
- AI chatbots are part of the WWW offer as a capability; public LeadFlowAI chatbot activation is separate.
- CRO, analytics architecture, integrations and website-connected automation are in scope as capabilities.
- Hosting, monitoring and maintenance are in scope when authorized.
- Unrelated Tervyxa services remain separate verticals.

## 2. Runtime/public-feature decisions

- Public chatbot widget on LeadFlowAI itself: DISABLED until explicit Owner enablement/configuration.
- Dormant chatbot implementation may remain for later local-AI integration, but it must not be rendered publicly before that decision.
- Online lead/contact form delivery: DISABLED until explicit Owner reactivation.
- Current active contact path: direct e-mail through `kontakt@leadflowai.pl`.
- Do not add Cloudflare Email Sending, Apps Script mail relay, webhook mail delivery or another outgoing-mail stack without explicit Owner decision.
- Analytics/consent runtime activation requires a separate reviewed Owner-authorized stage.

ATTACHMENT != ACTIVATION.
READY != ACTIVE.

## 3. Public truth

- Real evidence only; no fake case studies/testimonials.
- No fabricated metrics, rankings, certifications, awards, offices, legal identifiers, AI citations or guarantees.
- Live demonstrations and before/after concepts must be explicitly presented as first-party demos, not client work.
- Original research may not be published without a real auditable dataset, methodology, time range, sample criteria and limitations.
- External Google/Bing/AI-search/field-performance claims require real external evidence.

## 4. Current production / Git decisions

- Production branch: `main`.
- Current production repository HEAD at the current checkpoint: `67663b08c950de120a94ef8495b5cdc8c9bdecfe`.
- Current production visual/runtime authority: V14 Global Liquid World.
- V14 Global Liquid runtime merge milestone: `36ad3fd6130ce21e68a2c5e701a516fcb3703b65`.
- Latest recorded current-main GitHub Pages deployment in `CURRENT-STATE.md`: run #38 / `31810716199`, exact current-main head `67663b08...`, SUCCESS.
- V15 Search candidate `5925c553bae0d59ebb7cb10043f46453fb8da8b6`: NOT PRODUCTION.
- Post-V15 CSS de-stack candidate `5c65435f2de5b2318c1c2585a478c9595f576f76`: NOT PRODUCTION.
- Governance/Codex control-plane branch: isolated candidate, NOT PRODUCTION.
- Candidate PASS does not authorize merge/deployment.
- No force-push/history rewrite without an exact explicit Owner recovery decision.

## 5. Current human / AI execution decision

The current Owner operating model is:

OWNER
-> CHATGPT CONTROLLER / ARCHITECT / REVIEWER
-> CODEX DELEGATED EXECUTOR + BOUNDED GIT FINALIZER
-> CHATGPT STRICT POST-EXECUTION REVIEW
-> OWNER / CONTROLLER NEXT WORK PACKAGE.

Current rules:
- Codex prompts are English by default.
- Codex may read/analyze by default.
- Codex writes only in an explicitly authorized WRITE stage.
- An active Owner/Controller-authorized work package may delegate routine self-approved execution, exact-path staging, bounded commit, normal push to an exact non-production branch, external evidence and exact provider mutation after declared prerequisites pass.
- `SELF_APPROVAL` means execute preauthorized substeps without human micro-confirmation; it never means create new authority.
- Codex never gains scope-expansion, successor-gate, direct-main-push, main-merge, force-push, production-deployment, repository-visibility, Cloudflare-cutover, Pages-decommission or secret-mutation authority by implication.
- The Owner remains final authority and retains main promotion, merge, deployment and other non-delegated powers.
- Every stage ends with evidence and STOP before the next authority transition.
- No opportunistic scope expansion.

```text
OWNER_FINAL_AUTHORITY=YES
CHATGPT_CONTROLLER_ARCHITECT_ROLE=YES
CODEX_DELEGATED_EXECUTION_AUTHORITY=YES
CODEX_ROUTINE_SELF_APPROVAL_WITHIN_ACTIVE_WORK_PACKAGE=YES
CODEX_EXACT_PATH_STAGING_AUTHORITY=YES
CODEX_EXACT_PATH_STAGING_SCOPE=ACTIVE_WORK_PACKAGE_ONLY
CODEX_BOUNDED_COMMIT_AUTHORITY=YES
CODEX_BOUNDED_COMMIT_SCOPE=ACTIVE_WORK_PACKAGE_ONLY
CODEX_BOUNDED_PUSH_AUTHORITY=YES
CODEX_BOUNDED_PUSH_SCOPE=ACTIVE_WORK_PACKAGE_EXACT_NON_PRODUCTION_BRANCH_ONLY
CODEX_AUTHORIZED_PROVIDER_MUTATION_AUTHORITY=ONLY_WHEN_EXPLICITLY_GRANTED_BY_ACTIVE_WORK_PACKAGE
CODEX_SCOPE_EXPANSION_AUTHORITY=NO
CODEX_SUCCESSOR_GATE_SELF_AUTHORIZATION=NO
CODEX_MAIN_DIRECT_PUSH_AUTHORITY=NO
CODEX_MAIN_MERGE_AUTHORITY=NO
CODEX_FORCE_PUSH_AUTHORITY=NO
CODEX_PRODUCTION_DEPLOY_AUTHORITY=NO
CODEX_REPOSITORY_VISIBILITY_CHANGE_AUTHORITY=NO
CODEX_CLOUDFLARE_CUTOVER_AUTHORITY=NO
CODEX_GITHUB_PAGES_DECOMMISSION_AUTHORITY=NO
CODEX_SECRET_MUTATION_AUTHORITY=NO
```

The detailed execution constitution is root `AGENTS.md` plus the current files indexed by `docs/governance/CONTROL-PLANE-INDEX.md`.

## 6. Current visual authority — V14 Global Liquid World

The earlier V14 light/dark selective-Liquid direction has been superseded within the accepted production visual scope by the later Owner-approved Global Liquid continuation.

Current direction:
- LeadFlowAI must visually demonstrate premium web/product capability.
- The accepted first-screen hero remains protected as the lead composition.
- Outside that protected hero viewport, a shared root-mounted first-party WebGL2 submerged-compute world is the site-wide signature substrate.
- Public surfaces are dark/translucent over the global field rather than white/paper section art direction.
- Recognizable PCB, CPU/socket/die, GPU, VRAM, traces/vias, capacitors and electronic-rail forms are preferred over meaningless decorative technical widgets.
- Liquid refraction/caustics/depth are atmospheric and must not carry essential information.
- Owner-provided LeadFlowAI mark is the active public shell identity mark.
- Global fading/dimming of ordinary content during scroll is prohibited.
- Giant decorative headings must not replace useful information.
- Motion/3D/WebGL must preserve reduced-motion/no-WebGL usability and remain performance-bounded.
- Mobile requires dedicated navigation, touch ergonomics and composition.
- No heavyweight third-party 3D dependency solely for decorative effects.

`docs/governance/WEBSITE-OWNER-DECISION-V14.md` remains the completed V14/Global Liquid decision record.

## 7. V13 foundation preserved through V14/V15 candidates

Preserve unless a separately justified, evidenced and Owner-approved migration changes it:
- public URL/canonical baseline;
- 35 service/money pages;
- 21 knowledge articles;
- 63 dominant public search intents/canonical set;
- Polish public-language foundation;
- metadata/canonical/sitemap/robots architecture;
- visible direct answers and useful FAQ content;
- decision guidance;
- structured-data/public-truth consistency;
- real-only portfolio principle;
- direct e-mail contact boundary.

V15 candidate work may improve this system where the accepted V15 evidence explicitly does so, but remains non-production until Owner promotion.

## 8. Current Master Plan and product-completion decision

The Owner approves `docs/plans/LEADFLOWAI_AUTHORITATIVE_MASTER_PLAN_V2.md` as the single current top-level product-completion roadmap.

`MASTER_PLAN_V2=OWNER_APPROVED_CURRENT_TOP_LEVEL_PRODUCT_ROADMAP`

Current classifications:

- `CURRENT_SITE_STATUS=NOT_FINISHED`;
- `TECHNICAL_PASS_DOES_NOT_EQUAL_PRODUCT_COMPLETION=YES`;
- `MASTER_PLAN_V2=OWNER_APPROVED_CURRENT_TOP_LEVEL_PRODUCT_ROADMAP`;
- V1: superseded top-level authority retained as historical product/delivery provenance;
- V15: active subordinate Search / SEO / AEO / GEO / AI Search domain plan and candidate evidence program;
- current completion program: A→Z / C01–C27;
- `C01_TRUTH_RECONCILIATION=COMPLETE`;
- `C01_ALL_OPERATIONS_BACKLOG_CLOSED=NO`;
- `C01_RESIDUAL_OPEN_BACKLOG=OPS-03,OPS-04`;
- `CURRENT_IMMEDIATE_ROLLBACK_TARGET=NOT_PROVEN`;
- current macro stage: C02 Repository, IP and GitHub Decision;
- `C02A_REPOSITORY_IP_GITHUB_INVENTORY=COMPLETE`;
- `C02B_OWNER_VISIBILITY_LICENSING_DECISION=RECORDED`;
- `C02B2_CONTINUITY_ARCHITECTURE_DECISION=RECORDED`;
- `C02B2_PROVIDER_EXECUTION=DEFERRED_TO_C26`;
- `C02C_OWNER_ASSET_IP_ADMISSION_POLICY=RECORDED`;
- `C02C_ASSET_IMPLEMENTATION=DEFERRED_TO_C04`;
- `C02D_PROVIDER_PROTECTION_EXECUTION=PASS`;
- `IP_04_STATUS=CLOSED`;
- `C02E_FINAL_CLASSIFICATION=POLICY_COMPLETE_ACTIVATION_DEFERRED`;
- `IP_05_STATUS=OPEN_DEFERRED_ACTIVATION`;
- `C03_FINAL_CLASSIFICATION=COMPLETE`;
- `C04_IMPLEMENTATION_AUTHORIZED=NO`;
- `C04_STARTED=NO`.

C01 truth reconciliation is complete, but OPS-03 and OPS-04 remain open until separately satisfied. C02A–C02D are recorded or complete; C02E policy is complete while default-branch activation of its candidate files remains deferred. C03 foundation is complete on the governance candidate. C04 remains unstarted and unauthorized. Candidate and governance work remain non-production until separate Owner promotion, merge and deployment decisions.

### C02 repository, hosting and licensing policy

```text
TARGET_POLICY_DECIDED=YES
TARGET_POLICY_UNCHANGED=YES
EXECUTION_SEQUENCE_CORRECTED=YES
IMPLEMENTATION_COMPLETED=NO

CURRENT_REPOSITORY_VISIBILITY=PUBLIC
TARGET_SOURCE_REPOSITORY_VISIBILITY=PRIVATE
CURRENT_PRODUCTION_HOSTING=GITHUB_PAGES
TARGET_PRODUCTION_HOSTING=CLOUDFLARE
KEEP_CURRENT_PRODUCTION_RUNNING_DURING_PRODUCT_COMPLETION=YES
CURRENT_GITHUB_PAGES_ROLE=ACTIVE_PRODUCTION_UNTIL_FINAL_RELEASE_PROMOTION
TARGET_CLOUDFLARE_ROLE=FUTURE_PRODUCTION_HOST_AFTER_ACCEPTED_RELEASE_CANDIDATE
SITE_CONTINUITY_REQUIRED=YES
NO_BLIND_PUBLIC_TO_PRIVATE_SWITCH=YES
IMMEDIATE_VISIBILITY_CHANGE=NO
VISIBILITY_SWITCH_AUTHORIZED=NO
CLOUDFLARE_MIGRATION_EXECUTION_AUTHORIZED=NO
GITHUB_PAGES_DECOMMISSION_AUTHORIZED=NO
CLOUDFLARE_CUTOVER_NOW=NO
REPOSITORY_PRIVATE_SWITCH_NOW=NO
GITHUB_PAGES_DECOMMISSION_NOW=NO
CLOUDFLARE_EXECUTION_DEFERRED=YES
CLOUDFLARE_EXECUTION_EARLIEST_MACRO_GATE=C26_OWNER_CONTROLLED_PRODUCTION_PROMOTION
CLOUDFLARE_EXECUTION_PREREQUISITE=C25_ACCEPTED_IMMUTABLE_RELEASE_CANDIDATE
REPOSITORY_PRIVATE_EXECUTION_DEFERRED=YES
PRIVATE_REPOSITORY_SWITCH_PREREQUISITE=CLOUDFLARE_PRODUCTION_CONTINUITY_PROVEN
VISIBILITY_SWITCH_AUTHORIZED_NOW=NO
PRIVATE_REPOSITORY_SWITCH_EXECUTION_GATE=C26_POST_CLOUDFLARE_CONTINUITY_PROOF
GITHUB_PAGES_DECOMMISSION_DEFERRED=YES
GITHUB_PAGES_DECOMMISSION_AUTHORIZED_NOW=NO
GITHUB_PAGES_DECOMMISSION_PREREQUISITE=CLOUDFLARE_PRODUCTION_CONTINUITY_PROVEN_AND_OWNER_AUTHORIZED
C02B2_CONTINUITY_ARCHITECTURE_DECISION=RECORDED
C02B2_PROVIDER_EXECUTION=DEFERRED_TO_C26
HISTORICAL_PUBLIC_EXPOSURE_REVERSIBLE=NO

LICENSE_POLICY_OWNER_DECISION=APPROVED
REPOSITORY_LICENSE_POLICY=PROPRIETARY_FIRST_PARTY_PLUS_THIRD_PARTY_NOTICES
FIRST_PARTY_SOURCE_POLICY=PROPRIETARY
OPEN_SOURCE_GRANT_FOR_LEADFLOWAI_FIRST_PARTY_SOURCE=NO
OWNER_BRAND_ASSETS_POLICY=PROPRIETARY_SEPARATE_FROM_CODE_LICENSE
THIRD_PARTY_COMPONENTS_POLICY=RETAIN_ORIGINAL_LICENSES_AND_NOTICES
FINAL_LICENSE_TEXT_STATUS=LEGAL_REVIEW_REQUIRED
THIRD_PARTY_NOTICE_TEXT_STATUS=LEGAL_REVIEW_REQUIRED
LICENSE_FILE_CREATION_AUTHORIZED=NO
NOTICE_FILE_CREATION_AUTHORIZED=NO
```

The Owner's target architecture remains a private source repository with public production hosting through Cloudflare. Because LeadFlowAI is not finished, the current repository remains public and GitHub Pages remains the active production host during product completion. Cloudflare cutover, the repository-private switch and GitHub Pages decommission do not occur now.

The execution sequence is: final product completion → C25 accepted immutable release candidate → Owner acceptance → C26 Owner-controlled Cloudflare production promotion → Cloudflare continuity proof → repository-private switch → GitHub Pages decommission → post-transition validation. Cloudflare continuity proof precedes the visibility switch; Pages decommission also requires a separate Owner authorization and review of rollback implications. C02B2 records this architecture and sequencing only. No Cloudflare product, project, deployment API, DNS mutation or TLS mutation is selected or authorized by this decision record.

Changing visibility later can reduce future source exposure but cannot undo historical public access, clones, downloads, caches, Actions evidence, issue/PR history or third-party copies.

LeadFlowAI first-party source is proprietary and receives no intentional open-source grant. Owner brand assets are proprietary and separate from code-license scope. Third-party code, dependencies and assets retain their own licenses, notices and attribution requirements and are not relicensed as LeadFlowAI first-party work. Final `LICENSE` and `NOTICE` wording remains subject to legal review; this policy decision does not authorize creating either file or admitting Owner master assets to Git.

### C02C Owner asset / IP admission policy

The approved source authority consists of exactly three immutable external masters:

- primary logo master — SHA256 `4a5736eae07fbd166deec6567c907fe7b809697d45cf6f647399cbdaba1652ba`;
- compact mark master — SHA256 `1c7b5a4c27eb4ccf22f089183e6bd5f072ffed3cc16ea0fd056cd53da777cbf5`;
- hero visual master — SHA256 `dc0e64dbd7fc56179c086b1860926a9821b139ef15afb735be2ce0f8c4405ba9`.

```text
OWNER_ASSET_MASTER_COUNT=3
OWNER_ASSET_MASTERS_IMMUTABLE=YES
OWNER_ASSET_MASTERS_EXTERNAL_TO_REPOSITORY=YES
OWNER_ASSET_MASTER_REPOSITORY_ADMISSION=FORBIDDEN
OWNER_ASSET_MASTER_PUBLICATION_AS_RAW_MASTER=FORBIDDEN
OWNER_APPROVED_MASTER=YES
DO_NOT_REGENERATE=YES
DO_NOT_REPLACE_WITH_PLACEHOLDER=YES
DO_NOT_RESTYLE_WITHOUT_OWNER_AUTHORITY=YES
DO_NOT_MUTATE_MASTER_IN_PLACE=YES
DO_NOT_COMMIT_MASTER_TO_REPOSITORY=YES

ANY_FILE_COMMITTED_NOW_IS_PUBLICLY_EXPOSED=YES
WEB_DERIVATIVES_ALLOWED_IN_FUTURE=YES
WEB_DERIVATIVE_CREATION_AUTHORIZED_NOW=NO
WEB_DERIVATIVE_REPOSITORY_ADMISSION_AUTHORIZED_NOW=NO
ONLY_PUBLIC_SERVING_DERIVATIVES_MAY_BE_ADMITTED_WHILE_REPOSITORY_IS_PUBLIC=YES
ASSET_PROVENANCE_MANIFEST_REQUIRED_BEFORE_C04_ADMISSION=YES
TECHNICAL_WEB_OPTIMIZATION_ALLOWED_IN_C04=YES
CREATIVE_RESTYLE_REQUIRES_SEPARATE_OWNER_AUTHORITY=YES
CURRENT_APPROVED_DERIVATIVE_COUNT=DO_NOT_INFER

FUTURE_DERIVATIVE_ADMISSION_REQUIRES_ALL=YES
DERIVATIVE_SOURCE_MASTER_PROVEN=YES
SOURCE_MASTER_SHA256_RECORDED=YES
DERIVATIVE_SHA256_RECORDED=YES
DERIVATIVE_DIMENSIONS_RECORDED=YES
DERIVATIVE_FORMAT_RECORDED=YES
DERIVATIVE_PUBLIC_PURPOSE_RECORDED=YES
DERIVATIVE_CONSUMER_RECORDED=YES
DERIVATIVE_TRANSFORM_RECORDED=YES
DERIVATIVE_OWNER_APPROVAL_RECORDED=YES
DERIVATIVE_LICENSE_CLASS_RECORDED=YES
DERIVATIVE_PUBLIC_EXPOSURE_CLASS_RECORDED=YES

OWNER_BRAND_ASSETS_POLICY=PROPRIETARY_SEPARATE_FROM_CODE_LICENSE
BRAND_ASSETS_COVERED_BY_FUTURE_CODE_LICENSE=NO
PUBLIC_ACCESS_DOES_NOT_GRANT_BRAND_REUSE_LICENSE=YES
BRAND_ASSET_OPEN_SOURCE_GRANT=NO
EXISTING_TRACKED_BRAND_ASSET_PROVENANCE=PENDING_C04_RECONCILIATION
THIRD_PARTY_ASSETS_RETAIN_ORIGINAL_RIGHTS_AND_REQUIREMENTS=YES
THIRD_PARTY_ASSET_PROVENANCE_REQUIRED=YES
UNKNOWN_PROVENANCE_DEFAULT_ADMISSION=BLOCKED
ASSET_DELETION_AUTHORIZED_NOW=NO
LEGACY_BRAND_ASSET_RETIREMENT_REQUIRES_EVIDENCE=YES
C04_IMPLEMENTATION_AUTHORIZED=NO
```

An immutable master may not be overwritten, cropped, resized, recompressed, converted, stripped of alpha, recolored, geometrically altered, retyped, recomposed, AI-regenerated, reconstructed, vectorized, redrawn or otherwise “improved” in place without separate explicit Owner authority. Raw masters remain outside Git and may not be published as repository artifacts.

A future web derivative is a distinct public/runtime artifact for an exact consumer, not a master. C04 may later create a favicon, header/navigation/footer mark, social/Open Graph asset, optimized hero, responsive raster, format conversion, approved crop or resolution variant only under a separate Owner-authorized gate. Technical resizing, conversion, compression, metadata stripping, responsive variants and approved crops must preserve the accepted identity; creative redesign, recoloring, geometry reconstruction, typography changes, new symbols, AI regeneration and placeholder substitution require separate Owner/visual authority.

Before any derivative admission, C04 must record its repository path and SHA256, source-master identifier/SHA256/dimensions, derivative dimensions/format, exact transform/tool description, intended public consumer and purpose, exposure and proprietary/third-party class, Owner approval state, admission checkpoint and later supersession/retirement state. Approval states are `APPROVED_EXACT_DERIVATIVE`, `APPROVED_DERIVATIVE_FAMILY`, `NOT_APPROVED`, `SUPERSEDED` or `RETIRED`. Existence, generation, admission and activation are distinct states.

The repository is currently public, so only assets intentionally downloadable as public website-serving derivatives may later be admitted. Existing tracked LeadFlowAI identity assets remain `PENDING_C04_RECONCILIATION`; they are not declared masters, invalid, approved replacements or retirement candidates by C02C. Third-party assets retain their original rights, license and attribution requirements, and unknown provenance is blocked from admission rather than silently converted into first-party ownership. Deletion or retirement requires consumer/reachability, replacement, visual/public-artifact and Owner-review evidence.

### C02D production branch / promotion protection

The Owner-authorized C02D recovery applied classic branch protection to `main` after the corrected GitHub payload omitted the mutually exclusive legacy `contexts` request key and used the exact app-bound check object. Live readback proves:

```text
MAIN_PROTECTED=YES
PROTECTION_MECHANISM=CLASSIC_BRANCH_PROTECTION
REQUIRE_PULL_REQUEST_BEFORE_MERGE=YES
REQUIRED_APPROVING_REVIEW_COUNT=0
REQUIRED_CHECK_CONTEXT=verify
REQUIRED_CHECK_APP_ID=15368
STRICT_STATUS_CHECKS=YES
ENFORCE_ADMINS=YES
REQUIRE_CONVERSATION_RESOLUTION=YES
ALLOW_FORCE_PUSHES=NO
ALLOW_DELETIONS=NO
REQUIRE_CODE_OWNER_REVIEW=NO
REQUIRE_SIGNED_COMMITS=NO
RULESET_COUNT=0
PRODUCTION_MAIN_SHA=67663b08c950de120a94ef8495b5cdc8c9bdecfe
PRODUCTION_CHANGED=NO
C02D_PROVIDER_PROTECTION_EXECUTION=PASS
IP_04_STATUS=CLOSED
```

Zero approving reviews prevents a single-Owner review deadlock; it does not bypass the pull-request, strict `verify`, administrator-enforcement or conversation-resolution controls. C02D did not change `main`, Pages, workflows or production. C02D did not itself authorize C02E; the later bounded C02E/C03 package recorded below supplies that separate authority.

### C02E repository governance and C03 foundation decision

The Owner-authorized C02E/C03 package establishes repository-wide ownership by `@rcchemicalsszczecin-gif`, private vulnerability reporting through `kontakt@leadflowai.pl`, conservative weekly npm/GitHub Actions Dependabot candidate configuration, and immutable release/tag governance. CODEOWNERS does not enable required code-owner review or add a second reviewer requirement.

GitHub vulnerability alerts and automated security fixes are enabled. Existing provider secret scanning and push protection remain enabled. `.github/CODEOWNERS` and `.github/dependabot.yml` are candidate controls until they reach the default branch through a separately authorized promotion; this package does not merge `main`.

The C03 foundation pins Node `22.23.1` / npm `10.9.8`, treats `next-env.d.ts` as the tracked Next.js build-canonical form, classifies generated outputs, scans every tracked file for representative secret classes with redacted output and runtime-only seeded tests, gives Quality universal non-production-push and PR-to-main coverage, and pins every external Action to an immutable reviewed SHA. These controls do not change product copy, routes, visual design, brand masters, runtime activation, Pages, or production.

```text
CODEOWNERS_CANDIDATE_IMPLEMENTED=YES
CODEOWNERS_DEFAULT_BRANCH_ACTIVE=NO
REQUIRE_CODE_OWNER_REVIEW=NO
DEPENDABOT_CONFIG_CANDIDATE_IMPLEMENTED=YES
DEPENDABOT_ALERTS_PROVIDER_STATE=ENABLED
DEPENDABOT_AUTOMATED_SECURITY_FIXES_PROVIDER_STATE=ENABLED
RELEASE_TAG_POLICY_IMPLEMENTED=YES
IP_05_POLICY_STATE=COMPLETE
IP_05_DEFAULT_BRANCH_FILE_ACTIVATION=DEFERRED_TO_C26_OR_EXACT_PROMOTION
IP_05_STATUS=OPEN_DEFERRED_ACTIVATION
C02E_FINAL_CLASSIFICATION=POLICY_COMPLETE_ACTIVATION_DEFERRED
C03_FINAL_CLASSIFICATION=COMPLETE
C04_IMPLEMENTATION_AUTHORIZED=NO
```

## 9. Current Owner brand and Liquid inputs

The Owner confirms:

- `OWNER_LIQUID_VERTICAL_ORIENTATION_DEFECT=CONFIRMED`;
- the current Liquid/water presentation is visually wrong in its top/bottom orientation or perception;
- future C07 must diagnose coordinate/shader/camera/CSS ownership rather than apply a blind visual inversion;
- final correction requires `OWNER_LIQUID_ORIENTATION_PASS`.

The following immutable Owner-approved masters remain outside the repository:

### Primary logo master

- path: `/home/leadflowai/LeadFlowAI-SSD/owner-assets/leadflowai-brand/leadflowai-primary-logo-owner-approved.png`;
- dimensions: 1536×1024 RGBA;
- SHA256: `4a5736eae07fbd166deec6567c907fe7b809697d45cf6f647399cbdaba1652ba`.

### Compact mark master

- path: `/home/leadflowai/LeadFlowAI-SSD/owner-assets/leadflowai-brand/leadflowai-brand-mark-owner-approved.png`;
- dimensions: 400×400 RGBA;
- SHA256: `1c7b5a4c27eb4ccf22f089183e6bd5f072ffed3cc16ea0fd056cd53da777cbf5`.

### Hero visual master

- path: `/home/leadflowai/LeadFlowAI-SSD/owner-assets/leadflowai-brand/leadflowai-hero-owner-approved.png`;
- dimensions: 1536×585 RGBA;
- SHA256: `dc0e64dbd7fc56179c086b1860926a9821b139ef15afb735be2ce0f8c4405ba9`.

Owner asset rules:

- `OWNER_APPROVED_PRIMARY_LOGO=YES`;
- `OWNER_APPROVED_COMPACT_MARK=YES`;
- `OWNER_APPROVED_HERO_VISUAL=YES`;
- `IMMUTABLE_MASTER_ASSETS=YES`;
- `DO_NOT_REGENERATE=YES`;
- `DO_NOT_RESTYLE_WITHOUT_OWNER_AUTHORITY=YES`;
- `DO_NOT_REPLACE_WITH_PLACEHOLDER=YES`;
- `MASTER_ASSETS_REMAIN_OUTSIDE_REPOSITORY=YES`;
- `OWNER_ASSET_MASTER_REPOSITORY_ADMISSION=FORBIDDEN`.

Future web derivatives require the separate C02/C04 authority defined by V2. These decisions do not claim that the assets are already implemented or deployed.

## 10. Pending Owner / external decisions

Still separate from automatic implementation:
- public pricing model;
- final legal identifiers when confirmed and appropriate for public use;
- public chatbot runtime/model configuration if/when enabled;
- optional online lead form if explicitly reopened;
- production analytics/consent tooling;
- default-branch activation of candidate CODEOWNERS/Dependabot files through a separately authorized promotion;
- Cloudflare/visibility continuity planning and separately authorized implementation;
- final `LICENSE` / `NOTICE` legal drafting and implementation;
- C04 asset provenance, derivative creation/admission and existing-asset reconciliation;
- external Search Console/Bing evidence connection and interpretation.
