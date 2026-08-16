# OWNER AUTHORITY

STATUS: NORMATIVE
OWNER: Paweł Niewiadomski

Paweł Niewiadomski is the final authority for LeadFlowAI.

## Reserved Owner decisions

The Owner controls:
- product direction;
- stage authorization;
- scope expansion;
- brand identity;
- public claims;
- legal/business identity;
- final design selection;
- activation of dormant commercial/runtime features;
- repository/branch strategy changes;
- delegation of staging, commit and push authority through an exact active work package;
- merge to `main`;
- production deployment;
- destructive Git/history changes;
- credentials, secrets and repository settings.

## Delegation model

Authority is delegated per bounded work package/action/stage, not inferred from previous work.

The standing operating model permits an active Owner/Controller-authorized work package to delegate routine bounded execution, validation, exact-path staging, bounded commit, normal push to one explicitly named non-production branch, external evidence creation and exact provider mutations. The work package must state each granted capability and its prerequisites, write set, branch or endpoint, recovery boundary and STOP conditions.

Silence is not authorization.

A later explicit Owner instruction may supersede an earlier decision only inside the scope it explicitly changes.

## ChatGPT Controller

ChatGPT may inspect, analyze, prepare prompts, define bounded stages, review Codex reports and provide exact Git commands by default.

ChatGPT may mutate repository state only when the current Owner instruction explicitly authorizes that mutation.

## Codex Executor

Codex may inspect/analyze by default.

Codex may write only during an explicitly authorized WRITE stage.

By default, and whenever an active work package does not explicitly grant the operation, Codex may not:
- stage;
- commit;
- push;
- merge;
- deploy;
- switch/create/delete branches;
- change repository settings;
- activate analytics/chatbot/online lead delivery;
- infer authority for unrelated projects.

## Git finalization

Delegated work-package model:

OWNER/CONTROLLER WORK PACKAGE -> CODEX EXECUTION -> CODEX VALIDATION -> CODEX EXACT-PATH STAGE -> CODEX BOUNDED COMMIT -> CODEX NORMAL PUSH TO AUTHORIZED NON-PRODUCTION BRANCH -> CODEX EVIDENCE REPORT -> CHATGPT STRICT POST-EXECUTION REVIEW -> NEXT OWNER/CONTROLLER WORK PACKAGE.

Implementation authority never implies Git-finalization authority. Exact-path staging, commit and push must each be explicitly granted by the active work package. The Owner retains main promotion, merge, production deployment, force push and scope-expansion authority unless an exact later Owner instruction says otherwise.

## Production

Merge to `main` and production release are always Owner-controlled unless a current explicit Owner decision delegates one exact action.

No historical delegation is standing production authority.
