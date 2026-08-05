# Quality Rubric for Agent Output

Use this rubric to score any agent response produced with this repository.

When reviewing an asset itself, reject duplicated governance prose, repeated inline specialist controls, unresolved `SPC-*` references, a source module presented as complete without composition, or a hollow module that delegates all specialist work to shared controls. Each asset needs distinct executable specialist content and evidence requirements; genuinely shared wording belongs in the kernel or specialist registry.

## v3 prompt source quality gate

Every prompt source must pass the deterministic checks in `scripts/check_template_library.py`. The minimum acceptance contract is:

1. 450–900 source words so the prompt is substantial without becoming an unbounded handbook.
2. A specific `When not to use` boundary that names a more appropriate alternative.
3. At least four concrete required inputs, consistent with the manifest.
4. Five to ten numbered, domain-specific instructions.
5. At least three decision gates, including two conditional stop, approval, or escalation gates.
6. At least four evidence requirements, including three concrete artefacts, commands, runtime observations, tables, logs, screenshots, tests, documents, or verifier outputs.
7. At least three explicit failure-mode and recovery pairs.
8. At least three task-specific rejection conditions.
9. A parseable domain output template that is placed inside the common `GOV-HANDOFF-01` handoff.
10. A worked example of at least 35 words with controlled final-status guidance.
11. A composed prompt between 900 and 1,800 words before source references.
12. At least 30% specialist source content in the composed prompt.

Passing these gates proves structural prompt quality, internal consistency, and deterministic composition. It does not prove model effectiveness. Behavioural comparisons require a disclosed recorded run under [`evaluation-methodology.md`](../engineering/evaluation-methodology.md).

## 5 — Strong accept

1. Scope is restated precisely.
2. Relevant files and instructions were inspected.
3. Assumptions are labelled.
4. Evidence exists for every material claim.
5. Commands are reported exactly.
6. UI, accessibility, security, docs, and release limits are checked when relevant.
7. Final status is honest.
8. Known limitations are disclosed.

## 4 — Accept with minor corrections

The work is mostly supported, but one low-risk evidence gap, wording issue, or documentation correction remains.

## 3 — Limited acceptance

Useful progress exists, but one important behaviour, edge case, command, or review lane is only partially verified.

## 2 — Reject for evidence gap

The answer may be plausible, but it does not provide enough file, command, UI, or manual-review evidence to accept.

## 1 — Reject for false confidence

The answer claims completion, release quality, accessibility, security, or correctness without evidence.

## 0 — Blocked

The answer invents facts, hides failures, removes safeguards, or changes scope without permission.

## Required verdict language

- `Accepted with evidence` only when proof exists.
- `Limited acceptance` when progress exists but evidence is incomplete.
- `Rejected` when a contract clause fails.
- `Blocked` when continued work is unsafe or impossible without missing inputs.

Use only one final status: verified, partially verified, not verified, blocked.

## Evidence-control score

Use this score when judging whether an agent output deserves acceptance.

1. **Observation** — Did the agent inspect the real artefacts before acting?
2. **Decomposition** — Did it break complex work into ordered subproblems?
3. **Branching** — Did it compare alternatives when the decision was material?
4. **Action containment** — Did it avoid unnecessary broad rewrites?
5. **Independent verification** — Did it cross-check source, command, behaviour, docs, and limitations?
6. **Correction loop** — Did failed checks become explicit correction requirements?
7. **Traceability** — Can every claim be mapped to requirement, artefact, evidence, and status?
8. **Failure disclosure** — Are missing proof and residual risk visible?

Reject outputs that are fluent but fail observation, verification, or traceability.

## Human-AI quality overlay

Use [`HUMAN-AI-QUALITY-STANDARD.md`](HUMAN-AI-QUALITY-STANDARD.md) when the output changes prompts, skills, contracts, rules, generated projects, user-facing AI behaviour, or governance language.

Reject output that:

1. Anthropomorphises the agent in a way that could mislead users.
2. Hides uncertainty, capability limits, or human escalation points.
3. Treats trust as a tone problem instead of an evidence problem.
4. Ignores automation bias and overreliance risk.
5. Ignores prompt injection, untrusted content, or excessive agency.
6. Ignores accessibility, cognitive load, or user correction paths.
7. Claims research, enterprise quality, safety, or compliance without a source map and verification evidence.
