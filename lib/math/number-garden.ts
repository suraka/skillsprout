export const numberGardenManifest = {
  activityId: 'math-number-garden-001',
  version: 17,
  language: 'en',
  localeVariant: 'en_v2_m02_m03_m04_m05_m06_pattern_draft',
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

export function mathPublicationBlockers(): string[] {
  return [
    'The user reports reviewing Number Garden prompts through version 17 and additional MATH-05 prompt materials; formal reviewer identities and findings are not attached to this draft.',
    'The user reports reviewing the MATH-05 solid-shape and unit-cube volume prompts; reviewer identities and findings are not attached to this draft.',
    'Review completion for version-2 and MATH-02 through MATH-05 prompts is reported by the user; reviewer identities and findings are not attached to this draft.',
    'The activity remains a draft and has not been separately authorized for publication or merge.',
    'EDU-M2 still requires remaining MATH-05 implementation outcomes and the complete MATH-06 sequence.',
  ];
}
