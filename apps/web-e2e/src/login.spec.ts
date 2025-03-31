import { expect, test } from '@playwright/test';

test('shows page elements', async ({ page }) => {
  await page.goto('/login');
  await expect(page).toHaveTitle('Notes - Login');
  await expect(page.getByRole('heading', { name: 'Welcome to Notes' })).toBeVisible();
  await expect(page.getByText('Please log in to continue')).toBeVisible();
  await expect(page.getByTestId('email-input')).toBeVisible();
  await expect(page.getByTestId('password-input')).toBeVisible();
  await expect(page.getByTestId('signup-link')).toBeVisible();
  await expect(page.getByTestId('forgot-password-link')).toBeVisible();
  const logInButton = page.getByTestId('login-button');
  await expect(logInButton).toBeVisible();
  await expect(logInButton).toHaveText('Log in');
  await expect(page.getByTestId('login-with-google-button')).toBeVisible();
});
