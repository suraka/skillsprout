import { test, expect } from 'playwright/test';

test.beforeEach(async ({ page }) => {
  await page.route('**/api/config', route => route.fulfill({ json: { apiUrl: '', firebaseApiKey: '' } }));
});

test('home hero fills the space below the header across device widths', async ({ page }) => {
  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 768, height: 1024 },
    { width: 360, height: 800 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('/');
    const layout = await page.evaluate(() => {
      const hero = document.querySelector('.hero');
      const header = document.querySelector('.site-header');
      if (!hero || !header) throw new Error('Homepage hero or header is missing');
      return {
        heroHeight: hero.getBoundingClientRect().height,
        headerHeight: header.getBoundingClientRect().height,
        viewportHeight: window.innerHeight,
        scrollWidth: document.documentElement.scrollWidth,
        viewportWidth: window.innerWidth,
      };
    });
    expect(layout.heroHeight + layout.headerHeight).toBeGreaterThanOrEqual(layout.viewportHeight - 2);
    expect(layout.scrollWidth).toBeLessThanOrEqual(layout.viewportWidth);
  }
});

test('one SkillSprout scene travels into the welcome section and reduced motion keeps it still', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const scene = page.getByTestId('hero-scene');
  await expect(scene).toHaveCount(1);
  await expect(page.getByTestId('scene-landing')).toBeVisible();
  const before = await scene.boundingBox();
  const scrollDistance = await page.evaluate(() => Math.round(window.innerHeight * 0.45));
  await page.evaluate(distance => window.scrollTo(0, distance), scrollDistance);
  await expect.poll(async () => Number(await scene.getAttribute('data-progress'))).toBeGreaterThan(0);
  const during = await scene.boundingBox();
  expect(during).not.toBeNull();
  expect(before).not.toBeNull();
  expect(Math.abs((during?.x ?? 0) - (before?.x ?? 0)) + Math.abs((during?.y ?? 0) - (before?.y ?? 0))).toBeGreaterThan(8);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  const stillScene = page.getByTestId('hero-scene');
  await expect(stillScene).toHaveAttribute('data-motion', 'reduced');
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  const stillBefore = await stillScene.boundingBox();
  await page.evaluate(distance => window.scrollTo(0, distance), scrollDistance);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  const stillAfter = await stillScene.boundingBox();
  expect(stillAfter?.x).toBeCloseTo(stillBefore?.x ?? 0, 0);
  await expect(stillScene).toHaveAttribute('data-progress', '0.000');
  await expect(stillScene).toBeVisible();
});
