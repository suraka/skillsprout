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

test('EDU-MB08: MATH-05 identifies a sphere and counts unit cubes by layer', async ({ page }) => {
  await page.goto(route);
  await page.getByRole('button', { name: 'Explore solids and volume' }).click();

  await expect(page.getByRole('heading', { name: 'Which solid has no flat faces?' })).toBeVisible();
  await page.getByRole('button', { name: 'Cube' }).click();
  await expect(page.getByRole('status')).toContainText('completely curved surface');
  await page.getByRole('button', { name: 'Sphere' }).click();

  await expect(page.getByRole('heading', { name: 'A box has two layers. Each layer has four unit cubes. How many cubes fill the box?' })).toBeVisible();
  await expect(page.getByRole('img', { name: 'A box with two layers of unit cubes, four cubes in each layer' })).toBeVisible();
  await page.getByRole('button', { name: '6 unit cubes' }).click();
  await expect(page.getByRole('status')).toContainText('Count both layers');
  await page.getByRole('button', { name: '8 unit cubes' }).click();
  await expect(page.getByRole('heading', { name: 'You explored a sphere and volume with unit cubes.' })).toBeVisible();
  await expect(page.getByText('The cube drawing is a learning model. Other 3D shapes and measurement topics need more lessons.')).toBeVisible();
});

test('EDU-MB09: MATH-05 reads an exact hour and recovers from a wrong time', async ({ page }) => {
  await page.goto(route);
  await page.getByRole('button', { name: 'Explore telling time' }).click();

  await expect(page.getByRole('heading', { name: 'The garden break starts at the time shown. What time is it?' })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Clock showing three o’clock' })).toBeVisible();
  await page.getByRole('button', { name: '2 o’clock' }).click();
  await expect(page.getByRole('status')).toContainText('Read the number where the short hand points');
  await page.getByRole('button', { name: '3 o’clock' }).click();
  await expect(page.getByRole('heading', { name: 'You read an exact hour on a clock.' })).toBeVisible();
  await expect(page.getByText('This is one short time-reading example. Other time and measurement topics need separate lessons.')).toBeVisible();
});

test('EDU-MB10: MATH-05 compares identical unit weights on a balance', async ({ page }) => {
  await page.goto(route);
  await page.getByRole('button', { name: 'Explore comparing mass' }).click();

  await expect(page.getByRole('heading', { name: 'Each block has the same mass. Which balance pan is heavier?' })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Balance model: the left pan is lower and holds three identical unit weights; the right pan holds two' })).toBeVisible();
  await page.getByRole('button', { name: 'Right pan' }).click();
  await expect(page.getByRole('status')).toContainText('pan that hangs lower');
  await page.getByRole('button', { name: 'Left pan' }).click();
  await expect(page.getByRole('heading', { name: 'You compared mass using identical unit weights.' })).toBeVisible();
  await expect(page.getByText('This balance drawing is a learning model, not a calibrated measuring instrument.')).toBeVisible();
});


test('EDU-MB11: MATH-05 adds pretend token values with retry and no real-currency claim', async ({ page }) => {
  await page.goto(route);
  await page.getByRole('button', { name: 'Explore pretend tokens' }).click();
  await expect(page.getByRole('heading', { name: 'These are make-believe shop tokens. How many points are in this purse?' })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Make-believe purse with one token worth 2 points and one token worth 1 point' })).toBeVisible();
  await expect(page.getByText('These learning tokens are not real money, prices, or local currency.')).toBeVisible();
  await page.getByRole('button', { name: '2' }).click();
  await expect(page.getByRole('status')).toContainText('Count the points shown on both tokens');
  await page.getByRole('button', { name: '3' }).click();
  await expect(page.getByRole('heading', { name: 'Two points and one point make three pretend points.' })).toBeVisible();
});


test('EDU-MB12: MATH-05 compares two pretend purses by their token points', async ({ page }) => {
  await page.goto(route);
  await page.getByRole('button', { name: 'Compare pretend purses' }).click();
  await expect(page.getByRole('heading', { name: 'Which pretend purse has more points?' })).toBeVisible();
  await expect(page.getByRole('img', { name: 'First pretend purse: one token worth 2 points and one token worth 1 point, 3 points total' })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Second pretend purse: two tokens worth 1 point each, 2 points total' })).toBeVisible();
  await page.getByRole('button', { name: 'Second purse, 2 pretend points' }).click();
  await expect(page.getByRole('status')).toContainText('Count the point values in each purse');
  await page.getByRole('button', { name: 'First purse, 3 pretend points' }).click();
  await expect(page.getByRole('heading', { name: 'The first purse has more pretend points.' })).toBeVisible();
  await expect(page.getByText('Three pretend points are more than two. This example does not teach real prices or currency.')).toBeVisible();
});


test('EDU-MB13: MATH-06 reads a made-up sprout table and retries after a wrong choice', async ({ page }) => {
  await page.goto(route);
  await page.getByRole('button', { name: 'Explore MATH-06 data and patterns' }).click();
  await expect(page.getByRole('heading', { name: 'Which pretend bed has the most sprouts?' })).toBeVisible();
  await expect(page.getByRole('table', { name: 'Made-up number of sprouts in three pretend garden beds' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '4' })).toBeVisible();
  await page.getByRole('button', { name: 'Basil bed' }).click();
  await expect(page.getByRole('status')).toContainText('choose the largest one');
  await page.getByRole('button', { name: 'Bean bed' }).click();
  await expect(page.getByRole('heading', { name: 'The bean bed has the most sprouts in this example.' })).toBeVisible();
  await expect(page.getByText('The table uses made-up practice data. It does not describe a real garden or predict how plants grow.')).toBeVisible();
});


test('EDU-MB14: MATH-06 completes a repeating shape pattern with retry feedback', async ({ page }) => {
  await page.goto(route);
  await page.getByRole('button', { name: 'Explore shape pattern' }).click();
  await expect(page.getByRole('heading', { name: 'Which shape comes next?' })).toBeVisible();
  await expect(page.getByRole('list', { name: 'Pattern sequence: circle, triangle, circle, triangle, circle, then a blank space' })).toBeVisible();
  await page.getByRole('button', { name: 'Circle' }).click();
  await expect(page.getByRole('status')).toContainText('Which one comes after the last circle?');
  await page.getByRole('button', { name: 'Triangle' }).click();
  await expect(page.getByRole('heading', { name: 'Triangle comes next in this repeating pattern.' })).toBeVisible();
});

test('EDU-MB15: MATH-05 U.S. dollar lesson uses real values with recovery and no purchase prompt', async ({ page }) => {
  await page.goto(route);
  await page.getByRole('button', { name: 'Explore U.S. dollars and cents' }).click();
  await expect(page.getByRole('heading', { name: 'A $1 bill is worth how many cents?' })).toBeVisible();
  await expect(page.getByText('One U.S. dollar is 100 cents')).toBeVisible();
  await page.getByRole('button', { name: '50 cents' }).click();
  await expect(page.getByRole('status')).toContainText('One U.S. dollar is 100 cents');
  await page.getByRole('button', { name: '100 cents' }).click();
  await expect(page.getByRole('heading', { name: 'How much are a $1 bill and one 25-cent quarter together?' })).toBeVisible();
  await page.getByRole('button', { name: '$1.05' }).click();
  await expect(page.getByRole('status')).toContainText('Start with 100 cents, then add 25 cents');
  await expect(page.getByText('This example uses U.S. dollar values and a U.S. quarter. It does not use exchange rates.')).toBeVisible();
  await page.getByRole('button', { name: '$1.25' }).click();
  await expect(page.getByRole('heading', { name: 'You matched a dollar to cents and added a quarter.' })).toBeVisible();
  await expect(page.getByText('One dollar plus 25 cents is $1.25. This is a math example, not shopping advice; no money is needed.')).toBeVisible();
});

test('EDU-MB16: MATH-05 compares drawn unit-cube volumes with wrong-answer recovery', async ({ page }) => {
  await page.goto(route);
  await page.getByRole('button', { name: 'Compare unit-cube volume' }).click();
  await expect(page.getByRole('heading', { name: 'Which box holds more unit cubes?' })).toBeVisible();
  await expect(page.getByText(/not real containers/)).toBeVisible();
  await page.getByRole('button', { name: 'First box' }).click();
  await expect(page.getByRole('status')).toContainText('the first has four cubes and the second has eight');
  await page.getByRole('button', { name: 'Second box' }).click();
  await expect(page.getByRole('heading', { name: 'The second box has more unit cubes.' })).toBeVisible();
});

test('EDU-MB17: MATH-06 builds a chart, checks a data claim and describes a pattern rule', async ({ page }) => {
  await page.goto(route);
  await page.getByRole('button', { name: 'Explore MATH-06 data and patterns' }).click();
  await page.getByRole('button', { name: 'Basil bed' }).click();
  await expect(page.getByRole('status')).toContainText('choose the largest one');
  await page.getByRole('button', { name: 'Bean bed' }).click();
  await expect(page.getByRole('heading', { name: 'The bean bed has the most sprouts in this example.' })).toBeVisible();
  await page.getByRole('button', { name: 'Continue to build a chart' }).click();
  await page.getByRole('group', { name: 'Bean bed sprouts' }).getByRole('button', { name: '3' }).click();
  await page.getByRole('group', { name: 'Sunflower bed sprouts' }).getByRole('button', { name: '2' }).click();
  await page.getByRole('group', { name: 'Basil bed sprouts' }).getByRole('button', { name: '3' }).click();
  await page.getByRole('button', { name: 'Check my chart' }).click();
  await expect(page.getByRole('status')).toContainText('Check each bar against the matching row');
  await page.getByRole('group', { name: 'Bean bed sprouts' }).getByRole('button', { name: '4' }).click();
  await page.getByRole('button', { name: 'Check my chart' }).click();
  await expect(page.getByRole('heading', { name: 'You built a bar chart from the table.' })).toBeVisible();
  await page.getByRole('button', { name: 'Continue to check a claim' }).click();
  await page.getByRole('button', { name: 'Supported', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Two is less than four');
  await page.getByRole('button', { name: 'Not supported' }).click();
  await expect(page.getByRole('heading', { name: 'You checked the claim against the data.' })).toBeVisible();
  await page.getByRole('button', { name: 'Continue to the shape pattern' }).click();
  await page.getByRole('button', { name: 'Triangle' }).click();
  await expect(page.getByRole('heading', { name: 'Triangle comes next in this repeating pattern.' })).toBeVisible();
  await page.getByRole('button', { name: 'Continue to choose the rule' }).click();
  await page.getByRole('button', { name: 'Add one triangle each time' }).click();
  await expect(page.getByRole('status')).toContainText('Check whether the same two shapes take turns');
  await page.getByRole('button', { name: 'Circle, triangle, repeat' }).click();
  await expect(page.getByRole('heading', { name: 'You read a table, built a chart, checked a claim, and described a pattern rule.' })).toBeVisible();
  await expect(page.getByText(/does not cover every data, chance, ratio, or algebra outcome/)).toBeVisible();
});

test('EDU-MB18: MATH-05 quarter-turn and perimeter lessons recover from wrong answers', async ({ page }) => {
  await page.goto(route);
  await page.getByRole('button', { name: 'Explore shape turns and perimeter' }).click();
  await expect(page.getByRole('heading', { name: /one quarter-turn clockwise/ })).toBeVisible();
  await page.getByRole('button', { name: 'Left' }).click();
  await expect(page.getByRole('status')).toContainText('clockwise quarter-turn');
  await page.getByRole('button', { name: 'Right' }).click();
  await expect(page.getByRole('heading', { name: 'The arrow points right after a quarter-turn clockwise.' })).toBeVisible();
  await page.getByRole('button', { name: 'Continue to perimeter' }).click();
  await page.getByRole('button', { name: '8 unit edges' }).click();
  await expect(page.getByRole('status')).toContainText('outside boundary');
  await page.getByRole('button', { name: '10 unit edges' }).click();
  await expect(page.getByRole('heading', { name: "The rectangle's perimeter is 10 unit edges." })).toBeVisible();
  await page.getByRole('button', { name: 'Finish and clear this visit' }).click();
});

test('EDU-MB19: MATH-05 ruler, duration and mass illustrations explain their limits', async ({ page }) => {
  await page.goto(route);
  await page.getByRole('button', { name: 'Measure a length on a model ruler' }).click();
  await expect(page.getByRole('img', { name: 'Illustrated ruler and leaf' })).toBeVisible();
  await expect(page.getByText(/not a calibrated ruler/)).toBeVisible();
  await page.getByRole('button', { name: '5 inches' }).click();
  await expect(page.getByRole('status')).toContainText('starts after zero');
  await page.getByRole('button', { name: '4 inches' }).click();
  await expect(page.getByRole('heading', { name: 'The drawn leaf is 4 inches long.' })).toBeVisible();
  await page.getByRole('button', { name: 'Finish and clear this visit' }).click();

  await page.getByRole('button', { name: 'Measure elapsed time' }).click();
  await page.getByRole('button', { name: '2 hours' }).click();
  await expect(page.getByRole('status')).toContainText('Count each step');
  await page.getByRole('button', { name: '3 hours' }).click();
  await expect(page.getByRole('heading', { name: 'Three whole hours pass.' })).toBeVisible();
  await page.getByRole('button', { name: 'Finish and clear this visit' }).click();

  await page.getByRole('button', { name: 'Measure mass in equal units' }).click();
  await expect(page.getByRole('img', { name: /three identical unit weights/ })).toBeVisible();
  await expect(page.getByText(/does not show grams/)).toBeVisible();
  await page.getByRole('button', { name: '2 units' }).click();
  await expect(page.getByRole('status')).toContainText('Count the identical unit weights');
  await page.getByRole('button', { name: '3 units' }).click();
  await expect(page.getByRole('heading', { name: 'The object balances with three equal model units.' })).toBeVisible();
  await page.getByRole('button', { name: 'Finish and clear this visit' }).click();
});

test('EDU-MB20: MATH-06 chance, ratio and algebra previews distinguish each concept', async ({ page }) => {
  await page.goto(route);
  await page.getByRole('button', { name: 'Explore chance' }).click();
  await expect(page.getByRole('img', { name: 'Three leaf tiles and one flower tile in a pretend bag' })).toBeVisible();
  await page.getByRole('button', { name: 'They are equally likely' }).click();
  await expect(page.getByRole('status')).toContainText('more leaf tiles');
  await page.getByRole('button', { name: 'Leaf is more likely' }).click();
  await expect(page.getByRole('heading', { name: 'Leaf is more likely, but not certain.' })).toBeVisible();
  await page.getByRole('button', { name: 'Finish and clear this visit' }).click();

  await page.getByRole('button', { name: 'Explore equivalent ratios' }).click();
  await page.getByRole('button', { name: '4 to 5' }).click();
  await expect(page.getByRole('status')).toContainText('Double both parts');
  await page.getByRole('button', { name: '4 to 6' }).click();
  await expect(page.getByRole('heading', { name: 'The equivalent ratio is 4 to 6.' })).toBeVisible();
  await page.getByRole('button', { name: 'Finish and clear this visit' }).click();

  await page.getByRole('button', { name: 'Explore a function rule' }).click();
  await expect(page.getByRole('table', { name: 'Example input and output pairs' })).toBeVisible();
  await page.getByRole('button', { name: 'Multiply by 3' }).click();
  await expect(page.getByRole('status')).toContainText('three more than its input');
  await page.getByRole('button', { name: 'Add 3' }).click();
  await expect(page.getByRole('heading', { name: 'The function rule is “add 3.”' })).toBeVisible();
  await expect(page.getByText('For a new input of 5, the rule gives 5 + 3 = 8. The same rule fits each pair in the table.')).toBeVisible();
});
