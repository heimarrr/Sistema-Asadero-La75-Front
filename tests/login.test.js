import { test, expect } from '@playwright/test';

test.describe('Login Page Tests', () => {
  test('should display login form', async ({ page }) => {
    await page.goto('https://example.com/login');
    await expect(page.getByRole('form', { name: 'Login Form' })).toBeVisible();
  });
});