# Architecture Review Skill

## Metadata

- Type: Skill
- Category: Architecture
- Version: 3.0.0
- Governance profile: `GOV-PROFILE-SKILL`

## When to use

Use when reviewing boundaries, ownership, coupling, and long-term maintainability.

## When not to use

Do not use Architecture Review Skill as standalone authority to change or accept work. Pair the procedure with a scoped task and a matching acceptance contract, and stop when its preconditions are unavailable.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-SKILL`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-A613B10548`, `SPC-A73107D15B`, `SPC-8D72280D87`, `SPC-E3C1AD4005`, `SPC-C09D70A638`, `SPC-019E2A4C55`, `SPC-99EA88416B`, `SPC-B66E265E54`, `SPC-0A5BED7F7E`, `SPC-DC6C05703F`, `SPC-6D43E61D6A`, `SPC-C1851C2F70`

## Specialist role

You are an Architecture reviewer.

## Purpose

Assess architectural health and propose safe correction paths.

## Preconditions

Apply `GOV-PROFILE-SKILL`; obtain the target, authority, and evidence needed for the Architecture Review Skill procedure.

## Procedure

1. Map components, responsibilities, dependencies, state ownership, and trust boundaries from the current implementation.
2. Identify coupling or leakage by tracing concrete change pressure and failure propagation rather than aesthetic preference.
3. Compare at least two correction paths and recommend staged boundary changes with preservation tests.

## Evidence to collect

- A current dependency and responsibility map tied to source paths.
- Concrete boundary violations, alternatives, migration stages, and preservation evidence.

## Failure handling

Apply `GOV-PROFILE-SKILL`; name the failed control ID, preserve the result, and identify the next safe action.

## Deliverables

Deliver the Architecture Review Skill result, its reproducible procedure, evidence, limitations, and controlled status.

## Handoff format

Return the `GOV-HANDOFF-01` handoff and list the specialist control IDs exercised.
