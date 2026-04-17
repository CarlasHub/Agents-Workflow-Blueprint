# Sample Scoping Packet

## Task restatement

Add a comparison summary view for two completed audit runs without changing unrelated run-detail behaviour.

## User-visible outcome

An authenticated team member can compare a baseline run and target run side by side and understand deltas without relying on colour alone.

## Non-user-visible outcome

Comparison state remains URL-driven and reuses existing query and export logic rather than duplicating it.

## Intent boundaries

### In scope

- comparison route wiring
- comparison summary UI
- delta calculation reuse
- keyboard and status behaviour for the comparison flow
- docs and tests affected by the new view

### Out of scope

- redesigning the dashboard shell
- adding a new chart library
- rewriting unrelated export infrastructure

### Dangerously adjacent areas

- route parameter contracts
- existing run-detail page state handling
- export format claims in docs

## Assumptions

- grounded in docs: comparison is part of the worked dashboard domain
- inferred but unconfirmed: existing export logic can be reused without schema changes
- inferred but unconfirmed: comparison data can be fetched through existing completed-run endpoints

## System areas likely affected

- routes
- comparison components
- export path
- tests
- docs

## Likely impacted files

### Probably must change

- comparison route module
- comparison summary component
- export summary formatter
- docs describing comparison behaviour

### May need inspection

- URL state store
- auth guard
- existing run detail tests

### Should remain untouched

- background job scheduler
- team administration settings

## Risk map

### Functional risk

Comparison can drift from existing run metrics if delta computation is duplicated.

### UX risk

Users can lose applied filter context when moving between run detail and comparison routes.

### Accessibility risk

Delta styling can rely on colour alone and async refresh can fail to announce completion.

### Security risk

Comparison export can leak runs a user may view in UI but not export if authorization checks are inconsistent.

### Performance risk

Side-by-side loading can trigger duplicate data requests for the same run.

### Operational risk

None beyond existing route and export deployment surfaces if no new services are introduced.

### Release-truthfulness risk

Docs can promise PDF or screenshot export even if only CSV or screen UI exists.

## Accessibility impact analysis

Keyboard order, headings, table summaries, delta labels, and async refresh status messaging are likely to change.

## Verification plan

### Automated checks

- route and state unit coverage
- integration coverage for delta computation reuse
- Playwright coverage for keyboard flow and focus return

### Manual checks

- screen-reader walkthrough of comparison load and error states
- visual review for colour-independent delta cues

### Evidence gaps

- final chart comprehension remains a human-judgement review area

## Documentation and communication impact

Comparison docs, screenshots, and release notes must describe the supported export format and any role restrictions exactly.

## Recommended execution plan

1. Confirm the route and URL state contract.
2. Reuse existing metric selectors or move them into one authoritative module.
3. Build the comparison summary UI with semantic headings and tables.
4. Add regression tests for keyboard flow, delta text, and missing-baseline errors.
5. Update docs and release evidence after verification.

## Go / pause recommendation

GO, provided the API shape for completed-run comparison is confirmed before implementation starts.
