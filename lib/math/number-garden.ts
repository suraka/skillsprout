export const numberGardenManifest = {
  activityId: 'math-number-garden-001',
  version: 12,
  language: 'en',
  localeVariant: 'en_v2_m02_m03_m04_m05_time_draft',
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

export function mathPublicationBlockers(): string[] {
  return [
    'The new MATH-05 whole-hour time prompt is a draft and needs review.',
    'The user reports reviewing the MATH-05 solid-shape and unit-cube volume prompts; reviewer identities and findings are not attached to this draft.',
    'Review completion for version-2 and MATH-02 through MATH-05 prompts is reported by the user; reviewer identities and findings are not attached to this draft.',
    'The activity remains a draft and has not been separately authorized for publication or merge.',
    'EDU-M2 still requires remaining MATH-05 measurement outcomes and MATH-06 outcomes.',
  ];
}
