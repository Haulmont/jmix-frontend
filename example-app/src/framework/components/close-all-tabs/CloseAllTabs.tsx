import { useEffect } from "react";
import { useScreens } from "../../screen-api/ScreenContext";

export const CloseAllTabs = () => {
  const screens = useScreens();

  useEffect(() => {
    screens.closeAllTabs();
  }, [screens]);

  return null;
};
