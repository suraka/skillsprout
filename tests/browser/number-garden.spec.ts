import { expect, test } from 'playwright/test';

const route = '/learning/number-garden';

test('EDU-MB00: Explore links to the clearly labeled Number Garden draft', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Number Garden · maths draft preview' }).click();
  await expect(page.getByRole('heading', { name: 'Number Garden' })).toBeVisible();
  await expect(page.getByText('EARLY MATHEMATICS · DRAFT · REVIEW STATUS IN NOTES')).toBeVisible();
});

test('EDU-MB01: counting, comparison and change activities recover from wrong answers', async ({ page }) => {
  await page.goto(route);
  await page.getByRole('button', { name: 'Begin Number Garden' }).click();

  const seeds = page.getByRole('group', { name: 'Five seeds to count' });
  const firstSeed = seeds.getByRole('button', { name: 'Seed not counted' }).first();
  await firstSeed.click();
  await page.getByRole('button', { name: 'Seed counted' }).first().click();
  await expect(page.getByRole('status')).toContainText('already counted');
  for (let index = 1; index < 5; index += 1) {
    await seeds.getByRole('button', { name: 'Seed not counted' }).first().click();
  }
  await expect(page.getByText('5 of 5 seeds touched once')).toBeVisible();
  await page.getByRole('button', { name: '4 seeds' }).click();
  await expect(page.getByRole('status')).toContainText('Count each seed once and try again');
  await page.getByRole('button', { name: '5 seeds' }).click();

  await expect(page.getByRole('heading', { name: 'The garden is empty. How many seeds are here?' })).toBeVisible();
  await page.getByRole('button', { name: '2 seeds' }).click();
  await expect(page.getByRole('status')).toContainText('number for no seeds');
  await page.getByRole('button', { name: '0 seeds' }).click();

  await expect(page.getByRole('heading', { name: 'Which number comes after three?' })).toBeVisible();
  await page.getByRole('button', { name: '3 seeds' }).click();
  await expect(page.getByRole('status')).toContainText('one step after three');
  await page.getByRole('button', { name: '4 seeds' }).click();

  await page.getByRole('button', { name: 'Choose group of 3 seeds' }).click();
  await expect(page.getByRole('status')).toContainText('count the seeds in each group');
  await page.getByRole('button', { name: 'Choose group of 4 seeds' }).click();

  await expect(page.getByRole('heading', { name: 'You counted, noticed zero, and compared groups.' })).toBeVisible();
  await page.getByRole('button', { name: 'Try optional operations practice' }).click();

  await expect(page.getByRole('heading', { name: 'Two groups join the garden. How many seeds are there altogether?' })).toBeVisible();
  await page.getByRole('button', { name: '4 seeds' }).click();
  await expect(page.getByRole('status')).toContainText('Count the two groups together');
  await page.getByRole('button', { name: '5 seeds' }).click();

  await expect(page.getByRole('heading', { name: 'Which two groups can make five seeds?' })).toBeVisible();
  await page.getByRole('button', { name: '2 + 4' }).click();
  await expect(page.getByRole('status')).toContainText('do not make five');
  await page.getByRole('button', { name: '2 + 3' }).click();

  await page.getByRole('button', { name: 'Add one seed' }).click();
  await expect(page.getByRole('img', { name: 'Garden after adding one: 3 seeds' })).toBeVisible();
  await page.getByRole('button', { name: '4 seeds' }).click();
  await expect(page.getByRole('status')).toContainText('Count the visible seeds and try again');
  await page.getByRole('button', { name: '3 seeds' }).click();

  await page.getByRole('button', { name: 'Take one seed away' }).click();
  await expect(page.getByRole('img', { name: 'Garden after taking one away: 3 seeds' })).toBeVisible();
  await page.getByRole('button', { name: '2 seeds' }).click();
  await expect(page.getByRole('status')).toContainText('Count the visible seeds and try again');
  await page.getByRole('button', { name: '3 seeds' }).click();
  await expect(page.getByRole('heading', { name: 'You explored number groups and changes.' })).toBeVisible();
  await expect(page.getByText('This describes practice in this visit. It is not a score or a measure of lasting math skill.')).toBeVisible();
  await page.getByRole('button', { name: 'Finish and clear this visit' }).click();
  await expect(page.getByRole('heading', { name: 'Count, notice zero, and compare groups.' })).toBeVisible();
});

test('EDU-MB02: guest math practice has no API, account, or browser-storage writes', async ({ page, context }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const externalRequests: string[] = [];
  page.on('request', (request) => {
    const url = new URL(request.url());
    if (url.pathname.startsWith('/api/') || !['localhost', '127.0.0.1'].includes(url.hostname)) {
      externalRequests.push(request.url());
    }
  });

  await page.goto(route);
  await page.getByRole('button', { name: 'Begin Number Garden' }).click();
  await page.getByRole('button', { name: 'Pause' }).click();
  await expect(page.getByRole('heading', { name: 'Paused' })).toBeVisible();
  await context.setOffline(true);
  await page.getByRole('button', { name: 'Resume' }).click();
  await page.getByRole('button', { name: 'Home' }).click();
  await expect(page.getByRole('heading', { name: 'Count, notice zero, and compare groups.' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await expect(page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length, cookies: document.cookie }))).resolves.toEqual({ local: 0, session: 0, cookies: '' });
  expect(externalRequests).toEqual([]);
});

test('EDU-MB03: MATH-03 equal groups, arrays, and fair sharing recover from wrong answers', async ({ page }) => {
  await page.goto(route);
  await page.getByRole('button', { name: 'Explore equal groups and sharing' }).click();

  await expect(page.getByRole('heading', { name: 'There are three equal groups with two seeds in each. How many seeds altogether?' })).toBeVisible();
  await page.getByRole('button', { name: '5 seeds' }).click();
  await expect(page.getByRole('status')).toContainText('Count the seeds in all three groups');
  await page.getByRole('button', { name: '6 seeds' }).click();

  await expect(page.getByRole('heading', { name: 'This array has two rows with three seeds in each row. How many seeds altogether?' })).toBeVisible();
  await page.getByRole('button', { name: '5 seeds' }).click();
  await expect(page.getByRole('status')).toContainText('Count both rows');
  await page.getByRole('button', { name: '6 seeds' }).click();

  await expect(page.getByRole('heading', { name: 'Share six seeds equally between two garden beds. How many seeds go in each bed?' })).toBeVisible();
  await page.getByRole('button', { name: '2 seeds' }).click();
  await expect(page.getByRole('status')).toContainText('Share the seeds one at a time');
  await page.getByRole('button', { name: '3 seeds' }).click();
  await expect(page.getByRole('heading', { name: 'You explored equal groups, rows, and fair sharing.' })).toBeVisible();
  await expect(page.getByText('This describes practice in this visit. It is not a score or a measure of lasting math skill.')).toBeVisible();
});

test('EDU-MB04: MATH-04 place value and equal fractions recover from wrong answers', async ({ page }) => {
  await page.goto(route);
  await page.getByRole('button', { name: 'Explore tens and fractions' }).click();

  await expect(page.getByRole('heading', { name: 'There is 1 ten and 4 ones. What number do they make?' })).toBeVisible();
  await page.getByRole('button', { name: '15 seeds' }).click();
  await expect(page.getByRole('status')).toContainText('Add the four single seeds');
  await page.getByRole('button', { name: '14 seeds' }).click();

  await expect(page.getByRole('heading', { name: 'Two of these four equal parts are shaded. What fraction is shaded?' })).toBeVisible();
  await page.getByRole('button', { name: '3/4' }).click();
  await expect(page.getByRole('status')).toContainText('Count the shaded parts');
  await page.getByRole('button', { name: '1/2' }).click();
  await expect(page.getByRole('heading', { name: 'You explored tens, ones, and equal parts.' })).toBeVisible();
  await page.getByRole('button', { name: 'Finish and clear this visit' }).click();
  await expect(page.getByRole('heading', { name: 'Count, notice zero, and compare groups.' })).toBeVisible();
});

test('EDU-MB05: MATH-04 connects tenths, decimals, and percent', async ({ page }) => {
  await page.goto(route);
  await page.getByRole('button', { name: 'Explore tenths and percent' }).click();

  await expect(page.getByRole('heading', { name: 'Five of ten equal parts are shaded. Which decimal shows five tenths?' })).toBeVisible();
  await page.getByRole('button', { name: '0.8' }).click();
  await expect(page.getByRole('status')).toContainText('Count five shaded parts');
  await page.getByRole('button', { name: '0.5' }).click();

  await expect(page.getByRole('heading', { name: 'Five of ten equal parts are shaded. What percent is shaded?' })).toBeVisible();
  await page.getByRole('button', { name: '20%' }).click();
  await expect(page.getByRole('status')).toContainText('one half of the bar');
  await page.getByRole('button', { name: '50%' }).click();
  await expect(page.getByRole('heading', { name: 'You connected equal parts, decimals, and percent.' })).toBeVisible();
  await expect(page.getByText('Five tenths, 0.5, and 50% describe the same amount.')).toBeVisible();
});

test('EDU-MB06: MATH-04 compares fraction amounts on a number line', async ({ page }) => {
  await page.goto(route);
  await page.getByRole('button', { name: 'Explore fractions on a number line' }).click();

  await expect(page.getByRole('heading', { name: 'Which fraction is farther right: one quarter or three quarters?' })).toBeVisible();
  await page.getByRole('button', { name: '1/4' }).click();
  await expect(page.getByRole('status')).toContainText('farther along the line from zero');
  await page.getByRole('button', { name: '3/4' }).click();
  await expect(page.getByRole('heading', { name: 'You compared fractions on a number line.' })).toBeVisible();
  await expect(page.getByRole('status')).toContainText('Three quarters is farther right');
});

test('EDU-MB07: MATH-05 identifies a 2D shape and compares equal screen units', async ({ page }) => {
  await page.goto(route);
  await page.getByRole('button', { name: 'Explore shapes and screen units' }).click();

  await expect(page.getByRole('heading', { name: 'Which shape has three straight sides?' })).toBeVisible();
  await page.getByRole('button', { name: 'Square' }).click();
  await expect(page.getByRole('status')).toContainText('Count only the straight sides');
  await page.getByRole('button', { name: 'Triangle' }).click();

  await expect(page.getByRole('heading', { name: 'Which strip is longer when each equal block is one screen unit?' })).toBeVisible();
  await expect(page.getByRole('img', { name: 'First strip: 3 equal screen units' })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Second strip: 5 equal screen units' })).toBeVisible();
  await page.getByRole('button', { name: 'Three screen units' }).click();
  await expect(page.getByRole('status')).toContainText('Count the equal blocks');
  await page.getByRole('button', { name: 'Five screen units' }).click();
  await expect(page.getByRole('heading', { name: 'You found a triangle and compared measured lengths.' })).toBeVisible();
  await expect(page.getByText('The strip model uses equal on-screen units. It is not a calibrated real-world measuring tool.')).toBeVisible();
});
