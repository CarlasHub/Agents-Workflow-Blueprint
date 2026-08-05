function announce(message) {
  const status = document.getElementById('document-status');
  if (!status) return;
  status.textContent = '';
  window.setTimeout(() => { status.textContent = message; }, 10);
}

async function writeClipboard(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Continue to the local fallback for restricted clipboard contexts.
    }
  }
  const scratch = document.createElement('textarea');
  scratch.value = text;
  scratch.setAttribute('readonly', '');
  scratch.style.position = 'fixed';
  scratch.style.left = '-9999px';
  document.body.append(scratch);
  scratch.select();
  try {
    return document.execCommand('copy');
  } catch {
    return false;
  } finally {
    scratch.remove();
  }
}

document.addEventListener('click', async (event) => {
  const button = event.target.closest('[data-copy-target]');
  if (!button) return;
  const target = document.getElementById(button.dataset.copyTarget);
  const text = target?.textContent ?? '';
  try {
    if (!text || !(await writeClipboard(text))) throw new Error('Clipboard unavailable');
    button.classList.add('is-copied');
    announce('Agent-ready body copied to the clipboard.');
    window.setTimeout(() => button.classList.remove('is-copied'), 1600);
  } catch {
    announce('Copy is unavailable. Select the code body or download the Markdown source.');
  }
});
