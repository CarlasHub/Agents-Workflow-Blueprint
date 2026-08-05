# Specialist Control Registry

Version: 3.0.0

This registry is the authoritative source for specialist controls used by more than one asset. Assets reference stable IDs; deterministic composition includes each selected control once. Generic governance remains in `GOVERNANCE-KERNEL.md`.

## SPC-0011A63FB1

### Control

Check for contradiction between docs, code, tests, screenshots, and final narrative.

### Categories

- Evaluation
- Honesty
- Reasoning Control

### Used by

- `contract-assumption-contract`
- `prompt-assumption-exposure-prompt`
- `prompt-contradiction-detection-prompt`
- `prompt-uncertainty-calibration-prompt`
- `skill-failure-disclosure-skill`
- `skill-prompt-evaluation-skill`

## SPC-019E2A4C55

### Control

Identify dead code, unreachable branches, unused exports, and stale configuration.

### Categories

- Architecture
- Clean-up
- Code Quality
- Dependency
- Refactor

### Used by

- `contract-architecture-boundary-contract`
- `contract-code-quality-contract`
- `contract-dead-code-removal-contract`
- `contract-dependency-addition-contract`
- `contract-refactor-safety-contract`
- `prompt-architecture-drift-audit-prompt`
- `prompt-code-quality-deep-audit-prompt`
- `prompt-dead-code-removal-prompt`
- `prompt-refactor-safety-prompt`
- `skill-architecture-review-skill`
- `skill-dead-code-detection-skill`
- `skill-refactor-planning-skill`

## SPC-0570993820

### Control

Reject any answer that hides uncertainty behind broad phrases such as “should work” or “looks fine”.

### Categories

- Agent Control
- Audit
- Core Control
- Evidence
- Honesty
- Output
- Prompt Writing
- Scope
- Scoping

### Used by

- `contract-agent-output-format-contract`
- `contract-completion-honesty-contract`
- `contract-evidence-contract`
- `contract-scope-control-contract`
- `prompt-anti-fake-completion-audit-prompt`
- `prompt-master-agent-enforcement-prompt`
- `prompt-scope-boundary-lock-prompt`
- `skill-agent-behaviour-hardening-skill`
- `skill-copy-ready-prompt-writing-skill`
- `skill-evidence-collection-skill`
- `skill-scoping-packet-skill`

## SPC-05C37EDF4D

### Control

Verify that primary, secondary, destructive, disabled, loading, hover, focus, and active states are distinct.

### Categories

- Design System
- Interaction
- Responsive UI
- UI/UX

### Used by

- `contract-design-system-contract`
- `contract-responsive-behaviour-contract`
- `contract-ui-visual-quality-contract`
- `prompt-design-system-consistency-prompt`
- `prompt-interaction-state-audit-prompt`
- `prompt-responsive-layout-audit-prompt`
- `prompt-ui-structure-audit-prompt`
- `prompt-visual-design-quality-gate-prompt`
- `skill-ui-screenshot-review-skill`

## SPC-069C123D49

### Control

Confirm that failure modes and edge states are named even when they were not all exercised.

### Categories

- Delivery
- Review
- Risk

### Used by

- `contract-git-hygiene-contract`
- `prompt-premortem-failure-analysis-prompt`
- `prompt-regression-risk-review-prompt`
- `skill-code-review-skill`
- `skill-risk-register-skill`

## SPC-0A4D074BDB

### Control

Inspect edge states: empty data, invalid input, slow network, permission failure, loading, retry, and cancellation.

### Categories

- Bug Remediation
- Implementation
- Planning

### Used by

- `prompt-bug-root-cause-remediation-prompt`
- `prompt-evidence-first-implementation-prompt`
- `prompt-feature-implementation-prompt`
- `prompt-minimal-correct-change-prompt`
- `skill-implementation-planning-skill`

## SPC-0A5BED7F7E

### Control

Check whether future tests can target the behaviour without excessive mocking.

### Categories

- Architecture
- Clean-up
- Code Quality
- Dependency
- Refactor

### Used by

- `contract-architecture-boundary-contract`
- `contract-code-quality-contract`
- `contract-dead-code-removal-contract`
- `contract-dependency-addition-contract`
- `contract-refactor-safety-contract`
- `prompt-architecture-drift-audit-prompt`
- `prompt-code-quality-deep-audit-prompt`
- `prompt-dead-code-removal-prompt`
- `prompt-refactor-safety-prompt`
- `skill-architecture-review-skill`
- `skill-dead-code-detection-skill`
- `skill-refactor-planning-skill`

## SPC-0B89F8D640

### Control

Keep remediation minimal, testable, and aligned with existing security architecture.

### Categories

- Privacy
- Security

### Used by

- `contract-privacy-and-data-contract`
- `contract-secrets-handling-contract`
- `contract-security-boundary-contract`
- `prompt-secrets-handling-review-prompt`
- `prompt-security-trust-boundary-prompt`
- `skill-data-privacy-review-skill`
- `skill-secrets-review-skill`
- `skill-security-review-skill`

## SPC-0DA3292C2B

### Control

Require release notes to include commands run, results, known gaps, and reviewer-visible evidence.

### Categories

- Delivery
- Documentation
- Release

### Used by

- `contract-documentation-truth-contract`
- `contract-readme-claim-contract`
- `contract-release-evidence-contract-plus`
- `prompt-documentation-truthfulness-prompt`
- `prompt-final-merge-gate-prompt`
- `prompt-readme-upgrade-prompt`
- `prompt-release-evidence-prompt`
- `skill-documentation-audit-skill`
- `skill-final-delivery-packaging-skill`
- `skill-readme-structuring-skill`
- `skill-release-notes-review-skill`

## SPC-13E2B47410

### Control

Identify the user-visible behaviour that will prove the change, not just the code diff.

### Categories

- Bug Remediation
- Implementation
- Planning

### Used by

- `prompt-bug-root-cause-remediation-prompt`
- `prompt-evidence-first-implementation-prompt`
- `prompt-feature-implementation-prompt`
- `prompt-minimal-correct-change-prompt`
- `skill-implementation-planning-skill`

## SPC-164F0D6D2D

### Control

Detect privacy or security issues caused by logging, caching, exporting, or sharing data.

### Categories

- API
- Data Flow
- Reliability
- State

### Used by

- `contract-api-stability-contract`
- `contract-error-handling-contract`
- `prompt-api-contract-review-prompt`
- `prompt-data-flow-trace-prompt`
- `prompt-state-management-audit-prompt`
- `skill-api-contract-inspection-skill`

## SPC-19737EA9F7

### Control

Define the behaviour under test in user or system terms before selecting the test type.

### Categories

- Testing
- Verification

### Used by

- `contract-test-behaviour-contract`
- `contract-verification-contract`
- `prompt-playwright-test-design-prompt`
- `prompt-test-quality-audit-prompt`
- `skill-playwright-debugging-skill`
- `skill-regression-test-design-skill`
- `skill-verification-reporting-skill`

## SPC-1A84B8E4BD

### Control

Check announcements for dynamic content, loading, errors, route changes, and status updates.

### Categories

- Accessibility

### Used by

- `contract-accessibility-contract-plus`
- `contract-accessible-name-contract`
- `contract-keyboard-interaction-contract`
- `prompt-accessibility-remediation-prompt`
- `prompt-icon-only-control-review-prompt`
- `prompt-keyboard-journey-audit-prompt`
- `prompt-screen-reader-risk-review-prompt`
- `prompt-wcag-mapping-review-prompt`
- `skill-accessibility-inspection-skill`
- `skill-keyboard-testing-skill`
- `skill-wcag-mapping-skill`

## SPC-1D8AAB4CE5

### Control

Detect completion theatre: confident closure, vague evidence, missing commands, and ignored edge states.

### Categories

- Agent Control
- Audit
- Core Control
- Evidence
- Honesty
- Output
- Prompt Writing
- Scope
- Scoping

### Used by

- `contract-agent-output-format-contract`
- `contract-completion-honesty-contract`
- `contract-evidence-contract`
- `contract-scope-control-contract`
- `prompt-anti-fake-completion-audit-prompt`
- `prompt-master-agent-enforcement-prompt`
- `prompt-scope-boundary-lock-prompt`
- `skill-agent-behaviour-hardening-skill`
- `skill-copy-ready-prompt-writing-skill`
- `skill-evidence-collection-skill`
- `skill-scoping-packet-skill`

## SPC-1E5026FAE6

### Control

Check mobile layout, keyboard navigation, focus visibility, skip link, contrast, and interactive affordance.

### Categories

- Site/Product
- Template Product

### Used by

- `contract-template-library-quality-contract`
- `prompt-github-pages-template-hub-prompt`
- `skill-github-pages-ux-skill`
- `skill-template-catalogue-design-skill`

## SPC-1F6BE8CB53

### Control

Treat copy buttons as usability features, not as the only access path.

### Categories

- Site/Product
- Template Product

### Used by

- `contract-template-library-quality-contract`
- `prompt-github-pages-template-hub-prompt`
- `skill-github-pages-ux-skill`
- `skill-template-catalogue-design-skill`

## SPC-2020040A69

### Control

Look for privacy issues in retention, sharing, caching, analytics, and generated artefacts.

### Categories

- Privacy
- Security

### Used by

- `contract-privacy-and-data-contract`
- `contract-secrets-handling-contract`
- `contract-security-boundary-contract`
- `prompt-secrets-handling-review-prompt`
- `prompt-security-trust-boundary-prompt`
- `skill-data-privacy-review-skill`
- `skill-secrets-review-skill`
- `skill-security-review-skill`

## SPC-2034581C5D

### Control

Check whether the task needs a scoping packet, review packet, specialist review, or release evidence packet.

### Categories

- Agent Control
- Audit
- Core Control
- Evidence
- Honesty
- Output
- Prompt Writing
- Scope
- Scoping

### Used by

- `contract-agent-output-format-contract`
- `contract-completion-honesty-contract`
- `contract-evidence-contract`
- `contract-scope-control-contract`
- `prompt-anti-fake-completion-audit-prompt`
- `prompt-master-agent-enforcement-prompt`
- `prompt-scope-boundary-lock-prompt`
- `skill-agent-behaviour-hardening-skill`
- `skill-copy-ready-prompt-writing-skill`
- `skill-evidence-collection-skill`
- `skill-scoping-packet-skill`

## SPC-2050AB0AB3

### Control

Describe any migration, compatibility, or rollback implications if shared contracts change.

### Categories

- Bug Remediation
- Implementation
- Planning

### Used by

- `prompt-bug-root-cause-remediation-prompt`
- `prompt-evidence-first-implementation-prompt`
- `prompt-feature-implementation-prompt`
- `prompt-minimal-correct-change-prompt`
- `skill-implementation-planning-skill`

## SPC-26C4D5B46B

### Control

Inspect tests for behavioural meaning, not only for passing status or increased coverage count.

### Categories

- Delivery
- Review
- Risk

### Used by

- `contract-git-hygiene-contract`
- `prompt-premortem-failure-analysis-prompt`
- `prompt-regression-risk-review-prompt`
- `skill-code-review-skill`
- `skill-risk-register-skill`

## SPC-281C2DA3D8

### Control

Prefer precise instructions and acceptance criteria over inspirational language.

### Categories

- Delivery
- Documentation
- Release

### Used by

- `contract-documentation-truth-contract`
- `contract-readme-claim-contract`
- `contract-release-evidence-contract-plus`
- `prompt-documentation-truthfulness-prompt`
- `prompt-final-merge-gate-prompt`
- `prompt-readme-upgrade-prompt`
- `prompt-release-evidence-prompt`
- `skill-documentation-audit-skill`
- `skill-final-delivery-packaging-skill`
- `skill-readme-structuring-skill`
- `skill-release-notes-review-skill`

## SPC-281E77FD8F

### Control

Inspect semantic HTML before adding ARIA; do not replace native behaviour with fragile custom roles.

### Categories

- Accessibility

### Used by

- `contract-accessibility-contract-plus`
- `contract-accessible-name-contract`
- `contract-keyboard-interaction-contract`
- `prompt-accessibility-remediation-prompt`
- `prompt-icon-only-control-review-prompt`
- `prompt-keyboard-journey-audit-prompt`
- `prompt-screen-reader-risk-review-prompt`
- `prompt-wcag-mapping-review-prompt`
- `skill-accessibility-inspection-skill`
- `skill-keyboard-testing-skill`
- `skill-wcag-mapping-skill`

## SPC-28F696EEB8

### Control

Force a second-path analysis: propose one alternative interpretation and explain why it was rejected or retained.

### Categories

- Evaluation
- Honesty
- Reasoning Control

### Used by

- `contract-assumption-contract`
- `prompt-assumption-exposure-prompt`
- `prompt-contradiction-detection-prompt`
- `prompt-uncertainty-calibration-prompt`
- `skill-failure-disclosure-skill`
- `skill-prompt-evaluation-skill`

## SPC-2BF68A2A8A

### Control

Reject accidental dependency additions, dead branches, and broad rewrites hidden inside a small task.

### Categories

- Bug Remediation
- Implementation
- Planning

### Used by

- `prompt-bug-root-cause-remediation-prompt`
- `prompt-evidence-first-implementation-prompt`
- `prompt-feature-implementation-prompt`
- `prompt-minimal-correct-change-prompt`
- `skill-implementation-planning-skill`

## SPC-305203AAA3

### Control

Check whether the implementation satisfies the stated scope without creating hidden obligations.

### Categories

- Delivery
- Review
- Risk

### Used by

- `contract-git-hygiene-contract`
- `prompt-premortem-failure-analysis-prompt`
- `prompt-regression-risk-review-prompt`
- `skill-code-review-skill`
- `skill-risk-register-skill`

## SPC-30567C30DF

### Control

Require the agent to surface trade-offs instead of silently choosing the easiest implementation.

### Categories

- Agent Control
- Audit
- Core Control
- Evidence
- Honesty
- Output
- Prompt Writing
- Scope
- Scoping

### Used by

- `contract-agent-output-format-contract`
- `contract-completion-honesty-contract`
- `contract-evidence-contract`
- `contract-scope-control-contract`
- `prompt-anti-fake-completion-audit-prompt`
- `prompt-master-agent-enforcement-prompt`
- `prompt-scope-boundary-lock-prompt`
- `skill-agent-behaviour-hardening-skill`
- `skill-copy-ready-prompt-writing-skill`
- `skill-evidence-collection-skill`
- `skill-scoping-packet-skill`

## SPC-305A6BD2E2

### Control

Inspect rendered structure, not only component source.

### Categories

- Design System
- Interaction
- Responsive UI
- UI/UX

### Used by

- `contract-design-system-contract`
- `contract-responsive-behaviour-contract`
- `contract-ui-visual-quality-contract`
- `prompt-design-system-consistency-prompt`
- `prompt-interaction-state-audit-prompt`
- `prompt-responsive-layout-audit-prompt`
- `prompt-ui-structure-audit-prompt`
- `prompt-visual-design-quality-gate-prompt`
- `skill-ui-screenshot-review-skill`

## SPC-31A58C54A8

### Control

Check whether component naming and labels match the user’s mental model.

### Categories

- Design System
- Interaction
- Responsive UI
- UI/UX

### Used by

- `contract-design-system-contract`
- `contract-responsive-behaviour-contract`
- `contract-ui-visual-quality-contract`
- `prompt-design-system-consistency-prompt`
- `prompt-interaction-state-audit-prompt`
- `prompt-responsive-layout-audit-prompt`
- `prompt-ui-structure-audit-prompt`
- `prompt-visual-design-quality-gate-prompt`
- `skill-ui-screenshot-review-skill`

## SPC-33483AA6F2

### Control

Inspect secrets, tokens, environment variables, credential storage, and accidental logging paths.

### Categories

- Privacy
- Security

### Used by

- `contract-privacy-and-data-contract`
- `contract-secrets-handling-contract`
- `contract-security-boundary-contract`
- `prompt-secrets-handling-review-prompt`
- `prompt-security-trust-boundary-prompt`
- `skill-data-privacy-review-skill`
- `skill-secrets-review-skill`
- `skill-security-review-skill`

## SPC-33AB51A64E

### Control

Treat missing tests as a known limitation, not as evidence of success.

### Categories

- Testing
- Verification

### Used by

- `contract-test-behaviour-contract`
- `contract-verification-contract`
- `prompt-playwright-test-design-prompt`
- `prompt-test-quality-audit-prompt`
- `skill-playwright-debugging-skill`
- `skill-regression-test-design-skill`
- `skill-verification-reporting-skill`

## SPC-35DB6BB883

### Control

Challenge screenshots, demos, and summaries with source-level or command-level evidence.

### Categories

- Delivery
- Review
- Risk

### Used by

- `contract-git-hygiene-contract`
- `prompt-premortem-failure-analysis-prompt`
- `prompt-regression-risk-review-prompt`
- `skill-code-review-skill`
- `skill-risk-register-skill`

## SPC-36FE9D5D93

### Control

Prefer localised fixes that do not reduce future maintainability or observability.

### Categories

- Bug Remediation
- Implementation
- Planning

### Used by

- `prompt-bug-root-cause-remediation-prompt`
- `prompt-evidence-first-implementation-prompt`
- `prompt-feature-implementation-prompt`
- `prompt-minimal-correct-change-prompt`
- `skill-implementation-planning-skill`

## SPC-37920A61AD

### Control

Prefer tests that fail for the bug or requirement, not tests that merely exercise the new code path.

### Categories

- Testing
- Verification

### Used by

- `contract-test-behaviour-contract`
- `contract-verification-contract`
- `prompt-playwright-test-design-prompt`
- `prompt-test-quality-audit-prompt`
- `skill-playwright-debugging-skill`
- `skill-regression-test-design-skill`
- `skill-verification-reporting-skill`

## SPC-37E10661DA

### Control

Confirm that design tokens or shared styles are used consistently instead of one-off styling.

### Categories

- Design System
- Interaction
- Responsive UI
- UI/UX

### Used by

- `contract-design-system-contract`
- `contract-responsive-behaviour-contract`
- `contract-ui-visual-quality-contract`
- `prompt-design-system-consistency-prompt`
- `prompt-interaction-state-audit-prompt`
- `prompt-responsive-layout-audit-prompt`
- `prompt-ui-structure-audit-prompt`
- `prompt-visual-design-quality-gate-prompt`
- `skill-ui-screenshot-review-skill`

## SPC-3C8402A601

### Control

State the weakest part of the conclusion before giving the recommended action.

### Categories

- Evaluation
- Honesty
- Reasoning Control

### Used by

- `contract-assumption-contract`
- `prompt-assumption-exposure-prompt`
- `prompt-contradiction-detection-prompt`
- `prompt-uncertainty-calibration-prompt`
- `skill-failure-disclosure-skill`
- `skill-prompt-evaluation-skill`

## SPC-3CEC179E36

### Control

Check existing naming, architectural boundaries, dependency patterns, and style before making changes.

### Categories

- Bug Remediation
- Implementation
- Planning

### Used by

- `prompt-bug-root-cause-remediation-prompt`
- `prompt-evidence-first-implementation-prompt`
- `prompt-feature-implementation-prompt`
- `prompt-minimal-correct-change-prompt`
- `skill-implementation-planning-skill`

## SPC-3D20B487AD

### Control

Look for regressions in adjacent routes, shared components, schemas, configuration, and docs.

### Categories

- Delivery
- Review
- Risk

### Used by

- `contract-git-hygiene-contract`
- `prompt-premortem-failure-analysis-prompt`
- `prompt-regression-risk-review-prompt`
- `skill-code-review-skill`
- `skill-risk-register-skill`

## SPC-40A0729D73

### Control

Require the agent to identify which claims a reviewer can reproduce without trusting the agent.

### Categories

- Agent Control
- Audit
- Core Control
- Evidence
- Honesty
- Output
- Prompt Writing
- Scope
- Scoping

### Used by

- `contract-agent-output-format-contract`
- `contract-completion-honesty-contract`
- `contract-evidence-contract`
- `contract-scope-control-contract`
- `prompt-anti-fake-completion-audit-prompt`
- `prompt-master-agent-enforcement-prompt`
- `prompt-scope-boundary-lock-prompt`
- `skill-agent-behaviour-hardening-skill`
- `skill-copy-ready-prompt-writing-skill`
- `skill-evidence-collection-skill`
- `skill-scoping-packet-skill`

## SPC-41A646D735

### Control

Make failure examples visible; a template system should teach what bad output looks like.

### Categories

- Site/Product
- Template Product

### Used by

- `contract-template-library-quality-contract`
- `prompt-github-pages-template-hub-prompt`
- `skill-github-pages-ux-skill`
- `skill-template-catalogue-design-skill`

## SPC-43CE9442C3

### Control

Check labels, instructions, errors, required states, and validation feedback for forms.

### Categories

- Accessibility

### Used by

- `contract-accessibility-contract-plus`
- `contract-accessible-name-contract`
- `contract-keyboard-interaction-contract`
- `prompt-accessibility-remediation-prompt`
- `prompt-icon-only-control-review-prompt`
- `prompt-keyboard-journey-audit-prompt`
- `prompt-screen-reader-risk-review-prompt`
- `prompt-wcag-mapping-review-prompt`
- `skill-accessibility-inspection-skill`
- `skill-keyboard-testing-skill`
- `skill-wcag-mapping-skill`

## SPC-4436404CB9

### Control

Check whether dependency changes introduce new supply-chain or licensing risk.

### Categories

- Privacy
- Security

### Used by

- `contract-privacy-and-data-contract`
- `contract-secrets-handling-contract`
- `contract-security-boundary-contract`
- `prompt-secrets-handling-review-prompt`
- `prompt-security-trust-boundary-prompt`
- `skill-data-privacy-review-skill`
- `skill-secrets-review-skill`
- `skill-security-review-skill`

## SPC-46167C8D02

### Control

Block release language when screenshots, UI, tests, or docs are stale.

### Categories

- Delivery
- Documentation
- Release

### Used by

- `contract-documentation-truth-contract`
- `contract-readme-claim-contract`
- `contract-release-evidence-contract-plus`
- `prompt-documentation-truthfulness-prompt`
- `prompt-final-merge-gate-prompt`
- `prompt-readme-upgrade-prompt`
- `prompt-release-evidence-prompt`
- `skill-documentation-audit-skill`
- `skill-final-delivery-packaging-skill`
- `skill-readme-structuring-skill`
- `skill-release-notes-review-skill`

## SPC-48BCE38DB5

### Control

Avoid politeness that weakens the finding; be fair, specific, and evidence-led.

### Categories

- Delivery
- Review
- Risk

### Used by

- `contract-git-hygiene-contract`
- `prompt-premortem-failure-analysis-prompt`
- `prompt-regression-risk-review-prompt`
- `skill-code-review-skill`
- `skill-risk-register-skill`

## SPC-4A57A095AD

### Control

Add machine-readable metadata when the site needs filtering, cards, or copy-ready behaviour.

### Categories

- Site/Product
- Template Product

### Used by

- `contract-template-library-quality-contract`
- `prompt-github-pages-template-hub-prompt`
- `skill-github-pages-ux-skill`
- `skill-template-catalogue-design-skill`

## SPC-4E2920FBA1

### Control

Look for stale state, race conditions, duplicate fetches, out-of-order updates, and missed cancellation paths.

### Categories

- API
- Data Flow
- Reliability
- State

### Used by

- `contract-api-stability-contract`
- `contract-error-handling-contract`
- `prompt-api-contract-review-prompt`
- `prompt-data-flow-trace-prompt`
- `prompt-state-management-audit-prompt`
- `skill-api-contract-inspection-skill`

## SPC-4FC3248A81

### Control

Require confidence to be tied to evidence quality rather than fluency or amount of effort spent.

### Categories

- Evaluation
- Honesty
- Reasoning Control

### Used by

- `contract-assumption-contract`
- `prompt-assumption-exposure-prompt`
- `prompt-contradiction-detection-prompt`
- `prompt-uncertainty-calibration-prompt`
- `skill-failure-disclosure-skill`
- `skill-prompt-evaluation-skill`

## SPC-500888D594

### Control

Check whether state transitions are explicit enough for tests and debugging.

### Categories

- API
- Data Flow
- Reliability
- State

### Used by

- `contract-api-stability-contract`
- `contract-error-handling-contract`
- `prompt-api-contract-review-prompt`
- `prompt-data-flow-trace-prompt`
- `prompt-state-management-audit-prompt`
- `skill-api-contract-inspection-skill`

## SPC-51A2F90F74

### Control

Return a verdict that a maintainer can act on immediately.

### Categories

- Delivery
- Review
- Risk

### Used by

- `contract-git-hygiene-contract`
- `prompt-premortem-failure-analysis-prompt`
- `prompt-regression-risk-review-prompt`
- `skill-code-review-skill`
- `skill-risk-register-skill`

## SPC-5207222384

### Control

Validate that the diff does not remove safeguards, error handling, or accessibility semantics.

### Categories

- Bug Remediation
- Implementation
- Planning

### Used by

- `prompt-bug-root-cause-remediation-prompt`
- `prompt-evidence-first-implementation-prompt`
- `prompt-feature-implementation-prompt`
- `prompt-minimal-correct-change-prompt`
- `skill-implementation-planning-skill`

## SPC-56F3C0F154

### Control

Validate that responsive behaviour preserves meaning rather than merely fitting on screen.

### Categories

- Design System
- Interaction
- Responsive UI
- UI/UX

### Used by

- `contract-design-system-contract`
- `contract-responsive-behaviour-contract`
- `contract-ui-visual-quality-contract`
- `prompt-design-system-consistency-prompt`
- `prompt-interaction-state-audit-prompt`
- `prompt-responsive-layout-audit-prompt`
- `prompt-ui-structure-audit-prompt`
- `prompt-visual-design-quality-gate-prompt`
- `skill-ui-screenshot-review-skill`

## SPC-5704E6F6F7

### Control

Ensure setup, usage, verification, and limitation sections are reproducible from a fresh clone.

### Categories

- Delivery
- Documentation
- Release

### Used by

- `contract-documentation-truth-contract`
- `contract-readme-claim-contract`
- `contract-release-evidence-contract-plus`
- `prompt-documentation-truthfulness-prompt`
- `prompt-final-merge-gate-prompt`
- `prompt-readme-upgrade-prompt`
- `prompt-release-evidence-prompt`
- `skill-documentation-audit-skill`
- `skill-final-delivery-packaging-skill`
- `skill-readme-structuring-skill`
- `skill-release-notes-review-skill`

## SPC-584BE13706

### Control

Separate automated findings from manual judgement and assistive-technology risk.

### Categories

- Accessibility

### Used by

- `contract-accessibility-contract-plus`
- `contract-accessible-name-contract`
- `contract-keyboard-interaction-contract`
- `prompt-accessibility-remediation-prompt`
- `prompt-icon-only-control-review-prompt`
- `prompt-keyboard-journey-audit-prompt`
- `prompt-screen-reader-risk-review-prompt`
- `prompt-wcag-mapping-review-prompt`
- `skill-accessibility-inspection-skill`
- `skill-keyboard-testing-skill`
- `skill-wcag-mapping-skill`

## SPC-5AC175CF4D

### Control

Separate taste from defects: mark objective breakage, usability risk, and stylistic recommendations differently.

### Categories

- Design System
- Interaction
- Responsive UI
- UI/UX

### Used by

- `contract-design-system-contract`
- `contract-responsive-behaviour-contract`
- `contract-ui-visual-quality-contract`
- `prompt-design-system-consistency-prompt`
- `prompt-interaction-state-audit-prompt`
- `prompt-responsive-layout-audit-prompt`
- `prompt-ui-structure-audit-prompt`
- `prompt-visual-design-quality-gate-prompt`
- `skill-ui-screenshot-review-skill`

## SPC-5B042223E4

### Control

Inspect auditability: important actions should be traceable without logging sensitive data.

### Categories

- Privacy
- Security

### Used by

- `contract-privacy-and-data-contract`
- `contract-secrets-handling-contract`
- `contract-security-boundary-contract`
- `prompt-secrets-handling-review-prompt`
- `prompt-security-trust-boundary-prompt`
- `skill-data-privacy-review-skill`
- `skill-secrets-review-skill`
- `skill-security-review-skill`

## SPC-6034737B54

### Control

Verify that error messages are useful without exposing sensitive information.

### Categories

- API
- Data Flow
- Reliability
- State

### Used by

- `contract-api-stability-contract`
- `contract-error-handling-contract`
- `prompt-api-contract-review-prompt`
- `prompt-data-flow-trace-prompt`
- `prompt-state-management-audit-prompt`
- `skill-api-contract-inspection-skill`

## SPC-632EF08BBD

### Control

Check whether the answer widened scope, changed acceptance criteria, or added hidden dependencies.

### Categories

- Agent Control
- Audit
- Core Control
- Evidence
- Honesty
- Output
- Prompt Writing
- Scope
- Scoping

### Used by

- `contract-agent-output-format-contract`
- `contract-completion-honesty-contract`
- `contract-evidence-contract`
- `contract-scope-control-contract`
- `prompt-anti-fake-completion-audit-prompt`
- `prompt-master-agent-enforcement-prompt`
- `prompt-scope-boundary-lock-prompt`
- `skill-agent-behaviour-hardening-skill`
- `skill-copy-ready-prompt-writing-skill`
- `skill-evidence-collection-skill`
- `skill-scoping-packet-skill`

## SPC-68342B1555

### Control

Reject phrases that imply full accessibility without broad manual evidence.

### Categories

- Accessibility

### Used by

- `contract-accessibility-contract-plus`
- `contract-accessible-name-contract`
- `contract-keyboard-interaction-contract`
- `prompt-accessibility-remediation-prompt`
- `prompt-icon-only-control-review-prompt`
- `prompt-keyboard-journey-audit-prompt`
- `prompt-screen-reader-risk-review-prompt`
- `prompt-wcag-mapping-review-prompt`
- `skill-accessibility-inspection-skill`
- `skill-keyboard-testing-skill`
- `skill-wcag-mapping-skill`

## SPC-69CA4847DF

### Control

Trace how the repository proves its claims through scripts, manifests, docs, and file presence checks.

### Categories

- Repository Analysis

### Used by

- `prompt-repository-reconnaissance-prompt`
- `skill-repository-mapping-skill`

## SPC-6A71F4E793

### Control

Use stable selectors and accessible locators for UI tests wherever practical.

### Categories

- Testing
- Verification

### Used by

- `contract-test-behaviour-contract`
- `contract-verification-contract`
- `prompt-playwright-test-design-prompt`
- `prompt-test-quality-audit-prompt`
- `skill-playwright-debugging-skill`
- `skill-regression-test-design-skill`
- `skill-verification-reporting-skill`

## SPC-6D43E61D6A

### Control

Recommend refactors in safe phases rather than one risky rewrite.

### Categories

- Architecture
- Clean-up
- Code Quality
- Dependency
- Refactor

### Used by

- `contract-architecture-boundary-contract`
- `contract-code-quality-contract`
- `contract-dead-code-removal-contract`
- `contract-dependency-addition-contract`
- `contract-refactor-safety-contract`
- `prompt-architecture-drift-audit-prompt`
- `prompt-code-quality-deep-audit-prompt`
- `prompt-dead-code-removal-prompt`
- `prompt-refactor-safety-prompt`
- `skill-architecture-review-skill`
- `skill-dead-code-detection-skill`
- `skill-refactor-planning-skill`

## SPC-6FCBF56315

### Control

Check downstream callers, importers, and consumers before altering interfaces.

### Categories

- Bug Remediation
- Implementation
- Planning

### Used by

- `prompt-bug-root-cause-remediation-prompt`
- `prompt-evidence-first-implementation-prompt`
- `prompt-feature-implementation-prompt`
- `prompt-minimal-correct-change-prompt`
- `skill-implementation-planning-skill`

## SPC-70F680638D

### Control

Identify what baseline is missing before claiming improvement.

### Categories

- Observability
- Performance

### Used by

- `contract-logging-safety-contract`
- `contract-performance-budget-contract`
- `prompt-observability-and-logging-prompt`

## SPC-7138233293

### Control

Identify where validation, normalisation, authorisation, and error handling occur.

### Categories

- API
- Data Flow
- Reliability
- State

### Used by

- `contract-api-stability-contract`
- `contract-error-handling-contract`
- `prompt-api-contract-review-prompt`
- `prompt-data-flow-trace-prompt`
- `prompt-state-management-audit-prompt`
- `skill-api-contract-inspection-skill`

## SPC-71CF36EE63

### Control

Reject fixes that only patch the display while leaving the data path inconsistent.

### Categories

- API
- Data Flow
- Reliability
- State

### Used by

- `contract-api-stability-contract`
- `contract-error-handling-contract`
- `prompt-api-contract-review-prompt`
- `prompt-data-flow-trace-prompt`
- `prompt-state-management-audit-prompt`
- `skill-api-contract-inspection-skill`

## SPC-738D856382

### Control

Produce a repository map that a reviewer can verify without relying on memory.

### Categories

- Repository Analysis

### Used by

- `prompt-repository-reconnaissance-prompt`
- `skill-repository-mapping-skill`

## SPC-7464361C2D

### Control

Identify gaps between public site navigation and real files available in the repository.

### Categories

- Repository Analysis

### Used by

- `prompt-repository-reconnaissance-prompt`
- `skill-repository-mapping-skill`

## SPC-7531ECF3F7

### Control

Reject unsupported release language, especially claims about UI, accessibility, security, or deployment.

### Categories

- Delivery
- Review
- Risk

### Used by

- `contract-git-hygiene-contract`
- `prompt-premortem-failure-analysis-prompt`
- `prompt-regression-risk-review-prompt`
- `skill-code-review-skill`
- `skill-risk-register-skill`

## SPC-76C2A0C673

### Control

Force the agent to separate what it changed from what it merely recommends.

### Categories

- Agent Control
- Audit
- Core Control
- Evidence
- Honesty
- Output
- Prompt Writing
- Scope
- Scoping

### Used by

- `contract-agent-output-format-contract`
- `contract-completion-honesty-contract`
- `contract-evidence-contract`
- `contract-scope-control-contract`
- `prompt-anti-fake-completion-audit-prompt`
- `prompt-master-agent-enforcement-prompt`
- `prompt-scope-boundary-lock-prompt`
- `skill-agent-behaviour-hardening-skill`
- `skill-copy-ready-prompt-writing-skill`
- `skill-evidence-collection-skill`
- `skill-scoping-packet-skill`

## SPC-79F28504C6

### Control

Evaluate whether error handling leaks sensitive details or hides security-relevant failures.

### Categories

- Privacy
- Security

### Used by

- `contract-privacy-and-data-contract`
- `contract-secrets-handling-contract`
- `contract-security-boundary-contract`
- `prompt-secrets-handling-review-prompt`
- `prompt-security-trust-boundary-prompt`
- `skill-data-privacy-review-skill`
- `skill-secrets-review-skill`
- `skill-security-review-skill`

## SPC-7C1C296D50

### Control

Check for maintainability issues that will become expensive after merge.

### Categories

- Delivery
- Review
- Risk

### Used by

- `contract-git-hygiene-contract`
- `prompt-premortem-failure-analysis-prompt`
- `prompt-regression-risk-review-prompt`
- `skill-code-review-skill`
- `skill-risk-register-skill`

## SPC-7DF0ADB083

### Control

Avoid adding noisy telemetry that hides real failures or creates privacy exposure.

### Categories

- Observability
- Performance

### Used by

- `contract-logging-safety-contract`
- `contract-performance-budget-contract`
- `prompt-observability-and-logging-prompt`

## SPC-7EE53242C4

### Control

Check whether logs, metrics, traces, and alerts help debug failures without exposing sensitive information.

### Categories

- Observability
- Performance

### Used by

- `contract-logging-safety-contract`
- `contract-performance-budget-contract`
- `prompt-observability-and-logging-prompt`

## SPC-7FFA717A20

### Control

Compare every user-facing claim against implementation, examples, scripts, and current repository structure.

### Categories

- Delivery
- Documentation
- Release

### Used by

- `contract-documentation-truth-contract`
- `contract-readme-claim-contract`
- `contract-release-evidence-contract-plus`
- `prompt-documentation-truthfulness-prompt`
- `prompt-final-merge-gate-prompt`
- `prompt-readme-upgrade-prompt`
- `prompt-release-evidence-prompt`
- `skill-documentation-audit-skill`
- `skill-final-delivery-packaging-skill`
- `skill-readme-structuring-skill`
- `skill-release-notes-review-skill`

## SPC-8150A57ABC

### Control

Locate the smallest code path where the requested behaviour is decided.

### Categories

- Bug Remediation
- Implementation
- Planning

### Used by

- `prompt-bug-root-cause-remediation-prompt`
- `prompt-evidence-first-implementation-prompt`
- `prompt-feature-implementation-prompt`
- `prompt-minimal-correct-change-prompt`
- `skill-implementation-planning-skill`

## SPC-81E2966D0D

### Control

Cover happy path, negative path, boundary path, permission path, and regression path when relevant.

### Categories

- Testing
- Verification

### Used by

- `contract-test-behaviour-contract`
- `contract-verification-contract`
- `prompt-playwright-test-design-prompt`
- `prompt-test-quality-audit-prompt`
- `skill-playwright-debugging-skill`
- `skill-regression-test-design-skill`
- `skill-verification-reporting-skill`

## SPC-826EA422DD

### Control

Check input validation, output encoding, file handling, redirects, exports, and integrations.

### Categories

- Privacy
- Security

### Used by

- `contract-privacy-and-data-contract`
- `contract-secrets-handling-contract`
- `contract-security-boundary-contract`
- `prompt-secrets-handling-review-prompt`
- `prompt-security-trust-boundary-prompt`
- `skill-data-privacy-review-skill`
- `skill-secrets-review-skill`
- `skill-security-review-skill`

## SPC-8410E57EDA

### Control

Escalate high-risk uncertainty instead of treating it as a normal limitation.

### Categories

- Privacy
- Security

### Used by

- `contract-privacy-and-data-contract`
- `contract-secrets-handling-contract`
- `contract-security-boundary-contract`
- `prompt-secrets-handling-review-prompt`
- `prompt-security-trust-boundary-prompt`
- `skill-data-privacy-review-skill`
- `skill-secrets-review-skill`
- `skill-security-review-skill`

## SPC-8450AEE278

### Control

Avoid over-mocking the exact behaviour that needs confidence.

### Categories

- Testing
- Verification

### Used by

- `contract-test-behaviour-contract`
- `contract-verification-contract`
- `prompt-playwright-test-design-prompt`
- `prompt-test-quality-audit-prompt`
- `skill-playwright-debugging-skill`
- `skill-regression-test-design-skill`
- `skill-verification-reporting-skill`

## SPC-85A2A812F0

### Control

Detect layout shifts, overlap, clipped text, misaligned icons, and inaccessible density.

### Categories

- Design System
- Interaction
- Responsive UI
- UI/UX

### Used by

- `contract-design-system-contract`
- `contract-responsive-behaviour-contract`
- `contract-ui-visual-quality-contract`
- `prompt-design-system-consistency-prompt`
- `prompt-interaction-state-audit-prompt`
- `prompt-responsive-layout-audit-prompt`
- `prompt-ui-structure-audit-prompt`
- `prompt-visual-design-quality-gate-prompt`
- `skill-ui-screenshot-review-skill`

## SPC-85D9D0A23C

### Control

Validate that security controls are not weakened to satisfy tests or demos.

### Categories

- Privacy
- Security

### Used by

- `contract-privacy-and-data-contract`
- `contract-secrets-handling-contract`
- `contract-security-boundary-contract`
- `prompt-secrets-handling-review-prompt`
- `prompt-security-trust-boundary-prompt`
- `skill-data-privacy-review-skill`
- `skill-secrets-review-skill`
- `skill-security-review-skill`

## SPC-86C2D9759A

### Control

Locate any stale filenames, broken links, obsolete examples, or contradictory headings.

### Categories

- Repository Analysis

### Used by

- `prompt-repository-reconnaissance-prompt`
- `skill-repository-mapping-skill`

## SPC-8897CA6C8F

### Control

Document user impact, not only technical attributes.

### Categories

- Accessibility

### Used by

- `contract-accessibility-contract-plus`
- `contract-accessible-name-contract`
- `contract-keyboard-interaction-contract`
- `prompt-accessibility-remediation-prompt`
- `prompt-icon-only-control-review-prompt`
- `prompt-keyboard-journey-audit-prompt`
- `prompt-screen-reader-risk-review-prompt`
- `prompt-wcag-mapping-review-prompt`
- `skill-accessibility-inspection-skill`
- `skill-keyboard-testing-skill`
- `skill-wcag-mapping-skill`

## SPC-88F93E1499

### Control

Check that the public site exposes copy-ready assets rather than burying them in a file tree.

### Categories

- Delivery
- Documentation
- Release

### Used by

- `contract-documentation-truth-contract`
- `contract-readme-claim-contract`
- `contract-release-evidence-contract-plus`
- `prompt-documentation-truthfulness-prompt`
- `prompt-final-merge-gate-prompt`
- `prompt-readme-upgrade-prompt`
- `prompt-release-evidence-prompt`
- `skill-documentation-audit-skill`
- `skill-final-delivery-packaging-skill`
- `skill-readme-structuring-skill`
- `skill-release-notes-review-skill`

## SPC-8BBDD8F9F9

### Control

Separate unit, integration, end-to-end, accessibility, and manual checks in the report.

### Categories

- Testing
- Verification

### Used by

- `contract-test-behaviour-contract`
- `contract-verification-contract`
- `prompt-playwright-test-design-prompt`
- `prompt-test-quality-audit-prompt`
- `skill-playwright-debugging-skill`
- `skill-regression-test-design-skill`
- `skill-verification-reporting-skill`

## SPC-8D72280D87

### Control

Detect duplicated logic that should be consolidated only when consolidation would not obscure intent.

### Categories

- Architecture
- Clean-up
- Code Quality
- Dependency
- Refactor

### Used by

- `contract-architecture-boundary-contract`
- `contract-code-quality-contract`
- `contract-dead-code-removal-contract`
- `contract-dependency-addition-contract`
- `contract-refactor-safety-contract`
- `prompt-architecture-drift-audit-prompt`
- `prompt-code-quality-deep-audit-prompt`
- `prompt-dead-code-removal-prompt`
- `prompt-refactor-safety-prompt`
- `skill-architecture-review-skill`
- `skill-dead-code-detection-skill`
- `skill-refactor-planning-skill`

## SPC-8DD26F0FCB

### Control

Investigate flakes by isolating timing, state leakage, environment differences, and order dependence.

### Categories

- Testing
- Verification

### Used by

- `contract-test-behaviour-contract`
- `contract-verification-contract`
- `prompt-playwright-test-design-prompt`
- `prompt-test-quality-audit-prompt`
- `skill-playwright-debugging-skill`
- `skill-regression-test-design-skill`
- `skill-verification-reporting-skill`

## SPC-8EC07E421A

### Control

Check whether API shapes, schemas, and docs agree on names, optionality, types, and failure cases.

### Categories

- API
- Data Flow
- Reliability
- State

### Used by

- `contract-api-stability-contract`
- `contract-error-handling-contract`
- `prompt-api-contract-review-prompt`
- `prompt-data-flow-trace-prompt`
- `prompt-state-management-audit-prompt`
- `skill-api-contract-inspection-skill`

## SPC-8F58350FF8

### Control

Inspect cache invalidation, retry, pagination, filtering, sorting, and partial-data behaviours when relevant.

### Categories

- API
- Data Flow
- Reliability
- State

### Used by

- `contract-api-stability-contract`
- `contract-error-handling-contract`
- `prompt-api-contract-review-prompt`
- `prompt-data-flow-trace-prompt`
- `prompt-state-management-audit-prompt`
- `skill-api-contract-inspection-skill`

## SPC-8FB2382903

### Control

Trace inputs from boundary to transformation to storage, rendering, export, or response.

### Categories

- API
- Data Flow
- Reliability
- State

### Used by

- `contract-api-stability-contract`
- `contract-error-handling-contract`
- `prompt-api-contract-review-prompt`
- `prompt-data-flow-trace-prompt`
- `prompt-state-management-audit-prompt`
- `skill-api-contract-inspection-skill`

## SPC-911DD1C1CE

### Control

Separate tutorial guidance, reference material, contracts, examples, and release notes.

### Categories

- Delivery
- Documentation
- Release

### Used by

- `contract-documentation-truth-contract`
- `contract-readme-claim-contract`
- `contract-release-evidence-contract-plus`
- `prompt-documentation-truthfulness-prompt`
- `prompt-final-merge-gate-prompt`
- `prompt-readme-upgrade-prompt`
- `prompt-release-evidence-prompt`
- `skill-documentation-audit-skill`
- `skill-final-delivery-packaging-skill`
- `skill-readme-structuring-skill`
- `skill-release-notes-review-skill`

## SPC-9200311108

### Control

Check whether the test would catch a wrong implementation or only confirm rendering existence.

### Categories

- Testing
- Verification

### Used by

- `contract-test-behaviour-contract`
- `contract-verification-contract`
- `prompt-playwright-test-design-prompt`
- `prompt-test-quality-audit-prompt`
- `skill-playwright-debugging-skill`
- `skill-regression-test-design-skill`
- `skill-verification-reporting-skill`

## SPC-9253D12F94

### Control

Confirm that data displayed to users can be traced back to an inspected source.

### Categories

- API
- Data Flow
- Reliability
- State

### Used by

- `contract-api-stability-contract`
- `contract-error-handling-contract`
- `prompt-api-contract-review-prompt`
- `prompt-data-flow-trace-prompt`
- `prompt-state-management-audit-prompt`
- `skill-api-contract-inspection-skill`

## SPC-92FC5AFD97

### Control

Check authentication, authorisation, session handling, tenant boundaries, and privilege changes when relevant.

### Categories

- Privacy
- Security

### Used by

- `contract-privacy-and-data-contract`
- `contract-secrets-handling-contract`
- `contract-security-boundary-contract`
- `prompt-secrets-handling-review-prompt`
- `prompt-security-trust-boundary-prompt`
- `skill-data-privacy-review-skill`
- `skill-secrets-review-skill`
- `skill-security-review-skill`

## SPC-93477ED152

### Control

Confirm that keyboard focus order matches visual order and task order.

### Categories

- Design System
- Interaction
- Responsive UI
- UI/UX

### Used by

- `contract-design-system-contract`
- `contract-responsive-behaviour-contract`
- `contract-ui-visual-quality-contract`
- `prompt-design-system-consistency-prompt`
- `prompt-interaction-state-audit-prompt`
- `prompt-responsive-layout-audit-prompt`
- `prompt-ui-structure-audit-prompt`
- `prompt-visual-design-quality-gate-prompt`
- `skill-ui-screenshot-review-skill`

## SPC-97E18BC9B1

### Control

Extract every premise used in the answer and label it as observed, derived, assumed, or unknown.

### Categories

- Evaluation
- Honesty
- Reasoning Control

### Used by

- `contract-assumption-contract`
- `prompt-assumption-exposure-prompt`
- `prompt-contradiction-detection-prompt`
- `prompt-uncertainty-calibration-prompt`
- `skill-failure-disclosure-skill`
- `skill-prompt-evaluation-skill`

## SPC-99A67D91AE

### Control

Inspect whether starter artefacts are clearly separated from product claims.

### Categories

- Repository Analysis

### Used by

- `prompt-repository-reconnaissance-prompt`
- `skill-repository-mapping-skill`

## SPC-99CF5E18D0

### Control

Check that the site explains the product in the first screen without relying on repository knowledge.

### Categories

- Site/Product
- Template Product

### Used by

- `contract-template-library-quality-contract`
- `prompt-github-pages-template-hub-prompt`
- `skill-github-pages-ux-skill`
- `skill-template-catalogue-design-skill`

## SPC-99EA88416B

### Control

Evaluate whether abstractions simplify real behaviour or merely add indirection.

### Categories

- Architecture
- Clean-up
- Code Quality
- Dependency
- Refactor

### Used by

- `contract-architecture-boundary-contract`
- `contract-code-quality-contract`
- `contract-dead-code-removal-contract`
- `contract-dependency-addition-contract`
- `contract-refactor-safety-contract`
- `prompt-architecture-drift-audit-prompt`
- `prompt-code-quality-deep-audit-prompt`
- `prompt-dead-code-removal-prompt`
- `prompt-refactor-safety-prompt`
- `skill-architecture-review-skill`
- `skill-dead-code-detection-skill`
- `skill-refactor-planning-skill`

## SPC-9A10CA3699

### Control

Report skipped tests with reasons and risk impact.

### Categories

- Testing
- Verification

### Used by

- `contract-test-behaviour-contract`
- `contract-verification-contract`
- `prompt-playwright-test-design-prompt`
- `prompt-test-quality-audit-prompt`
- `skill-playwright-debugging-skill`
- `skill-regression-test-design-skill`
- `skill-verification-reporting-skill`

## SPC-9B148C086E

### Control

Keep examples honest: label sample data, hypothetical behaviour, and unverified runtime behaviour.

### Categories

- Delivery
- Documentation
- Release

### Used by

- `contract-documentation-truth-contract`
- `contract-readme-claim-contract`
- `contract-release-evidence-contract-plus`
- `prompt-documentation-truthfulness-prompt`
- `prompt-final-merge-gate-prompt`
- `prompt-readme-upgrade-prompt`
- `prompt-release-evidence-prompt`
- `skill-documentation-audit-skill`
- `skill-final-delivery-packaging-skill`
- `skill-readme-structuring-skill`
- `skill-release-notes-review-skill`

## SPC-A42B28B42C

### Control

Identify the behaviour, latency, throughput, reliability, and operational signals that matter for this task.

### Categories

- Observability
- Performance

### Used by

- `contract-logging-safety-contract`
- `contract-performance-budget-contract`
- `prompt-observability-and-logging-prompt`

## SPC-A613B10548

### Control

Inspect module boundaries and identify whether responsibilities are isolated or leaking across layers.

### Categories

- Architecture
- Clean-up
- Code Quality
- Dependency
- Refactor

### Used by

- `contract-architecture-boundary-contract`
- `contract-code-quality-contract`
- `contract-dead-code-removal-contract`
- `contract-dependency-addition-contract`
- `contract-refactor-safety-contract`
- `prompt-architecture-drift-audit-prompt`
- `prompt-code-quality-deep-audit-prompt`
- `prompt-dead-code-removal-prompt`
- `prompt-refactor-safety-prompt`
- `skill-architecture-review-skill`
- `skill-dead-code-detection-skill`
- `skill-refactor-planning-skill`

## SPC-A73107D15B

### Control

Look for hidden coupling through shared state, implicit globals, broad utilities, or context objects.

### Categories

- Architecture
- Clean-up
- Code Quality
- Dependency
- Refactor

### Used by

- `contract-architecture-boundary-contract`
- `contract-code-quality-contract`
- `contract-dead-code-removal-contract`
- `contract-dependency-addition-contract`
- `contract-refactor-safety-contract`
- `prompt-architecture-drift-audit-prompt`
- `prompt-code-quality-deep-audit-prompt`
- `prompt-dead-code-removal-prompt`
- `prompt-refactor-safety-prompt`
- `skill-architecture-review-skill`
- `skill-dead-code-detection-skill`
- `skill-refactor-planning-skill`

## SPC-A8B18A88EC

### Control

Inspect empty, error, loading, long-content, narrow-screen, and overflow states.

### Categories

- Design System
- Interaction
- Responsive UI
- UI/UX

### Used by

- `contract-design-system-contract`
- `contract-responsive-behaviour-contract`
- `contract-ui-visual-quality-contract`
- `prompt-design-system-consistency-prompt`
- `prompt-interaction-state-audit-prompt`
- `prompt-responsive-layout-audit-prompt`
- `prompt-ui-structure-audit-prompt`
- `prompt-visual-design-quality-gate-prompt`
- `skill-ui-screenshot-review-skill`

## SPC-AEC861D97F

### Control

Provide “when to use” guidance so users select the smallest correct asset.

### Categories

- Site/Product
- Template Product

### Used by

- `contract-template-library-quality-contract`
- `prompt-github-pages-template-hub-prompt`
- `skill-github-pages-ux-skill`
- `skill-template-catalogue-design-skill`

## SPC-AFDE64D1AB

### Control

Expose template categories, copy actions, download links, starter packs, and examples clearly.

### Categories

- Site/Product
- Template Product

### Used by

- `contract-template-library-quality-contract`
- `prompt-github-pages-template-hub-prompt`
- `skill-github-pages-ux-skill`
- `skill-template-catalogue-design-skill`

## SPC-B0F9D04810

### Control

Ensure the site can work on GitHub Pages without a build pipeline unless one is documented.

### Categories

- Site/Product
- Template Product

### Used by

- `contract-template-library-quality-contract`
- `prompt-github-pages-template-hub-prompt`
- `skill-github-pages-ux-skill`
- `skill-template-catalogue-design-skill`

## SPC-B2399CA6E8

### Control

Inspect whether the answer overfits a single example and ignores general behaviour.

### Categories

- Evaluation
- Honesty
- Reasoning Control

### Used by

- `contract-assumption-contract`
- `prompt-assumption-exposure-prompt`
- `prompt-contradiction-detection-prompt`
- `prompt-uncertainty-calibration-prompt`
- `skill-failure-disclosure-skill`
- `skill-prompt-evaluation-skill`

## SPC-B25B6C49C9

### Control

Check accessible names, roles, states, descriptions, and relationships for interactive elements.

### Categories

- Accessibility

### Used by

- `contract-accessibility-contract-plus`
- `contract-accessible-name-contract`
- `contract-keyboard-interaction-contract`
- `prompt-accessibility-remediation-prompt`
- `prompt-icon-only-control-review-prompt`
- `prompt-keyboard-journey-audit-prompt`
- `prompt-screen-reader-risk-review-prompt`
- `prompt-wcag-mapping-review-prompt`
- `skill-accessibility-inspection-skill`
- `skill-keyboard-testing-skill`
- `skill-wcag-mapping-skill`

## SPC-B28169E5F4

### Control

Block language that says the system is finished when the agent only produced a plausible artefact.

### Categories

- Agent Control
- Audit
- Core Control
- Evidence
- Honesty
- Output
- Prompt Writing
- Scope
- Scoping

### Used by

- `contract-agent-output-format-contract`
- `contract-completion-honesty-contract`
- `contract-evidence-contract`
- `contract-scope-control-contract`
- `prompt-anti-fake-completion-audit-prompt`
- `prompt-master-agent-enforcement-prompt`
- `prompt-scope-boundary-lock-prompt`
- `skill-agent-behaviour-hardening-skill`
- `skill-copy-ready-prompt-writing-skill`
- `skill-evidence-collection-skill`
- `skill-scoping-packet-skill`

## SPC-B4F82C647A

### Control

Avoid turning documentation into marketing-only copy that drifts from real repository files.

### Categories

- Site/Product
- Template Product

### Used by

- `contract-template-library-quality-contract`
- `prompt-github-pages-template-hub-prompt`
- `skill-github-pages-ux-skill`
- `skill-template-catalogue-design-skill`

## SPC-B66E265E54

### Control

Inspect error handling paths for silent failure, swallowed exceptions, and misleading fallbacks.

### Categories

- Architecture
- Clean-up
- Code Quality
- Dependency
- Refactor

### Used by

- `contract-architecture-boundary-contract`
- `contract-code-quality-contract`
- `contract-dead-code-removal-contract`
- `contract-dependency-addition-contract`
- `contract-refactor-safety-contract`
- `prompt-architecture-drift-audit-prompt`
- `prompt-code-quality-deep-audit-prompt`
- `prompt-dead-code-removal-prompt`
- `prompt-refactor-safety-prompt`
- `skill-architecture-review-skill`
- `skill-dead-code-detection-skill`
- `skill-refactor-planning-skill`

## SPC-B75C7DAC35

### Control

Verify keyboard operation, focus visibility, tab order, focus restoration, and escape behaviour.

### Categories

- Accessibility

### Used by

- `contract-accessibility-contract-plus`
- `contract-accessible-name-contract`
- `contract-keyboard-interaction-contract`
- `prompt-accessibility-remediation-prompt`
- `prompt-icon-only-control-review-prompt`
- `prompt-keyboard-journey-audit-prompt`
- `prompt-screen-reader-risk-review-prompt`
- `prompt-wcag-mapping-review-prompt`
- `skill-accessibility-inspection-skill`
- `skill-keyboard-testing-skill`
- `skill-wcag-mapping-skill`

## SPC-B7DED1701F

### Control

Identify which specialist review lane is required next: accessibility, security, performance, docs, or release.

### Categories

- Delivery
- Review
- Risk

### Used by

- `contract-git-hygiene-contract`
- `prompt-premortem-failure-analysis-prompt`
- `prompt-regression-risk-review-prompt`
- `skill-code-review-skill`
- `skill-risk-register-skill`

## SPC-B96524207B

### Control

Document invariants that must remain true across future changes.

### Categories

- API
- Data Flow
- Reliability
- State

### Used by

- `contract-api-stability-contract`
- `contract-error-handling-contract`
- `prompt-api-contract-review-prompt`
- `prompt-data-flow-trace-prompt`
- `prompt-state-management-audit-prompt`
- `skill-api-contract-inspection-skill`

## SPC-C09D70A638

### Control

Check whether data contracts, UI contracts, and API contracts are mixed in the same place.

### Categories

- Architecture
- Clean-up
- Code Quality
- Dependency
- Refactor

### Used by

- `contract-architecture-boundary-contract`
- `contract-code-quality-contract`
- `contract-dead-code-removal-contract`
- `contract-dependency-addition-contract`
- `contract-refactor-safety-contract`
- `prompt-architecture-drift-audit-prompt`
- `prompt-code-quality-deep-audit-prompt`
- `prompt-dead-code-removal-prompt`
- `prompt-refactor-safety-prompt`
- `skill-architecture-review-skill`
- `skill-dead-code-detection-skill`
- `skill-refactor-planning-skill`

## SPC-C0C6AD53CF

### Control

Include command output and failure traces for reproducibility.

### Categories

- Testing
- Verification

### Used by

- `contract-test-behaviour-contract`
- `contract-verification-contract`
- `prompt-playwright-test-design-prompt`
- `prompt-test-quality-audit-prompt`
- `skill-playwright-debugging-skill`
- `skill-regression-test-design-skill`
- `skill-verification-reporting-skill`

## SPC-C1851C2F70

### Control

Tie every architectural recommendation to maintainability, correctness, testability, or risk reduction.

### Categories

- Architecture
- Clean-up
- Code Quality
- Dependency
- Refactor

### Used by

- `contract-architecture-boundary-contract`
- `contract-code-quality-contract`
- `contract-dead-code-removal-contract`
- `contract-dependency-addition-contract`
- `contract-refactor-safety-contract`
- `prompt-architecture-drift-audit-prompt`
- `prompt-code-quality-deep-audit-prompt`
- `prompt-dead-code-removal-prompt`
- `prompt-refactor-safety-prompt`
- `skill-architecture-review-skill`
- `skill-dead-code-detection-skill`
- `skill-refactor-planning-skill`

## SPC-C24179F4D3

### Control

Ask what evidence would change the conclusion and whether that evidence was actually inspected.

### Categories

- Evaluation
- Honesty
- Reasoning Control

### Used by

- `contract-assumption-contract`
- `prompt-assumption-exposure-prompt`
- `prompt-contradiction-detection-prompt`
- `prompt-uncertainty-calibration-prompt`
- `skill-failure-disclosure-skill`
- `skill-prompt-evaluation-skill`

## SPC-C2624E56E1

### Control

Separate prompts, skills, contracts, engineering templates, examples, and research basis.

### Categories

- Site/Product
- Template Product

### Used by

- `contract-template-library-quality-contract`
- `prompt-github-pages-template-hub-prompt`
- `skill-github-pages-ux-skill`
- `skill-template-catalogue-design-skill`

## SPC-C4C0637D2C

### Control

Remove marketing adjectives that imply more proof than the repository provides.

### Categories

- Delivery
- Documentation
- Release

### Used by

- `contract-documentation-truth-contract`
- `contract-readme-claim-contract`
- `contract-release-evidence-contract-plus`
- `prompt-documentation-truthfulness-prompt`
- `prompt-final-merge-gate-prompt`
- `prompt-readme-upgrade-prompt`
- `prompt-release-evidence-prompt`
- `skill-documentation-audit-skill`
- `skill-final-delivery-packaging-skill`
- `skill-readme-structuring-skill`
- `skill-release-notes-review-skill`

## SPC-C529DE3CCA

### Control

Preserve uncertainty where uncertainty is honest; do not compress nuance into false certainty.

### Categories

- Evaluation
- Honesty
- Reasoning Control

### Used by

- `contract-assumption-contract`
- `prompt-assumption-exposure-prompt`
- `prompt-contradiction-detection-prompt`
- `prompt-uncertainty-calibration-prompt`
- `skill-failure-disclosure-skill`
- `skill-prompt-evaluation-skill`

## SPC-C542D001C9

### Control

Avoid changing unrelated tokens, routes, schemas, or global state to make the current task easier.

### Categories

- Bug Remediation
- Implementation
- Planning

### Used by

- `prompt-bug-root-cause-remediation-prompt`
- `prompt-evidence-first-implementation-prompt`
- `prompt-feature-implementation-prompt`
- `prompt-minimal-correct-change-prompt`
- `skill-implementation-planning-skill`

## SPC-C5886BC199

### Control

Verify that every public link points to a real file and that labels match destination content.

### Categories

- Site/Product
- Template Product

### Used by

- `contract-template-library-quality-contract`
- `prompt-github-pages-template-hub-prompt`
- `skill-github-pages-ux-skill`
- `skill-template-catalogue-design-skill`

## SPC-C595067E22

### Control

Prefer budget-based recommendations over vague “optimise” advice.

### Categories

- Observability
- Performance

### Used by

- `contract-logging-safety-contract`
- `contract-performance-budget-contract`
- `prompt-observability-and-logging-prompt`

## SPC-C6694B86EF

### Control

Identify which files are authoritative and which are examples, generated outputs, or site surfaces.

### Categories

- Repository Analysis

### Used by

- `prompt-repository-reconnaissance-prompt`
- `skill-repository-mapping-skill`

## SPC-CAE6C1B585

### Control

Check links, filenames, headings, manifests, and site navigation for drift.

### Categories

- Delivery
- Documentation
- Release

### Used by

- `contract-documentation-truth-contract`
- `contract-readme-claim-contract`
- `contract-release-evidence-contract-plus`
- `prompt-documentation-truthfulness-prompt`
- `prompt-final-merge-gate-prompt`
- `prompt-readme-upgrade-prompt`
- `prompt-release-evidence-prompt`
- `skill-documentation-audit-skill`
- `skill-final-delivery-packaging-skill`
- `skill-readme-structuring-skill`
- `skill-release-notes-review-skill`

## SPC-CC24B506CF

### Control

Tie findings to a concrete exploit path, misuse case, or operational risk.

### Categories

- Privacy
- Security

### Used by

- `contract-privacy-and-data-contract`
- `contract-secrets-handling-contract`
- `contract-security-boundary-contract`
- `prompt-secrets-handling-review-prompt`
- `prompt-security-trust-boundary-prompt`
- `skill-data-privacy-review-skill`
- `skill-secrets-review-skill`
- `skill-security-review-skill`

## SPC-CD53A45407

### Control

Update docs or examples only when the implementation proves the described behaviour.

### Categories

- Bug Remediation
- Implementation
- Planning

### Used by

- `prompt-bug-root-cause-remediation-prompt`
- `prompt-evidence-first-implementation-prompt`
- `prompt-feature-implementation-prompt`
- `prompt-minimal-correct-change-prompt`
- `skill-implementation-planning-skill`

## SPC-CE597C98CD

### Control

Look for mismatches between backend constraints and frontend assumptions.

### Categories

- API
- Data Flow
- Reliability
- State

### Used by

- `contract-api-stability-contract`
- `contract-error-handling-contract`
- `prompt-api-contract-review-prompt`
- `prompt-data-flow-trace-prompt`
- `prompt-state-management-audit-prompt`
- `skill-api-contract-inspection-skill`

## SPC-D1283E6C6A

### Control

Inspect expensive loops, duplicate work, unnecessary renders, blocking calls, and unbounded data growth.

### Categories

- Observability
- Performance

### Used by

- `contract-logging-safety-contract`
- `contract-performance-budget-contract`
- `prompt-observability-and-logging-prompt`

## SPC-D1ABD938E7

### Control

Separate structural improvement recommendations from required fixes.

### Categories

- Repository Analysis

### Used by

- `prompt-repository-reconnaissance-prompt`
- `skill-repository-mapping-skill`

## SPC-D42A645787

### Control

Update tests only when they prove behaviour and do not merely snapshot the new implementation.

### Categories

- Bug Remediation
- Implementation
- Planning

### Used by

- `prompt-bug-root-cause-remediation-prompt`
- `prompt-evidence-first-implementation-prompt`
- `prompt-feature-implementation-prompt`
- `prompt-minimal-correct-change-prompt`
- `skill-implementation-planning-skill`

## SPC-D47AE1C625

### Control

Confirm that validation scripts fail for meaningful drift rather than only checking superficial existence.

### Categories

- Repository Analysis

### Used by

- `prompt-repository-reconnaissance-prompt`
- `skill-repository-mapping-skill`

## SPC-D6AF8F4F01

### Control

Inventory top-level folders, build scripts, validation scripts, docs, prompts, contracts, and generated artefacts.

### Categories

- Repository Analysis

### Used by

- `prompt-repository-reconnaissance-prompt`
- `skill-repository-mapping-skill`

## SPC-D9266B2129

### Control

Review the actual diff or artefact, not the implementer’s summary.

### Categories

- Delivery
- Review
- Risk

### Used by

- `contract-git-hygiene-contract`
- `prompt-premortem-failure-analysis-prompt`
- `prompt-regression-risk-review-prompt`
- `skill-code-review-skill`
- `skill-risk-register-skill`

## SPC-DC6C05703F

### Control

Detect accidental framework drift, dependency creep, and inconsistent file organisation.

### Categories

- Architecture
- Clean-up
- Code Quality
- Dependency
- Refactor

### Used by

- `contract-architecture-boundary-contract`
- `contract-code-quality-contract`
- `contract-dead-code-removal-contract`
- `contract-dependency-addition-contract`
- `contract-refactor-safety-contract`
- `prompt-architecture-drift-audit-prompt`
- `prompt-code-quality-deep-audit-prompt`
- `prompt-dead-code-removal-prompt`
- `prompt-refactor-safety-prompt`
- `skill-architecture-review-skill`
- `skill-dead-code-detection-skill`
- `skill-refactor-planning-skill`

## SPC-E11FEFF55C

### Control

Identify trust boundaries, actors, permissions, data sensitivity, and abuse paths before assessing code.

### Categories

- Privacy
- Security

### Used by

- `contract-privacy-and-data-contract`
- `contract-secrets-handling-contract`
- `contract-security-boundary-contract`
- `prompt-secrets-handling-review-prompt`
- `prompt-security-trust-boundary-prompt`
- `skill-data-privacy-review-skill`
- `skill-secrets-review-skill`
- `skill-security-review-skill`

## SPC-E15B71EC2C

### Control

Treat unverified UI, security, accessibility, data, and release claims as blocked, not as minor caveats.

### Categories

- Agent Control
- Audit
- Core Control
- Evidence
- Honesty
- Output
- Prompt Writing
- Scope
- Scoping

### Used by

- `contract-agent-output-format-contract`
- `contract-completion-honesty-contract`
- `contract-evidence-contract`
- `contract-scope-control-contract`
- `prompt-anti-fake-completion-audit-prompt`
- `prompt-master-agent-enforcement-prompt`
- `prompt-scope-boundary-lock-prompt`
- `skill-agent-behaviour-hardening-skill`
- `skill-copy-ready-prompt-writing-skill`
- `skill-evidence-collection-skill`
- `skill-scoping-packet-skill`

## SPC-E210F8DD35

### Control

Keep JavaScript progressive and accessible; plain links must still work.

### Categories

- Site/Product
- Template Product

### Used by

- `contract-template-library-quality-contract`
- `prompt-github-pages-template-hub-prompt`
- `skill-github-pages-ux-skill`
- `skill-template-catalogue-design-skill`

## SPC-E2C0B279DE

### Control

Use screenshots as evidence only when they are current and tied to a route or state.

### Categories

- Design System
- Interaction
- Responsive UI
- UI/UX

### Used by

- `contract-design-system-contract`
- `contract-responsive-behaviour-contract`
- `contract-ui-visual-quality-contract`
- `prompt-design-system-consistency-prompt`
- `prompt-interaction-state-audit-prompt`
- `prompt-responsive-layout-audit-prompt`
- `prompt-ui-structure-audit-prompt`
- `prompt-visual-design-quality-gate-prompt`
- `skill-ui-screenshot-review-skill`

## SPC-E3C1AD4005

### Control

Flag large functions, broad conditionals, brittle naming, and unclear ownership.

### Categories

- Architecture
- Clean-up
- Code Quality
- Dependency
- Refactor

### Used by

- `contract-architecture-boundary-contract`
- `contract-code-quality-contract`
- `contract-dead-code-removal-contract`
- `contract-dependency-addition-contract`
- `contract-refactor-safety-contract`
- `prompt-architecture-drift-audit-prompt`
- `prompt-code-quality-deep-audit-prompt`
- `prompt-dead-code-removal-prompt`
- `prompt-refactor-safety-prompt`
- `skill-architecture-review-skill`
- `skill-dead-code-detection-skill`
- `skill-refactor-planning-skill`

## SPC-E471C258A2

### Control

Search for missing negative cases, missing permissions, missing empty states, and missing invalid-input paths.

### Categories

- Evaluation
- Honesty
- Reasoning Control

### Used by

- `contract-assumption-contract`
- `prompt-assumption-exposure-prompt`
- `prompt-contradiction-detection-prompt`
- `prompt-uncertainty-calibration-prompt`
- `skill-failure-disclosure-skill`
- `skill-prompt-evaluation-skill`

## SPC-E488688DB6

### Control

Evaluate contrast, target size, text resizing, reduced motion, and non-colour indicators where relevant.

### Categories

- Accessibility

### Used by

- `contract-accessibility-contract-plus`
- `contract-accessible-name-contract`
- `contract-keyboard-interaction-contract`
- `prompt-accessibility-remediation-prompt`
- `prompt-icon-only-control-review-prompt`
- `prompt-keyboard-journey-audit-prompt`
- `prompt-screen-reader-risk-review-prompt`
- `prompt-wcag-mapping-review-prompt`
- `skill-accessibility-inspection-skill`
- `skill-keyboard-testing-skill`
- `skill-wcag-mapping-skill`

## SPC-E76E5608BB

### Control

Make documentation useful for both humans and coding agents.

### Categories

- Delivery
- Documentation
- Release

### Used by

- `contract-documentation-truth-contract`
- `contract-readme-claim-contract`
- `contract-release-evidence-contract-plus`
- `prompt-documentation-truthfulness-prompt`
- `prompt-final-merge-gate-prompt`
- `prompt-readme-upgrade-prompt`
- `prompt-release-evidence-prompt`
- `skill-documentation-audit-skill`
- `skill-final-delivery-packaging-skill`
- `skill-readme-structuring-skill`
- `skill-release-notes-review-skill`

## SPC-EA427713A8

### Control

Distinguish blockers from improvements and explain why each blocker blocks acceptance.

### Categories

- Delivery
- Review
- Risk

### Used by

- `contract-git-hygiene-contract`
- `prompt-premortem-failure-analysis-prompt`
- `prompt-regression-risk-review-prompt`
- `skill-code-review-skill`
- `skill-risk-register-skill`

## SPC-ECB7DBF3BE

### Control

Map findings to relevant WCAG 2.2 success criteria when the issue is within WCAG scope.

### Categories

- Accessibility

### Used by

- `contract-accessibility-contract-plus`
- `contract-accessible-name-contract`
- `contract-keyboard-interaction-contract`
- `prompt-accessibility-remediation-prompt`
- `prompt-icon-only-control-review-prompt`
- `prompt-keyboard-journey-audit-prompt`
- `prompt-screen-reader-risk-review-prompt`
- `prompt-wcag-mapping-review-prompt`
- `skill-accessibility-inspection-skill`
- `skill-keyboard-testing-skill`
- `skill-wcag-mapping-skill`

## SPC-ECDA180771

### Control

Do not update snapshots or assertions unless the changed expectation is justified by the requirement.

### Categories

- Testing
- Verification

### Used by

- `contract-test-behaviour-contract`
- `contract-verification-contract`
- `prompt-playwright-test-design-prompt`
- `prompt-test-quality-audit-prompt`
- `skill-playwright-debugging-skill`
- `skill-regression-test-design-skill`
- `skill-verification-reporting-skill`

## SPC-EEA9B39F0F

### Control

Report what can be monitored after merge and what would still be invisible.

### Categories

- Observability
- Performance

### Used by

- `contract-logging-safety-contract`
- `contract-performance-budget-contract`
- `prompt-observability-and-logging-prompt`

## SPC-EFF97EDB2E

### Control

Check caching, invalidation, backpressure, retries, timeouts, and cancellation when relevant.

### Categories

- Observability
- Performance

### Used by

- `contract-logging-safety-contract`
- `contract-performance-budget-contract`
- `prompt-observability-and-logging-prompt`

## SPC-EFFC0C67A8

### Control

State what the repository proves and what it explicitly does not prove.

### Categories

- Delivery
- Documentation
- Release

### Used by

- `contract-documentation-truth-contract`
- `contract-readme-claim-contract`
- `contract-release-evidence-contract-plus`
- `prompt-documentation-truthfulness-prompt`
- `prompt-final-merge-gate-prompt`
- `prompt-readme-upgrade-prompt`
- `prompt-release-evidence-prompt`
- `skill-documentation-audit-skill`
- `skill-final-delivery-packaging-skill`
- `skill-readme-structuring-skill`
- `skill-release-notes-review-skill`

## SPC-F1F42D414B

### Control

Map the shortest reading path for a new contributor and the shortest execution path for an agent.

### Categories

- Repository Analysis

### Used by

- `prompt-repository-reconnaissance-prompt`
- `skill-repository-mapping-skill`

## SPC-F2FAD1D23C

### Control

Require an explicit rollback or containment note when the change touches shared behaviour.

### Categories

- Agent Control
- Audit
- Core Control
- Evidence
- Honesty
- Output
- Prompt Writing
- Scope
- Scoping

### Used by

- `contract-agent-output-format-contract`
- `contract-completion-honesty-contract`
- `contract-evidence-contract`
- `contract-scope-control-contract`
- `prompt-anti-fake-completion-audit-prompt`
- `prompt-master-agent-enforcement-prompt`
- `prompt-scope-boundary-lock-prompt`
- `skill-agent-behaviour-hardening-skill`
- `skill-copy-ready-prompt-writing-skill`
- `skill-evidence-collection-skill`
- `skill-scoping-packet-skill`

## SPC-F4B6552C89

### Control

Check whether important files are discoverable by humans and by coding agents.

### Categories

- Repository Analysis

### Used by

- `prompt-repository-reconnaissance-prompt`
- `skill-repository-mapping-skill`

## SPC-F5DE4108CA

### Control

Separate “not found” from “not present”; absence of evidence is not proof without a sufficient search.

### Categories

- Evaluation
- Honesty
- Reasoning Control

### Used by

- `contract-assumption-contract`
- `prompt-assumption-exposure-prompt`
- `prompt-contradiction-detection-prompt`
- `prompt-uncertainty-calibration-prompt`
- `skill-failure-disclosure-skill`
- `skill-prompt-evaluation-skill`

## SPC-F6533D8814

### Control

Make the agent say “not verified” when evidence does not exist, even if the answer feels likely.

### Categories

- Agent Control
- Audit
- Core Control
- Evidence
- Honesty
- Output
- Prompt Writing
- Scope
- Scoping

### Used by

- `contract-agent-output-format-contract`
- `contract-completion-honesty-contract`
- `contract-evidence-contract`
- `contract-scope-control-contract`
- `prompt-anti-fake-completion-audit-prompt`
- `prompt-master-agent-enforcement-prompt`
- `prompt-scope-boundary-lock-prompt`
- `skill-agent-behaviour-hardening-skill`
- `skill-copy-ready-prompt-writing-skill`
- `skill-evidence-collection-skill`
- `skill-scoping-packet-skill`

## SPC-F771CE14DC

### Control

Confirm that remediation does not create keyboard traps, focus loss, duplicate names, or semantic conflicts.

### Categories

- Accessibility

### Used by

- `contract-accessibility-contract-plus`
- `contract-accessible-name-contract`
- `contract-keyboard-interaction-contract`
- `prompt-accessibility-remediation-prompt`
- `prompt-icon-only-control-review-prompt`
- `prompt-keyboard-journey-audit-prompt`
- `prompt-screen-reader-risk-review-prompt`
- `prompt-wcag-mapping-review-prompt`
- `skill-accessibility-inspection-skill`
- `skill-keyboard-testing-skill`
- `skill-wcag-mapping-skill`

## SPC-F775C269AE

### Control

Require a named verifier for each major claim: source inspection, runtime behaviour, test output, or manual review.

### Categories

- Agent Control
- Audit
- Core Control
- Evidence
- Honesty
- Output
- Prompt Writing
- Scope
- Scoping

### Used by

- `contract-agent-output-format-contract`
- `contract-completion-honesty-contract`
- `contract-evidence-contract`
- `contract-scope-control-contract`
- `prompt-anti-fake-completion-audit-prompt`
- `prompt-master-agent-enforcement-prompt`
- `prompt-scope-boundary-lock-prompt`
- `skill-agent-behaviour-hardening-skill`
- `skill-copy-ready-prompt-writing-skill`
- `skill-evidence-collection-skill`
- `skill-scoping-packet-skill`

## SPC-F8FF4EA263

### Control

Check whether users can understand what action is available before interacting.

### Categories

- Design System
- Interaction
- Responsive UI
- UI/UX

### Used by

- `contract-design-system-contract`
- `contract-responsive-behaviour-contract`
- `contract-ui-visual-quality-contract`
- `prompt-design-system-consistency-prompt`
- `prompt-interaction-state-audit-prompt`
- `prompt-responsive-layout-audit-prompt`
- `prompt-ui-structure-audit-prompt`
- `prompt-visual-design-quality-gate-prompt`
- `skill-ui-screenshot-review-skill`

## SPC-F97A689D53

### Control

Identify where the agent is most likely to be anchoring on the first plausible solution.

### Categories

- Evaluation
- Honesty
- Reasoning Control

### Used by

- `contract-assumption-contract`
- `prompt-assumption-exposure-prompt`
- `prompt-contradiction-detection-prompt`
- `prompt-uncertainty-calibration-prompt`
- `skill-failure-disclosure-skill`
- `skill-prompt-evaluation-skill`

## SPC-FB2C57BE53

### Control

Prohibit invented context, invented file names, invented command results, and invented acceptance criteria.

### Categories

- Evaluation
- Honesty
- Reasoning Control

### Used by

- `contract-assumption-contract`
- `prompt-assumption-exposure-prompt`
- `prompt-contradiction-detection-prompt`
- `prompt-uncertainty-calibration-prompt`
- `skill-failure-disclosure-skill`
- `skill-prompt-evaluation-skill`

## SPC-FC008E8455

### Control

Check mobile, low-bandwidth, large-data, and long-session risk where relevant.

### Categories

- Observability
- Performance

### Used by

- `contract-logging-safety-contract`
- `contract-performance-budget-contract`
- `prompt-observability-and-logging-prompt`

## SPC-FC40062B6C

### Control

Detect duplicated concepts that are likely to drift: README promises, site copy, manifest entries, and catalogue text.

### Categories

- Repository Analysis

### Used by

- `prompt-repository-reconnaissance-prompt`
- `skill-repository-mapping-skill`

## SPC-FC8CF96A37

### Control

Treat unmeasured performance claims as not verified.

### Categories

- Observability
- Performance

### Used by

- `contract-logging-safety-contract`
- `contract-performance-budget-contract`
- `prompt-observability-and-logging-prompt`

## SPC-FDB4A280CF

### Control

Validate that logging is structured, actionable, and tied to user or system events.

### Categories

- Observability
- Performance

### Used by

- `contract-logging-safety-contract`
- `contract-performance-budget-contract`
- `prompt-observability-and-logging-prompt`

## SPC-FE7AAAFCCC

### Control

Distinguish performance hypotheses from measured evidence.

### Categories

- Observability
- Performance

### Used by

- `contract-logging-safety-contract`
- `contract-performance-budget-contract`
- `prompt-observability-and-logging-prompt`

## SPC-FF3BE787A8

### Control

Use Playwright or axe-style checks as evidence, not as a complete accessibility verdict.

### Categories

- Accessibility

### Used by

- `contract-accessibility-contract-plus`
- `contract-accessible-name-contract`
- `contract-keyboard-interaction-contract`
- `prompt-accessibility-remediation-prompt`
- `prompt-icon-only-control-review-prompt`
- `prompt-keyboard-journey-audit-prompt`
- `prompt-screen-reader-risk-review-prompt`
- `prompt-wcag-mapping-review-prompt`
- `skill-accessibility-inspection-skill`
- `skill-keyboard-testing-skill`
- `skill-wcag-mapping-skill`

## SPC-FF71E3BF7A

### Control

Check visual hierarchy, spacing rhythm, grouping, alignment, density, and scan path.

### Categories

- Design System
- Interaction
- Responsive UI
- UI/UX

### Used by

- `contract-design-system-contract`
- `contract-responsive-behaviour-contract`
- `contract-ui-visual-quality-contract`
- `prompt-design-system-consistency-prompt`
- `prompt-interaction-state-audit-prompt`
- `prompt-responsive-layout-audit-prompt`
- `prompt-ui-structure-audit-prompt`
- `prompt-visual-design-quality-gate-prompt`
- `skill-ui-screenshot-review-skill`
