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


test('home navigation labels, destinations, icons, and motion work at each viewport', async ({ page }) => {
  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 768, height: 1024 },
    { width: 360, height: 800 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('/');
    await expect(page.getByTestId('hero-scene')).toHaveAttribute('data-motion', 'scroll');
    if (viewport.width <= 740) await page.getByRole('button', { name: 'Open menu' }).click();
    const nav = page.getByRole('navigation', { name: 'Main navigation' });
    for (const label of ['Home', 'Learn & play', 'Explore topics', 'Parents & teachers', 'Support', 'Join for free', 'Sign in']) {
      await expect(nav.getByRole('link', { name: label })).toHaveCount(label === 'Join for free' || label === 'Sign in' ? 0 : 1);
    }
    for (const label of ['Home', 'Learn & play', 'Explore topics', 'Parents & teachers', 'Support']) {
      await expect(nav.getByRole('link', { name: label }).locator('svg')).toHaveCount(1);
    }
    await expect(nav.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
    await expect(nav.getByRole('link', { name: 'Explore topics' })).not.toHaveClass(/active/);
    await expect(nav.getByRole('link', { name: 'Home' })).toHaveCSS('box-shadow', 'none');
    const sizes = await page.evaluate(() => ({ width: document.documentElement.scrollWidth, viewport: innerWidth }));
    expect(sizes.width).toBeLessThanOrEqual(sizes.viewport);
  }
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  await nav.getByRole('button', { name: 'Join for free' }).click();
  await expect(page.getByRole('dialog')).toContainText('Start your family');
  await page.getByRole('button', { name: /Already have an account/ }).click();
  await expect(page.getByRole('dialog')).toContainText('Welcome back');
  await page.getByRole('button', { name: 'Close' }).click();
  await nav.getByRole('button', { name: 'Sign in' }).hover();
  await expect(nav.getByRole('button', { name: 'Sign in' })).toBeVisible();
});

test('scene stays above the section surfaces as it enters the welcome band', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  await page.evaluate(() => window.scrollTo(0, Math.round(innerHeight * 0.45)));
  const stack = await page.evaluate(() => {
    const scene = document.querySelector<HTMLElement>('[data-testid="hero-scene"]')!;
    const landing = document.querySelector<HTMLElement>('[data-testid="scene-landing"]')!;
    const strip = document.querySelector<HTMLElement>('.trust-strip')!;
    return {
      sceneZ: Number(getComputedStyle(scene).zIndex),
      landingZ: Number(getComputedStyle(landing).zIndex),
      stripZ: Number(getComputedStyle(strip).zIndex),
      sceneVisible: scene.getBoundingClientRect().width > 0 && getComputedStyle(scene).visibility === 'visible',
    };
  });
  expect(stack.sceneVisible).toBe(true);
  expect(stack.sceneZ).toBeGreaterThan(stack.landingZ);
  expect(stack.sceneZ).toBeGreaterThan(stack.stripZ);
});

test('phone navigation starts collapsed and centers menu items when opened', async ({ page }) => {
  for (const width of [360, 390, 430]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('/');
    const toggle = page.getByRole('button', { name: 'Open menu' });
    const nav = page.getByRole('navigation', { name: 'Main navigation' });
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(nav).toBeHidden();
    await expect(page.getByTestId('hero-scene')).toHaveAttribute('data-motion', 'scroll');
    await toggle.click();
    await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true');
    await expect(nav).toBeVisible();
    await expect.poll(() => page.evaluate(() => {
      const hero = document.querySelector('.hero')!.getBoundingClientRect().height;
      const header = document.querySelector('.site-header')!.getBoundingClientRect().height;
      return Math.abs(hero + header - innerHeight);
    })).toBeLessThanOrEqual(2);
    for (const label of ['Home', 'Learn & play', 'Explore topics', 'Parents & teachers', 'Support', 'Join for free', 'Sign in']) {
      await expect(nav.getByText(label, { exact: true })).toBeVisible();
    }
    const centered = await page.evaluate(() => {
      const nav = document.querySelector<HTMLElement>('.main-nav')!;
      const links = Array.from(nav.querySelectorAll<HTMLElement>(':scope > a, :scope > button'));
      return {
        navTextAlign: getComputedStyle(nav).textAlign,
        navJustify: getComputedStyle(nav).justifyContent,
        items: links.map(item => ({
          textAlign: getComputedStyle(item).textAlign,
          justifyContent: getComputedStyle(item).justifyContent,
          bounds: item.getBoundingClientRect().toJSON(),
        })),
        navBounds: nav.getBoundingClientRect().toJSON(),
        scrollWidth: document.documentElement.scrollWidth,
        viewportWidth: innerWidth,
      };
    });
    expect(centered.navTextAlign).toBe('center');
    for (const item of centered.items) {
      expect(item.textAlign).toBe('center');
      expect(['center', 'normal']).toContain(item.justifyContent);
      expect(item.bounds.x).toBeGreaterThanOrEqual(centered.navBounds.x - 1);
      expect(item.bounds.x + item.bounds.width).toBeLessThanOrEqual(centered.navBounds.x + centered.navBounds.width + 1);
    }
    expect(centered.scrollWidth).toBeLessThanOrEqual(centered.viewportWidth);
    await page.getByRole('button', { name: 'Close menu' }).click();
    await expect(nav).toBeHidden();
  }
});
