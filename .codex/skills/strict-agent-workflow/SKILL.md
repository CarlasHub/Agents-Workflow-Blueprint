---
name: strict-agent-workflow
description: Use when a task in this repository should follow the full scoping, implementation, review, verification, and release-honesty workflow with real packet templates and repo contracts.
---

# Strict Agent Workflow

## Use this skill when

- the task changes repository files, prompts, contracts, workflow docs, examples, or validation scripts
- the task asks for implementation rather than brainstorming only
- the task asks whether a change is ready to merge or release

## Do first

1. Read `AGENTS.md`.
2. Read `docs/engineering/workflow.md`.
3. Read `requirements.toml`.
4. Read the contract files in `docs/engineering/contracts/`.
5. Read the relevant prompt in `PROMPTS/`.

## Workflow

1. Scope the task with `PROMPTS/scoping-agent.md` and preserve the headings from `docs/engineering/templates/scoping-packet-template.md`.
2. Implement only after the scope is bounded and approved.
3. Review against `PROMPTS/review-agent.md`.
4. Run specialist review when relevant:
   `PROMPTS/a11y-review-agent.md` for UI and interaction changes.
   `PROMPTS/security-review-agent.md` for auth, secrets, exports, permissions, or user data.
   `PROMPTS/release-agent.md` for docs, examples, screenshots, or release claims.
5. Run the verification commands from `requirements.toml`.
6. Report actual command results and remaining limitations.

## Repository-specific rules

- Do not treat placeholder scripts or sample tests as evidence of product correctness.
- Do not say a prompt workflow is enforced unless the validation scripts really check it.
- Do not refer to packet files or skills that do not exist in the repository.
- If a workflow artifact is missing, add it or mark the workflow incomplete.
