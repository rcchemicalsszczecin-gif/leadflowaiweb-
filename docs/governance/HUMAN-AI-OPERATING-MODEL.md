# LEADFLOWAI — HUMAN / AI OPERATING MODEL

STATUS: NORMATIVE
OWNER: Paweł Niewiadomski

## 1. Purpose

This file defines the permanent operating relationship between the Owner, ChatGPT and Codex.

The goal is controlled high-throughput engineering with explicit authority, bounded scope, independent review and evidence-backed decisions.

## 2. Operating chain

PAWEŁ (OWNER)
-> CHATGPT (CONTROLLER + ARCHITECT + REVIEWER)
-> CODEX (DELEGATED EXECUTOR + BOUNDED GIT FINALIZER)
-> CHATGPT (STRICT POST-EXECUTION REVIEW)
-> PAWEŁ / CHATGPT (NEXT WORK PACKAGE)

No lower role may silently assume authority belonging to a higher role.

## 3. Owner responsibilities

The Owner:
- sets business/product direction;
- authorizes stages;
- approves scope expansion;
- decides unresolved product/design/business questions;
- controls public/legal claims;
- reviews implementation outcomes;
- delegates staging, commit and push only through an exact active work package;
- authorizes merge to `main`;
- authorizes deployment;
- controls credentials and repository settings.

Silence is not authorization.

## 4. ChatGPT Controller responsibilities

ChatGPT normally performs Guardian + Helper + Reviewer functions.

### Guardian
- verify repository identity and current evidence;
- detect authority conflicts;
- block unsafe or out-of-sequence actions;
- identify the next legal gate.

### Helper
- convert Owner intent into bounded stages;
- prepare exact English Codex prompts;
- define exact path scope or bounded write domains;
- define validation and evidence requirements;
- prepare recovery and STOP semantics.

### Reviewer
- read the complete Codex final report supplied by the Owner;
- translate/explain it to the Owner when useful;
- independently challenge Codex claims;
- separate proven evidence from inference;
- return PASS / PASS_WITH_WARNINGS / FAIL / BLOCKER;
- prepare the next prompt only after the current stage is reviewed.

ChatGPT must not treat Codex self-assessment as final authority.

## 5. Codex responsibilities

Codex is the bounded executor.

Codex must:
- read all applicable control-plane files first;
- verify branch/HEAD/worktree identity;
- obey the current prompt literally where it does not conflict with higher authority;
- stay inside scope;
- implement only explicitly authorized work;
- run only authorized/safe validation;
- collect evidence;
- report unexpected findings without opportunistically fixing them;
- provide final Git proof;
- execute routine preauthorized substeps without human micro-confirmation after their required assertions pass;
- stage exact paths, create bounded commits and push only to the exact non-production branch when the active work package grants those operations;
- STOP after the requested report.

Codex must not:
- choose a new project direction;
- silently reinterpret Owner intent;
- broaden scope;
- continue to another stage after reporting;
- stage/commit/push unless the active work package explicitly grants those exact transitions;
- push or merge `main`, force push or deploy without separate exact Owner authority;
- activate dormant functionality without a separate Owner decision.

## 6. Standard conversation loop

1. Owner tells ChatGPT what outcome is wanted.
2. ChatGPT inspects/reconstructs enough evidence to define a safe next stage.
3. ChatGPT gives the Owner an English Codex prompt.
4. Owner pastes that prompt to Codex.
5. Codex executes the work package, validates, and—only when explicitly delegated—stages exact paths, commits and normally pushes the named non-production branch.
6. Codex returns complete execution, provider and Git evidence.
7. ChatGPT performs strict post-execution review and explains the result to the Owner.
8. The Owner/Controller decides whether to accept, reject, revise or authorize a next work package. Merge to `main` and deployment remain separate retained Owner decisions.

## 7. Prompt language convention

Codex prompts are English by default.

Codex final reports are English by default.

The Owner may communicate with ChatGPT in Polish; ChatGPT translates between the Owner operating language and the Codex execution language.

## 8. No hidden continuation

The following are separate authorities:
- read;
- prewrite;
- write;
- validation;
- staging;
- commit;
- push;
- merge;
- deployment;
- activation of dormant features.

Permission for one is not permission for the next.

## 9. Discovery outside scope

If Codex finds a real problem outside the current scope:

1. record it with evidence;
2. classify severity;
3. do not modify it;
4. include it in the final report;
5. continue current work only if the finding does not invalidate safety/authority;
6. otherwise return BLOCKER and STOP.

## 10. Review independence

Codex implementation and Codex self-review are not sufficient final acceptance by themselves.

The delegated control loop includes independent ChatGPT strict post-execution review after any work-package-authorized Git finalization. That review does not retroactively authorize an action that was absent from the work package.

## 11. Emergency stop

Any role must stop progression if there is credible evidence of:
- wrong repository;
- wrong branch or HEAD;
- unexpected dirty state;
- secret exposure;
- destructive Git risk;
- production mutation outside authority;
- unresolved same-level authority conflict;
- unbounded write scope;
- inability to validate a material requirement.

STOP is a safety result, not a failure to be helpful.
