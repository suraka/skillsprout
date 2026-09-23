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
  shapeSidesAnswerIsCorrect,
  longerScreenMeasureAnswerIsCorrect,
  solidWithoutFlatFacesAnswerIsCorrect,
  unitCubeVolumeAnswerIsCorrect,
  wholeHourAnswerIsCorrect,
  heavierBalanceSideAnswerIsCorrect,
  pretendTokenAmountAnswerIsCorrect,
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

function ShapeChoices({ onChoose, disabled = false }: { onChoose: (answer: string) => void; disabled?: boolean }) {
  return <div className="ng-shape-choices" role="group" aria-label="Choose the shape with three straight sides">
    {(['triangle', 'square', 'circle'] as const).map((shape) => <button type="button" className="ng-shape-choice" key={shape} disabled={disabled} onClick={() => onChoose(shape)} aria-label={shape[0].toUpperCase() + shape.slice(1)}>
      <svg viewBox="0 0 80 80" aria-hidden="true" focusable="false">
        {shape === 'triangle' && <polygon points="40,9 72,68 8,68"/>}
        {shape === 'square' && <rect x="12" y="12" width="56" height="56"/>}
        {shape === 'circle' && <circle cx="40" cy="40" r="28"/>}
      </svg>
      <span>{shape[0].toUpperCase() + shape.slice(1)}</span>
    </button>)}
  </div>;
}

function SolidChoices({ onChoose, disabled = false }: { onChoose: (answer: string) => void; disabled?: boolean }) {
  return <div className="ng-shape-choices" role="group" aria-label="Choose the solid with no flat faces">
    {(['cube', 'sphere', 'cylinder'] as const).map((solid) => <button type="button" className="ng-shape-choice" key={solid} disabled={disabled} onClick={() => onChoose(solid)} aria-label={solid[0].toUpperCase() + solid.slice(1)}>
      <svg viewBox="0 0 80 80" aria-hidden="true" focusable="false">
        {solid === 'cube' && <><polygon points="40,8 68,24 40,40 12,24"/><polygon points="12,24 40,40 40,70 12,54"/><polygon points="40,40 68,24 68,54 40,70"/></>}
        {solid === 'sphere' && <circle cx="40" cy="40" r="29"/>}
        {solid === 'cylinder' && <><path d="M14 20 C14 8 66 8 66 20 L66 60 C66 72 14 72 14 60 Z"/><ellipse cx="40" cy="20" rx="26" ry="11"/><path d="M14 60 C14 72 66 72 66 60" fill="none"/></>}
      </svg>
      <span>{solid[0].toUpperCase() + solid.slice(1)}</span>
    </button>)}
  </div>;
}

function UnitCubeLayers() {
  return <div className="ng-cube-layers" role="img" aria-label="A box with two layers of unit cubes, four cubes in each layer">
    {[1, 2].map((layer) => <div className="ng-cube-layer" key={layer}>
      <strong>Layer {layer}</strong>
      <div>{Array.from({ length: 4 }, (_, index) => <svg viewBox="0 0 48 48" key={index} aria-hidden="true"><polygon points="24,3 44,14 24,25 4,14"/><polygon points="4,14 24,25 24,46 4,35"/><polygon points="24,25 44,14 44,35 24,46"/></svg>)}</div>
    </div>)}
  </div>;
}

function ScreenMeasureBar({ units, label }: { units: number; label: string }) {
  return <div className="ng-measure-bar" role="img" aria-label={`${label}: ${units} equal screen units`}>
    {Array.from({ length: units }, (_, index) => <span key={index} aria-hidden="true"/>)}
  </div>;
}

function MeasureChoices({ onChoose, disabled = false }: { onChoose: (answer: 'left' | 'right') => void; disabled?: boolean }) {
  return <div className="ng-compare-grid" role="group" aria-label="Choose the strip with more screen units">
    <button type="button" className="ng-measure-choice" disabled={disabled} onClick={() => onChoose('left')} aria-label="Three screen units"><ScreenMeasureBar units={3} label="First strip"/><strong>First strip</strong></button>
    <button type="button" className="ng-measure-choice" disabled={disabled} onClick={() => onChoose('right')} aria-label="Five screen units"><ScreenMeasureBar units={5} label="Second strip"/><strong>Second strip</strong></button>
  </div>;
}

function UnitCubeChoices({ onChoose, disabled = false }: { onChoose: (answer: number) => void; disabled?: boolean }) {
  return <div className="ng-numerals" role="group" aria-label="Choose the number of unit cubes">
    {[6, 8, 10, 12].map((value) => <button type="button" className="ng-numeral" disabled={disabled} key={value} onClick={() => onChoose(value)} aria-label={`${value} unit cubes`}>
      <span>{value}</span><small>unit cubes</small>
    </button>)}
  </div>;
}

function ClockFace() {
  return <svg className="ng-clock-face" viewBox="0 0 160 160" role="img" aria-label="Clock showing three o’clock">
    <circle cx="80" cy="80" r="68" />
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((hour) => {
      const angle = (hour * 30 - 90) * Math.PI / 180;
      return <text key={hour} x={80 + Math.cos(angle) * 51} y={80 + Math.sin(angle) * 51 + 6} textAnchor="middle">{hour}</text>;
    })}
    <line x1="80" y1="80" x2="80" y2="28" className="ng-clock-minute" />
    <line x1="80" y1="80" x2="125" y2="80" className="ng-clock-hour" />
    <circle cx="80" cy="80" r="4" className="ng-clock-pin" />
  </svg>;
}

function TimeChoices({ onChoose, disabled = false }: { onChoose: (hour: number) => void; disabled?: boolean }) {
  return <div className="ng-numerals" role="group" aria-label="Choose the time shown">
    {[2, 3, 6].map((hour) => <button type="button" className="ng-numeral" disabled={disabled} key={hour} onClick={() => onChoose(hour)} aria-label={`${hour} o’clock`}>
      <span>{hour}:00</span><small>o’clock</small>
    </button>)}
  </div>;
}

function BalanceModel() {
  return <svg className="ng-balance-model" viewBox="0 0 200 150" role="img" aria-label="Balance model: the left pan is lower and holds three identical unit weights; the right pan holds two">
    <path d="M100 25 L100 113 L72 143 L128 143 Z" className="ng-balance-support" />
    <line x1="35" y1="82" x2="165" y2="52" className="ng-balance-beam" />
    <line x1="38" y1="82" x2="38" y2="112" className="ng-balance-string" />
    <line x1="162" y1="53" x2="162" y2="83" className="ng-balance-string" />
    <path d="M13 112 Q38 132 63 112" className="ng-balance-pan" />
    <path d="M137 83 Q162 103 187 83" className="ng-balance-pan" />
    {[0, 1, 2].map((index) => <rect key={`left-${index}`} x={22 + index * 11} y="94" width="9" height="13" rx="2" className="ng-balance-weight" />)}
    {[0, 1].map((index) => <rect key={`right-${index}`} x={150 + index * 11} y="65" width="9" height="13" rx="2" className="ng-balance-weight" />)}
  </svg>;
}

function BalanceChoices({ onChoose, disabled = false }: { onChoose: (side: 'left' | 'right') => void; disabled?: boolean }) {
  return <div className="ng-split-choices" role="group" aria-label="Choose the heavier balance pan">
    {(['left', 'right'] as const).map((side) => <button type="button" className="ng-button ng-split-choice" key={side} disabled={disabled} onClick={() => onChoose(side)}>{side === 'left' ? 'Left pan' : 'Right pan'}</button>)}
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
        <p>The user reports reviewing MATH-05 prompts through version 12, as well as MATH-03 and MATH-04. The new version 13 mass prompt needs review. A grown-up can read every prompt aloud. This visit does not measure lasting math ability.</p>
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
        <p className="ng-recap"><strong>Optional preview · MATH-05 shapes and measurement</strong><br/>Find a three-sided shape and compare two strips using equal on-screen units. The display is a learning model, not a real ruler.</p>
        <p className="ng-recap"><strong>Optional preview · MATH-05 solids and volume</strong><br/>Recognize a sphere and count unit cubes across two layers.</p>
        <p className="ng-recap"><strong>Optional preview · MATH-05 telling time</strong><br/>Read a clock when the minute hand points to 12. The user reports reviewing this prompt.</p>
        <p className="ng-recap"><strong>Optional preview · MATH-05 comparing mass</strong><br/>Compare identical unit weights on a balance; the user reports reviewing this prompt.</p>
        <p className="ng-recap"><strong>New draft · MATH-05 pretend tokens</strong><br/>Count make-believe token values. These are learning tokens, not real money or local currency; this new prompt needs review.</p>
        <div className="ng-actions">
          <button className="ng-button primary" disabled={!ready} onClick={() => { setStep(1); setFeedback('Tap each seed once, then choose how many there are.'); }}>Begin Number Garden</button>
          <button className="ng-button" disabled={!ready} onClick={() => { setStep(11); setFeedback('MATH-03 draft preview: look at the equal groups.'); }}>Explore equal groups and sharing</button>
          <button className="ng-button" disabled={!ready} onClick={() => { setStep(15); setFeedback('MATH-04 draft preview: look at the tens and ones.'); }}>Explore tens and fractions</button>
          <button className="ng-button" disabled={!ready} onClick={() => { setStep(18); setFeedback('MATH-04 draft preview: count the shaded tenths.'); }}>Explore tenths and percent</button>
          <button className="ng-button" disabled={!ready} onClick={() => { setStep(21); setFeedback('MATH-04 draft preview: compare the fraction positions.'); }}>Explore fractions on a number line</button>
          <button className="ng-button" disabled={!ready} onClick={() => { setStep(23); setFeedback('MATH-05 draft preview: look for a shape with three straight sides.'); }}>Explore shapes and screen units</button>
          <button className="ng-button" disabled={!ready} onClick={() => { setStep(26); setFeedback('MATH-05 draft preview: look for the solid with no flat faces.'); }}>Explore solids and volume</button>
          <button className="ng-button" disabled={!ready} onClick={() => { setStep(29); setFeedback('MATH-05 time draft: look at both clock hands.'); }}>Explore telling time</button>
          <button className="ng-button" disabled={!ready} onClick={() => { setStep(31); setFeedback('MATH-05 mass preview: compare the identical unit weights.'); }}>Explore comparing mass</button>
          <button className="ng-button" disabled={!ready} onClick={() => { setStep(33); setFeedback('MATH-05 money draft: count the pretend token values.'); }}>Explore pretend tokens</button>
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

      {step === 23 && <section className="ng-panel" aria-labelledby="ng-shape-title">
        <p className="ng-step">OPTIONAL PREVIEW · MATH-05 · 2D SHAPES</p>
        <h2 id="ng-shape-title">Which shape has three straight sides?</h2>
        <ShapeChoices disabled={paused} onChoose={(shape) => {
          if (paused) return;
          if (!shapeSidesAnswerIsCorrect(shape, 3)) {
            setFeedback('Count only the straight sides. Try another shape.');
            return;
          }
          setStep(24);
          setFeedback('A triangle has three straight sides. Now compare two measured strips.');
        }} />
      </section>}

      {step === 24 && <section className="ng-panel" aria-labelledby="ng-measure-title">
        <p className="ng-step">OPTIONAL PREVIEW · MATH-05 · MEASURING LENGTH</p>
        <h2 id="ng-measure-title">Which strip is longer when each equal block is one screen unit?</h2>
        <p>Both strips start at the same place. Count the equal blocks. These are screen units, not centimetres or inches.</p>
        <MeasureChoices disabled={paused} onChoose={(answer) => {
          if (paused) return;
          if (!longerScreenMeasureAnswerIsCorrect(answer, 3, 5)) {
            setFeedback('Count the equal blocks from the shared starting point. Try again.');
            return;
          }
          setStep(25);
          setFeedback('The second strip covers five screen units, so it is longer than the three-unit strip.');
        }} />
      </section>}

      {step === 25 && <section className="ng-panel" aria-labelledby="ng-math05-finish-title">
        <p className="ng-step">MATH-05 DRAFT PREVIEW COMPLETE · NO SCORE SAVED</p>
        <h2 id="ng-math05-finish-title">You found a triangle and compared measured lengths.</h2>
        <p>The strip model uses equal on-screen units. It is not a calibrated real-world measuring tool.</p>
        <div className="ng-actions"><button className="ng-button primary" onClick={home}>Finish and clear this visit</button></div>
      </section>}

      {step === 26 && <section className="ng-panel" aria-labelledby="ng-solid-title">
        <p className="ng-step">OPTIONAL PREVIEW · MATH-05 · 3D SOLIDS</p>
        <h2 id="ng-solid-title">Which solid has no flat faces?</h2>
        <SolidChoices disabled={paused} onChoose={(solid) => {
          if (paused) return;
          if (!solidWithoutFlatFacesAnswerIsCorrect(solid)) {
            setFeedback('Look for the solid with a completely curved surface. Try again.');
            return;
          }
          setStep(27);
          setFeedback('A sphere has no flat faces. Next, count unit cubes in two layers.');
        }} />
      </section>}

      {step === 27 && <section className="ng-panel" aria-labelledby="ng-volume-title">
        <p className="ng-step">OPTIONAL PREVIEW · MATH-05 · VOLUME WITH UNIT CUBES</p>
        <h2 id="ng-volume-title">A box has two layers. Each layer has four unit cubes. How many cubes fill the box?</h2>
        <UnitCubeLayers />
        <p>Count four cubes in each layer, then count both layers. These are drawn unit cubes, not a real container measurement.</p>
        <UnitCubeChoices onChoose={(value) => {
          if (paused) return;
          if (!unitCubeVolumeAnswerIsCorrect(value, 2, 2, 2)) {
            setFeedback('There are two layers with four unit cubes in each. Count both layers and try again.');
            return;
          }
          setStep(28);
          setFeedback('Two layers of four make eight unit cubes altogether.');
        }} disabled={paused} />
      </section>}

      {step === 28 && <section className="ng-panel" aria-labelledby="ng-math05-volume-finish-title">
        <p className="ng-step">MATH-05 DRAFT PREVIEW COMPLETE · NO SCORE SAVED</p>
        <h2 id="ng-math05-volume-finish-title">You explored a sphere and volume with unit cubes.</h2>
        <p>The cube drawing is a learning model. Other 3D shapes and measurement topics need more lessons.</p>
        <div className="ng-actions"><button className="ng-button primary" onClick={home}>Finish and clear this visit</button></div>
      </section>}

      {step === 29 && <section className="ng-panel" aria-labelledby="ng-time-title">
        <p className="ng-step">NEW DRAFT PREVIEW · MATH-05 · TELLING TIME</p>
        <h2 id="ng-time-title">The garden break starts at the time shown. What time is it?</h2>
        <ClockFace />
        <p>The long hand points to 12, so it is an exact hour. Look where the short hand points.</p>
        <TimeChoices disabled={paused} onChoose={(hour) => {
          if (paused) return;
          if (!wholeHourAnswerIsCorrect(hour, 3)) {
            setFeedback('The long hand points to 12. Read the number where the short hand points, then try again.');
            return;
          }
          setStep(30);
          setFeedback('The short hand points to 3 and the long hand points to 12, so the clock shows three o’clock.');
        }} />
      </section>}

      {step === 30 && <section className="ng-panel" aria-labelledby="ng-math05-time-finish-title">
        <p className="ng-step">MATH-05 TIME DRAFT PREVIEW · NO SCORE SAVED</p>
        <h2 id="ng-math05-time-finish-title">You read an exact hour on a clock.</h2>
        <p>This is one short time-reading example. Other time and measurement topics need separate lessons.</p>
        <div className="ng-actions"><button className="ng-button primary" onClick={home}>Finish and clear this visit</button></div>
      </section>}

      {step === 31 && <section className="ng-panel" aria-labelledby="ng-mass-title">
        <p className="ng-step">NEW DRAFT PREVIEW · MATH-05 · COMPARING MASS</p>
        <h2 id="ng-mass-title">Each block has the same mass. Which balance pan is heavier?</h2>
        <BalanceModel />
        <p>Look at the balance and compare the identical unit weights. The lower pan carries more mass.</p>
        <BalanceChoices disabled={paused} onChoose={(side) => {
          if (paused) return;
          if (!heavierBalanceSideAnswerIsCorrect(side, 3, 2)) {
            setFeedback('Look for the pan that hangs lower. Try again.');
            return;
          }
          setStep(32);
          setFeedback('The left pan hangs lower, so its three identical unit weights have more mass than the two on the right.');
        }} />
      </section>}

      {step === 32 && <section className="ng-panel" aria-labelledby="ng-math05-mass-finish-title">
        <p className="ng-step">MATH-05 MASS DRAFT PREVIEW · NO SCORE SAVED</p>
        <h2 id="ng-math05-mass-finish-title">You compared mass using identical unit weights.</h2>
        <p>This balance drawing is a learning model, not a calibrated measuring instrument.</p>
        <div className="ng-actions"><button className="ng-button primary" onClick={home}>Finish and clear this visit</button></div>
      </section>}

      {step === 33 && <section className="ng-panel" aria-labelledby="ng-money-title">
        <p className="ng-step">NEW DRAFT PREVIEW · MATH-05 · PRETEND TOKEN VALUES</p>
        <h2 id="ng-money-title">These are make-believe shop tokens. How many points are in this purse?</h2>
        <p>Each token shows its point value. Add the two values: 2 points and 1 point.</p>
        <div className="ng-token-purse" role="img" aria-label="Make-believe purse with one token worth 2 points and one token worth 1 point">
          <span className="ng-token">2 points</span><span className="ng-token">1 point</span>
        </div>
        <p>These learning tokens are not real money, prices, or local currency.</p>
        <NumeralChoices values={[2, 3, 4, 5]} disabled={paused} onChoose={(answer) => {
          if (paused) return;
          if (!pretendTokenAmountAnswerIsCorrect(answer, [2, 1])) {
            setFeedback('Count the points shown on both tokens, then try again.');
            return;
          }
          setStep(34);
          setFeedback('Two points and one point make three pretend points.');
        }} />
      </section>}

      {step === 34 && <section className="ng-panel" aria-labelledby="ng-money-finish-title">
        <p className="ng-step">MATH-05 PRETEND TOKEN DRAFT · NO SCORE SAVED</p>
        <h2 id="ng-money-finish-title">Two points and one point make three pretend points.</h2>
        <p>This is a make-believe counting example, not a lesson about real prices or currency.</p>
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

      <details className="ng-grownup-note" id="ng-grownup-note"><summary>Grown-up notes and offline idea</summary><p>This draft uses fixed, local examples and offers feedback after wrong answers. Adult read-aloud is optional; no audio is included. The offline idea is optional and should use only safe objects nearby. The user reports reviewing MATH-05 prompts through version 12, and MATH-03/MATH-04 prompts. The new version 13 balance and unit-mass prompt needs review. On-screen units, cubes, clock, and balance are learning models. No score, profile, or progress record is made.</p></details>
    </main>
    <footer className="ng-footer">Practice for this visit only · no account · no saved child data</footer>
  </div>;
}
