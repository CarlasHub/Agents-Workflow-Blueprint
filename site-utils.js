export function normalise(value) {
  return String(value ?? '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('en')
    .replace(/\s+/g, ' ')
    .trim();
}

export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function escapeAttribute(value) {
  return escapeHtml(value).replace(/`/g, '&#96;');
}

export function safeHref(value) {
  const href = String(value ?? '').trim();
  if (!href || /[\u0000-\u001f\u007f]/.test(href) || href.startsWith('//') || href.includes('\\')) return '#';
  if (href.startsWith('#')) return href;

  const scheme = href.match(/^([A-Za-z][A-Za-z0-9+.-]*):/u)?.[1]?.toLowerCase();
  if (scheme) return ['http', 'https', 'mailto'].includes(scheme) ? href : '#';
  return href;
}

export function getCategoryLabel(category) {
  return String(category ?? '').trim() || 'Uncategorised';
}

export function getTypeLabel(type) {
  const value = String(type ?? '').trim();
  if (!value) return 'Unknown';
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function filterAssets(assets, query, type = 'all') {
  const term = normalise(query);
  return assets.filter((asset) => {
    const typeMatch = type === 'all' || asset.type === type;
    const haystack = normalise([
      asset.title,
      asset.type,
      asset.category,
      asset.summary,
      ...(Array.isArray(asset.tags) ? asset.tags : [])
    ].join(' '));
    return typeMatch && haystack.includes(term);
  });
}

const SPECIALIST_CONTROL_ID = /^SPC-[A-F0-9]{10}$/;

export function parseSpecialistControls(markdown) {
  const source = String(markdown ?? '').replace(/\r\n/g, '\n');
  const headings = [...source.matchAll(/^## (SPC-[A-F0-9]{10})\n/gm)];
  const controls = new Map();
  headings.forEach((heading, index) => {
    const start = heading.index + heading[0].length;
    const end = headings[index + 1]?.index ?? source.length;
    const block = source.slice(start, end);
    const match = block.match(/^### Control\n\n(.+?)(?=\n\n### |(?![\s\S]))/ms);
    if (!match) throw new Error(`${heading[1]} is missing its Control section`);
    if (controls.has(heading[1])) throw new Error(`Duplicate specialist control: ${heading[1]}`);
    controls.set(heading[1], match[1].replace(/\s+/g, ' ').trim());
  });
  return controls;
}

export function referencedSpecialistControls(markdown) {
  const source = String(markdown ?? '').replace(/\r\n/g, '\n');
  const section = source.match(/^## Shared specialist controls\n([\s\S]*?)(?=^## |(?![\s\S]))/m)?.[1] ?? '';
  return [...new Set(section.match(/\bSPC-[A-F0-9]{10}\b/g) ?? [])];
}

export function removeMarkdownSections(markdown, headingsToRemove) {
  const excluded = new Set(headingsToRemove);
  const source = String(markdown ?? '').replace(/\r\n/g, '\n');
  const headings = [...source.matchAll(/^## ([^\n]+)\n/gm)];
  const ranges = headings
    .map((heading, index) => ({
      heading: heading[1].trim(),
      start: heading.index,
      end: headings[index + 1]?.index ?? source.length
    }))
    .filter((entry) => excluded.has(entry.heading));
  return ranges.reverse().reduce(
    (result, range) => result.slice(0, range.start) + result.slice(range.end),
    source
  ).trim();
}

export function removeAssetReferenceSections(markdown) {
  return removeMarkdownSections(markdown, ['Dependencies', 'Shared specialist controls']);
}

function demoteHeadings(markdown, levels = 2) {
  const prefix = '#'.repeat(levels);
  return markdown.replace(/^(#{1,4})(?=\s)/gm, `${prefix}$1`);
}

export function composeAssetMarkdown(asset, assetMarkdown, kernelMarkdown, registryMarkdown) {
  const controlIds = asset?.shared_controls;
  if (!asset?.id || !Array.isArray(controlIds) || new Set(controlIds).size !== controlIds.length) {
    throw new Error('Asset composition metadata is invalid');
  }
  if (controlIds.some((controlId) => !SPECIALIST_CONTROL_ID.test(controlId))) {
    throw new Error('Asset composition contains a malformed specialist control ID');
  }
  const sourceControls = referencedSpecialistControls(assetMarkdown);
  if (sourceControls.join('\n') !== controlIds.join('\n')) {
    throw new Error('Asset source and manifest control references differ');
  }
  const controls = parseSpecialistControls(registryMarkdown);
  const missing = controlIds.filter((controlId) => !controls.has(controlId));
  if (missing.length) throw new Error(`Unresolved specialist controls: ${missing.join(', ')}`);

  const parts = [
    '# Composed Agent Workflow Asset',
    '',
    '> Deterministic composition: shared governance and specialist controls are included once.',
    '',
    '## Shared governance',
    '',
    demoteHeadings(String(kernelMarkdown).trim())
  ];
  if (controlIds.length) {
    parts.push('', '## Shared specialist controls', '');
    controlIds.forEach((controlId, index) => {
      parts.push(`${index + 1}. **${controlId}:** ${controls.get(controlId)}`);
    });
  }
  parts.push('', '## Specialist modules', '', demoteHeadings(removeAssetReferenceSections(assetMarkdown)));
  return `${parts.join('\n').trim()}\n`;
}

export function composeReadableAssetMarkdown(asset, assetMarkdown, kernelMarkdown, registryMarkdown) {
  // Run the canonical composer first so the readable view cannot hide manifest or registry drift.
  composeAssetMarkdown(asset, assetMarkdown, kernelMarkdown, registryMarkdown);
  const controls = parseSpecialistControls(registryMarkdown);
  const source = removeMarkdownSections(assetMarkdown, [
    'Metadata',
    'Dependencies',
    'Shared specialist controls'
  ]);
  const parts = [source];
  if (asset.shared_controls.length) {
    parts.push('', '## Resolved shared specialist controls', '');
    asset.shared_controls.forEach((controlId, index) => {
      parts.push(`${index + 1}. **${controlId}:** ${controls.get(controlId)}`);
    });
  }
  parts.push(
    '',
    '## Shared governance applied',
    '',
    `Governance profile \`${asset.governance_profile}\` is applied. Use **Complete composition** or **Copy complete asset** to include the full governance kernel.`
  );
  return `${parts.join('\n').trim()}\n`;
}

export function renderInlineMarkdown(value) {
  let html = escapeHtml(value);
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, href) => (
    `<a href="${escapeAttribute(safeHref(href))}" target="_blank" rel="noreferrer">${text}</a>`
  ));
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  return html;
}

function splitTableRow(line) {
  return line.replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim());
}

function renderTable(rows) {
  if (rows.length < 2) return rows.map((row) => `<p>${renderInlineMarkdown(row)}</p>`).join('');
  const header = splitTableRow(rows[0]);
  const bodyRows = rows.slice(2).map(splitTableRow);
  return `
    <div class="markdown-table-wrap">
      <table>
        <thead><tr>${header.map((cell) => `<th>${renderInlineMarkdown(cell)}</th>`).join('')}</tr></thead>
        <tbody>${bodyRows.map((row) => `<tr>${row.map((cell) => `<td>${renderInlineMarkdown(cell)}</td>`).join('')}</tr>`).join('')}</tbody>
      </table>
    </div>
  `;
}

export function renderMarkdown(markdown) {
  const lines = String(markdown ?? '').replace(/\r\n/g, '\n').split('\n');
  const html = [];
  let paragraph = [];
  let listType = null;
  let listItems = [];
  let tableRows = [];
  let inCode = false;
  let codeLines = [];
  let codeLanguage = '';

  function flushParagraph() {
    if (!paragraph.length) return;
    html.push(`<p>${renderInlineMarkdown(paragraph.join(' '))}</p>`);
    paragraph = [];
  }
  function flushList() {
    if (!listType) return;
    html.push(`<${listType}>${listItems.map((item) => `<li>${renderInlineMarkdown(item)}</li>`).join('')}</${listType}>`);
    listType = null;
    listItems = [];
  }
  function flushTable() {
    if (!tableRows.length) return;
    html.push(renderTable(tableRows));
    tableRows = [];
  }
  function flushOpenBlocks() {
    flushParagraph();
    flushList();
    flushTable();
  }

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('```')) {
      if (inCode) {
        html.push(`<pre><code class="${escapeAttribute(codeLanguage)}">${escapeHtml(codeLines.join('\n'))}</code></pre>`);
        inCode = false;
        codeLines = [];
        codeLanguage = '';
      } else {
        flushOpenBlocks();
        inCode = true;
        codeLanguage = trimmed.slice(3).trim();
      }
      continue;
    }
    if (inCode) {
      codeLines.push(line);
      continue;
    }
    if (!trimmed) {
      flushOpenBlocks();
      continue;
    }
    if (/^\|.+\|$/.test(trimmed)) {
      flushParagraph();
      flushList();
      tableRows.push(trimmed);
      continue;
    }
    flushTable();
    const heading = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      html.push(`<h${heading[1].length}>${renderInlineMarkdown(heading[2])}</h${heading[1].length}>`);
      continue;
    }
    if (/^---+$/.test(trimmed)) {
      flushOpenBlocks();
      html.push('<hr>');
      continue;
    }
    const quote = trimmed.match(/^>\s?(.+)$/);
    if (quote) {
      flushOpenBlocks();
      html.push(`<blockquote>${renderInlineMarkdown(quote[1])}</blockquote>`);
      continue;
    }
    const unordered = trimmed.match(/^[-*]\s+(.+)$/);
    const ordered = trimmed.match(/^\d+\.\s+(.+)$/);
    if (unordered || ordered) {
      flushParagraph();
      const nextType = unordered ? 'ul' : 'ol';
      if (listType && listType !== nextType) flushList();
      listType = nextType;
      listItems.push((unordered || ordered)[1]);
      continue;
    }
    paragraph.push(trimmed);
  }

  if (inCode) html.push(`<pre><code class="${escapeAttribute(codeLanguage)}">${escapeHtml(codeLines.join('\n'))}</code></pre>`);
  flushOpenBlocks();
  return html.join('');
}
