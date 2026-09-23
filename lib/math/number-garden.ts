export const numberGardenManifest = {
  activityId: 'math-number-garden-001',
  version: 4,
  language: 'en',
  localeVariant: 'en_review_completion_reported',
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

export function mathPublicationBlockers(): string[] {
  return [
    'Review completion is reported by the product owner; reviewer identities, findings, and sign-off records are not attached to this draft.',
    'Real-device, screen-reader, and family review outcomes are not documented in this repository.',
    'The activity remains a draft and has not been separately authorized for publication or merge.',
    'EDU-M2 still requires the remaining reviewed number-path units.',
  ];
}
