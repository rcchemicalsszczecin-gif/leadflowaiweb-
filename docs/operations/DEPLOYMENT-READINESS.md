# LEADFLOWAI — DEPLOYMENT READINESS V1

STATUS: NOT READY FOR PRODUCTION LAUNCH
DATE: 2026-08-12

## Already proven on work branch

- governance / source-of-truth foundation;
- design system and homepage;
- core commercial routes;
- SEO/AEO/GEO technical foundation;
- sitemap / robots / structured-data contracts;
- lead/contact route and controlled no-webhook fallback;
- site assistant local/fallback runtime behavior;
- real-only portfolio and knowledge architecture;
- TypeScript / Biome / production build CI;
- provider-neutral health endpoint and operations documentation.

## Still unresolved before production launch

### Hosting / runtime
- production hosting provider — UNSELECTED;
- deployment method — UNSELECTED;
- production environment identity — UNSELECTED;
- durable distributed rate-limit solution — UNSELECTED where required.

### Domain / TLS
- DNS cutover procedure — NOT AUTHORIZED;
- TLS termination/provider — NOT RECORDED;
- HSTS — intentionally NOT enabled before verified HTTPS deployment.

### Security policy
A baseline of low-risk response headers is implemented.
A production Content-Security-Policy is intentionally deferred until the final runtime/script/provider inventory is known and tested. A guessed CSP must not be shipped merely to satisfy a checklist.

### Lead delivery
- real destination/webhook — NOT CONFIGURED BY REPOSITORY EVIDENCE;
- successful end-to-end non-production delivery proof — REQUIRED before relying on the form for production leads.

### Remote AI provider
- provider — OPTIONAL / UNSELECTED;
- credentials — NOT IN REPOSITORY;
- successful provider-mode smoke — REQUIRED only if provider mode will be enabled at launch.

### Legal/public company data
Final required company registration/legal details and privacy/cookie texts must be reviewed against the actual production setup before launch. Unconfirmed identifiers must not be invented.

### Analytics / consent
Analytics and consent technology must be selected and validated against the actual deployment/legal basis before enabling production tracking.

## Launch decision

Stage 10 operational baseline does **not** constitute GO-LIVE approval.

Owner-authorized Stage 11 production acceptance must reconcile all unresolved items and issue explicit GO / NO-GO evidence.
