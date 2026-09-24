import { expect, test } from 'playwright/test';

const route = '/learning/letters-and-sounds';

test('EDU-B00: the existing home page links to the clearly labeled draft preview', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Letters & Sounds · English draft preview' }).click();
  await expect(page.getByRole('heading', { name: 'Letters & Sounds' })).toBeVisible();
  await expect(page.getByText('ENGLISH DRAFT · HUMAN REVIEW PENDING')).toBeVisible();
});

test('EDU-B01: the English draft works as a guest without API or browser-storage writes', async ({ page }) => {
  const remoteRequests: string[] = [];
  page.on('request', (request) => {
    const url = new URL(request.url());
    if (url.pathname.startsWith('/api/') || !['localhost', '127.0.0.1'].includes(url.hostname)) {
      remoteRequests.push(request.url());
    }
  });

  await page.goto(route);
  await expect(page.getByRole('heading', { name: 'Letters & Sounds' })).toBeVisible();
  await expect(page.getByText('ENGLISH DRAFT · HUMAN REVIEW PENDING')).toBeVisible();
  await expect(page.getByText('These English examples and any built-in device voice still need qualified literacy')).toBeVisible();
  await page.getByRole('button', { name: 'Begin Sound Safari' }).click();
  await expect(page.getByRole('heading', { name: 'Which picture begins like “moon”?' })).toBeVisible();
  await expect(page.evaluate(() => ({
    local: localStorage.length,
    session: sessionStorage.length,
    cookies: document.cookie,
  }))).resolves.toEqual({ local: 0, session: 0, cookies: '' });
  expect(remoteRequests).toEqual([]);
});

test('EDU-B02: initial-sound activity gives retry feedback and advances on its fixed answer', async ({ page }) => {
  await page.goto(route);
  await page.getByRole('button', { name: 'Begin Sound Safari' }).click();
  await page.getByRole('button', { name: 'Choose sun' }).click();
  await expect(page.getByRole('status')).toContainText('Let’s try again');
  await page.getByRole('button', { name: 'Choose map' }).click();
  await expect(page.getByRole('heading', { name: 'Find the first letter in “moon”.' })).toBeVisible();
});

test('EDU-B03: sound-letter lesson must finish all three fixed correspondences before word building', async ({ page }) => {
  await page.goto(route);
  await page.getByRole('button', { name: 'Begin Sound Safari' }).click();
  await page.getByRole('button', { name: 'Choose map' }).click();

  await page.getByRole('button', { name: 'Choose letter m' }).click();
  await expect(page.getByRole('heading', { name: 'Find the first letter in “apple”.' })).toBeVisible();
  await page.getByRole('button', { name: 'Choose letter a' }).click();
  await expect(page.getByRole('heading', { name: 'Find the first letter in “top”.' })).toBeVisible();
  await page.getByRole('button', { name: 'Choose letter t' }).click();
  await expect(page.getByRole('heading', { name: 'Build the short word “mat”.' })).toBeVisible();
});

test('EDU-B04: word tiles work by buttons, reject a wrong order and finish without a mastery claim', async ({ page }) => {
  await page.goto(route);
  await page.getByRole('button', { name: 'Begin Sound Safari' }).click();
  await page.getByRole('button', { name: 'Choose map' }).click();
  await page.getByRole('button', { name: 'Choose letter m' }).click();
  await page.getByRole('button', { name: 'Choose letter a' }).click();
  await page.getByRole('button', { name: 'Choose letter t' }).click();

  await page.getByRole('button', { name: 'Add letter a' }).click();
  await page.getByRole('button', { name: 'Add letter m' }).click();
  await page.getByRole('button', { name: 'Add letter t' }).click();
  await page.getByRole('button', { name: 'Check the word' }).click();
  await expect(page.getByRole('status')).toContainText('not in the word’s order');
  await page.getByRole('button', { name: 'Remove last letter' }).click();
  await page.getByRole('button', { name: 'Remove last letter' }).click();
  await page.getByRole('button', { name: 'Remove last letter' }).click();
  await page.getByRole('button', { name: 'Add letter m' }).click();
  await page.getByRole('button', { name: 'Add letter a' }).click();
  await page.getByRole('button', { name: 'Add letter t' }).click();
  await page.getByRole('button', { name: 'Check the word' }).click();
  await expect(page.getByRole('heading', { name: 'You built “mat”.' })).toBeVisible();
  await expect(page.getByText('This activity does not show lasting reading skill or mastery.')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Grown-up recap for this visit' })).toBeVisible();
  await expect(page.getByText('Practice in this visit', { exact: false }).first()).toBeVisible();
  await expect(page.getByRole('button', { name: 'Finish and clear this visit' })).toBeVisible();
});

test('EDU-B05: pause, finish, keyboard use, offline use and mobile width are safe', async ({ page, context }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(route);
  const begin = page.getByRole('button', { name: 'Begin Sound Safari' });
  await expect(begin).toBeEnabled();
  await begin.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { name: 'Which picture begins like “moon”?' })).toBeVisible();
  await context.setOffline(true);
  await page.getByRole('button', { name: 'Pause' }).click();
  await expect(page.getByRole('heading', { name: 'Paused' })).toBeVisible();
  await page.getByRole('button', { name: 'Resume' }).click();
  await page.getByRole('button', { name: 'Home' }).click();
  await expect(page.getByRole('heading', { name: 'Start with sounds you can say together.' })).toBeVisible();
  await page.getByRole('button', { name: 'Begin Sound Safari' }).click();
  await page.getByRole('button', { name: 'Choose map' }).click();
  await expect(page.getByRole('heading', { name: 'Find the first letter in “moon”.' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await expect(page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length }))).resolves.toEqual({ local: 0, session: 0 });
});
