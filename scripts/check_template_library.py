#!/usr/bin/env python3

"""Validate normalized template assets, metadata, controls, and composition."""

from __future__ import annotations

import json
from pathlib import Path
import re
import sys

from asset_composer import (
    CONTROL_ID_PATTERN,
    REGISTRY_PATH,
    parse_registry,
    referenced_controls,
    validate_all_compositions,
)
from asset_metrics import measure_assets


ROOT = Path(__file__).resolve().parents[1]
LIBRARY = ROOT / "docs" / "template-library"
EXPECTED_COUNTS = {"prompts": 40, "skills": 30, "contracts": 30}
KERNEL_PATH = "docs/template-library/GOVERNANCE-KERNEL.md"
REGISTRY_REL_PATH = "docs/template-library/SPECIALIST-CONTROLS.md"
REQUIRED_LIBRARY_DOCS = (
    "README.md",
    "CATALOGUE.md",
    "assets.json",
    "asset.schema.json",
    "GOVERNANCE-KERNEL.md",
    "SPECIALIST-CONTROLS.md",
    "MIGRATION-NOTES.md",
    "START-HERE.md",
    "STARTER-PACKS.md",
    "RESEARCH-BASIS.md",
    "QUALITY-RUBRIC.md",
    "CODEX-USAGE-GUIDE.md",
    "EXAMPLES.md",
    "SYSTEM-2-PROMPTING-GUIDE.md",
    "TRACEABILITY-MATRIX.md",
    "PROMPT-ARCHITECTURE.md",
    "SCIENTIFIC-DNA.md",
    "RESEARCH-DNA.md",
    "PROMPT-PATTERN-MATRIX.md",
    "SCIENTIFIC-CONTROL-CHECKLIST.md",
    "HUMAN-AI-QUALITY-STANDARD.md",
)
REQUIRED_MANIFEST_KEYS = {
    "id",
    "version",
    "type",
    "title",
    "purpose",
    "category",
    "profile",
    "governance_profile",
    "intended_model_context",
    "dependencies",
    "shared_controls",
    "evidence_expectations",
    "path",
    "summary",
    "tags",
    "pack",
    "research_patterns",
    "research_pattern_labels",
}
TYPE_SECTIONS = {
    "prompts": (
        "## Specialist role",
        "## Task-specific mission",
        "## Task-specific instructions",
        "## Required evidence",
        "## Task-specific rejection conditions",
        "## Output format",
    ),
    "skills": (
        "## Specialist role",
        "## Purpose",
        "## Preconditions",
        "## Procedure",
        "## Evidence to collect",
        "## Failure handling",
        "## Deliverables",
        "## Handoff format",
    ),
    "contracts": (
        "## Contract owner",
        "## Acceptance objective",
        "## Hard gates",
        "## Advisory checks",
        "## Evidence requirements",
        "## Traceability requirements",
        "## Rejection language",
        "## Limited-acceptance language",
        "## Acceptance language",
    ),
}
LEGACY_BOILERPLATE_HEADINGS = (
    "## Research pattern stack",
    "## Scientific control checkpoints",
    "## Scientific DNA",
    "### Research pattern map",
    "## Reasoning trace policy",
)
PATTERNED_BOILERPLATE = (
    re.compile(r"Produce a repeatable procedure for .+ rather than a one-off answer\."),
    re.compile(r"Convert .+ into acceptance clauses that can reject work unambiguously\."),
)
HOLLOW_SPECIALIST_BODIES = (
    "Follow the referenced specialist controls as the executable procedure.",
    "Treat every referenced specialist control as an enforceable hard gate.",
    "Apply the specialist controls referenced above to the stated mission.",
)


def load_manifest(path: Path) -> list[dict]:
    data = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(data, list):
        raise ValueError("assets.json root must be an array")
    return data


def specialist_body_failures(rel: str, section_name: str, body: str) -> list[str]:
    failures: list[str] = []
    numbered_count = len(re.findall(r"(?m)^\d+\.\s+", body))
    if numbered_count < 3:
        failures.append(
            f"{rel} has only {numbered_count} inline {section_name.lower()} items; expected at least 3"
        )
    for hollow in HOLLOW_SPECIALIST_BODIES:
        if hollow in body:
            failures.append(f"{rel} delegates its entire specialist body instead of defining asset-specific work")
    return failures


def valid_manifest_entry(asset: dict, index: int, registry: dict[str, str] | None = None) -> list[str]:
    failures: list[str] = []
    if registry is None:
        registry = parse_registry()
    missing = sorted(REQUIRED_MANIFEST_KEYS - set(asset))
    if missing:
        failures.append(f"assets.json entry {index} missing keys: {', '.join(missing)}")
        return failures

    if asset["type"] not in {"prompt", "skill", "contract"}:
        failures.append(f"assets.json entry {asset['id']} has invalid type: {asset['type']}")
        return failures
    if not re.fullmatch(r"(?:prompt|skill|contract)-[a-z0-9]+(?:-[a-z0-9]+)*", asset["id"]):
        failures.append(f"assets.json entry has invalid id: {asset['id']}")
    if asset["version"] != "2.1.0":
        failures.append(f"assets.json entry {asset['id']} expected version 2.1.0")
    expected_folder = f"{asset['type']}s"
    if not asset["path"].startswith(f"docs/template-library/{expected_folder}/"):
        failures.append(f"assets.json entry {asset['id']} path does not match its type")
    for key, minimum in (("dependencies", 1), ("evidence_expectations", 2), ("tags", 2), ("research_patterns", 3)):
        value = asset[key]
        if not isinstance(value, list) or len(value) < minimum or len(value) != len(set(value)):
            failures.append(f"assets.json entry {asset['id']} has invalid {key}")
    if KERNEL_PATH not in asset["dependencies"]:
        failures.append(f"assets.json entry {asset['id']} does not depend on the governance kernel")
    if REGISTRY_REL_PATH not in asset["dependencies"]:
        failures.append(f"assets.json entry {asset['id']} does not depend on the specialist registry")
    expected_profile = {
        "prompt": "GOV-PROFILE-PROMPT",
        "skill": "GOV-PROFILE-SKILL",
        "contract": "GOV-PROFILE-CONTRACT",
    }[asset["type"]]
    if asset["governance_profile"] != expected_profile:
        failures.append(f"assets.json entry {asset['id']} has the wrong governance profile")
    shared_controls = asset["shared_controls"]
    if not isinstance(shared_controls, list) or len(shared_controls) != len(set(shared_controls)):
        failures.append(f"assets.json entry {asset['id']} has invalid shared_controls")
    else:
        for control_id in shared_controls:
            if not CONTROL_ID_PATTERN.fullmatch(control_id):
                failures.append(f"assets.json entry {asset['id']} has malformed control ID: {control_id}")
            elif control_id not in registry:
                failures.append(f"assets.json entry {asset['id']} references missing control: {control_id}")
    for dependency in asset["dependencies"]:
        if not (ROOT / dependency).exists():
            failures.append(f"assets.json entry {asset['id']} has missing dependency: {dependency}")
    if not (ROOT / asset["path"]).exists():
        failures.append(f"assets.json entry {asset['id']} points to a missing file: {asset['path']}")
    return failures


def registry_usage_index(source: str) -> dict[str, list[str]]:
    matches = list(re.finditer(r"(?m)^## (SPC-[A-F0-9]{10})\n", source))
    usage: dict[str, list[str]] = {}
    for index, match in enumerate(matches):
        end = matches[index + 1].start() if index + 1 < len(matches) else len(source)
        block = source[match.end():end]
        used_by = re.search(r"(?ms)^### Used by\n\n(.+?)(?=\n\n### |\Z)", block)
        usage[match.group(1)] = sorted(
            re.findall(r"`((?:prompt|skill|contract)-[a-z0-9-]+)`", used_by.group(1) if used_by else "")
        )
    return usage


def main() -> int:
    failures: list[str] = []
    for rel in REQUIRED_LIBRARY_DOCS:
        if not (LIBRARY / rel).exists():
            failures.append(f"missing template library support file: docs/template-library/{rel}")

    schema_properties: set[str] = set()
    try:
        schema = json.loads((LIBRARY / "asset.schema.json").read_text(encoding="utf-8"))
        if schema.get("additionalProperties") is not False:
            failures.append("asset.schema.json must reject undeclared properties")
        schema_properties = set(schema.get("properties", {}))
        if set(schema.get("required", [])) != REQUIRED_MANIFEST_KEYS:
            failures.append("asset.schema.json required keys do not match validator requirements")
    except (FileNotFoundError, json.JSONDecodeError) as error:
        failures.append(f"asset.schema.json is unavailable or invalid: {error}")

    try:
        registry = parse_registry()
    except (OSError, ValueError) as error:
        failures.append(f"specialist control registry is invalid: {error}")
        registry = {}
    try:
        assets = load_manifest(LIBRARY / "assets.json")
    except (FileNotFoundError, json.JSONDecodeError, ValueError) as error:
        failures.append(f"assets.json is unavailable or invalid: {error}")
        assets = []

    if len(assets) != sum(EXPECTED_COUNTS.values()):
        failures.append(f"assets.json expected 100 entries, found {len(assets)}")

    ids: set[str] = set()
    paths: set[str] = set()
    titles: set[str] = set()
    for index, asset in enumerate(assets):
        failures.extend(valid_manifest_entry(asset, index, registry))
        undeclared = sorted(set(asset) - schema_properties)
        if undeclared:
            failures.append(f"assets.json entry {asset.get('id', index)} has undeclared keys: {', '.join(undeclared)}")
        for key, seen in (("id", ids), ("path", paths), ("title", titles)):
            value = asset.get(key)
            if value in seen:
                failures.append(f"duplicate manifest {key}: {value}")
            seen.add(value)

    manifest_paths = {asset.get("path") for asset in assets}
    manifest_by_path = {asset.get("path"): asset for asset in assets}
    specialist_signatures: dict[tuple[str, str], str] = {}
    evidence_signatures: dict[tuple[str, str], str] = {}
    for folder, expected_count in EXPECTED_COUNTS.items():
        files = sorted((LIBRARY / folder).glob("*.md"))
        if len(files) != expected_count:
            failures.append(f"docs/template-library/{folder} expected {expected_count} files, found {len(files)}")
        for path in files:
            rel = str(path.relative_to(ROOT))
            content = path.read_text(encoding="utf-8")
            asset = manifest_by_path.get(rel, {})
            if rel not in manifest_paths:
                failures.append(f"asset file is absent from assets.json: {rel}")
            for heading in (
                "## Metadata",
                "## When to use",
                "## When not to use",
                "## Dependencies",
                "## Shared specialist controls",
            ) + TYPE_SECTIONS[folder]:
                if heading not in content:
                    failures.append(f"{rel} missing quality section: {heading}")
            if "GOVERNANCE-KERNEL.md" not in content:
                failures.append(f"{rel} does not reference the governance kernel")
            if "SPECIALIST-CONTROLS.md" not in content:
                failures.append(f"{rel} does not reference the specialist control registry")
            if "- Version: 2.1.0" not in content:
                failures.append(f"{rel} is not a v2.1.0 specialist module")
            profile = asset.get("governance_profile")
            if profile and profile not in content:
                failures.append(f"{rel} does not declare its governance profile")
            source_controls = referenced_controls(content)
            if source_controls != asset.get("shared_controls", []):
                failures.append(f"{rel} control references do not match assets.json order")
            for legacy in LEGACY_BOILERPLATE_HEADINGS:
                if legacy in content:
                    failures.append(f"{rel} retains legacy duplicated section: {legacy}")
            for pattern in PATTERNED_BOILERPLATE:
                if pattern.search(content):
                    failures.append(f"{rel} retains patterned generic control: {pattern.pattern}")
            specialist_section = {
                "prompts": "Task-specific instructions",
                "skills": "Procedure",
                "contracts": "Hard gates",
            }[folder]
            match = re.search(rf"(?ms)^## {re.escape(specialist_section)}\n(.*?)(?=^## |\Z)", content)
            specialist_body = match.group(1).strip() if match else ""
            numbered_count = len(re.findall(r"(?m)^\d+\.\s+", specialist_body))
            failures.extend(specialist_body_failures(rel, specialist_section, specialist_body))
            signature = " ".join(specialist_body.casefold().split())
            prior = specialist_signatures.get((folder, signature))
            if prior:
                failures.append(f"{rel} duplicates its complete {specialist_section.lower()} body from {prior}")
            elif signature:
                specialist_signatures[(folder, signature)] = rel
            evidence_section = {
                "prompts": "Required evidence",
                "skills": "Evidence to collect",
                "contracts": "Evidence requirements",
            }[folder]
            evidence_match = re.search(
                rf"(?ms)^## {re.escape(evidence_section)}\n(.*?)(?=^## |\Z)", content
            )
            evidence_body = evidence_match.group(1).strip() if evidence_match else ""
            evidence_signature = " ".join(evidence_body.casefold().split())
            prior_evidence = evidence_signatures.get((folder, evidence_signature))
            if prior_evidence:
                failures.append(f"{rel} duplicates its complete evidence section from {prior_evidence}")
            elif evidence_signature:
                evidence_signatures[(folder, evidence_signature)] = rel
            control_coverage = numbered_count + len(source_controls)
            if control_coverage < 8:
                failures.append(
                    f"{rel} has only {control_coverage} specialist controls "
                    f"({numbered_count} inline, {len(source_controls)} shared); expected at least 8"
                )

    metrics = measure_assets(ROOT)
    if metrics["duplicate_ratio_percent"] != 0:
        failures.append(
            f"unclassified duplicate block ratio is {metrics['duplicate_ratio_percent']}%; expected 0%"
        )
    if metrics["repeated_inline_specialist_controls"]:
        failures.append(
            f"found {metrics['repeated_inline_specialist_controls']} repeated inline specialist controls"
        )
    if metrics["near_duplicate_control_pairs"]:
        failures.append(
            f"found {metrics['near_duplicate_control_pairs']} near-duplicate control pairs at similarity "
            f">= {metrics['near_duplicate_similarity_threshold']}"
        )
    if metrics["orphaned_shared_controls"]:
        failures.append("orphaned specialist controls: " + ", ".join(metrics["orphaned_shared_controls"]))

    failures.extend(validate_all_compositions())

    registry_source = REGISTRY_PATH.read_text(encoding="utf-8") if REGISTRY_PATH.exists() else ""
    documented_usage = registry_usage_index(registry_source)
    actual_usage = {
        control_id: sorted(asset["id"] for asset in assets if control_id in asset.get("shared_controls", []))
        for control_id in registry
    }
    for control_id in registry:
        if documented_usage.get(control_id) != actual_usage[control_id]:
            failures.append(f"{control_id} Used by index does not match assets.json")
        if len(actual_usage[control_id]) < 2:
            failures.append(f"{control_id} is not shared and belongs inline in its only asset")

    for message in failures:
        print(f"[FAIL] {message}")
    if failures:
        return 1

    print(
        "Template library checks passed: 100 assets, unique IDs and paths, valid dependencies, "
        f"{metrics['shared_specialist_controls']} shared controls resolved, "
        f"unclassified duplicate ratio {metrics['duplicate_ratio_percent']}%."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
