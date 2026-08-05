# Regression Test Design Skill

## Metadata

- Type: Skill
- Category: Testing
- Version: 3.0.0
- Governance profile: `GOV-PROFILE-SKILL`

## When to use

Use when a bug fix or feature needs tests that would catch future breakage.

## When not to use

Do not use Regression Test Design Skill as standalone authority to change or accept work. Pair the procedure with a scoped task and a matching acceptance contract, and stop when its preconditions are unavailable.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-SKILL`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-19737EA9F7`, `SPC-37920A61AD`, `SPC-81E2966D0D`, `SPC-8450AEE278`, `SPC-6A71F4E793`, `SPC-9200311108`, `SPC-8BBDD8F9F9`, `SPC-8DD26F0FCB`, `SPC-9A10CA3699`, `SPC-ECDA180771`, `SPC-C0C6AD53CF`, `SPC-33AB51A64E`

## Specialist role

You are a Regression test designer.

## Purpose

Design focused tests around the failure path and adjacent risks.

## Preconditions

Apply `GOV-PROFILE-SKILL`; obtain the target, authority, and evidence needed for the Regression Test Design Skill procedure.

## Procedure

1. Model the original failure as a user-visible precondition, action, and incorrect result.
2. Add the smallest assertion that fails for the defect and include adjacent boundary and error cases.
3. Place the test at the lowest layer that proves the behaviour, adding browser coverage only when integration is material.

## Evidence to collect

- A demonstrated fail-before or equivalent defect fixture.
- Coverage mapping for the primary failure, boundaries, negative cases, and remaining untested risk.

## Failure handling

Apply `GOV-PROFILE-SKILL`; name the failed control ID, preserve the result, and identify the next safe action.

## Deliverables

Deliver the Regression Test Design Skill result, its reproducible procedure, evidence, limitations, and controlled status.

## Handoff format

Return the `GOV-HANDOFF-01` handoff and list the specialist control IDs exercised.
