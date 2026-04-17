# Teaching Grading Rubric

## Purpose

Grade agent-driven enterprise workflow submissions against evidence, scope control, and release honesty rather than style or fluency.

This rubric is intentionally severe.
If a student submission sounds confident but cannot prove the work, grade the evidence gap rather than the tone.

## Scoring model

Score each category from 0 to 4.

- `4`: strong, evidence-based, mergeable for the stated scope
- `3`: acceptable but with bounded weaknesses
- `2`: materially incomplete or weakly evidenced
- `1`: mostly procedural theatre with limited engineering value
- `0`: failed or misleading

## Automatic fail conditions

Fail the submission regardless of aggregate score if any of these are true:

- claims implementation without changing code
- claims verification without running commands
- documents capability the repository does not prove
- omits a required specialist review when the task touched accessibility, security, or release claims
- invents files, APIs, routes, handlers, or tests not grounded in the repository
- hides uncertainty behind optimistic wording

## Category 1: Scoping discipline

Grade for:

- precise task restatement
- explicit in-scope and out-of-scope boundaries
- grounded file impact analysis
- risk map with real triggers
- clear go or pause recommendation

`4` requires a packet that could be handed to another engineer without widening scope by accident.

## Category 2: Implementation integrity

Grade for:

- smallest correct diff
- preserved existing behaviour outside scope
- consistent changes across prompts, workflow docs, examples, scripts, and contracts when required
- no decorative rewrites
- no hidden coupling or stray abstractions

`4` requires a coherent change set with no obvious workflow drift.

## Category 3: Review quality

Grade for:

- severity judgment
- evidence-backed findings
- distinction between blockers and optional improvements
- refusal to equate green checks with correctness
- attention to docs, tests, and release truthfulness

`4` requires a review that would catch serious defects before merge.

## Category 4: Accessibility and security rigor

Grade for:

- specialist review used when relevant
- accessibility findings distinguish deterministic evidence from human judgement
- security findings distinguish confirmed failures from unverified concerns
- no compliance theatre
- no unsafe authorization or secret-handling assumptions

`4` requires bounded, technically credible specialist review language.

## Category 5: Verification and release honesty

Grade for:

- commands actually run
- results reported accurately
- evidence gaps stated plainly
- docs and examples updated honestly
- no unsupported product claims

`4` requires exact reporting of what the repository proves and what it does not prove.

## Category 6: Teaching clarity

Grade for:

- output structure matches repository templates
- terminology is consistent across phases
- examples teach disciplined behaviour
- weak patterns are called out explicitly
- no misleading simplifications for convenience

`4` requires material that can be used reliably in an enterprise training class.

## Interpretation

- `22-24`: excellent enterprise-standard submission
- `18-21`: acceptable but still needs critique
- `12-17`: not ready for students to imitate
- `0-11`: failed or misleading submission

## Instructor guidance

Do not inflate grades because the writing is polished.
Polished nonsense is still nonsense.
