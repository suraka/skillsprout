import { test, expect } from 'playwright/test';
const demo='/demo/sorting-garden';
test.beforeEach(async ({ page }) => {
 page.on('pageerror', error => console.error('Browser exception:', error.message, error.stack));
});
test.afterEach(async ({ page }, testInfo) => {
 if (testInfo.status !== testInfo.expectedStatus) console.log('Failure page:', await page.locator('body').innerText());
});
test('SG-B01: sample, counterexample, repair and history',async({page})=>{
 await page.goto(demo); const run=page.getByRole('button',{name:'Run',exact:true});
 await run.click(); await expect(page.getByText('This card reached the matching basket.',{exact:false})).toBeVisible();
 await page.getByLabel('Sample card in block 2').selectOption('green-round'); await run.click();
 await expect(page.getByText('A fruit landed with the leaves!',{exact:false})).toBeVisible();
 await page.getByLabel('Sorting rule in block 3').selectOption('shape'); await run.click();
 await expect(page.getByText('This card reached the matching basket.',{exact:false})).toBeVisible();
 await expect(page.getByRole('list',{name:'Execution trace'})).toContainText('This card is round, so choose fruit.');
 await page.getByRole('button',{name:'Undo',exact:true}).click();await expect(page.getByLabel('Sorting rule in block 3')).toHaveValue('color');
 await page.getByRole('button',{name:'Redo',exact:true}).click();await expect(page.getByLabel('Sorting rule in block 3')).toHaveValue('shape');
});
test('SG-B02: reorder error, recover, insert and remove',async({page})=>{
 await page.goto(demo);await page.getByRole('button',{name:'Move Choose a rule up',exact:true}).click();await page.getByRole('button',{name:'Run',exact:true}).click();await expect(page.getByRole('alert')).toContainText('sample block before');
 await page.getByRole('button',{name:'Reset starter'}).click();await page.getByText('Add a block',{exact:true}).click();await page.getByRole('button',{name:'Use a sample card',exact:true}).click();await expect(page.getByLabel('Sample card in block 5')).toBeVisible();
 await page.getByRole('button',{name:'Remove Use a sample card',exact:true}).last().click();await page.getByRole('button',{name:'Run',exact:true}).click();await expect(page.getByText('This card reached the matching basket.',{exact:false})).toBeVisible();
});
test('SG-B03: keyboard path, pause and single step',async({page})=>{
 await page.goto(demo);await expect(page.getByLabel('Sample card in block 2')).toBeEnabled();await page.getByLabel('Sample card in block 2').focus();await page.keyboard.press('End');await page.keyboard.press('Tab');await expect(page.getByLabel('Sample card in block 2')).toHaveValue('green-round');
 await page.getByRole('button',{name:'Run',exact:true}).focus();await page.keyboard.press('Enter');await page.getByRole('button',{name:'Pause',exact:true}).click();await expect(page.getByRole('button',{name:'Pause',exact:true})).toBeDisabled();
 await page.getByRole('button',{name:'Clear stage'}).click();await page.getByRole('button',{name:'Step',exact:true}).focus();for(let i=0;i<4;i++)await page.keyboard.press('Enter');await expect(page.getByText('A fruit landed with the leaves!',{exact:false})).toBeVisible();
});
test('SG-B04: guest privacy and reset',async({page})=>{
 const forbidden:string[]=[];page.on('request',r=>{const u=new URL(r.url());if(u.pathname.startsWith('/api/')||!['localhost','127.0.0.1'].includes(u.hostname))forbidden.push(r.url());});
 await page.goto(demo);await page.getByLabel('Sample card in block 2').selectOption('green-round');await page.getByRole('button',{name:'Run',exact:true}).click();await expect(page.getByText('A fruit landed with the leaves!',{exact:false})).toBeVisible();
 await page.getByRole('button',{name:'Finish for now'}).click();await expect(page.getByText('Your guest blocks and run history have been cleared.')).toBeVisible();await page.getByRole('button',{name:'Start a fresh garden'}).click();await expect(page.getByLabel('Sample card in block 2')).toHaveValue('red-round');await expect(page.getByRole('button',{name:'Undo',exact:true})).toBeDisabled();
 expect(await page.evaluate(()=>({local:localStorage.length,session:sessionStorage.length,cookies:document.cookie}))).toEqual({local:0,session:0,cookies:''});expect(forbidden).toEqual([]);
 await page.getByLabel('Sample card in block 2').selectOption('green-round');await page.reload();await expect(page.getByLabel('Sample card in block 2')).toHaveValue('red-round');
});
test('SG-B05: offline after load, mobile reflow and reduced motion',async({page,context})=>{
 await page.setViewportSize({width:360,height:800});await page.emulateMedia({reducedMotion:'reduce'});await page.goto(demo);await expect(page.getByLabel('Sample card in block 2')).toBeEnabled();await context.setOffline(true);await page.getByRole('button',{name:'Run',exact:true}).click();await expect(page.getByText('This card reached the matching basket.',{exact:false})).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);await page.getByRole('button',{name:'Finish for now'}).click();await expect(page.getByRole('heading',{name:'A good place to pause.'})).toBeVisible();
});
test('REG-B01: existing catalog, enrollment and legacy completion',async({page})=>{
 await page.route('**/api/config',r=>r.fulfill({json:{apiUrl:'',firebaseApiKey:''}}));await page.goto('/');await expect(page.getByText('6 adventures to explore')).toBeVisible();await page.getByLabel('Search courses').fill('AI');await page.locator('a.course-card').filter({hasText:'AI Explorers'}).click();await page.getByRole('button',{name:'Try this sample adventure'}).click();await page.getByRole('button',{name:'I finished this lesson'}).click();await expect(page.getByRole('button',{name:'Lesson completed'})).toBeVisible();await page.getByRole('link',{name:'For parents',exact:true}).click();await expect(page.getByRole('heading',{name:'Welcome to your family space.'})).toBeVisible();
});

test('SG-B06: controls wait for JavaScript on a slow connection', async ({ page }) => {
 let releaseScripts!: () => void;
 const scriptsReady = new Promise<void>(resolve => { releaseScripts = resolve; });
 await page.route('**/*', async route => {
  if (route.request().resourceType() === 'script') await scriptsReady;
  await route.continue();
 });
 try {
  await page.goto(demo, { waitUntil: 'commit' });
  await expect(page.getByRole('status')).toHaveText('Loading the garden controls…');
  const controls = page.locator('.sorting-garden button, .sorting-garden select');
  expect(await controls.count()).toBeGreaterThan(10);
  for (const control of await controls.all()) await expect(control).toBeDisabled();
 } finally { releaseScripts(); }
 await page.getByLabel('Sample card in block 2').selectOption('green-round');
 await page.getByRole('button', { name: 'Run', exact: true }).click();
 await expect(page.getByText('A fruit landed with the leaves!', { exact: false })).toBeVisible();
});
