# Expected Good Review

## Executive verdict

CONDITIONAL PASS

## Release blockers

- Documentation still promises PDF export, but the change only proves CSV output.

## Major issues

- Delta computation now exists in both the route layer and export formatter, creating a drift risk.

## Technical missteps

- The comparison route owns shaping logic that should live in one reusable domain module.

## Accessibility findings

- `visual_composition_review`: red/green delta styling lacks a redundant text cue.
- `state_limited_review`: no evidence that async comparison refresh announces completion.

## Security findings

- moderate: export authorization is unverified, so the review cannot confirm parity with page-view authorization.

## Testing verdict

- missing regression coverage for missing-baseline error state
- missing focus-return assertion for closing the comparison drawer

## Documentation drift

- screenshot and example copy still describe the old filter layout

## Non-negotiable fixes before merge

- remove or prove the PDF export claim
- centralize delta computation
- add missing keyboard/focus regression coverage

## Optional follow-up improvements

- add a human-review note for chart summary comprehension if charts are introduced later
