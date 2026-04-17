# System Prompt Patterns for Repository Agents

Use this file as teaching material for students and teams.
These are not task prompts.
These are reusable patterns that make agent behaviour more stable.

## Pattern 1: Role + mission + boundary

Bad:
"Help with this feature"

Better:
"You are the implementation agent for a production internal dashboard. Implement only the approved feature scope, preserve existing behaviour outside the specified files, and stop if hidden architecture conflicts require a broader change."

Why it works:
- assigns role
- narrows mission
- sets stop condition

## Pattern 2: Read order before output

Bad:
"Fix the filters"

Better:
"Read AGENTS.md, docs/engineering/contracts/accessibility.md, docs/engineering/contracts/testing.md, then inspect the filter panel component, filter state store, and related Playwright tests before proposing changes."

Why it works:
- reduces blind guessing
- grounds the model in repo rules first
- reduces hallucinated architecture

## Pattern 3: Explicit output schema

Bad:
"Review the PR"

Better:
"Return: executive verdict, release blockers, major issues, accessibility findings, testing verdict, documentation drift, and non-negotiable fixes before merge."

Why it works:
- makes results reusable
- reduces rambly output
- helps automated parsing

## Pattern 4: Anti-hallucination clauses

Use language like:
- "Do not invent file names, APIs, or hidden services."
- "If you cannot verify a claim from inspected files, mark it unverified."
- "Do not turn inferred behaviour into asserted fact."
- "State assumptions explicitly."

## Pattern 5: Review stricter than implementation

Implementation prompt should optimise for correctness and scope.
Review prompt should optimise for scepticism and evidence.
