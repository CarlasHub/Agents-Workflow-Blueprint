const encoder = new TextEncoder();
const crcTable = createCrcTable();
const UTF8_FLAG = 0x0800;
const MAX_ENTRY_BYTES = 1024 * 1024;
const MAX_ARCHIVE_BYTES = 20 * 1024 * 1024;
const MAX_ENTRIES = 65535;

function createCrcTable() {
  const table = new Uint32Array(256);

  for (let i = 0; i < 256; i += 1) {
    let value = i;
    for (let bit = 0; bit < 8; bit += 1) {
      value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
    }
    table[i] = value >>> 0;
  }

  return table;
}

export function crc32(bytes) {
  let crc = 0xffffffff;

  for (const byte of bytes) {
    crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }

  return (crc ^ 0xffffffff) >>> 0;
}

function dosDateTime(date = new Date('2026-01-01T00:00:00Z')) {
  const year = Math.max(date.getUTCFullYear(), 1980);
  const dosTime =
    (date.getUTCHours() << 11) |
    (date.getUTCMinutes() << 5) |
    Math.floor(date.getUTCSeconds() / 2);
  const dosDate =
    ((year - 1980) << 9) |
    ((date.getUTCMonth() + 1) << 5) |
    date.getUTCDate();

  return { dosTime, dosDate };
}

function writeUInt16(view, offset, value) {
  view.setUint16(offset, value, true);
}

function writeUInt32(view, offset, value) {
  view.setUint32(offset, value, true);
}

function concatChunks(chunks, totalLength) {
  const output = new Uint8Array(totalLength);
  let offset = 0;

  for (const chunk of chunks) {
    output.set(chunk, offset);
    offset += chunk.length;
  }

  return output;
}

function header(length) {
  return new Uint8Array(length);
}

export function validateZipEntryPath(path) {
  if (typeof path !== 'string' || !path.trim()) throw new TypeError('ZIP entry path must be a non-empty string.');
  if (path.includes('\0')) throw new TypeError(`ZIP entry path contains a null byte: ${path}`);
  if (path.includes('\\')) throw new TypeError(`ZIP entry path must use forward slashes: ${path}`);
  if (path.startsWith('/') || /^[A-Za-z]:\//.test(path)) throw new TypeError(`ZIP entry path must be relative: ${path}`);

  const segments = path.split('/');
  if (segments.some((segment) => segment === '' || segment === '.' || segment === '..')) {
    throw new TypeError(`ZIP entry path contains an unsafe segment: ${path}`);
  }
  return path;
}

export function createZipBytes(files, options = {}) {
  if (!Array.isArray(files) || files.length === 0) throw new TypeError('Cannot create an empty ZIP archive.');
  if (files.length > MAX_ENTRIES) throw new RangeError(`ZIP archives are limited to ${MAX_ENTRIES} entries.`);

  const seenPaths = new Set();
  const prepared = files.map((file) => {
    const path = validateZipEntryPath(file?.path);
    if (seenPaths.has(path)) throw new TypeError(`Duplicate ZIP entry path: ${path}`);
    seenPaths.add(path);

    const nameBytes = encoder.encode(path);
    const contentBytes = encoder.encode(String(file?.content ?? ''));
    if (nameBytes.length > 65535) throw new RangeError(`ZIP entry path is too long: ${path}`);
    if (contentBytes.length > MAX_ENTRY_BYTES) throw new RangeError(`ZIP entry exceeds 1 MiB: ${path}`);
    return { path, nameBytes, contentBytes };
  });

  const contentTotal = prepared.reduce((total, file) => total + file.contentBytes.length, 0);
  if (contentTotal > MAX_ARCHIVE_BYTES) throw new RangeError('ZIP content exceeds the documented 20 MiB limit.');

  const chunks = [];
  const centralDirectory = [];
  let offset = 0;
  const { dosTime, dosDate } = dosDateTime(options.date);

  for (const file of prepared) {
    const checksum = crc32(file.contentBytes);
    const localHeader = header(30);
    const localView = new DataView(localHeader.buffer);
    const localOffset = offset;

    writeUInt32(localView, 0, 0x04034b50);
    writeUInt16(localView, 4, 20);
    writeUInt16(localView, 6, UTF8_FLAG);
    writeUInt16(localView, 8, 0);
    writeUInt16(localView, 10, dosTime);
    writeUInt16(localView, 12, dosDate);
    writeUInt32(localView, 14, checksum);
    writeUInt32(localView, 18, file.contentBytes.length);
    writeUInt32(localView, 22, file.contentBytes.length);
    writeUInt16(localView, 26, file.nameBytes.length);
    writeUInt16(localView, 28, 0);

    chunks.push(localHeader, file.nameBytes, file.contentBytes);
    offset += localHeader.length + file.nameBytes.length + file.contentBytes.length;

    const centralHeader = header(46);
    const centralView = new DataView(centralHeader.buffer);
    writeUInt32(centralView, 0, 0x02014b50);
    writeUInt16(centralView, 4, 20);
    writeUInt16(centralView, 6, 20);
    writeUInt16(centralView, 8, UTF8_FLAG);
    writeUInt16(centralView, 10, 0);
    writeUInt16(centralView, 12, dosTime);
    writeUInt16(centralView, 14, dosDate);
    writeUInt32(centralView, 16, checksum);
    writeUInt32(centralView, 20, file.contentBytes.length);
    writeUInt32(centralView, 24, file.contentBytes.length);
    writeUInt16(centralView, 28, file.nameBytes.length);
    writeUInt16(centralView, 30, 0);
    writeUInt16(centralView, 32, 0);
    writeUInt16(centralView, 34, 0);
    writeUInt16(centralView, 36, 0);
    writeUInt32(centralView, 38, 0);
    writeUInt32(centralView, 42, localOffset);

    centralDirectory.push(centralHeader, file.nameBytes);
  }

  const centralDirectorySize = centralDirectory.reduce((total, chunk) => total + chunk.length, 0);
  const centralDirectoryOffset = offset;
  const endRecord = header(22);
  const endView = new DataView(endRecord.buffer);

  writeUInt32(endView, 0, 0x06054b50);
  writeUInt16(endView, 4, 0);
  writeUInt16(endView, 6, 0);
  writeUInt16(endView, 8, prepared.length);
  writeUInt16(endView, 10, prepared.length);
  writeUInt32(endView, 12, centralDirectorySize);
  writeUInt32(endView, 16, centralDirectoryOffset);
  writeUInt16(endView, 20, 0);

  const allChunks = [...chunks, ...centralDirectory, endRecord];
  const totalLength = allChunks.reduce((total, chunk) => total + chunk.length, 0);
  return concatChunks(allChunks, totalLength);
}

export function createZipBlob(files, options) {
  return new Blob([createZipBytes(files, options)], { type: 'application/zip' });
}
