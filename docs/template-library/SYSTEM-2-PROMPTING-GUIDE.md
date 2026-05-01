# System 2 Prompting: Safe Interpretation

This repository uses “System 2” as a practical metaphor for slow, deliberate review. It does not claim that a language model literally switches into Daniel Kahneman’s human cognitive system.

## Useful interpretation

A System-2-style agent workflow means:

1. avoid instant closure;
2. inspect before acting;
3. split the task into smaller problems;
4. compare routes;
5. test the selected route;
6. disclose failed or missing checks;
7. trace claims to evidence.

## Unsafe interpretation

Do not say:

```text
This prompt tricks the AI into its most advanced mathematical pathway.
```

Say instead:

```text
This prompt uses deliberate-work controls that make the agent produce reviewable evidence before confidence.
```

## Copy-ready control clause

```text
Use deliberate-work mode: do not answer from first impression. Inspect inputs, decompose the task, compare at least one alternative when risk is material, act minimally, verify, and report limits before final status.
```


## Required research vocabulary cross-reference

This document participates in the same control vocabulary used across the library: CoT-safe public reasoning, Tree-of-Thoughts branch evaluation, ReAct observation loops, Least-to-most decomposition, Self-consistency checks, Self-refinement after failed checks, Process supervision, and traceability.
