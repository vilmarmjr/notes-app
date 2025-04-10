import {
  AuthErrors,
  ErrorResponse,
  GetTagsResponseDto,
  LogInResponseDto,
  PaginateNotesResponseDto,
  SettingsResponseDto,
} from '@common/models';
import { faker } from '@faker-js/faker';
import { expect, test } from '@playwright/test';

test('shows page elements', async ({ page }) => {
  await page.goto('/login');
  await expect(page).toHaveTitle('Notes - Login');
  await expect(page.getByRole('heading', { name: 'Welcome to Notes' })).toBeVisible();
  await expect(page.getByText('Please log in to continue')).toBeVisible();
  await expect(page.getByTestId('email-input')).toBeVisible();
  await expect(page.getByTestId('password-input')).toBeVisible();
  const signupLink = page.getByTestId('signup-link');
  await expect(signupLink).toBeVisible();
  await expect(signupLink).toHaveAttribute('href', '/signup');
  await expect(signupLink).toHaveText('Sign up');
  const forgotPasswordLink = page.getByTestId('forgot-password-link');
  await expect(forgotPasswordLink).toBeVisible();
  await expect(forgotPasswordLink).toHaveAttribute('href', '/recover-password');
  const logInButton = page.getByTestId('login-button');
  await expect(logInButton).toBeVisible();
  await expect(logInButton).toHaveText('Log in');
  await expect(page.getByTestId('login-with-google-button')).toBeVisible();
});

test('disables submit button when form is invalid', async ({ page }) => {
  await page.goto('/login');
  const button = page.getByTestId('login-button');
  await expect(button).toBeDisabled();
  await page.getByLabel('Email address').fill(faker.word.noun());
  await expect(button).toBeDisabled();
  await page.getByLabel('Password').fill(faker.word.noun());
  await expect(button).toBeDisabled();
  await page.getByLabel('Email address').fill(faker.internet.email());
  await expect(button).toBeEnabled();
});

test('shows toast when trying to log in with invalid credentials', async ({ page }) => {
  await page.route('*/**/api/auth/login', async route => {
    await route.fulfill({
      json: {
        statusCode: 422,
        message: AuthErrors.INCORRECT_EMAIL_OR_PASSWORD,
      } satisfies ErrorResponse,
      status: 422,
    });
  });
  await page.goto('/login');
  await page.getByLabel('Email address').fill(faker.internet.email());
  await page.getByLabel('Password').fill(faker.word.noun());
  await page.getByTestId('login-button').click();
  await expect(page.getByText('Incorrect email or password')).toBeVisible();
});

test('logs in and navigates after success', async ({ page }) => {
  await page.route('*/**/api/auth/login', async route => {
    await route.fulfill({
      json: {
        accessToken: faker.string.uuid(),
      } satisfies LogInResponseDto,
      status: 200,
    });
  });
  await page.route('*/**/api/notes?status=active&page=1', async route => {
    await route.fulfill({
      json: {
        page: 1,
        content: [],
        total: 0,
        last: true,
      } satisfies PaginateNotesResponseDto,
      status: 200,
    });
  });
  await page.route('*/**/api/tags', async route => {
    await route.fulfill({
      json: {
        tags: [],
      } satisfies GetTagsResponseDto,
      status: 200,
    });
  });
  await page.route('*/**/api/settings', async route => {
    await route.fulfill({
      json: {} satisfies SettingsResponseDto,
      status: 200,
    });
  });
  await page.goto('/login');
  await page.getByLabel('Email address').fill(faker.internet.email());
  await page.getByLabel('Password').fill(faker.word.noun());
  await page.getByTestId('login-button').click();
  await page.waitForURL('/notes?filter=all');
  expect(page.url()).toContain('/notes?filter=all');
});
