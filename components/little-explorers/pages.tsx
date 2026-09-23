'use client';
import Link from 'next/link';
import { useState } from 'react';
import { makeRound, matches, type Home, type Pattern } from '@/lib/little-explorers/rainbow';
import { useExplorerReady, useExplorerSettings } from './settings';

const patternNames: Record<Pattern, string> = { dots: 'dotted', waves: 'wavy', stripes: 'striped' };
const colorNames = { sunshine: 'sunshine yellow', berry: 'berry pink', leaf: 'leaf green', sky: 'sky blue' };
function Picture({ home, label }: { home: Home; label: string }) {
  const id = home.id.replace(/[^a-zA-Z0-9-]/g, '-');
  return <svg className="rh-picture" viewBox="0 0 180 150" role="img" aria-label={label}>
    <defs><pattern id={`pattern-${id}`} width="18" height="18" patternUnits="userSpaceOnUse">
      {home.pattern === 'dots' ? <circle cx="9" cy="9" r="3.5" fill="#183c2a"/> : home.pattern === 'stripes' ? <path d="M0 0L18 18M-5 5L5 -5M13 23L23 13" stroke="#183c2a" strokeWidth="4"/> : <path d="M0 6Q4 0 9 6T18 6M0 15Q4 9 9 15T18 15" fill="none" stroke="#183c2a" strokeWidth="3"/>}
    </pattern></defs>
    <rect x="12" y="10" width="156" height="105" rx="30" fill={home.color==='sunshine'?'#f3ce66':home.color==='berry'?'#eca2ac':home.color==='leaf'?'#9bc58d':'#9bc8e2'}/>
    {home.shape === 'round' ? <circle cx="90" cy="62" r="37" fill={`url(#pattern-${id})`}/> : <path d="M90 22Q150 49 90 103Q30 49 90 22Z" fill={`url(#pattern-${id})`}/>}<text x="90" y="140" textAnchor="middle" fontSize="12" fill="#183c2a">{patternNames[home.pattern]} {home.shape}</text>
  </svg>;
}
function Frame({ children, title }: { children: React.ReactNode; title: string }) {
  const settings=useExplorerSettings();
  return <div className={`rh${settings.highContrast?' rh-contrast':''}`}><header className="rh-header"><Link href="/little-explorers" className="rh-brand">SkillSprout · Little Explorers</Link><span>{title}</span><Link href="/little-explorers/grownups" className="rh-adult-link">For grownups</Link></header>{children}<footer className="rh-footer">Guest play stays in this visit. Nothing is saved to a learner profile.</footer></div>;
}
export function ExplorerHome({onPlay,onPlaybook}:{onPlay?:()=>void;onPlaybook?:()=>void}={}) {
  const cards: ({name:string;detail:string;live:true;href:string}|{name:string;detail:string;live:false})[] = [{ name: 'Rainbow Habitat', detail: 'Find a patterned home for each garden friend.', href: '/little-explorers/rainbow-habitat', live: true }, { name: 'Sound Seed Orchestra', detail: 'A quiet sound-play activity.', live: false }, { name: 'Little Market Makers', detail: 'Count and compare pretend produce.', live: false }, { name: 'Peek & Pair Nature Trail', detail: 'Look closely at matching nature cards.', live: false }];
  return <Frame title="A small place to wonder"><main className="rh-page"><p className="rh-kicker">AGES 2–4 · WITH A GROWN-UP</p><h1>Little Explorers</h1><p>Choose one little activity to try together. Stop whenever you like.</p><div className="rh-cards">{cards.map((card,i)=><article className="rh-hub-card" key={card.name}><span className="rh-card-number" aria-hidden="true">{i+1}</span><h2>{card.name}</h2><p>{card.detail}</p>{'href' in card ? onPlay ? <button className="rh-button" onClick={onPlay}>Explore together</button> : <Link className="rh-button" href={card.href}>Explore together</Link> : <span className="rh-coming" aria-label={`${card.name}: coming soon`}>Coming soon</span>}</article>)}</div>{onPlaybook?<button className="rh-text-link rh-playbook-link" onClick={onPlaybook}>Open the Grownup Playbook</button>:<Link className="rh-text-link" href="/little-explorers/playbook">Open the Grownup Playbook</Link>}<p className="rh-disclosure">Rainbow Habitat is a picture-matching activity. It does not measure a child’s ability or use AI.</p></main></Frame>;
}
export function RainbowHabitat() {
  const settings = useExplorerSettings();
  const ready=useExplorerReady();
  const [roundIndex,setRoundIndex] = useState(0), [matchColor,setMatchColor] = useState(false), [paused,setPaused] = useState(false), [finished,setFinished] = useState(false), [bloom,setBloom]=useState(false), [showHome,setShowHome]=useState(false), [showPlaybook,setShowPlaybook]=useState(false), [feedback,setFeedback] = useState('Ready when you are. Find a home with the same shape and pattern.');
  const round = roundIndex < 3 ? makeRound(roundIndex, settings.choices, matchColor) : null;
  function giveSoftNote() {
    if (!settings.sound || typeof window === 'undefined' || !window.AudioContext) return;
    const context = new window.AudioContext(), oscillator = context.createOscillator(), gain = context.createGain();
    oscillator.type='sine'; oscillator.frequency.value=587; gain.gain.setValueAtTime(0.035,context.currentTime); gain.gain.exponentialRampToValueAtTime(0.001,context.currentTime+0.16); oscillator.connect(gain); gain.connect(context.destination); oscillator.start(); oscillator.stop(context.currentTime+0.16); oscillator.onended=()=>void context.close();
  }
  function choose(home: Home) {
    if (!round || paused) return;
    if (!matches(round.target,home,matchColor)) { setFeedback(`Let’s compare. The friend is ${round.target.shape} and ${patternNames[round.target.pattern]}. Try another home, or pause.`); return; }
    giveSoftNote(); setBloom(true); window.setTimeout(()=>setBloom(false),700);
    if (roundIndex === 2) { setFinished(true); setFeedback('We found a home for all three friends.'); }
    else { setRoundIndex(roundIndex+1); setFeedback('That home fits. Here comes another garden friend.'); }
  }
  function restart() { setRoundIndex(0);setMatchColor(false);setPaused(false);setFinished(false);setBloom(false);setShowHome(false);setFeedback('Ready when you are. Find a home with the same shape and pattern.'); }
  function goHome() { restart(); setShowHome(true); }
  if (showPlaybook) return <GrownupPlaybook onBack={()=>setShowPlaybook(false)}/>;
  if (showHome) return <ExplorerHome onPlay={()=>setShowHome(false)} onPlaybook={()=>setShowPlaybook(true)}/>;
  return <Frame title="Rainbow Habitat"><main className="rh-page rh-game"><p className="rh-kicker">A GROWN-UP CAN HELP</p><h1>Rainbow Habitat</h1><p>Look at the garden friend. Choose a home with the same shape and pattern.</p>
    {finished ? <section className="rh-finish" aria-labelledby="rh-finished"><h2 id="rh-finished">All three friends found a home.</h2><p>No score is kept. Would you like to stop here?</p><p className="rh-offline"><strong>Try away from the screen:</strong> Find two safe household objects with a grown-up. What looks the same? What looks different?</p><div className="rh-actions"><button className="rh-button" onClick={restart}>Start again</button><Link className="rh-button secondary" href="/little-explorers">Finish and go home</Link></div></section> : paused ? <section className="rh-pause" aria-live="polite"><h2>Paused</h2><p>The garden will wait. Take a break together.</p><button className="rh-button" onClick={()=>{setPaused(false);setFeedback('Let’s continue when you are ready.');}}>Continue</button></section> : <>
      {round && <section className={`rh-round${settings.motion&&bloom?' rh-bloom':''}`} aria-label={`Garden turn ${round.number} of 3`}>
        <div className="rh-friend"><p>Can you help this friend find a home?</p><Picture home={round.target} label={`Garden friend: ${round.target.shape} shape, ${patternNames[round.target.pattern]} pattern${matchColor?`, ${colorNames[round.target.color]}`:''}`}/><button className="rh-repeat" disabled={!ready} onClick={()=>setFeedback(matchColor?'Find the home with the same shape, pattern and color.':'Find the home with the same shape and pattern.')}>Repeat prompt</button></div>
        <fieldset className="rh-color-choice"><legend>How shall we match?</legend><label><input type="checkbox" disabled={!ready} checked={matchColor} onChange={e=>{setMatchColor(e.target.checked);setFeedback(e.target.checked?'Let’s match the shape, pattern and color.':'Let’s match the shape and pattern.');}}/> Match the color too</label></fieldset>
        <div className="rh-home-grid" aria-label="Choose a home">{round.homes.map(home=><button className="rh-home" key={home.id} onClick={()=>choose(home)} disabled={!ready||paused}><Picture home={home} label={`${colorNames[home.color]}, ${patternNames[home.pattern]}, ${home.shape} home`}/><span className="rh-home-name">{colorNames[home.color]} · {patternNames[home.pattern]} · {home.shape}</span></button>)}</div>
        <p className="rh-feedback" role="status" aria-live="polite">{ready?feedback:'Loading the garden controls…'}</p>
      </section>}
      <div className="rh-actions"><button className="rh-button secondary" disabled={!ready} onClick={()=>setPaused(true)}>Pause</button><button className="rh-button secondary" disabled={!ready} onClick={goHome}>Home</button><Link className="rh-button secondary" href="/little-explorers/grownups">For grownups</Link></div>
    </>}
  </main></Frame>;
}
export function GrownupControls() {
  const s=useExplorerSettings();
  const ready=useExplorerReady();
  return <Frame title="Grownup controls"><main className="rh-page"><p className="rh-kicker">ADULT-CHOSEN · THIS VISIT ONLY</p><h1>Grownup controls</h1><p>Choose a comfortable way to play together. These settings are temporary and reset when you leave the site.</p><section className="rh-settings">
    <label className="rh-setting"><span><strong>Homes to choose from</strong><small>Start with two. You can choose more together.</small></span><select disabled={!ready} aria-label="Homes to choose from" value={s.choices} onChange={e=>s.setChoices(Number(e.target.value))}><option value={2}>2 homes</option><option value={3}>3 homes</option><option value={4}>4 homes</option></select></label>
    <label className="rh-setting"><span><strong>Quiet sound effect</strong><small>Off by default. No speech or recorded sounds.</small></span><input type="checkbox" disabled={!ready} checked={s.sound} onChange={e=>s.setSound(e.target.checked)} aria-label="Enable quiet sound effect"/></label>
    <label className="rh-setting"><span><strong>Gentle motion</strong><small>Optional small bloom when a match is found.</small></span><input type="checkbox" disabled={!ready} checked={s.motion} onChange={e=>s.setMotion(e.target.checked)} aria-label="Enable gentle motion"/></label>
    <label className="rh-setting"><span><strong>High contrast</strong><small>Use darker labels and stronger borders.</small></span><input type="checkbox" disabled={!ready} checked={s.highContrast} onChange={e=>s.setHighContrast(e.target.checked)} aria-label="Enable high contrast"/></label>
    </section><div className="rh-actions"><Link className="rh-button" href="/little-explorers/rainbow-habitat">Back to Rainbow Habitat</Link><Link className="rh-button secondary" href="/little-explorers/playbook">Open the Playbook</Link><Link className="rh-button secondary" href="/little-explorers">Home</Link></div><p className="rh-disclosure">There is no narration in this activity. Instructions and feedback are shown as text. No setting creates an adult account or protects device-level controls.</p></main></Frame>;
}
export function GrownupPlaybook({onBack}:{onBack?:()=>void}={}) {
  return <Frame title="Grownup Playbook"><main className="rh-page"><p className="rh-kicker">ONE IDEA · OFF SCREEN</p><h1>Grow the conversation</h1><section className="rh-playbook"><h2>While you explore</h2><p>Ask: “Can you find a home that feels the same? What do you notice about its shape and pattern?”</p><h2>Try it without a screen</h2><p>With your child beside you, place two safe household objects nearby. Invite them to show one way the objects are alike, and one way they are different. There is no right speed or score.</p><h2>Make room for different ways</h2><p>Name the shape and pattern aloud as well as pointing. Let your child watch, point, or take a turn. Pause if either of you wants a break.</p></section><div className="rh-actions">{onBack?<button className="rh-button" onClick={onBack}>Back to Little Explorers</button>:<Link className="rh-button" href="/little-explorers/rainbow-habitat">Try Rainbow Habitat</Link>}{onBack?<button className="rh-button secondary" onClick={onBack}>Home</button>:<Link className="rh-button secondary" href="/little-explorers">Home</Link>}</div></main></Frame>;
}
