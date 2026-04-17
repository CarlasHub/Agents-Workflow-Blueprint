# Expected Good Scoping Packet

## Task restatement

Add a bounded comparison workflow for two completed audit runs while preserving existing run detail behaviour and keeping comparison state URL-driven.

## User-visible outcome

Authenticated team members can compare baseline and target runs side by side, understand deltas without relying on colour alone, and export a comparison summary only if the implemented export path supports it.

## Non-user-visible outcome

Comparison logic is reused from one authoritative domain path rather than duplicated across route, UI, and export layers.

## Intent boundaries

### In scope

- comparison route and state contract
- comparison summary UI and semantics
- comparison export only if already supported by the repository shape
- related docs, tests, and release evidence

### Out of scope

- redesigning unrelated dashboard pages
- adding a new charting dependency
- broad export-platform rewrites

### Dangerously adjacent areas

- role enforcement for export
- existing run-detail route parameters
- duplicate delta computation in multiple modules

## Assumptions

- grounded in docs: the domain includes comparison views and exports
- inferred but unconfirmed: current repository has an export path suitable for reuse
- inferred but unconfirmed: comparison data can be derived from completed runs without new schema work

## Risk map

### Functional risk

UI and export can diverge if delta logic is duplicated.

### Accessibility risk

Colour-only delta cues and async refresh status can become unclear.

### Security risk

Export authorization can drift from page-view authorization.

### Release-truthfulness risk

Docs can promise export formats that implementation does not support.

## Go / pause recommendation

PAUSE if the export path or authorization model is unconfirmed.
GO only after those surfaces are inspected.
