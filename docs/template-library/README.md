# Template Library

This is the product layer of the Agent Workflow Blueprint: 100 specialist source modules and deterministic, copy-ready compositions for controlling coding-agent work with evidence, specialist review, and honest final status.

## What is included

- **40 v3 scenario-specific prompts** for execution, review, UI, accessibility, testing, security, documentation, and release control.
- **30 executable skills** for repeatable agent workflows.
- **30 enforceable contracts** for acceptance, rejection, and evidence gates.

Every asset references the concise shared [`GOVERNANCE-KERNEL.md`](GOVERNANCE-KERNEL.md) and the normalized [`SPECIALIST-CONTROLS.md`](SPECIALIST-CONTROLS.md) registry. Reused controls exist once and are included once during composition. Every prompt also includes concrete inputs, five to ten domain instructions, decision gates, evidence, recovery paths, rejection conditions, an output record, and a worked example. Skills and contracts retain their executable procedures and hard gates. The controlled final statuses remain **verified, partially verified, not verified, blocked**.

## Use the system this way

1. Open an asset's single dialog, review the introduction and references, then copy the standalone code with its compact copy control; or compose selected asset IDs with `python3 -S scripts/compose_assets.py --asset <id>`.
2. Choose the smallest prompt that matches the task.
3. Attach the matching skill when the work needs a repeatable procedure.
4. Attach the matching contract when the result needs acceptance or rejection language.
5. Run repository verification from `requirements.toml` where applicable.
6. Do not claim more than the evidence proves.

## Fast paths

- Start with [`START-HERE.md`](START-HERE.md) for the shortest route through the library.
- Use [`STARTER-PACKS.md`](STARTER-PACKS.md) for bundled prompt + skill + contract combinations.
- Use [`QUALITY-RUBRIC.md`](QUALITY-RUBRIC.md) to evaluate agent output.
- Use [`HUMAN-AI-QUALITY-STANDARD.md`](HUMAN-AI-QUALITY-STANDARD.md) to check sociotechnical, human-AI, trust-calibration, and ML-evaluation quality.
- Use [`RESEARCH-BASIS.md`](RESEARCH-BASIS.md) to understand the standards and behavioural controls behind the library.
- Use [`CODEX-USAGE-GUIDE.md`](CODEX-USAGE-GUIDE.md) to apply the assets in Codex.
- Use [`EXAMPLES.md`](EXAMPLES.md) to see weak output rejected and stronger output accepted with limits.

## Human-readable catalogue

Open [`CATALOGUE.md`](CATALOGUE.md) for all 100 assets grouped by type and category.

## Source modules and copy-ready assets

The Markdown files under `prompts/`, `skills/`, and `contracts/` are authoring modules. They contain specialist work directly and reference only genuinely shared controls. Do not provide a source module alone unless the recipient already has its kernel and registry dependencies. The website presents one dialog with a concise introduction, the complete composed prompt/skill/contract as literal Markdown code, one compact copy control beside that code, and linked references. `scripts/compose_assets.py` produces the same copied output.

## Machine-readable catalogue

Open [`assets.json`](assets.json) for site integration, version and risk metadata, required inputs, expected outputs, governance profiles, evaluation-case mappings, ordered specialist-control references, and automation.

## Usage rule

Do not paste these assets blindly. Select the smallest asset that matches the failure mode, then combine it with `AGENTS.md`, `docs/engineering/workflow.md`, and the relevant engineering contract.

## Research-informed control layer

This library includes a source-mapped control layer:

- [`RESEARCH-DNA.md`](RESEARCH-DNA.md) — maps CoT, Tree-of-Thoughts, ReAct, Least-to-Most, Self-Consistency, Reflexion, System 2 forcing, and traceability into product behaviour.
- [`PROMPT-PATTERN-MATRIX.md`](PROMPT-PATTERN-MATRIX.md) — shows which research pattern to use for each task type.
- [`SCIENTIFIC-CONTROL-CHECKLIST.md`](SCIENTIFIC-CONTROL-CHECKLIST.md) — a pre-merge checklist for evidence-backed agent work.
- [`HUMAN-AI-QUALITY-STANDARD.md`](HUMAN-AI-QUALITY-STANDARD.md) — a source-mapped quality bar for prompts, skills, contracts, rules, generated projects, and agent outputs.

The product does not rely on prompt length alone. It relies on observable controls: decomposition, branch comparison, environment observation, independent verification, correction loops, traceable acceptance, and failure disclosure.

## Research-informed architecture layer

These documents map published techniques to inspectable repository controls without claiming that the repository independently validates those techniques:

- `SCIENTIFIC-DNA.md` — maps CoT-safe public reasoning, Tree-of-Thoughts-style branching, ReAct loops, least-to-most decomposition, self-consistency, self-refinement, process supervision, constitutional/contract critique, and traceability to repository behaviour.
- `PROMPT-ARCHITECTURE.md` — defines the v3 source contract, composition order, common handoff, and evidence architecture.
- `TRACEABILITY-MATRIX.md` — provides the requirement-to-evidence matrix used by contracts and release gates.
- `SYSTEM-2-PROMPTING-GUIDE.md` — explains how to use “System 2” as a deliberate-work metaphor without overclaiming human-like cognition.

The key rule is: ask agents for a public decision record and evidence trail, not hidden chain-of-thought.
