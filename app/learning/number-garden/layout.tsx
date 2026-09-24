import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Number Garden · SkillSprout draft preview',
  description: 'A short, local-only draft for counting and comparing small groups.',
};

export default function NumberGardenLayout({ children }: { children: React.ReactNode }) {
  return children;
}
