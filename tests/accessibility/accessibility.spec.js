import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '@playwright/test';

async function expectNoSeriousViolations(page, label) {
  const results = await new AxeBuilder({ page }).analyze();
  const serious = results.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact));
  expect(serious, `${label}: ${serious.map((item) => `${item.id} (${item.nodes.length})`).join(', ')}`).toEqual([]);
}

async function openBuilder(page) {
  await page.goto('./build-project/');
  await page.getByRole('button', { name: 'Start build' }).click();
}

test('homepage has no serious automated accessibility violations', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#asset-status')).toHaveText('100 assets shown');
  await expectNoSeriousViolations(page, 'homepage');
});

test('library controls have no serious automated accessibility violations', async ({ page }) => {
  await page.goto('./');
  await page.getByRole('searchbox', { name: 'Search assets' }).fill('accessibility');
  await page.getByRole('button', { name: 'Prompts' }).click();
  await expectNoSeriousViolations(page, 'library controls');
});

test('static asset index has no serious automated accessibility violations', async ({ page }) => {
  await page.goto('./library/');
  await expect(page.locator('.asset-card')).toHaveCount(100);
  await expectNoSeriousViolations(page, 'static asset index');
});

test('rendered guide has no serious automated accessibility violations', async ({ page }) => {
  await page.goto('./docs/template-library/CODEX-USAGE-GUIDE.html');
  await expect(page.getByRole('heading', { level: 1, name: 'Codex Usage Guide' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Download Markdown source' })).toHaveAttribute('download', '');
  await expectNoSeriousViolations(page, 'rendered guide');
});

test('rendered prompt has no serious automated accessibility violations', async ({ page }) => {
  await page.goto('./docs/template-library/prompts/12-bug-root-cause-remediation-prompt.html');
  await expect(page.getByRole('button', { name: 'Copy prompt body' })).toBeVisible();
  await expect(page.locator('#document-agent-body')).toBeVisible();
  await expectNoSeriousViolations(page, 'rendered prompt');
});

test('privacy and analytics controls have no serious automated accessibility violations', async ({ page }) => {
  await page.goto('./privacy.html');
  await expect(page.getByRole('region', { name: 'Help improve this project?' })).toBeVisible();
  await expectNoSeriousViolations(page, 'privacy and analytics controls');
});

test('preview modal has no serious automated accessibility violations', async ({ page }) => {
  await page.goto('./');
  await page.locator('[data-preview-path]').first().click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.locator('[data-markdown-preview-content]')).toHaveAttribute('tabindex', '0');
  await expectNoSeriousViolations(page, 'preview modal');
});

test('builder landing state has no serious automated accessibility violations', async ({ page }) => {
  await page.goto('./build-project/');
  await expectNoSeriousViolations(page, 'builder landing');
});

test('builder form has no serious automated accessibility violations', async ({ page }) => {
  await openBuilder(page);
  await expectNoSeriousViolations(page, 'builder form');
});

test('builder preview has no serious automated accessibility violations', async ({ page }) => {
  await openBuilder(page);
  await page.getByText('Documentation System', { exact: true }).click();
  await expect(page.locator('.preview-panel .status-chip')).toHaveText('Documentation System');
  await expectNoSeriousViolations(page, 'builder preview');
});

test('builder assembly has no serious automated accessibility violations', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await openBuilder(page);
  await page.getByRole('button', { name: 'Build project and assemble ZIP' }).click();
  await expect(page.getByRole('button', { name: /Get project ZIP$/ })).toBeEnabled();
  await expectNoSeriousViolations(page, 'builder assembly');
});

test('builder success has no serious automated accessibility violations', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await openBuilder(page);
  await page.getByRole('button', { name: 'Build project and assemble ZIP' }).click();
  const downloadButton = page.getByRole('button', { name: /Get project ZIP$/ });
  const downloadPromise = page.waitForEvent('download');
  await downloadButton.click();
  await downloadPromise;
  await expect(page.getByText('Starter scaffold downloaded')).toBeVisible();
  await expectNoSeriousViolations(page, 'builder success');
});
