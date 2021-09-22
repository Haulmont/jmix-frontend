import React, {useContext} from "react";
import {Screens} from "./Screens";

export const ScreenContext = React.createContext<Screens>(new Screens());

export function useScreens(): Screens {
  return useContext(ScreenContext);
}