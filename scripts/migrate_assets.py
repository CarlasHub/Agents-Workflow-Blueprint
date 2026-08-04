#!/usr/bin/env python3

"""Normalize v2 template assets into composable v2.1 specialist modules."""

from __future__ import annotations

import argparse
from collections import Counter, defaultdict
import hashlib
import json
from pathlib import Path
import re
import sys

from asset_composer import LIBRARY, MANIFEST_PATH, REGISTRY_PATH, ROOT, referenced_controls, split_sections


ASSET_FOLDERS = ("prompts", "skills", "contracts")
TYPE_SECTION = {
    "prompt": "Task-specific instructions",
    "skill": "Procedure",
    "contract": "Hard gates",
}
TYPE_LABEL = {"prompt": "Prompt", "skill": "Skill", "contract": "Contract"}
GOVERNANCE_PROFILE = {
    "prompt": "GOV-PROFILE-PROMPT",
    "skill": "GOV-PROFILE-SKILL",
    "contract": "GOV-PROFILE-CONTRACT",
}
TYPE_SPECIFIC_SECTIONS = {
    "prompt": ("Specialist role", "Task-specific mission"),
    "skill": ("Specialist role", "Purpose"),
    "contract": ("Contract owner", "Acceptance objective"),
}
KERNEL_CONTROLS = {
    "Define required inputs, optional inputs, and missing-input handling before execution.",
    "Include a stop condition for uncertainty that would make continued work unsafe.",
    "Make the handoff useful to a different agent or human reviewer.",
    "Provide both rejection wording and limited-acceptance wording for partial evidence.",
    "Require reviewer-visible evidence for every acceptance clause that materially affects risk.",
    "Separate hard gates from advisory improvements so the contract is enforceable.",
}
KERNEL_CONTROL_PATTERNS = (
    re.compile(r"^Produce a repeatable procedure for .+ rather than a one-off answer\.$"),
    re.compile(r"^Convert .+ into acceptance clauses that can reject work unambiguously\.$"),
)
CONTROL_PREFIX = re.compile(
    r"^(?:The work is rejected unless the reviewer can verify this requirement:|Reject unless this is verified:)\s*"
)
LIST_PREFIX = re.compile(r"^(?:\d+\.|-)\s+")


def asset_paths() -> list[Path]:
    return [path for folder in ASSET_FOLDERS for path in sorted((LIBRARY / folder).glob("*.md"))]


def asset_type(path: Path) -> str:
    return path.parent.name.removesuffix("s")


def metadata_value(section: str, key: str) -> str:
    match = re.search(rf"(?m)^- {re.escape(key)}:\s*(.+)$", section)
    if not match:
        raise ValueError(f"metadata is missing {key}")
    return match.group(1).strip()


def canonical_control(line: str) -> str:
    control = LIST_PREFIX.sub("", line.strip())
    control = CONTROL_PREFIX.sub("", control)
    return " ".join(control.split())


def section_controls(section: str) -> list[str]:
    controls: list[str] = []
    for line in section.splitlines():
        if not re.match(r"^(?:\d+\.|-)\s+", line.strip()):
            continue
        control = canonical_control(line)
        if control:
            controls.append(control)
    return controls


def specialist_control_id(control: str) -> str:
    digest = hashlib.sha256(control.casefold().encode("utf-8")).hexdigest()[:10].upper()
    return f"SPC-{digest}"


def is_kernel_control(control: str) -> bool:
    return control in KERNEL_CONTROLS or any(pattern.fullmatch(control) for pattern in KERNEL_CONTROL_PATTERNS)


def boundary_text(when_to_use: str) -> str:
    compact = " ".join(when_to_use.split()).rstrip(".")
    for prefix in ("use when ", "use for ", "use before ", "use after ", "use at ", "use as "):
        if compact.casefold().startswith(prefix):
            compact = compact[len(prefix):]
            break
    return compact if compact else "The specialist mission applies"


def build_model() -> tuple[list[dict], dict[str, dict], dict[str, str]]:
    manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    by_path = {asset["path"]: asset for asset in manifest}
    documents: dict[str, dict] = {}
    frequencies: Counter[str] = Counter()
    usages: dict[str, list[str]] = defaultdict(list)
    categories: dict[str, set[str]] = defaultdict(set)

    for path in asset_paths():
        rel = str(path.relative_to(ROOT))
        title, sections = split_sections(path.read_text(encoding="utf-8"))
        kind = asset_type(path)
        if metadata_value(sections.get("Metadata", ""), "Version") == "2.1.0":
            raise ValueError("v2.1 assets are already normalized; use --check")
        controls = section_controls(sections.get(TYPE_SECTION[kind], ""))
        asset = by_path.get(rel)
        if not asset:
            raise ValueError(f"manifest entry missing for {rel}")
        documents[rel] = {
            "asset": asset,
            "kind": kind,
            "title": title,
            "sections": sections,
            "controls": controls,
        }
        for control in controls:
            frequencies[control] += 1
            usages[control].append(asset["id"])
            categories[control].add(asset["category"])

    shared = {
        control: specialist_control_id(control)
        for control, frequency in frequencies.items()
        if frequency > 1 and not is_kernel_control(control)
    }
    registry = {
        control_id: {
            "control": control,
            "categories": sorted(categories[control]),
            "assets": sorted(set(usages[control])),
        }
        for control, control_id in shared.items()
    }
    return manifest, documents, registry


def control_references(control_ids: list[str]) -> str:
    if not control_ids:
        return "- None. All specialist controls in this module are unique."
    return "Controls: " + ", ".join(f"`{control_id}`" for control_id in control_ids)


def numbered_controls(kind: str, controls: list[str]) -> str:
    if not controls:
        return "1. Apply the specialist controls referenced above to the stated mission."
    if kind == "contract":
        return "\n".join(f"{index}. Reject unless this is verified: {control}" for index, control in enumerate(controls, 1))
    return "\n".join(f"{index}. {control}" for index, control in enumerate(controls, 1))


def common_header(document: dict, shared_ids: list[str]) -> str:
    asset = document["asset"]
    title = document["title"]
    kind = document["kind"]
    when_to_use = document["sections"]["When to use"]
    profile = GOVERNANCE_PROFILE[kind]
    return f"""# {title}

## Metadata

- Type: {TYPE_LABEL[kind]}
- Category: {asset['category']}
- Version: 2.1.0
- Governance profile: `{profile}`

## When to use

{when_to_use}

## When not to use

Do not use outside this boundary: {boundary_text(when_to_use)}. Choose a narrower asset when one matches the task more precisely.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `{profile}`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

{control_references(shared_ids)}
"""


def migrate_prompt(document: dict, shared_ids: list[str], unique: list[str]) -> str:
    sections = document["sections"]
    return common_header(document, shared_ids) + f"""

## Specialist role

{sections['Specialist role']}

## Task-specific mission

{sections['Task-specific mission']}

## Task-specific instructions

{numbered_controls('prompt', unique)}

## Required evidence

Apply `GOV-PROFILE-PROMPT` to every inline and referenced specialist control.

## Task-specific rejection conditions

Reject the result when any applicable specialist control lacks direct evidence or its relevant failure path was not exercised.

## Output format

Return the `GOV-HANDOFF-01` handoff with the specialist result and control IDs used.
"""


def migrate_skill(document: dict, shared_ids: list[str], unique: list[str]) -> str:
    sections = document["sections"]
    title = document["title"]
    return common_header(document, shared_ids) + f"""

## Specialist role

{sections['Specialist role']}

## Purpose

{sections['Purpose']}

## Preconditions

Apply `GOV-PROFILE-SKILL`; obtain the target, authority, and evidence needed for the {title} procedure.

## Procedure

{numbered_controls('skill', unique)}

## Evidence to collect

Collect direct evidence for every applicable shared and inline specialist control, separated using `GOV-EVIDENCE-01`.

## Failure handling

Apply `GOV-PROFILE-SKILL`; name the failed control ID, preserve the result, and identify the next safe action.

## Deliverables

Deliver the {title} result, its reproducible procedure, evidence, limitations, and controlled status.

## Handoff format

Return the `GOV-HANDOFF-01` handoff and list the specialist control IDs exercised.
"""


def migrate_contract(document: dict, shared_ids: list[str], unique: list[str]) -> str:
    sections = document["sections"]
    return common_header(document, shared_ids) + f"""

## Contract owner

{sections['Contract owner']}

## Acceptance objective

{sections['Acceptance objective']}

## Hard gates

{numbered_controls('contract', unique)}

## Advisory checks

Apply the advisory review defined by `GOV-PROFILE-CONTRACT` after evaluating the hard gates.

## Evidence requirements

Map every applicable shared and inline specialist control to `GOV-TRACE-01` evidence.

## Traceability requirements

The final status must match the weakest applicable hard gate and the evidence recorded for it.

## Rejection language

Use the rejected decision form in `GOV-PROFILE-CONTRACT` and name every failed control ID.

## Limited-acceptance language

Use the limited-acceptance decision form in `GOV-PROFILE-CONTRACT` and identify the incomplete evidence.

## Acceptance language

Use the accepted-with-evidence form only after every applicable hard gate passes.
"""


MIGRATORS = {"prompt": migrate_prompt, "skill": migrate_skill, "contract": migrate_contract}


def migrated_documents(documents: dict[str, dict], registry: dict[str, dict]) -> dict[str, str]:
    by_control = {entry["control"]: control_id for control_id, entry in registry.items()}
    migrated: dict[str, str] = {}
    for rel, document in documents.items():
        shared_ids: list[str] = []
        unique: list[str] = []
        for control in document["controls"]:
            if is_kernel_control(control):
                continue
            if control in by_control:
                control_id = by_control[control]
                if control_id not in shared_ids:
                    shared_ids.append(control_id)
            elif control not in unique:
                unique.append(control)
        migrated[rel] = MIGRATORS[document["kind"]](document, shared_ids, unique).rstrip() + "\n"
        document["shared_ids"] = shared_ids
    return migrated


def registry_markdown(registry: dict[str, dict]) -> str:
    parts = [
        "# Specialist Control Registry",
        "",
        "Version: 1.0.0",
        "",
        "This registry is the authoritative source for specialist controls used by more than one asset. Assets reference stable IDs; deterministic composition includes each selected control once. Generic governance remains in `GOVERNANCE-KERNEL.md`.",
    ]
    for control_id, entry in sorted(registry.items()):
        parts.extend([
            "",
            f"## {control_id}",
            "",
            "### Control",
            "",
            entry["control"],
            "",
            "### Categories",
            "",
            *[f"- {category}" for category in entry["categories"]],
            "",
            "### Used by",
            "",
            *[f"- `{asset_id}`" for asset_id in entry["assets"]],
        ])
    return "\n".join(parts).rstrip() + "\n"


def update_manifest(manifest: list[dict], documents: dict[str, dict]) -> list[dict]:
    for asset in manifest:
        document = documents[asset["path"]]
        asset["version"] = "2.1.0"
        asset["governance_profile"] = GOVERNANCE_PROFILE[document["kind"]]
        asset["shared_controls"] = document["shared_ids"]
        asset["dependencies"] = [
            "docs/template-library/GOVERNANCE-KERNEL.md",
            "docs/template-library/SPECIALIST-CONTROLS.md",
            "AGENTS.md",
            "docs/engineering/workflow.md",
        ]
    return manifest


def check_existing() -> int:
    manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    failures: list[str] = []
    for asset in manifest:
        source = (ROOT / asset["path"]).read_text(encoding="utf-8")
        if "- Version: 2.1.0" not in source:
            failures.append(f"{asset['path']} is not v2.1.0")
        if asset.get("version") != "2.1.0":
            failures.append(f"{asset['id']} manifest version is not 2.1.0")
        if referenced_controls(source) != asset.get("shared_controls", []):
            failures.append(f"{asset['id']} source and manifest control references differ")
    for failure in failures:
        print(f"[FAIL] {failure}")
    if failures:
        return 1
    print("Migration check passed: all 100 assets are normalized v2.1 modules.")
    return 0


def replace_section(text: str, heading: str, body: str) -> str:
    pattern = re.compile(rf"(?ms)^## {re.escape(heading)}\n.*?(?=^## |\Z)")
    replacement = f"## {heading}\n\n{body.rstrip()}\n\n"
    updated, count = pattern.subn(replacement, text, count=1)
    if count != 1:
        raise ValueError(f"missing section: {heading}")
    return updated.rstrip() + "\n"


def compact_existing_references() -> int:
    manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    for asset in manifest:
        path = ROOT / asset["path"]
        profile = asset["governance_profile"]
        dependencies = "\n".join([
            f"- [`Kernel`](../GOVERNANCE-KERNEL.md): `{profile}`",
            "- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls",
            "- Repository instructions and task evidence",
        ])
        source = replace_section(path.read_text(encoding="utf-8"), "Dependencies", dependencies)
        source = replace_section(source, "Shared specialist controls", control_references(asset["shared_controls"]))
        _, sections = split_sections(source)
        when_to_use = sections["When to use"]
        when_not = (
            f"Do not use outside this boundary: {boundary_text(when_to_use)}. "
            "Choose a narrower asset when one matches the task more precisely."
        )
        source = replace_section(source, "When not to use", when_not)
        path.write_text(source, encoding="utf-8")
    print("Compacted dependency and specialist-control references in all 100 assets.")
    return 0


def remove_pattern_boilerplate() -> int:
    manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    removed = 0
    for asset in manifest:
        path = ROOT / asset["path"]
        source = path.read_text(encoding="utf-8")
        section = TYPE_SECTION[asset["type"]]
        _, sections = split_sections(source)
        controls = section_controls(sections[section])
        retained = [control for control in controls if not any(pattern.fullmatch(control) for pattern in KERNEL_CONTROL_PATTERNS)]
        removed += len(controls) - len(retained)
        if len(retained) == len(controls):
            continue
        if retained:
            body = numbered_controls(asset["type"], retained)
        else:
            raise ValueError(
                f"{asset['id']} would have no asset-specific {section.lower()}; "
                "author at least three specialist items before removing shared boilerplate"
            )
        source = replace_section(source, section, body)
        path.write_text(source, encoding="utf-8")
    print(f"Removed {removed} patterned generic controls from all skill and contract modules.")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--write", action="store_true", help="Write all normalized assets, registry, and manifest")
    parser.add_argument("--preview", action="append", default=[], help="Preview an asset ID without writing")
    parser.add_argument("--check", action="store_true", help="Check an already-migrated library")
    parser.add_argument("--compact-references", action="store_true", help="Compact references in migrated v2.1 assets")
    parser.add_argument("--remove-pattern-boilerplate", action="store_true", help="Remove type-generic patterned controls")
    args = parser.parse_args()

    if args.check:
        return check_existing()
    if args.compact_references:
        return compact_existing_references()
    if args.remove_pattern_boilerplate:
        return remove_pattern_boilerplate()
    try:
        manifest, documents, registry = build_model()
        migrated = migrated_documents(documents, registry)
        updated_manifest = update_manifest(manifest, documents)
    except (KeyError, OSError, ValueError, json.JSONDecodeError) as error:
        print(f"[FAIL] {error}", file=sys.stderr)
        return 1

    if args.preview:
        by_id = {document["asset"]["id"]: rel for rel, document in documents.items()}
        for asset_id in args.preview:
            if asset_id not in by_id:
                print(f"[FAIL] unknown preview asset: {asset_id}", file=sys.stderr)
                return 1
            print(f"<!-- PREVIEW {asset_id} -->")
            print(migrated[by_id[asset_id]])

    print(
        f"Prepared 100 assets with {len(registry)} shared specialist controls; "
        f"removed {len(KERNEL_CONTROLS)} type-generic controls from source modules."
    )
    if args.write:
        for rel, content in migrated.items():
            (ROOT / rel).write_text(content, encoding="utf-8")
        REGISTRY_PATH.write_text(registry_markdown(registry), encoding="utf-8")
        MANIFEST_PATH.write_text(json.dumps(updated_manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        print("Wrote all 100 assets, SPECIALIST-CONTROLS.md, and assets.json.")
    elif not args.preview:
        print("Dry run only; pass --write after reviewing representative previews.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
