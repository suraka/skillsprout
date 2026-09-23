import assert from 'node:assert/strict';
import test from 'node:test';
import {
  amountAnswerIsCorrect,
  changeAmount,
  compareAnswerIsCorrect,
  countAnswerIsCorrect,
  countIsComplete,
  equalShareAnswerIsCorrect,
  equalFractionAnswerIsCorrect,
  decimalTenthsAnswerIsCorrect,
  fartherRightFractionAnswerIsCorrect,
  shapeSidesAnswerIsCorrect,
  longerScreenMeasureAnswerIsCorrect,
  solidWithoutFlatFacesAnswerIsCorrect,
  unitCubeVolumeAnswerIsCorrect,
  wholeHourAnswerIsCorrect,
  heavierBalanceSideAnswerIsCorrect,
  pretendTokenAmountAnswerIsCorrect,
  pretendTokenPurseWithMorePointsAnswerIsCorrect,
  mostSproutsBedAnswerIsCorrect,
  nextAlternatingShapeAnswerIsCorrect,
  isValidDecomposition,
  markSeedCounted,
  mathPublicationBlockers,
  multiplicationAnswerIsCorrect,
  placeValueAnswerIsCorrect,
  percentOfEqualPartsAnswerIsCorrect,
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

test('EDU-M07: composing and decomposing small amounts supports multiple valid splits', () => {
  assert.equal(isValidDecomposition(5, 1, 4), true);
  assert.equal(isValidDecomposition(5, 2, 3), true);
  assert.equal(isValidDecomposition(5, 2, 4), false);
  assert.equal(isValidDecomposition(5, 2.5, 2.5), false);
  assert.equal(isValidDecomposition(5, 0, 5), false);
});

test('EDU-M08: equal groups and arrays share one checked total', () => {
  assert.equal(multiplicationAnswerIsCorrect(6, 3, 2), true);
  assert.equal(multiplicationAnswerIsCorrect(6, 2, 3), true);
  assert.equal(multiplicationAnswerIsCorrect(5, 3, 2), false);
  assert.equal(multiplicationAnswerIsCorrect(7, 3, 2), false);
  assert.equal(multiplicationAnswerIsCorrect(6.5, 3, 2), false);
});

test('EDU-M09: fair-sharing answer requires equal whole-number shares', () => {
  assert.equal(equalShareAnswerIsCorrect(3, 6, 2), true);
  assert.equal(equalShareAnswerIsCorrect(2, 6, 2), false);
  assert.equal(equalShareAnswerIsCorrect(2, 5, 2), false);
  assert.equal(equalShareAnswerIsCorrect(2.5, 5, 2), false);
});

test('EDU-M10: place value combines whole tens and ones without accepting invalid parts', () => {
  assert.equal(placeValueAnswerIsCorrect(14, 1, 4), true);
  assert.equal(placeValueAnswerIsCorrect(15, 1, 4), false);
  assert.equal(placeValueAnswerIsCorrect(14.5, 1, 4), false);
  assert.equal(placeValueAnswerIsCorrect(101, 10, 1), false);
});

test('EDU-M11: fraction answer key matches the count of equal shaded parts', () => {
  assert.equal(equalFractionAnswerIsCorrect('2/4', 2, 4), true);
  assert.equal(equalFractionAnswerIsCorrect('1/2', 2, 4), true);
  assert.equal(equalFractionAnswerIsCorrect('3/4', 2, 4), false);
  assert.equal(equalFractionAnswerIsCorrect('1/2', 1, 2), true);
  assert.equal(equalFractionAnswerIsCorrect('2/5', 2, 5), true);
  assert.equal(equalFractionAnswerIsCorrect('2/4junk', 2, 4), false);
});

test('EDU-M12: tenths map to an exact decimal value', () => {
  assert.equal(decimalTenthsAnswerIsCorrect('0.5', 5, 10), true);
  assert.equal(decimalTenthsAnswerIsCorrect('0.50', 5, 10), true);
  assert.equal(decimalTenthsAnswerIsCorrect('0.8', 5, 10), false);
  assert.equal(decimalTenthsAnswerIsCorrect('0.55', 5, 10), false);
  assert.equal(decimalTenthsAnswerIsCorrect('five tenths', 5, 10), false);
});

test('EDU-M13: percent answer uses the same proportion of equal parts', () => {
  assert.equal(percentOfEqualPartsAnswerIsCorrect(50, 5, 10), true);
  assert.equal(percentOfEqualPartsAnswerIsCorrect(40, 5, 10), false);
  assert.equal(percentOfEqualPartsAnswerIsCorrect(50.5, 5, 10), false);
  assert.equal(percentOfEqualPartsAnswerIsCorrect(50, 5, 0), false);
});

test('EDU-M14: fraction number-line comparison uses equivalent cross-products', () => {
  assert.equal(fartherRightFractionAnswerIsCorrect('3/4', 1, 4, 3, 4), true);
  assert.equal(fartherRightFractionAnswerIsCorrect('1/4', 1, 4, 3, 4), false);
  assert.equal(fartherRightFractionAnswerIsCorrect('2/8', 1, 4, 3, 4), false);
  assert.equal(fartherRightFractionAnswerIsCorrect('3/4', 2, 8, 1, 4), false);
  assert.equal(fartherRightFractionAnswerIsCorrect('1/0', 1, 4, 3, 4), false);
});

test('EDU-M15: shape choice matches its authored straight-side count', () => {
  assert.equal(shapeSidesAnswerIsCorrect('triangle', 3), true);
  assert.equal(shapeSidesAnswerIsCorrect('square', 3), false);
  assert.equal(shapeSidesAnswerIsCorrect('circle', 0), true);
  assert.equal(shapeSidesAnswerIsCorrect('hexagon', 6), false);
});

test('EDU-M16: screen-length comparison checks bounded whole equal units', () => {
  assert.equal(longerScreenMeasureAnswerIsCorrect('right', 3, 5), true);
  assert.equal(longerScreenMeasureAnswerIsCorrect('left', 3, 5), false);
  assert.equal(longerScreenMeasureAnswerIsCorrect('right', 3.5, 5), false);
  assert.equal(longerScreenMeasureAnswerIsCorrect('right', 11, 5), false);
});

test('EDU-M17: sphere answer matches the solid with no flat faces', () => {
  assert.equal(solidWithoutFlatFacesAnswerIsCorrect('sphere'), true);
  assert.equal(solidWithoutFlatFacesAnswerIsCorrect('cube'), false);
  assert.equal(solidWithoutFlatFacesAnswerIsCorrect('cylinder'), false);
  assert.equal(solidWithoutFlatFacesAnswerIsCorrect('unknown'), false);
});

test('EDU-M18: unit-cube volume counts whole bounded rows, columns, and layers', () => {
  assert.equal(unitCubeVolumeAnswerIsCorrect(8, 2, 2, 2), true);
  assert.equal(unitCubeVolumeAnswerIsCorrect(7, 2, 2, 2), false);
  assert.equal(unitCubeVolumeAnswerIsCorrect(8, 2, 2, 1), false);
  assert.equal(unitCubeVolumeAnswerIsCorrect(8, 2.5, 2, 2), false);
  assert.equal(unitCubeVolumeAnswerIsCorrect(40, 4, 4, 4), false);
});

test('EDU-M19: clock answer matches a valid exact hour', () => {
  assert.equal(wholeHourAnswerIsCorrect(3, 3), true);
  assert.equal(wholeHourAnswerIsCorrect(2, 3), false);
  assert.equal(wholeHourAnswerIsCorrect(0, 3), false);
  assert.equal(wholeHourAnswerIsCorrect(13, 3), false);
  assert.equal(wholeHourAnswerIsCorrect(3.5, 3), false);
});

test('EDU-M20: balance answer matches the heavier bounded unit-mass side', () => {
  assert.equal(heavierBalanceSideAnswerIsCorrect('left', 3, 2), true);
  assert.equal(heavierBalanceSideAnswerIsCorrect('right', 3, 2), false);
  assert.equal(heavierBalanceSideAnswerIsCorrect('right', 2, 3), true);
  assert.equal(heavierBalanceSideAnswerIsCorrect('left', 2, 2), false);
  assert.equal(heavierBalanceSideAnswerIsCorrect('left', 6, 2), false);
});

test('EDU-M05: this is a guest draft with publication review still blocked', () => {
  assert.equal(numberGardenManifest.reviewStatus, 'draft');
  assert.equal(numberGardenManifest.version, 17);
  assert.equal(numberGardenManifest.requiresAccount, false);
  assert.equal(numberGardenManifest.requiresAi, false);
  assert.equal(numberGardenManifest.requiresCameraOrMic, false);
  assert.equal(numberGardenManifest.savesLearnerData, false);
  assert.ok(mathPublicationBlockers().length >= 3);
  assert.ok(mathPublicationBlockers().some((blocker) => blocker.includes('reviewing the MATH-05 solid-shape and unit-cube volume')));
  assert.ok(mathPublicationBlockers().some((blocker) => blocker.includes('through version 17')));
});


test('EDU-M21: pretend token totals are deterministic and bounded', () => {
  assert.equal(pretendTokenAmountAnswerIsCorrect(3, [2, 1]), true);
  assert.equal(pretendTokenAmountAnswerIsCorrect(2, [2, 1]), false);
  assert.equal(pretendTokenAmountAnswerIsCorrect(3, [2, 1.5]), false);
  assert.equal(pretendTokenAmountAnswerIsCorrect(3, []), false);
  assert.equal(pretendTokenAmountAnswerIsCorrect(3, [2, 1, 0]), false);
});


test('EDU-M22: pretend-purse comparison totals bounded token points', () => {
  assert.equal(pretendTokenPurseWithMorePointsAnswerIsCorrect('left', [2, 1], [1, 1]), true);
  assert.equal(pretendTokenPurseWithMorePointsAnswerIsCorrect('right', [2, 1], [1, 1]), false);
  assert.equal(pretendTokenPurseWithMorePointsAnswerIsCorrect('right', [1, 1], [2, 1]), true);
  assert.equal(pretendTokenPurseWithMorePointsAnswerIsCorrect('left', [2], [1, 1]), false);
  assert.equal(pretendTokenPurseWithMorePointsAnswerIsCorrect('left', [2, 0], [1]), false);
  assert.equal(pretendTokenPurseWithMorePointsAnswerIsCorrect('left', [2, 1, 1, 1, 1, 1], [1]), false);
});


test('EDU-M23: synthetic sprout table has one bounded largest value', () => {
  const data = [{ bed: 'Bean bed', sprouts: 4 }, { bed: 'Sunflower bed', sprouts: 2 }, { bed: 'Basil bed', sprouts: 3 }];
  assert.equal(mostSproutsBedAnswerIsCorrect('Bean bed', data), true);
  assert.equal(mostSproutsBedAnswerIsCorrect('Basil bed', data), false);
  assert.equal(mostSproutsBedAnswerIsCorrect('Bean bed', [{ bed: 'A', sprouts: 4 }, { bed: 'B', sprouts: 4 }]), false);
  assert.equal(mostSproutsBedAnswerIsCorrect('A', [{ bed: 'A', sprouts: -1 }, { bed: 'B', sprouts: 0 }]), false);
  assert.equal(mostSproutsBedAnswerIsCorrect('A', [{ bed: 'A', sprouts: 2 }, { bed: 'A', sprouts: 1 }]), false);
  assert.equal(mostSproutsBedAnswerIsCorrect('A', [{ bed: 'A', sprouts: 2 }]), false);
});


test('EDU-M24: alternating shape sequence validates the next shape', () => {
  assert.equal(nextAlternatingShapeAnswerIsCorrect('triangle', ['circle', 'triangle', 'circle', 'triangle', 'circle']), true);
  assert.equal(nextAlternatingShapeAnswerIsCorrect('circle', ['circle', 'triangle', 'circle', 'triangle', 'circle']), false);
  assert.equal(nextAlternatingShapeAnswerIsCorrect('circle', ['circle', 'circle', 'circle']), false);
  assert.equal(nextAlternatingShapeAnswerIsCorrect('triangle', ['circle', 'triangle']), false);
  assert.equal(nextAlternatingShapeAnswerIsCorrect('triangle', ['circle', 'triangle', 'square']), false);
  assert.equal(nextAlternatingShapeAnswerIsCorrect('triangle', ['circle', 'triangle', 'circle', 'triangle', 'circle', 'triangle', 'circle', 'triangle', 'circle', 'triangle', 'circle']), false);
});
