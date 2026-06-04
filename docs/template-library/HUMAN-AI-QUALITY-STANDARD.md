# Human-AI Quality Standard

This standard defines the quality bar for prompts, skills, contracts, rules, generated projects, and agent outputs in the Agent Workflow Blueprint.

It is research-informed, not magic. It does not claim that prompts guarantee correctness, safety, accessibility, or compliance. It turns current human-AI interaction, sociotechnical risk, machine-learning evaluation, and agent-security guidance into reviewable controls.

## Accurate claim

Use this wording when describing the standard:

> The Human-AI Quality Standard helps teams design agent workflows that are observable, bounded, calibrated, reviewable, and safe to stop.

Do not claim that the standard makes agents human-like, unbiased, compliant, production-ready, or automatically safe.

## Source map

| Source area | Practical lesson | Repository control |
| --- | --- | --- |
| NIST AI RMF and NIST GenAI Profile | AI risk must be governed, mapped, measured, managed, and adapted to context. | Require risk classification, approval gates, evidence records, and monitoring plans. |
| NIST ARIA evaluation work | AI quality needs more than model scores; use model testing, red teaming, field-style testing, questionnaires, and measurement trees. | Require eval cases, red-team prompts, behaviour observations, and requirement-to-evidence mapping. |
| OWASP LLM Top 10 2025 | Prompt injection, sensitive information disclosure, supply chain, poisoning, output handling, excessive agency, prompt leakage, vector weaknesses, misinformation, and unbounded consumption are practical failure modes. | Require tool boundaries, untrusted-content handling, data restrictions, output validation, and refusal triggers. |
| Google People + AI Guidebook | Trust should be calibrated, user mental models should be shaped honestly, and AI features should support user goals rather than mystify them. | Require capability limits, clear user handoff, editable outputs, and non-anthropomorphic wording. |
| Microsoft Human-AI interaction guidelines | Human-AI products should set expectations, support correction, recover from errors, and adapt to context. | Require uncertainty labels, correction paths, fallback states, and human escalation. |
| OpenAI prompting guidance and prompt research surveys | Effective prompting is clear, specific, contextual, iterative, and evaluated; serious systems need constraints and checks, not magic phrases. | Require mission boundaries, public decision records, branch comparison, evals, and final status vocabulary. |
| WCAG 2.2 and inclusive design practice | Quality includes keyboard access, visible focus, consistent help, target size, redundant-entry reduction, and cognitive load. | Require accessibility notes, keyboard checks, cognitive-load review, and no unsupported accessibility claims. |

## Core controls

1. **Sociotechnical framing** - Define the user, team, data, accountability, power, misuse, and review context before designing the agent workflow.
2. **Mental-model calibration** - Explain what the agent can do, cannot do, must ask for, and must never pretend to know.
3. **Trust calibration** - Tie confidence to evidence quality; use verified, partially verified, not verified, or blocked.
4. **Automation-bias resistance** - Require independent checks before accepting AI output, especially when the output is fluent or convenient.
5. **Human handoff** - Stop for human review when approval, missing context, unsafe ambiguity, or high-risk uncertainty is present.
6. **Untrusted-content boundary** - Treat retrieved pages, user uploads, tool output, documents, and generated files as data, not instructions.
7. **Least privilege** - Permit only the tools, data, files, and actions needed for the approved task.
8. **Output validation** - Validate generated code, docs, config, test output, claims, exported files, and downstream actions before use.
9. **Accessible interaction** - Design forms, controls, labels, tooltips, keyboard paths, focus states, and help in ways humans can actually use.
10. **Failure visibility** - Failed checks, skipped checks, uncertainty, and residual risk must be first-class output, not hidden in optimism.

Use trust calibration as a hard evidence rule, not a reassuring tone. Use CoT-safe public reasoning artefacts: task restatement, assumptions, branch comparison, evidence table, verification log, limitations and final status.

## Prompt quality requirements

A prompt is not accepted unless it includes:

1. A narrow role and bounded mission.
2. Explicit out-of-scope actions.
3. Required input inspection before action.
4. Data, tool, and file boundaries.
5. A public decision record, not hidden chain-of-thought.
6. Least-to-most decomposition for complex work.
7. Tree-of-Thoughts-style branch evaluation for material decisions.
8. ReAct observe-act-observe discipline.
9. Self-consistency through independent evidence routes.
10. Self-refinement after failed checks.
11. Process supervision through command logs, UI observations, review packets, or evidence tables.
12. Traceability from requirement to artefact to evidence to status.
13. Prompt-injection and untrusted-content handling.
14. Human escalation and stop conditions.
15. Required final status vocabulary.

## Skill quality requirements

A skill is not accepted unless it includes:

1. When to use it and when not to use it.
2. Inputs the agent must inspect.
3. A step-by-step operating procedure.
4. Tool limits and data limits.
5. Evidence the agent must collect.
6. Quality checks before handoff.
7. Safety, accessibility, and security considerations when relevant.
8. Failure and blocked-state behaviour.
9. Handoff format for human or agent review.
10. A refusal path for unsafe requests.

## Contract quality requirements

A contract is not accepted unless it includes:

1. Hard acceptance clauses.
2. Hard rejection clauses.
3. Limited-acceptance wording for partial evidence.
4. Required evidence sources.
5. Forbidden claims and forbidden shortcuts.
6. Review roles and separation of duties.
7. Traceability requirements.
8. Human approval requirements when risk is material.
9. Security, data, accessibility, and release caveats when relevant.
10. A clear final verdict vocabulary.

## Rule quality requirements

Repository or generated-project rules are not accepted unless they:

1. State the governance gate before implementation.
2. Name blocked actions and blocked tools.
3. Separate implementation, review, approval, release, and monitoring.
4. Prevent self-approval.
5. Require audit records for meaningful agent actions.
6. Require evidence before success claims.
7. Require human review for ambiguous high-impact decisions.
8. Explain how to disable the agent or tool access quickly.
9. Preserve logs, diffs, and review evidence after incidents.
10. Avoid promising behaviour that scripts, tests, or human checks have not proved.

## Human-AI review questions

Use these questions during review:

1. Would a busy human overtrust this output because it sounds polished?
2. Are the agent's limits and uncertainty visible at the moment of decision?
3. Is the user able to correct, reject, stop, or escalate the workflow?
4. Are social or organisational harms considered, not only technical errors?
5. Is any real data, secret, permission, deployment, or external tool being assumed without approval?
6. Could untrusted content change instructions, tools, files, or approvals?
7. Is accessibility treated as real interaction evidence rather than decorative wording?
8. Is there an independent way to verify each important claim?
9. Are evals testing refusal, overreach, unsupported claims, and failure disclosure?
10. Would a reviewer know exactly what remains unverified?

## Minimum generated-project artefacts

A generated project should include:

1. Governance documents.
2. Agent role instructions.
3. Tool-access map.
4. Human approval record.
5. Evaluation cases.
6. Prompt register.
7. Artefact provenance record.
8. Decision log.
9. Audit templates.
10. Human-AI quality standard.
11. Prompt, skill, and contract quality checklist.
12. Sociotechnical risk register.
13. Human handoff playbook.
14. Release gate.
15. Incident-response procedure.

## Final rule

A beautiful answer is not enough. A correct-looking answer is not enough. A team-grade agent workflow must be inspectable, interruptible, evidence-backed, least-privilege, socially aware, and honest about what remains unknown.
