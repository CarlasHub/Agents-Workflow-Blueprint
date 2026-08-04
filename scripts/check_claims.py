#!/usr/bin/env python3

"""Reject unsupported capability claims in public repository content."""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
import re
import sys
from typing import Iterable


ROOT = Path(__file__).resolve().parents[1]

PUBLIC_ROOTS = (
    "README.md",
    "DELIVERY-NOTES.md",
    "AGENTS.md",
    "index.html",
    "build-project",
    "PROMPTS",
    "docs",
    "examples",
    "evals",
)
PUBLIC_SUFFIXES = {".md", ".html", ".js", ".json"}
EXCLUDED_PARTS = {"node_modules", "test-results", "playwright-report"}


@dataclass(frozen=True)
class ClaimRule:
    name: str
    pattern: re.Pattern[str]


@dataclass(frozen=True)
class ClaimViolation:
    path: str
    line: int
    phrase: str
    rule: str
    text: str


CLAIM_RULES = (
    ClaimRule("research certainty", re.compile(r"\bresearch[- ]backed\b", re.I)),
    ClaimRule("scientific certainty", re.compile(r"\bscientifically\s+(?:proven|validated)\b", re.I)),
    ClaimRule("market validation", re.compile(r"\bvalidated\s+across\s+(?:the\s+)?industry\b", re.I)),
    ClaimRule("release maturity", re.compile(r"\b(?:production|enterprise|release)[- ](?:ready|grade)\b", re.I)),
    ClaimRule("accessibility conformance", re.compile(r"\b(?:fully\s+accessible|WCAG\s+(?:passed|compliant|conformant))\b", re.I)),
    ClaimRule("general compliance", re.compile(r"\b(?:fully\s+)?compliant\b", re.I)),
    ClaimRule("security certainty", re.compile(r"\b(?:is|are|fully|automatically|guaranteed)\s+secure\b", re.I)),
    ClaimRule("hallucination elimination", re.compile(r"\beliminat(?:e|es|ed|ing)\s+hallucinations?\b", re.I)),
    ClaimRule("guaranteed reliability", re.compile(r"\bguarantee(?:s|d)?\s+(?:correct|reliable|safe|secure)\b", re.I)),
)

LIMITATION_MARKERS = (
    "avoid",
    "blocked",
    "cannot",
    "do not",
    "does not",
    "don't",
    "failure mode",
    "forbid",
    "must not",
    "never",
    "no claim",
    "not ",
    "overclaim",
    "reject",
    "risk",
    "unsupported",
    "without evidence",
    "without appropriate evidence",
    "would imply",
    "as if",
)

REQUIRED_PUBLIC_SECTIONS = {
    "README.md": ("## What has been verified", "## What has not been verified"),
    "index.html": ("What has been verified", "What has not been verified"),
}


def is_public_path(path: Path, root: Path = ROOT) -> bool:
    try:
        rel = path.relative_to(root)
    except ValueError:
        return False
    if path.suffix.lower() not in PUBLIC_SUFFIXES:
        return False
    if any(part in EXCLUDED_PARTS for part in rel.parts):
        return False
    first = rel.parts[0]
    return first in PUBLIC_ROOTS


def iter_public_files(root: Path = ROOT) -> Iterable[Path]:
    for path in root.rglob("*"):
        if path.is_file() and is_public_path(path, root):
            yield path


def has_limitation_context(lines: list[str], line_index: int, match_start: int) -> bool:
    current_prefix = lines[line_index][:match_start]
    previous = " ".join(lines[max(0, line_index - 5):line_index])
    context = f"{previous} {current_prefix}".casefold()
    return any(marker in context for marker in LIMITATION_MARKERS)


def scan_text(text: str, path: str = "<text>") -> list[ClaimViolation]:
    violations: list[ClaimViolation] = []
    lines = text.splitlines()
    for line_index, line in enumerate(lines):
        for rule in CLAIM_RULES:
            for match in rule.pattern.finditer(line):
                if has_limitation_context(lines, line_index, match.start()):
                    continue
                violations.append(
                    ClaimViolation(
                        path=path,
                        line=line_index + 1,
                        phrase=match.group(0),
                        rule=rule.name,
                        text=line.strip(),
                    )
                )
    return violations


def scan_repository(root: Path = ROOT) -> list[ClaimViolation]:
    violations: list[ClaimViolation] = []
    for path in sorted(iter_public_files(root)):
        rel = str(path.relative_to(root))
        violations.extend(scan_text(path.read_text(encoding="utf-8"), rel))
    return violations


def validate_required_sections(root: Path = ROOT) -> list[str]:
    failures: list[str] = []
    for rel_path, headings in REQUIRED_PUBLIC_SECTIONS.items():
        path = root / rel_path
        if not path.exists():
            failures.append(f"missing public claim file: {rel_path}")
            continue
        content = path.read_text(encoding="utf-8")
        for heading in headings:
            if heading not in content:
                failures.append(f"{rel_path} missing public evidence section: {heading}")
    return failures


def main() -> int:
    failures = validate_required_sections()
    violations = scan_repository()

    for failure in failures:
        print(f"[FAIL] {failure}")
    for violation in violations:
        print(
            f"[FAIL] {violation.path}:{violation.line} unsupported {violation.rule} "
            f"claim {violation.phrase!r}: {violation.text}"
        )

    if failures or violations:
        return 1

    scanned = sum(1 for _ in iter_public_files())
    print(f"Claim checks passed across {scanned} public files.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
