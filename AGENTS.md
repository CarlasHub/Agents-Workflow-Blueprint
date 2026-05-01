# AGENTS.md

## Mission

Build and maintain production software without corrupting architecture, accessibility, release truthfulness, or team trust.

This repository assumes agents can read files, modify code, run commands, and propose diffs.
That means the repository must define rules more clearly than a normal codebase.

## Non-negotiable principles

1. Preserve existing functionality unless the task explicitly changes it.
2. Prefer the smallest correct diff that satisfies the requirement.
3. Do not invent requirements, APIs, dependencies, or hidden business rules.
4. Do not silently broaden scope.
5. Do not state that a feature works unless it has been verified through the required commands.
6. Do not state that a UI is accessible, compliant, or production-ready without evidence.
7. Do not update docs to promise capability the implementation has not proved.
8. Do not change visual design systems, shared tokens, routing contracts, auth flow, or data schemas unless the task clearly requires it.
9. If ambiguity could materially affect architecture, security, accessibility, or release safety, stop and raise it.
10. If you cannot prove something, say so plainly.

## Mandatory workflow

Every non-trivial task must follow this order:

1. Scoping
2. Implementation
3. Review
4. Specialist review when relevant
5. Verification
6. Documentation and release notes

Do not skip directly from implementation to release language.

Use the workflow and packet templates defined in `docs/engineering/workflow.md`.

## Required output for every task

Every agent delivering work must return:

- task summary
- files changed
- why each file changed
- assumptions made
- risks introduced
- verification commands run
- results of verification
- known limitations
- follow-up work if applicable
- packet or artifact templates used if the workflow required them

## Hard prohibitions

The agent must not:

- add new dependencies without explicit justification
- change package manager, framework, bundler, or CI tool by accident
- silently rewrite large files for stylistic reasons
- remove tests because they are inconvenient
- replace native semantics with worse ARIA
- weaken security settings to make tests easier
- hide failures behind TODO comments or optimistic wording
- turn advisory uncertainty into definitive claims

## Quality bar

A change is incomplete if any of the following are true:

- the feature works only in one happy path and no regression checks exist
- build, lint, tests, or mandated checks did not run
- accessibility impact was ignored for a UI change
- docs now say more than the code proves
- release notes omit known limitations
- the agent cannot explain why it changed each file

## Domain assumptions for the worked example in this repository

The example project is an internal engineering dashboard for teams that:
- monitors page performance and technical quality across many internal and external URLs
- stores test runs and historical trends
- exposes reports, alerts, comparisons, and evidence
- supports authenticated roles, auditability, exports, and policy-driven access

This example exists to force prompts and workflows to deal with realistic complexity:
- asynchronous jobs
- dashboards
- reporting APIs
- role-based access
- UI state
- accessibility requirements
- release honesty

## Review philosophy

Review should be stricter than implementation.

Implementation is cheap.
Trust is expensive.

The review agent is expected to be severe, evidence-driven, and unimpressed by surface neatness.


## Template library operating rule

When a task involves agent prompts, reusable skills, acceptance contracts, the GitHub Pages site, or repository workflow governance, inspect `docs/template-library/START-HERE.md`, `docs/template-library/CATALOGUE.md`, and the relevant prompt, skill, or contract before editing.

Do not add filler assets. A template-library asset is incomplete unless it is scenario-specific, copy-ready, evidence-led, and contains at least 20 meaningful enforcement points.

When maintaining this repository, run `python3 scripts/check_template_library.py` and `bash scripts/verify-release.sh` before claiming the workflow bundle is verified.
