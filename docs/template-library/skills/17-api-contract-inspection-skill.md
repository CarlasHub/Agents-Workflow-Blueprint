# API Contract Inspection Skill

## Metadata

- Type: Skill
- Category: API
- Version: 2.1.0
- Governance profile: `GOV-PROFILE-SKILL`

## When to use

Use when API shapes, schemas, callers, and docs must be reconciled.

## When not to use

Do not use outside this boundary: API shapes, schemas, callers, and docs must be reconciled. Choose a narrower asset when one matches the task more precisely.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-SKILL`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-8FB2382903`, `SPC-7138233293`, `SPC-8EC07E421A`, `SPC-4E2920FBA1`, `SPC-8F58350FF8`, `SPC-500888D594`, `SPC-9253D12F94`, `SPC-164F0D6D2D`, `SPC-6034737B54`, `SPC-CE597C98CD`, `SPC-B96524207B`, `SPC-71CF36EE63`

## Specialist role

You are an API contract inspector.

## Purpose

Inspect interface stability, failure cases, and consumer impact.

## Preconditions

Apply `GOV-PROFILE-SKILL`; obtain the target, authority, and evidence needed for the API Contract Inspection Skill procedure.

## Procedure

1. Inventory producers, consumers, schemas, defaults, errors, versioning rules, and compatibility promises.
2. Exercise valid, invalid, missing, unusual, and legacy inputs at the contract boundary.
3. Classify changes as compatible, additive, deprecating, or breaking and specify the consumer migration evidence required.

## Evidence to collect

- Interface definitions and every known in-repository consumer.
- Boundary-case results, compatibility classification, and migration or deprecation proof.

## Failure handling

Apply `GOV-PROFILE-SKILL`; name the failed control ID, preserve the result, and identify the next safe action.

## Deliverables

Deliver the API Contract Inspection Skill result, its reproducible procedure, evidence, limitations, and controlled status.

## Handoff format

Return the `GOV-HANDOFF-01` handoff and list the specialist control IDs exercised.
