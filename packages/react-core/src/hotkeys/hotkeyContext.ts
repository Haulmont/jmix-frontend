import {createContext, useContext} from "react";
import { HotkeyStore } from "./hotkeyStore";

export const HotkeyContext = createContext(new HotkeyStore([]));

export function useHotkeyStore(): HotkeyStore {
  return useContext(HotkeyContext);
}
