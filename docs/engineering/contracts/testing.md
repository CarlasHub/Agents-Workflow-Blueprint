# Testing Contract

## Purpose

Make sure tests prove real behaviour rather than provide decorative confidence.

## Test stack expectations

- unit tests for local logic and state transitions
- integration tests for domain flows
- Playwright tests for real user journeys
- accessibility checks for meaningful UI issues
- release verification for shipped artefacts and docs

## Rules

1. Prefer tests that match user-observable outcomes.
2. Avoid brittle selectors where user-facing locators exist.
3. Avoid tests that only verify implementation detail.
4. When a bug is fixed, add a regression test if practical.
5. When a task affects dashboard interaction, include loading, empty, and error states where relevant.

## Playwright standards

- prefer `getByRole`, `getByLabel`, `getByText` where appropriate
- assert visible outcomes, not just clicks
- assert focus when dialogs, menus, or drawers open or close
- assert applied filter state
- assert sort and pagination persistence if affected
- assert toast or status messaging when relevant

## Accessibility test expectations

Use automated checks to catch obvious failures.
Use targeted assertions for:
- labels
- headings
- roles
- state exposure
- status text
- dialog focus
- aria snapshots where helpful

## Release verification

Release verification is required when:
- docs changed
- screenshots changed
- export behaviour changed
- public claims changed
- build pipeline changed
