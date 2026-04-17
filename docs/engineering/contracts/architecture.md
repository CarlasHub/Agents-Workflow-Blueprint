# Architecture Contract

## Purpose

Prevent agents and humans from degrading the system through uncontrolled drift.

## Principles

1. Each feature must have a clear home.
2. UI concerns, business logic, data access, and background processing should not be mixed casually.
3. Shared abstractions must exist because they remove duplication or enforce policy, not because they look elegant.
4. Avoid hidden coupling through global state, unnamed conventions, or undocumented environment assumptions.
5. Each diff should make the system easier to reason about, or at least not harder.

## Repository expectations

- pages or routes orchestrate, they do not absorb all business logic
- components stay focused on rendering and interaction
- services and domain modules hold reusable logic
- background jobs and queue concerns remain explicit
- persistence and caching behaviour must be identifiable
- permission checks must be visible and testable
- observability hooks should not be hidden in random UI modules

## Anti-drift checks

Flag changes that:
- spread one feature across unrelated layers without need
- duplicate logic instead of reusing a stable domain module
- add "utils" files that hide business logic
- add a one-off pattern that conflicts with existing architecture
- introduce global mutable state without discipline
- create API behaviour that docs and clients cannot easily infer

## Dashboard-specific guidance

For internal engineering dashboards:
- chart rendering and chart data shaping should not be tangled together
- filters should have one authoritative state model
- export formatting should not rewrite query logic independently
- historical trend calculations should not be duplicated between API and UI
- auth and role-based access must not be implied by UI hiding alone
