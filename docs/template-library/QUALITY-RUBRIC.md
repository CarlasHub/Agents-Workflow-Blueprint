# Quality Rubric for Agent Output

Use this rubric to score any agent response produced with this repository.

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

## Scientific control score

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
