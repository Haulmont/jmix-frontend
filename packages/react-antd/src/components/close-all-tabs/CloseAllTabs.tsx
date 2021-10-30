import {useEffect} from "react";
import {useScreens} from "@amplicode/react-core";
import { action } from "mobx";

export const CloseAllTabs = () => {
  const screens = useScreens();

  useEffect(() => {
    action(() => screens.closeAllTabs());
  }, [screens]);

  return null;
};
