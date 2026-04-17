# The only agent workflow I actually trust for large software teams in 2026

I have reached the point where I care far less about whether an agent can generate code quickly, and far more about whether the team using it has the discipline to stop nonsense before it becomes product reality.

That is the frame behind this repository.

I did not build these files because I think prompts are magic. I built them because I think most teams are still using agents in a way that is too soft, too optimistic, and too forgiving of drift. They ask a model to build something, skim the output, let the docs and screenshots drift, and then act shocked when the repo becomes hard to trust. I do not think that workflow is merely immature. I think it is structurally wrong.

The workflow that makes sense to me is stricter.

It starts with a repository operating contract in `AGENTS.md`. That file exists because the repo must define what is forbidden, what must be proved, and what “done” means before an agent starts touching code. Then it moves into `requirements.toml`, where the rules become machine-readable: what must be run, what must not be changed, and what review categories are mandatory. Then it uses `.codex/config.toml` to move those expectations out of individual memory and into project-level defaults. OpenAI’s Codex documentation explicitly supports project-scoped configuration and reusable skills, which is exactly why I think teams should treat these files as governance, not decoration. Source: Codex config basics and agent skills docs.

That still is not enough.

The reason I added long prompt files in `PROMPTS/` is that weak prompts are one of the easiest ways teams invite hallucination, scope drift, and fake confidence into the repository. A good prompt for production work does not merely say “build this” or “review that”. It defines role, mission, read order, forbidden actions, required output sections, and anti-hallucination rules. OpenAI’s prompt engineering guidance makes the same general point in more neutral language: stronger instructions and clearer output expectations make behaviour more reliable. In practice, that means your scoping prompt and your review prompt should look more like contracts than chat messages.

That is why this repository has a separate scoping agent, implementation agent, review agent, accessibility review agent, and release verification agent. I do not trust one big “do everything” agent. I trust role separation. Codex’s workflows and subagent documentation lean in the same direction. They explicitly support specialised agents and multi-step flows, which is much closer to how real engineering work needs to operate.

The part I care about most, though, is the review and release side.

Most teams still design prompts as if implementation is the hard part. I no longer think that. Implementation is cheap. Review is the bottleneck that matters. That is why `PROMPTS/review-agent.md` is intentionally severe. It reviews scope fidelity, architecture integrity, behavioural correctness, accessibility impact, testing quality, and documentation truthfulness. That severity is deliberate. GitHub’s own Copilot review guidance is useful precisely because it does not pretend automated review equals approval. The model can comment. Humans still own the merge. That is the correct mental model.

The accessibility side needed its own contract because I am tired of teams treating accessibility as a checkbox inside generic QA. Playwright’s accessibility testing docs are refreshingly honest: automated checks can catch important issues, but they do not replace accessibility review as a whole. That is why `docs/engineering/contracts/accessibility.md` separates deterministic problems from judgement-based review, and why the accessibility prompt uses categories like deterministic failure, corroborated failure, state-limited review, visual-composition review, and human-judgement review. I would much rather a team be honest about what remains uncertain than let a tool imply that a green scan means a trustworthy interface.

That thinking comes directly from what A11Y Cat taught me.

The useful thing A11Y Cat got right was not simply “building a tool”. It was moving away from pass/fail theatre and toward a more honest evidence model. The issue taxonomy became stronger when it started distinguishing what could really be proved from what still needed corroboration or judgement. Provenance became more important too: source engine, rule ID, selector evidence, state tested, and limitation metadata all matter because they stop the output from sounding smarter than it is.

But A11Y Cat also got things wrong, and that matters more. One of the mistakes was letting classification sophistication risk getting ahead of behaviour proof. A nicer taxonomy can make a system look mature before its real user-facing reliability has caught up. Another mistake was the risk of overstating automation and sounding too close to “AI verified accessibility”, which is exactly the sort of language that creates false confidence. The right path was to pull the work back toward evidence, verification of real behaviour, explicit limitation language, and stricter release discipline. That is why this repository keeps pushing on anti-hallucination wording, output contracts, and release truthfulness.

The worked example in `examples/briefs/internal-quality-dashboard.md` exists for the same reason. I did not want a toy example. I wanted a realistic internal engineering dashboard with queued analysis runs, reports, charts, comparisons, exports, permissions, and historical data. That sort of product forces the prompts to deal with state, jobs, tables, filters, charts, accessibility, and release honesty all at once. It is a better teaching case because it is close to the kind of thing real teams actually build.

If I were teaching students or onboarding engineers with this repository, the steps I would tell them to follow are simple.

First, read `AGENTS.md` until the repo’s non-negotiables are obvious.

Second, read `requirements.toml` so the workflow rules stop being implicit.

Third, read the contract files in `docs/engineering/contracts/` because those tell you what the system is trying to protect: architecture, accessibility, testing discipline, release honesty, and security.

Fourth, study the prompts in `PROMPTS/` not as text to copy blindly, but as patterns: role, mission, read order, output schema, anti-hallucination clauses, and stop conditions.

Fifth, study the skills under `.codex/skills/` because those show how repeatable workflows should be packaged once the team has actually learned something useful.

And only then start customising the starter to your real project.

That order matters. Teams that start with “let’s ask the agent to build something” usually end up with a lot of generated material and very little real operating discipline. Teams that start with contracts and review rules usually move slower for a moment and then become much harder to fool.

That, to me, is the whole point.

I do not think the best agent workflow is the one that produces the most output.

I think it is the one that makes it hardest for the team to lie to itself.

## Why this matters beyond one repository

This is also why I keep paying attention to the broader direction of the tooling ecosystem. OpenAI’s current Codex documentation focuses heavily on configuration, workflows, skills, and subagents, not just raw code generation. Playwright explicitly positions itself as useful for testing and AI agents. GitHub already has agent-driven review in the path. And even outside direct developer tooling, WordPress 6.9 and the delayed 7.0 work show platform-level movement toward more structured AI capability, connectors, and collaborative editing rather than just bolting on a gimmick. That direction makes internal workflow design more important, not less.

The more systems become agent-aware, the less acceptable vague internal prompting becomes.

That is why I built this starter the way I did.

Not to make agents sound impressive.

To make them harder to misuse.
