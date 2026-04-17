# Instructor Notes

## Purpose

Help instructors distinguish high-quality agent workflow submissions from polished but misleading output.

## What weak agent work looks like

### Weak scoping

Warning signs:

- repeats the task brief without narrowing it
- lists vague impacted areas like "frontend" and "backend" without file-level grounding
- treats assumptions as facts
- says `GO` without identifying real risks

Why it fails:

- implementation will drift because the envelope is not bounded

### Weak implementation

Warning signs:

- summarizes intended changes without changing the files
- changes prompts but not docs, scripts, examples, or templates that rely on them
- leaves one phase of the workflow inconsistent with another
- adds abstractions that do not solve the requested problem

Why it fails:

- the repository becomes harder to trust and harder to teach from

### Weak review

Warning signs:

- opens with praise
- says "looks good overall" before naming defects
- reports only style or naming observations
- assumes green checks prove UX, accessibility, or security correctness

Why it fails:

- students learn to imitate approval theatre instead of engineering review

### Weak accessibility review

Warning signs:

- says "accessible", "compliant", or "screen-reader safe"
- treats automated checks as final proof
- ignores focus order, names, status messaging, or chart/table comprehension

Why it fails:

- it teaches false confidence on a high-risk topic

### Weak security review

Warning signs:

- assumes UI hiding is authorization
- ignores export and logging surfaces
- treats missing evidence as evidence of safety
- phrases auth and secret handling concerns as optional polish

Why it fails:

- it teaches students to miss trust-boundary defects

### Weak release verification

Warning signs:

- says "release ready" without built artifacts or command results
- describes examples as though they are shipped features
- leaves screenshots, docs, or release notes unverified

Why it fails:

- it normalizes shipping comforting lies

## What strong agent work looks like

- tight scoping packet with explicit boundaries
- smallest correct diff across all required repository artifacts
- findings-first review with evidence
- specialist review used only when relevant but never skipped when needed
- exact reporting of command results and evidence gaps
- docs and examples aligned with what the repository truly proves

## Teaching method

Ask students to compare a weak answer against the rubric before they compare it against a strong answer.
They need to learn failure recognition first.

## Classroom rule

Do not reward confidence.
Reward scope control, evidence, and honesty.
