# Scientific DNA of the Agent Workflow Blueprint

This document explains the research and engineering ideas behind the prompt, skill, and contract library. The goal is not to make exaggerated claims about prompts. The goal is to turn useful research patterns into repeatable, reviewable operating rules for coding agents.

## Core position

Strong agent prompts should not rely on inspiration, vibes, or motivational wording. They should create a controlled work loop:

1. observe the real state before acting;
2. decompose the task into smaller sub-problems;
3. compare more than one plausible route when risk is material;
4. act in the smallest safe step;
5. verify against evidence;
6. revise when evidence contradicts the first attempt;
7. map every final claim back to a requirement and proof source.

That is the product thesis of this repository.

## Critical correction: do not demand hidden chain-of-thought

Older prompt-writing advice often says to make the model “show its work”. For this repository, the safer rule is different:

> Ask for a public decision record, evidence table, branch comparison, and verification log — not private hidden chain-of-thought.

This preserves the benefit of structured reasoning while keeping the output useful, auditable, and safe for real review.

## Research patterns translated into repository behaviour

### 1. CoT-safe public reasoning record

Chain-of-thought research showed that stepwise intermediate reasoning can improve complex reasoning performance in large language models. This repository translates that into public artefacts: task restatement, evidence table, decision log, inspected files, failed checks, and final status.

Prompt rule used here:

```text
Do not give a bare conclusion. Provide a public decision record: task, evidence, alternatives considered, verification, limitations, and final status.
```

### 2. Tree-of-Thoughts style branch evaluation

Tree-of-Thoughts expands beyond one linear path by considering multiple candidate reasoning paths and evaluating them. This repository uses a lightweight version: compare at least two implementation or review paths when risk, ambiguity, or irreversible change is present.

Prompt rule used here:

```text
When the change is risky or ambiguous, produce at least two viable routes, reject weak routes with reasons, then choose the safest route with evidence.
```

### 3. ReAct observe-reason-act-verify loop

ReAct combines reasoning with action so the agent does not invent answers detached from the environment. This repository maps that into a strict loop for coding work: observe files, reason about constraints, act through edits or tests, observe results, then revise.

Prompt rule used here:

```text
Observe before acting. After every material action, observe the result before claiming success.
```

### 4. Least-to-most decomposition

Least-to-most prompting decomposes complex work into smaller sub-problems and solves them in sequence. This repository applies that pattern to implementation, debugging, UI work, accessibility remediation, security review, release review, and documentation repair.

Prompt rule used here:

```text
Solve the smallest blocking sub-problem first. Do not jump to a broad rewrite while the failure boundary is still unknown.
```

### 5. Self-consistency and branch agreement

Self-consistency work shows the value of considering multiple reasoning paths rather than accepting the first path. This repository uses a practical agent version: compare the chosen solution against at least one rival explanation, rejected route, or failure hypothesis.

Prompt rule used here:

```text
Before final status, test the chosen explanation against an alternative explanation and state why the final explanation survives.
```

### 6. Self-refinement and Reflexion-style repair

Self-refinement and Reflexion-style agent work show the value of feedback-driven revision. This repository uses that through failure disclosure, failed-command loops, review packets, and final repair recommendations.

Prompt rule used here:

```text
If verification fails, do not reframe the failure as success. Record the failure, update the hypothesis, and either repair or return blocked/partially verified.
```

### 7. Process supervision over outcome-only claims

Outcome-only claims are weak because they hide the route to the result. Process supervision research supports evaluating intermediate steps, not only the final answer. This repository turns that into process artefacts: current-state inspection, evidence ladders, command logs, screenshots, issue lists, and final status vocabulary.

Prompt rule used here:

```text
The final answer is not enough. The path to the answer must be inspectable.
```

### 8. Constitutional / contract-based constraints

Constitutional AI uses explicit principles to guide critique and revision. This repository applies the same product idea at workflow level: contracts define rejection clauses, limited-acceptance wording, and exact acceptance wording.

Prompt rule used here:

```text
Do not judge from confidence. Judge from clauses, evidence, and rejection triggers.
```

### 9. Systems-engineering traceability

Systems engineering standards separate requirements, verification, validation, lifecycle processes, and traceable evidence. This repository adapts that into acceptance contracts and release gates: every claim must map to a requirement, evidence source, verification result, and final status.

Prompt rule used here:

```text
Every material claim must trace to a requirement, inspected artefact, evidence source, and verification status.
```

## The elite prompt kernel

Every high-risk asset should contain this kernel:

```text
ROLE: specialist with authority to reject weak work.
MISSION: bounded outcome, not general helpfulness.
OBSERVE: inspect repository, UI, tests, data, docs, and constraints before acting.
DECOMPOSE: split the task into small sub-problems.
BRANCH: compare routes when risk or ambiguity exists.
ACT: make the smallest safe change or judgement.
VERIFY: run checks or state why checks are unavailable.
TRACE: map claims to requirements and evidence.
DISCLOSE: list unknowns, failures, and limitations.
STATUS: end with verified, partially verified, not verified, or blocked.
```

## What this repository does not claim

- It does not claim prompts guarantee correctness.
- It does not claim a model literally switches into a human-like “System 2”.
- It does not claim hidden reasoning should be exposed.
- It does not claim a passing script proves runtime UI, security, accessibility, or deployment behaviour.
- It does not replace human review for high-risk work.

## Why this matters

The real value is not that the prompts are long. The value is that they make weak behaviour difficult to hide:

- skipped inspection becomes visible;
- unsupported confidence becomes rejectable;
- broad scope drift becomes traceable;
- unverified UI claims become blocked;
- failed commands become part of the result instead of being buried.
