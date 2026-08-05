# Repository Mapping Skill

## Metadata

- Type: Skill
- Category: Repository Analysis
- Version: 3.0.0
- Governance profile: `GOV-PROFILE-SKILL`

## When to use

Use when the repository structure, authority files, and scripts must be understood before change.

## When not to use

Do not use Repository Mapping Skill as standalone authority to change or accept work. Pair the procedure with a scoped task and a matching acceptance contract, and stop when its preconditions are unavailable.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-SKILL`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-D6AF8F4F01`, `SPC-C6694B86EF`, `SPC-69CA4847DF`, `SPC-FC40062B6C`, `SPC-7464361C2D`, `SPC-F4B6552C89`, `SPC-D47AE1C625`, `SPC-99A67D91AE`, `SPC-86C2D9759A`, `SPC-F1F42D414B`, `SPC-D1ABD938E7`, `SPC-738D856382`

## Specialist role

You are a Repository mapper.

## Purpose

Build a reliable map of files, responsibilities, and validation routes.

## Preconditions

Apply `GOV-PROFILE-SKILL`; obtain the target, authority, and evidence needed for the Repository Mapping Skill procedure.

## Procedure

1. Locate instruction files, entry points, manifests, build scripts, tests, deployment configuration, and generated artefacts.
2. Trace ownership from public surface to implementation and verifier, recording ambiguous or duplicate authorities.
3. Publish a repository map that distinguishes source, generated output, runtime state, and release evidence.

## Evidence to collect

- Resolved paths for each authority, entry point, implementation owner, and verifier.
- Conflicts, missing owners, and generated/source boundaries found during mapping.

## Failure handling

Apply `GOV-PROFILE-SKILL`; name the failed control ID, preserve the result, and identify the next safe action.

## Deliverables

Deliver the Repository Mapping Skill result, its reproducible procedure, evidence, limitations, and controlled status.

## Handoff format

Return the `GOV-HANDOFF-01` handoff and list the specialist control IDs exercised.
