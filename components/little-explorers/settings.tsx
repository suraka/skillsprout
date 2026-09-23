'use client';
import { createContext, useContext, useState, type ReactNode } from 'react';
type Settings = { sound: boolean; motion: boolean; choices: number; setSound: (on: boolean) => void; setMotion: (on: boolean) => void; setChoices: (count: number) => void };
const SettingsContext = createContext<Settings | null>(null);
export function ExplorerSettingsProvider({ children }: { children: ReactNode }) {
  const [sound, setSound] = useState(false), [motion, setMotion] = useState(false), [choices, setChoices] = useState(2);
  return <SettingsContext.Provider value={{ sound, motion, choices, setSound, setMotion, setChoices }}>{children}</SettingsContext.Provider>;
}
export function useExplorerSettings() {
  const value = useContext(SettingsContext);
  if (!value) throw new Error('Little Explorers settings are unavailable.');
  return value;
}
