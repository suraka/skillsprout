export type OutcomeId = 'LIT-01' | 'LIT-02' | 'LIT-03' | 'LIT-04';

export type Outcome = Readonly<{
  id: OutcomeId;
  title: string;
  description: string;
  prerequisites: readonly OutcomeId[];
}>;

export const outcomes: readonly Outcome[] = [
  {
    id: 'LIT-01',
    title: 'Notice a beginning sound',
    description: 'Choose a familiar word that begins with the same sound as a spoken example.',
    prerequisites: [],
  },
  {
    id: 'LIT-02',
    title: 'Recognize a letter',
    description: 'Find the printed lowercase letter m, a, or t in a small set.',
    prerequisites: ['LIT-01'],
  },
  {
    id: 'LIT-03',
    title: 'Connect a sound to a letter',
    description: 'Match the first sound in a familiar spoken word to m, a, or t.',
    prerequisites: ['LIT-02'],
  },
  {
    id: 'LIT-04',
    title: 'Blend a short word',
    description: 'Arrange the taught correspondences m, a, and t to build the word mat.',
    prerequisites: ['LIT-03'],
  },
];

export type PictureChoice = Readonly<{
  id: string;
  word: string;
  picture: 'moon' | 'map' | 'sun' | 'top' | 'apple' | 'mat';
  initialSound: string;
}>;

export type SoundCard = Readonly<{
  id: string;
  word: string;
  sound: string;
  grapheme: string;
}>;

export type ActivityManifest = Readonly<{
  activityId: string;
  version: number;
  outcomeIds: readonly OutcomeId[];
  prerequisites: readonly OutcomeId[];
  language: 'en';
  localeVariant: 'pending_qualified_review' | 'en-GH' | 'en-GB' | 'en-US';
  abilityBand: 'beginning_reader';
  reviewStatus: 'draft' | 'approved';
  contentReviewer: 'pending' | 'approved';
  pronunciationReviewer: 'pending' | 'approved';
  accessibilityReviewer: 'pending' | 'approved';
  safetyReviewer: 'pending' | 'approved';
  assetReview: 'pending' | 'approved';
  requiresAccount: false;
  requiresAi: false;
  requiresCameraOrMic: false;
  savesLearnerData: false;
}>;

export const activityManifests: readonly ActivityManifest[] = [
  {
    activityId: 'lit-sound-safari-001',
    version: 1,
    outcomeIds: ['LIT-01'],
    prerequisites: [],
    language: 'en',
    localeVariant: 'pending_qualified_review',
    abilityBand: 'beginning_reader',
    reviewStatus: 'draft',
    contentReviewer: 'pending',
    pronunciationReviewer: 'pending',
    accessibilityReviewer: 'pending',
    safetyReviewer: 'pending',
    assetReview: 'pending',
    requiresAccount: false,
    requiresAi: false,
    requiresCameraOrMic: false,
    savesLearnerData: false,
  },
  {
    activityId: 'lit-letter-sound-001',
    version: 1,
    outcomeIds: ['LIT-02', 'LIT-03'],
    prerequisites: ['LIT-01'],
    language: 'en',
    localeVariant: 'pending_qualified_review',
    abilityBand: 'beginning_reader',
    reviewStatus: 'draft',
    contentReviewer: 'pending',
    pronunciationReviewer: 'pending',
    accessibilityReviewer: 'pending',
    safetyReviewer: 'pending',
    assetReview: 'pending',
    requiresAccount: false,
    requiresAi: false,
    requiresCameraOrMic: false,
    savesLearnerData: false,
  },
  {
    activityId: 'lit-word-builder-001',
    version: 1,
    outcomeIds: ['LIT-04'],
    prerequisites: ['LIT-02', 'LIT-03'],
    language: 'en',
    localeVariant: 'pending_qualified_review',
    abilityBand: 'beginning_reader',
    reviewStatus: 'draft',
    contentReviewer: 'pending',
    pronunciationReviewer: 'pending',
    accessibilityReviewer: 'pending',
    safetyReviewer: 'pending',
    assetReview: 'pending',
    requiresAccount: false,
    requiresAi: false,
    requiresCameraOrMic: false,
    savesLearnerData: false,
  },
];

export function activityPublicationBlockers(manifest: ActivityManifest): string[] {
  const blockers: string[] = [];
  if (!manifest.activityId || manifest.version < 1) blockers.push('A versioned activity ID is required.');
  if (!manifest.outcomeIds.length) blockers.push('At least one reviewed outcome is required.');
  if (manifest.reviewStatus !== 'approved') blockers.push('Qualified subject review is pending.');
  if (manifest.localeVariant === 'pending_qualified_review') blockers.push('A reviewed English locale variant is pending.');
  if (manifest.contentReviewer !== 'approved') blockers.push('Content review is pending.');
  if (manifest.pronunciationReviewer !== 'approved') blockers.push('Pronunciation review is pending.');
  if (manifest.accessibilityReviewer !== 'approved') blockers.push('Accessibility review is pending.');
  if (manifest.safetyReviewer !== 'approved') blockers.push('Safety review is pending.');
  if (manifest.assetReview !== 'approved') blockers.push('Original media and asset review is pending.');
  return blockers;
}

export const firstSoundRound = {
  id: 'lit-sound-safari-001',
  outcomeIds: ['LIT-01'] as const,
  targetWord: 'moon',
  targetSound: 'm',
  choices: [
    { id: 'map', word: 'map', picture: 'map', initialSound: 'm' },
    { id: 'sun', word: 'sun', picture: 'sun', initialSound: 's' },
    { id: 'top', word: 'top', picture: 'top', initialSound: 't' },
  ] satisfies readonly PictureChoice[],
};

export const soundCards: readonly SoundCard[] = [
  { id: 'm', word: 'moon', sound: 'm', grapheme: 'm' },
  { id: 'a', word: 'apple', sound: 'a', grapheme: 'a' },
  { id: 't', word: 'top', sound: 't', grapheme: 't' },
];

export const wordBuilder = {
  id: 'lit-word-builder-001',
  answer: ['m', 'a', 't'] as const,
  displayWord: 'mat',
  choices: ['a', 'm', 't', 's'] as const,
};

export type PracticeRecord = Readonly<{
  activityId: string;
  outcomeIds: readonly OutcomeId[];
  status: 'practiced_in_this_visit';
  correctResponses: number;
  totalResponses: number;
  provenance: 'guest_local_activity';
}>;

export function initialSoundMatches(choiceId: string): boolean {
  const choice = firstSoundRound.choices.find((item) => item.id === choiceId);
  return Boolean(choice && choice.initialSound === firstSoundRound.targetSound);
}

export function soundMatchesLetter(cardId: string, selectedLetter: string): boolean {
  const card = soundCards.find((item) => item.id === cardId);
  return Boolean(card && card.grapheme === selectedLetter);
}

export function wordIsDecodable(letters: readonly string[]): boolean {
  return letters.length === wordBuilder.answer.length
    && letters.every((letter, index) => letter === wordBuilder.answer[index]);
}

export function canOpenOutcome(outcomeId: OutcomeId, practiced: readonly OutcomeId[]): boolean {
  const outcome = outcomes.find((item) => item.id === outcomeId);
  return Boolean(outcome && outcome.prerequisites.every((id) => practiced.includes(id)));
}

export function makePracticeRecord(
  activityId: string,
  outcomeIds: readonly OutcomeId[],
  correctResponses: number,
  totalResponses: number,
): PracticeRecord {
  return {
    activityId,
    outcomeIds: [...outcomeIds],
    status: 'practiced_in_this_visit',
    correctResponses: Math.max(0, Math.min(totalResponses, correctResponses)),
    totalResponses: Math.max(0, totalResponses),
    provenance: 'guest_local_activity',
  };
}

export function validateOutcomeGraph(): string | null {
  const known = new Set(outcomes.map((outcome) => outcome.id));
  const visits = new Set<OutcomeId>();
  const active = new Set<OutcomeId>();
  const byId = new Map(outcomes.map((outcome) => [outcome.id, outcome]));

  for (const outcome of outcomes) {
    if (!outcome.id || !outcome.title || !outcome.description) return 'Every outcome needs an ID, title, and description.';
    for (const prerequisite of outcome.prerequisites) {
      if (!known.has(prerequisite)) return 'An outcome references a missing prerequisite.';
      if (prerequisite === outcome.id) return 'An outcome cannot depend on itself.';
    }
  }

  function visit(id: OutcomeId): boolean {
    if (active.has(id)) return false;
    if (visits.has(id)) return true;
    active.add(id);
    const outcome = byId.get(id);
    if (!outcome) return false;
    for (const prerequisite of outcome.prerequisites) {
      if (!visit(prerequisite)) return false;
    }
    active.delete(id);
    visits.add(id);
    return true;
  }

  for (const outcome of outcomes) {
    if (!visit(outcome.id)) return 'The outcome prerequisite graph must be complete and acyclic.';
  }
  return null;
}
