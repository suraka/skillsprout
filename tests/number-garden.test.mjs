import assert from 'node:assert/strict';
import test from 'node:test';
import {
  amountAnswerIsCorrect,
  changeAmount,
  compareAnswerIsCorrect,
  countAnswerIsCorrect,
  countIsComplete,
  markSeedCounted,
  mathPublicationBlockers,
  numberGardenManifest,
  nextNumberAfterIsCorrect,
  seedSet,
  zeroAnswerIsCorrect,
} from '../.math-test-build/number-garden.js';

test('EDU-M01: each stable seed is counted once, even with a rapid repeated tap', () => {
  const one = markSeedCounted([], 'seed-a');
  assert.deepEqual(markSeedCounted(one, 'seed-a'), one);
  assert.equal(one.length, 1);
  assert.deepEqual(markSeedCounted(one, 'unknown'), one);
  assert.equal(countIsComplete(one), false);
});

test('EDU-M02: counting completes only when every authored seed is touched', () => {
  const counted = seedSet.reduce((current, seed) => markSeedCounted(current, seed.id), []);
  assert.equal(countIsComplete(counted), true);
  assert.equal(countAnswerIsCorrect(seedSet.length), true);
  assert.equal(countAnswerIsCorrect(4), false);
  assert.equal(countAnswerIsCorrect(5.2), false);
});

test('EDU-M03: comparison evaluator agrees with the stable visible quantities', () => {
  assert.equal(compareAnswerIsCorrect('right'), true);
  assert.equal(compareAnswerIsCorrect('left'), false);
});

test('EDU-M06: zero and number-order answer checks reject invalid values', () => {
  assert.equal(zeroAnswerIsCorrect(0), true);
  assert.equal(zeroAnswerIsCorrect(1), false);
  assert.equal(zeroAnswerIsCorrect(0.5), false);
  assert.equal(nextNumberAfterIsCorrect(3, 4), true);
  assert.equal(nextNumberAfterIsCorrect(3, 3), false);
  assert.equal(nextNumberAfterIsCorrect(5, 6), false);
  assert.equal(nextNumberAfterIsCorrect(3.2, 4), false);
});

test('EDU-M04: adding and taking away use bounded, deterministic quantities', () => {
  assert.equal(changeAmount(2, 1), 3);
  assert.equal(changeAmount(4, -1), 3);
  assert.equal(amountAnswerIsCorrect(3, 3), true);
  assert.equal(amountAnswerIsCorrect(4, 3), false);
  assert.throws(() => changeAmount(0, -1), RangeError);
  assert.throws(() => changeAmount(5, 1), RangeError);
});

test('EDU-M05: this is a guest draft with publication review still blocked', () => {
  assert.equal(numberGardenManifest.reviewStatus, 'draft');
  assert.equal(numberGardenManifest.version, 4);
  assert.equal(numberGardenManifest.requiresAccount, false);
  assert.equal(numberGardenManifest.requiresAi, false);
  assert.equal(numberGardenManifest.requiresCameraOrMic, false);
  assert.equal(numberGardenManifest.savesLearnerData, false);
  assert.ok(mathPublicationBlockers().length >= 4);
  assert.ok(mathPublicationBlockers().some((blocker) => blocker.includes('Review completion is reported by the product owner')));
});
