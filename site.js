import {
  composeAssetMarkdown,
  composeReadableAssetMarkdown,
  escapeAttribute,
  escapeHtml,
  filterAssets,
  getCategoryLabel,
  getTypeLabel,
  renderMarkdown,
  specialistControlHref
} from './site-utils.js';

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
  const download = documentRef.querySelector('[data-markdown-download]');
  const copyPreview = documentRef.querySelector('[data-copy-preview]');
  const copySource = documentRef.querySelector('[data-copy-source]');
  const previewModeButtons = Array.from(documentRef.querySelectorAll('[data-preview-mode]'));
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
    const [source, kernel, registry] = await Promise.all([
      sourceMarkdown ?? fetchText(asset.path),
      fetchSharedSource('docs/template-library/GOVERNANCE-KERNEL.md'),
      fetchSharedSource('docs/template-library/SPECIALIST-CONTROLS.md')
    ]);
    return {
      source,
      complete: composeAssetMarkdown(asset, source, kernel, registry),
      readable: composeReadableAssetMarkdown(asset, source, kernel, registry)
    };
  }

  async function completeAssetMarkdown(asset, sourceMarkdown = null) {
    return (await resolveAssetViews(asset, sourceMarkdown)).complete;
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
          <a href="${escapeAttribute(asset.path)}" download>Download</a>
          <button type="button" data-copy-path="${escapeAttribute(asset.path)}">Copy complete asset</button>
        </div>
      </article>`).join('');
  }

  function closePreview() {
    modal.hidden = true;
    documentRef.body.classList.remove('modal-open');
    setBackgroundUnavailable(false);
    activePreviewViews = { readable: '', complete: '', source: '' };
    activePreviewAsset = null;
    lastPreviewTrigger?.focus();
    lastPreviewTrigger = null;
  }

  function setPreviewMode(mode) {
    const markdown = activePreviewViews[mode];
    if (!markdown || !activePreviewAsset) return;
    previewModeButtons.forEach((button) => {
      const selected = button.dataset.previewMode === mode;
      button.setAttribute('aria-selected', String(selected));
      button.setAttribute('tabindex', selected ? '0' : '-1');
    });
    const typeLabel = getTypeLabel(activePreviewAsset.type);
    const labels = {
      readable: `${typeLabel} content · unique instructions first · ${activePreviewAsset.path}`,
      complete: `Full ${activePreviewAsset.type} · governance and resolved controls included once · ${activePreviewAsset.path}`
    };
    meta.textContent = labels[mode];
    const activeButton = previewModeButtons.find((button) => button.dataset.previewMode === mode);
    content.setAttribute('aria-labelledby', activeButton.id);
    renderPreviewMarkdown(markdown);
    content.scrollTop = 0;
  }

  function renderPreviewMarkdown(markdown) {
    content.innerHTML = renderMarkdown(markdown);
    content.querySelectorAll('strong').forEach((strong) => {
      const match = strong.textContent.trim().match(/^(SPC-[A-F0-9]{10}):$/);
      if (!match || strong.querySelector('a')) return;
      const link = documentRef.createElement('a');
      link.href = specialistControlHref(match[1]);
      link.target = '_blank';
      link.rel = 'noreferrer';
      link.textContent = match[1];
      link.setAttribute('aria-label', `${match[1]} specialist control definition`);
      strong.replaceChildren(link, ':');
    });
  }

  function setPreviewModesAvailable(availableModes) {
    previewModeButtons.forEach((button) => {
      const available = availableModes.includes(button.dataset.previewMode);
      button.disabled = !available;
      if (!available) button.setAttribute('aria-selected', 'false');
      if (activePreviewAsset) {
        const typeLabel = getTypeLabel(activePreviewAsset.type);
        button.textContent = button.dataset.previewMode === 'readable' ? typeLabel : `Full ${activePreviewAsset.type}`;
      }
    });
  }

  function showSourceFallback(source) {
    const sourceButton = previewModeButtons.find((button) => button.dataset.previewMode === 'readable');
    setPreviewModesAvailable(['readable']);
    sourceButton.textContent = `${getTypeLabel(activePreviewAsset.type)} source`;
    sourceButton.setAttribute('aria-selected', 'true');
    sourceButton.setAttribute('tabindex', '0');
    meta.textContent = `Source fallback · shared dependencies unavailable · ${activePreviewAsset.path}`;
    content.setAttribute('aria-labelledby', sourceButton.id);
    renderPreviewMarkdown(source);
    content.scrollTop = 0;
  }

  async function openPreview(path, trigger) {
    const asset = assets.find((item) => item.path === path);
    lastPreviewTrigger = trigger;
    activePreviewViews = { readable: '', complete: '', source: '' };
    activePreviewAsset = asset ?? null;
    title.textContent = asset?.title || 'Template preview';
    meta.textContent = asset ? `${getTypeLabel(asset.type)} · ${getCategoryLabel(asset.category)} · ${asset.path}` : path;
    download.href = path;
    content.innerHTML = '<p class="markdown-loading">Loading markdown preview…</p>';
    setPreviewModesAvailable([]);
    modal.hidden = false;
    documentRef.body.classList.add('modal-open');
    setBackgroundUnavailable(true);
    closeButton.focus();

    try {
      const source = await fetchText(path);
      activePreviewViews.source = source;
      try {
        activePreviewViews = await resolveAssetViews(asset, source);
        setPreviewModesAvailable(['readable', 'complete']);
        setPreviewMode('readable');
      } catch (error) {
        showSourceFallback(source);
        announce('Shared prompt dependencies could not be resolved. The source module is shown instead.');
      }
    } catch (error) {
      content.innerHTML = `
        <div class="asset-empty-state" role="status">
          <p class="eyebrow">Preview unavailable</p>
          <h3>The Markdown could not be loaded.</h3>
          <p>Use Download to save the source file, or refresh and try again.</p>
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
      const copied = await writeClipboard(await completeAssetMarkdown(asset));
      if (!copied) throw new Error('Clipboard unavailable');
      button.textContent = 'Copied';
      announce('Complete asset copied to the clipboard with shared governance and specialist controls included once.');
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

    modal.addEventListener('click', (event) => {
      if (event.target.closest('[data-close-preview]')) closePreview();
    });
    copySource.addEventListener('click', async () => {
      const copied = activePreviewViews.source ? await writeClipboard(activePreviewViews.source) : false;
      announce(copied ? 'Specialist source module copied to the clipboard.' : 'Copy is unavailable. Use Download instead.');
    });
    copyPreview.addEventListener('click', async () => {
      try {
        const composed = activePreviewViews.complete || (activePreviewViews.source
          ? await completeAssetMarkdown(activePreviewAsset, activePreviewViews.source)
          : null);
        const copied = composed ? await writeClipboard(composed) : false;
        announce(copied
          ? 'Complete asset copied to the clipboard with shared governance and specialist controls included once.'
          : 'Copy is unavailable. Use Download instead.');
      } catch (error) {
        announce('The full asset is unavailable. Copy the source module or use Download instead.');
      }
    });
    previewModeButtons.forEach((button) => button.addEventListener('click', () => {
      setPreviewMode(button.dataset.previewMode);
    }));
    previewModeButtons.forEach((button) => button.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const enabled = previewModeButtons.filter((item) => !item.disabled);
      if (!enabled.length) return;
      const current = enabled.indexOf(button);
      const next = event.key === 'Home'
        ? enabled[0]
        : event.key === 'End'
          ? enabled.at(-1)
          : enabled[(current + (event.key === 'ArrowRight' ? 1 : -1) + enabled.length) % enabled.length];
      next.focus();
      next.click();
    }));
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
