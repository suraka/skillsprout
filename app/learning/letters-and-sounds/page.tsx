import type { Metadata } from 'next';
import { LiteracyPath } from '@/components/literacy/path';

export const metadata: Metadata = {
  title: 'Letters & Sounds · SkillSprout draft preview',
  description: 'A short, local-only English beginning-literacy practice path.',
};

export default function LettersAndSoundsPage() {
  return <LiteracyPath />;
}
