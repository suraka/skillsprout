'use client';

import { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import {
  amountAnswerIsCorrect,
  changeAmount,
  compareAnswerIsCorrect,
  countAnswerIsCorrect,
  countIsComplete,
  markSeedCounted,
  nextNumberAfterIsCorrect,
  seedSet,
  zeroAnswerIsCorrect,
} from '@/lib/math/number-garden';
import './number-garden.css';

const subscribe = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

function Seeds({ count, label }: { count: number; label: string }) {
  return <div className="ng-seeds" role="img" aria-label={`${label}: ${count} seeds`}>
    {Array.from({ length: count }, (_, index) => <span className={`ng-seed ng-seed-${index % 3}`} key={index} aria-hidden="true">✿</span>)}
  </div>;
}

function NumeralChoices({ onChoose, disabled = false, values = [2, 3, 4, 5] }: { onChoose: (value: number) => void; disabled?: boolean; values?: number[] }) {
  return <div className="ng-numerals" role="group" aria-label="Choose a number">
    {values.map((value) => <button type="button" className="ng-numeral" disabled={disabled} key={value} onClick={() => onChoose(value)} aria-label={`${value} seeds`}>
      <span aria-hidden="true">{value}</span><small>{value === 1 ? 'seed' : 'seeds'}</small>
    </button>)}
  </div>;
}

export function NumberGarden() {
  // Keep the server-rendered start control inert until React has attached its
  // event handlers. This prevents an early tap from being lost during hydration.
  const ready = useSyncExternalStore(subscribe, clientReady, serverReady);
  const [step, setStep] = useState(0);
  const [counted, setCounted] = useState<string[]>([]);
  const [added, setAdded] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [paused, setPaused] = useState(false);
  const [feedback, setFeedback] = useState('Choose a small garden challenge when you are ready.');

  function home() {
    setStep(0);
    setCounted([]);
    setAdded(false);
    setRemoved(false);
    setPaused(false);
    setFeedback('Choose a small garden challenge when you are ready.');
  }

  function chooseSeed(seedId: string) {
    if (paused) return;
    if (counted.includes(seedId)) {
      setFeedback('You already counted that seed. Find one you have not tapped yet.');
      return;
    }
    const next = markSeedCounted(counted, seedId);
    setCounted(next);
    setFeedback(countIsComplete(next)
      ? 'You touched each seed once. Now choose the number that tells how many.'
      : 'Nice careful counting. Keep looking for a seed that has not been counted.');
  }

  function chooseCount(value: number) {
    if (paused) return;
    if (!countIsComplete(counted)) {
      setFeedback('Tap each seed once before choosing how many there are.');
      return;
    }
    if (!countAnswerIsCorrect(value)) {
      setFeedback('That number does not match this group yet. Count each seed once and try again.');
      return;
    }
    setStep(2);
    setFeedback('You counted the group. Next, notice what zero means.');
  }

  function chooseGroup(side: 'left' | 'right') {
    if (paused) return;
    if (!compareAnswerIsCorrect(side)) {
      setFeedback('Take another look. You can count the seeds in each group, one at a time.');
      return;
    }
    setStep(5);
    setFeedback('You found the group with more. Next, watch what changes when a seed is added.');
  }

  function chooseChange(value: number, expected: number, label: string) {
    if (paused) return;
    if (!amountAnswerIsCorrect(value, expected)) {
      setFeedback(`That number is not the amount after we ${label} yet. Count the visible seeds and try again.`);
      return;
    }
    if (step === 5) {
      setStep(6);
      setFeedback('You counted after adding one. Now see what happens when one is taken away.');
    } else {
      setStep(7);
      setFeedback('You counted the seeds after one was taken away. This was practice in this visit.');
    }
  }

  function addOne() {
    if (paused || added) return;
    try {
      changeAmount(2, 1);
      setAdded(true);
      setFeedback('One seed joined the two. Choose how many seeds are here now.');
    } catch {
      setFeedback('Please try the garden again.');
    }
  }

  function takeOne() {
    if (paused || removed) return;
    try {
      changeAmount(4, -1);
      setRemoved(true);
      setFeedback('One seed left the four. Choose how many seeds remain.');
    } catch {
      setFeedback('Please try the garden again.');
    }
  }

  return <div className="number-garden">
    <header className="ng-header">
      <Link className="ng-brand" href="/" aria-label="SkillSprout home">SkillSprout <span>· Number Garden</span></Link>
      <a className="ng-grownup" href="#ng-grownup-note">For grown-ups</a>
    </header>
    <main className="ng-main">
      <p className="ng-kicker">EARLY MATHEMATICS · DRAFT · HUMAN REVIEW PENDING</p>
      <h1>Number Garden</h1>
      <p className="ng-intro">Count one seed at a time, compare two small groups, then explore what changes when a seed joins or leaves.</p>
      <aside className="ng-review" aria-label="Draft content review status">
        <strong>Draft preview</strong>
        <p>This is an early draft, not a reviewed maths course. A grown-up can read every prompt and number aloud. A qualified reviewer still needs to check the exact English locale, number wording, narration, and accessible alternatives. This visit does not measure lasting math ability.</p>
      </aside>

      {step === 0 && <section className="ng-panel" aria-labelledby="ng-start-title">
        <p className="ng-step">SIX SHORT GARDEN CHALLENGES · SMALL WHOLE NUMBERS</p>
        <h2 id="ng-start-title">Count, compare, and notice a change.</h2>
        <ol className="ng-lessons">
          <li><span>1</span><div><strong>Count the seeds</strong><small>Tap each illustrated seed once.</small></div></li>
          <li><span>2</span><div><strong>Notice zero</strong><small>What number tells us the garden is empty?</small></div></li>
          <li><span>3</span><div><strong>Put numbers in order</strong><small>Find the number that comes after three.</small></div></li>
          <li><span>4</span><div><strong>Find the larger group</strong><small>Look closely or count together.</small></div></li>
          <li><span>5</span><div><strong>Add one</strong><small>Watch the group change.</small></div></li>
          <li><span>6</span><div><strong>Take one away</strong><small>Count how many remain.</small></div></li>
        </ol>
        <div className="ng-actions"><button className="ng-button primary" disabled={!ready} onClick={() => { setStep(1); setFeedback('Tap each seed once, then choose how many there are.'); }}>Begin Number Garden</button></div>
      </section>}

      {step === 1 && <section className="ng-panel" aria-labelledby="ng-count-title">
        <p className="ng-step">CHALLENGE 1 OF 6 · ONE-TO-ONE COUNTING</p>
        <h2 id="ng-count-title">Tap each seed once. How many are there?</h2>
        <p>Each seed stays in the same place. If you tap one twice, it still counts as just one seed.</p>
        <div className="ng-seed-row" role="group" aria-label="Five seeds to count">
          {seedSet.map((seed, index) => <button key={seed.id} type="button" className={`ng-seed-button ${counted.includes(seed.id) ? 'counted' : ''}`} aria-pressed={counted.includes(seed.id)} aria-label={counted.includes(seed.id) ? 'Seed counted' : 'Seed not counted'} onClick={() => chooseSeed(seed.id)}>
            <span aria-hidden="true" className={`ng-seed ng-seed-${index % 3}`}>✿</span>
          </button>)}
        </div>
        <p className="ng-count-help" aria-live="polite">{counted.length} of {seedSet.length} seeds touched once</p>
        <NumeralChoices onChoose={chooseCount} disabled={paused}/>
      </section>}

      {step === 2 && <section className="ng-panel" aria-labelledby="ng-zero-title">
        <p className="ng-step">CHALLENGE 2 OF 6 · ZERO AND QUANTITY</p>
        <h2 id="ng-zero-title">The garden is empty. How many seeds are here?</h2>
        <Seeds count={0} label="Empty garden" />
        <p>An empty group has no seeds. Choose the number that tells us there are none.</p>
        <NumeralChoices values={[0, 2, 3, 4]} onChoose={(value) => {
          if (paused) return;
          if (!zeroAnswerIsCorrect(value)) {
            setFeedback('Look at the empty garden. Choose the number for no seeds.');
            return;
          }
          setStep(3);
          setFeedback('That is zero. Now put the numbers in order.');
        }} disabled={paused} />
      </section>}

      {step === 3 && <section className="ng-panel" aria-labelledby="ng-order-title">
        <p className="ng-step">CHALLENGE 3 OF 6 · NUMBER ORDER</p>
        <h2 id="ng-order-title">Which number comes after three?</h2>
        <ol className="ng-number-line" aria-label="Numbers in order from zero to five">{[0, 1, 2, 3, 4, 5].map((number) => <li key={number}>{number}</li>)}</ol>
        <p>Follow the numbers from left to right. Choose the next number after three.</p>
        <NumeralChoices onChoose={(value) => {
          if (paused) return;
          if (!nextNumberAfterIsCorrect(3, value)) {
            setFeedback('Follow the number path one step after three, then try again.');
            return;
          }
          setStep(4);
          setFeedback('Four comes after three. Now compare two gardens.');
        }} disabled={paused} />
      </section>}

      {step === 4 && <section className="ng-panel" aria-labelledby="ng-compare-title">
        <p className="ng-step">CHALLENGE 4 OF 6 · COMPARE QUANTITIES</p>
        <h2 id="ng-compare-title">Which group has more seeds?</h2>
        <p>A grown-up can read the question aloud. You can also count the visible seeds in each group.</p>
        <div className="ng-compare-grid">
          <button className="ng-group" type="button" onClick={() => chooseGroup('left')} aria-label="Choose group of 3 seeds">
            <Seeds count={3} label="First group"/><span>3 seeds</span>
          </button>
          <button className="ng-group" type="button" onClick={() => chooseGroup('right')} aria-label="Choose group of 4 seeds">
            <Seeds count={4} label="Second group"/><span>4 seeds</span>
          </button>
        </div>
      </section>}

      {step === 5 && <section className="ng-panel" aria-labelledby="ng-add-title">
        <p className="ng-step">CHALLENGE 5 OF 6 · ADD ONE</p>
        <h2 id="ng-add-title">Two seeds are here. Add one more.</h2>
        <Seeds count={added ? 3 : 2} label="Garden after adding one"/>
        <div className="ng-actions"><button className="ng-button" disabled={added || paused} onClick={addOne}>Add one seed</button></div>
        <p>Look at the group, then choose how many seeds are here now.</p>
        <NumeralChoices onChoose={(value) => chooseChange(value, changeAmount(2, 1), 'added one')} disabled={!added || paused}/>
      </section>}

      {step === 6 && <section className="ng-panel" aria-labelledby="ng-take-title">
        <p className="ng-step">CHALLENGE 6 OF 6 · TAKE ONE AWAY</p>
        <h2 id="ng-take-title">Four seeds are here. Take one away.</h2>
        <Seeds count={removed ? 3 : 4} label="Garden after taking one away"/>
        <div className="ng-actions"><button className="ng-button" disabled={removed || paused} onClick={takeOne}>Take one seed away</button></div>
        <p>Look at the group, then choose how many seeds remain.</p>
        <NumeralChoices onChoose={(value) => chooseChange(value, changeAmount(4, -1), 'took one away')} disabled={!removed || paused}/>
      </section>}

      {step === 7 && <section className="ng-panel" aria-labelledby="ng-finish-title">
        <p className="ng-step">END OF THIS VISIT · NO SCORE SAVED</p>
        <h2 id="ng-finish-title">You explored six number ideas.</h2>
        <p>You practiced touching each object once, noticing zero, ordering numbers, comparing groups, adding one, and taking one away.</p>
        <Seeds count={3} label="Three seeds in the garden"/>
        <div className="ng-recap"><strong>Try it away from the screen</strong><p>With a grown-up, count a few safe household objects. Add one, take one away, and talk about what changed.</p></div>
        <p className="ng-disclaimer">This describes practice in this visit. It is not a score or a measure of lasting math skill.</p>
        <div className="ng-actions"><button className="ng-button primary" onClick={home}>Finish and clear this visit</button></div>
      </section>}

      {paused && <section className="ng-panel ng-paused" aria-labelledby="ng-paused-title"><h2 id="ng-paused-title">Paused</h2><p>Take a break. Nothing from this visit is saved.</p><div className="ng-actions"><button className="ng-button primary" onClick={() => setPaused(false)}>Resume</button></div></section>}

      {step > 0 && <><p className="ng-feedback" role="status" aria-live="polite">{feedback}</p><nav className="ng-session-controls" aria-label="Activity controls">{!paused && <button className="ng-button" onClick={() => setPaused(true)}>Pause</button>}<button className="ng-button" onClick={home}>Home</button><button className="ng-button" onClick={home}>Restart</button></nav></>}

      <details className="ng-grownup-note" id="ng-grownup-note"><summary>Grown-up notes and offline idea</summary><p>This draft uses fixed, local examples and offers feedback after wrong answers. Adult read-aloud is optional; no audio is included. The offline idea is optional and should use only safe objects nearby. Qualified early-math, locale, safety, accessibility and family review has not happened. No score, profile, or progress record is made.</p></details>
    </main>
    <footer className="ng-footer">Practice for this visit only · no account · no saved child data</footer>
  </div>;
}
