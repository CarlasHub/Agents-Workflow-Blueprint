# Codex Usage Guide

Use this repository as a layered instruction system.

## Recommended sequence

1. Give Codex the task.
2. Tell Codex to read `AGENTS.md`, `requirements.toml`, and `docs/engineering/workflow.md` first.
3. Select one prompt from `docs/template-library/prompts/`.
4. Add one skill from `docs/template-library/skills/` when the task needs a repeatable procedure.
5. Add one contract from `docs/template-library/contracts/` when the result needs acceptance or rejection.
6. Require exact command results and final status.

## Example instruction

```text
Use AGENTS.md and docs/engineering/workflow.md.
Then use docs/template-library/prompts/12-bug-root-cause-remediation-prompt.md,
docs/template-library/skills/12-regression-test-design-skill.md, and
docs/template-library/contracts/06-test-behaviour-contract.md.
Do not claim the bug is fixed unless the failure path is proven and verification results are reported.
```

## Model behaviour rule

Do not ask for broad generic help. Assign a specific role, a specific failure mode, and a specific contract.

## Handoff rule

Codex should end with:

- files changed
- why each file changed
- files inspected but not changed
- verification commands run
- results
- remaining limitations
- final status: verified, partially verified, not verified, or blocked


## Research-backed Codex operating loop

Use this message at the top of a complex Codex task:

```text
Use the Agent Workflow Blueprint scientific-DNA loop:
1. Observe the repository state before editing.
2. Decompose the task least-to-most.
3. Compare two routes if risk or ambiguity exists.
4. Act with the smallest safe change.
5. Observe verification results.
6. Refine if checks fail.
7. Map each claim to requirement, evidence, and status.
8. Provide a public decision record, not hidden chain-of-thought.
9. End with verified, partially verified, not verified, or blocked.
```

For Codex, combine one prompt, one skill, and one contract. Do not use a prompt alone for high-risk work.
