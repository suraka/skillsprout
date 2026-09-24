'use client';

import Link from 'next/link';
import { useEffect, useState, useSyncExternalStore } from 'react';
import {
  canOpenOutcome,
  firstSoundRound,
  initialSoundMatches,
  makePracticeRecord,
  outcomes,
  soundCards,
  soundMatchesLetter,
  wordBuilder,
  wordIsDecodable,
  type OutcomeId,
  type PracticeRecord,
} from '@/lib/literacy/foundation';

type PictureName = 'map' | 'sun' | 'top';
const subscribe = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

const practiceTitles: Record<string, string> = {
  'lit-sound-safari-001': 'Sound Safari: noticed an initial sound',
  'lit-letter-sound-001': 'Letter Garden: explored three sound and letter pairs',
  'lit-word-builder-001': 'Word Builder: arranged m, a and t as mat',
};

function Picture({ name }: { name: PictureName }) {
  if (name === 'sun') {
    return <svg className="lit-picture" viewBox="0 0 100 86" aria-hidden="true">
      <g stroke="#bc6c31" strokeWidth="5" strokeLinecap="round">
        <path d="M50 5v9M50 72v9M9 43h9M82 43h9M21 14l7 7M72 65l7 7M79 14l-7 7M28 65l-7 7"/>
      </g><circle cx="50" cy="43" r="25" fill="#f1bb55"/>
      <circle cx="42" cy="39" r="2" fill="#3b4631"/><circle cx="58" cy="39" r="2" fill="#3b4631"/>
      <path d="M42 49q8 8 16 0" fill="none" stroke="#3b4631" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>;
  }
  if (name === 'top') {
    return <svg className="lit-picture" viewBox="0 0 100 86" aria-hidden="true">
      <path d="M50 10 83 48H17L50 10Z" fill="#8dbb82" stroke="#315842" strokeWidth="3"/>
      <path d="M22 48h56v12H22z" fill="#e4a363" stroke="#315842" strokeWidth="3"/>
      <path d="M50 60v16" stroke="#315842" strokeWidth="4" strokeLinecap="round"/>
      <circle cx="50" cy="80" r="3" fill="#315842"/>
    </svg>;
  }
  return <svg className="lit-picture" viewBox="0 0 100 86" aria-hidden="true">
    <path d="M13 19q0-5 5-5h64q5 0 5 5v48q0 5-5 5H18q-5 0-5-5V19Z" fill="#f2e7cb" stroke="#536a50" strokeWidth="3"/>
    <path d="M18 28h19v14H18zm45 24h19v14H63z" fill="#d98664"/>
    <path d="M36 21h28v45H36z" fill="#a9c5a4"/>
    <path d="M37 43h27" stroke="#fff7e7" strokeWidth="6" strokeDasharray="5 5"/>
  </svg>;
}

function localEnglishVoice(): SpeechSynthesisVoice | undefined {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return undefined;
  return window.speechSynthesis.getVoices().find((voice) =>
    voice.localService && voice.lang.toLowerCase().startsWith('en'),
  );
}

function useLocalVoice() {
  const [available, setAvailable] = useState(false);
  useEffect(() => {
    if (!('speechSynthesis' in window)) return;
    const refresh = () => setAvailable(Boolean(localEnglishVoice()));
    refresh();
    window.speechSynthesis.addEventListener('voiceschanged', refresh);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', refresh);
  }, []);
  return available;
}

export function LiteracyPath() {
  const ready = useSyncExternalStore(subscribe, clientReady, serverReady);
  const [step, setStep] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [placedLetters, setPlacedLetters] = useState<string[]>([]);
  const [practice, setPractice] = useState<OutcomeId[]>([]);
  const [records, setRecords] = useState<PracticeRecord[]>([]);
  const [feedback, setFeedback] = useState('Choose a lesson when you are ready.');
  const [paused, setPaused] = useState(false);
  const voiceAvailable = useLocalVoice();

  useEffect(() => () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }, []);

  function speak(word: string) {
    const voice = localEnglishVoice();
    if (!voice || !('speechSynthesis' in window)) {
      setFeedback('No local English voice is available here. A grown-up can say the word aloud.');
      return;
    }
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.voice = voice;
    utterance.lang = voice.lang;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setFeedback('Playing a built-in device voice. This is a draft preview, not a reviewed recording.');
  }

  function addPractice(record: PracticeRecord, outcomes: readonly OutcomeId[]) {
    setRecords((current) => [...current.filter((item) => item.activityId !== record.activityId), record]);
    setPractice((current) => [...new Set([...current, ...outcomes])]);
  }

  function reset() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setStep(0);
    setLetterIndex(0);
    setPlacedLetters([]);
    setPractice([]);
    setRecords([]);
    setPaused(false);
    setFeedback('Choose a lesson when you are ready.');
  }

  function pause() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setPaused(true);
  }

  function startLesson(nextStep: number) {
    const outcome: OutcomeId = nextStep === 1 ? 'LIT-01' : nextStep === 2 ? 'LIT-02' : 'LIT-04';
    if (!canOpenOutcome(outcome, practice)) {
      setFeedback('Try the earlier lesson first. Each step uses something from the one before it.');
      return;
    }
    setStep(nextStep);
    setPaused(false);
    setFeedback(nextStep === 1
      ? 'A grown-up can say “moon”. Find a picture that begins with the same first sound.'
      : nextStep === 2
        ? 'Listen to each word, then choose its first letter.'
        : 'Build the word mat with the letters you just explored.');
  }

  function choosePicture(id: string) {
    if (paused) return;
    if (!initialSoundMatches(id)) {
      setFeedback('Let’s try again. Ask a grown-up to say “moon”, then listen for its first sound.');
      return;
    }
    addPractice(makePracticeRecord(firstSoundRound.id, ['LIT-01'], 1, 1), ['LIT-01']);
    setFeedback('You found a word that begins like moon. The next lesson connects sounds and letters.');
    setStep(2);
  }

  function chooseLetter(letter: string) {
    if (paused) return;
    const card = soundCards[letterIndex];
    if (!soundMatchesLetter(card.id, letter)) {
      setFeedback('Look at the word and try its first letter again. A grown-up can say it slowly.');
      return;
    }
    const nextIndex = letterIndex + 1;
    if (nextIndex < soundCards.length) {
      setLetterIndex(nextIndex);
      setFeedback('That sound and letter go together. Try the next word.');
      return;
    }
    const completedOutcomes: OutcomeId[] = ['LIT-02', 'LIT-03'];
    addPractice(makePracticeRecord('lit-letter-sound-001', completedOutcomes, soundCards.length, soundCards.length), completedOutcomes);
    setFeedback('You explored three sound and letter pairs. Now you can use m, a and t to build a word.');
    setStep(3);
  }

  function addLetter(letter: string) {
    if (paused || placedLetters.length >= wordBuilder.answer.length) return;
    setPlacedLetters((current) => [...current, letter]);
    setFeedback('Letter added. Keep going, or remove the last one and try again.');
  }

  function removeLastLetter() {
    setPlacedLetters((current) => current.slice(0, -1));
    setFeedback('Last letter removed.');
  }

  function checkWord() {
    if (!wordIsDecodable(placedLetters)) {
      setFeedback('The letters are not in the word’s order yet. Try saying each sound slowly with a grown-up.');
      return;
    }
    const completedOutcomes: OutcomeId[] = ['LIT-04'];
    addPractice(makePracticeRecord(wordBuilder.id, completedOutcomes, 1, 1), completedOutcomes);
    setFeedback('You built mat from the sounds m, a and t. This shows practice in this visit; it is not a reading score.');
    setStep(4);
  }

  const currentCard = soundCards[letterIndex];

  return <div className="lit">
    <header className="lit-header">
      <Link href="/" className="lit-brand" aria-label="SkillSprout home">SkillSprout <span>· Letters &amp; Sounds</span></Link>
      <a href="#grownup-note" className="lit-grownup">For grown-ups</a>
    </header>
    <main className="lit-main">
      <p className="lit-kicker">ENGLISH DRAFT · HUMAN REVIEW PENDING</p>
      <h1>Letters &amp; Sounds</h1>
      <p className="lit-intro">A small path from listening together, to finding letters, to building one short word.</p>
      <aside className="lit-review" aria-label="Draft content review status">
        <strong>Draft preview</strong>
        <p>These English examples and any built-in device voice still need qualified literacy, pronunciation, accessibility and family review. The activity does not measure reading ability.</p>
      </aside>

      {step === 0 && <section className="lit-panel" aria-labelledby="lit-start-title">
        <p className="lit-step">THREE SHORT LESSONS · BEGINNING READER</p>
        <h2 id="lit-start-title">Start with sounds you can say together.</h2>
        <p>A grown-up may read each word aloud. If this device has an offline English voice, you can also ask it to say a word. Nothing is saved.</p>
        <ol className="lit-lessons">
          <li><span>1</span><div><strong>Sound Safari</strong><small>Notice a word’s first sound.</small></div><span className="lit-now">Ready</span></li>
          <li><span>2</span><div><strong>Letter Garden</strong><small>Connect m, a and t to sounds.</small></div><span className="lit-later">After lesson 1</span></li>
          <li><span>3</span><div><strong>Word Builder</strong><small>Build the short word mat.</small></div><span className="lit-later">After lesson 2</span></li>
        </ol>
        <button className="lit-button primary" disabled={!ready} onClick={() => startLesson(1)}>Begin Sound Safari</button>
      </section>}

      {step === 1 && <section className="lit-panel" aria-labelledby="lit-sound-title">
        <p className="lit-step">LESSON 1 OF 3 · LIT-01</p>
        <h2 id="lit-sound-title">Which picture begins like “moon”?</h2>
        <p>A grown-up can say <strong>moon</strong> aloud. Listen for the very first sound, then choose a word that starts the same way.</p>
        <button className="lit-button listen" disabled={!ready || paused || !voiceAvailable} onClick={() => speak(firstSoundRound.targetWord)}>
          Say “moon” with this device
        </button>
        {!voiceAvailable && <p className="lit-hint">No offline English voice is ready. A grown-up can say “moon” for you.</p>}
        <div className="lit-choice-grid" role="group" aria-label="Choose the word that begins like moon">
          {firstSoundRound.choices.map((choice) => <button key={choice.id} className="lit-choice" disabled={!ready || paused} onClick={() => choosePicture(choice.id)} aria-label={'Choose ' + choice.word}>
            <Picture name={choice.picture as PictureName}/><span>{choice.word}</span>
          </button>)}
        </div>
      </section>}

      {step === 2 && currentCard && <section className="lit-panel" aria-labelledby="lit-letter-title">
        <p className="lit-step">LESSON 2 OF 3 · LIT-02 · LIT-03</p>
        <h2 id="lit-letter-title">Find the first letter in “{currentCard.word}”.</h2>
        <p>Look at the word. A grown-up can say it slowly. Choose the letter that begins the word.</p>
        <button className="lit-button listen" disabled={!ready || paused || !voiceAvailable} onClick={() => speak(currentCard.word)}>
          Say “{currentCard.word}” with this device
        </button>
        {!voiceAvailable && <p className="lit-hint">No offline English voice is ready. A grown-up can say “{currentCard.word}”.</p>}
        <p className="lit-large-word" aria-label={'Word: ' + currentCard.word}>{currentCard.word}</p>
        <div className="lit-letter-grid" role="group" aria-label="Choose the first letter">
          {['m', 'a', 't', 's'].map((letter) => <button key={letter} className="lit-letter" disabled={!ready || paused} onClick={() => chooseLetter(letter)} aria-label={'Choose letter ' + letter}>{letter}</button>)}
        </div>
        <p className="lit-hint">Sound {letterIndex + 1} of {soundCards.length}. You can try again as many times as you like.</p>
      </section>}

      {step === 3 && <section className="lit-panel" aria-labelledby="lit-build-title">
        <p className="lit-step">LESSON 3 OF 3 · LIT-04</p>
        <h2 id="lit-build-title">Build the short word “mat”.</h2>
        <p>Choose one letter at a time. The three sounds are m, a, t. You can change your choices before checking.</p>
        <button className="lit-button listen" disabled={!ready || paused || !voiceAvailable} onClick={() => speak('mat')}>
          Say “mat” with this device
        </button>
        {!voiceAvailable && <p className="lit-hint">No offline English voice is ready. A grown-up can say “mat”.</p>}
        <div className="lit-word-slots" aria-label={'Word so far: ' + (placedLetters.join('') || 'empty')}>
          {[0, 1, 2].map((slot) => <span key={slot} aria-label={'Letter ' + (slot + 1)}>{placedLetters[slot] || '·'}</span>)}
        </div>
        <div className="lit-letter-grid" role="group" aria-label="Choose a letter to place">
          {wordBuilder.choices.map((letter) => <button key={letter} className="lit-letter" disabled={!ready || paused || placedLetters.length >= 3} onClick={() => addLetter(letter)} aria-label={'Add letter ' + letter}>{letter}</button>)}
        </div>
        <div className="lit-actions">
          <button className="lit-button" disabled={!ready || paused || placedLetters.length === 0} onClick={removeLastLetter}>Remove last letter</button>
          <button className="lit-button primary" disabled={!ready || paused || placedLetters.length !== 3} onClick={checkWord}>Check the word</button>
        </div>
      </section>}

      {step === 4 && <section className="lit-panel lit-finish" aria-labelledby="lit-finish-title">
        <p className="lit-step">END OF THIS VISIT</p>
        <h2 id="lit-finish-title">You built “mat”.</h2>
        <p>You practiced noticing one first sound, matching three sounds to letters, and building a short word. This activity does not show lasting reading skill or mastery.</p>
        <section className="lit-recap" aria-labelledby="lit-recap-title">
          <h3 id="lit-recap-title">Grown-up recap for this visit</h3>
          <p><strong>Goal:</strong> hear or say familiar words, connect beginning sounds with letters, then build mat.</p>
          <p><strong>Work sample:</strong> the word built in this visit was mat.</p>
          <ul>{records.map((record) => {
            const outcomeNames = record.outcomeIds.map((id) => outcomes.find((outcome) => outcome.id === id)?.title).filter(Boolean);
            return <li key={record.activityId}><span>{practiceTitles[record.activityId]}</span><small>Practice in this visit · {outcomeNames.join('; ')}</small></li>;
          })}</ul>
          <p>This recap is temporary and reflects only these activity choices. It is not an independent reading assessment.</p>
        </section>
        <p className="lit-offline"><strong>Try away from the screen:</strong> With a grown-up, find a safe object that begins with the same sound as “mat”. Say its first sound together.</p>
        <button className="lit-button primary" disabled={!ready} onClick={reset}>Finish and clear this visit</button>
      </section>}

      {step > 0 && step < 4 && <div className="lit-session-controls">
        {paused ? <button className="lit-button" disabled={!ready} onClick={() => { setPaused(false); setFeedback('Welcome back. Take the next step when you are ready.'); }}>Resume</button>
          : <button className="lit-button" disabled={!ready} onClick={pause}>Pause</button>}
        <button className="lit-button" disabled={!ready} onClick={reset}>Home</button>
      </div>}
      {paused && <section className="lit-panel lit-paused" aria-live="polite"><h2>Paused</h2><p>Everything will clear when you leave this page. Take a break whenever you need one.</p></section>}
      <p className="lit-feedback" role="status" aria-live="polite">{ready ? feedback : 'Loading the lesson controls…'}</p>
      <details id="grownup-note" className="lit-adult-note">
        <summary>Grown-up and offline guide</summary>
        <p>Read or say the words together. You can point to choices instead of tapping. Away from the screen, use paper letters m, a and t to build “mat”. Correct answers in one visit are practice only; no score or learner record is made.</p>
      </details>
    </main>
    <footer className="lit-footer">Guest preview · Your choices stay in this page visit and are cleared when you leave.</footer>
  </div>;
}
