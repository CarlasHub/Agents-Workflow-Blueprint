#!/usr/bin/env python3

"""Measure template-library size and exact repeated-block overhead."""

from __future__ import annotations

from collections import Counter
from difflib import SequenceMatcher
import json
from pathlib import Path
import re
import statistics
import sys

from asset_composer import KERNEL_PATH, MANIFEST_PATH, REGISTRY_PATH, parse_registry, split_sections


WORD_PATTERN = re.compile(r"[A-Za-z0-9][A-Za-z0-9’_-]*")
CONTROL_SECTIONS = {
    "prompts": "Task-specific instructions",
    "skills": "Procedure",
    "contracts": "Hard gates",
}
LIST_PREFIX = re.compile(r"^(?:\d+\.|-)\s+")
CONTRACT_PREFIX = re.compile(r"^Reject unless this is verified:\s*")


def word_count(text: str) -> int:
    return len(WORD_PATTERN.findall(text))


def inline_controls(groups: dict[str, list[Path]]) -> dict[str, list[str]]:
    locations: dict[str, list[str]] = {}
    for folder, paths in groups.items():
        section_name = CONTROL_SECTIONS[folder]
        for path in paths:
            _, sections = split_sections(path.read_text(encoding="utf-8"))
            for line in sections.get(section_name, "").splitlines():
                if not LIST_PREFIX.match(line.strip()):
                    continue
                control = LIST_PREFIX.sub("", line.strip())
                control = CONTRACT_PREFIX.sub("", control)
                control = " ".join(control.split())
                if word_count(control) < 5:
                    continue
                locations.setdefault(control, []).append(str(path))
    return locations


def near_duplicate_pairs(controls: list[tuple[str, str]], threshold: float = 0.92) -> list[dict[str, object]]:
    pairs: list[dict[str, object]] = []
    for index, (left_id, left) in enumerate(controls):
        for right_id, right in controls[index + 1:]:
            ratio = SequenceMatcher(None, left.casefold(), right.casefold()).ratio()
            if ratio >= threshold:
                pairs.append({"left": left_id, "right": right_id, "similarity": round(ratio, 3)})
    return pairs


def measure_assets(root: Path) -> dict[str, object]:
    groups = {
        name: sorted((root / "docs" / "template-library" / name).glob("*.md"))
        for name in ("prompts", "skills", "contracts")
    }
    files = [path for paths in groups.values() for path in paths]
    words = {str(path.relative_to(root)): word_count(path.read_text(encoding="utf-8")) for path in files}
    lines = {str(path.relative_to(root)): len(path.read_text(encoding="utf-8").splitlines()) for path in files}
    blocks: list[tuple[str, int]] = []
    for path in files:
        for raw_block in re.split(r"\n\s*\n", path.read_text(encoding="utf-8")):
            block = " ".join(raw_block.split())
            count = word_count(block)
            if count >= 20:
                blocks.append((block, count))

    frequencies = Counter(block for block, _ in blocks)
    block_words = {block: count for block, count in blocks}
    duplicate_extra_words = sum(
        block_words[block] * (frequency - 1)
        for block, frequency in frequencies.items()
        if frequency > 1
    )
    total_words = sum(words.values())
    repeated_sizes = [block_words[block] for block, frequency in frequencies.items() if frequency > 1]
    largest_path, largest_words = max(words.items(), key=lambda item: item[1])
    manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    registry = parse_registry()
    inline = inline_controls(groups)
    repeated_inline = {control: paths for control, paths in inline.items() if len(set(paths)) > 1}
    referenced = [control_id for asset in manifest for control_id in asset.get("shared_controls", [])]
    orphaned = sorted(set(registry) - set(referenced))
    control_corpus = [(control_id, control) for control_id, control in registry.items()]
    control_corpus.extend((f"inline:{index}", control) for index, control in enumerate(inline, start=1))
    near_duplicates = near_duplicate_pairs(control_corpus)
    registry_words = word_count(REGISTRY_PATH.read_text(encoding="utf-8"))
    kernel_words = word_count(KERNEL_PATH.read_text(encoding="utf-8"))

    return {
        "counts": {name: len(paths) for name, paths in groups.items()},
        "words_by_type": {
            name: sum(words[str(path.relative_to(root))] for path in paths)
            for name, paths in groups.items()
        },
        "total_words": total_words,
        "median_words": statistics.median(words.values()),
        "largest_asset": largest_path,
        "largest_asset_words": largest_words,
        "total_lines": sum(lines.values()),
        "median_lines": statistics.median(lines.values()),
        "repeated_blocks": sum(1 for frequency in frequencies.values() if frequency > 1),
        "duplicate_extra_words": duplicate_extra_words,
        "duplicate_ratio_percent": round((duplicate_extra_words / total_words) * 100, 2) if total_words else 0,
        "largest_repeated_block_words": max(repeated_sizes, default=0),
        "inline_specialist_controls": len(inline),
        "shared_specialist_controls": len(registry),
        "shared_control_references": len(referenced),
        "orphaned_shared_controls": orphaned,
        "repeated_inline_specialist_controls": len(repeated_inline),
        "near_duplicate_control_pairs": len(near_duplicates),
        "near_duplicate_similarity_threshold": 0.92,
        "specialist_registry_words": registry_words,
        "governance_kernel_words": kernel_words,
        "normalized_architecture_words": total_words + registry_words + kernel_words,
    }


def main() -> int:
    root = Path(__file__).resolve().parents[1]
    json.dump(measure_assets(root), sys.stdout, indent=2)
    print()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
