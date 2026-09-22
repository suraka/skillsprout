import type { Metadata } from 'next';
import SortingGarden from '@/components/sorting-garden/studio';
export const metadata: Metadata = { title: 'Sorting Garden · SkillSprout guest preview', description: 'Change colorful blocks and test a sorting rule. A local rules simulator, without an account.' };
export default function SortingGardenPage() { return <SortingGarden />; }
