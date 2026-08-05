# Codex Usage Guide

Use this repository as a layered instruction system.

## Recommended sequence

1. Give Codex the task.
2. Tell Codex to read `AGENTS.md`, `requirements.toml`, and `docs/engineering/workflow.md` first.
3. Select one prompt ID from `docs/template-library/assets.json`.
4. Add one skill from `docs/template-library/skills/` when the task needs a repeatable procedure.
5. Add one contract from `docs/template-library/contracts/` when the result needs acceptance or rejection.
6. Compose the selected IDs so the kernel and every shared control appear once. The default output is the body intended for Codex; use `--with-references` only for an audit or review copy.
7. Require exact command results and final status.

Example composition:

```bash
python3 -S scripts/compose_assets.py \
  --asset prompt-bug-root-cause-remediation-prompt \
  --asset skill-regression-test-design-skill \
  --asset contract-test-behaviour-contract
```

## Example instruction

```text
Use AGENTS.md and docs/engineering/workflow.md with the composed agent body for
the bug-remediation, regression-test-design, and test-behaviour assets produced by
scripts/compose_assets.py.
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


## research-informed Codex operating loop

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
