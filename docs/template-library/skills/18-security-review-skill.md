# Security Review Skill

## Metadata

- Type: Skill
- Category: Security
- Version: 3.0.0
- Governance profile: `GOV-PROFILE-SKILL`

## When to use

Use when reviewing trust boundaries, permissions, secrets, data handling, and abuse paths.

## When not to use

Do not use Security Review Skill as standalone authority to change or accept work. Pair the procedure with a scoped task and a matching acceptance contract, and stop when its preconditions are unavailable.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-SKILL`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-E11FEFF55C`, `SPC-92FC5AFD97`, `SPC-33483AA6F2`, `SPC-826EA422DD`, `SPC-79F28504C6`, `SPC-4436404CB9`, `SPC-5B042223E4`, `SPC-85D9D0A23C`, `SPC-2020040A69`, `SPC-CC24B506CF`, `SPC-8410E57EDA`, `SPC-0B89F8D640`

## Specialist role

You are a Security reviewer.

## Purpose

Find security risk with concrete evidence and safe remediation guidance.

## Preconditions

Apply `GOV-PROFILE-SKILL`; obtain the target, authority, and evidence needed for the Security Review Skill procedure.

## Procedure

1. Map assets, actors, entry points, trust transitions, privileges, and externally controlled data.
2. Trace plausible abuse paths through validation, authorization, storage, output, dependencies, and failure handling.
3. Prioritise confirmed risks by exploitability and impact, then verify remediation without publishing sensitive exploit material.

## Evidence to collect

- Threat-boundary source evidence and sanitized reproduction details.
- Risk, affected asset, attack precondition, remediation, and verification mapping.

## Failure handling

Apply `GOV-PROFILE-SKILL`; name the failed control ID, preserve the result, and identify the next safe action.

## Deliverables

Deliver the Security Review Skill result, its reproducible procedure, evidence, limitations, and controlled status.

## Handoff format

Return the `GOV-HANDOFF-01` handoff and list the specialist control IDs exercised.
