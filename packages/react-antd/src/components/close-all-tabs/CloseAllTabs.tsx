import {useEffect} from "react";
import {useScreens} from "@amplicode/react-core";

export const CloseAllTabs = () => {
  const screens = useScreens();

  useEffect(() => {
    screens.closeAllTabs();
  }, [screens]);

  return null;
};