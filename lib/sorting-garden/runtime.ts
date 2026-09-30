/** Original bounded rules interpreter. No eval, generated code, I/O or identity. */
export type SampleId = 'red-round' | 'green-pointed' | 'green-round';
export type RuleId = 'color' | 'shape';
export type Basket = 'fruit' | 'leaf';
export type Block = { id: string; type: 'start' } | { id: string; type: 'sample'; sample: SampleId } | { id: string; type: 'rule'; rule: RuleId } | { id: string; type: 'show' };
export type Project = { schema_version: 1; workspace_state: { blocks: Block[] } };
export type Sample = { id: SampleId; name: string; color: 'red' | 'green'; shape: 'round' | 'pointed'; expected: Basket };
export const SAMPLES: readonly Sample[] = [
  { id: 'red-round', name: 'Red round fruit', color: 'red', shape: 'round', expected: 'fruit' },
  { id: 'green-pointed', name: 'Green pointed leaf', color: 'green', shape: 'pointed', expected: 'leaf' },
  { id: 'green-round', name: 'Green round fruit', color: 'green', shape: 'round', expected: 'fruit' },
];
export const RULES: Record<RuleId, string> = { color: 'Red → fruit. Otherwise → leaf.', shape: 'Round → fruit. Otherwise → leaf.' };
export const MAX_BLOCKS = 12, MAX_HISTORY = 30;
export function starterProject(): Project { return { schema_version: 1, workspace_state: { blocks: [
  { id: 'start', type: 'start' }, { id: 'sample', type: 'sample', sample: 'red-round' },
  { id: 'rule', type: 'rule', rule: 'color' }, { id: 'show', type: 'show' },
] } }; }
const object = (x: unknown): x is Record<string, unknown> => !!x && typeof x === 'object' && !Array.isArray(x);
export function validateProject(value: unknown): string | null {
  if (!object(value) || value.schema_version !== 1 || !object(value.workspace_state)) return 'This project version is not supported. Reset to the starter blocks.';
  const blocks = value.workspace_state.blocks;
  if (!Array.isArray(blocks) || blocks.length < 1 || blocks.length > MAX_BLOCKS) return `Use between 1 and ${MAX_BLOCKS} blocks.`;
  const ids = new Set<string>(); let sampleReady = false, predictionReady = false, hasShow = false;
  for (let i = 0; i < blocks.length; i++) {
    const b: unknown = blocks[i];
    if (!object(b) || typeof b.id !== 'string' || !/^[a-zA-Z0-9-]{1,60}$/.test(b.id) || ids.has(b.id)) return 'Each block needs its own valid ID. Reset to the starter blocks.';
    ids.add(b.id);
    if (i === 0 && b.type !== 'start') return 'Move “When Run is pressed” to the top, then try again.';
    switch (b.type) {
      case 'start': if (i !== 0) return 'Use just one start block, at the top.'; break;
      case 'sample': if (!SAMPLES.some(s => s.id === b.sample)) return 'Choose one of the supplied sample cards.'; sampleReady = true; predictionReady = false; break;
      case 'rule': if (!sampleReady) return 'Put a sample block before the rule.'; if (b.rule !== 'color' && b.rule !== 'shape') return 'Choose the color rule or the shape rule.'; predictionReady = true; break;
      case 'show': if (!predictionReady) return 'Put a sample and a rule before “Show the basket”.'; hasShow = true; break;
      default: return 'This block is not supported. Remove it or reset the starter blocks.';
    }
  }
  if (!hasShow || blocks[blocks.length - 1].type !== 'show') return 'Finish with “Show the basket” after a sample and a rule.';
  return null;
}
export type Execution = { cursor: number; sample: Sample | null; prediction: Basket | null; rule: RuleId | null; stage: { sample: Sample; basket: Basket; rule: RuleId } | null; trace: { blockId: string; message: string }[]; status: 'ready' | 'paused' | 'done' | 'error'; error: string | null };
export function freshExecution(): Execution { return { cursor: 0, sample: null, prediction: null, rule: null, stage: null, trace: [], status: 'ready', error: null }; }
export function stepProject(project: Project, state: Execution): Execution {
  const error = validateProject(project);
  if (error) return { ...freshExecution(), status: 'error', error };
  const blocks = project.workspace_state.blocks;
  if (state.status === 'done' || state.status === 'error') return state;
  if (!Number.isInteger(state.cursor) || state.cursor < 0 || state.cursor >= blocks.length) return { ...freshExecution(), status: 'error', error: 'The run could not continue. Reset the stage and try again.' };
  const b = blocks[state.cursor], next: Execution = { ...state, cursor: state.cursor + 1, status: 'paused', trace: [...state.trace] }; let message = '';
  switch (b.type) {
    case 'start': message = 'Start the program.'; break;
    case 'sample': next.sample = SAMPLES.find(s => s.id === b.sample)!; next.prediction = null; next.rule = null; message = `Use ${next.sample.name.toLowerCase()}.`; break;
    case 'rule':
      if (!next.sample) return { ...freshExecution(), status: 'error', error: 'Run the sample block first.' };
      next.rule = b.rule; next.prediction = (b.rule === 'color' ? next.sample.color === 'red' : next.sample.shape === 'round') ? 'fruit' : 'leaf';
      message = `${RULES[b.rule]} This card is ${b.rule === 'color' ? next.sample.color : next.sample.shape}, so choose ${next.prediction}.`; break;
    case 'show':
      if (!next.sample || !next.prediction || !next.rule) return { ...freshExecution(), status: 'error', error: 'Run a sample and a rule before showing the basket.' };
      next.stage = { sample: next.sample, basket: next.prediction, rule: next.rule }; message = `Place ${next.sample.name.toLowerCase()} in the ${next.prediction} basket.`; break;
  }
  next.trace.push({ blockId: b.id, message }); if (next.cursor === blocks.length) next.status = 'done'; return next;
}
export function runProject(project: Project): Execution { let state = freshExecution(); for (let i = 0; i < MAX_BLOCKS && state.status !== 'done' && state.status !== 'error'; i++) state = stepProject(project, state); return state; }
export function moveBlock(project: Project, from: number, to: number): Project {
  const blocks = [...project.workspace_state.blocks];
  if (!Number.isInteger(from) || !Number.isInteger(to) || from < 0 || to < 0 || from >= blocks.length || to >= blocks.length || from === to) return project;
  const [block] = blocks.splice(from, 1); blocks.splice(to, 0, block); return { ...project, workspace_state: { blocks } };
}
export type History = { past: Project[]; present: Project; future: Project[] };
export function editHistory(h: History, next: Project): History { if (JSON.stringify(h.present) === JSON.stringify(next)) return h; return { past: [...h.past, h.present].slice(-MAX_HISTORY), present: next, future: [] }; }
export function undo(h: History): History { return h.past.length ? { past: h.past.slice(0, -1), present: h.past[h.past.length - 1], future: [h.present, ...h.future].slice(0, MAX_HISTORY) } : h; }
export function redo(h: History): History { return h.future.length ? { past: [...h.past, h.present].slice(-MAX_HISTORY), present: h.future[0], future: h.future.slice(1) } : h; }
