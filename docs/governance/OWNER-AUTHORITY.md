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
- staging approval;
- commit approval;
- push approval;
- merge to `main`;
- production deployment;
- destructive Git/history changes;
- credentials, secrets and repository settings.

## Delegation model

Authority is delegated per bounded action/stage, not permanently inferred from previous work.

Silence is not authorization.

A later explicit Owner instruction may supersede an earlier decision only inside the scope it explicitly changes.

## ChatGPT Controller

ChatGPT may inspect, analyze, prepare prompts, define bounded stages, review Codex reports and provide exact Git commands by default.

ChatGPT may mutate repository state only when the current Owner instruction explicitly authorizes that mutation.

## Codex Executor

Codex may inspect/analyze by default.

Codex may write only during an explicitly authorized WRITE stage.

Under the normal Owner-controlled workflow Codex may not:
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

Owner-controlled default:

REVIEW -> EXACT-PATH STAGE -> OWNER COMMIT -> OWNER PUSH -> POST-PUSH PROOF.

Implementation authority never implies Git-finalization authority.

## Production

Merge to `main` and production release are always Owner-controlled unless a current explicit Owner decision delegates one exact action.

No historical delegation is standing production authority.
