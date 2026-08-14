# PROJECT BOUNDARIES

STATUS: NORMATIVE
OWNER: Paweł Niewiadomski

LeadFlowAI is the Tervyxa Systems web-production vertical.

## 1. In scope as a product domain

Subject to stage-specific Owner authorization, LeadFlowAI may cover:
- professional websites;
- landing pages;
- e-commerce;
- redesign/migration/modernization;
- custom web development;
- UI/UX;
- interactive/WebGL/3D web experiences;
- SEO and local SEO;
- AEO;
- GEO / AI Search;
- CRO and lead generation;
- website AI chatbots;
- website-connected integrations and automations;
- analytics/measurement architecture;
- accessibility;
- performance;
- security;
- hosting/deployment/monitoring/maintenance.

Domain inclusion does NOT authorize implementation or activation in the current stage.

Example:
analytics is a valid LeadFlowAI capability domain, but analytics runtime remains OFF until a separate Owner-authorized stage activates it.

## 2. Out of scope by default

Unless a separate explicit Owner instruction creates a cross-project stage, this repository does not authorize mutation of:
- TranskrypcjaAI / ASR projects;
- Tervyxa corporate website repositories;
- general-purpose AI compute projects;
- hardware/rig operations;
- CashOps or other historical/independent application projects;
- unrelated Excel/data products;
- unrelated business automation systems;
- other current/future Tervyxa verticals;
- machine-level configuration outside what is strictly required and authorized for this repository.

## 3. Memory is not cross-project authority

Knowledge learned from another Owner project may be used as a design/workflow reference, but it does not authorize reading private external project files, copying proprietary project implementation, or mutating another project.

A reusable workflow principle may be adopted only after it is explicitly encoded/authorized for LeadFlowAI.

## 4. Repository boundary

Normal Codex write authority is limited to the current LeadFlowAI repository and exact stage write set/domain.

No prompt may silently expand from repository work into:
- GitHub settings;
- DNS;
- Cloudflare;
- e-mail systems;
- analytics accounts;
- Search Console;
- Bing Webmaster;
- external hosting;
- external APIs;
- local machine administration

without explicit Owner authority for that external system/action.

## 5. External evidence access

Read-only external evidence may be required for search/production validation, but unavailable external evidence must be reported as `BLOCKED_EXTERNAL_EVIDENCE` rather than synthesized.

## 6. Product boundaries vs runtime activation

IN_SCOPE_DOMAIN != CURRENT_STAGE_SCOPE.
IMPLEMENTED != ENABLED.
READY != ACTIVE.
ATTACHED != PUBLIC.
CANDIDATE != PRODUCTION.

These distinctions are mandatory in implementation and reporting.
