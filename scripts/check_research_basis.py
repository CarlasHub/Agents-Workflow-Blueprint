#!/usr/bin/env python3
from pathlib import Path
import json
import sys

ROOT = Path(__file__).resolve().parents[1]
LIB = ROOT / 'docs' / 'template-library'
REQUIRED_DOCS = [
    'SCIENTIFIC-DNA.md',
    'PROMPT-ARCHITECTURE.md',
    'TRACEABILITY-MATRIX.md',
    'SYSTEM-2-PROMPTING-GUIDE.md',
    'RESEARCH-BASIS.md',
]
REQUIRED_TERMS = [
    'CoT-safe',
    'Tree-of-Thoughts',
    'ReAct',
    'Least-to-most',
    'Self-consistency',
    'Self-refinement',
    'Process supervision',
    'traceability',
    'hidden chain-of-thought',
]
ASSET_REQUIRED = [
    '## Scientific DNA',
    'Research pattern map',
    'CoT-safe reasoning record',
    'Formal traceability',
]

def fail(msg):
    print(f'[FAIL] {msg}')

def main():
    failed = False
    for doc in REQUIRED_DOCS:
        path = LIB / doc
        if not path.exists():
            fail(f'missing research doc: {doc}')
            failed = True
            continue
        content = path.read_text(encoding='utf-8')
        for term in REQUIRED_TERMS[:4]:
            if term not in content:
                fail(f'{doc} missing research term: {term}')
                failed = True
    for folder in ['prompts', 'skills', 'contracts']:
        for path in (LIB / folder).glob('*.md'):
            content = path.read_text(encoding='utf-8')
            for term in ASSET_REQUIRED:
                if term not in content:
                    fail(f'{path.relative_to(ROOT)} missing scientific basis marker: {term}')
                    failed = True
    assets_path = LIB / 'assets.json'
    assets = json.loads(assets_path.read_text(encoding='utf-8'))
    for asset in assets:
        if 'research_patterns' not in asset or len(asset['research_patterns']) < 3:
            fail(f"assets.json entry lacks research_patterns: {asset.get('title')}")
            failed = True
    if failed:
        return 1
    print('Research basis checks passed.')
    return 0

if __name__ == '__main__':
    sys.exit(main())
