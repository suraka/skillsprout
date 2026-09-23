import { expect, test } from 'playwright/test';

test('LE-B01: the hub has one real guest activity and clear coming-soon cards', async ({ page }) => {
  const remote: string[]=[];
  page.on('request',request=>{const u=new URL(request.url());if(u.pathname.startsWith('/api/')||!['localhost','127.0.0.1'].includes(u.hostname))remote.push(request.url());});
  await page.goto('/little-explorers');
  await expect(page.getByRole('heading',{name:'Little Explorers'})).toBeVisible();
  await expect(page.getByRole('link',{name:'Explore together'})).toHaveCount(1);
  await expect(page.getByText('Coming soon',{exact:true})).toHaveCount(3);
  await page.getByRole('link',{name:'Explore together'}).click();
  await expect(page.getByRole('heading',{name:'Rainbow Habitat'})).toBeVisible();
  expect(remote).toEqual([]);
});

test('LE-B02: shape and pattern matching gives calm feedback, retries, and finishes', async ({ page }) => {
  await page.goto('/little-explorers/rainbow-habitat');
  const homes=page.locator('.rh-home');
  await homes.nth(1).click();
  await expect(page.getByRole('status')).toContainText('Let’s compare');
  await expect(page.getByText('Can you help this friend find a home?')).toBeVisible();
  await homes.nth(0).click();
  await expect(page.getByRole('heading',{name:'Rainbow Habitat'})).toBeVisible();
  await expect(page.getByRole('region',{name:'Garden turn 2 of 3'})).toBeVisible();
  await page.locator('.rh-home').nth(1).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('region',{name:'Garden turn 3 of 3'})).toBeVisible();
  await page.locator('.rh-home').nth(0).click();
  await expect(page.getByRole('heading',{name:'All three friends found a home.'})).toBeVisible();
  await expect(page.getByText('Try away from the screen:',{exact:false})).toBeVisible();
});

test('LE-B03: adult-selected level, sensory options, pause, home, and reset stay transient', async ({ page }) => {
  const remote: string[]=[];
  page.on('request',request=>{const u=new URL(request.url());if(u.pathname.startsWith('/api/')||!['localhost','127.0.0.1'].includes(u.hostname))remote.push(request.url());});
  await page.goto('/little-explorers/rainbow-habitat');
  await page.getByRole('link',{name:'For grownups'}).click();
  await page.getByLabel('Homes to choose from').selectOption('4');
  await page.getByLabel('Enable quiet sound effect').check();
  await page.getByLabel('Enable gentle motion').check();
  await page.getByRole('link',{name:'Back to Rainbow Habitat'}).click();
  await expect(page.locator('.rh-home')).toHaveCount(4);
  await page.getByRole('button',{name:'Pause'}).click();
  await expect(page.getByRole('heading',{name:'Paused'})).toBeVisible();
  await page.getByRole('button',{name:'Continue'}).click();
  await page.getByRole('link',{name:'Home',exact:true}).click();
  await page.getByRole('link',{name:'Explore together'}).click();
  await expect(page.locator('.rh-home')).toHaveCount(4);
  await page.locator('.rh-home').nth(0).click();
  await expect(page.getByRole('status')).toContainText('That home fits');
  await expect(page.evaluate(()=>({local:localStorage.length,session:sessionStorage.length,cookies:document.cookie}))).resolves.toEqual({local:0,session:0,cookies:''});
  expect(remote).toEqual([]);
});

test('LE-B04: mobile layout works after load when offline with reduced motion', async ({ page, context }) => {
  await page.setViewportSize({width:360,height:800});
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/little-explorers/rainbow-habitat');
  await expect(page.getByRole('button',{name:/sunshine yellow/}).first()).toBeVisible();
  await context.setOffline(true);
  await page.getByRole('button',{name:'Pause'}).click();
  await expect(page.getByRole('heading',{name:'Paused'})).toBeVisible();
  await page.getByRole('link',{name:'Home',exact:true}).click();
  await expect(page.getByRole('heading',{name:'Little Explorers'})).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
});
