# LEADFLOWAI — RELEASE AND TAG POLICY

STATUS: NORMATIVE
OWNER: Paweł Niewiadomski

## 1. Authority and meaning

A Git tag or GitHub release is an identity and evidence record. It does not, by itself, authorize production deployment or prove that a commit is live.

The Owner retains final release and production-promotion authority. Codex has no standing authority to create, move, delete, or publish tags or releases. A current explicit Owner/Controller work package must name the exact operation and commit.

## 2. Release identity

- No release tag may be created before an exact accepted release identity exists.
- C25 owns assembly and acceptance of the immutable release candidate.
- C26 owns production promotion and hosting continuity execution.
- Every tag and release must resolve to, and record, one exact commit.
- Release evidence must distinguish candidate, accepted release, promoted production, and historical rollback identities.
- A release tag does not change production state and must never be used to imply deployment without provider evidence.

## 3. Immutability and rollback

- A published release tag must not be moved or repointed.
- Tag deletion requires separate explicit Owner authority.
- Rollback uses a previously verified commit and provider-state evidence; it must not rewrite or repoint release tags.
- Force push and published-history rewriting remain prohibited without separate explicit Owner authority.

## 4. Publication and signing boundary

- Publishing a GitHub release requires exact Owner/Controller package authority.
- No production tag or release is created by C02E or C03.
- Commit/tag signing is not required until an Owner-approved key custody and recovery model is proven.
- Absence of a signature must not be silently represented as proof of authorship or release approval.

## 5. Required receipt

A future authorized tag/release operation must record at minimum: tag name, exact commit, candidate acceptance evidence, authorizing work package, publication state, production-promotion state, provider response, and rollback identity.
