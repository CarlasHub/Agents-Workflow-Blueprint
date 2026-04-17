# Sample Release Evidence

## Change summary

Tightened the repository workflow starter so prompts, templates, config, and verification scripts all reference real artifacts.

## Commands run

- `python3 scripts/check_prompts.py`
- `python3 scripts/check_workflow.py`
- `python3 scripts/check_examples.py`
- `python3 scripts/build_starter.py`
- `bash scripts/verify-release.sh`

## Command results

- prompt checks passed
- workflow checks passed
- example checks passed
- starter manifest written to `dist/starter-manifest.json`
- release verification completed against starter assets

## Built artifact

- `dist/starter-manifest.json`

## Docs changed

- workflow doc
- prompt files
- release-honesty teaching material

## Examples or screenshots changed

- example review packets updated
- no product screenshots shipped because this starter does not include a runnable UI

## Known limitations disclosed

- repository verification checks starter assets, not a production dashboard implementation

## Unsupported claims removed or avoided

- no claim of real product build verification
- no claim of existing `.codex` assets until they were added

## Final go / no-go recommendation

GO for publishing the starter workflow bundle.
NO-GO for claiming application-level behaviour until a real app is added and tested.
