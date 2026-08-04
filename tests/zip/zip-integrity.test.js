import test from 'node:test';
import assert from 'node:assert/strict';
import { strFromU8, unzipSync } from 'fflate';

import {
  createZipBytes,
  crc32,
  validateZipEntryPath
} from '../../build-project/src/features/project-builder/zip.js';

test('ZIP bytes extract with UTF-8 names and content intact', () => {
  const files = [
    { path: 'starter/README.md', content: '# Olá\n' },
    { path: 'starter/docs/café.md', content: 'Ação e revisão.\n' }
  ];
  const bytes = createZipBytes(files);
  const extracted = unzipSync(bytes);
  assert.equal(strFromU8(extracted['starter/README.md']), '# Olá\n');
  assert.equal(strFromU8(extracted['starter/docs/café.md']), 'Ação e revisão.\n');

  const localHeader = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  assert.equal(localHeader.getUint16(6, true) & 0x0800, 0x0800);
  assert.equal(localHeader.getUint32(14, true), crc32(new TextEncoder().encode('# Olá\n')));
});

test('ZIP generation is deterministic for the same file list', () => {
  const files = [{ path: 'starter/a.txt', content: 'same' }];
  assert.deepEqual(createZipBytes(files), createZipBytes(files));
});

test('ZIP generation rejects empty, duplicate, absolute, traversal, and oversized entries', () => {
  assert.throws(() => createZipBytes([]), /empty ZIP/);
  assert.throws(() => createZipBytes([
    { path: 'starter/a.txt', content: 'one' },
    { path: 'starter/a.txt', content: 'two' }
  ]), /Duplicate/);
  assert.throws(() => createZipBytes([{ path: '/absolute.txt', content: '' }]), /relative/);
  assert.throws(() => createZipBytes([{ path: 'starter/../escape.txt', content: '' }]), /unsafe segment/);
  assert.throws(() => createZipBytes([{ path: 'starter/large.txt', content: 'x'.repeat(1024 * 1024 + 1) }]), /1 MiB/);
});

test('validateZipEntryPath permits only normal relative paths', () => {
  assert.equal(validateZipEntryPath('starter/docs/file.md'), 'starter/docs/file.md');
  assert.throws(() => validateZipEntryPath('starter\\file.md'), /forward slashes/);
  assert.throws(() => validateZipEntryPath('C:/file.md'), /relative/);
});
