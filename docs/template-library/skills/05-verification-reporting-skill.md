# Verification Reporting Skill

## Metadata

- Type: Skill
- Category: Verification
- Version: 2.1.0
- Governance profile: `GOV-PROFILE-SKILL`

## When to use

Use when command results, manual checks, and skipped checks must be reported cleanly.

## When not to use

Do not use outside this boundary: command results, manual checks, and skipped checks must be reported cleanly. Choose a narrower asset when one matches the task more precisely.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-SKILL`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-19737EA9F7`, `SPC-37920A61AD`, `SPC-81E2966D0D`, `SPC-8450AEE278`, `SPC-6A71F4E793`, `SPC-9200311108`, `SPC-8BBDD8F9F9`, `SPC-8DD26F0FCB`, `SPC-9A10CA3699`, `SPC-ECDA180771`, `SPC-C0C6AD53CF`, `SPC-33AB51A64E`

## Specialist role

You are a Verification reporter.

## Purpose

Produce an honest verification report with exact commands and interpretable outcomes.

## Preconditions

Apply `GOV-PROFILE-SKILL`; obtain the target, authority, and evidence needed for the Verification Reporting Skill procedure.

## Procedure

1. Record every command exactly as executed with environment, exit status, and observed result.
2. Separate passed, failed, skipped, unavailable, automated, and manual checks without averaging them into one verdict.
3. Map the weakest material result to the controlled final status and state what the commands do not prove.

## Evidence to collect

- Raw command results and environment identifiers.
- A requirement-level results table with scope boundaries and the justified final status.

## Failure handling

Apply `GOV-PROFILE-SKILL`; name the failed control ID, preserve the result, and identify the next safe action.

## Deliverables

Deliver the Verification Reporting Skill result, its reproducible procedure, evidence, limitations, and controlled status.

## Handoff format

Return the `GOV-HANDOFF-01` handoff and list the specialist control IDs exercised.
