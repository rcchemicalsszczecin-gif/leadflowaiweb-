# LeadFlowAI Brand Asset Provenance and Admission Contract

STATUS: C04 PUBLIC IDENTITY ADMISSION COMPLETE / HERO ROLE DEFERRED TO C09

This file is the repository authority for immutable Owner masters, admitted
public-serving derivatives, current consumers, and superseded identity
artifacts. Public access to a derivative does not grant reuse rights.

## 1. Binding policy

```text
OWNER_ASSET_MASTER_COUNT=3
OWNER_ASSET_MASTERS_IMMUTABLE=YES
OWNER_ASSET_MASTERS_EXTERNAL_TO_REPOSITORY=YES
OWNER_ASSET_MASTER_REPOSITORY_ADMISSION=FORBIDDEN
OWNER_ASSET_MASTER_PUBLICATION_AS_RAW_MASTER=FORBIDDEN
ONLY_PUBLIC_SERVING_DERIVATIVES_MAY_BE_ADMITTED_WHILE_REPOSITORY_IS_PUBLIC=YES
UNKNOWN_PROVENANCE_DEFAULT_ADMISSION=BLOCKED
BINARY_DERIVATIVE_REPOSITORY_ADMISSION_COUNT=4
RAW_MASTER_REPOSITORY_ADMISSION_COUNT=0
HERO_DERIVATIVE_REPOSITORY_ADMISSION_COUNT=0
```

## 2. Immutable external masters

| Identifier | External filename | Dimensions | Format/mode | SHA-256 | State |
|---|---|---:|---|---|---|
| `PRIMARY_LOGO` | `leadflowai-primary-logo-owner-approved.png` | 1536x1024 | PNG / RGBA | `4a5736eae07fbd166deec6567c907fe7b809697d45cf6f647399cbdaba1652ba` | `EXTERNAL_IMMUTABLE_MASTER` |
| `COMPACT_MARK` | `leadflowai-brand-mark-owner-approved.png` | 400x400 | PNG / RGBA | `1c7b5a4c27eb4ccf22f089183e6bd5f072ffed3cc16ea0fd056cd53da777cbf5` | `EXTERNAL_IMMUTABLE_MASTER` |
| `HERO` | `leadflowai-hero-owner-approved.png` | 1536x585 | PNG / RGBA | `dc0e64dbd7fc56179c086b1860926a9821b139ef15afb735be2ce0f8c4405ba9` | `EXTERNAL_IMMUTABLE_MASTER` |

The paths are Owner storage references, not repository paths. Normal CI uses
the recorded identities; an authorized local audit verifies the external
bytes. A master is never an admitted public artifact.

## 3. Admitted public-serving derivatives

| Derivative ID | Repository path | SHA-256 | Source master | Dimensions / format | Transform | Exact public consumer | Exposure / license | Approval and supersession |
|---|---|---|---|---|---|---|---|---|
| `HEADER_COMPACT_V1` | `public/brand/leadflowai-compact-header.png` | `863269126160fa09079d8126840d3b1037932e15693b42030a1e47b574dc50de` | `COMPACT_MARK` / `1c7b5a4c27eb4ccf22f089183e6bd5f072ffed3cc16ea0fd056cd53da777cbf5` | 128x128 / PNG RGBA | circular alpha mask outside the existing badge; Lanczos downscale; metadata-free optimized PNG | `HeaderBrandIdentity` in desktop, mobile and existing hero shell; live DOM text remains `LeadFlowAI` | `PUBLIC_SERVING_IDENTITY` / proprietary Owner brand | `APPROVED_EXACT_DERIVATIVE`; supersedes active `components/v14-brand-mark.tsx` consumers |
| `FOOTER_PRIMARY_V1` | `public/brand/leadflowai-primary-footer.webp` | `8a13dc8456a2dad6ef0b532e1afea67e8821006ed165e0d477f40869bf5a970f` | `PRIMARY_LOGO` / `4a5736eae07fbd166deec6567c907fe7b809697d45cf6f647399cbdaba1652ba` | 480x320 / WebP RGBA | full-canvas Lanczos downscale; WebP quality 88, method 6, exact alpha; no crop or recolor | `FooterBrandIdentity` on all route families | `PUBLIC_SERVING_IDENTITY` / proprietary Owner brand | `APPROVED_EXACT_DERIVATIVE`; replaces footer use of V14 code-native mark |
| `APP_ICON_SIMPLIFIED_V1` | `app/icon.png` | `733c6e97b3af0d4f39af50db5d76c62fdb9b8ac54b6f3a2a85bc30a6190d8ae1` | `COMPACT_MARK` / `1c7b5a4c27eb4ccf22f089183e6bd5f072ffed3cc16ea0fd056cd53da777cbf5` | 256x256 / PNG RGBA | Owner-authorized favicon-only simplification: retain source LF monogram pixels, remove micro-text and rays, place on restrained brand-spectrum circular field | Next.js app-icon convention and exported icon metadata | `PUBLIC_SERVING_ICON` / proprietary Owner brand | `APPROVED_EXACT_DERIVATIVE`; supersedes `app/icon.svg` |
| `OG_BRAND_V1` | `public/brand/og-leadflowai-brand.png` | `fd581c59246977754bfd7d5d39313fad1c8777fbaa0b458f73ac26ce7c0ba420` | `COMPACT_MARK` / `1c7b5a4c27eb4ccf22f089183e6bd5f072ffed3cc16ea0fd056cd53da777cbf5` | 1200x630 / PNG RGB | brand-led composition with approved compact identity, Option A blue/violet/cyan material and factual positioning only | global, service, knowledge and About Open Graph/Twitter metadata | `PUBLIC_SERVING_SOCIAL` / proprietary Owner brand | `APPROVED_EXACT_DERIVATIVE`; supersedes `public/og-leadflowai.svg` |

Every admitted derivative has `REPOSITORY_PATH`, `DERIVATIVE_SHA256`,
`SOURCE_MASTER_SHA256`, `DERIVATIVE_DIMENSIONS`, `FORMAT`,
`TRANSFORM_DESCRIPTION`, `INTENDED_PUBLIC_CONSUMER`,
`PUBLIC_EXPOSURE_CLASS`, `LICENSE_CLASS`, `OWNER_APPROVAL_STATE`, and
`SUPERSESSION_OR_RETIREMENT_STATE` represented above.

## 4. Current tracked visual media

These are first-party visual-system media, not derivatives of the immutable
masters.

| Path | SHA-256 | Consumer state | Provenance / retirement state |
|---|---|---|---|
| `public/v14-portfolio-stage.svg` | `a535ee0b36442837daccdc722fd3d2bb524178491df901e2b41516dca9f2ee1e` | `ACTIVE_PUBLIC_CONSUMER` through homepage portfolio | `FIRST_PARTY_EXISTING_ASSET`; Option A palette-aligned; `NOT_AUTHORIZED_FOR_RETIREMENT` |
| `public/v14-quality-canvas.svg` | `7c8b5596d5b9aafc0ef6159c0c9e4f37bd9f9829045fbee7426c7252f74ebf2e` | `ACTIVE_PUBLIC_CONSUMER` through process canvas | `FIRST_PARTY_EXISTING_ASSET`; Option A palette-aligned; `NOT_AUTHORIZED_FOR_RETIREMENT` |
| `public/v14-search-trinity-dark.svg` | `87c330733e3161619ee0877c11760a98356d94380c25a4008fc361ea06928c90` | `ACTIVE_PUBLIC_CONSUMER` through search trinity | `FIRST_PARTY_EXISTING_ASSET`; Option A palette-aligned; `NOT_AUTHORIZED_FOR_RETIREMENT` |
| `public/v14-search-trinity.svg` | `7aa2803c8ab0f917882771acf5ba4c0ff748e21b8100b9a0d4c984bbc87307ef` | `UNREFERENCED_TRACKED` | `LEGACY_ASSET`; `PENDING_EVIDENCE_BASED_RETIREMENT` |

Current inventory has `UNKNOWN_CONSUMER_COUNT=0` and
`UNCLASSIFIED_ADMITTED_BRAND_ASSET_COUNT=0`.

## 5. Superseded identity artifacts

| Former path/representation | Before-state consumer | Replacement | Final state |
|---|---|---|---|
| `components/v14-brand-mark.tsx` | header, mobile header, existing hero shell, footer | `HEADER_COMPACT_V1` + live DOM name; `FOOTER_PRIMARY_V1` | `RETIRED_AFTER_ZERO_ACTIVE_CONSUMERS` |
| `app/icon.svg` | Next.js icon convention | `APP_ICON_SIMPLIFIED_V1` | `RETIRED_AFTER_REPLACEMENT_ARTIFACT_PASS` |
| `public/og-leadflowai.svg` | global and route social metadata | `OG_BRAND_V1` | `RETIRED_AFTER_METADATA_AND_EXPORT_PASS` |
| code-native `L/` in `app/not-found.tsx` | 404 shell | shared approved header and footer identities | `RETIRED_AFTER_SHELL_MIGRATION` |

Deletion is permitted only after generated-output, metadata, browser, and
contract validation prove the replacement. Historical references in plans do
not reactivate a retired consumer.

## 6. Hero boundary

The immutable `HERO` master has Owner-approved role
`APPROVED_FUTURE_ROLE_NOT_YET_ADMITTED`. C09 owns its exact supporting-media
composition. No hero derivative is tracked or consumed by this checkpoint.

## 7. Third-party boundary

The Brecht Corbeel motherboard photograph remains documented as a historical
Unsplash source. It has no repository binary and no active V14 public
consumer. Its third-party rights are not converted into first-party
provenance by this file.

## 8. Admission invariants

`UNKNOWN_PROVENANCE` cannot be `APPROVED_EXACT_DERIVATIVE` or
`APPROVED_DERIVATIVE_FAMILY`. `EXISTS != APPROVED`, `ADMITTED != ACTIVE`, and
`ACTIVE != MASTER`. Obsolete asset retirement always requires an explicit
state such as `PENDING_EVIDENCE_BASED_RETIREMENT` or
`RETIRED_AFTER_ZERO_ACTIVE_CONSUMERS`.
