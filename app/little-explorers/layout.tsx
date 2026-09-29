import type { ReactNode } from 'react';
import { ExplorerSettingsProvider } from '@/components/little-explorers/settings';
import '@/components/little-explorers/rainbow.css';
export default function LittleExplorersLayout({ children }: { children: ReactNode }) {
  return <ExplorerSettingsProvider>{children}</ExplorerSettingsProvider>;
}
