import assert from 'node:assert/strict';
import test from 'node:test';
import {
  activityManifests,
  activityPublicationBlockers,
  canOpenOutcome,
  firstSoundRound,
  initialSoundMatches,
  makePracticeRecord,
  outcomes,
  soundMatchesLetter,
  soundCards,
  validateOutcomeGraph,
  wordBuilder,
  wordIsDecodable,
} from '../.literacy-test-build/foundation.js';

test('EDU-L01: first task has one deterministic initial-sound answer', () => {
  assert.equal(firstSoundRound.targetWord, 'moon');
  assert.deepEqual(firstSoundRound.choices.map((choice) => choice.id), ['map', 'sun', 'top']);
  assert.equal(firstSoundRound.choices.filter((choice) => initialSoundMatches(choice.id)).length, 1);
  assert.equal(initialSoundMatches('map'), true);
  assert.equal(initialSoundMatches('sun'), false);
  assert.equal(initialSoundMatches('unknown'), false);
});

test('EDU-L02: sound-to-letter keys agree for every taught correspondence', () => {
  for (const card of soundCards) {
    assert.equal(soundMatchesLetter(card.id, card.grapheme), true);
    assert.equal(soundMatchesLetter(card.id, 'x'), false);
  }
  assert.equal(soundMatchesLetter('unknown', 'm'), false);
});

test('EDU-L03: only the taught sequence m-a-t is accepted as the decodable word', () => {
  assert.equal(wordIsDecodable(wordBuilder.answer), true);
  assert.equal(wordIsDecodable(['m', 't', 'a']), false);
  assert.equal(wordIsDecodable(['m', 'a']), false);
  assert.equal(wordIsDecodable(['m', 'a', 't', 's']), false);
});

test('EDU-L04: later outcomes stay closed until their prerequisite practice exists', () => {
  assert.equal(canOpenOutcome('LIT-01', []), true);
  assert.equal(canOpenOutcome('LIT-02', []), false);
  assert.equal(canOpenOutcome('LIT-02', ['LIT-01']), true);
  assert.equal(canOpenOutcome('LIT-03', ['LIT-01']), false);
  assert.equal(canOpenOutcome('LIT-04', ['LIT-01', 'LIT-02', 'LIT-03']), true);
});

test('EDU-L05: guest practice is transient evidence, never mastery or learner identity', () => {
  const record = makePracticeRecord('lit-word-builder-001', ['LIT-04'], 8, 3);
  assert.deepEqual(record, {
    activityId: 'lit-word-builder-001',
    outcomeIds: ['LIT-04'],
    status: 'practiced_in_this_visit',
    correctResponses: 3,
    totalResponses: 3,
    provenance: 'guest_local_activity',
  });
  assert.equal('learnerId' in record, false);
  assert.equal('mastery' in record, false);
});

test('EDU-L06: the published-sequence prerequisite graph is complete and acyclic', () => {
  assert.equal(validateOutcomeGraph(), null);
  assert.deepEqual(outcomes.map((outcome) => outcome.id), ['LIT-01', 'LIT-02', 'LIT-03', 'LIT-04']);
});

test('EDU-L07: all activity manifests stay unpublished until every review gate is approved', () => {
  assert.equal(activityManifests.length, 3);
  for (const manifest of activityManifests) {
    assert.equal(manifest.language, 'en');
    assert.equal(manifest.requiresAccount, false);
    assert.equal(manifest.requiresAi, false);
    assert.equal(manifest.requiresCameraOrMic, false);
    assert.equal(manifest.savesLearnerData, false);
    assert.ok(activityPublicationBlockers(manifest).length >= 5);
  }
});
