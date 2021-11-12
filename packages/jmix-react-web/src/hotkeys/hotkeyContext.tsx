import React, {createContext, useContext} from "react";
import { HotkeyConfig } from "./hotkeyConfig";
import { HotkeyStore } from "./hotkeyStore";

export const HotkeyContext = createContext(new HotkeyStore([]));

export interface HotkeyProviderProps {
  defaultHotkeyConfigs: HotkeyConfig[];
  children: React.ReactNode;
}
export const HotkeyProvider = ({defaultHotkeyConfigs, children}: HotkeyProviderProps) => (
  <HotkeyContext.Provider value={new HotkeyStore(defaultHotkeyConfigs)}>
    {children}
  </HotkeyContext.Provider>
);

export function useHotkeyStore(): HotkeyStore {
  return useContext(HotkeyContext);
}
