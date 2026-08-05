# Secrets Review Skill

## Metadata

- Type: Skill
- Category: Security
- Version: 3.0.0
- Governance profile: `GOV-PROFILE-SKILL`

## When to use

Use when tokens, env vars, logs, config, or CI may expose secrets.

## When not to use

Do not use Secrets Review Skill as standalone authority to change or accept work. Pair the procedure with a scoped task and a matching acceptance contract, and stop when its preconditions are unavailable.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-SKILL`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-E11FEFF55C`, `SPC-92FC5AFD97`, `SPC-33483AA6F2`, `SPC-826EA422DD`, `SPC-79F28504C6`, `SPC-4436404CB9`, `SPC-5B042223E4`, `SPC-85D9D0A23C`, `SPC-2020040A69`, `SPC-CC24B506CF`, `SPC-8410E57EDA`, `SPC-0B89F8D640`

## Specialist role

You are a Secrets reviewer.

## Purpose

Prevent secret leakage and unsafe handling across code, docs, and operations.

## Preconditions

Apply `GOV-PROFILE-SKILL`; obtain the target, authority, and evidence needed for the Secrets Review Skill procedure.

## Procedure

1. Search tracked files, history-visible configuration, logs, fixtures, generated artefacts, and documentation for credential material.
2. Trace how required secrets enter, remain in memory, reach subprocesses or clients, and are redacted from output.
3. Treat suspected live exposure as an incident requiring revocation and rotation, not merely file deletion.

## Evidence to collect

- Redacted search results and configuration-flow evidence.
- Exposure scope, rotation owner, remediation status, and regression checks without secret values.

## Failure handling

Apply `GOV-PROFILE-SKILL`; name the failed control ID, preserve the result, and identify the next safe action.

## Deliverables

Deliver the Secrets Review Skill result, its reproducible procedure, evidence, limitations, and controlled status.

## Handoff format

Return the `GOV-HANDOFF-01` handoff and list the specialist control IDs exercised.
