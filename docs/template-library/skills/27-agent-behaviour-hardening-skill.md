# Agent Behaviour Hardening Skill

## Metadata

- Type: Skill
- Category: Agent Control
- Version: 2.1.0
- Governance profile: `GOV-PROFILE-SKILL`

## When to use

Use when prompts or workflows need stronger controls against shortcuts and overclaiming.

## When not to use

Do not use outside this boundary: prompts or workflows need stronger controls against shortcuts and overclaiming. Choose a narrower asset when one matches the task more precisely.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-SKILL`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-2034581C5D`, `SPC-B28169E5F4`, `SPC-76C2A0C673`, `SPC-F775C269AE`, `SPC-0570993820`, `SPC-30567C30DF`, `SPC-632EF08BBD`, `SPC-F2FAD1D23C`, `SPC-40A0729D73`, `SPC-E15B71EC2C`, `SPC-1D8AAB4CE5`, `SPC-F6533D8814`

## Specialist role

You are an Agent behaviour hardener.

## Purpose

Add forcing functions that make weak evidence and fake completion visible.

## Preconditions

Apply `GOV-PROFILE-SKILL`; obtain the target, authority, and evidence needed for the Agent Behaviour Hardening Skill procedure.

## Procedure

1. Identify the exact weak behaviour, its trigger, and the evidence an agent currently bypasses.
2. Add the smallest forcing function that makes assumptions, missing tools, failed checks, or unsupported closure visible.
3. Exercise compliant, non-compliant, ambiguous, and blocked examples and verify the final-status outcome.

## Evidence to collect

- Before-and-after behaviour fixtures with no real sensitive data.
- Failure-mode results showing which control triggered and how status changed.

## Failure handling

Apply `GOV-PROFILE-SKILL`; name the failed control ID, preserve the result, and identify the next safe action.

## Deliverables

Deliver the Agent Behaviour Hardening Skill result, its reproducible procedure, evidence, limitations, and controlled status.

## Handoff format

Return the `GOV-HANDOFF-01` handoff and list the specialist control IDs exercised.
