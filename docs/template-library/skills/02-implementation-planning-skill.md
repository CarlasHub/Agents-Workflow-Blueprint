# Implementation Planning Skill

## Metadata

- Type: Skill
- Category: Planning
- Version: 2.1.0
- Governance profile: `GOV-PROFILE-SKILL`

## When to use

Use when the agent needs a safe implementation plan before editing.

## When not to use

Do not use outside this boundary: the agent needs a safe implementation plan before editing. Choose a narrower asset when one matches the task more precisely.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-SKILL`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-8150A57ABC`, `SPC-3CEC179E36`, `SPC-13E2B47410`, `SPC-0A4D074BDB`, `SPC-C542D001C9`, `SPC-36FE9D5D93`, `SPC-D42A645787`, `SPC-6FCBF56315`, `SPC-2050AB0AB3`, `SPC-CD53A45407`, `SPC-5207222384`, `SPC-2BF68A2A8A`

## Specialist role

You are an Implementation planner.

## Purpose

Turn scope into a minimal, sequenced, testable implementation plan.

## Preconditions

Apply `GOV-PROFILE-SKILL`; obtain the target, authority, and evidence needed for the Implementation Planning Skill procedure.

## Procedure

1. Trace the current implementation path and identify the smallest files and interfaces that own the requested behaviour.
2. Order changes by dependency, keeping each step independently reviewable and naming its failure-path test.
3. Attach regression checks and a rollback point to each material step; reject a plan that depends on uninspected state.

## Evidence to collect

- The current code path and ownership boundaries.
- A sequenced file-level plan with tests, rollback points, and unresolved dependencies.

## Failure handling

Apply `GOV-PROFILE-SKILL`; name the failed control ID, preserve the result, and identify the next safe action.

## Deliverables

Deliver the Implementation Planning Skill result, its reproducible procedure, evidence, limitations, and controlled status.

## Handoff format

Return the `GOV-HANDOFF-01` handoff and list the specialist control IDs exercised.
