import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(new URL('../..', import.meta.url).pathname);
const manifest = JSON.parse(await readFile(resolve(root, 'docs/template-library/assets.json'), 'utf8'));
const schema = JSON.parse(await readFile(resolve(root, 'docs/template-library/asset.schema.json'), 'utf8'));
const researchSources = JSON.parse(await readFile(resolve(root, 'docs/template-library/research-sources.json'), 'utf8'));
const researchByLabel = new Map(researchSources.map((source) => [source.label, source]));

test('asset manifest has 100 unique IDs and paths', () => {
  assert.equal(manifest.length, 100);
  assert.equal(new Set(manifest.map((asset) => asset.id)).size, 100);
  assert.equal(new Set(manifest.map((asset) => asset.path)).size, 100);
});

test('asset manifest entries contain every schema-required field', () => {
  for (const asset of manifest) {
    for (const key of schema.required) assert.ok(Object.hasOwn(asset, key), `${asset.id} missing ${key}`);
    assert.equal(asset.version, '3.0.0');
    assert.ok(asset.dependencies.includes('docs/template-library/GOVERNANCE-KERNEL.md'));
    assert.ok(asset.dependencies.includes('docs/template-library/SPECIALIST-CONTROLS.md'));
    assert.match(asset.governance_profile, /^GOV-PROFILE-(PROMPT|SKILL|CONTRACT)$/);
    assert.ok(Array.isArray(asset.shared_controls));
    assert.equal(new Set(asset.shared_controls).size, asset.shared_controls.length);
    for (const controlId of asset.shared_controls) assert.match(controlId, /^SPC-[A-F0-9]{10}$/);
    assert.ok(asset.evidence_expectations.length >= 2);
    assert.match(asset.risk_level, /^(standard|elevated|high)$/);
    assert.ok(asset.required_inputs.length >= 3);
    assert.ok(asset.expected_outputs.length >= 3);
    assert.ok(Array.isArray(asset.evaluation_cases));
    assert.ok(asset.research_pattern_labels.length >= 3);
    for (const label of asset.research_pattern_labels) assert.ok(researchByLabel.has(label), `${asset.id} unresolved research source ${label}`);
    if (asset.type === 'prompt') {
      assert.ok(asset.evaluation_cases.length >= 1);
      assert.ok(asset.research_pattern_labels.length >= 3);
    }
  }
});

test('research source registry is unique and links to scholarly or standards sources', () => {
  assert.equal(researchSources.length, 9);
  assert.equal(researchByLabel.size, researchSources.length);
  for (const source of researchSources) {
    assert.match(source.url, /^https:\/\/(?:arxiv\.org|doi\.org|www\.iso\.org)\//);
    assert.ok(source.citation.length >= 20);
    assert.ok(source.translation.length >= 40);
  }
});

test('asset paths and dependencies resolve on disk', async () => {
  for (const asset of manifest) {
    await access(resolve(root, asset.path));
    for (const dependency of asset.dependencies) await access(resolve(root, dependency));
  }
});
