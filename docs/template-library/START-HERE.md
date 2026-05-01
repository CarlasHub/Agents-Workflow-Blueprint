# Start Here

## Step 0 — Know the method stack

Before using a prompt, read the short method map: [`RESEARCH-DNA.md`](RESEARCH-DNA.md). For task selection, use [`PROMPT-PATTERN-MATRIX.md`](PROMPT-PATTERN-MATRIX.md). For pre-merge discipline, use [`SCIENTIFIC-CONTROL-CHECKLIST.md`](SCIENTIFIC-CONTROL-CHECKLIST.md).


Use this page when you need the shortest safe route through the library.

## For a new Codex task

1. Read `AGENTS.md` and `docs/engineering/workflow.md`.
2. Use [`prompts/01-master-agent-enforcement-prompt.md`](prompts/01-master-agent-enforcement-prompt.md).
3. Add [`skills/01-scoping-packet-skill.md`](skills/01-scoping-packet-skill.md) if the task is non-trivial.
4. Attach [`contracts/01-completion-honesty-contract.md`](contracts/01-completion-honesty-contract.md) so final claims can be accepted or rejected.
5. Run the relevant commands from `requirements.toml`.
6. End with one status value: verified, partially verified, not verified, or blocked.

## For UI work

Use:

- [`prompts/21-ui-structure-audit-prompt.md`](prompts/21-ui-structure-audit-prompt.md)
- [`prompts/22-visual-design-quality-gate-prompt.md`](prompts/22-visual-design-quality-gate-prompt.md)
- [`prompts/26-keyboard-journey-audit-prompt.md`](prompts/26-keyboard-journey-audit-prompt.md)
- [`contracts/10-ui-visual-quality-contract.md`](contracts/10-ui-visual-quality-contract.md)
- [`contracts/08-keyboard-interaction-contract.md`](contracts/08-keyboard-interaction-contract.md)

## For release claims

Use:

- [`prompts/33-release-evidence-prompt.md`](prompts/33-release-evidence-prompt.md)
- [`skills/05-verification-reporting-skill.md`](skills/05-verification-reporting-skill.md)
- [`contracts/19-release-evidence-contract-plus.md`](contracts/19-release-evidence-contract-plus.md)

## For template-library maintenance

Use:

- [`prompts/36-github-pages-template-hub-prompt.md`](prompts/36-github-pages-template-hub-prompt.md)
- [`skills/24-template-catalogue-design-skill.md`](skills/24-template-catalogue-design-skill.md)
- [`contracts/29-template-library-quality-contract.md`](contracts/29-template-library-quality-contract.md)


## Scientific use order

Use the assets in this order when quality matters:

1. Start with the master agent prompt to set the operating frame.
2. Use least-to-most decomposition to break the task into small verifiable pieces.
3. Use ReAct discipline: observe files/UI/tests before acting, then observe results after acting.
4. Use branch evaluation when the first solution is not obviously safe.
5. Attach the relevant skill for the domain task.
6. Attach the relevant contract before claiming acceptance.
7. Fill the traceability matrix before final status.
8. End with verified, partially verified, not verified, or blocked.

Never ask for hidden chain-of-thought. Ask for a public decision record and evidence trail.
