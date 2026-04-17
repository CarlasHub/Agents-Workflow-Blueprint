# Student Submission Checklist

Use this checklist before you claim a task is complete.

## Workflow

- I read `AGENTS.md`, `requirements.toml`, and `docs/engineering/workflow.md`.
- I used the required packet templates rather than inventing my own headings.
- I scoped the task before implementation.
- I ran review after implementation.
- I ran specialist review when accessibility, security, or release claims were affected.

## Scoping

- My scoping packet states in scope, out of scope, and dangerously adjacent areas.
- My impacted file list is grounded in repository evidence.
- My assumptions are marked as grounded in code, grounded in docs, or inferred but unconfirmed.
- I paused or escalated if a high-impact assumption stayed unconfirmed.

## Implementation

- I made the smallest correct diff.
- I did not rewrite unrelated files for style.
- I updated tests, docs, prompts, scripts, and templates where the requested change required them.
- I did not claim implementation for code I did not actually change.

## Review

- My review cites evidence from files or diffs.
- My review distinguishes blockers from optional improvements.
- My review does not praise or soften unsupported claims.
- My review checks docs and examples, not only code.

## Accessibility and security

- I used accessibility review when UI, semantics, keyboard flow, focus, status messaging, tables, charts, or filters changed.
- I used security review when auth, permissions, exports, secrets, tokens, or user data changed.
- I did not claim accessibility compliance or security safety without evidence.

## Verification and release honesty

- I ran the commands required by `requirements.toml`.
- I reported actual results, including failures.
- I stated any command I could not run and why.
- I did not present starter-level checks as proof of product behaviour.
- I removed or avoided unsupported claims in docs and examples.

## Final delivery

- I listed files changed.
- I stated why each file changed.
- I stated assumptions made.
- I stated risks introduced.
- I stated known limitations.
- I included manual verification steps where required.
