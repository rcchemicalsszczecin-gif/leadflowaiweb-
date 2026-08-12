# GIT SAFETY POLICY

STATUS: NORMATIVE

- Inspect repository identity before mutation.
- Preserve `main` while implementation is under active review.
- Prefer a feature branch for multi-stage development.
- No force-push or history rewrite.
- No unrelated staging/commits.
- No secrets in Git.
- Actual changed paths must match stage scope.
- Feature-branch commits are allowed by the current Owner authorization to begin implementation.
- Merge to `main` and production release remain Owner-controlled until explicitly delegated.
