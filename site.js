import {
  composeAssetMarkdown,
  composeAssetIntroductionMarkdown,
  escapeAttribute,
  escapeHtml,
  filterAssets,
  getCategoryLabel,
  getTypeLabel,
  renderMarkdown,
  splitComposedAssetMarkdown
} from './site-utils.js?v=20260805-5';

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function categoryHash(label) {
  let hash = 0;
  for (let index = 0; index < label.length; index += 1) {
    hash = ((hash << 5) - hash) + label.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
}

function categoryStyle(category) {
  const hue = categoryHash(getCategoryLabel(category)) % 360;
  return `--category-bg:hsl(${hue} 80% 52% / 0.17);--category-border:hsl(${hue} 86% 66% / 0.62);--category-fg:hsl(${hue} 100% 83%);`;
}

function typeIcon(type) {
  return { prompt: '●', skill: '◆', contract: '■' }[String(type ?? '').toLowerCase()] || '•';
}

function copyIconMarkup() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M8 8.75A1.75 1.75 0 0 1 9.75 7h8.5A1.75 1.75 0 0 1 20 8.75v8.5A1.75 1.75 0 0 1 18.25 19h-8.5A1.75 1.75 0 0 1 8 17.25v-8.5Z" />
      <path d="M16 7V5.75A1.75 1.75 0 0 0 14.25 4h-8.5A1.75 1.75 0 0 0 4 5.75v8.5A1.75 1.75 0 0 0 5.75 16H8" />
    </svg>`;
}

function renderedDocumentPath(path) {
  const value = String(path ?? '');
  return value.endsWith('.md') ? `${value.slice(0, -3)}.html` : value;
}

export function createSiteApp(documentRef = document) {
  const grid = documentRef.getElementById('asset-grid');
  const status = documentRef.getElementById('asset-status');
  const announcements = documentRef.getElementById('site-status');
  const search = documentRef.getElementById('asset-search');
  const filterButtons = Array.from(documentRef.querySelectorAll('.filter-button'));
  const modal = documentRef.querySelector('[data-markdown-modal]');
  const dialog = modal.querySelector('.markdown-dialog');
  const closeButton = modal.querySelector('.markdown-close');
  const title = documentRef.getElementById('markdown-preview-title');
  const meta = documentRef.querySelector('[data-markdown-preview-meta]');
  const content = documentRef.querySelector('[data-markdown-preview-content]');
  const backgroundRegions = [
    documentRef.querySelector('.site-header'),
    documentRef.getElementById('main'),
    documentRef.querySelector('.site-footer')
  ].filter(Boolean);
  const initialSearch = new URLSearchParams(window.location.search).get('assetSearch');
  const fallbackTabIndexes = new Map();
  let assets = [];
  let activeFilter = 'all';
  let activePreviewViews = { readable: '', complete: '', source: '' };
  let activePreviewAsset = null;
  let activePreviewCopyText = '';
  let activePreviewCopyDescription = '';
  let lastPreviewTrigger = null;
  const sharedSourceCache = new Map();

  async function fetchText(path) {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Unable to fetch ${path}`);
    return response.text();
  }

  async function fetchSharedSource(path) {
    if (!sharedSourceCache.has(path)) sharedSourceCache.set(path, fetchText(path));
    try {
      return await sharedSourceCache.get(path);
    } catch (error) {
      sharedSourceCache.delete(path);
      throw error;
    }
  }

  async function resolveAssetViews(asset, sourceMarkdown = null) {
    if (!asset) throw new Error('Asset metadata is unavailable');
    const [source, kernel, registry, researchSourceText] = await Promise.all([
      sourceMarkdown ?? fetchText(asset.path),
      fetchSharedSource('docs/template-library/GOVERNANCE-KERNEL.md'),
      fetchSharedSource('docs/template-library/SPECIALIST-CONTROLS.md'),
      fetchSharedSource('docs/template-library/research-sources.json')
    ]);
    const researchSources = JSON.parse(researchSourceText);
    return {
      source,
      complete: composeAssetMarkdown(asset, source, kernel, registry, researchSources),
      readable: composeAssetIntroductionMarkdown(asset, source, kernel, registry, researchSources)
    };
  }

  async function copyReadyAssetBody(asset, sourceMarkdown = null) {
    const complete = (await resolveAssetViews(asset, sourceMarkdown)).complete;
    return splitComposedAssetMarkdown(complete).prompt;
  }

  function announce(message) {
    announcements.textContent = '';
    window.setTimeout(() => { announcements.textContent = message; }, 10);
  }

  function clearAssetSearchParam() {
    const url = new URL(window.location.href);
    if (!url.searchParams.has('assetSearch')) return;
    url.searchParams.delete('assetSearch');
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
  }

  function setBackgroundUnavailable(unavailable) {
    for (const region of backgroundRegions) {
      if ('inert' in region) {
        region.inert = unavailable;
        continue;
      }
      if (unavailable) {
        region.setAttribute('aria-hidden', 'true');
        region.querySelectorAll(FOCUSABLE_SELECTOR).forEach((element) => {
          fallbackTabIndexes.set(element, element.getAttribute('tabindex'));
          element.setAttribute('tabindex', '-1');
        });
      } else {
        region.removeAttribute('aria-hidden');
        region.querySelectorAll(FOCUSABLE_SELECTOR).forEach((element) => {
          const previous = fallbackTabIndexes.get(element);
          if (previous === null) element.removeAttribute('tabindex');
          else if (previous !== undefined) element.setAttribute('tabindex', previous);
          fallbackTabIndexes.delete(element);
        });
      }
    }
  }

  function render() {
    const filtered = filterAssets(assets, search.value, activeFilter);
    status.textContent = `${filtered.length} asset${filtered.length === 1 ? '' : 's'} shown`;
    if (!filtered.length) {
      grid.innerHTML = `
        <div class="asset-empty-state">
          <p class="eyebrow">No matching assets</p>
          <h3>Try a broader search or switch the filter.</h3>
          <p>Clear the query to return to the complete catalogue.</p>
          <button type="button" data-clear-search>Clear search</button>
        </div>`;
      return;
    }

    grid.innerHTML = filtered.map((asset) => `
      <article class="asset-card" data-type="${escapeAttribute(asset.type)}">
        <div class="asset-card-head">
          <span class="asset-type"><span class="asset-type-icon" aria-hidden="true">${typeIcon(asset.type)}</span>${getTypeLabel(asset.type)}</span>
          <span class="asset-category" style="${categoryStyle(asset.category)}">${escapeHtml(getCategoryLabel(asset.category))}</span>
        </div>
        <h3>${escapeHtml(asset.title)}</h3>
        <p>${escapeHtml(asset.summary)}</p>
        <div class="asset-actions">
          <button type="button" data-preview-path="${escapeAttribute(asset.path)}">Open ${escapeHtml(asset.type)}</button>
          <a href="${escapeAttribute(renderedDocumentPath(asset.path))}">Read page</a>
          <a href="${escapeAttribute(asset.path)}" download>Download Markdown</a>
          <button type="button" data-copy-path="${escapeAttribute(asset.path)}">Copy ${escapeHtml(asset.type)} body</button>
        </div>
      </article>`).join('');
  }

  function closePreview() {
    modal.hidden = true;
    documentRef.body.classList.remove('modal-open');
    setBackgroundUnavailable(false);
    activePreviewViews = { readable: '', complete: '', source: '' };
    activePreviewAsset = null;
    activePreviewCopyText = '';
    activePreviewCopyDescription = '';
    lastPreviewTrigger?.focus();
    lastPreviewTrigger = null;
  }

  function renderPreviewLayout({ introduction, prompt, references, promptHeading, copyDescription }) {
    activePreviewCopyText = prompt;
    activePreviewCopyDescription = copyDescription;
    content.innerHTML = `
      <section class="asset-preview-introduction" aria-label="Introduction">
        ${renderMarkdown(introduction)}
      </section>
      <section class="asset-prompt-section" aria-labelledby="asset-prompt-title">
        <div class="asset-prompt-heading">
          <h3 id="asset-prompt-title">${escapeHtml(promptHeading)}</h3>
          <button class="prompt-copy-button" type="button" data-copy-preview aria-label="Copy ${escapeAttribute(copyDescription.toLowerCase())}" title="Copy ${escapeAttribute(copyDescription.toLowerCase())}">
            ${copyIconMarkup()}
          </button>
        </div>
        <pre class="asset-prompt-code" tabindex="0" aria-label="${escapeAttribute(promptHeading)} code"><code data-prompt-code>${escapeHtml(prompt)}</code></pre>
      </section>
      <section class="asset-preview-references" data-asset-references aria-label="References">
        ${renderMarkdown(references)}
      </section>`;
    content.scrollTop = 0;
  }

  function renderAssetPreview(views) {
    const typeLabel = getTypeLabel(activePreviewAsset.type);
    const separated = splitComposedAssetMarkdown(views.complete);
    meta.textContent = `${typeLabel} · applicability, agent-ready ${activePreviewAsset.type} body, and research references · ${activePreviewAsset.path}`;
    renderPreviewLayout({
      introduction: views.readable,
      prompt: separated.prompt,
      references: separated.references.replace(/^## References$/m, '### References'),
      promptHeading: `${typeLabel} body`,
      copyDescription: `${typeLabel} body`
    });
  }

  function showSourceFallback(source) {
    const typeLabel = getTypeLabel(activePreviewAsset.type);
    meta.textContent = `${typeLabel} source · shared dependencies unavailable · ${activePreviewAsset.path}`;
    renderPreviewLayout({
      introduction: `### Source module\n\nShared governance dependencies could not be loaded, so a standalone ${activePreviewAsset.type} could not be assembled. The authoring source is shown below.`,
      prompt: source,
      references: `### References\n\n- [Download source](${activePreviewAsset.path})`,
      promptHeading: `${typeLabel} source`,
      copyDescription: `${typeLabel} source`
    });
  }

  async function openPreview(path, trigger) {
    const asset = assets.find((item) => item.path === path);
    lastPreviewTrigger = trigger;
    activePreviewViews = { readable: '', complete: '', source: '' };
    activePreviewAsset = asset ?? null;
    activePreviewCopyText = '';
    activePreviewCopyDescription = '';
    title.textContent = asset?.title || 'Template preview';
    meta.textContent = asset ? `${getTypeLabel(asset.type)} · ${getCategoryLabel(asset.category)} · ${asset.path}` : path;
    content.innerHTML = '<p class="markdown-loading">Loading markdown preview…</p>';
    modal.hidden = false;
    documentRef.body.classList.add('modal-open');
    setBackgroundUnavailable(true);
    closeButton.focus();

    try {
      const source = await fetchText(path);
      activePreviewViews.source = source;
      try {
        activePreviewViews = await resolveAssetViews(asset, source);
        renderAssetPreview(activePreviewViews);
      } catch (error) {
        showSourceFallback(source);
        announce('Shared prompt dependencies could not be resolved. The source module is shown instead.');
      }
    } catch (error) {
      content.innerHTML = `
        <div class="asset-empty-state" role="status">
          <p class="eyebrow">Preview unavailable</p>
          <h3>The Markdown could not be loaded.</h3>
          <p><a href="${escapeAttribute(path)}" download>Download source</a>, or refresh and try again.</p>
        </div>`;
    }
  }

  async function writeClipboard(text) {
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (error) {
        // Continue to the local fallback for restricted clipboard contexts.
      }
    }
    const scratch = documentRef.createElement('textarea');
    scratch.value = text;
    scratch.setAttribute('readonly', '');
    scratch.style.position = 'fixed';
    scratch.style.left = '-9999px';
    documentRef.body.append(scratch);
    scratch.select();
    try {
      return documentRef.execCommand('copy');
    } catch (error) {
      return false;
    } finally {
      scratch.remove();
    }
  }

  async function copyAsset(path, button) {
    const original = button.textContent;
    try {
      const asset = assets.find((item) => item.path === path);
      const copied = await writeClipboard(await copyReadyAssetBody(asset));
      if (!copied) throw new Error('Clipboard unavailable');
      button.textContent = 'Copied';
      announce(`${getTypeLabel(asset.type)} body copied to the clipboard, ready to paste.`);
    } catch (error) {
      button.textContent = 'Open file instead';
      announce('Copy is unavailable. Open or download the Markdown file instead.');
    } finally {
      window.setTimeout(() => { button.textContent = original; }, 1600);
    }
  }

  function trapDialogFocus(event) {
    if (event.key !== 'Tab' || modal.hidden) return;
    const focusable = Array.from(dialog.querySelectorAll(FOCUSABLE_SELECTOR)).filter((element) => !element.hidden);
    if (!focusable.length) {
      event.preventDefault();
      dialog.focus();
      return;
    }
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && documentRef.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && documentRef.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function attachEvents() {
    grid.addEventListener('click', (event) => {
      const clear = event.target.closest('button[data-clear-search]');
      if (clear) {
        search.value = '';
        clearAssetSearchParam();
        render();
        search.focus();
        return;
      }
      const preview = event.target.closest('button[data-preview-path]');
      if (preview) {
        openPreview(preview.dataset.previewPath, preview);
        return;
      }
      const copy = event.target.closest('button[data-copy-path]');
      if (copy) copyAsset(copy.dataset.copyPath, copy);
    });

    modal.addEventListener('click', async (event) => {
      if (event.target.closest('[data-close-preview]')) {
        closePreview();
        return;
      }
      const copyPreview = event.target.closest('[data-copy-preview]');
      if (!copyPreview) return;
      try {
        const copied = activePreviewCopyText ? await writeClipboard(activePreviewCopyText) : false;
        if (!copied) throw new Error('Clipboard unavailable');
        copyPreview.classList.add('is-copied');
        announce(`${activePreviewCopyDescription} copied to the clipboard, ready to paste.`);
        window.setTimeout(() => copyPreview.classList.remove('is-copied'), 1600);
      } catch (error) {
        announce('Copy is unavailable. Use the reference link instead.');
      }
    });
    documentRef.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !modal.hidden) {
        event.preventDefault();
        closePreview();
        return;
      }
      trapDialogFocus(event);
    });
    search.addEventListener('input', render);
    filterButtons.forEach((button) => button.addEventListener('click', () => {
      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      activeFilter = button.dataset.filter;
      render();
    }));
  }

  async function init() {
    if (initialSearch) search.value = initialSearch;
    attachEvents();
    try {
      const response = await fetch('docs/template-library/assets.json');
      if (!response.ok) throw new Error(`Manifest returned ${response.status}`);
      const data = await response.json();
      if (!Array.isArray(data)) throw new Error('Manifest root is not an array');
      assets = data;
      render();
    } catch (error) {
      status.textContent = 'Could not load the asset manifest. Open the rendered documentation index or catalogue instead.';
    }
  }

  return { closePreview, init, openPreview, render };
}

createSiteApp().init();
