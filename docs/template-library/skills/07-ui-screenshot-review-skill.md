# UI Screenshot Review Skill

## Metadata

- Type: Skill
- Category: UI/UX
- Version: 3.0.0
- Governance profile: `GOV-PROFILE-SKILL`

## When to use

Use when screenshots or rendered UI must be audited for defects and state mismatches.

## When not to use

Do not use UI Screenshot Review Skill as standalone authority to change or accept work. Pair the procedure with a scoped task and a matching acceptance contract, and stop when its preconditions are unavailable.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-SKILL`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-305A6BD2E2`, `SPC-FF71E3BF7A`, `SPC-05C37EDF4D`, `SPC-F8FF4EA263`, `SPC-A8B18A88EC`, `SPC-31A58C54A8`, `SPC-37E10661DA`, `SPC-85A2A812F0`, `SPC-93477ED152`, `SPC-56F3C0F154`, `SPC-E2C0B279DE`, `SPC-5AC175CF4D`

## Specialist role

You are a Screenshot reviewer.

## Purpose

Extract objective UI findings from visual evidence without pretending a screenshot proves all behaviour.

## Preconditions

Apply `GOV-PROFILE-SKILL`; obtain the target, authority, and evidence needed for the UI Screenshot Review Skill procedure.

## Procedure

1. Inventory visible hierarchy, alignment, spacing, typography, states, clipping, and content at the captured viewport.
2. Distinguish directly visible defects from interaction, responsive, and accessibility risks that a still image cannot prove.
3. Compare screenshots against the stated design intent and return findings with coordinates or named regions.

## Evidence to collect

- Original screenshots with viewport, state, and date context.
- Region-specific findings plus a separate list of runtime checks still required.

## Failure handling

Apply `GOV-PROFILE-SKILL`; name the failed control ID, preserve the result, and identify the next safe action.

## Deliverables

Deliver the UI Screenshot Review Skill result, its reproducible procedure, evidence, limitations, and controlled status.

## Handoff format

Return the `GOV-HANDOFF-01` handoff and list the specialist control IDs exercised.
