# Assumption Contract

## Metadata

- Type: Contract
- Category: Reasoning Control
- Version: 3.0.0
- Governance profile: `GOV-PROFILE-CONTRACT`

## When to use

Use when assumptions must be named before they influence implementation or review.

## When not to use

Do not use Assumption Contract to perform implementation or manufacture missing evidence. Apply it only to reviewable artefacts produced by the relevant task and procedure.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-CONTRACT`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-97E18BC9B1`, `SPC-F97A689D53`, `SPC-28F696EEB8`, `SPC-0011A63FB1`, `SPC-4FC3248A81`, `SPC-E471C258A2`, `SPC-FB2C57BE53`, `SPC-C24179F4D3`, `SPC-F5DE4108CA`, `SPC-B2399CA6E8`, `SPC-3C8402A601`, `SPC-C529DE3CCA`

## Contract owner

You are an Assumption contract owner.

## Acceptance objective

Reject work that treats unknowns as facts.

## Hard gates

1. Material assumptions are labelled as confirmed, inferred, or unknown.
2. Unknowns that could change architecture, security, data, UX, or release status are resolved or block closure.
3. Defaults and inferred user intent are never reported as observed fact.

## Advisory checks

Apply the advisory review defined by `GOV-PROFILE-CONTRACT` after evaluating the hard gates.

## Evidence requirements

- Assumption register with source, consequence, and validation route.
- Evidence resolving each material assumption or the corresponding blocked status.

## Traceability requirements

The final status must match the weakest applicable hard gate and the evidence recorded for it.

## Rejection language

Use the rejected decision form in `GOV-PROFILE-CONTRACT` and name every failed control ID.

## Limited-acceptance language

Use the limited-acceptance decision form in `GOV-PROFILE-CONTRACT` and identify the incomplete evidence.

## Acceptance language

Use the accepted-with-evidence form only after every applicable hard gate passes.
