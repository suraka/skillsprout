import { expect, test, type Page } from '@playwright/test';
import { loadStagingConfig } from '../../scripts/staging-test-config.mjs';

const staging = loadStagingConfig(process.env);

async function submitValidCredentials(page: Page) {
  await page.getByRole('button', { name: 'Parent sign in' }).click();
  await page.getByLabel('Email').fill(staging.parentAEmail);
  await page.getByLabel('Password').fill(staging.parentAPassword);
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
}

async function signInAndLoadAccount(page: Page) {
  const meResponse = page.waitForResponse((response) => (
    new URL(response.url()).pathname.endsWith('/api/v1/me')
  ));
  await submitValidCredentials(page);
  expect((await meResponse).ok()).toBeTruthy();
  await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible();
}

async function expireTokenAfterAuthenticatedMe(page: Page) {
  await page.route('**/api/v1/me', async (route) => {
    const response = await route.fetch();
    await page.evaluate(() => {
      const now = Date.now();
      Date.now = () => now + 3_541_000;
    });
    await route.fulfill({ response });
  });
}

async function expireTokenAfterAccountLoad(page: Page) {
  await page.evaluate(() => {
    const currentTime = Date.now.bind(Date);
    Date.now = () => currentTime() + 3_541_000;
  });
}

test('staging runtime config matches allowlist', async ({ page }) => {
  await page.goto('/');
  const response = await page.request.get('/api/config');

  expect(response.ok()).toBeTruthy();
  const runtimeConfig = await response.json() as {
    apiUrl?: unknown;
    firebaseApiKey?: unknown;
  };
  expect(runtimeConfig.apiUrl).toBe(staging.apiOrigin);
  expect(runtimeConfig.firebaseApiKey).toBe(staging.firebaseWebApiKey);
});

test('guardian signs in and loads account', async ({ page }) => {
  await page.goto('/');
  await signInAndLoadAccount(page);
});

test('invalid credentials stay signed out', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Parent sign in' }).click();
  await page.getByLabel('Email').fill(`invalid-${Date.now()}@example.test`);
  await page.getByLabel('Password').fill('not-a-valid-parent-password');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();

  await expect(page.getByRole('alert')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign out' })).toHaveCount(0);
});

test('token refresh succeeds before API request', async ({ page }) => {
  let refreshRequests = 0;
  await expireTokenAfterAuthenticatedMe(page);
  await page.route('https://securetoken.googleapis.com/**', async (route) => {
    refreshRequests += 1;
    await route.continue();
  });
  await page.goto('/');
  await signInAndLoadAccount(page);

  await expect.poll(() => refreshRequests).toBeGreaterThan(0);
});

test('ordinary API failures preserve private state', async ({ page }) => {
  await page.goto('/');
  await page.route('**/api/v1/courses', async (route) => {
    await route.fulfill({
      status: 503,
      contentType: 'application/json',
      body: JSON.stringify({ detail: 'Temporary service interruption' }),
    });
  });

  await signInAndLoadAccount(page);

  await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible();
  await expect(page.getByRole('alert')).toBeVisible();
});

test('refresh rejection clears private state', async ({ page }) => {
  await expireTokenAfterAuthenticatedMe(page);
  await page.route('https://securetoken.googleapis.com/**', async (route) => {
    await route.fulfill({
      status: 400,
      contentType: 'application/json',
      body: JSON.stringify({ error: { message: 'TOKEN_EXPIRED' } }),
    });
  });
  await page.goto('/');
  const meResponse = page.waitForResponse((response) => (
    new URL(response.url()).pathname.endsWith('/api/v1/me')
  ));
  await submitValidCredentials(page);

  expect((await meResponse).ok()).toBeTruthy();
  await expect(page.getByRole('alert')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign out' })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Parent sign in' })).toBeVisible();
});

test('later refresh rejection clears family state before learner write', async ({ page }) => {
  await page.goto('/parents');
  await signInAndLoadAccount(page);
  await expect(page.getByRole('button', { name: 'Add a learner' })).toBeVisible();

  let learnerWrites = 0;
  await page.route('**/api/v1/students', async (route) => {
    if (route.request().method() === 'POST') learnerWrites += 1;
    await route.continue();
  });
  await page.route('https://securetoken.googleapis.com/**', async (route) => {
    await route.fulfill({
      status: 400,
      contentType: 'application/json',
      body: JSON.stringify({ error: { message: 'TOKEN_EXPIRED' } }),
    });
  });
  await expireTokenAfterAccountLoad(page);

  await page.getByRole('button', { name: 'Add a learner' }).click();
  await page.getByLabel('First name or nickname').fill('Staging learner');
  await page.getByRole('button', { name: 'Add learner', exact: true }).click();

  await expect(page.getByRole('alert')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign out' })).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Your family’s next chapter starts here.' })).toBeVisible();
  expect(learnerWrites).toBe(0);
});

test('logout and reload clear family state', async ({ page }) => {
  await page.goto('/');
  await signInAndLoadAccount(page);
  await page.getByRole('button', { name: 'Sign out' }).click();
  await page.reload();

  await expect(page.getByRole('button', { name: 'Parent sign in' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign out' })).toHaveCount(0);
  await page.getByRole('link', { name: 'For parents', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Your family’s next chapter starts here.' })).toBeVisible();
});
