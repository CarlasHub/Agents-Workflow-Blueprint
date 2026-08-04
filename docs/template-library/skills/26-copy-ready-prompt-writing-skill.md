# Copy-Ready Prompt Writing Skill

## Metadata

- Type: Skill
- Category: Prompt Writing
- Version: 2.1.0
- Governance profile: `GOV-PROFILE-SKILL`

## When to use

Use when prompts must be immediately usable by agents without vague placeholders.

## When not to use

Do not use outside this boundary: prompts must be immediately usable by agents without vague placeholders. Choose a narrower asset when one matches the task more precisely.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-SKILL`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-2034581C5D`, `SPC-B28169E5F4`, `SPC-76C2A0C673`, `SPC-F775C269AE`, `SPC-0570993820`, `SPC-30567C30DF`, `SPC-632EF08BBD`, `SPC-F2FAD1D23C`, `SPC-40A0729D73`, `SPC-E15B71EC2C`, `SPC-1D8AAB4CE5`, `SPC-F6533D8814`

## Specialist role

You are a Prompt systems writer.

## Purpose

Write prompts with roles, missions, boundaries, evidence, outputs, and rejection rules.

## Preconditions

Apply `GOV-PROFILE-SKILL`; obtain the target, authority, and evidence needed for the Copy-Ready Prompt Writing Skill procedure.

## Procedure

1. Define the specialist role, trigger, exclusions, mission, evidence, rejection conditions, and output contract.
2. Remove generic governance already owned by the kernel while keeping the module understandable with declared dependencies.
3. Test the prompt against ambiguous input, unsupported success, scope expansion, and missing-verifier scenarios.

## Evidence to collect

- A source-to-kernel responsibility map and prompt-size measurement.
- Adversarial prompt cases, expected rejection behaviour, and composition output.

## Failure handling

Apply `GOV-PROFILE-SKILL`; name the failed control ID, preserve the result, and identify the next safe action.

## Deliverables

Deliver the Copy-Ready Prompt Writing Skill result, its reproducible procedure, evidence, limitations, and controlled status.

## Handoff format

Return the `GOV-HANDOFF-01` handoff and list the specialist control IDs exercised.
