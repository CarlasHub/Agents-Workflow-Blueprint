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


def remove_reference_sections(markdown: str) -> str:
    """Remove source-only dependency/reference sections from a composed module."""

    matches = list(SECTION_PATTERN.finditer(markdown))
    excluded = {"Dependencies", "Shared specialist controls"}
    ranges: list[tuple[int, int]] = []
    for index, match in enumerate(matches):
        if match.group(1).strip() not in excluded:
            continue
        end = matches[index + 1].start() if index + 1 < len(matches) else len(markdown)
        ranges.append((match.start(), end))
    for start, end in reversed(ranges):
        markdown = markdown[:start] + markdown[end:]
    return markdown.strip()


def _demote_headings(markdown: str, levels: int = 2) -> str:
    prefix = "#" * levels
    return re.sub(r"(?m)^(#{1,4})(?=\s)", lambda match: prefix + match.group(1), markdown)


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

    parts = [
        "# Composed Agent Workflow Asset",
        "",
        "> Deterministic composition: shared governance and specialist controls are included once.",
        "",
        "## Shared governance",
        "",
        _demote_headings(KERNEL_PATH.read_text(encoding="utf-8").strip()),
    ]
    if control_ids:
        parts.extend(["", "## Shared specialist controls", ""])
        for index, control_id in enumerate(control_ids, start=1):
            parts.append(f"{index}. **{control_id}:** {controls[control_id]}")

    parts.extend(["", "## Specialist modules"])
    for asset in selected:
        module = remove_reference_sections((ROOT / asset["path"]).read_text(encoding="utf-8"))
        parts.extend(["", _demote_headings(module)])
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
        if len(re.findall(r"(?m)^### Governance Kernel$", composition)) != 1:
            failures.append(f"{asset_id} composition must include the kernel exactly once")
        for control_id in manifest_refs:
            if composition.count(f"**{control_id}:**") != 1:
                failures.append(f"{asset_id} composition does not include {control_id} exactly once")
    return failures
