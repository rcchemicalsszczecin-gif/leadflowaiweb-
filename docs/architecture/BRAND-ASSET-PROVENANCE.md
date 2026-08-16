# LeadFlowAI Brand Asset Provenance and Admission Contract

STATUS: C04A COMPLETE / C04B TECHNICAL CANDIDATES EXTERNAL / PUBLIC ADMISSION PENDING OWNER

This record is the repository authority for LeadFlowAI brand-master identity,
existing tracked identity/media classification, and future public derivative
admission. It does not admit a binary, approve a derivative, replace a current
consumer, or authorize an art-direction choice.

## 1. Binding policy

```text
OWNER_ASSET_MASTER_COUNT=3
OWNER_ASSET_MASTERS_IMMUTABLE=YES
OWNER_ASSET_MASTERS_EXTERNAL_TO_REPOSITORY=YES
OWNER_ASSET_MASTER_REPOSITORY_ADMISSION=FORBIDDEN
OWNER_ASSET_MASTER_PUBLICATION_AS_RAW_MASTER=FORBIDDEN
ONLY_PUBLIC_SERVING_DERIVATIVES_MAY_BE_ADMITTED_WHILE_REPOSITORY_IS_PUBLIC=YES
UNKNOWN_PROVENANCE_DEFAULT_ADMISSION=BLOCKED
BINARY_DERIVATIVE_REPOSITORY_ADMISSION_COUNT=0
```

The master paths below are local Owner storage references, not repository
paths. Normal CI validates this recorded identity without requiring access to
Owner storage. A separately authorized local audit may verify the external
files against these values.

## 2. Immutable external masters

| Identifier | External filename | Dimensions | Format/mode | SHA-256 | Repository state |
|---|---|---:|---|---|---|
| `PRIMARY_LOGO` | `leadflowai-primary-logo-owner-approved.png` | 1536x1024 | PNG / RGBA | `4a5736eae07fbd166deec6567c907fe7b809697d45cf6f647399cbdaba1652ba` | `EXTERNAL_IMMUTABLE_MASTER` |
| `COMPACT_MARK` | `leadflowai-brand-mark-owner-approved.png` | 400x400 | PNG / RGBA | `1c7b5a4c27eb4ccf22f089183e6bd5f072ffed3cc16ea0fd056cd53da777cbf5` | `EXTERNAL_IMMUTABLE_MASTER` |
| `HERO` | `leadflowai-hero-owner-approved.png` | 1536x585 | PNG / RGBA | `dc0e64dbd7fc56179c086b1860926a9821b139ef15afb735be2ce0f8c4405ba9` | `EXTERNAL_IMMUTABLE_MASTER` |

None of these files is tracked, repository-admitted, or approved for raw
publication. `MASTER` means the immutable Owner source. It never means a
resize, crop, conversion, generated approximation, or existing repository
graphic.

## 3. Existing tracked identity and media inventory

`ACTIVE_PUBLIC_CONSUMER` means source inspection proves that the current public
render or metadata consumes the artifact. It is not an approval of provenance
or a promotion to master status.

| Path | Type/dimensions | SHA-256 | Consumer classification | Exact consumers | Provenance/classification | Master match | Retirement state |
|---|---|---|---|---|---|---|---|
| `app/icon.svg` | SVG / 64x64 viewBox | `f7ccd40e9eb938bdfe5089605bc1f2b9b73dae54917427d34212a54956b4a35a` | `ACTIVE_PUBLIC_CONSUMER` | Next.js app icon convention; exported `/icon.svg` | `FIRST_PARTY_EXISTING_ASSET`; pre-manifest origin evidence is incomplete | NO | `NOT_AUTHORIZED_FOR_RETIREMENT` |
| `components/v14-brand-mark.tsx` | TSX / code-native SVG | `5130039c8a6986cab4839c4bcc500ff022112b0c77012e0075194a5bd51cf0c0` | `ACTIVE_PUBLIC_CONSUMER` | `v14-site-header`, `v14-hero`, `v14-site-footer` | `FIRST_PARTY_EXISTING_ASSET`; legacy V14 identity representation | NO | `PENDING_OWNER_ROLE_DECISION` |
| `public/og-leadflowai.svg` | SVG / 1200x630 | `e97c3b57cf988a4adc6a464a3ca2a0df516d0c8beaed09e68fafdcd33a421275` | `ACTIVE_PUBLIC_CONSUMER` | global, service, knowledge and About Open Graph/Twitter metadata | `FIRST_PARTY_EXISTING_ASSET`; authored repository social graphic | NO | `PENDING_OWNER_ROLE_DECISION` |
| `public/v14-portfolio-stage.svg` | SVG / 1200x620 viewBox | `58c671aa9b73db400249828bae3e76d6c6055fcd8bcf7670576f365734259de0` | `ACTIVE_PUBLIC_CONSUMER` | `components/v14-portfolio.tsx` on homepage | `FIRST_PARTY_EXISTING_ASSET`; first-party project visualization | NO | `NOT_AUTHORIZED_FOR_RETIREMENT` |
| `public/v14-quality-canvas.svg` | SVG / 720x560 viewBox | `50be7a1347ceae979e160e02be4cd49836aa6c0d88ccb071f801dfdc22b13c96` | `ACTIVE_PUBLIC_CONSUMER` | `components/v14-process-canvas.tsx` on homepage | `FIRST_PARTY_EXISTING_ASSET`; first-party quality visualization | NO | `NOT_AUTHORIZED_FOR_RETIREMENT` |
| `public/v14-search-trinity-dark.svg` | SVG / 1200x500 viewBox | `1c6f82b17be592f92b7fe7381bb089976263befbc8d77d1a50fad52df8ec4278` | `ACTIVE_PUBLIC_CONSUMER` | `components/v14-search-trinity.tsx` on homepage | `FIRST_PARTY_EXISTING_ASSET`; active dark search visualization | NO | `NOT_AUTHORIZED_FOR_RETIREMENT` |
| `public/v14-search-trinity.svg` | SVG / 1200x500 viewBox | `7aa2803c8ab0f917882771acf5ba4c0ff748e21b8100b9a0d4c984bbc87307ef` | `UNREFERENCED_TRACKED` | no current public render; contracts explicitly reject it from the active layer | `LEGACY_ASSET`; light predecessor retained as historical input | NO | `PENDING_EVIDENCE_BASED_RETIREMENT` |

`app/not-found.tsx` also renders a code-native textual `L/` recovery mark. It
is an `ACTIVE_PUBLIC_CONSUMER` identity representation, not a discrete asset;
its replacement remains C04C/C08 work after Owner role approval.

Inventory totals at this checkpoint:

```text
TRACKED_BRAND_ASSET_COUNT=7
ACTIVE_PUBLIC_BRAND_ASSET_COUNT=6
LEGACY_BRAND_ASSET_COUNT=2
UNKNOWN_CONSUMER_COUNT=0
IMMUTABLE_OWNER_MASTER_TRACKED_COUNT=0
```

The legacy count covers the V14 code-native mark and the unreferenced light
Search Trinity. No existing artifact is an approved derivative merely because
it is active.

## 4. Consumer and reachability rules

Consumer states are `ACTIVE_PUBLIC_CONSUMER`, `ACTIVE_INTERNAL_CONSUMER`,
`LEGACY_REFERENCED`, `UNREFERENCED_TRACKED`, `HISTORICAL_ONLY`, and `UNKNOWN`.
Classification must be based on exact source, CSS, metadata, manifest, or
generated-output references—not filename age. Retirement requires a proven
consumer graph, replacement identity where needed, visual/public-artifact
review, and Owner approval for brand-visible change.

## 5. Third-party boundary

The Brecht Corbeel motherboard photograph is documented in
`docs/design/LEADFLOWAI-DESIGN-DIRECTION-V5.md` with its Unsplash source URL
and license reference. Remote image URLs remain in historical CSS sources, but
the active V14 public layer and generated legacy bridge reject them. It is
classified `THIRD_PARTY_LICENSED_ASSET`, `HISTORICAL_ONLY`, with no repository
binary and no active public consumer. Its original rights and attribution
requirements remain intact; this record does not perform a full legal audit.

## 6. Derivative admission record

A future admitted derivative must contain every field below:

```text
DERIVATIVE_ID
REPOSITORY_PATH
DERIVATIVE_SHA256
SOURCE_MASTER_ID
SOURCE_MASTER_SHA256
SOURCE_MASTER_DIMENSIONS
DERIVATIVE_DIMENSIONS
FORMAT
TRANSFORM_DESCRIPTION
GENERATION_TOOL_OR_BOUNDED_TRANSFORM
INTENDED_PUBLIC_CONSUMER
PUBLIC_PURPOSE
PUBLIC_EXPOSURE_CLASS
LICENSE_CLASS
OWNER_APPROVAL_STATE
ADMISSION_CHECKPOINT
SUPERSESSION_OR_RETIREMENT_STATE
```

Permitted approval values are `APPROVED_EXACT_DERIVATIVE`,
`APPROVED_DERIVATIVE_FAMILY`, `NOT_APPROVED`, `SUPERSEDED`, and `RETIRED`.
`UNKNOWN_PROVENANCE` cannot be approved. `EXISTS != APPROVED`,
`GENERATED != ADMITTED`, `ADMITTED != ACTIVE`, and `ACTIVE != MASTER`.

No derivative is admitted by this checkpoint. The external technical lab
contains resize/format/compression candidates for Owner review; it is not
repository authority and cannot be consumed by the public site until an exact
role and derivative are approved.

## 7. Transform and role boundary

Technical resizing, format conversion, deterministic compression, responsive
variants, appropriate metadata stripping, and required alpha preservation are
eligible for later admission. Creative crop, recolor, geometry or typography
reconstruction, new symbol generation, AI regeneration, and placeholder
substitution require separate Owner visual authority.

Technical role recommendations remain pending Owner:

| Role | Technical candidate | Classification |
|---|---|---|
| Desktop header / footer | `PRIMARY_LOGO` downscale after legibility and layout review | `TECHNICALLY_RECOMMENDED_PENDING_OWNER` |
| Mobile header / social avatar / app icon | `COMPACT_MARK` downscale | `TECHNICALLY_RECOMMENDED_PENDING_OWNER` |
| Favicon | technical `COMPACT_MARK` downscale is demonstrably detail-constrained | `OWNER_DECISION_REQUIRED`; no simplification performed |
| Hero media | responsive `HERO` PNG/WebP without crop | `TECHNICALLY_RECOMMENDED_PENDING_OWNER`; composition deferred to C09 |
| Open Graph | current graphic remains active; any master-led composition is material | `OWNER_DECISION_REQUIRED` |
| 404 | replace textual `L/` only after approved shell role | `OWNER_DECISION_REQUIRED` |

Brand assets remain proprietary and separate from the future code license.
Public access does not grant reuse rights.
