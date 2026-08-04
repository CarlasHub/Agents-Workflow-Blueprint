import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(new URL('../..', import.meta.url).pathname);
const manifest = JSON.parse(await readFile(resolve(root, 'docs/template-library/assets.json'), 'utf8'));
const schema = JSON.parse(await readFile(resolve(root, 'docs/template-library/asset.schema.json'), 'utf8'));

test('asset manifest has 100 unique IDs and paths', () => {
  assert.equal(manifest.length, 100);
  assert.equal(new Set(manifest.map((asset) => asset.id)).size, 100);
  assert.equal(new Set(manifest.map((asset) => asset.path)).size, 100);
});

test('asset manifest entries contain every schema-required field', () => {
  for (const asset of manifest) {
    for (const key of schema.required) assert.ok(Object.hasOwn(asset, key), `${asset.id} missing ${key}`);
    assert.equal(asset.version, '2.1.0');
    assert.ok(asset.dependencies.includes('docs/template-library/GOVERNANCE-KERNEL.md'));
    assert.ok(asset.dependencies.includes('docs/template-library/SPECIALIST-CONTROLS.md'));
    assert.match(asset.governance_profile, /^GOV-PROFILE-(PROMPT|SKILL|CONTRACT)$/);
    assert.ok(Array.isArray(asset.shared_controls));
    assert.equal(new Set(asset.shared_controls).size, asset.shared_controls.length);
    for (const controlId of asset.shared_controls) assert.match(controlId, /^SPC-[A-F0-9]{10}$/);
    assert.ok(asset.evidence_expectations.length >= 2);
  }
});

test('asset paths and dependencies resolve on disk', async () => {
  for (const asset of manifest) {
    await access(resolve(root, asset.path));
    for (const dependency of asset.dependencies) await access(resolve(root, dependency));
  }
});
