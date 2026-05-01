# Template Library

This is the product layer of the Agent Workflow Blueprint: 100 copy-ready assets for controlling coding-agent work with evidence, specialist review, and honest final status.

## What is included

- **40 scenario-specific prompts** for execution, review, UI, accessibility, testing, security, documentation, and release control.
- **30 executable skills** for repeatable agent workflows.
- **30 enforceable contracts** for acceptance, rejection, and evidence gates.

Every asset contains at least 20 numbered enforcement points and uses the same final status vocabulary: **verified, partially verified, not verified, blocked**.

## Use the system this way

1. Choose the smallest prompt that matches the task.
2. Attach the matching skill when the work needs a repeatable procedure.
3. Attach the matching contract when the result needs acceptance or rejection language.
4. Run repository verification from `requirements.toml` where applicable.
5. Do not claim more than the evidence proves.

## Fast paths

- Start with [`START-HERE.md`](START-HERE.md) for the shortest route through the library.
- Use [`STARTER-PACKS.md`](STARTER-PACKS.md) for bundled prompt + skill + contract combinations.
- Use [`QUALITY-RUBRIC.md`](QUALITY-RUBRIC.md) to evaluate agent output.
- Use [`RESEARCH-BASIS.md`](RESEARCH-BASIS.md) to understand the standards and behavioural controls behind the library.
- Use [`CODEX-USAGE-GUIDE.md`](CODEX-USAGE-GUIDE.md) to apply the assets in Codex.
- Use [`EXAMPLES.md`](EXAMPLES.md) to see weak output rejected and stronger output accepted with limits.

## Human-readable catalogue

Open [`CATALOGUE.md`](CATALOGUE.md) for all 100 assets grouped by type and category.

## Machine-readable catalogue

Open [`assets.json`](assets.json) for site integration and automation.

## Usage rule

Do not paste these assets blindly. Select the smallest asset that matches the failure mode, then combine it with `AGENTS.md`, `docs/engineering/workflow.md`, and the relevant engineering contract.
