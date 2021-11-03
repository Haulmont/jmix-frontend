import React from "react";
import { IMultiTabItem, tabs } from "@haulmont/jmix-react-core";

interface Props {
  tabItem: IMultiTabItem;
}

export const OpenScreen: React.FC<Props> = ({tabItem}) => {
  tabs.close(tabItem);

  return null;
}
