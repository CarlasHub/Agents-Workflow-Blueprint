#!/usr/bin/env python3

from pathlib import Path
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
LIBRARY = ROOT / "docs" / "template-library"
EXPECTED_COUNTS = {"prompts": 40, "skills": 30, "contracts": 30}
MIN_NUMBERED_POINTS = 20
REQUIRED_COMMON = [
    "Research and psychology basis",
    "Scientific DNA",
    "Research pattern stack",
    "Reasoning trace policy",
    "evidence",
    "verified, partially verified, not verified, blocked",
]
REQUIRED_BY_TYPE = {
    "prompts": ["Copy-ready prompt", "Hard rejection triggers", "Required output format"],
    "skills": ["Skill operating procedure", "Deliverables", "Handoff format"],
    "contracts": ["Acceptance clauses", "Required rejection wording", "Required acceptance wording"],
}
FORBIDDEN_GENERATED_PHRASES = [
    "strict agent behaviour control for",
    "The work is not accepted unless restate",
    "Prompt 1",
    "Skill 1",
    "Contract 1",
]
REQUIRED_LIBRARY_DOCS = [
    "README.md",
    "CATALOGUE.md",
    "assets.json",
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
]


def fail(message: str) -> None:
    print(f"[FAIL] {message}")


def numbered_point_count(content: str) -> int:
    return len(re.findall(r"^\d+\.\s+", content, flags=re.MULTILINE))


def main() -> int:
    failed = False
    if not LIBRARY.exists():
        fail("missing docs/template-library")
        return 1

    for rel in REQUIRED_LIBRARY_DOCS:
        if not (LIBRARY / rel).exists():
            fail(f"missing template library support file: docs/template-library/{rel}")
            failed = True

    titles = set()
    paths = set()
    manifest_path = LIBRARY / "assets.json"
    assets = []
    if manifest_path.exists():
        try:
            assets = json.loads(manifest_path.read_text(encoding="utf-8"))
        except json.JSONDecodeError as exc:
            fail(f"assets.json is invalid JSON: {exc}")
            return 1
        if len(assets) != sum(EXPECTED_COUNTS.values()):
            fail(f"assets.json expected {sum(EXPECTED_COUNTS.values())} entries, found {len(assets)}")
            failed = True
        for asset in assets:
            title = asset.get("title")
            rel_path = asset.get("path")
            for key in ["type", "title", "category", "path", "summary", "tags", "research_patterns"]:
                if key not in asset:
                    fail(f"assets.json entry missing {key}: {asset}")
                    failed = True
            if title in titles:
                fail(f"duplicate manifest title: {title}")
                failed = True
            titles.add(title)
            if rel_path in paths:
                fail(f"duplicate manifest path: {rel_path}")
                failed = True
            paths.add(rel_path)
            if rel_path and not (ROOT / rel_path).exists():
                fail(f"assets.json entry points to missing file: {rel_path}")
                failed = True
            if not isinstance(asset.get("research_patterns"), list) or len(asset.get("research_patterns", [])) < 3:
                fail(f"assets.json entry missing sufficient research_patterns: {rel_path}")
                failed = True

    for folder, expected_count in EXPECTED_COUNTS.items():
        files = sorted((LIBRARY / folder).glob("*.md"))
        if len(files) != expected_count:
            fail(f"docs/template-library/{folder} expected {expected_count} files, found {len(files)}")
            failed = True

        for file_path in files:
            content = file_path.read_text(encoding="utf-8")
            rel = file_path.relative_to(ROOT)
            point_count = numbered_point_count(content)
            if point_count < MIN_NUMBERED_POINTS:
                fail(f"{rel} has {point_count} numbered points, expected at least {MIN_NUMBERED_POINTS}")
                failed = True
            for phrase in REQUIRED_COMMON + REQUIRED_BY_TYPE[folder]:
                if phrase not in content:
                    fail(f"{rel} missing required phrase: {phrase}")
                    failed = True
            for phrase in FORBIDDEN_GENERATED_PHRASES:
                if phrase in content:
                    fail(f"{rel} contains generated/filler phrase: {phrase}")
                    failed = True
            if len(set(re.findall(r"^\d+\.\s+(.+)$", content, flags=re.MULTILINE))) < MIN_NUMBERED_POINTS:
                fail(f"{rel} repeats too many numbered points")
                failed = True

    if failed:
        return 1
    print("Template library checks passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
