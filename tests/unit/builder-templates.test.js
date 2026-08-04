import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import { validateProjectConfig } from '../../build-project/src/features/project-builder/app.js';
import {
  createSlug,
  generateProjectFiles,
  validateGeneratedFiles,
  validateProjectName,
  validateRelativePath
} from '../../build-project/src/features/project-builder/templates.js';

const fixture = JSON.parse(await readFile(new URL('../fixtures/builder-config.json', import.meta.url), 'utf8'));

test('createSlug normalises accents and constrains generated root length', () => {
  assert.equal(createSlug(' Café / Review  '), 'cafe-review');
  assert.equal(createSlug('東京'), 'governed-agent-project');
  assert.ok(createSlug('a'.repeat(200)).length <= 64);
});

test('validateProjectName rejects empty, dangerous, and long names', () => {
  assert.match(validateProjectName(''), /Enter/);
  assert.match(validateProjectName('../escape'), /path characters/);
  assert.match(validateProjectName('a'.repeat(81)), /80 characters/);
  assert.equal(validateProjectName('Café Review'), '');
});

test('generated starter files are unique, rooted, sorted, and manifested', () => {
  const result = generateProjectFiles(fixture);
  const paths = result.files.map((file) => file.path);
  assert.equal(result.root, 'cafe-review');
  assert.deepEqual(paths, [...paths].sort((left, right) => left.localeCompare(right)));
  assert.equal(new Set(paths).size, paths.length);
  assert.ok(paths.every((path) => path.startsWith('cafe-review/')));
  assert.equal(validateGeneratedFiles(result.files, result.root), true);

  const manifestFile = result.files.find((file) => file.path.endsWith('/starter-manifest.json'));
  const manifest = JSON.parse(manifestFile.content);
  assert.equal(manifest.artifact_type, 'browser-local-starter-scaffold');
  assert.equal(manifest.approved_for_implementation, false);
  assert.ok(manifest.included_files.includes('starter-manifest.json'));
  assert.deepEqual(manifest.included_files, [...manifest.included_files].sort());
});

test('generated approval remains pending without explicit approval input', () => {
  const result = generateProjectFiles(fixture);
  const approval = result.files.find((file) => file.path.endsWith('/docs/governance/09-human-approval-record.md'));
  assert.match(approval.content, /APPROVED_FOR_IMPLEMENTATION: no/);
  assert.match(approval.content, /Approval date:\s+pending/);
});

test('explicit complete approval is preserved exactly', () => {
  const approved = {
    ...fixture,
    includeApproval: true,
    approverName: 'Example approver',
    approverRole: 'Project owner',
    approvalDate: '2026-08-04',
    approvalScope: 'Fictional local implementation only.',
    approvalConditions: 'No deployment.',
    approvalNotes: 'Reviewed fixture.'
  };
  assert.deepEqual(validateProjectConfig(approved), {});
  const result = generateProjectFiles(approved);
  const approval = result.files.find((file) => file.path.endsWith('/docs/governance/09-human-approval-record.md'));
  assert.match(approval.content, /APPROVED_FOR_IMPLEMENTATION: yes/);
  assert.match(approval.content, /Approval date:\s+2026-08-04/);
});

test('approval remains blocked when scope or conditions are absent', () => {
  const incomplete = {
    ...fixture,
    includeApproval: true,
    approverName: 'Example approver',
    approverRole: 'Project owner',
    approvalDate: '2026-08-04',
    approvalScope: '',
    approvalConditions: ''
  };
  const result = generateProjectFiles(incomplete);
  const manifest = JSON.parse(result.files.find((file) => file.path.endsWith('/starter-manifest.json')).content);
  assert.equal(manifest.approved_for_implementation, false);
});

test('config validation covers required approval and large input cases', () => {
  const missingApproval = validateProjectConfig({ ...fixture, includeApproval: true, approverName: '', approvalDate: '' });
  assert.equal(missingApproval.approverName, 'Complete this field to record implementation approval.');
  assert.equal(missingApproval.approvalDate, 'Complete this field to record implementation approval.');
  assert.match(validateProjectConfig({ ...fixture, purpose: 'x'.repeat(4001) }).purpose, /4000/);
});

test('relative path validation rejects traversal, absolute, duplicate, and non-text entries', () => {
  assert.throws(() => validateRelativePath('../escape.md', 'safe-root'), /unsafe segment|escapes/);
  assert.throws(() => validateRelativePath('/absolute.md', 'safe-root'), /relative/);
  assert.throws(() => validateGeneratedFiles([
    { path: 'safe-root/a.md', content: 'one' },
    { path: 'safe-root/a.md', content: 'two' }
  ], 'safe-root'), /Duplicate/);
  assert.throws(() => validateGeneratedFiles([{ path: 'safe-root/a.md', content: 1 }], 'safe-root'), /must be text/);
});
