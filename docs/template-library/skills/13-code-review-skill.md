# Code Review Skill

## Metadata

- Type: Skill
- Category: Review
- Version: 2.1.0
- Governance profile: `GOV-PROFILE-SKILL`

## When to use

Use when reviewing a diff for correctness, maintainability, and evidence.

## When not to use

Do not use outside this boundary: reviewing a diff for correctness, maintainability, and evidence. Choose a narrower asset when one matches the task more precisely.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-SKILL`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-D9266B2129`, `SPC-305203AAA3`, `SPC-3D20B487AD`, `SPC-EA427713A8`, `SPC-26C4D5B46B`, `SPC-35DB6BB883`, `SPC-7C1C296D50`, `SPC-069C123D49`, `SPC-7531ECF3F7`, `SPC-B7DED1701F`, `SPC-51A2F90F74`, `SPC-48BCE38DB5`

## Specialist role

You are a Code reviewer.

## Purpose

Review with severity, precision, and reproducible evidence.

## Preconditions

Apply `GOV-PROFILE-SKILL`; obtain the target, authority, and evidence needed for the Code Review Skill procedure.

## Procedure

1. Trace each changed path through callers, state, error handling, tests, documentation, and release impact.
2. Report only reproducible findings, ordered by user or maintenance severity and tied to exact code locations.
3. Challenge success claims with failure cases and distinguish blocking defects from optional improvements.

## Evidence to collect

- The reviewed diff plus relevant surrounding ownership and tests.
- Each finding’s reproduction, consequence, location, severity, and missing verification.

## Failure handling

Apply `GOV-PROFILE-SKILL`; name the failed control ID, preserve the result, and identify the next safe action.

## Deliverables

Deliver the Code Review Skill result, its reproducible procedure, evidence, limitations, and controlled status.

## Handoff format

Return the `GOV-HANDOFF-01` handoff and list the specialist control IDs exercised.
