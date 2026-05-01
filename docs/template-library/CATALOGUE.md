# Template Library Catalogue

This catalogue contains 100 named assets: 40 prompts, 30 skills, and 30 contracts.

Every asset is scenario-specific, copy-ready, and written for evidence-first agent work, failure disclosure, verification, and reduced completion theatre.

## Prompts

### Core Control

- [Master Agent Enforcement Prompt](prompts/01-master-agent-enforcement-prompt.md) — Use at the start of a serious coding-agent session when the agent must obey repository rules, evidence discipline, and release-honesty constraints.
### Implementation

- [Evidence-First Implementation Prompt](prompts/02-evidence-first-implementation-prompt.md) — Use when a feature, bug fix, refactor, or documentation change must be implemented with proof before any success claim.
### Audit

- [Anti-Fake Completion Audit Prompt](prompts/03-anti-fake-completion-audit-prompt.md) — Use after an agent claims success and you need to test whether the claim is real, exaggerated, or unsupported.
### Reasoning Control

- [Assumption Exposure Prompt](prompts/04-assumption-exposure-prompt.md) — Use before implementation or review when hidden assumptions could change architecture, UX, security, or release judgement.
- [Uncertainty Calibration Prompt](prompts/05-uncertainty-calibration-prompt.md) — Use when an answer sounds confident but evidence quality varies across code, UI, tests, or documentation.
- [Contradiction Detection Prompt](prompts/06-contradiction-detection-prompt.md) — Use when docs, tests, UI, code, README, or release language may disagree.
### Risk

- [Premortem Failure Analysis Prompt](prompts/07-premortem-failure-analysis-prompt.md) — Use before merge, release, or large refactor to imagine failure and prevent avoidable blind spots.
### Scoping

- [Scope Boundary Lock Prompt](prompts/08-scope-boundary-lock-prompt.md) — Use when the task is at risk of scope creep, hidden dependencies, or accidental redesign.
### Implementation

- [Minimal Correct Change Prompt](prompts/09-minimal-correct-change-prompt.md) — Use when a requested fix must avoid broad rewrites, unrelated styling, or unnecessary dependency changes.
### Repository Analysis

- [Repository Reconnaissance Prompt](prompts/10-repository-reconnaissance-prompt.md) — Use at the beginning of work on an unfamiliar repository, template pack, or docs/product system.
### Implementation

- [Feature Implementation Prompt](prompts/11-feature-implementation-prompt.md) — Use for new feature work that needs design, code, tests, docs, and release evidence kept aligned.
### Bug Remediation

- [Bug Root Cause Remediation Prompt](prompts/12-bug-root-cause-remediation-prompt.md) — Use when a symptom is known but the actual cause, blast radius, and regression risk must be proven.
### Review

- [Regression Risk Review Prompt](prompts/13-regression-risk-review-prompt.md) — Use after any implementation that might break adjacent behaviour, shared contracts, or existing user paths.
### Code Quality

- [Code Quality Deep Audit Prompt](prompts/14-code-quality-deep-audit-prompt.md) — Use for maintainability, structure, dead-code, duplication, and readability review.
### Architecture

- [Architecture Drift Audit Prompt](prompts/15-architecture-drift-audit-prompt.md) — Use when a change may violate boundaries, patterns, ownership, or long-term design constraints.
### Clean-up

- [Dead Code Removal Prompt](prompts/16-dead-code-removal-prompt.md) — Use when removing unused files, branches, exports, styles, docs, tests, or generated artefacts.
### Refactor

- [Refactor Safety Prompt](prompts/17-refactor-safety-prompt.md) — Use when improving structure without intentionally changing behaviour.
### API

- [API Contract Review Prompt](prompts/18-api-contract-review-prompt.md) — Use when request/response shapes, public functions, schemas, integrations, or API docs may change.
### Data Flow

- [Data Flow Trace Prompt](prompts/19-data-flow-trace-prompt.md) — Use when data origin, transformation, persistence, display, export, or logging must be understood.
### State

- [State Management Audit Prompt](prompts/20-state-management-audit-prompt.md) — Use for frontend or application state that may become stale, inconsistent, duplicated, or race-prone.
### UI/UX

- [UI Structure Audit Prompt](prompts/21-ui-structure-audit-prompt.md) — Use when a UI must be inspected for hierarchy, grouping, spacing, layout, and real rendered structure.
- [Visual Design Quality Gate Prompt](prompts/22-visual-design-quality-gate-prompt.md) — Use before accepting a UI that must look polished, readable, aligned, and professionally finished.
### Design System

- [Design System Consistency Prompt](prompts/23-design-system-consistency-prompt.md) — Use when components, tokens, typography, icons, spacing, and interaction states must remain consistent.
### Responsive UI

- [Responsive Layout Audit Prompt](prompts/24-responsive-layout-audit-prompt.md) — Use when layouts must survive mobile, tablet, desktop, long content, and constrained viewport states.
### Interaction

- [Interaction State Audit Prompt](prompts/25-interaction-state-audit-prompt.md) — Use for buttons, forms, menus, tables, cards, dialogs, navigation, and other interactive UI states.
### Accessibility

- [Keyboard Journey Audit Prompt](prompts/26-keyboard-journey-audit-prompt.md) — Use when interactive surfaces must be navigable without a mouse and must avoid keyboard traps.
- [Accessibility Remediation Prompt](prompts/27-accessibility-remediation-prompt.md) — Use when a specific accessibility issue must be fixed without fake pass language or harmful ARIA patches.
- [Screen Reader Risk Review Prompt](prompts/28-screen-reader-risk-review-prompt.md) — Use when dynamic UI, forms, icon controls, modals, route changes, or live regions may confuse assistive technology users.
- [WCAG Mapping Review Prompt](prompts/29-wcag-mapping-review-prompt.md) — Use when findings need a careful mapping to WCAG 2.2 success criteria and severity without overstating certainty.
- [Icon-Only Control Review Prompt](prompts/30-icon-only-control-review-prompt.md) — Use when icon buttons, compact actions, menus, or toolbar controls may lack clear names or affordances.
### Testing

- [Playwright Test Design Prompt](prompts/31-playwright-test-design-prompt.md) — Use when designing browser tests for real user behaviour, accessibility checks, and stable selectors.
- [Test Quality Audit Prompt](prompts/32-test-quality-audit-prompt.md) — Use when tests pass but may be shallow, flaky, over-mocked, or unrelated to real risk.
### Release

- [Release Evidence Prompt](prompts/33-release-evidence-prompt.md) — Use before final handoff, merge approval, release note creation, or claim publication.
### Documentation

- [Documentation Truthfulness Prompt](prompts/34-documentation-truthfulness-prompt.md) — Use when docs, guides, examples, or site copy may promise more than the implementation proves.
- [README Upgrade Prompt](prompts/35-readme-upgrade-prompt.md) — Use when a README needs to become a useful product entry point, not just a file list.
### Site/Product

- [GitHub Pages Template Hub Prompt](prompts/36-github-pages-template-hub-prompt.md) — Use when turning repository files into a public template hub with copy actions, categories, examples, and low-friction navigation.
### Security

- [Security Trust Boundary Prompt](prompts/37-security-trust-boundary-prompt.md) — Use when a change touches actors, permissions, data, integration, exports, admin features, or sensitive operations.
- [Secrets Handling Review Prompt](prompts/38-secrets-handling-review-prompt.md) — Use when environment variables, tokens, credentials, logs, CI, config, or integrations may expose secrets.
### Observability

- [Observability and Logging Prompt](prompts/39-observability-and-logging-prompt.md) — Use when work needs useful logs, metrics, traces, alerts, or operational evidence without privacy leakage.
### Release

- [Final Merge Gate Prompt](prompts/40-final-merge-gate-prompt.md) — Use as the final review prompt before merge or publication when all evidence must be consolidated.

## Skills

### Scoping

- [Scoping Packet Skill](skills/01-scoping-packet-skill.md) — Use when converting a task request into a bounded, reviewable scoping packet.
### Planning

- [Implementation Planning Skill](skills/02-implementation-planning-skill.md) — Use when the agent needs a safe implementation plan before editing.
### Repository Analysis

- [Repository Mapping Skill](skills/03-repository-mapping-skill.md) — Use when the repository structure, authority files, and scripts must be understood before change.
### Evidence

- [Evidence Collection Skill](skills/04-evidence-collection-skill.md) — Use when gathering proof for implementation, review, documentation, or release claims.
### Verification

- [Verification Reporting Skill](skills/05-verification-reporting-skill.md) — Use when command results, manual checks, and skipped checks must be reported cleanly.
### Honesty

- [Failure Disclosure Skill](skills/06-failure-disclosure-skill.md) — Use when the answer must disclose incomplete, unverified, risky, or weaker-than-requested work.
### UI/UX

- [UI Screenshot Review Skill](skills/07-ui-screenshot-review-skill.md) — Use when screenshots or rendered UI must be audited for defects and state mismatches.
### Accessibility

- [Accessibility Inspection Skill](skills/08-accessibility-inspection-skill.md) — Use when inspecting semantic structure, names, keyboard behaviour, and user impact.
- [WCAG Mapping Skill](skills/09-wcag-mapping-skill.md) — Use when translating accessibility findings into WCAG 2.2 references and remediation evidence.
- [Keyboard Testing Skill](skills/10-keyboard-testing-skill.md) — Use when interactive flows must be tested by keyboard.
### Testing

- [Playwright Debugging Skill](skills/11-playwright-debugging-skill.md) — Use when browser tests fail, flake, or need meaningful behaviour assertions.
- [Regression Test Design Skill](skills/12-regression-test-design-skill.md) — Use when a bug fix or feature needs tests that would catch future breakage.
### Review

- [Code Review Skill](skills/13-code-review-skill.md) — Use when reviewing a diff for correctness, maintainability, and evidence.
### Refactor

- [Refactor Planning Skill](skills/14-refactor-planning-skill.md) — Use when structural improvement is needed but behaviour must stay stable.
### Clean-up

- [Dead Code Detection Skill](skills/15-dead-code-detection-skill.md) — Use when deciding whether files, exports, branches, styles, or docs are unused.
### Architecture

- [Architecture Review Skill](skills/16-architecture-review-skill.md) — Use when reviewing boundaries, ownership, coupling, and long-term maintainability.
### API

- [API Contract Inspection Skill](skills/17-api-contract-inspection-skill.md) — Use when API shapes, schemas, callers, and docs must be reconciled.
### Security

- [Security Review Skill](skills/18-security-review-skill.md) — Use when reviewing trust boundaries, permissions, secrets, data handling, and abuse paths.
- [Secrets Review Skill](skills/19-secrets-review-skill.md) — Use when tokens, env vars, logs, config, or CI may expose secrets.
### Privacy

- [Data Privacy Review Skill](skills/20-data-privacy-review-skill.md) — Use when personal, tenant, customer, analytics, export, or audit data may be collected or exposed.
### Documentation

- [Documentation Audit Skill](skills/21-documentation-audit-skill.md) — Use when docs must be checked against implementation and repository reality.
### Release

- [Release Notes Review Skill](skills/22-release-notes-review-skill.md) — Use when release notes must represent verified behaviour and known limitations.
### Documentation

- [README Structuring Skill](skills/23-readme-structuring-skill.md) — Use when README needs a clearer user journey, catalogue, and verification instructions.
### Template Product

- [Template Catalogue Design Skill](skills/24-template-catalogue-design-skill.md) — Use when organising many templates into categories, starter packs, and discoverable metadata.
### Site/Product

- [GitHub Pages UX Skill](skills/25-github-pages-ux-skill.md) — Use when the public site must serve templates clearly on GitHub Pages.
### Prompt Writing

- [Copy-Ready Prompt Writing Skill](skills/26-copy-ready-prompt-writing-skill.md) — Use when prompts must be immediately usable by agents without vague placeholders.
### Agent Control

- [Agent Behaviour Hardening Skill](skills/27-agent-behaviour-hardening-skill.md) — Use when prompts or workflows need stronger controls against shortcuts and overclaiming.
### Evaluation

- [Prompt Evaluation Skill](skills/28-prompt-evaluation-skill.md) — Use when assessing whether prompts produce reliable, honest, and useful agent output.
### Risk

- [Risk Register Skill](skills/29-risk-register-skill.md) — Use when work requires a live list of risks, owners, mitigations, and verification gaps.
### Delivery

- [Final Delivery Packaging Skill](skills/30-final-delivery-packaging-skill.md) — Use when packaging an upgraded repository, template system, or release bundle.

## Contracts

### Honesty

- [Completion Honesty Contract](contracts/01-completion-honesty-contract.md) — Use as the top-level acceptance rule against fake completion.
### Evidence

- [Evidence Contract](contracts/02-evidence-contract.md) — Use when every claim must be traceable to inspected files, behaviour, commands, or manual evidence.
### Scope

- [Scope Control Contract](contracts/03-scope-control-contract.md) — Use to reject hidden scope expansion, accidental redesign, or unrelated changes.
### Reasoning Control

- [Assumption Contract](contracts/04-assumption-contract.md) — Use when assumptions must be named before they influence implementation or review.
### Verification

- [Verification Contract](contracts/05-verification-contract.md) — Use when commands, manual checks, and evidence gaps define acceptance.
### Testing

- [Test Behaviour Contract](contracts/06-test-behaviour-contract.md) — Use when tests must prove user or system behaviour rather than shallow implementation details.
### Accessibility

- [Accessibility Contract Plus](contracts/07-accessibility-contract-plus.md) — Use for UI work that must preserve semantic structure, keyboard access, and WCAG-aligned reasoning.
- [Keyboard Interaction Contract](contracts/08-keyboard-interaction-contract.md) — Use for menus, dialogs, forms, tables, navigation, and custom controls.
- [Accessible Name Contract](contracts/09-accessible-name-contract.md) — Use for icon controls, form controls, composite widgets, and dynamic UI.
### UI/UX

- [UI Visual Quality Contract](contracts/10-ui-visual-quality-contract.md) — Use before accepting visual UI changes.
### Design System

- [Design System Contract](contracts/11-design-system-contract.md) — Use when UI must follow reusable components, tokens, and interaction patterns.
### Responsive UI

- [Responsive Behaviour Contract](contracts/12-responsive-behaviour-contract.md) — Use when layout must remain usable across viewports and content lengths.
### Code Quality

- [Code Quality Contract](contracts/13-code-quality-contract.md) — Use for maintainability and structural acceptance.
### Architecture

- [Architecture Boundary Contract](contracts/14-architecture-boundary-contract.md) — Use when module, layer, dependency, or ownership boundaries matter.
### Refactor

- [Refactor Safety Contract](contracts/15-refactor-safety-contract.md) — Use for behaviour-preserving structural change.
### Clean-up

- [Dead Code Removal Contract](contracts/16-dead-code-removal-contract.md) — Use when removing apparently unused files, exports, branches, or docs.
### Documentation

- [Documentation Truth Contract](contracts/17-documentation-truth-contract.md) — Use when docs, examples, and guides must match real implementation.
- [README Claim Contract](contracts/18-readme-claim-contract.md) — Use for README updates, public pages, and repository positioning.
### Release

- [Release Evidence Contract Plus](contracts/19-release-evidence-contract-plus.md) — Use before merge, publication, release note approval, or public handoff.
### Security

- [Security Boundary Contract](contracts/20-security-boundary-contract.md) — Use when permissions, identities, integrations, data, or sensitive operations change.
- [Secrets Handling Contract](contracts/21-secrets-handling-contract.md) — Use for environment variables, credentials, CI, logs, tokens, and configuration.
### Privacy

- [Privacy and Data Contract](contracts/22-privacy-and-data-contract.md) — Use for personal, tenant, analytics, export, retention, or audit data.
### Observability

- [Logging Safety Contract](contracts/23-logging-safety-contract.md) — Use when adding or changing logs, metrics, traces, or alerts.
### Reliability

- [Error Handling Contract](contracts/24-error-handling-contract.md) — Use when adding, changing, or reviewing failures, retries, fallbacks, and messages.
### Performance

- [Performance Budget Contract](contracts/25-performance-budget-contract.md) — Use when claims or changes affect performance, rendering cost, API use, or bundle weight.
### Dependency

- [Dependency Addition Contract](contracts/26-dependency-addition-contract.md) — Use before adding packages, frameworks, tools, or external services.
### API

- [API Stability Contract](contracts/27-api-stability-contract.md) — Use when public API, schema, route, exported function, or integration behaviour may change.
### Delivery

- [Git Hygiene Contract](contracts/28-git-hygiene-contract.md) — Use when packaging branch changes, commits, generated files, or merge handoffs.
### Template Product

- [Template Library Quality Contract](contracts/29-template-library-quality-contract.md) — Use for this repository’s prompt, skill, and contract assets.
### Output

- [Agent Output Format Contract](contracts/30-agent-output-format-contract.md) — Use when agent handoffs must be structured, inspectable, and easy to review.
