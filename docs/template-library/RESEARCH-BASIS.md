# Research and Standards Basis

This library is not a research paper and does not claim that one prompt design solves agent reliability. It translates well-known prompt-engineering patterns, cognitive-review controls, and systems-engineering discipline into reusable prompts, skills, and acceptance contracts.

## Accurate product claim

The assets are **research-informed**, not magic. They are designed to improve structure, evidence discipline, reviewability, and failure disclosure. They do not guarantee correct output by themselves.

## Important correction to common prompt advice

Do not design serious agent workflows around revealing hidden chain-of-thought. Use **CoT-safe public reasoning artefacts** instead:

- task restatement;
- assumptions table;
- branch comparison;
- decision log;
- inspected files and UI states;
- command output;
- verification table;
- failure disclosure;
- final status.

That gives reviewers useful reasoning structure without requiring private reasoning traces.

## Research patterns mapped to this library

| Pattern | Source idea | Repository translation |
| --- | --- | --- |
| Chain-of-Thought | Stepwise intermediate reasoning can improve complex reasoning. | Use public decision records, not hidden chain-of-thought. |
| Tree-of-Thoughts | Explore and evaluate multiple reasoning paths. | Require branch comparison for ambiguous/risky choices. |
| ReAct | Interleave reasoning and action with environmental observations. | Observe files/tests/UI before editing; observe results after actions. |
| Least-to-Most | Decompose hard tasks into easier sub-problems solved in sequence. | Force atomic implementation, debugging, and review steps. |
| Self-Consistency | Compare multiple reasoning paths before settling on an answer. | Require rival hypothesis or alternative route checks. |
| Self-Refine / Reflexion | Use feedback and failed attempts to improve later attempts. | Treat failed checks as inputs for revision, not as embarrassment. |
| Process supervision | Evaluate the route to an answer, not just the final result. | Require evidence ladders, command logs, and traceable statuses. |
| Constitutional / contract-based critique | Use explicit principles for critique and revision. | Use acceptance contracts with rejection wording. |
| Systems-engineering traceability | Map requirements to verification evidence. | Require claim → requirement → evidence → status mapping. |

## Behavioural controls used across the library

1. **Checklist discipline** — repeated, explicit checks reduce missed steps during complex work.
2. **Cognitive forcing** — the assets force assumptions, uncertainty, scope, and evidence to be stated before final claims.
3. **Premortem analysis** — agents must imagine failure before closing the task, which exposes risks that optimistic implementation often misses.
4. **Adversarial review** — agents must search for evidence against their own preferred conclusion.
5. **Evidence calibration** — confidence must be tied to inspected files, runtime behaviour, command results, and manual checks.
6. **Separation of duties** — implementation, review, specialist review, and release judgement are intentionally separated.
7. **Acceptance contracts** — contracts are phrased as rejection rules so incomplete work is easier to stop.
8. **Traceability** — every material output claim must be tied to a requirement, artefact, evidence source, and status.
9. **Branch comparison** — risky tasks must compare more than one path before committing to a route.
10. **Failure visibility** — failed checks, skipped checks, blocked tools, and uninspected behaviour are first-class outputs.

## Standards and documentation mapped into the assets

- Wei et al., “Chain-of-Thought Prompting Elicits Reasoning in Large Language Models”: https://arxiv.org/abs/2201.11903
- Yao et al., “Tree of Thoughts: Deliberate Problem Solving with Large Language Models”: https://arxiv.org/abs/2305.10601
- Yao et al., “ReAct: Synergizing Reasoning and Acting in Language Models”: https://arxiv.org/abs/2210.03629
- Zhou et al., “Least-to-Most Prompting Enables Complex Reasoning in Large Language Models”: https://arxiv.org/abs/2205.10625
- Wang et al., “Self-Consistency Improves Chain of Thought Reasoning in Language Models”: https://arxiv.org/abs/2203.11171
- Shinn et al., “Reflexion: Language Agents with Verbal Reinforcement Learning”: https://arxiv.org/abs/2303.11366
- Madaan et al., “Self-Refine: Iterative Refinement with Self-Feedback”: https://arxiv.org/abs/2303.17651
- Lightman et al., “Let’s Verify Step by Step”: https://arxiv.org/abs/2305.20050
- Bai et al., “Constitutional AI: Harmlessness from AI Feedback”: https://arxiv.org/abs/2212.08073
- ISO/IEC/IEEE 15288 systems and software engineering lifecycle framing: https://www.iso.org/standard/81702.html
- WCAG 2.2 accessibility success criteria and supporting guidance: https://www.w3.org/TR/WCAG22/
- NIST SSDF secure software development practices: https://csrc.nist.gov/pubs/sp/800/218/final
- OWASP Cheat Sheet Series practical security guidance: https://cheatsheetseries.owasp.org/

## Important limitation

The assets improve structure, consistency, and evidence discipline. They do not guarantee correct output by themselves. A reviewer must still inspect the actual code, UI, tests, commands, and limitations.


## Required research vocabulary cross-reference

This document participates in the same control vocabulary used across the library: CoT-safe public reasoning, Tree-of-Thoughts branch evaluation, ReAct observation loops, Least-to-most decomposition, Self-consistency checks, Self-refinement after failed checks, Process supervision, and traceability.
