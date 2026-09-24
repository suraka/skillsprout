'use client';
import { createContext, useContext, useState, useSyncExternalStore, type ReactNode } from 'react';
const subscribe = () => () => {};
const clientReady = () => true;
const serverReady = () => false;
export function useExplorerReady() { return useSyncExternalStore(subscribe, clientReady, serverReady); }
type Settings = { sound: boolean; motion: boolean; highContrast: boolean; choices: number; setSound: (on: boolean) => void; setMotion: (on: boolean) => void; setHighContrast: (on: boolean) => void; setChoices: (count: number) => void };
const SettingsContext = createContext<Settings | null>(null);
export function ExplorerSettingsProvider({ children }: { children: ReactNode }) {
  const [sound, setSound] = useState(false), [motion, setMotion] = useState(false), [highContrast, setHighContrast] = useState(false), [choices, setChoices] = useState(2);
  return <SettingsContext.Provider value={{ sound, motion, highContrast, choices, setSound, setMotion, setHighContrast, setChoices }}>{children}</SettingsContext.Provider>;
}
export function useExplorerSettings() {
  const value = useContext(SettingsContext);
  if (!value) throw new Error('Little Explorers settings are unavailable.');
  return value;
}
