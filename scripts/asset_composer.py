#!/usr/bin/env python3

"""Shared parsing and deterministic composition for template-library assets."""

from __future__ import annotations

from collections.abc import Iterable
import json
from pathlib import Path
import re


ROOT = Path(__file__).resolve().parents[1]
LIBRARY = ROOT / "docs" / "template-library"
MANIFEST_PATH = LIBRARY / "assets.json"
KERNEL_PATH = LIBRARY / "GOVERNANCE-KERNEL.md"
REGISTRY_PATH = LIBRARY / "SPECIALIST-CONTROLS.md"
REPOSITORY_BLOB_URL = "https://github.com/CarlasHub/Agents-Workflow-Blueprint/blob/main"
GOVERNANCE_KERNEL_URL = f"{REPOSITORY_BLOB_URL}/docs/template-library/GOVERNANCE-KERNEL.md"
SPECIALIST_CONTROL_REGISTRY_URL = f"{REPOSITORY_BLOB_URL}/docs/template-library/SPECIALIST-CONTROLS.md"

CONTROL_ID_PATTERN = re.compile(r"^SPC-[A-F0-9]{10}$")
REFERENCE_PATTERN = re.compile(r"\bSPC-[A-F0-9]{10}\b")
REGISTRY_HEADING_PATTERN = re.compile(r"(?m)^## (SPC-[A-F0-9]{10})\n")
SECTION_PATTERN = re.compile(r"(?m)^## ([^\n]+)\n")


class CompositionError(ValueError):
    """Raised when an asset composition cannot be resolved safely."""


def load_manifest(path: Path = MANIFEST_PATH) -> list[dict]:
    data = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(data, list):
        raise CompositionError("assets.json root must be an array")
    return data


def split_sections(text: str) -> tuple[str, dict[str, str]]:
    lines = text.splitlines()
    title = lines[0].removeprefix("# ").strip() if lines else ""
    matches = list(SECTION_PATTERN.finditer(text))
    sections: dict[str, str] = {}
    for index, match in enumerate(matches):
        end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
        sections[match.group(1).strip()] = text[match.end():end].strip()
    return title, sections


def parse_registry(text: str | None = None) -> dict[str, str]:
    source = REGISTRY_PATH.read_text(encoding="utf-8") if text is None else text
    matches = list(REGISTRY_HEADING_PATTERN.finditer(source))
    controls: dict[str, str] = {}
    for index, match in enumerate(matches):
        control_id = match.group(1)
        end = matches[index + 1].start() if index + 1 < len(matches) else len(source)
        block = source[match.end():end].strip()
        control_match = re.search(r"(?ms)^### Control\n\n(.+?)(?=\n\n### |\Z)", block)
        if not control_match:
            raise CompositionError(f"{control_id} is missing its Control section")
        control = " ".join(control_match.group(1).split())
        if control_id in controls:
            raise CompositionError(f"duplicate specialist control ID: {control_id}")
        controls[control_id] = control
    return controls


def referenced_controls(markdown: str) -> list[str]:
    _, sections = split_sections(markdown)
    return list(dict.fromkeys(REFERENCE_PATTERN.findall(sections.get("Shared specialist controls", ""))))


def _friendly_heading(heading: str) -> str:
    replacements = {
        "Specialist role": "Role",
        "Contract owner": "Role",
        "Task-specific mission": "Mission",
        "Task-specific instructions": "Instructions",
        "When to use": "Use this when",
        "When not to use": "Do not use this when",
        "Required inputs": "Inputs required",
        "Decision gates": "Decision gates",
        "Required evidence": "Evidence required",
        "Failure modes and recovery": "Failure modes and recovery",
        "Evidence to collect": "Evidence required",
        "Task-specific rejection conditions": "Rejection conditions",
        "Output format": "Response format",
    }
    return replacements.get(heading, heading)


def _friendly_asset_module(asset: dict, markdown: str, *, heading_level: int = 1) -> str:
    title, sections = split_sections(markdown)
    excluded = {"Metadata", "Dependencies", "Shared specialist controls"}
    parts = [f"{'#' * heading_level} {title or asset.get('title', 'Agent workflow asset')}"]
    for heading, body in sections.items():
        if heading in excluded:
            continue
        parts.extend(["", f"{'#' * (heading_level + 1)} {_friendly_heading(heading)}", "", body])
    return "\n".join(parts).strip()


def _governance_heading_label(heading: str) -> str:
    return re.sub(r"^`GOV-[^`]+`\s+—\s+", "", heading).strip()


def _governance_profile_body(profiles_markdown: str, profile: str) -> str:
    headings = list(re.finditer(r"(?m)^### `([^`]+)`\n", profiles_markdown))
    selected_index = next((index for index, heading in enumerate(headings) if heading.group(1) == profile), -1)
    if selected_index < 0:
        raise CompositionError(f"unknown governance profile: {profile}")
    selected = headings[selected_index]
    end = headings[selected_index + 1].start() if selected_index + 1 < len(headings) else len(profiles_markdown)
    return profiles_markdown[selected.end():end].strip()


def _governance_instructions(profiles: list[str]) -> str:
    _, sections = split_sections(KERNEL_PATH.read_text(encoding="utf-8"))
    profiles_markdown = sections.get("Asset execution profiles")
    if not profiles_markdown:
        raise CompositionError("governance kernel is missing asset execution profiles")
    common_sections = [
        (heading, body)
        for heading, body in sections.items()
        if heading not in {"Asset execution profiles", "Composition rule"}
    ]
    if not common_sections:
        raise CompositionError("governance kernel is missing shared operating rules")

    parts = ["## Shared operating rules"]
    for heading, body in common_sections:
        parts.extend(["", f"### {_governance_heading_label(heading)}", "", body])
    for profile in profiles:
        type_label = profile.removeprefix("GOV-PROFILE-").title()
        parts.extend(["", f"### {type_label} requirements", "", _governance_profile_body(profiles_markdown, profile)])
    return "\n".join(parts)


def _specialist_control_href(control_id: str) -> str:
    return f"{SPECIALIST_CONTROL_REGISTRY_URL}#{control_id.lower()}"


def _source_references(selected: list[dict], control_ids: list[str]) -> str:
    parts = ["## References", ""]
    for asset in selected:
        asset_type = str(asset.get("type", "asset")).lower()
        parts.append(f"- [Source {asset_type} module]({REPOSITORY_BLOB_URL}/{asset['path']})")
    parts.extend([
        f"- [Shared governance kernel]({GOVERNANCE_KERNEL_URL})",
        f"- [Specialist control registry]({SPECIALIST_CONTROL_REGISTRY_URL})",
    ])
    if control_ids:
        links = ", ".join(f"[{control_id}]({_specialist_control_href(control_id)})" for control_id in control_ids)
        parts.append(f"- Control definitions: {links}")
    return "\n".join(parts)


def compose_assets(
    asset_ids: Iterable[str],
    *,
    manifest: list[dict] | None = None,
    registry: dict[str, str] | None = None,
) -> str:
    selected_ids = list(asset_ids)
    if not selected_ids:
        raise CompositionError("select at least one asset ID")
    if len(selected_ids) != len(set(selected_ids)):
        raise CompositionError("duplicate asset IDs are not allowed")

    asset_manifest = load_manifest() if manifest is None else manifest
    controls = parse_registry() if registry is None else registry
    by_id = {asset["id"]: asset for asset in asset_manifest}
    missing_assets = [asset_id for asset_id in selected_ids if asset_id not in by_id]
    if missing_assets:
        raise CompositionError(f"unknown asset IDs: {', '.join(missing_assets)}")

    selected = [by_id[asset_id] for asset_id in selected_ids]
    control_ids: list[str] = []
    for asset in selected:
        for control_id in asset.get("shared_controls", []):
            if control_id not in control_ids:
                control_ids.append(control_id)
    missing_controls = [control_id for control_id in control_ids if control_id not in controls]
    if missing_controls:
        raise CompositionError(f"unresolved specialist controls: {', '.join(missing_controls)}")

    profiles = list(dict.fromkeys(asset["governance_profile"] for asset in selected))
    if len(selected) == 1:
        asset = selected[0]
        source = (ROOT / asset["path"]).read_text(encoding="utf-8")
        parts = [_friendly_asset_module(asset, source)]
    else:
        parts = [
            "# Agent Workflow Pack",
            "",
            "> Apply every selected module below to the user's task.",
        ]
        for asset in selected:
            source = (ROOT / asset["path"]).read_text(encoding="utf-8")
            parts.extend(["", _friendly_asset_module(asset, source, heading_level=2)])
    if control_ids:
        parts.extend(["", "## Shared specialist requirements", ""])
        for index, control_id in enumerate(control_ids, start=1):
            parts.append(f"{index}. {controls[control_id]}")

    parts.extend(["", _governance_instructions(profiles), "", _source_references(selected, control_ids)])
    return "\n".join(parts).rstrip() + "\n"


def validate_all_compositions() -> list[str]:
    failures: list[str] = []
    manifest = load_manifest()
    registry = parse_registry()
    seen_ids: set[str] = set()
    for asset in manifest:
        asset_id = asset.get("id", "")
        if asset_id in seen_ids:
            failures.append(f"duplicate asset ID: {asset_id}")
            continue
        seen_ids.add(asset_id)
        source = (ROOT / asset["path"]).read_text(encoding="utf-8")
        source_refs = referenced_controls(source)
        manifest_refs = asset.get("shared_controls", [])
        if source_refs != manifest_refs:
            failures.append(f"{asset_id} source control references do not match assets.json")
        missing = [control_id for control_id in manifest_refs if control_id not in registry]
        if missing:
            failures.append(f"{asset_id} has unresolved controls: {', '.join(missing)}")
            continue
        try:
            composition = compose_assets([asset_id], manifest=manifest, registry=registry)
        except (CompositionError, KeyError, OSError) as error:
            failures.append(f"{asset_id} composition failed: {error}")
            continue
        if composition.count("## Shared operating rules") != 1:
            failures.append(f"{asset_id} composition must include shared operating rules exactly once")
        for control_id in manifest_refs:
            if composition.count(f"[{control_id}](") != 1 or composition.count(registry[control_id]) != 1:
                failures.append(f"{asset_id} composition does not include {control_id} exactly once")
    return failures
