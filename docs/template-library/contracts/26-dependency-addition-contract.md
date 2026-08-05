# Dependency Addition Contract

## Metadata

- Type: Contract
- Category: Dependency
- Version: 3.0.0
- Governance profile: `GOV-PROFILE-CONTRACT`

## When to use

Use before adding packages, frameworks, tools, or external services.

## When not to use

Do not use Dependency Addition Contract to perform implementation or manufacture missing evidence. Apply it only to reviewable artefacts produced by the relevant task and procedure.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-CONTRACT`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-A613B10548`, `SPC-A73107D15B`, `SPC-8D72280D87`, `SPC-E3C1AD4005`, `SPC-C09D70A638`, `SPC-019E2A4C55`, `SPC-99EA88416B`, `SPC-B66E265E54`, `SPC-0A5BED7F7E`, `SPC-DC6C05703F`, `SPC-6D43E61D6A`, `SPC-C1851C2F70`

## Contract owner

You are a Dependency contract owner.

## Acceptance objective

Require necessity, risk review, alternatives, and maintenance cost assessment.

## Hard gates

1. The dependency solves a documented need that existing code or a smaller option cannot reasonably meet.
2. Licence, provenance, maintenance, security, size, runtime, and transitive risks are reviewed.
3. Versioning, lockfile, update policy, failure behavior, and removal path are defined and tested.

## Advisory checks

Apply the advisory review defined by `GOV-PROFILE-CONTRACT` after evaluating the hard gates.

## Evidence requirements

- Alternatives record, authoritative package metadata, and lockfile diff.
- Audit results, bundle/runtime impact, integration tests, owner, and removal plan.

## Traceability requirements

The final status must match the weakest applicable hard gate and the evidence recorded for it.

## Rejection language

Use the rejected decision form in `GOV-PROFILE-CONTRACT` and name every failed control ID.

## Limited-acceptance language

Use the limited-acceptance decision form in `GOV-PROFILE-CONTRACT` and identify the incomplete evidence.

## Acceptance language

Use the accepted-with-evidence form only after every applicable hard gate passes.
