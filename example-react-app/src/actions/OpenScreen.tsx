import React from "react";
import { openScreen } from "@haulmont/jmix-react-web";

interface Props {
  screenId: string;
  route: string
}

export const OpenScreen: React.FC<Props> = ({screenId, route}) => {
  openScreen(screenId, route);

  return null;
}
