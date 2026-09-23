export const numberGardenManifest = {
  activityId: 'math-number-garden-001',
  version: 7,
  language: 'en',
  localeVariant: 'en_v2_m02_reviewed_m03_m04_draft',
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

export function mathPublicationBlockers(): string[] {
  return [
    'The new MATH-03 equal-groups, array, and sharing prompts were authored after the reported reviews and still need review.',
    'The new MATH-04 place-value and equal-fraction prompts are a draft and still need review.',
    'Review completion for version-2 and MATH-02 content is reported by the product owner; reviewer identities and findings are not attached to this draft.',
    'The activity remains a draft and has not been separately authorized for publication or merge.',
    'EDU-M2 still requires the remaining MATH-04 through MATH-06 outcomes.',
  ];
}
