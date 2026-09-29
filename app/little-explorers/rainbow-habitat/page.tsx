import type { Metadata } from 'next';
import { RainbowHabitat } from '@/components/little-explorers/pages';
export const metadata: Metadata = { title: 'Rainbow Habitat · SkillSprout guest activity', description: 'A local picture-matching activity to explore shape and pattern together.' };
export default function Page() { return <RainbowHabitat/>; }
