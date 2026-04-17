# Engineering Workflow

## Purpose

Define the actual handoff sequence for this repository's agent workflow.

This repository is a starter for prompt, workflow, and contract design.
Until a real application is added under `src/`, repository verification proves the integrity of the workflow assets themselves.
It does not prove a shipped product build.

## Required order

1. Scoping
2. Implementation
3. Review
4. Specialist review when relevant
5. Verification
6. Documentation and release notes

## Required artifacts

Use these templates rather than inventing ad hoc output:

- `docs/engineering/templates/scoping-packet-template.md`
- `docs/engineering/templates/review-packet-template.md`
- `docs/engineering/templates/accessibility-review-template.md`
- `docs/engineering/templates/security-review-template.md`
- `docs/engineering/templates/release-evidence-template.md`

For teaching and grading, also use:

- `docs/teaching/grading-rubric.md`
- `docs/teaching/student-submission-checklist.md`
- `docs/teaching/instructor-notes.md`
- `examples/exercises/exercise-001-comparison-view/`

## Phase details

### 1. Scoping

- Use `PROMPTS/scoping-agent.md`.
- Preserve the template headings from `docs/engineering/templates/scoping-packet-template.md`.
- Do not begin implementation until scope, risks, affected files, and verification expectations are explicit.

### 2. Implementation

- Use `PROMPTS/implementation-agent.md`.
- Read the approved scoping packet before changing files.
- Keep the diff bounded to the approved scope unless a blocker forces escalation.

### 3. Review

- Use `PROMPTS/review-agent.md`.
- Review the actual diff, changed docs, changed tests, and neighbouring files.
- A review is incomplete if it does not call out scope drift, correctness risks, test gaps, and documentation drift.

### 4. Specialist review when relevant

- Use `PROMPTS/a11y-review-agent.md` for UI, keyboard flow, focus, semantics, filters, dashboards, tables, charts, dialogs, or status messaging.
- Use `PROMPTS/security-review-agent.md` when the task touches auth, session state, access control, exports, secrets, provider keys, tokens, logging of sensitive data, or operational controls.
- Use `PROMPTS/release-agent.md` when docs, examples, screenshots, release notes, commands, or public capability claims changed.

### 5. Verification

- Run the commands listed in `requirements.toml`.
- Report actual results.
- If a command could not run, state the reason and the resulting evidence gap.

### 6. Documentation and release notes

- Update docs only to match verified behaviour.
- Disclose starter-level limits honestly.
- Do not imply that example files are production features.

## Subagent policy

- Do not delegate by default.
- Use subagents only for bounded, parallelizable work that does not block the immediate next step.
- If the platform or session requires explicit user permission to spawn subagents, do not spawn them implicitly.

## Starter-repository verification scope

The current repository validates:

- prompt structure and prompt-to-template linkage
- workflow docs and required artifacts
- example packet presence and example honesty
- teaching materials and canonical exercise presence
- unsupported-claim checks for key docs and examples
- starter build artifact generation for the workflow bundle

The current repository does not validate:

- a real browser application
- a production dashboard backend
- real export code
- real authentication flows

Those claims become valid only after the repository contains and verifies those systems.
