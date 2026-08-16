# C03 security source audit

Date: 2026-08-16

Scope: tracked `app/**`, `components/**`, `lib/**`, `scripts/**`, Next configuration, metadata/schema serialization, dormant runtime boundaries, and `.github/workflows/**`.

## Findings

| Area | Classification | Evidence / boundary |
|---|---|---|
| `eval`, `new Function`, raw `innerHTML`, `dangerouslySetInnerHTML` | `SAFE_BY_CONSTRUCTION` | No active product-source occurrence. Contract/test text is not runtime execution. |
| JSON-LD script | `SAFE_WITH_JUSTIFICATION` | `components/json-ld.tsx` emits only `application/ld+json`; serialization uses `JSON.stringify(data).replace(/</g, "\\u003c")`; no external script source. |
| External script/resource injection | `SAFE_BY_CONSTRUCTION` | No product-source external script injection; active CSS rejects external HTTP asset URLs and retired stock residue. |
| Client environment values | `SAFE_WITH_JUSTIFICATION` | Only explicitly public `NEXT_PUBLIC_SITE_URL` / `NEXT_PUBLIC_API_BASE_URL` configuration is used; no server secret is exposed to client code. |
| Lead/chat/API runtime | `SAFE_BY_CONSTRUCTION` | Static export has no `app/api` implementation; public chat and online lead delivery remain Owner-disabled and contract-checked. |
| Shell/process invocation | `SAFE_WITH_JUSTIFICATION` | Repository scripts use fixed commands/paths or bounded local route inventories; no untrusted web input reaches a shell. |
| GitHub Actions permissions | `SAFE_WITH_JUSTIFICATION` | Validation workflows use `contents: read`; only Pages retains `pages: write` and `id-token: write` for deployment. |
| Repository credentials | `SAFE_BY_CONSTRUCTION` | Whole-tracked scan uses `git ls-files`, redacts values, and is backed by runtime-only seeded negative tests. |

No P0 or P1 security defect was proven in the audited source. Provider hosting/release controls and any future runtime activation remain later-stage evidence; therefore this audit does not close the cross-stage `SEC-02` item.
