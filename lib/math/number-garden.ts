export const numberGardenManifest = {
  activityId: 'math-number-garden-001',
  version: 20,
  language: 'en',
  localeVariant: 'en_US_v20_m05_geometry_measurement_usd_m06_chance_ratio_algebra_draft',
  reviewStatus: 'draft',
  requiresAccount: false,
  requiresAi: false,
  requiresCameraOrMic: false,
  savesLearnerData: false,
} as const;

export const seedSet = [
  { id: 'seed-a', pattern: 'round' },
  { id: 'seed-b', pattern: 'striped' },
  { id: 'seed-c', pattern: 'speckled' },
  { id: 'seed-d', pattern: 'round' },
  { id: 'seed-e', pattern: 'striped' },
] as const;

export const compareRound = {
  left: 3,
  right: 4,
  prompt: 'Which group has more seeds?',
} as const;

export function markSeedCounted(counted: readonly string[], seedId: string): string[] {
  if (!seedSet.some((seed) => seed.id === seedId) || counted.includes(seedId)) {
    return [...counted];
  }
  return [...counted, seedId];
}

export function countIsComplete(counted: readonly string[]): boolean {
  return new Set(counted).size === seedSet.length
    && seedSet.every((seed) => counted.includes(seed.id));
}

export function countAnswerIsCorrect(answer: number): boolean {
  return Number.isInteger(answer) && answer === seedSet.length;
}

export function zeroAnswerIsCorrect(answer: number): boolean {
  return Number.isInteger(answer) && answer === 0;
}

export function nextNumberAfterIsCorrect(current: number, answer: number): boolean {
  return Number.isInteger(current) && Number.isInteger(answer)
    && current >= 0 && current < 5 && answer === current + 1;
}

export function compareAnswerIsCorrect(selected: 'left' | 'right'): boolean {
  return selected === (compareRound.left > compareRound.right ? 'left' : 'right');
}

export function changeAmount(start: number, delta: 1 | -1): number {
  if (!Number.isInteger(start) || start < 0 || start > 5) {
    throw new RangeError('Start with a whole-number amount from zero to five.');
  }
  const next = start + delta;
  if (next < 0 || next > 5) {
    throw new RangeError('Keep the garden amount between zero and five.');
  }
  return next;
}

export function amountAnswerIsCorrect(answer: number, expected: number): boolean {
  return Number.isInteger(answer) && answer === expected && expected >= 0 && expected <= 5;
}

export function isValidDecomposition(total: number, firstPart: number, secondPart: number): boolean {
  return Number.isInteger(total) && Number.isInteger(firstPart) && Number.isInteger(secondPart)
    && total > 0 && firstPart > 0 && secondPart > 0
    && firstPart + secondPart === total;
}

export function multiplicationAnswerIsCorrect(answer: number, groups: number, perGroup: number): boolean {
  return Number.isInteger(answer) && Number.isInteger(groups) && Number.isInteger(perGroup)
    && groups > 0 && groups <= 6 && perGroup > 0 && perGroup <= 6
    && groups * perGroup <= 12 && answer === groups * perGroup;
}

export function equalShareAnswerIsCorrect(perGroup: number, total: number, groups: number): boolean {
  return Number.isInteger(perGroup) && Number.isInteger(total) && Number.isInteger(groups)
    && total >= 0 && total <= 12 && groups > 0 && groups <= 6
    && total % groups === 0 && perGroup === total / groups;
}

export function placeValueAnswerIsCorrect(answer: number, tens: number, ones: number): boolean {
  return Number.isInteger(answer) && Number.isInteger(tens) && Number.isInteger(ones)
    && tens >= 0 && tens <= 9 && ones >= 0 && ones <= 9
    && answer === tens * 10 + ones;
}

export function equalFractionAnswerIsCorrect(answer: string, shadedParts: number, totalParts: number): boolean {
  if (!Number.isInteger(shadedParts) || !Number.isInteger(totalParts)
    || totalParts <= 0 || shadedParts <= 0 || shadedParts > totalParts || totalParts > 12) return false;
  const match = /^(\d+)\/(\d+)$/.exec(answer);
  if (!match) return false;
  const numerator = Number(match[1]);
  const denominator = Number(match[2]);
  return Number.isInteger(numerator) && Number.isInteger(denominator)
    && numerator > 0 && denominator > 0 && denominator <= 12
    && numerator * totalParts === shadedParts * denominator;
}

export function decimalTenthsAnswerIsCorrect(answer: string, shadedParts: number, totalParts: number): boolean {
  if (!Number.isInteger(shadedParts) || !Number.isInteger(totalParts)
    || totalParts <= 0 || shadedParts < 0 || shadedParts > totalParts || totalParts > 10) return false;
  const match = /^(\d+)\.(\d+)$/.exec(answer);
  if (!match) return false;
  const whole = Number(match[1]);
  const decimalDigits = match[2];
  const fraction = Number(decimalDigits);
  const scale = 10 ** decimalDigits.length;
  return Number.isSafeInteger(whole) && Number.isSafeInteger(fraction)
    && scale <= 1000 && whole * scale * totalParts + fraction * totalParts === shadedParts * scale;
}

export function percentOfEqualPartsAnswerIsCorrect(answer: number, shadedParts: number, totalParts: number): boolean {
  return Number.isInteger(answer) && Number.isInteger(shadedParts) && Number.isInteger(totalParts)
    && totalParts > 0 && totalParts <= 100 && shadedParts >= 0 && shadedParts <= totalParts
    && answer >= 0 && answer <= 100 && answer * totalParts === shadedParts * 100;
}

export function fartherRightFractionAnswerIsCorrect(
  answer: string,
  firstNumerator: number,
  firstDenominator: number,
  secondNumerator: number,
  secondDenominator: number,
): boolean {
  const valid = (numerator: number, denominator: number) => Number.isInteger(numerator)
    && Number.isInteger(denominator) && denominator > 0 && denominator <= 100
    && numerator >= 0 && numerator <= denominator;
  if (!valid(firstNumerator, firstDenominator) || !valid(secondNumerator, secondDenominator)) return false;
  const comparison = firstNumerator * secondDenominator - secondNumerator * firstDenominator;
  if (comparison === 0) return false;
  return answer === (comparison > 0
    ? `${firstNumerator}/${firstDenominator}`
    : `${secondNumerator}/${secondDenominator}`);
}

export function shapeSidesAnswerIsCorrect(answer: string, expectedSides: number): boolean {
  const sidesByShape: Record<string, number> = { triangle: 3, square: 4, circle: 0 };
  return Number.isInteger(expectedSides) && Object.hasOwn(sidesByShape, answer)
    && sidesByShape[answer] === expectedSides;
}

export function longerScreenMeasureAnswerIsCorrect(answer: 'left' | 'right', leftUnits: number, rightUnits: number): boolean {
  return Number.isInteger(leftUnits) && Number.isInteger(rightUnits)
    && leftUnits > 0 && rightUnits > 0 && leftUnits <= 10 && rightUnits <= 10
    && leftUnits !== rightUnits
    && answer === (leftUnits > rightUnits ? 'left' : 'right');
}

export function solidWithoutFlatFacesAnswerIsCorrect(answer: string): boolean {
  return answer === 'sphere';
}

export function unitCubeVolumeAnswerIsCorrect(answer: number, rows: number, columns: number, layers: number): boolean {
  return Number.isInteger(answer) && Number.isInteger(rows) && Number.isInteger(columns) && Number.isInteger(layers)
    && rows > 0 && columns > 0 && layers > 0 && rows <= 4 && columns <= 4 && layers <= 4
    && rows * columns * layers <= 32 && answer === rows * columns * layers;
}

export function wholeHourAnswerIsCorrect(answer: number, expectedHour: number): boolean {
  return Number.isInteger(answer) && Number.isInteger(expectedHour)
    && answer >= 1 && answer <= 12 && expectedHour >= 1 && expectedHour <= 12
    && answer === expectedHour;
}

export function heavierBalanceSideAnswerIsCorrect(
  answer: 'left' | 'right',
  leftUnits: number,
  rightUnits: number,
): boolean {
  return Number.isInteger(leftUnits) && Number.isInteger(rightUnits)
    && leftUnits >= 1 && leftUnits <= 5 && rightUnits >= 1 && rightUnits <= 5
    && leftUnits !== rightUnits
    && answer === (leftUnits > rightUnits ? 'left' : 'right');
}

export function pretendTokenAmountAnswerIsCorrect(answer: number, tokenValues: readonly number[]): boolean {
  return Number.isInteger(answer) && tokenValues.length > 0 && tokenValues.length <= 5
    && tokenValues.every((value) => Number.isInteger(value) && value >= 1 && value <= 5)
    && answer === tokenValues.reduce((total, value) => total + value, 0);
}

export function pretendTokenPurseWithMorePointsAnswerIsCorrect(
  answer: 'left' | 'right',
  leftValues: readonly number[],
  rightValues: readonly number[],
): boolean {
  const validPurse = (values: readonly number[]) => values.length > 0 && values.length <= 5
    && values.every((value) => Number.isInteger(value) && value >= 1 && value <= 5);
  if (!validPurse(leftValues) || !validPurse(rightValues)) return false;
  const leftTotal = leftValues.reduce((total, value) => total + value, 0);
  const rightTotal = rightValues.reduce((total, value) => total + value, 0);
  return leftTotal !== rightTotal && answer === (leftTotal > rightTotal ? 'left' : 'right');
}

export function mostSproutsBedAnswerIsCorrect(
  answer: string,
  data: readonly { bed: string; sprouts: number }[],
): boolean {
  if (data.length < 2 || data.length > 8) return false;
  const names = data.map((entry) => entry.bed);
  if (names.some((name) => typeof name !== 'string' || name.trim().length === 0)
    || new Set(names).size !== names.length
    || data.some((entry) => !Number.isInteger(entry.sprouts) || entry.sprouts < 0 || entry.sprouts > 10)) return false;
  const highest = Math.max(...data.map((entry) => entry.sprouts));
  const winners = data.filter((entry) => entry.sprouts === highest);
  return winners.length === 1 && answer === winners[0].bed;
}

export function nextAlternatingShapeAnswerIsCorrect(answer: string, sequence: readonly string[]): boolean {
  const allowed = new Set(['circle', 'triangle']);
  if (sequence.length < 3 || sequence.length > 10 || sequence.some((shape) => !allowed.has(shape))) return false;
  const first = sequence[0];
  const second = sequence[1];
  if (first === second) return false;
  const followsAlternation = sequence.every((shape, index) => shape === (index % 2 === 0 ? first : second));
  if (!followsAlternation) return false;
  return answer === (sequence.length % 2 === 0 ? first : second);
}

const usCurrencyDenominationsCents = [1, 5, 10, 25, 50, 100, 200] as const;

export function usMoneyValueAnswerIsCorrect(answerCents: number, expectedCents: number): boolean {
  return Number.isInteger(answerCents)
    && usCurrencyDenominationsCents.includes(expectedCents as (typeof usCurrencyDenominationsCents)[number])
    && answerCents === expectedCents;
}

export function usMoneyTotalAnswerIsCorrect(answerCents: number, valuesCents: readonly number[]): boolean {
  return Number.isInteger(answerCents) && answerCents > 0 && answerCents <= 10000
    && valuesCents.length >= 2 && valuesCents.length <= 4
    && valuesCents.every((value) => Number.isInteger(value)
      && usCurrencyDenominationsCents.includes(value as (typeof usCurrencyDenominationsCents)[number]))
    && answerCents === valuesCents.reduce((sum, value) => sum + value, 0);
}

export function unitCubeVolumeComparisonAnswerIsCorrect(
  answer: 'left' | 'right',
  left: readonly number[],
  right: readonly number[],
): boolean {
  const volume = (dimensions: readonly number[]) => dimensions.length === 3
    && dimensions.every((side) => Number.isInteger(side) && side >= 1 && side <= 4)
    ? dimensions.reduce((total, side) => total * side, 1)
    : null;
  const leftVolume = volume(left);
  const rightVolume = volume(right);
  return leftVolume !== null && rightVolume !== null && leftVolume !== rightVolume
    && answer === (leftVolume > rightVolume ? 'left' : 'right');
}

export function quarterTurnDirectionAnswerIsCorrect(answer: string, startingDirection: string, clockwiseQuarterTurns: number): boolean {
  const directions = ['up', 'right', 'down', 'left'];
  if (!directions.includes(startingDirection) || !Number.isInteger(clockwiseQuarterTurns)
    || clockwiseQuarterTurns < 1 || clockwiseQuarterTurns > 3) return false;
  const expected = directions[(directions.indexOf(startingDirection) + clockwiseQuarterTurns) % directions.length];
  return answer === expected;
}

export function rectanglePerimeterAnswerIsCorrect(answer: number, rows: number, columns: number): boolean {
  return Number.isInteger(answer) && Number.isInteger(rows) && Number.isInteger(columns)
    && rows >= 1 && columns >= 1 && rows <= 10 && columns <= 10 && rows * columns <= 50
    && answer === 2 * (rows + columns);
}

export function modelRulerLengthAnswerIsCorrect(answerUnits: number, startMark: number, endMark: number): boolean {
  return Number.isInteger(answerUnits) && Number.isInteger(startMark) && Number.isInteger(endMark)
    && startMark >= 0 && startMark <= 12 && endMark > startMark && endMark <= 12
    && answerUnits === endMark - startMark;
}

export function elapsedWholeHoursAnswerIsCorrect(answerHours: number, startHour: number, endHour: number): boolean {
  return Number.isInteger(answerHours) && Number.isInteger(startHour) && Number.isInteger(endHour)
    && startHour >= 1 && startHour <= 11 && endHour > startHour && endHour <= 12
    && answerHours === endHour - startHour;
}

export function equalUnitMassAnswerIsCorrect(answerUnits: number, shownUnits: number): boolean {
  return Number.isInteger(answerUnits) && Number.isInteger(shownUnits)
    && shownUnits >= 1 && shownUnits <= 10 && answerUnits === shownUnits;
}

export function moreLikelyOutcomeAnswerIsCorrect(answer: string, firstCount: number, secondCount: number): boolean {
  if (!Number.isInteger(firstCount) || !Number.isInteger(secondCount)
    || firstCount < 0 || secondCount < 0 || firstCount > 10 || secondCount > 10
    || firstCount + secondCount < 1 || firstCount + secondCount > 10 || firstCount === secondCount) return false;
  return answer === (firstCount > secondCount ? 'first-more-likely' : 'second-more-likely');
}

export function equivalentRatioAnswerIsCorrect(
  answerFirst: number, answerSecond: number, originalFirst: number, originalSecond: number,
): boolean {
  return Number.isInteger(answerFirst) && Number.isInteger(answerSecond)
    && Number.isInteger(originalFirst) && Number.isInteger(originalSecond)
    && answerFirst >= 1 && answerFirst <= 20 && answerSecond >= 1 && answerSecond <= 20
    && originalFirst >= 1 && originalFirst <= 10 && originalSecond >= 1 && originalSecond <= 10
    && answerFirst * originalSecond === answerSecond * originalFirst;
}

export function additionFunctionOutputAnswerIsCorrect(answer: number, input: number, addend: number): boolean {
  return Number.isInteger(answer) && Number.isInteger(input) && Number.isInteger(addend)
    && input >= 0 && input <= 20 && addend >= 0 && addend <= 10
    && answer === input + addend;
}

export function additionFunctionRuleAnswerIsCorrect(
  answer: string, inputs: readonly number[], outputs: readonly number[], addend: number,
): boolean {
  return answer === 'add-constant' && Number.isInteger(addend) && addend >= 0 && addend <= 10
    && inputs.length >= 2 && inputs.length <= 6 && outputs.length === inputs.length
    && inputs.every((input, index) => Number.isInteger(input) && input >= 0 && input <= 20
      && additionFunctionOutputAnswerIsCorrect(outputs[index], input, addend));
}

export function sproutChartAnswerIsCorrect(
  answer: readonly (number | null)[],
  data: readonly { bed: string; sprouts: number }[],
): boolean {
  return data.length >= 2 && data.length <= 5
    && answer.length === data.length
    && new Set(data.map((entry) => entry.bed)).size === data.length
    && data.every((entry, index) => Number.isInteger(entry.sprouts) && entry.sprouts >= 0 && entry.sprouts <= 10
      && answer[index] === entry.sprouts);
}

export function sproutClaimAnswerIsCorrect(
  answer: 'supported' | 'not-supported',
  claimedBed: string,
  data: readonly { bed: string; sprouts: number }[],
): boolean {
  if (data.length < 2 || data.length > 5 || new Set(data.map((entry) => entry.bed)).size !== data.length
    || !data.some((entry) => entry.bed === claimedBed)
    || data.some((entry) => !Number.isInteger(entry.sprouts) || entry.sprouts < 0 || entry.sprouts > 10)) return false;
  const maximum = Math.max(...data.map((entry) => entry.sprouts));
  const leaders = data.filter((entry) => entry.sprouts === maximum);
  if (leaders.length !== 1) return false;
  const claimIsSupported = leaders[0].bed === claimedBed;
  return answer === (claimIsSupported ? 'supported' : 'not-supported');
}

export function alternatingShapeRuleAnswerIsCorrect(answer: string, sequence: readonly string[]): boolean {
  return sequence.length >= 4 && sequence.length <= 10
    && sequence.every((shape, index) => shape === (index % 2 === 0 ? sequence[0] : sequence[1]))
    && sequence[0] !== sequence[1]
    && answer === 'first-shape-second-shape-repeat';
}

export function mathPublicationBlockers(): string[] {
  return [
    'Version 20 replaces the earlier currency sample with a U.S. dollar and cents lesson; new U.S. wording and screen rendering need recorded review.',
    'The user reports reviewing the MATH-05 solid-shape and unit-cube volume prompts; reviewer identities and findings are not attached to this draft.',
    'Review completion for version-2 and MATH-02 through MATH-05 prompts is reported by the user; reviewer identities and findings are not attached to this draft.',
    'The new MATH-06 chart-building, claim-checking, and pattern-rule wording needs review.',
    'Version 20 U.S. money/ruler wording and geometry, measurement, chance, ratio, and algebra prompts need separate recorded content review.',
    'The activity remains a draft and has not been separately authorized for publication or merge.',
    'EDU-M2 still requires broader MATH-05 outcomes and MATH-06 outcomes beyond this draft sequence; qualified and manual review gates remain open.',
  ];
}
