import type { Metadata } from 'next';
import { ExplorerHome } from '@/components/little-explorers/pages';
export const metadata: Metadata = { title: 'Little Explorers · SkillSprout', description: 'A small, adult-assisted collection of guest activities.' };
export default function Page() { return <ExplorerHome/>; }
