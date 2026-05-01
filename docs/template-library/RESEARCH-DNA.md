# Research DNA for Agent Workflow Blueprint

This page turns the research concepts behind the library into practical controls that can be checked in real work. The goal is not to make dramatic claims about prompts. The goal is to make coding-agent behaviour more observable, more bounded, and harder to falsely complete.

## Important correction

Do not describe this library as “tricking the AI into mathematical pathways.” That wording is too strong and not scientifically precise. A better product claim is:

> These templates impose deliberation, decomposition, environment-observation, self-checking, and traceability constraints so agents are less likely to close work before evidence exists.

## The method stack

1. **Chain-of-Thought prompting**  
   Source: Wei et al. (2022), *Chain-of-Thought Prompting Elicits Reasoning in Large Language Models*.  
   Translation in this repo: require a concise reasoning summary, assumptions, selected path, rejected path, and evidence ledger before final status. Do not require a long hidden-thought transcript.

2. **Tree-of-Thoughts**  
   Source: Yao et al. (2023), *Tree of Thoughts: Deliberate Problem Solving with Large Language Models*.  
   Translation in this repo: ask the agent to compare multiple candidate branches when a task has meaningful alternatives, then reject weak branches before editing.

3. **ReAct: Reason + Act**  
   Source: Yao et al. (2022), *ReAct: Synergizing Reasoning and Acting in Language Models*.  
   Translation in this repo: force an observe → act → observe loop so the agent checks files, UI, commands, logs, and docs instead of inventing the state of the system.

4. **Least-to-Most prompting**  
   Source: Zhou et al. (2022), *Least-to-Most Prompting Enables Complex Reasoning in Large Language Models*.  
   Translation in this repo: decompose work into small ordered subproblems and verify each step before using it as a foundation for the next step.

5. **Self-Consistency**  
   Source: Wang et al. (2022), *Self-Consistency Improves Chain of Thought Reasoning in Language Models*.  
   Translation in this repo: compare independent evidence routes — source inspection, command output, behaviour, screenshots, docs — before accepting a claim.

6. **Reflexion**  
   Source: Shinn et al. (2023), *Reflexion: Language Agents with Verbal Reinforcement Learning*.  
   Translation in this repo: when checks fail, the agent must convert feedback into a correction note before trying again.

7. **System 2 / cognitive forcing**  
   Source: Kahneman (2011), *Thinking, Fast and Slow*.  
   Translation in this repo: use forced checklists, uncertainty labels, premortems, and adversarial review to slow down premature closure.

8. **Formal verification and traceability**  
   Source: ISO/IEC/IEEE 15288-style systems-engineering lifecycle concepts.  
   Translation in this repo: every acceptance claim must map to requirement, artefact, evidence, verifier, and status.

## Prompt design principles used here

1. State the role narrowly enough to prevent vague behaviour.
2. Define a mission that can be accepted or rejected.
3. Separate the user request from inferred goals.
4. Require repository observation before planning.
5. Label assumptions as confirmed, inferred, or unknown.
6. Decompose complex work into small ordered subproblems.
7. Compare alternative branches when a decision is material.
8. Prefer the smallest safe implementation that satisfies the requirement.
9. Use environment feedback before final claims.
10. Convert failed checks into correction notes.
11. Keep implementation, review, and release judgement separate.
12. Require evidence for claims rather than fluent confidence.
13. Use contracts as rejection language, not polite suggestions.
14. Preserve explicit final status vocabulary.
15. Require limitations even when the work is strong.
16. Treat missing runtime, UI, accessibility, security, or test proof as not verified.
17. Reject scope drift unless explicitly approved.
18. Record commands exactly as executed.
19. Require reviewer-reproducible evidence.
20. Do not let a passing command prove unrelated behaviour.
21. Use specialist prompts for UI, accessibility, security, testing, docs, and release risk.
22. Provide a handoff that can be audited without trusting the agent.
23. Keep examples practical and reject weak outputs visibly.
24. Avoid marketing claims that exceed verification.
25. Ensure every template has enough substance to stand alone.

## What this library does not claim

- It does not guarantee model correctness.
- It does not replace human review.
- It does not prove live application behaviour without running the live application.
- It does not claim that longer prompts are automatically better.
- It does not claim that public chain-of-thought text is required. The product uses concise reasoning summaries and evidence ledgers.

## Strong product positioning

Use this wording:

> Agent Workflow Blueprint is a research-informed prompt, skill, and contract library for controlling coding-agent behaviour through decomposition, environment observation, adversarial review, evidence traceability, and explicit failure disclosure.
