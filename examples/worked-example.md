# Worked example: visible validation error

## Task

A fictional settings form silently rejects an empty project name. Add an accessible inline error while preserving entered data. The fixture contains no personal or production data.

## Selected assets

- Shared kernel: `docs/template-library/GOVERNANCE-KERNEL.md`
- Prompt: `prompts/27-accessibility-remediation-prompt.md`
- Skill: `skills/10-keyboard-testing-skill.md`
- Contract: `contracts/07-accessibility-contract-plus.md`

## Scoped work

Inspect the form submit handler, field markup, error renderer, focus management, styles, and tests. Change only the project-name validation path. Do not redesign the form, add a dependency, or claim overall conformance.

## Implementation evidence

The hypothetical patch adds a persistent error element, connects it with `aria-describedby`, sets `aria-invalid="true"` after failed validation, preserves other values, and focuses the first invalid control. The implementation does not add redundant live regions or replace the native input.

## Verification

Expected evidence for this fictional example:

1. A unit test proves empty and whitespace-only values are rejected.
2. A browser test submits the form, observes the connected error, verifies focus, and confirms other input remains.
3. A keyboard pass confirms focus remains visible and the correction path works.
4. An axe scan reports no serious violations in the tested form state.

No command is reported as passed here because this is a teaching example rather than an executed repository change.

## Limitations

The evidence would cover one validation state in the tested browser. It would not establish WCAG conformance, screen-reader usability across platforms, or correctness of unrelated form states.

## Final status

`not verified` — the example defines the required evidence but intentionally contains no fabricated execution result.
