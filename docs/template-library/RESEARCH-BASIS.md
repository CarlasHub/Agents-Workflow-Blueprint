# Research and Standards Basis

This library is not a research paper and does not claim that one prompt design solves agent reliability. It translates well-established review patterns and current tooling standards into reusable prompt, skill, and contract assets.

## Behavioural controls used across the library

1. **Checklist discipline** — repeated, explicit checks reduce missed steps during complex work.
2. **Cognitive forcing** — the assets force assumptions, uncertainty, scope, and evidence to be stated before final claims.
3. **Premortem analysis** — agents must imagine failure before closing the task, which exposes risks that optimistic implementation often misses.
4. **Adversarial review** — agents must search for evidence against their own preferred conclusion.
5. **Evidence calibration** — confidence must be tied to inspected files, runtime behaviour, command results, and manual checks.
6. **Separation of duties** — implementation, review, specialist review, and release judgement are intentionally separated.
7. **Acceptance contracts** — contracts are phrased as rejection rules so incomplete work is easier to stop.

## Standards and documentation mapped into the assets

- OpenAI Codex uses `AGENTS.md` files for repository-specific instructions and expectations: https://developers.openai.com/codex/guides/agents-md
- OpenAI Codex skills package task-specific instructions and resources for repeatable workflows: https://developers.openai.com/codex/skills
- OpenAI prompt-engineering guidance emphasises clear instructions and output expectations: https://developers.openai.com/api/docs/guides/prompt-engineering
- WCAG 2.2 defines accessibility success criteria and supporting guidance: https://www.w3.org/TR/WCAG22/
- Playwright documents accessibility-testing support and its limits as part of browser automation: https://playwright.dev/docs/accessibility-testing
- NIST SSDF provides secure-software-development practices that inform security and release gates: https://csrc.nist.gov/pubs/sp/800/218/final
- OWASP Cheat Sheet Series provides practical security guidance for areas such as logging and secrets management: https://cheatsheetseries.owasp.org/

## Important limitation

The assets improve structure, consistency, and evidence discipline. They do not guarantee correct output by themselves. A reviewer must still inspect the actual code, UI, tests, commands, and limitations.
