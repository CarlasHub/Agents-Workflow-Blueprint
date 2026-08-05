#!/usr/bin/env python3

"""Validate the source map and its single shared asset dependency."""

from pathlib import Path
import json
import sys

from asset_composer import CompositionError, load_research_sources


ROOT = Path(__file__).resolve().parents[1]
LIBRARY = ROOT / "docs" / "template-library"
REQUIRED_DOCS = (
    "SCIENTIFIC-DNA.md",
    "PROMPT-ARCHITECTURE.md",
    "TRACEABILITY-MATRIX.md",
    "SYSTEM-2-PROMPTING-GUIDE.md",
    "RESEARCH-BASIS.md",
    "HUMAN-AI-QUALITY-STANDARD.md",
    "GOVERNANCE-KERNEL.md",
    "research-sources.json",
)
REQUIRED_TERMS = ("CoT-safe", "Tree-of-Thoughts", "ReAct", "Least-to-most")
HUMAN_AI_TERMS = (
    "sociotechnical",
    "trust calibration",
    "Mental-model calibration",
    "Automation-bias resistance",
    "Human handoff",
    "untrusted-content",
)


def fail(message: str) -> None:
    print(f"[FAIL] {message}")


def main() -> int:
    failures: list[str] = []
    for name in REQUIRED_DOCS:
        path = LIBRARY / name
        if not path.exists():
            failures.append(f"missing research or governance document: {name}")

    research = (LIBRARY / "RESEARCH-BASIS.md").read_text(encoding="utf-8")
    for term in REQUIRED_TERMS:
        if term not in research:
            failures.append(f"RESEARCH-BASIS.md missing source-map term: {term}")

    standard = (LIBRARY / "HUMAN-AI-QUALITY-STANDARD.md").read_text(encoding="utf-8")
    for term in HUMAN_AI_TERMS:
        if term not in standard:
            failures.append(f"HUMAN-AI-QUALITY-STANDARD.md missing human-AI term: {term}")

    kernel = (LIBRARY / "GOVERNANCE-KERNEL.md").read_text(encoding="utf-8")
    for term in ("scope", "evidence", "uncertainty", "failure", "traceability", "specialist", "verified"):
        if term not in kernel.casefold():
            failures.append(f"GOVERNANCE-KERNEL.md missing control area: {term}")

    assets = json.loads((LIBRARY / "assets.json").read_text(encoding="utf-8"))
    try:
        research_sources = load_research_sources()
    except (CompositionError, OSError, json.JSONDecodeError) as error:
        failures.append(f"research source registry is invalid: {error}")
        research_sources = {}
    for asset in assets:
        if len(asset.get("research_patterns", [])) < 3:
            failures.append(f"manifest entry lacks research patterns: {asset.get('id', asset.get('title'))}")
        if "docs/template-library/GOVERNANCE-KERNEL.md" not in asset.get("dependencies", []):
            failures.append(f"manifest entry lacks kernel dependency: {asset.get('id', asset.get('title'))}")
        labels = asset.get("research_pattern_labels", [])
        if asset.get("type") == "prompt" and len(labels) < 3:
            failures.append(f"prompt lacks a curated research stack: {asset.get('id', asset.get('title'))}")
        for label in labels:
            if label not in research_sources:
                failures.append(
                    f"manifest entry has unresolved research source {label}: "
                    f"{asset.get('id', asset.get('title'))}"
                )

    for folder in ("prompts", "skills", "contracts"):
        for path in (LIBRARY / folder).glob("*.md"):
            content = path.read_text(encoding="utf-8")
            if "GOVERNANCE-KERNEL.md" not in content:
                failures.append(f"{path.relative_to(ROOT)} does not reference the source-mapped kernel")

    for message in failures:
        fail(message)
    if failures:
        return 1
    print("Research basis checks passed through the shared governance kernel.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
