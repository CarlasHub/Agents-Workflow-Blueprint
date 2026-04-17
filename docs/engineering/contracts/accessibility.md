# Accessibility Contract

## Purpose

Ensure UI work remains grounded in real user access rather than superficial compliance theatre.

## Baseline principles

1. Native semantics first.
2. Visible labels should generally provide the accessible name.
3. ARIA is used only when needed and correctly.
4. Keyboard operation is a first-class requirement.
5. Focus management must be intentional.
6. Status changes must be understandable.
7. Dense dashboards still need clear structure.

## Required for every UI-affecting task

The agent must identify:
- impacted user journeys
- semantics changed
- focus order changed
- keyboard interaction changed
- accessible name changes
- status message changes
- table or chart comprehension changes
- colour and perception risk

## Findings model

Use these categories:
- deterministic_failure
- corroborated_failure
- engine_limited_review
- state_limited_review
- visual_composition_review
- human_judgement_review
- advisory_note

## Wording restrictions

Never claim:
- fully accessible
- compliant
- WCAG passed
- accessible for screen readers

unless the repository's defined process has actually earned that statement.

## Dashboard-specific guidance

Internal dashboards create recurring problems:
- charts without meaningful summaries
- colour-coded severity with no redundant cue
- filters with weak labels
- data tables with poor column logic
- modals and drawers with weak focus return
- alert toasts that are visually obvious but poorly announced
- long pages with no landmarks or heading structure

## Review focus areas

- filter panels
- comparison controls
- segmented views
- tab systems
- error states
- CSV, PDF, and screenshot export controls
- audit-history tables
- drill-down drawers
- report share dialogs

## Testing guidance

Automated checks can catch important classes of issues.
They do not eliminate the need for judgement-based review.
