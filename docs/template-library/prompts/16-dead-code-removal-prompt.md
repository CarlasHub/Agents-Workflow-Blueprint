# Dead Code Removal Prompt

## Metadata

- Type: Prompt
- Category: Clean-up
- Version: 3.0.0
- Governance profile: `GOV-PROFILE-PROMPT`

## When to use

Use when removing unused files, branches, exports, styles, docs, tests, or generated artefacts.

## When not to use

Do not use this when code is merely unfamiliar or untested; use Code Quality Deep Audit to establish liveness and ownership before deletion.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-PROMPT`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-A613B10548`, `SPC-A73107D15B`, `SPC-8D72280D87`, `SPC-E3C1AD4005`, `SPC-C09D70A638`, `SPC-019E2A4C55`, `SPC-99EA88416B`, `SPC-B66E265E54`, `SPC-0A5BED7F7E`, `SPC-DC6C05703F`, `SPC-6D43E61D6A`, `SPC-C1851C2F70`

## Required inputs

- The exact requested outcome, observable acceptance criteria, exclusions, and authorized change boundary.
- Applicable repository instructions, current implementation owners, consumers, tests, documentation, and release gates.
- Candidate files, symbols, routes, flags, configuration, assets, dependencies, or generated outputs proposed for removal.
- Static references, dynamic registration, reflection, build entry points, runtime telemetry, tests, documentation, and release compatibility.

## Specialist role

You are a Safe cleanup engineer.

## Task-specific mission

Remove only what is proven unused, preserve behaviour, and document the evidence used to decide.

## Task-specific instructions

1. Enumerate every candidate and its imports, exports, registrations, selectors, routes, commands, configuration keys, and generated relationships.
2. Search dynamic and indirect usage such as reflection, dependency injection, string lookup, plugin discovery, templates, and external consumers.
3. Classify candidates as confirmed dead, conditionally live, compatibility-retained, generated, or unknown.
4. Establish why the path became unused and whether its removal exposes stale callers, tests, documentation, or dependencies.
5. Remove only confirmed-dead code and associated tests, configuration, assets, docs, and dependencies in one coherent change.
6. Run build, type, test, packaging, and relevant runtime journeys capable of exposing missing registrations or assets.

## Decision gates

1. If dynamic, external, compatibility, or generated usage cannot be ruled out, do not delete; identify the owner or add observation.
2. If removal changes a public interface or stored/configured value, require a deprecation or migration decision.
3. Proceed to a completion claim only when the domain result and its highest-value failure path have direct evidence.

## Required evidence

- A liveness inventory with static, dynamic, runtime, generated, external, and compatibility evidence for each candidate.
- An exact removal diff covering associated tests, configuration, dependencies, assets, and documentation.
- Build, packaging, test, and representative runtime evidence after removal.
- Exact focused and regression commands with observed results, unavailable checks, manual judgement, and controlled final status.

## Failure modes and recovery

1. A supposedly dead symbol is dynamically resolved: restore it and add a discoverable registration or test.
2. Removal breaks an external consumer: revert or introduce an approved deprecation and migration path.
3. Generated content reappears: change the generator or exclude the generated artefact from direct removal.

## Task-specific rejection conditions

1. Reject deletion based solely on static search, coverage absence, or lack of recent commits.
2. Reject partial removals that leave stale configuration, dependencies, documentation, or generated references.
3. Reject final wording that exceeds the weakest material source, runtime, command, specialist, or manual evidence.

## Output format

Return this domain-specific record inside the `GOV-HANDOFF-01` handoff:

```markdown
# Dead-code liveness and removal record

- Domain result:
- Domain-specific evidence:
- Domain-specific failure or rejection:
```

## Worked example

For an old report route, check router registration, deep links, feature flags, analytics, docs, tests, and external bookmarks before deleting the handler and its configuration. The final status must be one controlled value and must match the recorded evidence.
