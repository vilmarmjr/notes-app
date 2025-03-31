import { AuthErrors } from '@common/models';
import { faker } from '@faker-js/faker';
import { expect, test } from '@playwright/test';

test('shows page elements', async ({ page }) => {
  await page.goto('/signup');
  await expect(page).toHaveTitle('Notes - Sign up');
  await expect(page.getByRole('heading', { name: 'Create your account' })).toBeVisible();
  await expect(
    page.getByText('Sign up to start organizing your notes and boost your productivity.'),
  ).toBeVisible();
  await expect(page.getByTestId('email-input')).toBeVisible();
  await expect(page.getByTestId('password-input')).toBeVisible();
  const loginLink = page.getByTestId('login-link');
  await expect(loginLink).toBeVisible();
  await expect(loginLink).toHaveAttribute('href', '/login');
  await expect(loginLink).toHaveText('Login');
  const signupButton = page.getByTestId('signup-button');
  await expect(signupButton).toBeVisible();
  await expect(signupButton).toHaveText('Sign up');
  await expect(page.getByTestId('login-with-google-button')).toBeVisible();
});

test('disables submit button when form is invalid', async ({ page }) => {
  await page.goto('/signup');
  const button = page.getByTestId('signup-button');
  await expect(button).toBeDisabled();
  await page.getByLabel('Email address').fill(faker.word.noun());
  await expect(button).toBeDisabled();
  await page.getByLabel('Password').fill(faker.word.noun({ length: 7 }));
  await expect(button).toBeDisabled();
  await page.getByLabel('Email address').fill(faker.internet.email());
  await page.getByLabel('Password').fill(faker.word.noun({ length: 8 }));
  await expect(button).toBeEnabled();
});

test('shows toast when trying to sign up with an email which is already taken', async ({
  page,
}) => {
  await page.route('*/**/api/signup', async route => {
    await route.fulfill({
      json: {
        statusCode: 422,
        message: AuthErrors.EMAIL_IS_ALREADY_TAKEN,
      },
      status: 422,
    });
  });
  await page.goto('/signup');
  await page.getByLabel('Email address').fill(faker.internet.email());
  await page.getByLabel('Password').fill(faker.word.noun({ length: 8 }));
  await page.getByTestId('signup-button').click();
  await expect(page.getByText('Email is already taken')).toBeVisible();
});

test('signs up and navigates after success', async ({ page }) => {
  await page.route('*/**/api/signup', async route => {
    await route.fulfill({
      json: {
        id: faker.string.uuid(),
        email: faker.internet.email(),
      },
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
      },
      status: 200,
    });
  });
  await page.route('*/**/api/tags', async route => {
    await route.fulfill({
      json: {
        tags: [],
      },
      status: 200,
    });
  });
  await page.route('*/**/api/settings', async route => {
    await route.fulfill({
      json: {},
      status: 200,
    });
  });
  await page.goto('/signup');
  await page.getByLabel('Email address').fill(faker.internet.email());
  await page.getByLabel('Password').fill(faker.word.noun({ length: 8 }));
  await page.getByTestId('signup-button').click();
  await page.waitForURL('/notes?filter=all');
  expect(page.url()).toContain('/notes?filter=all');
});
