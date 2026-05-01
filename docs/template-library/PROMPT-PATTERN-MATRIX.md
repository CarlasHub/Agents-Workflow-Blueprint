# Prompt Pattern Matrix

Use this matrix to decide which research control belongs in which asset. The matrix is intentionally practical: it maps prompt-engineering research into reviewable behaviours.

| Pattern | Best for | Behaviour required | Evidence expected | Failure it prevents |
| --- | --- | --- | --- | --- |
| Chain-of-Thought summary | Complex reasoning, planning, audits | Concise public rationale and assumptions | Decision summary, assumption list, evidence table | Fluent final answers with no visible reasoning artefacts |
| Tree-of-Thoughts | Architecture, UI strategy, remediation choices | Compare multiple candidate branches | Rejected branch, selected branch, trade-off | Anchoring on first plausible solution |
| ReAct | Coding, debugging, UI review, repository inspection | Observe → act → observe loop | Files inspected, commands run, screenshots, logs | Hallucinated environment state |
| Least-to-Most | Large implementation tasks | Decompose into ordered subproblems | Subtask checklist with status | Big-bang changes and hidden scope creep |
| Self-Consistency | Verification and release claims | Cross-check independent evidence routes | Source + command + behaviour + docs comparison | Trusting one lucky passing signal |
| Reflexion | Failed tests, debugging, remediation | Turn failed feedback into a correction note | Failure log and second attempt rationale | Repeating the same error after feedback |
| System 2 forcing | High-risk review and final answer | Slow checklist, uncertainty labels, premortem | Premortem, risk list, final status | Completion bias and premature closure |
| Traceability | Contracts, release, compliance | Map every claim to a requirement and verifier | Requirement → artefact → evidence → status | Unsupported acceptance and hallucinated features |

## Minimum pattern stack by task

1. **Any coding task**: ReAct + Least-to-Most + Traceability.
2. **Bug fix**: ReAct + Reflexion + Self-Consistency + Traceability.
3. **UI review**: ReAct + Self-Consistency + Traceability + System 2 forcing.
4. **Accessibility remediation**: ReAct + Traceability + Self-Consistency + Standards mapping.
5. **Architecture or refactor**: Tree-of-Thoughts + Least-to-Most + Premortem + Traceability.
6. **Release claim**: Self-Consistency + Traceability + System 2 forcing + Premortem.
7. **Security or privacy**: Premortem + Traceability + ReAct + Self-Consistency.
8. **Documentation truthfulness**: ReAct + Traceability + Self-Consistency.
9. **Template writing**: Chain-of-Thought summary + Tree-of-Thoughts + Traceability.
10. **Final merge gate**: All controls, with extra weight on evidence and rejection clauses.

## Required phrasing standard

Use evidence-facing phrasing:

- Good: “I inspected `path`, ran `command`, observed `result`, and the remaining unverified area is `x`. Final status: partially verified.”
- Bad: “I reasoned through it and everything should work.”

Use branch-aware phrasing:

- Good: “I considered A and B. A was rejected because it changes shared behaviour. B was selected because it satisfies the requirement with lower regression risk.”
- Bad: “I picked the simplest approach.”

Use traceability phrasing:

- Good: “Requirement → file → command/manual check → status.”
- Bad: “Feature complete.”
