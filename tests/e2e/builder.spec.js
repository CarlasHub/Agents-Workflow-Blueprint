import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { strFromU8, unzipSync } from 'fflate';

async function openBuilder(page) {
  await page.goto('./build-project/');
  await page.getByRole('button', { name: 'Start build' }).click();
  await expect(page.locator('#project-form')).toBeVisible();
}

test('builder landing page loads', async ({ page }) => {
  await page.goto('./build-project/');
  await expect(page).toHaveTitle('Build project | Agent Workflow Blueprint');
  await expect(page.getByRole('heading', { name: /Build a governed agent or project/ })).toBeVisible();
});

test('project type changes update the preview', async ({ page }) => {
  await openBuilder(page);
  await page.getByText('Agent Workflow', { exact: true }).click();
  await expect(page.locator('.preview-panel .status-chip')).toHaveText('Agent Workflow');
  await expect(page.locator('.preview-panel h2')).toContainText('governed-agent-project.zip');
});

test('approval fields remain disabled until explicit approval is enabled', async ({ page }) => {
  await openBuilder(page);
  const approver = page.getByLabel('Approver', { exact: true });
  const date = page.getByLabel('Date', { exact: true });
  await expect(approver).toBeDisabled();
  await expect(date).toBeDisabled();
  await page.getByRole('checkbox', { name: /Include human implementation approval/ }).check();
  await expect(approver).toBeEnabled();
  await expect(date).toBeEnabled();
  await expect(date).toHaveValue('');
});

test('invalid fields expose connected errors and focus the first invalid control', async ({ page }) => {
  await openBuilder(page);
  const name = page.getByRole('textbox', { name: 'Project name', exact: true });
  await name.fill('');
  await page.getByRole('button', { name: 'Build project and assemble ZIP' }).click();
  await expect(name).toBeFocused();
  await expect(name).toHaveAttribute('aria-invalid', 'true');
  await expect(name).toHaveAttribute('aria-describedby', /field-projectName-error/);
  await expect(page.locator('#field-projectName-error')).toBeVisible();
  await expect(page.locator('#builder-error-summary')).toContainText('Enter a project name');
});

test('dangerous project names are rejected without losing entered data', async ({ page }) => {
  await openBuilder(page);
  const name = page.getByRole('textbox', { name: 'Project name', exact: true });
  const owner = page.getByRole('textbox', { name: 'Owner', exact: true });
  await name.fill('../escape');
  await owner.fill('Fixture owner');
  await page.getByRole('button', { name: 'Build project and assemble ZIP' }).click();
  await expect(name).toHaveAttribute('aria-invalid', 'true');
  await expect(owner).toHaveValue('Fixture owner');
  await expect(page.locator('#field-projectName-error')).toContainText('Remove path characters');
});

test('optional files can be removed and restored', async ({ page }) => {
  await openBuilder(page);
  const remove = page.locator('.remove-file:not([data-essential-file])').first();
  const path = await remove.getAttribute('data-remove-file');
  await remove.click();
  await expect(page.locator(`[data-restore-file="${path}"]`)).toBeVisible();
  await page.locator(`[data-restore-file="${path}"]`).click();
  await expect(page.locator(`[data-remove-file="${path}"]`)).toBeVisible();
  await expect(page.locator('#builder-status')).toContainText('restored');
});

test('essential governance files require confirmation before exclusion', async ({ page }) => {
  await openBuilder(page);
  const remove = page.locator('.remove-file[data-essential-file="true"]').first();
  const path = await remove.getAttribute('data-remove-file');
  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toContain('essential governance file');
    await dialog.dismiss();
  });
  await remove.click();
  await expect(page.locator(`[data-remove-file="${path}"]`)).toBeVisible();
});

test('explicit approval requires a supplied date and required approval fields', async ({ page }) => {
  await openBuilder(page);
  await page.getByRole('checkbox', { name: /Include human implementation approval/ }).check();
  await page.getByLabel('Approver', { exact: true }).fill('Example approver');
  await page.getByLabel('Role', { exact: true }).fill('Project owner');
  await page.getByLabel('Date', { exact: true }).fill('');
  await page.getByRole('button', { name: 'Build project and assemble ZIP' }).click();
  await expect(page.getByLabel('Date', { exact: true })).toBeFocused();
  await expect(page.locator('#field-approvalDate-error')).toContainText('Complete this field');
});

test('builder completes assembly and downloads an inspectable ZIP', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await openBuilder(page);
  await page.getByRole('textbox', { name: 'Project name', exact: true }).fill('Fixture Café');
  await page.getByRole('button', { name: 'Build project and assemble ZIP' }).click();
  const downloadButton = page.getByRole('button', { name: /Get project ZIP$/ });
  await expect(downloadButton).toBeEnabled();
  await expect(page.locator('#builder-status')).toContainText('Download is available');

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    downloadButton.click()
  ]);
  const path = await download.path();
  const bytes = await readFile(path);
  const entries = unzipSync(bytes);
  const names = Object.keys(entries);
  expect(names.length).toBeGreaterThan(50);
  expect(names.every((name) => name.startsWith('fixture-cafe/'))).toBe(true);
  expect(names.some((name) => name.startsWith('/') || name.includes('../'))).toBe(false);
  expect(new Set(names).size).toBe(names.length);
  expect(names).toContain('fixture-cafe/docs/governance/09-human-approval-record.md');
  expect(names).toContain('fixture-cafe/starter-manifest.json');

  const manifest = JSON.parse(strFromU8(entries['fixture-cafe/starter-manifest.json']));
  expect(manifest.project_name).toBe('Fixture Café');
  expect(manifest.approved_for_implementation).toBe(false);
  expect(manifest.included_files).toContain('starter-manifest.json');
  await expect(page.getByRole('heading', { name: 'fixture-cafe.zip' })).toBeVisible();
  await expect(page.getByText('It is a starter scaffold, not a validated deployed system.')).toBeVisible();
});

test('builder has no horizontal overflow at narrow width', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await openBuilder(page);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});
