# Risk Register Skill

## Metadata

- Type: Skill
- Category: Risk
- Version: 2.1.0
- Governance profile: `GOV-PROFILE-SKILL`

## When to use

Use when work requires a live list of risks, owners, mitigations, and verification gaps.

## When not to use

Do not use outside this boundary: work requires a live list of risks, owners, mitigations, and verification gaps. Choose a narrower asset when one matches the task more precisely.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-SKILL`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-D9266B2129`, `SPC-305203AAA3`, `SPC-3D20B487AD`, `SPC-EA427713A8`, `SPC-26C4D5B46B`, `SPC-35DB6BB883`, `SPC-7C1C296D50`, `SPC-069C123D49`, `SPC-7531ECF3F7`, `SPC-B7DED1701F`, `SPC-51A2F90F74`, `SPC-48BCE38DB5`

## Specialist role

You are a Risk register owner.

## Purpose

Create a risk register that drives review decisions instead of hiding uncertainty.

## Preconditions

Apply `GOV-PROFILE-SKILL`; obtain the target, authority, and evidence needed for the Risk Register Skill procedure.

## Procedure

1. Identify risks from concrete assets, threats, dependencies, uncertainties, and planned changes.
2. Score likelihood and impact using declared scales; name evidence, owner, trigger, treatment, due point, and residual risk.
3. Link high risks to release gates and review the register when evidence or scope changes.

## Evidence to collect

- Source evidence and rationale for every risk rating.
- Owner, treatment, trigger, status, residual exposure, and release-decision linkage.

## Failure handling

Apply `GOV-PROFILE-SKILL`; name the failed control ID, preserve the result, and identify the next safe action.

## Deliverables

Deliver the Risk Register Skill result, its reproducible procedure, evidence, limitations, and controlled status.

## Handoff format

Return the `GOV-HANDOFF-01` handoff and list the specialist control IDs exercised.
