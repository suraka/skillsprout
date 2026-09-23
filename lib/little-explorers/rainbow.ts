export type Shape = 'round' | 'pointed';
export type Pattern = 'dots' | 'waves' | 'stripes';
export type GardenColor = 'sunshine' | 'berry' | 'leaf' | 'sky';
export type Home = { id: string; shape: Shape; pattern: Pattern; color: GardenColor };
export type Round = { number: number; target: Home; homes: Home[]; correctId: string };

const targets: Home[] = [
  { id: 'friend-1', shape: 'round', pattern: 'dots', color: 'sunshine' },
  { id: 'friend-2', shape: 'pointed', pattern: 'waves', color: 'berry' },
  { id: 'friend-3', shape: 'round', pattern: 'stripes', color: 'leaf' },
];
const colors: GardenColor[] = ['sunshine', 'berry', 'leaf', 'sky'];
const shapes: Shape[] = ['round', 'pointed'];
const patterns: Pattern[] = ['dots', 'waves', 'stripes'];

/** Make one deterministic, synthetic matching challenge. No identity, storage or I/O. */
export function makeRound(roundIndex: number, choiceCount: number, matchColor: boolean): Round {
  if (!Number.isInteger(roundIndex) || roundIndex < 0 || roundIndex >= targets.length) throw new RangeError('Choose one of the three garden turns.');
  if (![2, 3, 4].includes(choiceCount)) throw new RangeError('Choose 2, 3 or 4 homes.');
  const target = targets[roundIndex];
  const candidates: Home[] = [{ ...target, id: `home-${roundIndex}-match` }];
  if (matchColor) candidates.push({ ...target, id: `home-${roundIndex}-color`, color: colors[(colors.indexOf(target.color) + 1) % colors.length] });
  for (const shape of shapes) for (const pattern of patterns) {
    if (shape === target.shape && pattern === target.pattern) continue;
    if (candidates.length >= choiceCount) break;
    candidates.push({ id: `home-${roundIndex}-${shape}-${pattern}`, shape, pattern, color: colors[(colors.indexOf(target.color) + candidates.length) % colors.length] });
  }
  const choices = candidates.slice(0, choiceCount);
  const correctAt = roundIndex % choiceCount;
  const homes = [...choices];
  const [correct] = homes.splice(0, 1);
  homes.splice(correctAt, 0, correct);
  return { number: roundIndex + 1, target, homes, correctId: `home-${roundIndex}-match` };
}

export function matches(target: Home, choice: Home, matchColor: boolean): boolean {
  return target.shape === choice.shape && target.pattern === choice.pattern && (!matchColor || target.color === choice.color);
}

