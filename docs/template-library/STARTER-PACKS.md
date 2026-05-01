# Starter Packs

Each starter pack combines a prompt, a skill, and a contract. Use the smallest pack that matches the scenario.

## 1. Codex task control pack

- Prompt: [`01-master-agent-enforcement-prompt.md`](prompts/01-master-agent-enforcement-prompt.md)
- Skill: [`01-scoping-packet-skill.md`](skills/01-scoping-packet-skill.md)
- Contract: [`01-completion-honesty-contract.md`](contracts/01-completion-honesty-contract.md)

Use when a coding agent is about to change the repository.

## 2. UI truth pack

- Prompt: [`21-ui-structure-audit-prompt.md`](prompts/21-ui-structure-audit-prompt.md)
- Skill: [`07-ui-screenshot-review-skill.md`](skills/07-ui-screenshot-review-skill.md)
- Contract: [`10-ui-visual-quality-contract.md`](contracts/10-ui-visual-quality-contract.md)

Use when a UI might look acceptable in code but broken in the browser.

## 3. Accessibility remediation pack

- Prompt: [`27-accessibility-remediation-prompt.md`](prompts/27-accessibility-remediation-prompt.md)
- Skill: [`08-accessibility-inspection-skill.md`](skills/08-accessibility-inspection-skill.md)
- Contract: [`07-accessibility-contract-plus.md`](contracts/07-accessibility-contract-plus.md)

Use when a UI accessibility issue needs a semantic fix and honest remaining evidence.

## 4. Bug-fix evidence pack

- Prompt: [`12-bug-root-cause-remediation-prompt.md`](prompts/12-bug-root-cause-remediation-prompt.md)
- Skill: [`12-regression-test-design-skill.md`](skills/12-regression-test-design-skill.md)
- Contract: [`06-test-behaviour-contract.md`](contracts/06-test-behaviour-contract.md)

Use when a fix must close the actual failure path and prevent recurrence.

## 5. Documentation truth pack

- Prompt: [`34-documentation-truthfulness-prompt.md`](prompts/34-documentation-truthfulness-prompt.md)
- Skill: [`21-documentation-audit-skill.md`](skills/21-documentation-audit-skill.md)
- Contract: [`17-documentation-truth-contract.md`](contracts/17-documentation-truth-contract.md)

Use when docs, examples, README, or site copy must not overclaim.

## 6. Security review pack

- Prompt: [`37-security-trust-boundary-prompt.md`](prompts/37-security-trust-boundary-prompt.md)
- Skill: [`18-security-review-skill.md`](skills/18-security-review-skill.md)
- Contract: [`20-security-boundary-contract.md`](contracts/20-security-boundary-contract.md)

Use when permissions, user data, integrations, exports, credentials, or logging are involved.

## 7. Release gate pack

- Prompt: [`40-final-merge-gate-prompt.md`](prompts/40-final-merge-gate-prompt.md)
- Skill: [`30-final-delivery-packaging-skill.md`](skills/30-final-delivery-packaging-skill.md)
- Contract: [`19-release-evidence-contract-plus.md`](contracts/19-release-evidence-contract-plus.md)

Use before merge, handoff, or public publication.

## Research-control pack

Use this pack when you want the strictest possible agent behaviour before implementation:

1. Read [`RESEARCH-DNA.md`](RESEARCH-DNA.md).
2. Select a pattern from [`PROMPT-PATTERN-MATRIX.md`](PROMPT-PATTERN-MATRIX.md).
3. Apply [`prompts/01-master-agent-enforcement-prompt.md`](prompts/01-master-agent-enforcement-prompt.md).
4. Use [`skills/04-evidence-collection-skill.md`](skills/04-evidence-collection-skill.md).
5. Enforce [`contracts/01-completion-honesty-contract.md`](contracts/01-completion-honesty-contract.md).
6. Finish with [`SCIENTIFIC-CONTROL-CHECKLIST.md`](SCIENTIFIC-CONTROL-CHECKLIST.md).

Acceptance rule: no success claim is valid unless observation, decomposition, verification, reflection, and traceability are all visible.


## Research pattern starter packs

### CoT-safe evidence pack
- Prompt: `prompts/01-master-agent-enforcement-prompt.md`
- Skill: `skills/04-evidence-collection-skill.md`
- Contract: `contracts/02-evidence-contract.md`
- Use when: the agent tends to give polished conclusions without proof.

### ReAct repository-action pack
- Prompt: `prompts/10-repository-reconnaissance-prompt.md`
- Skill: `skills/03-repository-mapping-skill.md`
- Contract: `contracts/05-verification-contract.md`
- Use when: the agent must inspect files and act based on actual repository state.

### Tree-of-Thoughts risk pack
- Prompt: `prompts/07-premortem-failure-analysis-prompt.md`
- Skill: `skills/29-risk-register-skill.md`
- Contract: `contracts/03-scope-control-contract.md`
- Use when: there are multiple plausible routes and a bad choice could cause regressions.

### Least-to-most implementation pack
- Prompt: `prompts/09-minimal-correct-change-prompt.md`
- Skill: `skills/02-implementation-planning-skill.md`
- Contract: `contracts/15-refactor-safety-contract.md`
- Use when: the task is complex and should be reduced to safe, small changes.

### Formal traceability release pack
- Prompt: `prompts/40-final-merge-gate-prompt.md`
- Skill: `skills/30-final-delivery-packaging-skill.md`
- Contract: `contracts/19-release-evidence-contract-plus.md`
- Use when: acceptance requires requirement-to-evidence mapping.
