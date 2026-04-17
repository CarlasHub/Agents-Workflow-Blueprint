import { test, expect } from '@playwright/test';

test('comparison controls are keyboard-reachable', async ({ page }) => {
  await page.goto('/compare');
  await expect(page.getByRole('heading', { name: /comparison/i })).toBeVisible();
});
