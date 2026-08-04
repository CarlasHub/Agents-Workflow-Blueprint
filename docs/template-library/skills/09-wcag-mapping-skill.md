# WCAG Mapping Skill

## Metadata

- Type: Skill
- Category: Accessibility
- Version: 2.1.0
- Governance profile: `GOV-PROFILE-SKILL`

## When to use

Use when translating accessibility findings into WCAG 2.2 references and remediation evidence.

## When not to use

Do not use outside this boundary: translating accessibility findings into WCAG 2.2 references and remediation evidence. Choose a narrower asset when one matches the task more precisely.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-SKILL`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-ECB7DBF3BE`, `SPC-281E77FD8F`, `SPC-B25B6C49C9`, `SPC-B75C7DAC35`, `SPC-43CE9442C3`, `SPC-E488688DB6`, `SPC-1A84B8E4BD`, `SPC-584BE13706`, `SPC-FF3BE787A8`, `SPC-68342B1555`, `SPC-8897CA6C8F`, `SPC-F771CE14DC`

## Specialist role

You are a WCAG mapping specialist.

## Purpose

Map issues carefully without overclaiming coverage.

## Preconditions

Apply `GOV-PROFILE-SKILL`; obtain the target, authority, and evidence needed for the WCAG Mapping Skill procedure.

## Procedure

1. Describe the observed user-facing failure before selecting any success criterion.
2. Map only criteria whose normative requirement directly applies, recording level, version, and supporting evidence.
3. Separate confirmed failures, review issues, best practices, and criteria that remain untested.

## Evidence to collect

- The reproducible user impact and relevant normative criterion text or authoritative reference.
- A criterion map with applicability rationale, evidence type, and confidence boundary.

## Failure handling

Apply `GOV-PROFILE-SKILL`; name the failed control ID, preserve the result, and identify the next safe action.

## Deliverables

Deliver the WCAG Mapping Skill result, its reproducible procedure, evidence, limitations, and controlled status.

## Handoff format

Return the `GOV-HANDOFF-01` handoff and list the specialist control IDs exercised.
