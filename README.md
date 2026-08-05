# Agent Workflow Blueprint

Agent Workflow Blueprint is a static, browser-local collection of governance assets for making AI-assisted engineering work easier to scope, review, and verify. It is intended for engineering teams, technical leaders, and AI-governance reviewers who need evidence-oriented workflows—not a guarantee that an agent's output is correct.

The repository contains 40 specialist prompts, 30 repeatable skills, 30 acceptance contracts, a shared governance kernel, a normalized specialist-control registry, a searchable website, and a browser-local starter-project builder. It has no backend, authentication, paid API, or cloud-service dependency.

## Who it is for

- Engineering teams defining reviewable agent workflows.
- Reviewers who need explicit acceptance, rejection, and evidence criteria.
- Governance teams adapting source-mapped controls to local policy.
- Open-source adopters who want a static, inspectable starting point.

## Five-minute start

1. Read [`docs/template-library/START-HERE.md`](docs/template-library/START-HERE.md).
2. Choose one asset from each relevant family in the [`CATALOGUE.md`](docs/template-library/CATALOGUE.md).
3. On the website, open an asset to use one focused dialog containing its applicability guidance, agent-ready prompt/skill/contract body, and linked research and implementation references. Use the compact copy control beside the body; or compose selected IDs with `python3 -S scripts/compose_assets.py --asset <id>`.
4. Paste the copied body into the agent with the concrete task and repository context. The clipboard contains only executable specialist instructions, shared specialist requirements, and shared operating rules. Applicability, catalogue metadata, and references remain outside the copied body.
5. Require command output, file evidence, limitations, and one final status: `verified`, `partially verified`, `not verified`, or `blocked`.

Example:

```text
Compose these asset IDs:
- prompt-bug-root-cause-remediation-prompt
- skill-regression-test-design-skill
- contract-test-behaviour-contract

Fix the reproduced defect. Do not report success until the failure path and
regression checks have run. Return evidence, limitations, and a final status.
```

The complete worked example in [`examples/worked-example.md`](examples/worked-example.md) shows input, asset selection, scoped work, evidence, verification, limitations, and final status.

## How the parts fit together

| Part | Purpose |
| --- | --- |
| Governance kernel | Shared scope, evidence, uncertainty, escalation, and status rules. |
| Specialist-control registry | Authoritative `SPC-*` controls reused across multiple assets. |
| Prompt | A specialist mission and task-specific instructions. |
| Skill | A repeatable procedure and handoff format. |
| Contract | Hard gates, advisory checks, and acceptance or rejection language. |
| Starter pack | A curated combination for a common scenario. |

The asset manifest at [`docs/template-library/assets.json`](docs/template-library/assets.json) records each asset's stable ID, v3 version, risk level, purpose, category, governance profile, intended model context, required inputs, expected outputs, dependencies, specialist-control references, evidence expectations, research-pattern labels, and evaluation-case mappings. Every research label resolves through [`research-sources.json`](docs/template-library/research-sources.json) to a cited paper or standard and an explicit repository translation. Migration details are in [`MIGRATION-NOTES.md`](docs/template-library/MIGRATION-NOTES.md).

## v3 prompt quality contract

All 40 prompts now define a specific use boundary and named alternative, four or more required inputs, five to ten domain instructions, conditional decision gates, concrete evidence, failure-and-recovery pairs, rejection conditions, a domain output record, and a worked example. The validator enforces source and composed size bounds, specialist-content ratio, manifest alignment, evaluation coverage, and control resolution. These checks establish deterministic structural quality; they do not prove model effectiveness.

## Browser-local builder

Open [`build-project/index.html`](build-project/index.html) from the static site, complete the intake form, review the proposed files, and create a ZIP. Generation occurs entirely in the browser. The result is a starter scaffold; it is not a deployed or validated system.

The builder normalises project names, validates generated relative paths, prevents duplicate and traversal paths, distinguishes pending from explicitly approved work, and writes a generated manifest. The documented size limits are 1 MiB per generated file and 20 MiB for the uncompressed file set.

## What has been verified

- Repository structure, manifest metadata, asset dependencies, normalized controls, deterministic composition, licence files, local links, and generated-manifest reproducibility are checked by scripts.
- JavaScript unit tests cover text handling, manifest validation, project generation, safe paths, and ZIP integrity.
- Playwright tests cover homepage search, filters, modal keyboard behaviour, copy fallback, builder intake, file selection, assembly, success, and ZIP extraction.
- Automated axe checks cover eight representative homepage and builder states in Chromium, Firefox, and WebKit.
- The release commands and results for the current change are recorded in [`industry-readiness-report.md`](docs/engineering/industry-readiness-report.md).

These are repository-level results for the tested fixtures and environment. They do not guarantee correctness for a model, task, browser, assistive technology, or downstream project.

## What has not been verified

- No model-based comparative evaluation was executed because no usable model runtime and credential path was available to this repository process; the deterministic evaluation dry run validates fixtures only.
- No claim of WCAG conformance is made. Automated checks cannot replace manual assistive-technology, reflow, contrast, and usability review.
- The GitHub Pages deployment is smoke-tested during release: all 100 assets must load, the single-dialog introduction, prompt-code, references, and copy flow must work, and no horizontal overflow may occur at desktop or narrow widths. This is a deployment smoke test, not exhaustive browser or assistive-technology coverage.
- The repository does not establish production security, legal compliance, universal effectiveness, or fitness for a specific organisation.

## Verification

Use Node.js `22.18.0` and Python 3. Install the pinned JavaScript dependencies and browser matrix once:

```bash
npm ci
npx playwright install chromium firefox webkit
```

Run the same release gates used by CI:

```bash
npm run lint
npm run test
npm run test:compose
npm run test:zip
npm run test:links
npm run test:e2e
npm run test:a11y
bash scripts/verify-release.sh
```

Individual Python checks and local CI equivalents are documented in [`testing-strategy.md`](docs/engineering/testing-strategy.md). The full gate does not imply runtime quality outside the cases it executes.

## Evaluation status

[`evals/`](evals) contains 40 fictional cases covering every prompt and five conditions: minimal, kernel only, frozen v2.1 prompt, v3 prompt, and v3 prompt-plus-skill-plus-contract workflow. `python3 -S scripts/run_evals.py --dry-run --check` validates coverage, composition, frozen baselines, and prompt sizes without calling a model. [`scripts/score_evals.py`](scripts/score_evals.py) validates and scores externally recorded outputs only after complete disclosure and two independent reviews per case and condition. Behavioural metrics remain blocked until such a run exists. See [`evaluation-methodology.md`](docs/engineering/evaluation-methodology.md).

## Documentation

- [Rendered documentation index](docs/index.html)
- [Engineering workflow](docs/engineering/workflow.md)
- [Testing strategy](docs/engineering/testing-strategy.md)
- [Accessibility testing](docs/engineering/accessibility-testing.md)
- [Release process](docs/engineering/release-process.md)
- [Research basis](docs/template-library/RESEARCH-BASIS.md)

## Limitations

The assets are prompts and review controls, not policy enforcement. Model behaviour varies. A small local evaluation cannot support broad effectiveness claims. Generated projects require independent engineering, security, accessibility, legal, privacy, and operational review appropriate to their context.

## Licensing

This repository uses split licensing:

- Code, scripts, HTML, CSS, JavaScript, schemas, tests, and automation are licensed under the [MIT License](LICENSE-CODE).
- Documentation, prompts, skills, contracts, templates, and other written content are licensed under [CC BY 4.0](LICENSE-CONTENT).

[`LICENSE`](LICENSE) defines the path mapping. [`NOTICE`](NOTICE) gives attribution guidance, and [`THIRD-PARTY-NOTICES.md`](THIRD-PARTY-NOTICES.md) records bundled dependencies. This description is not legal advice.

## Contributing and security

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for asset and test requirements, [`SECURITY.md`](SECURITY.md) for private vulnerability reporting guidance, [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md), and [`CHANGELOG.md`](CHANGELOG.md).
