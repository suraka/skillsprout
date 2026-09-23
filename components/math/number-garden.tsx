'use client';

import { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import {
  amountAnswerIsCorrect,
  changeAmount,
  compareAnswerIsCorrect,
  countAnswerIsCorrect,
  countIsComplete,
  equalShareAnswerIsCorrect,
  equalFractionAnswerIsCorrect,
  decimalTenthsAnswerIsCorrect,
  isValidDecomposition,
  markSeedCounted,
  multiplicationAnswerIsCorrect,
  placeValueAnswerIsCorrect,
  percentOfEqualPartsAnswerIsCorrect,
  fartherRightFractionAnswerIsCorrect,
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

function FractionChoices({ onChoose }: { onChoose: (answer: string) => void }) {
  return <div className="ng-split-choices" role="group" aria-label="Choose the fraction">
    {['1/4', '1/2', '3/4'].map((value) => <button type="button" className="ng-button ng-split-choice" key={value} onClick={() => onChoose(value)}>{value}</button>)}
  </div>;
}

function TextChoices({ label, choices, onChoose }: { label: string; choices: string[]; onChoose: (answer: string) => void }) {
  return <div className="ng-split-choices" role="group" aria-label={label}>
    {choices.map((choice) => <button type="button" className="ng-button ng-split-choice" key={choice} onClick={() => onChoose(choice)}>{choice}</button>)}
  </div>;
}

function PercentChoices({ onChoose, disabled = false }: { onChoose: (answer: number) => void; disabled?: boolean }) {
  return <div className="ng-numerals" role="group" aria-label="Choose the percent">
    {[20, 50, 80].map((value) => <button type="button" className="ng-numeral" disabled={disabled} key={value} onClick={() => onChoose(value)}>
      <span>{value}%</span>
    </button>)}
  </div>;
}

function FractionCompareChoices({ onChoose }: { onChoose: (answer: string) => void }) {
  return <div className="ng-split-choices" role="group" aria-label="Choose the fraction farther right">
    {['1/4', '3/4'].map((value) => <button type="button" className="ng-button ng-split-choice" key={value} onClick={() => onChoose(value)}>{value}</button>)}
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
    setStep(8);
    setFeedback('You completed the three number lessons. Optional garden changes are next.');
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
      <p className="ng-kicker">EARLY MATHEMATICS · DRAFT · REVIEW STATUS IN NOTES</p>
      <h1>Number Garden</h1>
      <p className="ng-intro">Count a group, notice zero and number order, then compare two small groups. Optional previews explore operations, groups, place value, and fractions.</p>
      <aside className="ng-review" aria-label="Draft content review status">
        <strong>Draft preview</strong>
        <p>The user reports approving MATH-03 and MATH-04 prompts through the decimal and percent preview. This version adds a new fraction number-line prompt, which still needs review. A grown-up can read every prompt and number aloud. This visit does not measure lasting math ability.</p>
      </aside>

      {step === 0 && <section className="ng-panel" aria-labelledby="ng-start-title">
        <p className="ng-step">THREE SHORT NUMBER LESSONS · OPTIONAL GARDEN CHANGES</p>
        <h2 id="ng-start-title">Count, notice zero, and compare groups.</h2>
        <ol className="ng-lessons">
          <li><span>1</span><div><strong>Count a group</strong><small>Tap each illustrated seed once and choose how many.</small></div></li>
          <li><span>2</span><div><strong>Notice zero and number order</strong><small>Match an empty garden to zero; find what comes after three.</small></div></li>
          <li><span>3</span><div><strong>Compare groups</strong><small>Look closely or count together to find which has more.</small></div></li>
        </ol>
        <p className="ng-recap"><strong>Optional practice · MATH-02 operations</strong><br/>Bring groups together, split a group in different ways, add one, and take one away.</p>
        <p className="ng-recap"><strong>Optional preview · MATH-03 groups and sharing</strong><br/>Explore equal groups, rows, and fair sharing. This new preview is still draft content.</p>
        <p className="ng-recap"><strong>Optional preview · MATH-04 place value and fractions</strong><br/>Build a two-digit number from tens and ones, then read a fraction made from equal parts. This new preview is still draft content.</p>
        <p className="ng-recap"><strong>Optional preview · MATH-04 tenths and percent</strong><br/>Connect five tenths, 0.5, and 50% using the same ten-part bar. This new preview is still draft content.</p>
        <p className="ng-recap"><strong>Optional preview · MATH-04 fractions on a number line</strong><br/>Compare one quarter and three quarters using their positions from zero to one.</p>
        <div className="ng-actions">
          <button className="ng-button primary" disabled={!ready} onClick={() => { setStep(1); setFeedback('Tap each seed once, then choose how many there are.'); }}>Begin Number Garden</button>
          <button className="ng-button" disabled={!ready} onClick={() => { setStep(11); setFeedback('MATH-03 draft preview: look at the equal groups.'); }}>Explore equal groups and sharing</button>
          <button className="ng-button" disabled={!ready} onClick={() => { setStep(15); setFeedback('MATH-04 draft preview: look at the tens and ones.'); }}>Explore tens and fractions</button>
          <button className="ng-button" disabled={!ready} onClick={() => { setStep(18); setFeedback('MATH-04 draft preview: count the shaded tenths.'); }}>Explore tenths and percent</button>
          <button className="ng-button" disabled={!ready} onClick={() => { setStep(21); setFeedback('MATH-04 draft preview: compare the fraction positions.'); }}>Explore fractions on a number line</button>
        </div>
      </section>}

      {step === 1 && <section className="ng-panel" aria-labelledby="ng-count-title">
        <p className="ng-step">LESSON 1 OF 3 · ONE-TO-ONE COUNTING</p>
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
        <p className="ng-step">LESSON 2 OF 3 · ZERO AND QUANTITY</p>
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
        <p className="ng-step">LESSON 2 OF 3 · NUMBER ORDER</p>
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
        <p className="ng-step">LESSON 3 OF 3 · COMPARE QUANTITIES</p>
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

      {step === 8 && <section className="ng-panel" aria-labelledby="ng-path-finish-title">
        <p className="ng-step">THREE NUMBER LESSONS COMPLETE · NO SCORE SAVED</p>
        <h2 id="ng-path-finish-title">You counted, noticed zero, and compared groups.</h2>
        <p>This describes practice in this visit. It is not a score or a measure of lasting math skill.</p>
        <div className="ng-actions">
          <button className="ng-button primary" onClick={home}>Finish these number lessons</button>
          <button className="ng-button" onClick={() => { setStep(9); setFeedback('Optional operations practice: join two small groups.'); }}>Try optional operations practice</button>
          <button className="ng-button" onClick={() => { setStep(11); setFeedback('MATH-03 draft preview: look at the equal groups.'); }}>Explore equal groups and sharing</button>
        </div>
      </section>}

      {step === 9 && <section className="ng-panel" aria-labelledby="ng-compose-title">
        <p className="ng-step">OPTIONAL PRACTICE · MATH-02 · COMPOSE AMOUNTS</p>
        <h2 id="ng-compose-title">Two groups join the garden. How many seeds are there altogether?</h2>
        <div className="ng-operation-groups" role="group" aria-label="Two groups to join">
          <div className="ng-operation-group"><Seeds count={2} label="First group"/><strong>2 seeds</strong></div>
          <span aria-hidden="true" className="ng-operation-sign">+</span>
          <div className="ng-operation-group"><Seeds count={3} label="Second group"/><strong>3 seeds</strong></div>
        </div>
        <p>Count both groups together, or count on from two.</p>
        <NumeralChoices values={[2, 3, 4, 5]} onChoose={(value) => {
          if (paused) return;
          if (!amountAnswerIsCorrect(value, 5)) {
            setFeedback('Count the two groups together and try again.');
            return;
          }
          setStep(10);
          setFeedback('Five seeds altogether. Now find a way to split five into two groups.');
        }} disabled={paused} />
      </section>}

      {step === 10 && <section className="ng-panel" aria-labelledby="ng-decompose-title">
        <p className="ng-step">OPTIONAL PRACTICE · MATH-02 · DECOMPOSE AMOUNTS</p>
        <h2 id="ng-decompose-title">Which two groups can make five seeds?</h2>
        <Seeds count={5} label="Five seeds to split" />
        <p>There can be more than one way. Choose a pair that makes five altogether.</p>
        <div className="ng-split-choices" role="group" aria-label="Choose two groups that make five">
          {[[1, 4], [2, 3], [2, 4]].map(([first, second]) => <button className="ng-button ng-split-choice" key={`${first}-${second}`} onClick={() => {
            if (paused) return;
            if (!isValidDecomposition(5, first, second)) {
              setFeedback('Those groups do not make five yet. Try another pair.');
              return;
            }
            setStep(5);
            setFeedback('That pair makes five. One amount can be split in different ways. Next, add one seed.');
          }}>{first} + {second}</button>)}
        </div>
      </section>}

      {step === 11 && <section className="ng-panel" aria-labelledby="ng-equal-groups-title">
        <p className="ng-step">OPTIONAL PREVIEW · MATH-03 · EQUAL GROUPS</p>
        <h2 id="ng-equal-groups-title">There are three equal groups with two seeds in each. How many seeds altogether?</h2>
        <div className="ng-equal-groups" role="group" aria-label="Three equal groups of two seeds">
          {[0, 1, 2].map((group) => <div className="ng-operation-group" key={group}><Seeds count={2} label={`Group ${group + 1}`}/><strong>2 seeds</strong></div>)}
        </div>
        <p>You can count every seed, or count two, four, six as you move from group to group.</p>
        <NumeralChoices values={[4, 5, 6, 7]} onChoose={(value) => {
          if (paused) return;
          if (!multiplicationAnswerIsCorrect(value, 3, 2)) {
            setFeedback('Count the seeds in all three groups and try again.');
            return;
          }
          setStep(12);
          setFeedback('Three groups of two make six. Now look at six seeds arranged in rows.');
        }} disabled={paused} />
      </section>}

      {step === 12 && <section className="ng-panel" aria-labelledby="ng-array-title">
        <p className="ng-step">OPTIONAL PREVIEW · MATH-03 · ARRAYS</p>
        <h2 id="ng-array-title">This array has two rows with three seeds in each row. How many seeds altogether?</h2>
        <div className="ng-array" role="img" aria-label="Array with two rows and three seeds in each row">
          {Array.from({ length: 6 }, (_, index) => <span className={`ng-seed ng-seed-${index % 3}`} key={index} aria-hidden="true">✿</span>)}
        </div>
        <p>Count across each row, or count all the seeds.</p>
        <NumeralChoices values={[4, 5, 6, 7]} onChoose={(value) => {
          if (paused) return;
          if (!multiplicationAnswerIsCorrect(value, 2, 3)) {
            setFeedback('Count both rows and try again.');
            return;
          }
          setStep(13);
          setFeedback('The two rows hold six seeds. Now share six fairly between two beds.');
        }} disabled={paused} />
      </section>}

      {step === 13 && <section className="ng-panel" aria-labelledby="ng-sharing-title">
        <p className="ng-step">OPTIONAL PREVIEW · MATH-03 · FAIR SHARING</p>
        <h2 id="ng-sharing-title">Share six seeds equally between two garden beds. How many seeds go in each bed?</h2>
        <Seeds count={6} label="Six seeds to share" />
        <div className="ng-sharing-beds" role="group" aria-label="Two empty garden beds">
          <div className="ng-sharing-bed" aria-label="First garden bed"><strong>Bed 1</strong></div>
          <div className="ng-sharing-bed" aria-label="Second garden bed"><strong>Bed 2</strong></div>
        </div>
        <p>Imagine placing one seed in each bed, then repeating until all six are shared.</p>
        <NumeralChoices onChoose={(value) => {
          if (paused) return;
          if (!equalShareAnswerIsCorrect(value, 6, 2)) {
            setFeedback('Share the seeds one at a time between the two beds, then try again.');
            return;
          }
          setStep(14);
          setFeedback('Each bed gets three seeds when six are shared equally between two beds.');
        }} disabled={paused} />
      </section>}

      {step === 14 && <section className="ng-panel" aria-labelledby="ng-math03-finish-title">
        <p className="ng-step">MATH-03 DRAFT PREVIEW COMPLETE · NO SCORE SAVED</p>
        <h2 id="ng-math03-finish-title">You explored equal groups, rows, and fair sharing.</h2>
        <p>This describes practice in this visit. It is not a score or a measure of lasting math skill.</p>
        <div className="ng-actions"><button className="ng-button primary" onClick={home}>Finish and clear this visit</button></div>
      </section>}

      {step === 15 && <section className="ng-panel" aria-labelledby="ng-place-value-title">
        <p className="ng-step">OPTIONAL PREVIEW · MATH-04 · PLACE VALUE</p>
        <h2 id="ng-place-value-title">There is 1 ten and 4 ones. What number do they make?</h2>
        <div className="ng-place-value" role="group" aria-label="One bundle of ten and four single seeds">
          <div className="ng-ten-bundle" role="img" aria-label="One bundle of ten seeds"><strong>1 ten</strong><span aria-hidden="true">|||||<br/>|||||</span></div>
          <span className="ng-operation-sign" aria-hidden="true">+</span>
          <div className="ng-ones" role="img" aria-label="Four single seeds">{Array.from({ length: 4 }, (_, index) => <span key={index} aria-hidden="true">✿</span>)}<strong>4 ones</strong></div>
        </div>
        <p>One ten means ten ones. Count ten, then four more.</p>
        <NumeralChoices values={[13, 14, 15, 24]} onChoose={(value) => {
          if (paused) return;
          if (!placeValueAnswerIsCorrect(value, 1, 4)) {
            setFeedback('A ten is ten ones. Add the four single seeds and try again.');
            return;
          }
          setStep(16);
          setFeedback('One ten and four ones make fourteen. Now look at four equal parts.');
        }} disabled={paused} />
      </section>}

      {step === 16 && <section className="ng-panel" aria-labelledby="ng-fraction-title">
        <p className="ng-step">OPTIONAL PREVIEW · MATH-04 · FRACTIONS AS EQUAL PARTS</p>
        <h2 id="ng-fraction-title">Two of these four equal parts are shaded. What fraction is shaded?</h2>
        <div className="ng-fraction-shape" role="img" aria-label="A shape split into four equal parts, with two parts shaded">
          {[true, true, false, false].map((shaded, index) => <span className={shaded ? 'shaded' : ''} key={index} aria-hidden="true" />)}
        </div>
        <p>The shape is split into four same-size parts. Two parts are shaded.</p>
        <FractionChoices onChoose={(answer) => {
          if (paused) return;
          if (!equalFractionAnswerIsCorrect(answer, 2, 4)) {
            setFeedback('Count the shaded parts and all the equal parts, then try again.');
            return;
          }
          setStep(17);
          setFeedback('Two of four equal parts are shaded. This fraction can also be written as one half.');
        }} />
      </section>}

      {step === 17 && <section className="ng-panel" aria-labelledby="ng-math04-finish-title">
        <p className="ng-step">MATH-04 DRAFT PREVIEW COMPLETE · NO SCORE SAVED</p>
        <h2 id="ng-math04-finish-title">You explored tens, ones, and equal parts.</h2>
        <p>This describes practice in this visit. It is not a score or a measure of lasting math skill.</p>
        <div className="ng-actions"><button className="ng-button primary" onClick={home}>Finish and clear this visit</button></div>
      </section>}

      {step === 18 && <section className="ng-panel" aria-labelledby="ng-decimal-title">
        <p className="ng-step">OPTIONAL PREVIEW · MATH-04 · DECIMALS AND TENTHS</p>
        <h2 id="ng-decimal-title">Five of ten equal parts are shaded. Which decimal shows five tenths?</h2>
        <div className="ng-tenths-bar" role="img" aria-label="Ten equal parts, with five shaded">
          {Array.from({ length: 10 }, (_, index) => <span className={index < 5 ? 'shaded' : ''} key={index} aria-hidden="true" />)}
        </div>
        <p>Five tenths is one half. On this number line, it is halfway from zero to one.</p>
        <div className="ng-decimal-line" role="img" aria-label="Number line from zero to one with the midpoint marked zero point five">
          <span>0</span><i aria-hidden="true"/><strong>0.5</strong><i aria-hidden="true"/><span>1</span>
        </div>
        <TextChoices label="Choose the decimal" choices={['0.2', '0.5', '0.8']} onChoose={(answer) => {
          if (paused) return;
          if (!decimalTenthsAnswerIsCorrect(answer, 5, 10)) {
            setFeedback('Count five shaded parts out of ten. Five tenths is halfway from zero to one.');
            return;
          }
          setStep(19);
          setFeedback('Five tenths is 0.5. Now connect the same amount to percent.');
        }} />
      </section>}

      {step === 19 && <section className="ng-panel" aria-labelledby="ng-percent-title">
        <p className="ng-step">OPTIONAL PREVIEW · MATH-04 · PERCENT</p>
        <h2 id="ng-percent-title">Five of ten equal parts are shaded. What percent is shaded?</h2>
        <div className="ng-tenths-bar" role="img" aria-label="Ten equal parts, with five shaded">
          {Array.from({ length: 10 }, (_, index) => <span className={index < 5 ? 'shaded' : ''} key={index} aria-hidden="true" />)}
        </div>
        <p>Five out of ten is one half, or 0.5. A whole bar is 100 percent.</p>
        <PercentChoices onChoose={(value) => {
          if (paused) return;
          if (!percentOfEqualPartsAnswerIsCorrect(value, 5, 10)) {
            setFeedback('Five of ten equal parts is one half of the bar. Try again.');
            return;
          }
          setStep(20);
          setFeedback('Five tenths, 0.5, and 50 percent name the same amount.');
        }} disabled={paused} />
      </section>}

      {step === 20 && <section className="ng-panel" aria-labelledby="ng-math04-rational-finish-title">
        <p className="ng-step">MATH-04 DRAFT PREVIEW COMPLETE · NO SCORE SAVED</p>
        <h2 id="ng-math04-rational-finish-title">You connected equal parts, decimals, and percent.</h2>
        <p>Five tenths, 0.5, and 50% describe the same amount. This describes practice in this visit, not lasting math skill.</p>
        <div className="ng-actions"><button className="ng-button primary" onClick={home}>Finish and clear this visit</button></div>
      </section>}

      {step === 21 && <section className="ng-panel" aria-labelledby="ng-fraction-line-title">
        <p className="ng-step">OPTIONAL PREVIEW · MATH-04 · FRACTIONS ON A NUMBER LINE</p>
        <h2 id="ng-fraction-line-title">Which fraction is farther right: one quarter or three quarters?</h2>
        <div className="ng-fraction-number-line" role="img" aria-label="Number line from zero to one, marked at one quarter, one half, and three quarters">
          <div className="ng-fraction-line-track" aria-hidden="true"><i/><i/><i/><i/><i/></div>
          <div className="ng-fraction-line-labels"><span>0</span><span>1/4</span><span>1/2</span><span>3/4</span><span>1</span></div>
        </div>
        <p>Fractions farther to the right name greater amounts on this number line.</p>
        <FractionCompareChoices onChoose={(answer) => {
          if (paused) return;
          if (!fartherRightFractionAnswerIsCorrect(answer, 1, 4, 3, 4)) {
            setFeedback('Look for the fraction farther along the line from zero, then try again.');
            return;
          }
          setStep(22);
          setFeedback('Three quarters is farther right than one quarter, so it is the greater amount.');
        }} />
      </section>}

      {step === 22 && <section className="ng-panel" aria-labelledby="ng-math04-numberline-finish-title">
        <p className="ng-step">MATH-04 DRAFT PREVIEW COMPLETE · NO SCORE SAVED</p>
        <h2 id="ng-math04-numberline-finish-title">You compared fractions on a number line.</h2>
        <p>This describes practice in this visit. It is not a score or a measure of lasting math skill.</p>
        <div className="ng-actions"><button className="ng-button primary" onClick={home}>Finish and clear this visit</button></div>
      </section>}

      {step === 5 && <section className="ng-panel" aria-labelledby="ng-add-title">
        <p className="ng-step">OPTIONAL PRACTICE · MATH-02 · ADD ONE</p>
        <h2 id="ng-add-title">Two seeds are here. Add one more.</h2>
        <Seeds count={added ? 3 : 2} label="Garden after adding one"/>
        <div className="ng-actions"><button className="ng-button" disabled={added || paused} onClick={addOne}>Add one seed</button></div>
        <p>Look at the group, then choose how many seeds are here now.</p>
        <NumeralChoices onChoose={(value) => chooseChange(value, changeAmount(2, 1), 'added one')} disabled={!added || paused}/>
      </section>}

      {step === 6 && <section className="ng-panel" aria-labelledby="ng-take-title">
        <p className="ng-step">OPTIONAL PRACTICE · MATH-02 · TAKE ONE AWAY</p>
        <h2 id="ng-take-title">Four seeds are here. Take one away.</h2>
        <Seeds count={removed ? 3 : 4} label="Garden after taking one away"/>
        <div className="ng-actions"><button className="ng-button" disabled={removed || paused} onClick={takeOne}>Take one seed away</button></div>
        <p>Look at the group, then choose how many seeds remain.</p>
        <NumeralChoices onChoose={(value) => chooseChange(value, changeAmount(4, -1), 'took one away')} disabled={!removed || paused}/>
      </section>}

      {step === 7 && <section className="ng-panel" aria-labelledby="ng-finish-title">
        <p className="ng-step">OPTIONAL PRACTICE COMPLETE · NO SCORE SAVED</p>
        <h2 id="ng-finish-title">You explored number groups and changes.</h2>
        <p>You practiced touching each object once, noticing zero, ordering numbers, comparing groups, joining and splitting amounts, adding one, and taking one away.</p>
        <Seeds count={3} label="Three seeds in the garden"/>
        <div className="ng-recap"><strong>Try it away from the screen</strong><p>With a grown-up, count a few safe household objects. Add one, take one away, and talk about what changed.</p></div>
        <p className="ng-disclaimer">This describes practice in this visit. It is not a score or a measure of lasting math skill.</p>
        <div className="ng-actions"><button className="ng-button primary" onClick={home}>Finish and clear this visit</button></div>
      </section>}

      {paused && <section className="ng-panel ng-paused" aria-labelledby="ng-paused-title"><h2 id="ng-paused-title">Paused</h2><p>Take a break. Nothing from this visit is saved.</p><div className="ng-actions"><button className="ng-button primary" onClick={() => setPaused(false)}>Resume</button></div></section>}

      {step > 0 && <><p className="ng-feedback" role="status" aria-live="polite">{feedback}</p><nav className="ng-session-controls" aria-label="Activity controls">{!paused && <button className="ng-button" onClick={() => setPaused(true)}>Pause</button>}<button className="ng-button" onClick={home}>Home</button><button className="ng-button" onClick={home}>Restart</button></nav></>}

      <details className="ng-grownup-note" id="ng-grownup-note"><summary>Grown-up notes and offline idea</summary><p>This draft uses fixed, local examples and offers feedback after wrong answers. Adult read-aloud is optional; no audio is included. The offline idea is optional and should use only safe objects nearby. The user reports approval of MATH-03 and MATH-04 prompts through decimal and percent practice. The fraction number-line prompt was added in version 9 and remains draft pending review. No score, profile, or progress record is made.</p></details>
    </main>
    <footer className="ng-footer">Practice for this visit only · no account · no saved child data</footer>
  </div>;
}
